'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import BookDemoModal from '@/components/BookDemoModal'
import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import EngineIcon from '@/components/platform/EngineIcon'
import EngineVisual from '@/components/platform/EngineVisual'
import { getProduct } from '@/lib/products'
import { toolkits } from '@/lib/toolkits'
import { useLanguage } from '@/lib/i18n/context'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
})

// Three-column grid with no empty cells: widen the first card (and the last,
// if needed) so the cards fill whole rows.
const extraCells = (3 - (toolkits.length % 3)) % 3
const wide = (index: number) =>
  (extraCells >= 1 && index === 0) || (extraCells === 2 && index === toolkits.length - 1)
// Vary the card surfaces so the grid is not a wall of identical tiles.
const surface = (index: number) => (index === 0 ? 'bg-contour' : index === 4 ? 'bg-surface-2' : 'bg-surface')

export default function Platform() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t, language } = useLanguage()

  return (
    <div className="min-h-screen bg-canvas">
      <Header onGetStarted={() => setIsModalOpen(true)} />

      <main id="main" className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-14"
          >
            <p className="inline-flex items-center gap-2 font-mono text-xs text-accent mb-5">
              <span className="h-px w-6 bg-current" aria-hidden />
              {t.platform.eyebrow}
            </p>
            <h1 className="text-5xl md:text-6xl leading-[1.05] text-ink mb-6">{t.platform.title}</h1>
            <p className="text-lg text-ink/70 leading-relaxed">{t.platform.description}</p>
          </motion.div>

          {/* Engines: overview only */}
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolkits.map((toolkit, index) => (
              <motion.li
                key={toolkit.id}
                id={toolkit.id}
                {...reveal((index % 3) * 0.05)}
                className={`scroll-mt-28 rounded-2xl border border-line overflow-hidden flex flex-col ${
                  wide(index) ? 'lg:col-span-2' : ''
                } ${surface(index)}`}
              >
                <EngineVisual toolkit={toolkit} className="h-44 md:h-52 w-full border-b border-line" />
                <div className="p-7 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <EngineIcon name={toolkit.icon} />
                    <h2 className="text-2xl text-ink leading-tight">{toolkit.name[language]}</h2>
                  </div>
                  <p className="text-ink/70 leading-relaxed max-w-[52ch]">{toolkit.summary[language]}</p>
                  <ul className="mt-5 space-y-1.5">
                    {toolkit.outputs.map((output) => (
                      <li key={output.en} className="flex items-center gap-2.5 text-sm text-ink/85">
                        <span className="h-px w-3 bg-accent" aria-hidden />
                        {output[language]}
                      </li>
                    ))}
                  </ul>
                  {toolkit.usedBy.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mt-auto pt-6">
                      <span className="text-sm text-ink/55 mr-1">{t.platform.usedBy}</span>
                      {toolkit.usedBy.map((slug) => {
                        const product = getProduct(slug)
                        if (!product) return null
                        return (
                          <Link
                            key={slug}
                            href={`/products/${slug}/`}
                            className="text-sm px-3 py-1 rounded-full border border-line bg-canvas/40 text-ink/85 hover:border-accent hover:text-accent transition-colors duration-200"
                          >
                            {product.name[language]}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Principles that hold across every engine */}
          <motion.ul
            {...reveal()}
            className="mt-20 grid md:grid-cols-3 gap-6 md:gap-10 border-y border-line py-8"
          >
            {t.platform.principles.map((item) => (
              <li key={item} className="font-medium text-ink leading-snug">{item}</li>
            ))}
          </motion.ul>
        </div>

        {/* CTA */}
        <section className="pt-24">
          <motion.div
            {...reveal()}
            className="max-w-6xl mx-auto rounded-3xl bg-surface-2 border border-line text-white px-8 py-14 md:px-16 md:py-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl mb-3">{t.platform.ctaTitle}</h2>
              <p className="text-white/70 text-lg">{t.platform.ctaDescription}</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group shrink-0 px-7 py-3.5 bg-accent text-canvas rounded-full font-medium inline-flex items-center gap-2 hover:bg-accent-strong active:scale-[0.98] transition-all duration-200 w-fit"
            >
              {t.platform.ctaButton}
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </motion.div>
        </section>
      </main>

      <SiteFooter />

      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
