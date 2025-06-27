import axios from 'axios';

// Define types
type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type ChatRequest = {
  message: string;
  model?: string;
  max_tokens?: number;
  temperature?: number;
  system_message?: string;
};

type ChatResponse = {
  response: string;
  model?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

// Function to count words in a string
const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(Boolean).length;
};

// Function to extract content from various response formats
const extractContent = (response: any): string => {
  // If response is a string, return it directly
  if (typeof response === 'string') {
    return response;
  }
  
  // If response has a 'response' field (our API format)
  if (response?.response) {
    return response.response;
  }
  
  // If response has a 'choices' array (OpenAI format)
  if (response?.choices && Array.isArray(response.choices) && response.choices.length > 0) {
    const choice = response.choices[0];
    if (choice.message?.content) {
      return choice.message.content;
    }
    if (choice.text) {
      return choice.text;
    }
  }
  
  // If response has a 'content' field (some API formats)
  if (response?.content) {
    return response.content;
  }
  
  // If we can't extract content, return empty string
  console.error('Could not extract content from response:', response);
  return '';
};

// Function to send a chat message to the API
export const sendChatMessage = async (request: ChatRequest): Promise<string> => {
  const { message, model = 'gpt-3.5-turbo', max_tokens = 1500, temperature = 0.7, system_message } = request;
  
  // Add system message to request for better word count control
  const systemMsg = system_message || "You are a creative writing assistant. Generate detailed, descriptive content with at least 500-800 words per response. Be thorough and elaborate in your writing.";
  
  try {
    // First attempt
    const response = await axios.post<ChatResponse>('https://minatoz997-backend66.hf.space/chat/message', {
      message,
      model,
      max_tokens,
      temperature,
      system_message: systemMsg
    });
    
    let content = extractContent(response.data);
    let wordCount = countWords(content);
    
    // If response is too short (less than 400 words), try again with stronger instructions
    if (wordCount < 400) {
      console.log(`First response too short (${wordCount} words). Retrying with stronger instructions...`);
      
      const retryResponse = await axios.post<ChatResponse>('https://minatoz997-backend66.hf.space/chat/message', {
        message: message + "\n\nIMPORTANT: Your previous response was too short. Please provide AT LEAST 500-800 words in your response. Be much more detailed and descriptive.",
        model,
        max_tokens: Math.max(max_tokens, 1500), // Ensure we have enough tokens
        temperature,
        system_message: "You MUST write at least 500-800 words in your response. Be extremely detailed and descriptive. Elaborate on all points extensively."
      });
      
      content = extractContent(retryResponse.data);
      wordCount = countWords(content);
      
      // If still too short, log warning but return what we have
      if (wordCount < 400) {
        console.warn(`Retry still produced short response (${wordCount} words).`);
      } else {
        console.log(`Retry successful! Generated ${wordCount} words.`);
      }
    } else {
      console.log(`Generated ${wordCount} words successfully.`);
    }
    
    return content;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};
