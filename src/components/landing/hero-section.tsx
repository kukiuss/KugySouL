'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  Code, 
  Zap,
  Sparkles,
  BookOpen,
  Pen,
  Star,
  Brain,
  MessageSquare
} from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 120, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full opacity-30 blur-lg"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-32 left-1/3 w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-25 blur-lg"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{
            x: [0, 90, 0],
            y: [0, -50, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-full opacity-30 blur-md"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32 text-center">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border border-white/10">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">Ultra Premium AI Platform</span>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
        >
          <span className="block">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              KugySouL
            </span>
          </span>
          <span className="block text-white text-4xl md:text-5xl lg:text-6xl mt-4">
            The Future of AI Assistance
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Execute code, browse the web, write novels, and automate complex tasks with the most{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
            advanced AI assistant
          </span>{' '}
          ever created.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            href="/chat"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start AI Chat
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </Link>
          
          <Link
            href="/novel"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 rounded-xl hover:border-white/40 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Write Novels
            <Pen className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
          </Link>
        </motion.div>

        {/* Feature Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">AI Powered</div>
            <div className="text-gray-400">Advanced reasoning</div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">Lightning Fast</div>
            <div className="text-gray-400">Instant responses</div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-pink-500 to-red-600 rounded-full">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">Novel Writing</div>
            <div className="text-gray-400">Creative assistance</div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">Code Execution</div>
            <div className="text-gray-400">Multi-language support</div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              50K+
            </div>
            <div className="text-gray-300">Active Users</div>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              1M+
            </div>
            <div className="text-gray-300">Tasks Completed</div>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              99.9%
            </div>
            <div className="text-gray-300">Uptime</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}