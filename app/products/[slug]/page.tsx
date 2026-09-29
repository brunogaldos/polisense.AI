import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/products/ProductDetail'
import { getProduct, products } from '@/lib/products'

// Static export: every capability page is generated at build time from
// lib/products.ts, so adding an entry there adds a page here.
export const dynamicParams = false

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}
  return {
    title: `${product.name.en} | Polisense AI`,
    description: product.summary.en,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!getProduct(slug)) notFound()
  return <ProductDetail slug={slug} />
}
