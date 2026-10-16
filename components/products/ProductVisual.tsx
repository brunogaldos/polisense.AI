'use client'

import type { Product } from '@/lib/products'
import { useLanguage } from '@/lib/i18n/context'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

// Real screenshot when the product has one, otherwise a contour-line panel.
// The panel is deliberately abstract: it must never pass for a product screen.
export default function ProductVisual({ product, className = '' }: { product: Product; className?: string }) {
  const { language } = useLanguage()

  if (product.image) {
    return (
      <img
        src={`${basePath}${product.image.src}`}
        alt={product.image.alt[language]}
        loading="lazy"
        decoding="async"
        className={`object-cover ${className}`}
      />
    )
  }

  return <div className={`bg-contour ${className}`} aria-hidden />
}
