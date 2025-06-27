import axios from 'axios';

// Define types
// Define message type for chat API (used internally)
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

type ChatRequest = {
  message: string;
  model?: string;
  max_tokens?: number;
  temperature?: number;
  system_message?: string;
  conversation_id?: string;
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
const extractContent = (response: unknown): string => {
  // If response is a string, return it directly
  if (typeof response === 'string') {
    return response;
  }
  
  // If response is an object, check for known properties
  if (response && typeof response === 'object') {
    // If response has a 'response' field (our API format)
    if ('response' in response && typeof (response as any).response === 'string') {
      return (response as any).response;
    }
    
    // If response has a 'choices' array (OpenAI format)
    if ('choices' in response && Array.isArray((response as any).choices) && (response as any).choices.length > 0) {
      const choice = (response as any).choices[0];
      if (choice.message?.content) {
        return choice.message.content;
      }
      if (choice.text) {
        return choice.text;
      }
    }
  }
  
  // If response is an object, check for 'content' field (some API formats)
  if (response && typeof response === 'object' && 'content' in response) {
    return (response as any).content;
  }
  
  // If we can't extract content, return empty string
  console.error('Could not extract content from response:', response);
  return '';
};

// Function to send a chat message to the API
export const sendChatMessage = async (request: ChatRequest): Promise<ChatResponse> => {
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
    
    return { response: content, model };
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

// Get configuration from the server
export const getConfig = async () => {
  try {
    const response = await axios.get('/api/config');
    return response.data;
  } catch (error) {
    console.error('Error getting config:', error);
    throw error;
  }
};

// Check health of the API
export const checkHealth = async () => {
  try {
    const response = await axios.get('/api/health');
    return response.data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

// Create a new conversation
export const createConversation = async (data: { initial_user_msg: string }) => {
  try {
    const response = await axios.post('/api/conversations', data);
    return response.data;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};

// Check AI detection
export const checkAIDetection = async (data: { text: string }) => {
  try {
    const response = await axios.post('/api/ai-detection', data);
    return response.data;
  } catch (error) {
    console.error('Error checking AI detection:', error);
    throw error;
  }
};

// Generate human content
export const generateHumanContent = async (data: { prompt: string, length: number }) => {
  try {
    const response = await axios.post('/api/human-content', data);
    return response.data;
  } catch (error) {
    console.error('Error generating human content:', error);
    throw error;
  }
};

// Login
export const login = async (data: { email: string, password: string }) => {
  try {
    const response = await axios.post('/api/auth/login', data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Humanize text
export const humanizeText = async (data: { ai_text: string }) => {
  try {
    const response = await axios.post('/api/humanize', data);
    return response.data;
  } catch (error) {
    console.error('Error humanizing text:', error);
    throw error;
  }
};

// Analyze writing style
export const analyzeWritingStyle = async (data: { text_samples: string[] }) => {
  try {
    const response = await axios.post('/api/analyze-style', data);
    return response.data;
  } catch (error) {
    console.error('Error analyzing writing style:', error);
    throw error;
  }
};

// Export API service for backward compatibility with existing components
export const apiService = {
  sendChatMessage,
  getConfig,
  checkHealth,
  createConversation,
  checkAIDetection,
  generateHumanContent,
  login,
  humanizeText,
  analyzeWritingStyle
};
