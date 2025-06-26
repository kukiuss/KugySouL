'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { 
  ArrowRight, 
  Code, 
  Zap,
  Sparkles,
  BookOpen,
  Star,
  Brain,
  Orbit,
  Cpu,
  Network
} from 'lucide-react'

// Enhanced Particle Component
const EnhancedParticle = ({ index }: { index: number }) => {
  const randomDelay = Math.random() * 2
  const randomDuration = 8 + Math.random() * 4
  const randomX = Math.random() * 200 - 100
  const randomY = Math.random() * 200 - 100
  
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${20 + (index * 15) % 80}%`,
        top: `${20 + (index * 20) % 60}%`,
      }}
      animate={{
        x: [0, randomX, -randomX/2, randomX/3, 0],
        y: [0, randomY, -randomY/2, randomY/3, 0],
        scale: [1, 1.2, 0.8, 1.1, 1],
        opacity: [0.7, 1, 0.5, 0.8, 0.7],
        rotate: [0, 180, 270, 360, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: randomDelay
      }}
      className={`w-3 h-3 rounded-full ${
        index % 4 === 0 ? 'bg-cyan-400/60' :
        index % 4 === 1 ? 'bg-pink-400/60' :
        index % 4 === 2 ? 'bg-purple-400/60' :
        'bg-blue-400/60'
      } blur-sm shadow-lg`}
    />
  )
}

// Floating Tech Icons
const FloatingIcon = ({ Icon, index }: { Icon: any, index: number }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${10 + (index * 25) % 90}%`,
        top: `${15 + (index * 30) % 70}%`,
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, -5, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 6 + index,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.5
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-lg animate-pulse" />
        <Icon className="w-6 h-6 text-cyan-300/80 relative z-10" />
      </div>
    </motion.div>
  )
}

export function EnhancedHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  // Parallax effects
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const textY = useTransform(scrollY, [0, 500], [0, -100])
  const particlesY = useTransform(scrollY, [0, 500], [0, -200])

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const techIcons = [Cpu, Network, Orbit]

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-none"
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-4 h-4 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Enhanced Background with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Base Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Enhanced Floating Elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + (i * 12) % 85}%`,
              top: `${20 + (i * 15) % 60}%`,
            }}
            animate={{
              x: [0, 100 + i * 10, -50, 80, 0],
              y: [0, -80 - i * 5, 60, -40, 0],
              scale: [1, 1.3, 0.8, 1.1, 1],
              opacity: [0.4, 0.8, 0.3, 0.6, 0.4],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: [0.4, 0.0, 0.2, 1],
              delay: i * 0.8
            }}
          >
            <div className={`w-${20 + i * 4} h-${20 + i * 4} bg-gradient-to-r ${
              i % 3 === 0 ? 'from-cyan-400/40 to-blue-500/40' :
              i % 3 === 1 ? 'from-pink-500/50 to-fuchsia-600/50' :
              'from-purple-500/40 to-violet-600/40'
            } rounded-full blur-xl shadow-2xl`} />
          </motion.div>
        ))}
        
        {/* Advanced Particle System */}
        <motion.div style={{ y: particlesY }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <EnhancedParticle key={i} index={i} />
          ))}
        </motion.div>
        
        {/* Floating Tech Icons */}
        {techIcons.map((Icon, i) => (
          <FloatingIcon key={i} Icon={Icon} index={i} />
        ))}
        
        {/* Dynamic Gradient Overlays */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/70"
          animate={{
            background: [
              'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
              'linear-gradient(to top, rgba(0,0,0,0.8), rgba(59,130,246,0.1), rgba(0,0,0,0.6))',
              'linear-gradient(to top, rgba(0,0,0,0.9), rgba(147,51,234,0.1), rgba(0,0,0,0.7))',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-cyan-900/30" />
      </motion.div>

      <motion.div 
        className="relative mx-auto max-w-7xl px-6 py-32 text-center"
        style={{ y: textY }}
      >
        {/* Enhanced Premium Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8, y: isLoaded ? 0 : -20 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          className="mb-16"
        >
          <motion.div 
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-pink-500/20 backdrop-blur-xl border border-cyan-400/30 shadow-lg shadow-cyan-400/20"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              transition: { duration: 0.3 }
            }}
            animate={{
              borderColor: [
                'rgba(34, 211, 238, 0.3)',
                'rgba(236, 72, 153, 0.3)',
                'rgba(147, 51, 234, 0.3)',
                'rgba(34, 211, 238, 0.3)',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-6 h-6 text-cyan-400" />
            </motion.div>
            <span className="text-white font-semibold tracking-wide text-lg">Ultra Premium AI Platform</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-pink-400" />
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
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(236, 72, 153, 0.5)",
                "0 0 20px rgba(147, 51, 234, 0.5)",
                "0 0 20px rgba(59, 130, 246, 0.5)",
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
              <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
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
            className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent font-semibold"
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
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl"
                animate={{
                  background: [
                    'linear-gradient(45deg, #06b6d4, #ec4899)',
                    'linear-gradient(45deg, #ec4899, #8b5cf6)',
                    'linear-gradient(45deg, #8b5cf6, #06b6d4)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl"
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
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500/50 to-pink-500/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
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
            { icon: Brain, title: "AI Powered", subtitle: "Advanced reasoning", gradient: "from-cyan-500 to-blue-600" },
            { icon: Zap, title: "Lightning Fast", subtitle: "Instant responses", gradient: "from-pink-500 to-fuchsia-600" },
            { icon: BookOpen, title: "Novel Writing", subtitle: "Creative assistance", gradient: "from-purple-500 to-violet-600" },
            { icon: Code, title: "Code Execution", subtitle: "Multi-language support", gradient: "from-cyan-400 to-blue-500" },
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
            { value: "50K+", label: "Active Users", gradient: "from-cyan-400 to-blue-400", bg: "bg-cyan-500/10", border: "border-cyan-400/20" },
            { value: "1M+", label: "Tasks Completed", gradient: "from-pink-400 to-fuchsia-400", bg: "bg-pink-500/10", border: "border-pink-400/20" },
            { value: "99.9%", label: "Uptime", gradient: "from-purple-400 to-violet-400", bg: "bg-purple-500/10", border: "border-purple-400/20" },
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
      </motion.div>
    </section>
  )
}