'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Copy, Check, Terminal, Code2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const demoSteps = [
  {
    step: 1,
    title: "Ask a Question",
    description: "Start by asking KugySouL to help with any task",
    code: "Create a Python function to calculate fibonacci numbers",
    type: "input"
  },
  {
    step: 2,
    title: "AI Analyzes",
    description: "The AI understands your request and plans the solution",
    code: "I'll create a fibonacci function for you. Let me write the code...",
    type: "thinking"
  },
  {
    step: 3,
    title: "Code Execution",
    description: "AI writes and executes the code in real-time",
    code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Test the function
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,
    type: "code"
  },
  {
    step: 4,
    title: "Results Delivered",
    description: "Get the working solution with explanations",
    code: `F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8
F(7) = 13
F(8) = 21
F(9) = 34`,
    type: "output"
  }
]

// Typing Animation Component
const TypingAnimation = ({ text, speed = 50 }: { text: string, speed?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  useEffect(() => {
    setDisplayText('')
    setCurrentIndex(0)
  }, [text])

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-2 h-5 bg-green-400 ml-1"
      />
    </span>
  )
}

export function EnhancedDemoSection() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [copied, setCopied] = useState(false)
  const [playInterval, setPlayInterval] = useState<NodeJS.Timeout | null>(null)

  const togglePlay = () => {
    if (isPlaying) {
      // Pause
      setIsPlaying(false)
      if (playInterval) {
        clearInterval(playInterval)
        setPlayInterval(null)
      }
    } else {
      // Play
      setIsPlaying(true)
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < demoSteps.length - 1) {
            return prev + 1
          } else {
            clearInterval(interval)
            setIsPlaying(false)
            setPlayInterval(null)
            return 0
          }
        })
      }, 3000)
      setPlayInterval(interval)
    }
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    if (playInterval) {
      clearInterval(playInterval)
      setPlayInterval(null)
    }
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(demoSteps[currentStep].code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'input': return '💬'
      case 'thinking': return '🧠'
      case 'code': return '💻'
      case 'output': return '✨'
      default: return '📝'
    }
  }

  const getCodeLanguage = (type: string) => {
    switch (type) {
      case 'code': return 'python'
      case 'output': return 'output'
      default: return 'text'
    }
  }

  return (
    <section id="demo" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
          >
            <Code2 className="w-8 h-8 text-blue-500/30" />
          </motion.div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-green-200/20 dark:border-green-700/20 mb-6"
          >
            <Terminal className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Live Demo</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl mb-4"
          >
            See KugySouL{' '}
            <motion.span 
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              In Action
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Watch how KugySouL handles a typical coding request from start to finish.
            Experience the power of AI-driven development in real-time.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Enhanced Demo Controls and Steps */}
          <div className="space-y-8">
            {/* Enhanced Controls */}
            <motion.div 
              className="flex items-center justify-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={togglePlay}
                  variant="gradient"
                  size="lg"
                  className="flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    animate={{ rotate: isPlaying ? 0 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isPlaying ? (
                      <Pause className="mr-2 h-5 w-5" />
                    ) : (
                      <Play className="mr-2 h-5 w-5" />
                    )}
                  </motion.div>
                  {isPlaying ? 'Pause' : 'Play'} Demo
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={resetDemo}
                  variant="outline"
                  size="lg"
                  className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Steps */}
            <div className="space-y-6">
              {demoSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative cursor-pointer transition-all duration-500 ${
                    currentStep === index
                      ? 'transform scale-105'
                      : 'hover:scale-102'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  {/* Connection Line */}
                  {index < demoSteps.length - 1 && (
                    <motion.div
                      className="absolute left-4 top-16 w-0.5 h-12 bg-gradient-to-b from-blue-500/50 to-purple-500/50"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: currentStep > index ? 1 : 0.3 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  
                  <motion.div
                    className={`flex items-start space-x-6 p-6 rounded-xl transition-all duration-300 ${
                      currentStep === index
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 shadow-lg border-l-4 border-blue-500'
                        : 'hover:bg-gray-50/50 dark:hover:bg-gray-800/30 border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50'
                    } backdrop-blur-sm`}
                    whileHover={{
                      backgroundColor: currentStep === index ? undefined : 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {/* Step Number with Animation */}
                    <motion.div 
                      className={`flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold transition-all duration-300 ${
                        currentStep === index
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                      animate={{
                        scale: currentStep === index ? [1, 1.1, 1] : 1,
                        rotate: currentStep === index ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-sm">{getStepIcon(step.type)}</span>
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <motion.h3 
                        className={`font-semibold text-lg mb-2 transition-colors duration-300 ${
                          currentStep === index
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-900 dark:text-white'
                        }`}
                        animate={{
                          x: currentStep === index ? [0, 5, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {step.title}
                      </motion.h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Progress Bar */}
                      <motion.div 
                        className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentStep === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: currentStep === index ? '100%' : '0%' }}
                          transition={{ duration: 2.5, ease: "easeInOut" }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Code Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="sticky top-8"
          >
            <motion.div
              layout
              className="relative"
            >
              <Card className="overflow-hidden bg-gray-900 border-gray-700/50 shadow-2xl">
                {/* Terminal Header */}
                <motion.div 
                  className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700"
                  animate={{
                    backgroundColor: currentStep === 0 ? '#1f2937' : 
                                   currentStep === 1 ? '#1e3a8a' :
                                   currentStep === 2 ? '#16a34a' : '#7c2d12'
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex space-x-2">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-red-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-yellow-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-green-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400 font-mono">
                      {getCodeLanguage(demoSteps[currentStep].type)}
                    </span>
                    <motion.button
                      onClick={copyCode}
                      className="p-2 hover:bg-gray-700 rounded-md transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </motion.button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">
                      Step {currentStep + 1} of {demoSteps.length}
                    </span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-blue-400" />
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Code Content */}
                <div className="p-6 font-mono text-sm min-h-[300px] relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10"
                    >
                      <pre className={`whitespace-pre-wrap leading-relaxed ${
                        demoSteps[currentStep].type === 'input' ? 'text-blue-400' :
                        demoSteps[currentStep].type === 'thinking' ? 'text-yellow-400' :
                        demoSteps[currentStep].type === 'code' ? 'text-green-400' :
                        'text-purple-400'
                      }`}>
                        {isPlaying && currentStep < demoSteps.length ? (
                          <TypingAnimation 
                            text={demoSteps[currentStep].code} 
                            speed={demoSteps[currentStep].type === 'code' ? 30 : 50}
                          />
                        ) : (
                          demoSteps[currentStep].code
                        )}
                      </pre>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Experience This Yourself?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Start your first conversation with KugySouL and see the magic happen in real-time.
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="gradient" size="xl" asChild className="shadow-lg hover:shadow-xl">
              <a href="/chat" className="group">
                <span>Start Your First Conversation</span>
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5 group-hover:animate-pulse" />
                </motion.div>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}