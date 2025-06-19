'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const demoSteps = [
  {
    step: 1,
    title: "Ask a Question",
    description: "Start by asking KugySouL to help with any task",
    code: "Create a Python function to calculate fibonacci numbers"
  },
  {
    step: 2,
    title: "AI Analyzes",
    description: "The AI understands your request and plans the solution",
    code: "I'll create a fibonacci function for you. Let me write the code..."
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
    print(f"F({i}) = {fibonacci(i)}")`
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
F(9) = 34`
  }
]

export function DemoSection() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // const nextStep = () => {
  //   if (currentStep < demoSteps.length - 1) {
  //     setCurrentStep(currentStep + 1)
  //   } else {
  //     setCurrentStep(0)
  //   }
  // }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < demoSteps.length - 1) {
            return prev + 1
          } else {
            clearInterval(interval)
            setIsPlaying(false)
            return 0
          }
        })
      }, 3000)
    }
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  return (
    <section id="demo" className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            See KugySouL{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              In Action
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Watch how KugySouL handles a typical coding request from start to finish
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Demo controls and steps */}
          <div className="space-y-8">
            {/* Controls */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={togglePlay}
                variant="gradient"
                size="lg"
                className="flex items-center"
              >
                {isPlaying ? (
                  <Pause className="mr-2 h-5 w-5" />
                ) : (
                  <Play className="mr-2 h-5 w-5" />
                )}
                {isPlaying ? 'Pause' : 'Play'} Demo
              </Button>
              <Button
                onClick={resetDemo}
                variant="outline"
                size="lg"
                className="flex items-center"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {demoSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 ${
                    currentStep === index
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-l-4 border-blue-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    currentStep === index
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      currentStep === index
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Code display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 bg-gray-900 border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-gray-400">
                  Step {currentStep + 1} of {demoSteps.length}
                </span>
              </div>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-sm"
              >
                <pre className="text-green-400 whitespace-pre-wrap">
                  {demoSteps[currentStep].code}
                </pre>
              </motion.div>
            </Card>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Ready to try it yourself?
          </p>
          <Button variant="gradient" size="xl" asChild>
            <a href="/chat">Start Your First Conversation</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}