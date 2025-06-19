'use client'

import { motion } from 'framer-motion'
import { 
  Code2, 
  Globe, 
  FileText, 
  Zap, 
  Shield, 
  Users,
  Terminal,
  Brain,
  Workflow
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Code2,
    title: 'Code Execution',
    description: 'Execute Python, JavaScript, and other code directly. Perfect for data analysis, automation, and rapid prototyping.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Globe,
    title: 'Web Browsing',
    description: 'Browse websites, extract information, and interact with web APIs. Automate research and data collection tasks.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: FileText,
    title: 'File Management',
    description: 'Create, edit, and manage files and directories. Perfect for project setup and file organization.',
    gradient: 'from-purple-500 to-violet-500'
  },
  {
    icon: Terminal,
    title: 'Command Line',
    description: 'Execute shell commands and interact with system tools. Full terminal access for advanced operations.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Brain,
    title: 'AI-Powered',
    description: 'Powered by Claude AI through OpenRouter. Advanced reasoning and problem-solving capabilities.',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: Zap,
    title: 'Real-time Chat',
    description: 'Interactive conversations with instant responses. WebSocket-based communication for seamless experience.',
    gradient: 'from-yellow-500 to-amber-500'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your conversations and data are secure. No authentication required for quick testing and experimentation.',
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Workflow,
    title: 'Multi-step Tasks',
    description: 'Handle complex workflows with multiple steps. Perfect for automation and batch processing.',
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Developer Friendly',
    description: 'RESTful API with comprehensive documentation. Easy integration with your existing applications.',
    gradient: 'from-violet-500 to-purple-500'
  }
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
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
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Every Use Case
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            From simple code execution to complex automation workflows, 
            KugySouL provides all the tools you need to get things done.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <CardHeader>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${feature.gradient} mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
            Ready to experience the power of AI automation?
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="/chat"
              className="inline-flex items-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Building Now
              <Zap className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}