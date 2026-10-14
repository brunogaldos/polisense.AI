'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import BookDemoModal from '@/components/BookDemoModal'
import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import ProductVisual from '@/components/products/ProductVisual'
import HeroLayers from '@/components/home/HeroLayers'
import ScreeningGrid from '@/components/home/ScreeningGrid'
import type { ScreeningMapData } from '@/lib/geo/screeningMap'
import { products } from '@/lib/products'
import { useLanguage } from '@/lib/i18n/context'

// Shared scroll-reveal: fade up once as the element enters the viewport.
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function HomePage({ screening }: { screening: ScreeningMapData }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t, language } = useLanguage()
  const featured = products.filter((product) => product.featured)
  const others = products.filter((product) => !product.featured)

  return (
    <div className="min-h-screen bg-canvas">
      <Header onGetStarted={() => setIsModalOpen(true)} />

      <main id="main">
        {/* Hero: eyebrow, headline, subtext, CTAs. Nothing else. */}
        <section className="relative min-h-[100dvh] flex items-center overflow-clip">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12 grid lg:grid-cols-[2fr_3fr] gap-8 sm:gap-12 items-center w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-7 z-10"
            >
              <a
                href="https://www.globalcovenantofmayors.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:text-ink transition-colors duration-200"
              >
                <span className="h-px w-6 bg-current" aria-hidden />
                {t.hero.badge}
              </a>

              <h1 className="text-[2.6rem] leading-[1.05] md:text-6xl text-ink">
                {t.hero.title}{' '}
                <span className="text-accent">{t.hero.titleHighlight}</span>
              </h1>

              <p className="text-lg text-ink/70 max-w-[32rem] leading-relaxed">
                {t.hero.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-7 gap-y-4 pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group px-7 py-3.5 bg-accent text-canvas rounded-full font-medium flex items-center gap-2 shadow-[0_6px_20px_-6px_rgba(127,179,204,0.35)] hover:bg-accent-strong active:scale-[0.98] transition-all duration-200"
                >
                  {t.hero.bookDemo}
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
                <a
                  href="#how"
                  className="font-medium text-ink underline decoration-ink/25 underline-offset-[6px] hover:decoration-ink transition-colors duration-200"
                >
                  {t.hero.secondary}
                </a>
              </div>
            </motion.div>

            {/* Isometric map layers that spread apart on scroll */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative lg:mr-[-4vw]"
            >
              <HeroLayers data={screening} />
            </motion.div>
          </div>
        </section>

        {/* Measured results strip, directly under the hero */}
        <section className="bg-surface border-y border-line px-6">
          <dl className="max-w-6xl mx-auto grid sm:grid-cols-3 sm:divide-x divide-line">
            {t.hero.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                {...reveal(index * 0.06)}
                className="py-8 sm:py-10 sm:px-8 first:sm:pl-0 border-b sm:border-b-0 border-line last:border-b-0"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-mono tabular text-3xl md:text-4xl text-ink mb-2">{stat.value}</dd>
                <dd className="text-ink/65 leading-snug">{stat.label}</dd>
              </motion.div>
            ))}
          </dl>
        </section>

        {/* Problem: statement left, before/after comparison right */}
        <section className="pt-24 pb-28 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[5fr_6fr] gap-12 lg:gap-20 items-center">
            <motion.div {...reveal()}>
              <h2 className="text-4xl md:text-5xl leading-[1.1] text-ink mb-6">
                {t.problem.title}
              </h2>
              <p className="text-lg text-ink/70 leading-relaxed max-w-[36rem]">
                {t.problem.description}
              </p>
            </motion.div>

            <dl className="lg:pt-2">
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 pb-3 mb-2 border-b border-line text-sm font-medium">
                <span className="text-ink/55">{t.problem.withoutTitle}</span>
                <span aria-hidden />
                <span className="text-accent">{t.problem.withTitle}</span>
              </div>
              {t.problem.compare.map((row, index) => (
                <motion.div
                  key={row.label}
                  {...reveal(index * 0.08)}
                  className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-4 py-5 border-b border-line"
                >
                  <dt className="sr-only">{row.label}</dt>
                  <dd className="font-mono tabular text-xl md:text-2xl text-ink/45 line-through decoration-ink/25">{row.before}</dd>
                  <dd aria-hidden className="text-accent">
                    <ArrowRight size={18} />
                  </dd>
                  <dd>
                    <span className="block font-mono tabular text-xl md:text-2xl text-ink">{row.after}</span>
                    <span className="block text-sm text-ink/60 mt-1">{row.label}</span>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        {/* How it works: Ask / Analyze / Act, told by a grid that screens itself as you scroll */}
        <section id="how" className="scroll-mt-0 px-6 bg-surface border-y border-line">
          <div className="max-w-6xl mx-auto">
            <ScreeningGrid data={screening} title={t.how.title} />

          </div>
        </section>

        {/* Products: three featured cards with results, then an index of the rest */}
        <section id="products" className="scroll-mt-20 pt-24 pb-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <motion.h2 {...reveal()} className="text-4xl md:text-5xl leading-[1.1] text-ink max-w-2xl">
                {t.productsSection.title}
              </motion.h2>
              <Link
                href="/products/"
                className="shrink-0 inline-flex items-center gap-1.5 font-medium text-ink hover:text-accent transition-colors duration-200"
              >
                {t.productsSection.viewAll}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {featured.map((product, index) => (
                <motion.div key={product.slug} {...reveal(index * 0.08)}>
                  <Link
                    href={`/products/${product.slug}/`}
                    className="group flex flex-col h-full rounded-2xl bg-surface border border-line overflow-hidden hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <ProductVisual product={product} className="h-44 w-full" />
                    <div className="flex flex-col flex-1 p-8">
                      <p className="font-mono text-xs text-ink/55 mb-4">
                        {product.sector[language]} · {product.location[language]}
                      </p>
                      <h3 className="font-display text-3xl text-ink mb-3">{product.name[language]}</h3>
                      <p className="text-ink/70 leading-relaxed mb-8">{product.question[language]}</p>
                      <div className="mt-auto pt-6 border-t border-ink/10 flex items-end justify-between gap-6">
                        {product.proof[0] ? (
                          <div>
                            <p className="font-mono tabular text-3xl text-accent mb-1">{product.proof[0].value}</p>
                            <p className="text-sm text-ink/65 max-w-xs leading-snug">
                              {product.proof[0].label[language]}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-ink/65 max-w-xs leading-snug">{product.outputs[0][language]}</p>
                        )}
                        <span className="shrink-0 h-10 w-10 rounded-full border border-ink/15 flex items-center justify-center text-ink group-hover:bg-accent group-hover:border-accent group-hover:text-canvas transition-all duration-300">
                          <ArrowUpRight size={18} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.ul {...reveal(0.1)} className="flex flex-wrap gap-3">
              {others.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}/`}
                    className="group inline-flex items-center gap-3 pl-5 pr-4 py-3 rounded-full border border-line bg-surface hover:border-accent/50 transition-colors duration-200"
                  >
                    <span className="font-medium text-ink group-hover:text-accent transition-colors duration-200">
                      {product.name[language]}
                    </span>
                    <span className="font-mono text-xs text-ink/50">{product.location[language]}</span>
                    <ArrowRight size={15} className="text-ink/35 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="px-4 sm:px-6 pt-8 pb-24">
          <motion.div
            {...reveal()}
            className="max-w-6xl mx-auto rounded-3xl bg-surface-2 border border-line text-white px-8 py-16 md:px-16 md:py-20 grid md:grid-cols-[3fr_2fr] gap-10 items-end"
          >
            <div>
              <h2 className="text-4xl md:text-5xl leading-[1.1] mb-5">{t.cta.title}</h2>
              <p className="text-lg text-white/70 leading-relaxed max-w-xl">{t.cta.description}</p>
            </div>
            <div className="md:justify-self-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group px-8 py-4 bg-accent text-canvas rounded-full font-medium inline-flex items-center gap-2 hover:bg-accent-strong active:scale-[0.98] transition-all duration-200"
              >
                {t.cta.button}
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      <SiteFooter />

      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
