// OpenRouter service for frontend implementation
import axios from 'axios';

// Function to count words in a string
export const countWords = (text) => {
  return text.trim().split(/\s+/).filter(Boolean).length;
};

// OpenRouter API service
export class OpenRouterService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
  }

  // Send a request to OpenRouter API
  async sendRequest(model, messages, maxTokens = 4000, temperature = 0.7) {
    try {
      const response = await axios.post(
        this.baseUrl,
        {
          model,
          messages,
          max_tokens: maxTokens,
          temperature
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'HTTP-Referer': window.location.href,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error sending request to OpenRouter:', error.response?.data || error.message);
      throw error;
    }
  }

  // Generate content with a specific model
  async generateContent(model, prompt, systemMessage, maxTokens = 4000, temperature = 0.7) {
    const messages = [
      { role: 'system', content: systemMessage },
      { role: 'user', content: prompt }
    ];

    const response = await this.sendRequest(model, messages, maxTokens, temperature);
    
    // Extract content from response
    let content = '';
    if (response.choices && response.choices.length > 0) {
      content = response.choices[0].message.content;
    }

    // Calculate tokens and cost
    const inputTokens = response.usage.prompt_tokens;
    const outputTokens = response.usage.completion_tokens;
    const totalTokens = response.usage.total_tokens;

    // Count words
    const wordCount = countWords(content);

    return {
      content,
      wordCount,
      tokens: {
        input: inputTokens,
        output: outputTokens,
        total: totalTokens
      },
      model
    };
  }

  // Generate novel content with autopilot mode
  async generateNovelWithAutopilot(model, initialPrompt, targetWordCount = 2000, maxIterations = 5, onProgress = null) {
    let currentContent = '';
    let totalWordCount = 0;
    let iteration = 0;
    let allResults = [];

    // Initial generation
    console.log(`Starting novel generation with model: ${model}`);
    console.log(`Target word count: ${targetWordCount} words`);

    const systemMessage = "You are a professional novelist. Generate detailed, descriptive content with at least 500-800 words per response. Be thorough and elaborate in your writing. Focus on vivid descriptions, character development, and engaging dialogue.";
    
    // Call progress callback if provided
    if (onProgress) {
      onProgress({
        status: 'generating',
        message: `Generating initial content with ${model}...`,
        progress: 0,
        currentWordCount: 0,
        targetWordCount
      });
    }
    
    const initialResult = await this.generateContent(model, initialPrompt, systemMessage);
    
    currentContent = initialResult.content;
    totalWordCount = initialResult.wordCount;
    
    console.log(`Initial generation: ${initialResult.wordCount} words`);
    
    allResults.push({
      iteration: 1,
      wordCount: initialResult.wordCount,
      tokens: initialResult.tokens
    });
    
    // Call progress callback if provided
    if (onProgress) {
      onProgress({
        status: 'progress',
        message: `Generated ${initialResult.wordCount} words (${Math.round((totalWordCount / targetWordCount) * 100)}%)`,
        progress: totalWordCount / targetWordCount,
        currentWordCount: totalWordCount,
        targetWordCount
      });
    }
    
    iteration = 1;
    
    // Continue generating until we reach the target word count or max iterations
    while (totalWordCount < targetWordCount && iteration < maxIterations) {
      // Get the last part of the current content for context
      const contextLength = Math.min(1000, currentContent.length);
      const lastSection = currentContent.slice(-contextLength);
      
      // Create continuation prompt
      const continuationPrompt = `
CURRENT PROGRESS: ${totalWordCount}/${targetWordCount} words

LAST PART OF THE STORY:
"${lastSection}"

TASK: Continue the story from exactly where it left off. Write the NEXT 500-800 words that naturally follow from the ending point above.

IMPORTANT: 
- Continue from the exact point where the story ended
- DO NOT repeat or rewrite any existing content
- Maintain the same style, tone, and character voice
- Write AT LEAST 500-800 new words
- Be detailed and descriptive
`;
      
      const continuationSystemMessage = "You are a creative writing assistant specialized in novel writing. Your task is to CONTINUE the story from exactly where it left off. DO NOT rewrite or repeat any existing content. Generate at least 500-800 new words that continue the narrative. Be detailed and descriptive.";
      
      // Call progress callback if provided
      if (onProgress) {
        onProgress({
          status: 'generating',
          message: `Generating continuation ${iteration + 1}...`,
          progress: totalWordCount / targetWordCount,
          currentWordCount: totalWordCount,
          targetWordCount
        });
      }
      
      const continuationResult = await this.generateContent(model, continuationPrompt, continuationSystemMessage);
      
      const continuationContent = continuationResult.content;
      const continuationWordCount = continuationResult.wordCount;
      
      // Append to current content
      currentContent += '\n\n' + continuationContent;
      totalWordCount += continuationWordCount;
      
      console.log(`Continuation ${iteration}: ${continuationWordCount} words (Total: ${totalWordCount}/${targetWordCount})`);
      
      allResults.push({
        iteration: iteration + 1,
        wordCount: continuationWordCount,
        tokens: continuationResult.tokens
      });
      
      // Call progress callback if provided
      if (onProgress) {
        onProgress({
          status: 'progress',
          message: `Generated ${continuationWordCount} more words (${Math.round((totalWordCount / targetWordCount) * 100)}%)`,
          progress: Math.min(1, totalWordCount / targetWordCount),
          currentWordCount: totalWordCount,
          targetWordCount
        });
      }
      
      iteration++;
    }
    
    // Call progress callback if provided
    if (onProgress) {
      onProgress({
        status: 'complete',
        message: `Completed with ${totalWordCount} words in ${iteration} iterations`,
        progress: 1,
        currentWordCount: totalWordCount,
        targetWordCount
      });
    }
    
    return {
      content: currentContent,
      totalWordCount,
      iterations: iteration,
      targetReached: totalWordCount >= targetWordCount,
      results: allResults
    };
  }
}

// Create and export a singleton instance
export const createOpenRouterService = (apiKey) => {
  return new OpenRouterService(apiKey);
};