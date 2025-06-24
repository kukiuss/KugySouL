'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Key, Save, Check, AlertCircle } from 'lucide-react';

export default function ApiKeySetup() {
  const [apiKey, setApiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [testResult, setTestResult] = useState<{success: boolean; message: string} | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    // Check if API key is already set in localStorage
    const savedKey = localStorage.getItem('openrouter_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsKeySet(true);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openrouter_api_key', apiKey.trim());
      setIsKeySet(true);
      setTestResult(null);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('openrouter_api_key');
    setApiKey('');
    setIsKeySet(false);
    setTestResult(null);
  };

  const testApiKey = async () => {
    if (!apiKey.trim()) {
      setTestResult({
        success: false,
        message: 'Please enter an API key first'
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTestResult({
          success: true,
          message: `API key is valid! ${data.name || 'Your key'} is ready to use.`
        });
      } else {
        setTestResult({
          success: false,
          message: `API key validation failed: ${response.status} ${response.statusText}`
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: `Error testing API key: ${error.message || 'Unknown error'}`
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={isKeySet ? "outline" : "default"} size="sm" className="gap-2">
          <Key size={16} />
          {isKeySet ? 'API Key Set' : 'Set API Key'}
          {isKeySet && <Check size={16} className="text-green-500" />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenRouter API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenRouter API key to enable the auto-pilot feature.
            {!isKeySet && (
              <div className="mt-2 text-amber-500 flex items-center gap-2">
                <AlertCircle size={16} />
                <span>Auto-pilot requires an API key to function properly.</span>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-or-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="col-span-3"
            />
            {testResult && (
              <div className={`text-sm p-2 rounded ${testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {testResult.message}
              </div>
            )}
            <div className="text-xs text-gray-500 mt-1">
              Get your API key from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">openrouter.ai/keys</a>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <div>
            {isKeySet && (
              <Button variant="outline" onClick={clearApiKey} className="mr-2">
                Clear Key
              </Button>
            )}
            <Button variant="outline" onClick={testApiKey} disabled={isTesting}>
              {isTesting ? 'Testing...' : 'Test Key'}
            </Button>
          </div>
          <Button type="submit" onClick={saveApiKey} disabled={!apiKey.trim()}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}