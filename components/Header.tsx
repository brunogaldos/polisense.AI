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

const linkBase = 'transition-colors duration-200'
const linkIdle = 'text-ink/70 hover:text-ink'
const linkActive = 'text-ink font-medium'

export default function Header({ onGetStarted }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()
  const isBlog = pathname?.startsWith('/blog') ?? false
  const isProducts = pathname?.startsWith('/products') ?? false
  const isPlatform = pathname?.startsWith('/platform') ?? false
  const isTeam = pathname?.startsWith('/team') ?? false

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const links = (
    onClick?: () => void,
    extra = ''
  ) => (
    <>
      <Link
        href="/products/"
        onClick={onClick}
        aria-current={isProducts ? 'page' : undefined}
        className={`${linkBase} ${extra} ${isProducts ? linkActive : linkIdle}`}
      >
        {t.nav.products}
      </Link>
      <Link
        href="/platform/"
        onClick={onClick}
        aria-current={isPlatform ? 'page' : undefined}
        className={`${linkBase} ${extra} ${isPlatform ? linkActive : linkIdle}`}
      >
        {t.nav.platform}
      </Link>
      <Link
        href="/blog/"
        onClick={onClick}
        aria-current={isBlog ? 'page' : undefined}
        className={`${linkBase} ${extra} ${isBlog ? linkActive : linkIdle}`}
      >
        {t.nav.blogs}
      </Link>
      <Link
        href="/team/"
        onClick={onClick}
        aria-current={isTeam ? 'page' : undefined}
        className={`${linkBase} ${extra} ${isTeam ? linkActive : linkIdle}`}
      >
        {t.nav.team}
      </Link>
    </>
  )

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:px-4 focus:py-2 focus:bg-accent focus:text-canvas focus:rounded-md"
      >
        {t.nav.skipToContent}
      </a>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 w-full bg-surface/90 backdrop-blur-md border-b border-line z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <img
              src={`${basePath}/polisense_logo.svg`}
              alt=""
              className="h-7 w-7 sm:h-8 sm:w-8"
            />
            <span className="text-xl sm:text-2xl font-bold text-accent">
              Polisense AI
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {links()}
            <LanguageSwitcher />
            <button
              onClick={onGetStarted}
              className="px-5 py-2 bg-accent text-canvas rounded-full hover:bg-accent-strong active:scale-[0.98] transition-all duration-200"
            >
              {t.nav.getStarted}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-ink/70 hover:text-ink transition-colors"
            aria-label={t.nav.toggleMenu}
            aria-expanded={isMobileMenuOpen}
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
              className="md:hidden overflow-hidden border-t border-line"
            >
              <div className="px-4 py-4 flex flex-col gap-4 bg-surface/95">
                {links(closeMobileMenu, 'py-1')}
                <LanguageSwitcher className="w-fit" />
                <button
                  onClick={() => { onGetStarted(); closeMobileMenu(); }}
                  className="px-5 py-2 bg-accent text-canvas rounded-full hover:bg-accent-strong transition-all duration-200 w-fit"
                >
                  {t.nav.getStarted}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
