'use client';

// This is a patch component that injects a script to fix the auto-pilot feature in NovelWriter.tsx
// It should be included in the layout or page component that uses NovelWriter.tsx

import React, { useEffect } from 'react';

export default function NovelWriterPatch() {
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      console.log('🔧 NovelWriterPatch: Applying patch to fix auto-pilot feature...');
      
      // Define the extractContent function
      window.extractContent = (response) => {
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
        } else if (typeof response === 'string') {
          content = response;
          console.log('Response was a string');
        }
        
        return content;
      };
      
      // Monkey patch the autoPilotWrite function
      const originalFetch = window.fetch;
      window.fetch = async function(...args) {
        const [url, options] = args;
        
        // If this is a call to OpenRouter API
        if (url === 'https://openrouter.ai/api/v1/chat/completions') {
          console.log('🔄 Intercepted OpenRouter API call');
          
          try {
            const response = await originalFetch.apply(this, args);
            
            // Clone the response so we can read it multiple times
            const clonedResponse = response.clone();
            
            // Read the response as JSON
            const data = await clonedResponse.json();
            
            console.log('📥 Received OpenRouter API response:', data);
            
            // Extract content
            const content = window.extractContent(data);
            
            if (content) {
              console.log('✅ Successfully extracted content from OpenRouter API response');
            } else {
              console.warn('⚠️ Failed to extract content from OpenRouter API response');
            }
            
            // Return the original response
            return response;
          } catch (error) {
            console.error('❌ Error in patched fetch:', error);
            throw error;
          }
        }
        
        // Otherwise, just call the original fetch
        return originalFetch.apply(this, args);
      };
      
      console.log('✅ NovelWriterPatch: Patch applied successfully');
    }
  }, []);
  
  // This component doesn't render anything
  return null;
}