import axios from 'axios'
import { config, endpoints } from '@/lib/config'

// Improved ChatResponse interface with more possible response formats
export interface ImprovedChatResponse {
  response?: string
  message?: string
  content?: string
  data?: string
  conversation_id?: string
  model?: string
  timestamp?: string
  status?: string
  choices?: Array<{
    message?: {
      content?: string
      role?: string
    }
    text?: string
    index?: number
  }>
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  error?: {
    message: string;
    type?: string;
    code?: string | number;
    [key: string]: unknown;
  }
  debug_info?: string
  [key: string]: unknown // Index signature to allow any string key
}

// Create a new axios instance with enhanced error handling
const improvedApi = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 60000, // Increased timeout for novel generation
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  maxRedirects: 5,
  validateStatus: (status) => status < 500,
})

// Add request interceptor with detailed logging
improvedApi.interceptors.request.use(
  (config) => {
    console.log(`🚀 Improved API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data)
    
    // Add security headers
    if (config.headers) {
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
    }
    
    return config
  },
  (error) => {
    console.error('❌ Improved API Request Error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor with detailed logging
improvedApi.interceptors.response.use(
  (response) => {
    console.log(`✅ Improved API Response: ${response.status} ${response.config.url}`, response.data)
    return response
  },
  (error) => {
    console.error('❌ Improved API Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: error.config
    })
    
    return Promise.reject({
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    })
  }
)

// Helper function to extract content from various response formats
export const extractContent = (response: ImprovedChatResponse | null): string => {
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

// Improved API service with better error handling and response processing
export const improvedApiService = {
  // Chat with OpenRouter API with improved error handling
  async sendChatMessage(data: {
    message: string
    conversation_id?: string
    model?: string
    api_key?: string
    stream?: boolean
    max_tokens?: number
    temperature?: number
  }): Promise<ImprovedChatResponse> {
    try {
      console.log('📤 Sending chat message:', {
        endpoint: endpoints.chatMessage,
        model: data.model,
        messageLength: data.message.length,
        maxTokens: data.max_tokens
      })
      
      // Try backend API first
      try {
        const response = await improvedApi.post(endpoints.chatMessage, data)
        
        // Process and validate the response
        const responseData = response.data
        console.log('📥 Received chat response:', {
          status: response.status,
          dataType: typeof responseData,
          hasResponse: Boolean(responseData?.response),
          hasMessage: Boolean(responseData?.message),
          hasContent: Boolean(responseData?.content),
          hasChoices: Boolean(responseData?.choices),
          keys: Object.keys(responseData || {})
        })
        
        // Extract content to verify we got a valid response
        const content = extractContent(responseData)
        
        if (content) {
          // Return the response with debug info
          return {
            ...responseData,
            debug_info: `Response received with status ${response.status}`,
            source: 'backend'
          }
        } else {
          throw new Error('No content could be extracted from backend response')
        }
      } catch (backendError) {
        console.error('❌ Backend API failed:', backendError)
        
        // Try novel writing endpoint as fallback
        try {
          console.log('🔄 Attempting novel writing endpoint as fallback...')
          
          const novelResponse = await improvedApi.post('/novel/write', {
            message: data.message,
            model: data.model,
            template: 'plot-structure'
          })
          
          const novelContent = extractContent(novelResponse.data)
          
          if (novelContent) {
            return {
              ...novelResponse.data,
              debug_info: 'Response from novel writing endpoint',
              source: 'novel'
            }
          } else {
            throw new Error('No content could be extracted from novel writing response')
          }
        } catch (novelError) {
          console.error('❌ Novel writing endpoint failed:', novelError)
          
          // Try direct OpenRouter API as final fallback
          try {
            console.log('🔄 Attempting direct OpenRouter API call as final fallback...')
            
            // Get API key from localStorage or environment
            const apiKey = localStorage.getItem('openrouter_api_key') || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
            
            if (!apiKey) {
              throw new Error('No OpenRouter API key available for fallback')
            }
            
            const directResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': window.location.origin,
                'X-Title': 'OpenHands Novel Writer'
              },
              body: JSON.stringify({
                model: data.model || 'anthropic/claude-3.5-sonnet',
                messages: [
                  {
                    role: 'system',
                    content: 'You are a creative writing assistant specializing in novel writing.'
                  },
                  {
                    role: 'user',
                    content: data.message
                  }
                ],
                max_tokens: data.max_tokens || 600,
                temperature: data.temperature || 0.7
              })
            })
            
            if (directResponse.ok) {
              const directData = await directResponse.json()
              console.log('📥 Received direct OpenRouter response:', directData)
              
              const directContent = extractContent(directData)
              
              if (directContent) {
                return {
                  ...directData,
                  response: directContent,
                  debug_info: 'Response from direct OpenRouter API call',
                  source: 'direct'
                }
              } else {
                throw new Error('No content could be extracted from direct OpenRouter response')
              }
            } else {
              throw new Error(`Direct OpenRouter API call failed with status ${directResponse.status}`)
            }
          } catch (directError) {
            console.error('❌ All fallback methods failed:', directError)
            
            // Return error response with all failure information
            return {
              error: {
                message: 'All API methods failed',
                backendError: backendError instanceof Error ? backendError.message : 'Unknown backend error',
                novelError: novelError instanceof Error ? novelError.message : 'Unknown novel endpoint error',
                directError: directError instanceof Error ? directError.message : 'Unknown direct API error'
              },
              debug_info: 'All API methods failed',
              source: 'none'
            }
          }
        }
      }
    } catch (error) {
      console.error('❌ Improved sendChatMessage error:', error)
      
      // Return error response
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        error: {
          message: errorMessage
        },
        debug_info: `API call failed: ${errorMessage}`,
        source: 'error'
      }
    }
  },
  
  // Test all API methods and return the first successful one
  async testAllMethods(message: string, model: string = 'anthropic/claude-3.5-sonnet'): Promise<{
    backend: ImprovedChatResponse | null,
    novel: ImprovedChatResponse | null,
    direct: ImprovedChatResponse | null,
    working: 'backend' | 'novel' | 'direct' | 'none'
  }> {
    const results: {
      backend: ImprovedChatResponse | null,
      novel: ImprovedChatResponse | null,
      direct: ImprovedChatResponse | null,
      working: 'backend' | 'novel' | 'direct' | 'none'
    } = {
      backend: null,
      novel: null,
      direct: null,
      working: 'none'
    };
    
    // Test backend API
    try {
      const backendResponse = await improvedApi.post(endpoints.chatMessage, {
        message,
        model
      });
      
      results.backend = backendResponse.data;
      
      if (extractContent(backendResponse.data)) {
        results.working = 'backend';
        return results;
      }
    } catch (error) {
      console.error('Backend API test failed:', error);
    }
    
    // Test novel writing endpoint
    try {
      const novelResponse = await improvedApi.post('/novel/write', {
        message,
        template: 'plot-structure'
      });
      
      results.novel = novelResponse.data;
      
      if (extractContent(novelResponse.data)) {
        results.working = 'novel';
        return results;
      }
    } catch (error) {
      console.error('Novel writing endpoint test failed:', error);
    }
    
    // Test direct OpenRouter API
    try {
      const apiKey = localStorage.getItem('openrouter_api_key');
      
      if (apiKey) {
        const directResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'OpenHands Novel Writer Test'
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 100,
            temperature: 0.7
          })
        });
        
        if (directResponse.ok) {
          const directData = await directResponse.json();
          results.direct = directData;
          
          if (extractContent(directData)) {
            results.working = 'direct';
            return results;
          }
        }
      }
    } catch (error) {
      console.error('Direct OpenRouter API test failed:', error);
    }
    
    return results;
  }
};

export default improvedApi;