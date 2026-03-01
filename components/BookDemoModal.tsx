'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Building2, CheckCircle } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface BookDemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Add document to Firestore
      await addDoc(collection(db, 'demo-requests'), {
        email,
        company,
        timestamp: serverTimestamp(),
        status: 'pending'
      })

      setIsSuccess(true)

      // Reset form after 2 seconds and close modal
      setTimeout(() => {
        setEmail('')
        setCompany('')
        setIsSuccess(false)
        onClose()
      }, 2000)
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setEmail('')
      setCompany('')
      setError('')
      setIsSuccess(false)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-[#FDFCFA] rounded-2xl shadow-2xl border border-[#E3DED6] overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="absolute top-4 right-4 p-2 text-[#141517]/50 hover:text-[#141517] hover:bg-[#F5F2EC] rounded-full transition-all duration-200 disabled:opacity-50"
            >
              <X size={20} />
            </button>

            {/* Success State */}
            {isSuccess ? (
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="text-white" size={32} />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#141517] mb-2">
                  Request Submitted!
                </h3>
                <p className="text-[#141517]/70">
                  We'll be in touch shortly to schedule your demo.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="p-6 pb-4 border-b border-[#E3DED6]">
                  <h2 className="text-2xl font-bold text-[#141517] mb-2">
                    Book a Demo
                  </h2>
                  <p className="text-[#141517]/70">
                    See how Polisense AI can transform your energy planning
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#141517] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#141517]/40" size={18} />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@organization.com"
                        className="w-full pl-10 pr-4 py-3 bg-[#F5F2EC] border border-[#E3DED6] rounded-xl text-[#141517] placeholder:text-[#141517]/40 focus:outline-none focus:ring-2 focus:ring-[#5E8EA6] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Company Input */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-[#141517] mb-2">
                      Organization
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-[#141517]/40" size={18} />
                      <input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                        placeholder="Your organization name"
                        className="w-full pl-10 pr-4 py-3 bg-[#F5F2EC] border border-[#E3DED6] rounded-xl text-[#141517] placeholder:text-[#141517]/40 focus:outline-none focus:ring-2 focus:ring-[#5E8EA6] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#5E8EA6] text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:bg-[#4A7185] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Request'
                    )}
                  </motion.button>

                  <p className="text-xs text-[#141517]/50 text-center">
                    By submitting, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
