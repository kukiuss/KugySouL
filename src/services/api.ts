import axios from 'axios'
import { config, endpoints } from '@/lib/config'
import type { 
  ApiConfig, 
  CreateConversationRequest, 
  CreateConversationResponse 
} from '@/types'

// Additional interfaces for chat functionality
interface ChatResponse {
  message: string
  conversation_id?: string
  model?: string
  timestamp?: string
  status?: string
}

interface ChatServiceInfo {
  name: string
  version: string
  description: string
  status: string
  endpoints: Record<string, string>
}

const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  // Security configurations
  withCredentials: false, // Don't send cookies for security
  maxRedirects: 5,
  validateStatus: (status) => status < 500, // Accept 4xx as valid responses
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    }
    
    // Add security headers
    if (config.headers) {
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
    }
    
    return config
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Request Error:', error)
    }
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    }
    return response
  },
  (error) => {
    // Only log detailed errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Response Error:', error.response?.status, error.response?.data)
    }
    
    // Sanitize error for production
    const sanitizedError = {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
    }
    
    return Promise.reject(sanitizedError)
  }
)

export const apiService = {
  // Health check
  async checkHealth(): Promise<string> {
    const response = await api.get(endpoints.health)
    return response.data
  },

  // Get configuration
  async getConfig(): Promise<ApiConfig> {
    const response = await api.get(endpoints.config)
    return response.data
  },

  // Create conversation
  async createConversation(data: CreateConversationRequest): Promise<CreateConversationResponse> {
    const response = await api.post(endpoints.conversations, data)
    return response.data
  },

  // Generic GET request
  async get<T>(url: string): Promise<T> {
    const response = await api.get(url)
    return response.data
  },

  // Generic POST request
  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await api.post(url, data)
    return response.data
  },

  // Generic PUT request
  async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await api.put(url, data)
    return response.data
  },

  // Generic DELETE request
  async delete<T>(url: string): Promise<T> {
    const response = await api.delete(url)
    return response.data
  },

  // Chat with OpenRouter API
  async sendChatMessage(data: {
    message: string
    conversation_id?: string
    model?: string
    api_key?: string
    stream?: boolean
    max_tokens?: number
    temperature?: number
  }): Promise<ChatResponse> {
    const response = await api.post('/chat/message', data)
    return response.data
  },

  // Get chat service info
  async getChatInfo(): Promise<ChatServiceInfo> {
    const response = await api.get('/chat/')
    return response.data
  },
}

export default api