'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useLanguage } from '@/lib/i18n/context'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

interface HeaderProps {
  onGetStarted: () => void
}

export default function Header({ onGetStarted }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === ''
  const isBlog = pathname?.startsWith('/blog') ?? false

  // On the homepage, Features/Testimonials scroll to sections on this page.
  // On any other page, they link back to those sections on the homepage.
  const featuresHref = isHome ? '#features' : `${basePath}/#features`
  const testimonialsHref = isHome ? '#testimonials' : `${basePath}/#testimonials`

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 w-full bg-[#FDFCFA]/95 backdrop-blur-md border-b border-[#E3DED6] z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <img
            src={`${basePath}/polisense_logo.svg`}
            alt="Polisense AI"
            className="h-7 w-7 sm:h-8 sm:w-8"
          />
          <div className="text-xl sm:text-2xl font-bold text-[#5E8EA6]">
            Polisense AI
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          <a href={featuresHref} className="text-[#141517]/70 hover:text-[#141517] transition-colors duration-200">
            {t.nav.features}
          </a>
          <a href={testimonialsHref} className="text-[#141517]/70 hover:text-[#141517] transition-colors duration-200">
            {t.nav.testimonials}
          </a>
          <Link
            href="/blog/"
            className={`transition-colors duration-200 ${
              isBlog ? 'text-[#141517] font-medium' : 'text-[#141517]/70 hover:text-[#141517]'
            }`}
          >
            {t.nav.blogs}
          </Link>
          <LanguageSwitcher />
          <button
            onClick={onGetStarted}
            className="px-5 py-2 bg-[#5E8EA6] text-white rounded-full hover:bg-[#4A7185] transition-all duration-200 hover:scale-105 shadow-sm"
          >
            {t.nav.getStarted}
          </button>
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#141517]/70 hover:text-[#141517] transition-colors"
          aria-label={t.nav.toggleMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-[#E3DED6]"
          >
            <div className="px-4 py-4 flex flex-col gap-4 bg-[#FDFCFA]/95">
              <a
                href={featuresHref}
                onClick={closeMobileMenu}
                className="text-[#141517]/70 hover:text-[#141517] transition-colors duration-200 py-1"
              >
                {t.nav.features}
              </a>
              <a
                href={testimonialsHref}
                onClick={closeMobileMenu}
                className="text-[#141517]/70 hover:text-[#141517] transition-colors duration-200 py-1"
              >
                {t.nav.testimonials}
              </a>
              <Link
                href="/blog/"
                onClick={closeMobileMenu}
                className={`transition-colors duration-200 py-1 ${
                  isBlog ? 'text-[#141517] font-medium' : 'text-[#141517]/70 hover:text-[#141517]'
                }`}
              >
                {t.nav.blogs}
              </Link>
              <LanguageSwitcher className="w-fit" />
              <button
                onClick={() => { onGetStarted(); closeMobileMenu(); }}
                className="px-5 py-2 bg-[#5E8EA6] text-white rounded-full hover:bg-[#4A7185] transition-all duration-200 shadow-sm w-fit"
              >
                {t.nav.getStarted}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
