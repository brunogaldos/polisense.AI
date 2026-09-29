'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/context'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const linkClass = 'hover:text-ink transition-colors duration-200'

export default function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="pt-14 pb-10 px-6 bg-surface text-ink/70 border-t border-line">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <img src={`${basePath}/polisense_logo.svg`} alt="" className="h-6 w-6" />
          <span className="text-lg font-medium text-ink">Polisense AI</span>
        </Link>
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm" aria-label="Footer">
          <Link href="/products/" className={linkClass}>{t.footer.products}</Link>
          <Link href="/platform/" className={linkClass}>{t.footer.platform}</Link>
          <Link href="/blog/" className={linkClass}>{t.footer.blog}</Link>
          <a
            href={`${basePath}/Polisense_AI_whitepaper.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {t.footer.whitepaper}
          </a>
          <a
            href="https://www.linkedin.com/company/polisense-ai/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {t.footer.linkedin}
          </a>
          <a href="mailto:info@polisenseai.com" className={linkClass}>{t.footer.contact}</a>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-line flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-8">
          <span className="font-mono text-[11px] text-ink/45 tracking-wider">{t.footer.partners}</span>
          <img
            src={`${basePath}/Hack for Earth Foundation - black.svg`}
            alt="Hack for Earth Foundation"
            className="h-7 invert opacity-50 hover:opacity-80 transition-opacity duration-200"
          />
          <img
            src={`${basePath}/GCoM_logo.svg`}
            alt="Global Covenant of Mayors"
            className="h-9 opacity-50 hover:opacity-80 transition-opacity duration-200 brightness-0 invert"
          />
          <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer">
            <img
              src={`${basePath}/elevenlabs-logo-black.svg`}
              alt="ElevenLabs"
              className="h-5 invert opacity-50 hover:opacity-80 transition-opacity duration-200"
            />
          </a>
        </div>
        <p className="text-xs text-ink/50">{t.footer.copyright}</p>
      </div>
    </footer>
  )
}
