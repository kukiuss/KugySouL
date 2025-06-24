'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { LogIn, User, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleGoogleLogin = () => {
    setIsLoading(true)
    setSelectedOption('google')
    // Simulasi login dengan Google (hanya formalitas)
    setTimeout(() => {
      router.push('/survey')
    }, 1500)
  }

  const handleGuestLogin = () => {
    setSelectedOption('guest')
    setIsLoading(true)
    // Tambahkan sedikit delay untuk efek visual
    setTimeout(() => {
      router.push('/survey')
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Logo */}
      <div className="absolute top-8 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="text-white text-xl font-bold">KugySouL</span>
          </div>
        </motion.div>
      </div>
      
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

      <div className="relative w-full max-w-md p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800/50 shadow-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-cyan-500/10 before:to-pink-500/10 before:opacity-30 before:blur-xl">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full shadow-lg shadow-cyan-500/30"
          >
            <LogIn className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Welcome to KugySouL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-300"
          >
            Choose how you want to continue
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4"
        >
          <motion.div
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className={`w-full perspective-1000 ${selectedOption === 'google' ? 'pointer-events-none' : ''}`}
          >
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-3 py-4 px-4 bg-white hover:bg-gray-100 text-gray-900 font-medium rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group ${
                selectedOption === 'google' ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-2 border-blue-500/50 text-white' : ''
              }`}
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                  <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                  <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                  <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                </svg>
              </div>
              <span className="flex-1 text-center">Continue with Google</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100/0 via-gray-100/30 to-gray-100/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </motion.div>

          <motion.div
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className={`w-full perspective-1000 ${selectedOption === 'guest' ? 'pointer-events-none' : ''}`}
          >
            <button
              onClick={handleGuestLogin}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-3 py-4 px-4 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group ${
                selectedOption === 'guest' ? 'from-pink-500/80 to-purple-600/80 border-2 border-pink-500/50' : ''
              }`}
            >
              <User className="w-5 h-5" />
              <span className="flex-1 text-center">Continue as Guest</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </motion.div>
        </motion.div>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex justify-center"
          >
            <div className="flex items-center space-x-2 text-cyan-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>
                {selectedOption === 'google' 
                  ? 'Connecting to Google...' 
                  : 'Preparing your experience...'}
              </span>
            </div>
          </motion.div>
        )}
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 pt-6 border-t border-gray-800/50"
        >
          <p className="text-gray-400 text-sm text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  )
}