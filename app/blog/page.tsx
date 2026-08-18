'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Newspaper } from 'lucide-react'
import BookDemoModal from '@/components/BookDemoModal'
import Header from '@/components/Header'
import { useLanguage } from '@/lib/i18n/context'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function Blog() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      <Header onGetStarted={() => setIsModalOpen(true)} />

      {/* Page Content */}
      <main className="pt-28 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#141517] mb-4 tracking-tight">
              {t.blog.heroTitle}
            </h1>
            <p className="text-xl text-[#141517]/70 max-w-2xl mx-auto leading-relaxed">
              {t.blog.heroDescription}
            </p>
          </motion.div>

          {/* Blog posts grid (empty state until posts are published) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center text-center p-12 sm:p-16 bg-[#FDFCFA] rounded-2xl border border-[#E3DED6]"
          >
            <div className="w-16 h-16 bg-[#5E8EA6]/10 rounded-2xl flex items-center justify-center mb-6">
              <Newspaper className="text-[#5E8EA6]" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-[#141517] mb-3">{t.blog.emptyTitle}</h2>
            <p className="text-[#141517]/70 max-w-md leading-relaxed">
              {t.blog.emptyDescription}
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#FDFCFA] text-[#141517]/70 border-t border-[#E3DED6]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src={`${basePath}/polisense_logo.svg`}
              alt="Polisense AI"
              className="h-6 w-6"
            />
            <div className="text-xl font-bold text-[#5E8EA6]">Polisense AI</div>
          </div>
          <div className="flex gap-8">
            <a
              href="https://www.linkedin.com/company/polisense-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141517] transition-colors duration-200"
            >
              {t.footer.linkedin}
            </a>
            <a
              href="mailto:info@polisenseai.com"
              className="hover:text-[#141517] transition-colors duration-200"
            >
              {t.footer.contact}
            </a>
          </div>
          <div className="text-sm text-[#141517]/50">{t.footer.copyright}</div>
        </div>
      </footer>

      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
