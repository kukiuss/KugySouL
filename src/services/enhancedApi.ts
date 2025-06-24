import axios from 'axios'
import { config, endpoints } from '@/lib/config'
import { apiService } from './api'

// Enhanced ChatResponse interface with more possible response formats
interface EnhancedChatResponse {
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
}

// Create a new axios instance with enhanced error handling
const enhancedApi = axios.create({
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
enhancedApi.interceptors.request.use(
  (config) => {
    console.log(`🚀 Enhanced API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data)
    
    // Add security headers
    if (config.headers) {
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
    }
    
    return config
  },
  (error) => {
    console.error('❌ Enhanced API Request Error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor with detailed logging
enhancedApi.interceptors.response.use(
  (response) => {
    console.log(`✅ Enhanced API Response: ${response.status} ${response.config.url}`, response.data)
    return response
  },
  (error) => {
    console.error('❌ Enhanced API Response Error:', {
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

// Enhanced API service with better error handling and response processing
export const enhancedApiService = {
  // Extend the original API service
  ...apiService,
  
  // Override the sendChatMessage method with enhanced error handling and response processing
  async sendChatMessage(data: {
    message: string
    conversation_id?: string
    model?: string
    api_key?: string
    stream?: boolean
    max_tokens?: number
    temperature?: number
  }): Promise<EnhancedChatResponse> {
    try {
      console.log('📤 Sending chat message:', {
        endpoint: endpoints.chatMessage,
        model: data.model,
        messageLength: data.message.length,
        maxTokens: data.max_tokens
      })
      
      const response = await enhancedApi.post(endpoints.chatMessage, data)
      
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
      
      // Return the response with debug info
      return {
        ...responseData,
        debug_info: `Response received with status ${response.status}`
      }
    } catch (error) {
      console.error('❌ Enhanced sendChatMessage error:', error)
      
      // Try fallback to direct OpenRouter API if backend fails
      try {
        console.log('🔄 Attempting direct OpenRouter API call as fallback...')
        
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
          
          return {
            ...directData,
            response: directData.choices?.[0]?.message?.content,
            debug_info: 'Response from direct OpenRouter API call'
          }
        } else {
          throw new Error(`Direct OpenRouter API call failed with status ${directResponse.status}`)
        }
      } catch (fallbackError) {
        console.error('❌ Fallback to direct OpenRouter API failed:', fallbackError)
        
        // Return error response
        return {
          error: error,
          debug_info: `API call failed: ${error.message || 'Unknown error'}. Fallback also failed: ${fallbackError.message || 'Unknown error'}`
        }
      }
    }
  },
  
  // Add a method to test the OpenRouter API directly
  async testOpenRouterDirect(message: string, model: string = 'anthropic/claude-3.5-sonnet'): Promise<EnhancedChatResponse> {
    try {
      console.log('🧪 Testing direct OpenRouter API call...')
      
      // Get API key from localStorage or environment
      const apiKey = localStorage.getItem('openrouter_api_key') || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
      
      if (!apiKey) {
        throw new Error('No OpenRouter API key available')
      }
      
      const directResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'OpenHands Novel Writer Test'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 100,
          temperature: 0.7
        })
      })
      
      if (directResponse.ok) {
        const directData = await directResponse.json()
        console.log('📥 Received direct OpenRouter test response:', directData)
        
        return {
          ...directData,
          response: directData.choices?.[0]?.message?.content,
          debug_info: 'Test response from direct OpenRouter API call'
        }
      } else {
        throw new Error(`Direct OpenRouter API test failed with status ${directResponse.status}`)
      }
    } catch (error) {
      console.error('❌ Direct OpenRouter API test failed:', error)
      
      return {
        error: error,
        debug_info: `Direct API test failed: ${error.message || 'Unknown error'}`
      }
    }
  },
  
  // Add a method to test the backend OpenRouter integration
  async testBackendOpenRouter(message: string, model: string = 'anthropic/claude-3.5-sonnet'): Promise<EnhancedChatResponse> {
    try {
      console.log('🧪 Testing backend OpenRouter integration...')
      
      const response = await enhancedApi.post('/openrouter/test', {
        message: message,
        model: model
      })
      
      console.log('📥 Received backend OpenRouter test response:', response.data)
      
      return {
        ...response.data,
        debug_info: 'Test response from backend OpenRouter integration'
      }
    } catch (error) {
      console.error('❌ Backend OpenRouter test failed:', error)
      
      return {
        error: error,
        debug_info: `Backend API test failed: ${error.message || 'Unknown error'}`
      }
    }
  },
  
  // Add a method to test the novel writing endpoint
  async testNovelWriting(message: string, template: string = 'character-development'): Promise<EnhancedChatResponse> {
    try {
      console.log('🧪 Testing novel writing endpoint...')
      
      const response = await enhancedApi.post('/novel/write', {
        message: message,
        template: template
      })
      
      console.log('📥 Received novel writing test response:', response.data)
      
      return {
        ...response.data,
        response: response.data.response,
        debug_info: 'Test response from novel writing endpoint'
      }
    } catch (error) {
      console.error('❌ Novel writing test failed:', error)
      
      return {
        error: error,
        debug_info: `Novel writing test failed: ${error.message || 'Unknown error'}`
      }
    }
  }
}

export default enhancedApi