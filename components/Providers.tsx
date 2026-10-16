'use client'

import type { ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import { LanguageProvider } from '@/lib/i18n/context'

// reducedMotion="user" makes every framer-motion animation on the site follow
// the visitor's OS "reduce motion" setting: movement is dropped, fades remain.
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>{children}</LanguageProvider>
    </MotionConfig>
  )
}
