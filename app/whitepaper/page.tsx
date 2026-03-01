'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Download } from 'lucide-react'
import Link from 'next/link'

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 w-full bg-[#FDFCFA]/95 backdrop-blur-md border-b border-[#E3DED6] z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/polisense_logo.svg" alt="Polisense AI" className="h-8 w-8" />
            <div className="text-2xl font-bold text-[#5E8EA6]">
              Polisense AI
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#141517]/70 hover:text-[#141517] transition-colors duration-200"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
            <a
              href="/Polisense_AI_whitepaper.pdf"
              download
              className="flex items-center gap-2 px-5 py-2 bg-[#5E8EA6] text-white rounded-full hover:bg-[#4A7185] transition-all duration-200 hover:scale-105 shadow-sm"
            >
              <Download size={18} />
              Download PDF
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold text-[#141517] mb-2">
              Polisense AI Whitepaper
            </h1>
            <p className="text-[#141517]/70">
              Technical documentation and vision for AI-powered energy infrastructure planning
            </p>
          </div>

          {/* PDF Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full bg-white rounded-2xl shadow-2xl border border-[#E3DED6] overflow-hidden"
            style={{ height: 'calc(100vh - 200px)' }}
          >
            <iframe
              src="/Polisense_AI_whitepaper.pdf"
              className="w-full h-full border-0"
              title="Polisense AI Whitepaper"
            />
          </motion.div>

          {/* Fallback Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#141517]/60 mb-2">
              Can't see the PDF?
              <a
                href="/Polisense_AI_whitepaper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5E8EA6] hover:underline ml-1"
              >
                Open in new tab
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
