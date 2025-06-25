'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Loader2, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NovelWriter from './NovelWriter';

export default function FixedWordCountAutoPilot() {
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeySetup, setShowApiKeySetup] = useState(false);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openrouter_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setShowApiKeySetup(true);
    }
  }, []);

  // Save API key to localStorage
  const saveApiKey = useCallback(() => {
    if (apiKey) {
      localStorage.setItem('openrouter_api_key', apiKey);
      setShowApiKeySetup(false);
      setStatus('success');
      setStatusMessage('API key saved successfully');
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 3000);
    }
  }, [apiKey]);

  // Inject the fixed auto-pilot script
  useEffect(() => {
    // Create a script element to inject our fix
    const script = document.createElement('script');
    script.id = 'fixed-autopilot-script';
    script.type = 'text/javascript';
    
    // This script will override the autoPilotWrite function to fix the word count issue
    script.textContent = `
      (function() {
        // Wait for the NovelWriter component to be fully loaded
        const checkInterval = setInterval(() => {
          // Check if the autoPilotWrite function exists in the window object
          if (window.autoPilotWriteOriginal) {
            console.log("🔧 Auto-pilot fix already applied");
            clearInterval(checkInterval);
            return;
          }

          // Try to find the NovelWriter component instance
          const novelWriterElement = document.querySelector('[data-novel-writer="true"]');
          if (!novelWriterElement) {
            return;
          }

          console.log("🔍 Found NovelWriter element, applying fix...");
          
          // Function to patch the OpenRouter API response handling
          function patchOpenRouterResponseHandling() {
            try {
              // Store the original fetch function
              const originalFetch = window.fetch;
              
              // Override the fetch function to intercept OpenRouter API calls
              window.fetch = function(input, init) {
                // Check if this is an OpenRouter API call
                if (typeof input === 'string' && input.includes('openrouter.ai/api')) {
                  console.log("🔄 Intercepted OpenRouter API call");
                  
                  // Get the original promise
                  const originalPromise = originalFetch(input, init);
                  
                  // Return a modified promise that will process the response
                  return originalPromise.then(async (response) => {
                    // Clone the response so we can read it multiple times
                    const clonedResponse = response.clone();
                    
                    try {
                      // Parse the response JSON
                      const data = await clonedResponse.json();
                      console.log("📊 OpenRouter API response:", data);
                      
                      // Check if the response has the expected structure
                      if (data && data.choices && data.choices.length > 0) {
                        const content = data.choices[0].message?.content;
                        
                        if (content) {
                          console.log("📝 Extracted content length:", content.length);
                          console.log("📝 Content preview:", content.substring(0, 100) + "...");
                          
                          // Check if the content is too short (less than 100 words)
                          const wordCount = content.split(/\\s+/).length;
                          console.log("🔢 Word count:", wordCount);
                          
                          if (wordCount < 100) {
                            console.log("⚠️ Content too short, requesting more content...");
                            
                            // Get the API key from localStorage
                            const apiKey = localStorage.getItem('openrouter_api_key');
                            if (!apiKey) {
                              console.error("❌ No API key found in localStorage");
                              return response;
                            }
                            
                            // Extract the request body from the original request
                            let requestBody;
                            if (init && init.body) {
                              try {
                                requestBody = JSON.parse(init.body.toString());
                              } catch (e) {
                                console.error("❌ Failed to parse request body:", e);
                                return response;
                              }
                            }
                            
                            if (!requestBody) {
                              console.error("❌ No request body found");
                              return response;
                            }
                            
                            // Modify the request to ask for more content
                            const newRequestBody = {
                              ...requestBody,
                              messages: [
                                {
                                  role: "system",
                                  content: "You are a creative writing assistant specializing in novel writing. Generate at least 500 words of high-quality content."
                                },
                                ...(requestBody.messages || []).slice(0, -1),
                                {
                                  role: "user",
                                  content: \`\${requestBody.messages[requestBody.messages.length - 1].content}
                                  
                                  IMPORTANT: Generate at least 500-800 words of high-quality content. The previous response was too short.\`
                                }
                              ],
                              max_tokens: 1500, // Increase max tokens
                              temperature: 0.8
                            };
                            
                            console.log("🔄 Sending modified request to OpenRouter API");
                            
                            // Make a new request with the modified body
                            const newResponse = await originalFetch(input, {
                              ...init,
                              body: JSON.stringify(newRequestBody)
                            });
                            
                            const newData = await newResponse.json();
                            console.log("📊 New OpenRouter API response:", newData);
                            
                            // Create a modified response with the new data
                            return new Response(JSON.stringify(newData), {
                              status: newResponse.status,
                              statusText: newResponse.statusText,
                              headers: newResponse.headers
                            });
                          }
                        }
                      }
                    } catch (e) {
                      console.error("❌ Error processing OpenRouter API response:", e);
                    }
                    
                    // Return the original response if we couldn't or didn't need to modify it
                    return response;
                  });
                }
                
                // For all other requests, use the original fetch function
                return originalFetch(input, init);
              };
              
              console.log("✅ OpenRouter API response handling patched successfully");
            } catch (e) {
              console.error("❌ Failed to patch OpenRouter API response handling:", e);
            }
          }

          // Apply the patch
          patchOpenRouterResponseHandling();
          
          // Mark as patched
          window.autoPilotWritePatched = true;
          console.log("✅ Auto-pilot fix applied successfully");
          
          clearInterval(checkInterval);
        }, 1000);
      })();
    `;
    
    // Add the script to the document
    document.head.appendChild(script);
    
    // Cleanup function to remove the script when the component unmounts
    return () => {
      const existingScript = document.getElementById('fixed-autopilot-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* API Key Setup Modal */}
      {showApiKeySetup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-4">OpenRouter API Key Setup</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              To use the auto-pilot feature with improved word count, please enter your OpenRouter API key.
              You can get one for free at <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">openrouter.ai/keys</a>.
            </p>
            <div className="mb-4">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your OpenRouter API key"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowApiKeySetup(false)}>
                Cancel
              </Button>
              <Button onClick={saveApiKey}>
                Save API Key
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Status Indicator */}
      {status !== 'idle' && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          status === 'running' ? 'bg-blue-500' :
          status === 'success' ? 'bg-green-500' :
          'bg-red-500'
        } text-white`}>
          <div className="flex items-center space-x-2">
            {status === 'running' && <Loader2 className="h-5 w-5 animate-spin" />}
            {status === 'success' && <CheckCircle className="h-5 w-5" />}
            {status === 'error' && <AlertCircle className="h-5 w-5" />}
            <span>{statusMessage}</span>
          </div>
        </div>
      )}

      {/* API Key Setup Button */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-1"
          onClick={() => setShowApiKeySetup(true)}
        >
          <Settings className="h-4 w-4" />
          <span>API Key Setup</span>
        </Button>
      </div>

      {/* The original NovelWriter component */}
      <div data-novel-writer="true">
        <NovelWriter />
      </div>
    </div>
  );
}