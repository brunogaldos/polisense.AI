'use client'

import { useLanguage } from '@/lib/i18n/context'

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div
      className={`flex items-center rounded-full border border-line bg-canvas p-0.5 text-sm font-medium ${className}`}
      role="group"
      aria-label={t.nav.languageLabel}
    >
      <button
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-3 py-1 rounded-full transition-all duration-200 ${
          language === 'en'
            ? 'bg-accent text-canvas shadow-sm'
            : 'text-ink/60 hover:text-ink'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
        className={`px-3 py-1 rounded-full transition-all duration-200 ${
          language === 'es'
            ? 'bg-accent text-canvas shadow-sm'
            : 'text-ink/60 hover:text-ink'
        }`}
      >
        ES
      </button>
    </div>
  )
}
