'use client';

// This is a direct fix for the NovelWriter component's autoPilotWrite function
// It replaces the original function with a fixed version that properly handles the OpenRouter API response

import React, { useEffect } from 'react';
import { improvedApiService } from '@/services/improvedApi';

export default function DirectFixNovelWriter() {
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      console.log('🔧 DirectFixNovelWriter: Applying direct fix to autoPilotWrite function...');
      
      // Define the fixed autoPilotWrite function
      window.fixedAutoPilotWrite = async function(
        isGenerating,
        currentProject,
        currentChapter,
        chapterWordCount,
        editorContent,
        selectedLanguage,
        selectedGenre,
        selectedModel,
        setIsGenerating,
        saveCurrentChapter,
        setEditorContent,
        setChapterWordCount,
        completeCurrentChapter,
        countWords,
        getPreviousChapterSummary,
        stopAutoPilot,
        setAutoPilotStatus
      ) {
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

          console.log('📝 Auto-pilot prompt:', promptText.substring(0, 100) + '...');
          
          // Use the improved API service to handle all fallback mechanisms
          setAutoPilotStatus('backend');
          const response = await improvedApiService.sendChatMessage({
            message: promptText,
            model: selectedModel,
            temperature: 0.8,
            max_tokens: 600
          });
          
          console.log('📊 Auto-pilot response:', response);
          
          // Set the appropriate status based on the source
          if (response.source === 'backend') {
            setAutoPilotStatus('backend');
          } else if (response.source === 'novel') {
            setAutoPilotStatus('novel');
          } else if (response.source === 'direct') {
            setAutoPilotStatus('direct');
          } else {
            setAutoPilotStatus('fallback');
          }
          
          // Extract content from the response
          let newContent = '';
          
          if (response.response && typeof response.response === 'string') {
            newContent = response.response;
          } else if (response.message && typeof response.message === 'string') {
            newContent = response.message;
          } else if (response.content && typeof response.content === 'string') {
            newContent = response.content;
          } else if (response.data && typeof response.data === 'string') {
            newContent = response.data;
          } else if (response.choices && Array.isArray(response.choices) && response.choices.length > 0) {
            const choice = response.choices[0];
            if (choice.message && choice.message.content) {
              newContent = choice.message.content;
            } else if (choice.text) {
              newContent = choice.text;
            }
          }
          
          console.log('📄 Final extracted content:', newContent ? newContent.substring(0, 100) + '...' : 'No content');
          
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
            console.error('❌ No content could be extracted from any API response');
            setAutoPilotStatus('fallback');
            
            // Create a fallback content to avoid completely failing
            const fallbackContent = `[Chapter ${currentProject.currentChapterIndex + 1} continues...]

The story continues with more exciting developments. The characters face new challenges and grow through their experiences.

(Auto-pilot temporarily unavailable. Please try again later or continue writing manually.)`;
            
            const updatedContent = editorContent ? editorContent + '\n\n' + fallbackContent : fallbackContent;
            setEditorContent(updatedContent);
            
            // Update word count
            const newWordCount = countWords(updatedContent);
            setChapterWordCount(newWordCount);
            
            // Auto-save
            saveCurrentChapter(updatedContent, newWordCount);
          }
        } catch (error) {
          console.error('Auto-pilot writing failed:', error);
          setAutoPilotStatus('fallback');
          
          // Create a fallback content to avoid completely failing
          const fallbackContent = `[Chapter ${currentProject.currentChapterIndex + 1} continues...]

The story continues with more exciting developments. The characters face new challenges and grow through their experiences.

(Auto-pilot temporarily unavailable: ${error.message || 'Unknown error'}. Please try again later or continue writing manually.)`;
          
          const updatedContent = editorContent ? editorContent + '\n\n' + fallbackContent : fallbackContent;
          setEditorContent(updatedContent);
          
          // Update word count
          const newWordCount = countWords(updatedContent);
          setChapterWordCount(newWordCount);
          
          // Auto-save
          saveCurrentChapter(updatedContent, newWordCount);
          
          stopAutoPilot();
        } finally {
          setIsGenerating(false);
          // Reset status after a delay
          setTimeout(() => {
            setAutoPilotStatus('idle');
          }, 3000);
        }
      };
      
      // Replace the original autoPilotWrite function with the fixed version
      const checkInterval = setInterval(() => {
        if (window.autoPilotWrite) {
          window.originalAutoPilotWrite = window.autoPilotWrite;
          window.autoPilotWrite = window.fixedAutoPilotWrite;
          console.log('✅ DirectFixNovelWriter: Successfully replaced autoPilotWrite function');
          clearInterval(checkInterval);
        }
      }, 500);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        console.warn('⚠️ DirectFixNovelWriter: Could not find autoPilotWrite function to replace');
      }, 10000);
    }
  }, []);
  
  // This component doesn't render anything
  return null;
}