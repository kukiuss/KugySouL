'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export default function SurveyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>(() => {
    // Cek apakah ada data survey yang tersimpan di localStorage
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('userSurveyData')
      return savedData ? JSON.parse(savedData) : {}
    }
    return {}
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const surveySteps = [
    {
      question: "How do you think about your writing?",
      options: [
        "I'm a professional writer",
        "I aspire to be a professional writer",
        "It's a hobby",
        "I'm a student",
        "Other"
      ]
    },
    {
      question: "What type of content do you write most often?",
      options: [
        "Fiction novels",
        "Short stories",
        "Blog posts",
        "Academic papers",
        "Business content",
        "Poetry",
        "Other"
      ]
    },
    {
      question: "What's your biggest writing challenge?",
      options: [
        "Writer's block",
        "Developing characters",
        "Creating engaging plots",
        "Editing and refining",
        "Finding time to write",
        "Getting feedback",
        "Other"
      ]
    },
    {
      question: "What are you looking to accomplish with KugySouL?",
      options: [
        "Generate human-like content that bypasses AI detection",
        "Improve my existing writing with AI assistance",
        "Create a novel or long-form content",
        "Get help with academic or professional writing",
        "Explore AI writing capabilities",
        "Other"
      ]
    },
    {
      question: "How important is it that your AI-assisted content appears human-written?",
      options: [
        "Extremely important - must pass AI detection tools",
        "Very important - should sound natural to readers",
        "Somewhat important - quality matters more than detection",
        "Not important - I'm just exploring capabilities",
        "Other"
      ]
    }
  ]

  const handleOptionSelect = (stepIndex: number, option: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [stepIndex]: option
    })
  }

  const handleNext = () => {
    if (currentStep < surveySteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulasi pengiriman data survey
    // Simpan data survey ke localStorage untuk referensi di masa depan
    localStorage.setItem('userSurveyData', JSON.stringify(selectedOptions))
    setTimeout(() => {
      router.push('/chat')
    }, 1500)
  }

  const isNextDisabled = selectedOptions[currentStep] === undefined

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Anime Background */}
      <div className="absolute inset-0">
        <Image 
          src="/images/loginpage-bg.png" 
          alt="Anime Background" 
          fill
          style={{ objectFit: "cover" }}
          priority
          quality={100}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Logo */}
      <div className="absolute top-8 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="text-white text-xl font-bold">KugySouL</span>
          </div>
        </motion.div>
      </div>

      <div className="relative w-full max-w-2xl p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800/50 shadow-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-indigo-500/10 before:to-purple-500/10 before:opacity-30 before:blur-xl">
        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          {surveySteps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div 
                className={`w-3 h-3 rounded-full ${
                  index < currentStep 
                    ? 'bg-indigo-400' 
                    : index === currentStep 
                      ? 'bg-purple-500' 
                      : 'bg-gray-600'
                }`}
              />
              {index < surveySteps.length - 1 && (
                <div 
                  className={`w-16 h-0.5 ${
                    index < currentStep ? 'bg-indigo-400' : 'bg-gray-600'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Hello! Let&apos;s get to know you better.
          </h1>
          <h2 className="text-2xl font-semibold text-white mb-8">
            {surveySteps[currentStep].question}
          </h2>

          <div className="space-y-4 mb-8">
            {surveySteps[currentStep].options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <button
                  onClick={() => handleOptionSelect(currentStep, option)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border ${
                    selectedOptions[currentStep] === option
                      ? 'border-indigo-400 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 shadow-md shadow-indigo-500/20'
                      : 'border-gray-700 hover:border-gray-500 hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-900/50'
                  } transition-all duration-200 relative overflow-hidden group`}
                >
                  <span className="text-left text-lg text-white relative z-10">{option}</span>
                  {selectedOptions[currentStep] === option ? (
                    <CheckCircle2 className="w-6 h-6 text-indigo-400 relative z-10" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-600 group-hover:border-gray-400 transition-colors duration-200 relative z-10"></div>
                  )}
                  {selectedOptions[currentStep] === option && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-indigo-500/5 animate-pulse"></div>
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className={`w-full ${isNextDisabled || isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <button
              onClick={handleNext}
              disabled={isNextDisabled || isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10">
                {currentStep < surveySteps.length - 1 ? 'Next' : 'Finish'}
              </span>
              {!isSubmitting && <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />}
              {isSubmitting && (
                <svg className="animate-spin h-5 w-5 text-white relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}