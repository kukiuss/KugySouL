'use client';

// ImprovedNovelWriter.tsx - Enhanced version of NovelWriter with better OpenRouter API integration
// This component wraps the original NovelWriter and enhances the auto-pilot feature

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import OriginalNovelWriter from './NovelWriter';
import ApiKeySetup from './ApiKeySetup';

// Define the ChatResponse type based on the API response structure
interface ChatResponse {
  response?: string;
  message?: string;
  content?: string;
  data?: string;
  conversation_id?: string;
  model?: string;
  timestamp?: string;
  status?: string;
  choices?: Array<{
    message?: {
      content?: string;
      role?: string;
    };
    text?: string;
    index?: number;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  error?: {
    message: string;
    type?: string;
    code?: string | number;
  };
  debug_info?: string;
}

export default function ImprovedNovelWriter() {
  const [apiKeyStatus, setApiKeyStatus] = useState<'checking' | 'set' | 'missing'>('checking');
  const [lastResponse, setLastResponse] = useState<ChatResponse | null>(null);
  const [debugMode, setDebugMode] = useState(false);
  const [apiStatus, setApiStatus] = useState<{
    backend: boolean;
    novel: boolean;
    direct: boolean;
  }>({
    backend: false,
    novel: false,
    direct: false
  });

  // Check if API key is set
  useEffect(() => {
    const checkApiKey = async () => {
      const savedKey = localStorage.getItem('openrouter_api_key');
      if (savedKey) {
        setApiKeyStatus('set');
        
        // Test the API key
        try {
          const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${savedKey}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            console.log('✅ OpenRouter API key is valid');
            setApiStatus(prev => ({ ...prev, direct: true }));
          } else {
            console.warn('⚠️ OpenRouter API key validation failed:', response.status);
            setApiStatus(prev => ({ ...prev, direct: false }));
          }
        } catch (error) {
          console.error('❌ Error testing API key:', error);
          setApiStatus(prev => ({ ...prev, direct: false }));
        }
      } else {
        setApiKeyStatus('missing');
        setApiStatus(prev => ({ ...prev, direct: false }));
      }
      
      // Test backend API
      try {
        const response = await fetch('/api/test-backend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            test: 'backend'
          })
        });
        
        if (response.ok) {
          console.log('✅ Backend API is working');
          setApiStatus(prev => ({ ...prev, backend: true }));
        } else {
          console.warn('⚠️ Backend API test failed:', response.status);
          setApiStatus(prev => ({ ...prev, backend: false }));
        }
      } catch (error) {
        console.error('❌ Error testing backend API:', error);
        setApiStatus(prev => ({ ...prev, backend: false }));
      }
      
      // Test novel writing endpoint
      try {
        const response = await fetch('/novel/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          console.log('✅ Novel writing endpoint is working');
          setApiStatus(prev => ({ ...prev, novel: true }));
        } else {
          console.warn('⚠️ Novel writing endpoint test failed:', response.status);
          setApiStatus(prev => ({ ...prev, novel: false }));
        }
      } catch (error) {
        console.error('❌ Error testing novel writing endpoint:', error);
        setApiStatus(prev => ({ ...prev, novel: false }));
      }
    };
    
    checkApiKey();
  }, []);

  // Extract content from various possible response formats
  const extractContent = (response: ChatResponse): string => {
    if (!response) return '';
    
    let content = '';
    
    // Try all possible response formats
    if (typeof response === 'object') {
      // First check for direct content fields
      if (response.response && typeof response.response === 'string') {
        content = response.response;
        console.log('Content extracted from response.response');
      } else if (response.message && typeof response.message === 'string') {
        content = response.message;
        console.log('Content extracted from response.message');
      } else if (response.content && typeof response.content === 'string') {
        content = response.content;
        console.log('Content extracted from response.content');
      } else if (response.data && typeof response.data === 'string') {
        content = response.data;
        console.log('Content extracted from response.data');
      } 
      // Then check for OpenAI/OpenRouter format
      else if (response.choices && Array.isArray(response.choices) && response.choices.length > 0) {
        const choice = response.choices[0];
        if (choice.message && choice.message.content) {
          content = choice.message.content;
          console.log('Content extracted from response.choices[0].message.content');
        } else if (choice.text) {
          content = choice.text;
          console.log('Content extracted from response.choices[0].text');
        }
      }
      // Check for error
      else if (response.error && response.error.message) {
        throw new Error(response.error.message);
      }
    } else if (typeof response === 'string') {
      content = response;
      console.log('Response was a string');
    }
    
    return content;
  };

  // Monkey patch the window object to enhance the autoPilotWrite function
  useEffect(() => {
    // @ts-ignore
    window.__improvedExtractContent = extractContent;
    
    // @ts-ignore
    window.__improvedApiStatus = apiStatus;
    
    // @ts-ignore
    window.__setLastResponse = setLastResponse;
    
    console.log('✅ ImprovedNovelWriter enhancements loaded');
    
    return () => {
      // Clean up
      // @ts-ignore
      delete window.__improvedExtractContent;
      // @ts-ignore
      delete window.__improvedApiStatus;
      // @ts-ignore
      delete window.__setLastResponse;
    };
  }, [apiStatus]);

  return (
    <div className="relative">
      {/* API Status Indicator */}
      <div className="absolute top-0 right-0 z-50 p-2 flex flex-col gap-2 items-end">
        <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-md shadow-md">
          <ApiKeySetup />
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setDebugMode(!debugMode)}
            className="h-8 px-2"
          >
            {debugMode ? 'Hide Debug' : 'Debug'}
          </Button>
        </div>
        
        {debugMode && (
          <div className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-md shadow-md text-xs w-64">
            <h4 className="font-semibold mb-1">API Status:</h4>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>Backend API:</span>
                {apiStatus.backend ? (
                  <span className="text-green-500 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" /> Working
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> Not working
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span>Novel Endpoint:</span>
                {apiStatus.novel ? (
                  <span className="text-green-500 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" /> Working
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> Not working
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span>Direct API:</span>
                {apiStatus.direct ? (
                  <span className="text-green-500 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" /> Working
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> Not working
                  </span>
                )}
              </div>
            </div>
            
            {lastResponse && (
              <div className="mt-2">
                <details>
                  <summary className="cursor-pointer hover:text-blue-500">Last Response</summary>
                  <div className="mt-1 max-h-40 overflow-auto">
                    <pre className="text-xs whitespace-pre-wrap break-all">
                      {JSON.stringify(lastResponse, null, 2)}
                    </pre>
                  </div>
                </details>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Enhanced Notice */}
      <div className="absolute top-0 left-0 bg-green-100 text-green-800 px-2 py-1 text-xs rounded-br-md z-50">
        Enhanced Auto-Pilot
      </div>
      
      {/* Original Component */}
      <OriginalNovelWriter />
      
      {/* Script to enhance the original component */}
      <script dangerouslySetInnerHTML={{ __html: `
        // This script enhances the autoPilotWrite function in the original NovelWriter component
        document.addEventListener('DOMContentLoaded', function() {
          // Wait for the original autoPilotWrite function to be defined
          const checkInterval = setInterval(() => {
            if (window.autoPilotWrite) {
              clearInterval(checkInterval);
              
              // Store the original function
              const originalAutoPilotWrite = window.autoPilotWrite;
              
              // Replace with enhanced version
              window.autoPilotWrite = async function() {
                console.log('🚀 Enhanced autoPilotWrite called');
                
                try {
                  // Call the original function
                  const result = await originalAutoPilotWrite.apply(this, arguments);
                  
                  // Additional processing if needed
                  console.log('✅ Enhanced autoPilotWrite completed successfully');
                  
                  return result;
                } catch (error) {
                  console.error('❌ Enhanced autoPilotWrite error:', error);
                  
                  // Handle error
                  alert('Auto-pilot error: ' + error.message);
                  
                  throw error;
                }
              };
              
              console.log('✅ Enhanced autoPilotWrite function installed');
            }
          }, 500);
          
          // Timeout after 10 seconds
          setTimeout(() => {
            clearInterval(checkInterval);
            console.warn('⚠️ Could not find autoPilotWrite function to enhance');
          }, 10000);
        });
      ` }} />
    </div>
  );
}