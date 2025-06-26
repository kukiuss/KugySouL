'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import React from 'react'
import { 
  Code2, 
  Globe, 
  FileText, 
  Zap, 
  Shield, 
  Users,
  Terminal,
  Brain,
  Workflow,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Code2,
    title: 'Code Execution',
    description: 'Execute Python, JavaScript, and other code directly. Perfect for data analysis, automation, and rapid prototyping.',
    gradient: 'from-blue-500 to-cyan-500',
    benefits: [
      'Multi-language support',
      'Real-time execution',
      'Debug assistance',
      'Performance optimization'
    ]
  },
  {
    icon: Globe,
    title: 'Web Browsing',
    description: 'Browse websites, extract information, and interact with web APIs. Automate research and data collection tasks.',
    gradient: 'from-green-500 to-emerald-500',
    benefits: [
      'Smart web scraping',
      'API integration',
      'Data extraction',
      'Automated research'
    ]
  },
  {
    icon: FileText,
    title: 'File Management',
    description: 'Create, edit, and manage files and directories. Perfect for project setup and file organization.',
    gradient: 'from-purple-500 to-violet-500',
    benefits: [
      'Bulk operations',
      'Smart organization',
      'Version control',
      'Backup automation'
    ]
  },
  {
    icon: Terminal,
    title: 'Command Line',
    description: 'Execute shell commands and interact with system tools. Full terminal access for advanced operations.',
    gradient: 'from-orange-500 to-red-500',
    benefits: [
      'System administration',
      'Automation scripts',
      'Development tools',
      'Process management'
    ]
  },
  {
    icon: Brain,
    title: 'AI-Powered',
    description: 'Powered by Claude AI through OpenRouter. Advanced reasoning and problem-solving capabilities.',
    gradient: 'from-pink-500 to-rose-500',
    benefits: [
      'Natural language processing',
      'Context understanding',
      'Problem solving',
      'Creative assistance'
    ]
  },
  {
    icon: Zap,
    title: 'Real-time Chat',
    description: 'Interactive conversations with instant responses. WebSocket-based communication for seamless experience.',
    gradient: 'from-yellow-500 to-amber-500',
    benefits: [
      'Instant responses',
      'Context memory',
      'Multi-turn conversations',
      'Rich formatting'
    ]
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your conversations and data are secure. No authentication required for quick testing and experimentation.',
    gradient: 'from-indigo-500 to-blue-500',
    benefits: [
      'End-to-end encryption',
      'No data logging',
      'Privacy first',
      'Secure protocols'
    ]
  },
  {
    icon: Workflow,
    title: 'Multi-step Tasks',
    description: 'Handle complex workflows with multiple steps. Perfect for automation and batch processing.',
    gradient: 'from-teal-500 to-cyan-500',
    benefits: [
      'Workflow automation',
      'Batch processing',
      'Task scheduling',
      'Error handling'
    ]
  },
  {
    icon: Users,
    title: 'Developer Friendly',
    description: 'RESTful API with comprehensive documentation. Easy integration with your existing applications.',
    gradient: 'from-violet-500 to-purple-500',
    benefits: [
      'RESTful API',
      'SDK support',
      'Comprehensive docs',
      'Easy integration'
    ]
  }
]

export function EnhancedFeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [selectedFeature, setSelectedFeature] = useState<number>(0)

  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          >
            <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${
              features[i]?.gradient || 'from-blue-500 to-purple-500'
            } blur-3xl`} />
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
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200/20 dark:border-blue-700/20 mb-6"
          >
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Powerful Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl mb-4"
          >
            Everything You Need for{' '}
            <motion.span 
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              AI Automation
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            From simple code execution to complex automation workflows, 
            KugySouL provides all the tools you need to revolutionize your productivity.
          </motion.p>
        </div>

        {/* Interactive Feature Showcase */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {features.slice(0, 6).map((feature, index) => (
              <motion.button
                key={`feature-${index}`}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedFeature === index
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80'
                } backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20`}
                onClick={() => setSelectedFeature(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <feature.icon className="w-4 h-4 inline mr-2" />
                {feature.title}
              </motion.button>
            ))}
          </div>

          <motion.div
            key={selectedFeature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-white/80 to-blue-50/50 dark:from-gray-800/80 dark:to-blue-900/20 backdrop-blur-xl border-0 shadow-2xl">
              <CardHeader className="text-center pb-8">
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${features[selectedFeature].gradient} mx-auto mb-4 shadow-lg`}>
                  {React.createElement(features[selectedFeature].icon, { className: "h-8 w-8 text-white" })}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {features[selectedFeature].title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                  {features[selectedFeature].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {features[selectedFeature].benefits.map((benefit, idx) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 dark:bg-gray-700/50"
                    >
                      <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="h-full"
              >
                <Card className="h-full relative overflow-hidden bg-gradient-to-br from-white/80 to-gray-50/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: `linear-gradient(45deg, transparent, ${hoveredCard === index ? 'rgba(59, 130, 246, 0.3)' : 'transparent'}, transparent)`,
                    }}
                    animate={{
                      rotate: hoveredCard === index ? 360 : 0,
                    }}
                    transition={{ duration: 2, ease: "linear" }}
                  />
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                    animate={{
                      translateX: hoveredCard === index ? '200%' : '-100%',
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  <CardHeader>
                    <motion.div 
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${feature.gradient} mb-4 shadow-lg`}
                      whileHover={{
                        rotate: 360,
                        scale: 1.1,
                        transition: { duration: 0.6 }
                      }}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                    
                    {/* Hover Reveal Benefits */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: hoveredCard === index ? 1 : 0,
                        height: hoveredCard === index ? 'auto' : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <motion.div
                            key={benefit}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                              opacity: hoveredCard === index ? 1 : 0,
                              x: hoveredCard === index ? 0 : -10,
                            }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center space-x-2"
                          >
                            <ChevronRight className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {benefit}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Workflow?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join thousands of developers and creators who are already using KugySouL to automate their daily tasks.
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="/chat"
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <span>Start Building Now</span>
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap className="h-5 w-5 group-hover:animate-pulse" />
              </motion.div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}