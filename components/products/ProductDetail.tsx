'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import BookDemoModal from '@/components/BookDemoModal'
import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import ProductVisual from '@/components/products/ProductVisual'
import { getProduct, products } from '@/lib/products'
import { toolkitsFor } from '@/lib/toolkits'
import EngineIcon from '@/components/platform/EngineIcon'
import { useLanguage } from '@/lib/i18n/context'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function ProductDetail({ slug }: { slug: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t, language } = useLanguage()
  const product = getProduct(slug)!
  const others = products.filter((other) => other.slug !== slug)
  const tools = toolkitsFor(slug)

  return (
    <div className="min-h-screen bg-canvas">
      <Header onGetStarted={() => setIsModalOpen(true)} />

      <main id="main">
        {/* Intro: name and question left, location and CTA right */}
        <section className="pt-28 pb-14 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/products/"
              className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink transition-colors duration-200 mb-10"
            >
              <ArrowLeft size={16} />
              {t.productPage.backToProducts}
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-end"
            >
              <div>
                <p className="font-mono text-xs text-accent mb-5">{product.sector[language]}</p>
                <h1 className="text-5xl md:text-6xl leading-[1.05] text-ink mb-6">
                  {product.name[language]}
                </h1>
                <p className="text-xl md:text-2xl text-ink/80 leading-snug max-w-2xl">
                  {product.question[language]}
                </p>
              </div>
              <div className="lg:pb-2">
                <p className="text-sm text-ink/55 mb-1">{t.productPage.validatedIn}</p>
                <p className="text-lg font-medium text-ink mb-6">{product.location[language]}</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group px-6 py-3 bg-accent text-canvas rounded-full font-medium inline-flex items-center gap-2 hover:bg-accent-strong active:scale-[0.98] transition-all duration-200"
                >
                  {t.productPage.ctaButton}
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-14"
            >
              <ProductVisual product={product} className="w-full h-56 md:h-80 rounded-2xl" />
            </motion.div>
          </div>
        </section>

        {/* Results, when the capability has measured ones */}
        {product.proof.length > 0 && (
          <section className="px-4 sm:px-6 pb-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-sans text-sm font-medium tracking-normal text-ink/55 mb-8">
                {t.productPage.proofLabel}
              </h2>
              <dl className="grid sm:grid-cols-2 gap-10">
                {product.proof.map((point, index) => (
                  <motion.div key={point.value} {...reveal(index * 0.08)} className="border-t-2 border-accent pt-6">
                    <dt className="sr-only">{point.label[language]}</dt>
                    <dd className="font-mono tabular text-4xl md:text-5xl text-accent mb-3">{point.value}</dd>
                    <dd className="text-ink/70 leading-snug max-w-sm">{point.label[language]}</dd>
                  </motion.div>
                ))}
              </dl>
              {product.caseStudy && (
                <Link
                  href={product.caseStudy.href}
                  className="inline-flex items-center gap-1.5 mt-10 font-medium text-ink underline decoration-ink/25 underline-offset-[6px] hover:decoration-ink transition-colors duration-200"
                >
                  {product.caseStudy.label[language]}
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </section>
        )}

        {/* What it does, as a sequence; data and outputs alongside */}
        <section className="py-24 px-4 sm:px-6 bg-surface border-y border-line">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[7fr_4fr] gap-14 lg:gap-20">
            <motion.div {...reveal()}>
              <h2 className="text-3xl md:text-4xl text-ink mb-6">{t.productPage.whatItDoes}</h2>
              <p className="text-lg text-ink/75 leading-relaxed mb-12 max-w-[62ch]">
                {product.summary[language]}
              </p>
              <ol className="border-l-2 border-accent/25 space-y-7">
                {product.steps.map((step) => (
                  <li key={step.en} className="pl-6 text-ink leading-relaxed">
                    {step[language]}
                  </li>
                ))}
              </ol>
            </motion.div>

            <motion.aside {...reveal(0.1)} className="space-y-6 lg:sticky lg:top-28 self-start">
              <div className="rounded-2xl bg-canvas p-7">
                <h3 className="text-sm font-medium text-ink/55 mb-4">{t.productPage.dataLabel}</h3>
                <ul className="space-y-2.5">
                  {product.data.map((item) => (
                    <li key={item.en} className="text-ink/85 leading-snug">{item[language]}</li>
                  ))}
                </ul>
                {product.sourceNote && (
                  <p className="mt-5 text-xs text-ink/60 leading-relaxed">{product.sourceNote[language]}</p>
                )}
              </div>
              <div className="rounded-2xl bg-accent text-canvas p-7">
                <h3 className="text-sm font-medium text-canvas/70 mb-4">{t.productPage.outputsLabel}</h3>
                <ul className="space-y-2.5">
                  {product.outputs.map((item) => (
                    <li key={item.en} className="font-medium leading-snug">{item[language]}</li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </div>
        </section>

        {/* Toolkits this capability is verified to run on, linked to /platform/ */}
        {tools.length > 0 && (
          <section className="pt-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <motion.h2 {...reveal()} className="text-3xl md:text-4xl text-ink mb-10">
                {t.productPage.toolsTitle}
              </motion.h2>
              <ul className="grid sm:grid-cols-2 gap-4 max-w-4xl">
                {tools.map((toolkit, index) => (
                  <motion.li key={toolkit.id} {...reveal((index % 4) * 0.05)}>
                    <Link
                      href={`/platform/#${toolkit.id}`}
                      className="group flex flex-col h-full rounded-2xl border border-line bg-surface p-6 hover:border-accent/50 transition-colors duration-200"
                    >
                      <span className="flex items-center gap-3 font-medium text-ink mb-3 group-hover:text-accent transition-colors duration-200">
                        <EngineIcon name={toolkit.icon} size="sm" />
                        <span className="flex-1">{toolkit.name[language]}</span>
                        <ArrowRight size={16} className="shrink-0 text-ink/35 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200" />
                      </span>
                      <span className="text-sm text-ink/65 leading-relaxed">{toolkit.summary[language]}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {product.views && (
          <section className="pt-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <motion.h2 {...reveal()} className="text-3xl md:text-4xl text-ink mb-12">
                {product.views.title[language]}
              </motion.h2>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                {product.views.items.map((view, index) => (
                  <motion.li key={view.name.en} {...reveal((index % 3) * 0.06)}>
                    <div className="flex h-2.5 rounded-full overflow-hidden mb-5 max-w-[12rem]" aria-hidden>
                      {view.swatch.map((colour) => (
                        <span key={colour} className="flex-1" style={{ backgroundColor: colour }} />
                      ))}
                    </div>
                    <h3 className="text-lg font-medium text-ink mb-2">{view.name[language]}</h3>
                    <p className="text-ink/70 leading-relaxed">{view.description[language]}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {product.trust && (
          <section className="pt-20 px-4 sm:px-6">
            <ul className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 md:gap-10 border-y border-ink/15 py-8">
              {product.trust.map((item) => (
                <li key={item.en} className="font-medium text-ink leading-snug">{item[language]}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Shared engine: stacked heading and text, then the loop */}
        <section className="py-24 px-4 sm:px-6">
          <motion.div {...reveal()} className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-ink leading-tight mb-4">{t.productPage.engineTitle}</h2>
            <p className="text-lg text-ink/70 leading-relaxed mb-8 max-w-[62ch]">
              {t.productPage.engineDescription}
            </p>
            <ol className="flex flex-wrap items-center gap-3">
              {t.how.steps.map((step, index) => (
                <li key={step.label} className="flex items-center gap-3">
                  <span className="font-mono text-sm px-4 py-2 rounded-full bg-surface-2 text-ink">
                    {step.label}
                  </span>
                  {index < t.how.steps.length - 1 && (
                    <ArrowRight size={16} className="text-ink/35" aria-hidden />
                  )}
                </li>
              ))}
            </ol>
          </motion.div>
        </section>

        {/* Other products */}
        <section className="pb-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-sans text-sm font-medium tracking-normal text-ink/55 mb-6">
              {t.productPage.otherProducts}
            </h2>
            <ul className="flex flex-wrap gap-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/products/${other.slug}/`}
                    className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-ink/15 text-ink hover:border-accent hover:text-accent transition-colors duration-200"
                  >
                    {other.name[language]}
                    <ArrowRight size={15} className="text-ink/35 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 pb-24">
          <motion.div
            {...reveal()}
            className="max-w-6xl mx-auto rounded-3xl bg-surface-2 border border-line text-white px-8 py-14 md:px-16 md:py-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl mb-3">{t.productPage.ctaTitle}</h2>
              <p className="text-white/70 text-lg">{t.productPage.ctaDescription}</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group shrink-0 px-7 py-3.5 bg-accent text-canvas rounded-full font-medium inline-flex items-center gap-2 hover:bg-accent-strong active:scale-[0.98] transition-all duration-200 w-fit"
            >
              {t.productPage.ctaButton}
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
