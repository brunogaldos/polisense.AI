'use client'

import { useState } from 'react'
import BookDemoModal from '@/components/BookDemoModal'
import Header from '@/components/Header'
import EiaArequipaArticle from '@/components/blog/EiaArequipaArticle'
import { useLanguage } from '@/lib/i18n/context'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function Blog() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      <Header onGetStarted={() => setIsModalOpen(true)} />

      {/* Page Content — featured article */}
      <main className="pt-28 pb-16 px-4 sm:px-6">
        <EiaArequipaArticle onOpenPilotForm={() => setIsModalOpen(true)} />
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
