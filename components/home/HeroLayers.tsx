'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import type { ScreeningMapData } from '@/lib/geo/screeningMap'
import { useLanguage } from '@/lib/i18n/context'

// The hero's isometric stack of map layers, rebuilt from the original
// master-visualization.html (rotateX/rotateZ scene, layers lifted with
// translateZ) but driven by page scroll and drawn from real Arequipa data:
// the layers spread apart as the page scrolls down and settle back as it
// scrolls up. Streets and river are OpenStreetMap; scores are illustrative.

const RAMP = ['#1F3347', '#2A4F66', '#3B7190', '#5C95B3', '#8FBDD3', '#CFE6F0']
const scoreColour = (score: number) => RAMP[Math.min(RAMP.length - 1, Math.floor(score * RAMP.length))]

const BASE_GAP = 34 // minimum distance between layers, in scene pixels
const SPREAD = 64 // extra distance per layer at full spread
// Spread at the top of the page: enough for the labels to separate.
const REST = 0.32
const MIDDLE = 2 // the stack spreads around its middle layer so it stays centred
const zFor = (index: number, p: number) => (index - MIDDLE) * (BASE_GAP + SPREAD * p)

function Layer({
  index,
  label,
  spread,
  width,
  height,
  children,
  solid = false,
}: {
  index: number
  label: string
  spread: MotionValue<number>
  width: number
  height: number
  children: React.ReactNode
  solid?: boolean
}) {
  const z = useTransform(spread, (p) => zFor(index, p))
  // Labels fade in once the layers are far enough apart not to overlap.
  const labelOpacity = useTransform(spread, [REST + 0.04, REST + 0.18], [0, 1])
  return (
    <motion.div
      className="absolute inset-0"
      style={{ z, transformStyle: 'preserve-3d', width, height }}
    >
      <div
        className={`absolute inset-0 rounded-[18px] border-2 border-accent/30 overflow-hidden ${solid ? 'bg-contour' : 'bg-surface/35'}`}
        style={{ boxShadow: '0 18px 50px rgba(0,0,0,0.45)' }}
      >
        <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 w-full h-full">
          {children}
        </svg>
      </div>
      {/* Label beside the layer, with a leader line, as in the original */}
      <motion.div
        className="absolute flex items-center gap-4 whitespace-nowrap pointer-events-none flex-row-reverse"
        style={{ right: 'calc(100% + 24px)', top: `${12 + index * 18}%`, opacity: labelOpacity }}
      >
        <span className="block h-[3px] w-12 bg-accent/70" aria-hidden />
        <span className="font-mono text-[28px] font-medium text-ink/90">{label}</span>
      </motion.div>
    </motion.div>
  )
}

export default function HeroLayers({ data }: { data: ScreeningMapData }) {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 20%', 'end start'] })
  // Spread follows the scroll and completes while the hero is still on screen,
  // eased with a spring so it never feels jumpy. Scrolling back up reverses it.
  const raw = useTransform(scrollYProgress, [0, 0.45], [REST, 1], { clamp: true })
  const smooth = useSpring(raw, { stiffness: 120, damping: 24, mass: 0.4 })
  const still = useTransform(raw, () => 0.7)
  const spread = reduce ? still : smooth
  // The stack drifts down a little as the hero scrolls away, keeping it in view.
  const drift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140])

  const { width, height, cells } = data
  const top = cells.filter((c) => c.rank !== null).sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
  const labels = t.hero.layers
  const pad = 2

  return (
    <motion.figure ref={ref} className="relative" style={{ y: drift }}>
      <div
        className="relative h-[340px] sm:h-[460px] lg:h-[600px] [--s:0.36] sm:[--s:0.5] lg:[--s:0.6]"
        role="img"
        aria-label={t.hero.layersAlt}
        style={{ perspective: '1800px', perspectiveOrigin: '50% 45%' }}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width,
            height,
            marginLeft: -width / 2,
            marginTop: -height / 2,
            transformStyle: 'preserve-3d',
            transform: 'rotateX(58deg) rotateZ(-40deg) scale(var(--s))',
          }}
        >
          {/* 0. Terrain: contour surface and the study boundary */}
          <Layer index={0} label={labels[0]} spread={spread} width={width} height={height} solid>
            <path d={data.boundary} fill="none" stroke="#7FB3CC" strokeWidth="3" strokeDasharray="10 8" strokeOpacity="0.8" />
          </Layer>

          {/* 1. Water: the Chili river */}
          <Layer index={1} label={labels[1]} spread={spread} width={width} height={height}>
            <path d={data.river} stroke="#4F8FB0" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </Layer>

          {/* 2. Infrastructure: the road network */}
          <Layer index={2} label={labels[2]} spread={spread} width={width} height={height}>
            <path d={data.minorRoads} stroke="#E6ECF2" strokeOpacity="0.28" strokeWidth="1.2" fill="none" />
            <path d={data.majorRoads} stroke="#E6ECF2" strokeOpacity="0.7" strokeWidth="2.6" fill="none" />
          </Layer>

          {/* 3. Constraints: excluded cells and the historic-centre zone */}
          <Layer index={3} label={labels[3]} spread={spread} width={width} height={height}>
            <defs>
              <pattern id="hero-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="10" stroke="#E6ECF2" strokeOpacity="0.55" strokeWidth="2.5" />
              </pattern>
            </defs>
            {cells.filter((c) => c.excluded).map((c, i) => (
              <rect key={i} x={c.x + pad} y={c.y + pad} width={c.size - pad * 2} height={c.size - pad * 2} fill="url(#hero-hatch)" stroke="#E6ECF2" strokeOpacity="0.35" />
            ))}
            <circle cx={data.centre.x} cy={data.centre.y} r={data.centre.r} fill="none" stroke="#E6ECF2" strokeOpacity="0.7" strokeWidth="2.5" strokeDasharray="6 6" />
          </Layer>

          {/* 4. Ranked result: scored cells, top candidates outlined */}
          <Layer index={4} label={labels[4]} spread={spread} width={width} height={height}>
            {cells.filter((c) => !c.excluded).map((c, i) => (
              <rect
                key={i}
                x={c.x + pad}
                y={c.y + pad}
                width={c.size - pad * 2}
                height={c.size - pad * 2}
                rx="4"
                fill={scoreColour(c.score)}
                fillOpacity={c.rank ? 1 : 0.55}
                stroke={c.rank ? '#F4F8FB' : 'none'}
                strokeWidth={c.rank ? 3 : 0}
              />
            ))}
          </Layer>

          {/* Priority markers rising from the top-ranked cells, as in the original */}
          <PriorityMarkers cells={top.slice(0, 3)} spread={spread} label={t.hero.priority} />
        </div>
      </div>
      <figcaption className="mt-10 lg:mt-14 text-xs text-ink/55 text-center lg:text-left">{t.hero.layersCaption}</figcaption>
    </motion.figure>
  )
}

// Vertical lines standing up out of the top layer (rotateX(-90deg) from a
// bottom origin, exactly as the original drew them), each naming a candidate.
function PriorityMarkers({
  cells,
  spread,
  label,
}: {
  cells: ScreeningMapData['cells']
  spread: MotionValue<number>
  label: string
}) {
  const z = useTransform(spread, (p) => zFor(4, p))
  const opacity = useTransform(spread, [REST + 0.1, REST + 0.35], [0, 1])
  const lineHeight = 70
  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ z, opacity, transformStyle: 'preserve-3d' }}>
      {cells.map((cell) => (
        <div
          key={cell.rank}
          className="absolute w-[3px] bg-ink/90"
          style={{
            left: cell.x + cell.size / 2 - 1.5,
            top: cell.y + cell.size / 2 - lineHeight,
            height: lineHeight,
            transformOrigin: 'bottom center',
            transform: 'rotateX(-90deg)',
          }}
        >
          <span
            className="absolute bottom-[calc(100%+12px)] left-1/2 font-mono text-[24px] font-medium text-ink whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'translateX(-50%) rotate(180deg)' }}
          >
            {label.replace('{n}', String(cell.rank))}
          </span>
        </div>
      ))}
    </motion.div>
  )
}
