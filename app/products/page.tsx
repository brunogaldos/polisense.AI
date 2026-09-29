'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import BookDemoModal from '@/components/BookDemoModal'
import Header from '@/components/Header'
import SiteFooter from '@/components/SiteFooter'
import ProductVisual from '@/components/products/ProductVisual'
import { products } from '@/lib/products'
import { useLanguage } from '@/lib/i18n/context'

// Three-column grid with no empty cells: widen the first card (and the last,
// if needed) so the card count fills whole rows. 8 cards read 2+1, 1+1+1, 1+1+1;
// 7 cards read 2+1, 1+1+1, 1+2.
const extraCells = (3 - (products.length % 3)) % 3
const wide = (index: number) =>
  (extraCells >= 1 && index === 0) || (extraCells === 2 && index === products.length - 1)

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t, language } = useLanguage()

  return (
    <div className="min-h-screen bg-canvas">
      <Header onGetStarted={() => setIsModalOpen(true)} />

      <main id="main" className="pt-32 pb-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-14"
          >
            <h1 className="text-5xl md:text-6xl leading-[1.05] text-ink mb-6">
              {t.productPage.indexTitle}
            </h1>
            <p className="text-lg text-ink/70 leading-relaxed">{t.productPage.indexDescription}</p>
          </motion.div>

          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, index) => (
              <motion.li
                key={product.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                className={wide(index) ? 'lg:col-span-2' : ''}
              >
                <Link
                  href={`/products/${product.slug}/`}
                  className="group flex flex-col h-full rounded-2xl bg-surface border border-line overflow-hidden hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <ProductVisual product={product} className="h-40 w-full" />
                  <div className="flex flex-col flex-1 p-7">
                    <p className="font-mono text-xs text-ink/55 mb-3">
                      {product.sector[language]} · {product.location[language]}
                    </p>
                    <h2 className="text-2xl md:text-[1.7rem] leading-tight text-ink mb-3">
                      {product.name[language]}
                    </h2>
                    <p className="text-ink/70 leading-relaxed mb-6">{product.question[language]}</p>
                    <span className="mt-auto self-end h-9 w-9 rounded-full border border-ink/15 flex items-center justify-center text-ink group-hover:bg-accent group-hover:border-accent group-hover:text-canvas transition-all duration-300">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </main>

      <SiteFooter />

      <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
