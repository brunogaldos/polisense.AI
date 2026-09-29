'use client'

import { useState } from 'react'
import BookDemoModal from '@/components/BookDemoModal'
import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import EiaArequipaArticle from '@/components/blog/EiaArequipaArticle'

export default function Blog() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-canvas">
      <Header onGetStarted={() => setIsModalOpen(true)} />

      {/* Page Content — featured article */}
      <main id="main" className="pt-28 pb-16 px-4 sm:px-6">
        <EiaArequipaArticle onOpenPilotForm={() => setIsModalOpen(true)} />
      </main>

      <SiteFooter />

      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
