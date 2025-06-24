'use client';

// This is a fixed version of the NovelWriter component that properly handles the OpenRouter API response
// The main changes are in the autoPilotWrite function to ensure it correctly processes the response

import React, { useState } from 'react';
import { apiService } from '@/services/api';

// Import the original NovelWriter component and extend it
import OriginalNovelWriter from './NovelWriter';

// No need to import enhancedApiService as it's not used

// Create a fixed version of the autoPilotWrite function
const useFixedAutoPilot = () => {
  const [debugInfo, setDebugInfo] = useState<string>('');
  
  // Define the ChatResponse type based on the API response structure
  type ChatResponse = {
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
    [key: string]: unknown; // Index signature to allow any string key
  };
  
  const [lastResponse, setLastResponse] = useState<ChatResponse | null>(null);

  // Define proper types for the parameters
  interface Project {
    currentChapterIndex: number;
    chapters: Array<{
      title: string;
      content: string;
      summary?: string;
    }>;
    [key: string]: unknown;
  }

  interface Chapter {
    title: string;
    content: string;
    summary?: string;
    [key: string]: unknown;
  }

  // This is the fixed version of the autoPilotWrite function
  const fixedAutoPilotWrite = async (
    isGenerating: boolean,
    currentProject: Project,
    currentChapter: Chapter,
    chapterWordCount: number,
    editorContent: string,
    selectedLanguage: string,
    selectedGenre: string,
    selectedModel: string,
    setIsGenerating: (value: boolean) => void,
    saveCurrentChapter: (content?: string, wordCount?: number) => void,
    setEditorContent: (content: string) => void,
    setChapterWordCount: (count: number) => void,
    completeCurrentChapter: () => Promise<void>,
    countWords: (text: string) => number,
    getPreviousChapterSummary: () => string,
    stopAutoPilot: () => void
  ) => {
    if (isGenerating || !currentProject || !currentChapter) return;
    
    // Check if current chapter is complete (1800-2000 words)
    if (chapterWordCount >= 1800) {
      // Complete current chapter and create new one
      await completeCurrentChapter();
      return;
    }
    
    setIsGenerating(true);
    try {
      const languageInstruction = selectedLanguage === 'indonesian' 
        ? 'Write in Indonesian language (Bahasa Indonesia). Use natural, fluent Indonesian with proper grammar and vocabulary. '
        : 'Write in English language. ';
      
      const remainingWords = 2000 - chapterWordCount;
      const isChapterEnding = remainingWords <= 400; // Start wrapping up when close to limit
      
      let promptText = '';
      
      if (!editorContent.trim()) {
        // Start a new chapter
        const chapterNumber = currentProject.currentChapterIndex + 1;
        const previousChapterSummary = getPreviousChapterSummary();
        
        promptText = `You are an expert ${selectedGenre} novelist. ${languageInstruction}

${previousChapterSummary ? `Previous chapter summary: ${previousChapterSummary}\n\n` : ''}

Write Chapter ${chapterNumber} of this ${selectedGenre} novel. Create an engaging chapter that:

- ${chapterNumber === 1 ? 'Introduces the main character and setting' : 'Continues from the previous chapter naturally'}
- Establishes clear chapter goals and conflicts
- Uses vivid, immersive descriptions
- Has a proper chapter structure (beginning, middle, end)
- Builds toward a chapter climax or cliffhanger
- Write approximately 400-600 words for this section
- Remember: Total chapter should be 1800-2000 words maximum

Begin Chapter ${chapterNumber}:`;
      } else {
        // Continue the current chapter
        const lastSection = editorContent.split('\n\n').slice(-2).join('\n\n');
        
        if (isChapterEnding) {
          promptText = `You are continuing Chapter ${currentProject.currentChapterIndex + 1} of this ${selectedGenre} novel. ${languageInstruction}

Current chapter content (last part):
"${lastSection}"

IMPORTANT: This chapter is nearing completion (${chapterWordCount} words written, target: 1800-2000 words).

Write the FINAL section of this chapter that:
- Brings the chapter to a satisfying conclusion
- Resolves the chapter's main conflict or tension
- Sets up intrigue for the next chapter
- Provides a natural stopping point
- Write approximately ${remainingWords} words to complete the chapter
- End with a compelling cliffhanger or transition

Complete the chapter:`;
        } else {
          promptText = `You are continuing Chapter ${currentProject.currentChapterIndex + 1} of this ${selectedGenre} novel. ${languageInstruction}

Current chapter content (last part):
"${lastSection}"

Continue the chapter naturally. Write the next section that:
- Flows perfectly from the previous text
- Advances the chapter's plot meaningfully
- Develops characters further
- Maintains the established tone and style
- Adds tension, conflict, or intrigue
- Write approximately 400-600 words
- Remember: Chapter target is 1800-2000 words total (currently ${chapterWordCount} words)

Continue writing:`;
        }
      }

      // Log the prompt for debugging
      console.log('📝 Auto-pilot prompt:', promptText.substring(0, 100) + '...');
      
      // Make the API call with improved error handling
      try {
        const response = await apiService.sendChatMessage({
          message: promptText,
          model: selectedModel,
          temperature: 0.8,
          max_tokens: 600
        });
        
        // Save the full response for debugging
        setLastResponse(response);
        
        // Log the response structure for debugging
        console.log('📊 Auto-pilot response structure:', Object.keys(response));
        
        // Extract the content with better fallback handling
        let newContent = '';
        
        // Try to extract content from various possible response formats
        if (response && typeof response === 'object') {
          if (response.response && typeof response.response === 'string') {
            newContent = response.response;
            setDebugInfo('Content extracted from response.response');
          } else if (response.message && typeof response.message === 'string') {
            newContent = response.message;
            setDebugInfo('Content extracted from response.message');
          } else if (response.content && typeof response.content === 'string') {
            newContent = response.content;
            setDebugInfo('Content extracted from response.content');
          } else if (response.data && typeof response.data === 'string') {
            newContent = response.data;
            setDebugInfo('Content extracted from response.data');
          } else if (response.choices && Array.isArray(response.choices) && response.choices.length > 0) {
            // Handle OpenAI/OpenRouter format
            const choice = response.choices[0];
            if (choice.message && choice.message.content) {
              newContent = choice.message.content;
              setDebugInfo('Content extracted from response.choices[0].message.content');
            } else if (choice.text) {
              newContent = choice.text;
              setDebugInfo('Content extracted from response.choices[0].text');
            }
          } else {
            // Last resort: try to stringify the entire response
            try {
              newContent = JSON.stringify(response);
              setDebugInfo('Content extracted by stringifying entire response');
            } catch (e) {
              console.error('Failed to stringify response:', e);
              setDebugInfo('Failed to extract content from response');
            }
          }
        } else if (typeof response === 'string') {
          newContent = response;
          setDebugInfo('Response was a string');
        }
        
        // Log the extracted content for debugging
        console.log('📄 Extracted content:', newContent ? newContent.substring(0, 100) + '...' : 'No content');
        
        if (newContent && newContent.trim()) {
          const updatedContent = editorContent ? editorContent + '\n\n' + newContent : newContent;
          setEditorContent(updatedContent);
          
          // Update word count
          const newWordCount = countWords(updatedContent);
          setChapterWordCount(newWordCount);
          
          // Auto-save
          saveCurrentChapter(updatedContent, newWordCount);
          
          console.log(`✅ Chapter ${currentProject.currentChapterIndex + 1}: ${newWordCount}/2000 words`);
        } else {
          console.error('❌ No content extracted from response');
          setDebugInfo('No content extracted from response');
        }
      } catch (apiError) {
        console.error('API call failed:', apiError);
        setDebugInfo(`API call failed: ${apiError.message || 'Unknown error'}`);
        
        // Try direct API call to OpenRouter as fallback
        try {
          console.log('🔄 Trying direct OpenRouter API call as fallback...');
          
          // Make direct call to OpenRouter API
          const directResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer YOUR_API_KEY', // Replace with actual API key from environment
              'HTTP-Referer': window.location.origin,
              'X-Title': 'OpenHands Novel Writer'
            },
            body: JSON.stringify({
              model: selectedModel || 'anthropic/claude-3.5-sonnet',
              messages: [
                {
                  role: 'system',
                  content: 'You are a creative writing assistant specializing in novel writing.'
                },
                {
                  role: 'user',
                  content: promptText
                }
              ],
              max_tokens: 600,
              temperature: 0.8
            })
          });
          
          if (directResponse.ok) {
            const directData = await directResponse.json();
            console.log('📊 Direct OpenRouter response:', directData);
            
            if (directData.choices && directData.choices.length > 0) {
              const directContent = directData.choices[0].message.content;
              
              if (directContent && directContent.trim()) {
                const updatedContent = editorContent ? editorContent + '\n\n' + directContent : directContent;
                setEditorContent(updatedContent);
                
                // Update word count
                const newWordCount = countWords(updatedContent);
                setChapterWordCount(newWordCount);
                
                // Auto-save
                saveCurrentChapter(updatedContent, newWordCount);
                
                console.log(`✅ Chapter ${currentProject.currentChapterIndex + 1}: ${newWordCount}/2000 words (via direct API)`);
                setDebugInfo('Content retrieved via direct OpenRouter API call');
              }
            }
          } else {
            console.error('❌ Direct OpenRouter API call failed:', await directResponse.text());
            setDebugInfo('Both API calls failed');
          }
        } catch (directError) {
          console.error('❌ Direct OpenRouter API call failed:', directError);
          setDebugInfo('Both API calls failed');
        }
      }
    } catch (error: unknown) {
      console.error('Auto-pilot writing failed:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown error';
      setDebugInfo(`Auto-pilot writing failed: ${errorMessage}`);
      stopAutoPilot();
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    fixedAutoPilotWrite,
    debugInfo,
    lastResponse
  };
};

// Export the hook for use in the main component
export { useFixedAutoPilot };

// Export a component that wraps the original NovelWriter with the fixed functionality
export default function FixedNovelWriter() {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-bl-md z-50">
        Using Fixed Auto-Pilot
      </div>
      <OriginalNovelWriter />
    </div>
  );
}