'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  Code, 
  Zap,
  Sparkles,
  BookOpen,
  Star,
  Brain
} from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Anime Background with Parallax Effect */}
      <div className="absolute inset-0">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/backgrounds/anime-bg-pixai.png')`
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Cyberpunk Neon Floating Elements */}
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
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400/40 to-blue-500/40 rounded-full opacity-60 blur-xl shadow-cyan-400/50 shadow-2xl"
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
          className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-pink-500/50 to-fuchsia-600/50 rounded-full opacity-70 blur-lg shadow-pink-500/50 shadow-xl"
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
          className="absolute bottom-32 left-1/3 w-20 h-20 bg-gradient-to-r from-cyan-300/45 to-blue-400/45 rounded-full opacity-65 blur-lg shadow-cyan-300/40 shadow-lg"
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
          className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-purple-500/40 to-violet-600/40 rounded-full opacity-60 blur-xl shadow-purple-500/40 shadow-2xl"
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
          className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-pink-400/50 to-rose-500/50 rounded-full opacity-70 blur-md shadow-pink-400/40 shadow-lg"
        />
        
        {/* Cyberpunk Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-cyan-900/30" />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-transparent to-blue-900/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32 text-center">
        {/* Cyberpunk Premium Badge - Positioned higher to avoid covering avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-pink-500/20 backdrop-blur-xl border border-cyan-400/30 shadow-lg shadow-cyan-400/20 hover:shadow-xl hover:shadow-cyan-400/30 transition-all duration-300 transform hover:scale-105">
            <Star className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="text-white font-semibold tracking-wide">Ultra Premium AI Platform</span>
            <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>

        {/* Cyberpunk Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
        >
          <span className="block">
            <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
              KugySouL
            </span>
          </span>
          <span className="block text-white text-4xl md:text-5xl lg:text-6xl mt-6 drop-shadow-lg">
            The Future of AI Assistance
          </span>
        </motion.h1>

        {/* Cyberpunk Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-md"
        >
          Execute code, browse the web, write novels, and automate complex tasks with the most{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent font-semibold">
            advanced AI assistant
          </span>{' '}
          ever created.
        </motion.p>

        {/* Single CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex justify-center mb-16"
        >
          <motion.div
            whileHover={{ 
              rotateY: 5, 
              rotateX: -5,
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            className="perspective-1000"
          >
            <Link
              href="/auth/login"
              className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl hover:from-cyan-400 hover:to-pink-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30 border border-cyan-400/30 backdrop-blur-md"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Get Started
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-pink-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Cyberpunk Feature Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/30 border border-cyan-400/30">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-md">AI Powered</div>
            <div className="text-gray-300">Advanced reasoning</div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-full shadow-lg shadow-pink-500/30 border border-pink-400/30">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-md">Lightning Fast</div>
            <div className="text-gray-300">Instant responses</div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full shadow-lg shadow-purple-500/30 border border-purple-400/30">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-md">Novel Writing</div>
            <div className="text-gray-300">Creative assistance</div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/30 border border-cyan-300/30">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-md">Code Execution</div>
            <div className="text-gray-300">Multi-language support</div>
          </div>
        </motion.div>

        {/* Cyberpunk Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 rounded-xl bg-cyan-500/10 backdrop-blur-md border border-cyan-400/20 shadow-lg shadow-cyan-400/10">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
              50K+
            </div>
            <div className="text-gray-200">Active Users</div>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-pink-500/10 backdrop-blur-md border border-pink-400/20 shadow-lg shadow-pink-400/10">
            <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
              1M+
            </div>
            <div className="text-gray-200">Tasks Completed</div>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-purple-500/10 backdrop-blur-md border border-purple-400/20 shadow-lg shadow-purple-400/10">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
              99.9%
            </div>
            <div className="text-gray-200">Uptime</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}