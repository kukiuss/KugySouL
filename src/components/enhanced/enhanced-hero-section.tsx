'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { 
  ArrowRight, 
  Code, 
  Zap,
  Sparkles,
  BookOpen,
  Star,
  Brain
} from 'lucide-react'

export function EnhancedHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Anime Background */}
      <div className="absolute inset-0">
        <Image 
          src="/images/landingpage-bg.png" 
          alt="Anime Background" 
          fill
          style={{ objectFit: "cover" }}
          priority
          quality={100}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div 
        className="relative mx-auto max-w-7xl px-6 py-32 text-center"
      >
        {/* Enhanced Premium Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8, y: isLoaded ? 0 : -20 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          className="mb-16"
        >
          <motion.div 
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-700/20 backdrop-blur-xl border border-purple-400/30 shadow-lg shadow-indigo-400/20"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(79, 70, 229, 0.3)",
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-6 h-6 text-indigo-400" />
            </motion.div>
            <span className="text-white font-semibold tracking-wide text-lg">Ultra Premium AI Platform</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-purple-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Main Heading with Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ delay: 0.4, duration: 1, type: "spring", stiffness: 100 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
            animate={{
              textShadow: [
                "0 0 20px rgba(79, 70, 229, 0.5)",
                "0 0 20px rgba(124, 58, 237, 0.5)",
                "0 0 20px rgba(79, 70, 229, 0.5)",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <motion.span 
              className="block"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                KugySouL
              </span>
            </motion.span>
            <motion.span 
              className="block text-white text-4xl md:text-5xl lg:text-6xl mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              The Future of AI Assistance
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Enhanced Subtitle with Revealing Animation */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ 
            opacity: isLoaded ? 1 : 0, 
            y: isLoaded ? 0 : 30,
            filter: isLoaded ? "blur(0px)" : "blur(10px)"
          }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Execute code, browse the web, write novels, and automate complex tasks with the most{' '}
          <motion.span 
            className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            advanced AI assistant
          </motion.span>{' '}
          ever created.
        </motion.p>

        {/* Enhanced CTA Button with Advanced Effects */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0, 
            y: isLoaded ? 0 : 30,
            scale: isLoaded ? 1 : 0.9
          }}
          transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
          className="flex justify-center mb-16"
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <Link
              href="/auth/login"
              className="relative inline-flex items-center justify-center px-12 py-5 text-xl font-semibold text-white overflow-hidden rounded-xl transition-all duration-300"
            >
              {/* Button Background */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl"
              />
              
              {/* Simple Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
              />
              
              {/* Button Content */}
              <div className="relative z-10 flex items-center">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                </motion.div>
                <span>Get Started</span>
                <motion.div
                  className="ml-3"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600/50 to-indigo-700/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced Feature Stats with Counter Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: Brain, title: "AI Powered", subtitle: "Advanced reasoning", gradient: "from-indigo-500 to-indigo-600" },
            { icon: Zap, title: "Lightning Fast", subtitle: "Instant responses", gradient: "from-purple-500 to-purple-600" },
            { icon: BookOpen, title: "Novel Writing", subtitle: "Creative assistance", gradient: "from-indigo-500 to-purple-600" },
            { icon: Code, title: "Code Execution", subtitle: "Multi-language support", gradient: "from-purple-500 to-indigo-600" },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="text-center group"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
            >
              <motion.div 
                className={`inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r ${item.gradient} rounded-full shadow-lg border group-hover:shadow-xl transition-all duration-300`}
                whileHover={{
                  rotate: 360,
                  transition: { duration: 0.6 }
                }}
                animate={{
                  boxShadow: [
                    "0 10px 30px rgba(59, 130, 246, 0.3)",
                    "0 10px 30px rgba(236, 72, 153, 0.3)",
                    "0 10px 30px rgba(147, 51, 234, 0.3)",
                    "0 10px 30px rgba(59, 130, 246, 0.3)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                <item.icon className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div 
                className="text-3xl font-bold text-white mb-2"
                whileHover={{ scale: 1.1 }}
              >
                {item.title}
              </motion.div>
              <div className="text-gray-300 text-sm">{item.subtitle}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Stats Section with Counter Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: "50K+", label: "Active Users", gradient: "from-indigo-400 to-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-400/20" },
            { value: "1M+", label: "Tasks Completed", gradient: "from-purple-400 to-purple-500", bg: "bg-purple-500/10", border: "border-purple-400/20" },
            { value: "99.9%", label: "Uptime", gradient: "from-indigo-400 to-purple-500", bg: "bg-indigo-500/10", border: "border-purple-400/20" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`text-center p-6 rounded-xl ${stat.bg} backdrop-blur-md border ${stat.border} shadow-lg group`}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 + index * 0.1, duration: 0.6, type: "spring" }}
            >
              <motion.div 
                className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.3,
                  ease: "easeInOut"
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-200 group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}