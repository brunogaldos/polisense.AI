'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/context'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

// The real product screen sitting on the data layers the engine fuses. As the
// page scrolls, the layers fan out from under the screen, which is the story
// of the product: many layers in, one ranked answer out.
export default function HeroVisual() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 30%', 'end start'] })

  // Each layer drifts up and left a little further than the one above it.
  const spread = useTransform(scrollYProgress, [0, 1], [0, 1])
  const layer1 = useTransform(spread, (p) => `translate(${-18 - 22 * p}px, ${-18 - 26 * p}px)`)
  const layer2 = useTransform(spread, (p) => `translate(${-36 - 44 * p}px, ${-36 - 52 * p}px)`)
  const layer3 = useTransform(spread, (p) => `translate(${-54 - 66 * p}px, ${-54 - 78 * p}px)`)
  const transforms = [layer3, layer2, layer1]
  const surfaces = ['bg-hatch', 'bg-contour', 'bg-surface-2']

  return (
    <div ref={ref} className="relative pl-16 pt-16 sm:pl-20 sm:pt-20">
      {/* Data layers, back to front: regulation, terrain, infrastructure */}
      {t.hero.layers.map((label, index) => (
        <motion.div
          key={label}
          aria-hidden
          style={reduce ? undefined : { transform: transforms[index] }}
          className={`absolute inset-0 left-16 top-16 sm:left-20 sm:top-20 rounded-2xl border border-accent/25 ${surfaces[index]} ${
            reduce ? ['-translate-x-12 -translate-y-12', '-translate-x-8 -translate-y-8', '-translate-x-4 -translate-y-4'][index] : ''
          }`}
        >
          <span className="absolute top-2.5 left-3 font-mono text-[11px] text-accent/80">{label}</span>
        </motion.div>
      ))}

      {/* The answer: a real Polisense screen. The frame is slightly shorter
          than the image and anchored to the top, cropping the guided-tour
          footer line out of the screenshot. */}
      <div className="relative rounded-2xl overflow-hidden border border-accent/40 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.8)] bg-surface">
        <div className="aspect-[1600/730]">
          <img
            src={`${basePath}/products/vegetation-change-analysis.jpg`}
            alt={t.hero.imageAlt}
            width={1600}
            height={795}
            fetchPriority="high"
            className="w-full h-full object-cover object-top"
          />
        </div>
        {/* Real metadata of this run: place, sensor period, area */}
        <dl className="flex flex-wrap gap-x-5 gap-y-1 px-4 py-2.5 border-t border-line bg-canvas/80 font-mono text-[11px] text-ink/70">
          {t.hero.meta.map((item) => (
            <div key={item.label} className="flex gap-1.5">
              <dt className="text-ink/55">{item.label}</dt>
              <dd className="tabular">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
