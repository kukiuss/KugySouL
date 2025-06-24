'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { enhancedApiService } from '@/services/enhancedApi';

export default function OpenRouterTest() {
  const [prompt, setPrompt] = useState('Write a short paragraph about a magical forest.');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testType, setTestType] = useState<'backend' | 'direct' | 'novel'>('backend');
  const [model, setModel] = useState('anthropic/claude-3.5-sonnet');
  const [responseDetails, setResponseDetails] = useState<any>(null);

  const runTest = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse('');
    setResponseDetails(null);

    try {
      let result;

      if (testType === 'backend') {
        // Test backend OpenRouter integration
        result = await enhancedApiService.testBackendOpenRouter(prompt, model);
      } else if (testType === 'direct') {
        // Test direct OpenRouter API
        result = await enhancedApiService.testOpenRouterDirect(prompt, model);
      } else {
        // Test novel writing endpoint
        result = await enhancedApiService.testNovelWriting(prompt, 'plot-structure');
      }

      console.log('Test result:', result);
      setResponseDetails(result);

      // Extract content from various possible response formats
      let content = '';
      
      if (result && typeof result === 'object') {
        if (result.response && typeof result.response === 'string') {
          content = result.response;
        } else if (result.message && typeof result.message === 'string') {
          content = result.message;
        } else if (result.content && typeof result.content === 'string') {
          content = result.content;
        } else if (result.data && typeof result.data === 'string') {
          content = result.data;
        } else if (result.choices && Array.isArray(result.choices) && result.choices.length > 0) {
          const choice = result.choices[0];
          if (choice.message && choice.message.content) {
            content = choice.message.content;
          } else if (choice.text) {
            content = choice.text;
          }
        } else if (result.error) {
          throw new Error(result.error.message || 'Unknown error');
        }
      } else if (typeof result === 'string') {
        content = result;
      }

      if (content) {
        setResponse(content);
      } else {
        setError('No content could be extracted from the response');
      }
    } catch (err) {
      console.error('Test failed:', err);
      setError(err.message || 'Test failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>OpenRouter API Test</CardTitle>
        <CardDescription>
          Test the OpenRouter API integration to ensure it's working properly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Test Type</label>
            <div className="flex gap-2">
              <Button 
                variant={testType === 'backend' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTestType('backend')}
                className="flex-1"
              >
                Backend API
              </Button>
              <Button 
                variant={testType === 'direct' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTestType('direct')}
                className="flex-1"
              >
                Direct API
              </Button>
              <Button 
                variant={testType === 'novel' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTestType('novel')}
                className="flex-1"
              >
                Novel API
              </Button>
            </div>
          </div>
        </div>
        
        {testType !== 'novel' && (
          <div>
            <label className="text-sm font-medium mb-1 block">Model</label>
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={model === 'anthropic/claude-3.5-sonnet' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setModel('anthropic/claude-3.5-sonnet')}
              >
                Claude 3.5 Sonnet
              </Button>
              <Button 
                variant={model === 'google/gemini-2.0-flash-001' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setModel('google/gemini-2.0-flash-001')}
              >
                Gemini 2.0 Flash
              </Button>
              <Button 
                variant={model === 'anthropic/claude-3-opus' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setModel('anthropic/claude-3-opus')}
              >
                Claude 3 Opus
              </Button>
              <Button 
                variant={model === 'meta-llama/llama-3-70b-instruct' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setModel('meta-llama/llama-3-70b-instruct')}
              >
                Llama 3 70B
              </Button>
            </div>
          </div>
        )}
        
        <div>
          <label className="text-sm font-medium mb-1 block">Prompt</label>
          <Textarea 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here"
            rows={4}
            className="resize-none"
          />
        </div>
        
        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}
        
        {response && (
          <div className="mt-4">
            <label className="text-sm font-medium mb-1 block flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Response
            </label>
            <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">{response}</div>
          </div>
        )}
        
        {responseDetails && (
          <div className="mt-4">
            <details className="text-xs">
              <summary className="cursor-pointer text-gray-500 hover:text-gray-700">Response Details</summary>
              <pre className="bg-gray-100 p-2 rounded-md mt-2 overflow-auto max-h-40 text-xs">
                {JSON.stringify(responseDetails, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={runTest} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Run Test
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}