'use client'

import { useLanguage } from '@/lib/i18n/context'

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div
      className={`flex items-center rounded-full border border-[#E3DED6] bg-[#F5F2EC] p-0.5 text-sm font-medium ${className}`}
      role="group"
      aria-label={t.nav.languageLabel}
    >
      <button
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-3 py-1 rounded-full transition-all duration-200 ${
          language === 'en'
            ? 'bg-[#5E8EA6] text-white shadow-sm'
            : 'text-[#141517]/60 hover:text-[#141517]'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
        className={`px-3 py-1 rounded-full transition-all duration-200 ${
          language === 'es'
            ? 'bg-[#5E8EA6] text-white shadow-sm'
            : 'text-[#141517]/60 hover:text-[#141517]'
        }`}
      >
        ES
      </button>
    </div>
  )
}
