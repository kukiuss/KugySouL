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
    <section className="hero-section">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="floating-orb-1" />
        <div className="floating-orb-2" />
        <div className="floating-orb-3" />
        <div className="floating-orb-4" />
        <div className="floating-orb-5" />
        <div className="hero-overlay" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32 w-full">
        <div className="text-center">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12"
          >
            <div className="premium-badge">
              <Star className="w-6 h-6 text-yellow-400" />
              <span className="text-white font-semibold text-lg">Ultra Premium AI Platform</span>
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-tight"
          >
            <span className="gradient-text">
              KugySouL
            </span>
            <br />
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-300 block mt-4">
              The Future of AI Assistance
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mx-auto mt-8 max-w-5xl text-2xl md:text-3xl leading-relaxed text-gray-300 mb-16"
          >
            Execute code, browse the web, write novels, and automate complex tasks with the most 
            <span className="text-purple-400 font-semibold"> advanced AI assistant </span>
            ever created.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-8 justify-center mb-20"
          >
            <Link href="/chat" className="cta-button cta-button-primary">
              <MessageSquare className="cta-icon" />
              Start AI Chat
              <ArrowRight className="cta-icon-right" />
            </Link>
            
            <Link href="/novel" className="cta-button cta-button-secondary">
              <BookOpen className="cta-icon" />
              Write Novels
              <Pen className="cta-icon-right" />
            </Link>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="grid-1 md:grid-4 gap-8 max-w-6xl mx-auto mb-20"
          >
            {[
              { icon: Brain, title: "AI Powered", desc: "Advanced reasoning", colorClass: "purple-pink" },
              { icon: Zap, title: "Lightning Fast", desc: "Instant responses", colorClass: "yellow-orange" },
              { icon: BookOpen, title: "Novel Writing", desc: "Creative assistance", colorClass: "blue-purple" },
              { icon: Code, title: "Code Execution", desc: "Multi-language support", colorClass: "green-blue" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                className="feature-card"
              >
                <div className={`feature-icon-wrapper ${feature.colorClass}`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="grid-1 md:grid-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="stats-card">
              <div className="stats-number purple">50K+</div>
              <div className="stats-label">Active Users</div>
            </div>
            <div className="stats-card blue-hover">
              <div className="stats-number blue">1M+</div>
              <div className="stats-label">Tasks Completed</div>
            </div>
            <div className="stats-card pink-hover">
              <div className="stats-number pink">99.9%</div>
              <div className="stats-label">Uptime</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}