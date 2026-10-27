'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react'
import BookDemoModal from '@/components/BookDemoModal'
import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import ProductVisual from '@/components/products/ProductVisual'
import { getProduct, products } from '@/lib/products'
import { toolkitsFor } from '@/lib/toolkits'
import EngineIcon from '@/components/platform/EngineIcon'
import { useLanguage } from '@/lib/i18n/context'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

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
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="group px-6 py-3 bg-accent text-canvas rounded-full font-medium inline-flex items-center gap-2 hover:bg-accent-strong active:scale-[0.98] transition-all duration-200"
                  >
                    {t.productPage.ctaButton}
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </button>
                  {product.whitepaper && (
                    <a
                      href={`${basePath}${product.whitepaper.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 border border-accent/60 text-ink hover:bg-accent/10 hover:border-accent transition-all duration-200"
                    >
                      <FileText size={16} className="text-accent" />
                      {product.whitepaper.label[language]}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-14"
            >
              {/* The contour placeholder is for products with nothing real to show yet. */}
              {(product.image || !product.gallery) && (
                <ProductVisual product={product} className="w-full h-56 md:h-80 rounded-2xl" />
              )}
            </motion.div>
          </div>
        </section>

        {/* Maps from a finished run, shown whole: the legend and numbers are part of the image */}
        {product.gallery && (
          <section className="px-4 sm:px-6 pb-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-sans text-sm font-medium tracking-normal text-ink/55 mb-8">
                {product.galleryKind === 'data' ? t.productPage.dataGalleryTitle : t.productPage.galleryTitle}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {product.gallery.map((map, index) => (
                  <motion.figure
                    key={map.src}
                    {...reveal((index % 2) * 0.08)}
                    className={index === 0 ? 'md:col-span-2' : undefined}
                  >
                    <img
                      src={`${basePath}${map.src}`}
                      alt={map.alt[language]}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto rounded-2xl border border-line"
                    />
                    <figcaption className="mt-3 text-sm text-ink/60 leading-relaxed">
                      {map.caption[language]}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>
          </section>
        )}

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

        {/* What it does: short steps, the engines it runs on, data in and results out */}
        <section className="py-20 px-4 sm:px-6 bg-surface border-y border-line">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[7fr_4fr] gap-12 lg:gap-20">
            <motion.div {...reveal()}>
              <h2 className="text-3xl md:text-4xl text-ink mb-8">{t.productPage.whatItDoes}</h2>
              <ol className="border-l-2 border-accent/25 space-y-5">
                {product.steps.map((step) => (
                  <li key={step.en} className="pl-6 text-ink leading-relaxed">
                    {step[language]}
                  </li>
                ))}
              </ol>

              {tools.length > 0 && (
                <div className="mt-10 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-ink/55 mr-2">{t.productPage.toolsTitle}</span>
                  {tools.map((toolkit) => (
                    <Link
                      key={toolkit.id}
                      href={`/platform/#${toolkit.id}`}
                      className="group inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full border border-line bg-canvas hover:border-accent/50 transition-colors duration-200"
                    >
                      <EngineIcon name={toolkit.icon} size="sm" />
                      <span className="text-sm font-medium text-ink group-hover:text-accent transition-colors duration-200">
                        {toolkit.name[language]}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.aside {...reveal(0.1)} className="space-y-6 self-start">
              <div>
                <h3 className="text-sm font-medium text-ink/55 mb-3">{t.productPage.dataLabel}</h3>
                <ul className="flex flex-wrap gap-2">
                  {product.data.map((item) => (
                    <li key={item.en} className="text-sm px-3 py-1.5 rounded-lg bg-canvas border border-line text-ink/85">
                      {item[language]}
                    </li>
                  ))}
                </ul>
                {product.sourceNote && (
                  <p className="mt-3 text-xs text-ink/55 leading-relaxed">{product.sourceNote[language]}</p>
                )}
              </div>
              <div className="rounded-2xl bg-accent text-canvas p-6">
                <h3 className="text-sm font-medium text-canvas/70 mb-3">{t.productPage.outputsLabel}</h3>
                <ul className="space-y-2">
                  {product.outputs.map((item) => (
                    <li key={item.en} className="font-medium leading-snug">{item[language]}</li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </div>
        </section>

        {product.views && (
          <section className="pt-20 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <motion.h2 {...reveal()} className="text-2xl md:text-3xl text-ink mb-8">
                {product.views.title[language]}
              </motion.h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {product.views.items.map((view, index) => (
                  <motion.li
                    key={view.name.en}
                    {...reveal((index % 6) * 0.04)}
                    title={view.description[language]}
                    className="rounded-xl border border-line bg-surface p-4"
                  >
                    <div className="flex h-2 rounded-full overflow-hidden mb-3" aria-hidden>
                      {view.swatch.map((colour) => (
                        <span key={colour} className="flex-1" style={{ backgroundColor: colour }} />
                      ))}
                    </div>
                    <h3 className="text-sm font-medium text-ink leading-snug">{view.name[language]}</h3>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {product.trust && (
          <section className="pt-16 px-4 sm:px-6">
            <ul className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 md:gap-10 border-y border-ink/15 py-8">
              {product.trust.map((item) => (
                <li key={item.en} className="font-medium text-ink leading-snug">{item[language]}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Other products */}
        <section className="pt-16 pb-16 px-4 sm:px-6">
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
