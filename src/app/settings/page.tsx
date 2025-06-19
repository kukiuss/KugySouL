'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  Bot, 
  Globe, 
  Shield, 
  Zap,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { apiService } from '@/services/api'
import type { ApiConfig } from '@/types'

export default function SettingsPage() {
  const [config, setConfig] = useState<ApiConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [apiKey, setApiKey] = useState('')
  const [baseUrl, setBaseUrl] = useState('https://minatoz997-backend66.hf.space')

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    try {
      setLoading(true)
      const configData = await apiService.getConfig()
      setConfig(configData)
      setStatus('success')
    } catch (error) {
      console.error('Failed to load config:', error)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    try {
      setSaving(true)
      const health = await apiService.checkHealth()
      if (health === 'OK') {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Connection test failed:', error)
      setStatus('error')
    } finally {
      setSaving(false)
    }
  }

  const saveSettings = async () => {
    try {
      setSaving(true)
      // In a real app, you would save these settings
      // For now, we'll just simulate a save
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
    } catch (error) {
      console.error('Failed to save settings:', error)
      setStatus('error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <SettingsIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Configure your KugySouL experience
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* API Configuration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <span>API Configuration</span>
                  </CardTitle>
                  <CardDescription>
                    Configure the connection to KugySouL backend
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Backend URL
                    </label>
                    <Input
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="https://minatoz997-backend66.hf.space"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      API Key (Optional)
                    </label>
                    <Input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your API key if required"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button onClick={testConnection} disabled={saving}>
                      {saving ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Zap className="mr-2 h-4 w-4" />
                      )}
                      Test Connection
                    </Button>
                    <Button onClick={saveSettings} variant="gradient" disabled={saving}>
                      {saving ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Model Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-purple-600" />
                    <span>AI Model Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Configure AI model preferences and behavior
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Default Model
                    </label>
                    <Input
                      value="openrouter/anthropic/claude-3-haiku-20240307"
                      disabled
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Model is configured on the backend
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Max Iterations
                    </label>
                    <Input
                      value="30"
                      disabled
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum number of iterations per task
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Security Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>Security & Privacy</span>
                  </CardTitle>
                  <CardDescription>
                    Security and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-200">
                        Public API Mode
                      </h4>
                      <p className="text-sm text-green-600 dark:text-green-300">
                        No authentication required for testing
                      </p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-200">
                        Memory-based Storage
                      </h4>
                      <p className="text-sm text-blue-600 dark:text-blue-300">
                        Conversations are not persisted
                      </p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Status Panel */}
          <div className="space-y-6">
            {/* Connection Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Connection Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Checking connection...
                      </span>
                    </div>
                  ) : status === 'success' ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">
                        Connected successfully
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-600">
                        Connection failed
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Backend Info */}
            {config && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Backend Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        App Mode:
                      </span>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {config.APP_MODE}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Billing:
                      </span>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {config.FEATURE_FLAGS.ENABLE_BILLING ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        LLM Settings:
                      </span>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {config.FEATURE_FLAGS.HIDE_LLM_SETTINGS ? 'Hidden' : 'Visible'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/chat">
                      <Bot className="mr-2 h-4 w-4" />
                      Start New Chat
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={loadConfig}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Config
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://minatoz997-backend66.hf.space/docs" target="_blank">
                      <Globe className="mr-2 h-4 w-4" />
                      API Docs
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}