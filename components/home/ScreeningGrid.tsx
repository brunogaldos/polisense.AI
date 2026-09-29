'use client'

import { useRef, useState } from 'react'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import type { ScreeningMapData } from '@/lib/geo/screeningMap'
import { useLanguage } from '@/lib/i18n/context'

// Ask -> Analyze -> Act, told on a real map of central Arequipa as the reader
// scrolls: the study area is drawn over the city, cells along the Chili river
// and around the historic centre drop out, the rest are scored, and the top
// candidates are ranked. Streets and river are OpenStreetMap data; boundary,
// exclusion radius and scores are illustrative, and the caption says so.

type Phase = 0 | 1 | 2

// Sequential ramp for scores on the dark map, low to high.
const RAMP = ['#1F3347', '#2A4F66', '#3B7190', '#5C95B3', '#8FBDD3', '#CFE6F0']
const scoreColour = (score: number) => RAMP[Math.min(RAMP.length - 1, Math.floor(score * RAMP.length))]

export function MapFigure({ data, phase }: { data: ScreeningMapData; phase: Phase }) {
  const { t } = useLanguage()
  const { width, height } = data

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto block" role="img" aria-label={t.how.mapAlt}>
      <defs>
        <pattern id="screening-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="#141C2A" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="#E6ECF2" strokeOpacity="0.28" strokeWidth="1.2" />
        </pattern>
        <clipPath id="screening-frame">
          <rect width={width} height={height} rx="14" />
        </clipPath>
      </defs>

      <g clipPath="url(#screening-frame)">
        {/* Basemap: real streets and river */}
        <rect width={width} height={height} fill="#0C1320" />
        <path d={data.minorRoads} stroke="#E6ECF2" strokeOpacity="0.17" strokeWidth="0.8" fill="none" strokeLinejoin="round" />
        <path d={data.majorRoads} stroke="#E6ECF2" strokeOpacity="0.42" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
        <path d={data.river} stroke="#4F8FB0" strokeOpacity="0.9" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Grid cells over the study area */}
        {data.cells.map((cell, index) => {
          const scored = phase >= 1 && !cell.excluded
          const top = phase === 2 && cell.rank !== null
          const pad = 1.5
          return (
            <g key={index}>
              <rect
                x={cell.x + pad}
                y={cell.y + pad}
                width={cell.size - pad * 2}
                height={cell.size - pad * 2}
                rx="3"
                fill={phase >= 1 && cell.excluded ? 'url(#screening-hatch)' : scored ? scoreColour(cell.score) : 'transparent'}
                fillOpacity={phase === 0 ? 0 : top ? 0.95 : phase === 2 ? 0.14 : cell.excluded ? 0.9 : 0.62}
                stroke={top ? '#F4F8FB' : '#7FB3CC'}
                strokeOpacity={top ? 1 : phase === 0 ? 0.28 : 0.1}
                strokeWidth={top ? 2 : 0.8}
                style={{
                  transition: 'fill-opacity 500ms ease, stroke-opacity 500ms ease',
                  transitionDelay: `${phase === 1 ? Math.round(cell.score * 450) : 0}ms`,
                }}
              />
              {top && (
                <text
                  x={cell.x + cell.size / 2}
                  y={cell.y + cell.size / 2 + 4.5}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="#0F1623"
                  className="font-mono"
                >
                  {cell.rank}
                </text>
              )}
            </g>
          )
        })}

        {/* Study boundary */}
        <path
          d={data.boundary}
          fill="none"
          stroke="#7FB3CC"
          strokeWidth="1.6"
          strokeDasharray="6 5"
          strokeOpacity={phase === 0 ? 0.95 : 0.55}
          style={{ transition: 'stroke-opacity 500ms ease' }}
        />

        {/* Exclusion zone around the historic centre, shown once constraints apply */}
        <circle
          cx={data.centre.x}
          cy={data.centre.y}
          r={data.centre.r}
          fill="none"
          stroke="#E6ECF2"
          strokeOpacity={phase >= 1 ? 0.55 : 0}
          strokeDasharray="3 4"
          style={{ transition: 'stroke-opacity 500ms ease' }}
        />

        {/* Labels */}
        <g className="font-mono" fontSize="12">
          <text x={data.riverLabel.x + 10} y={data.riverLabel.y} fill="#8FBDD3" fillOpacity="0.9">
            {t.how.mapLabels.river}
          </text>
          <text
            x={data.centre.x}
            y={data.centre.y - data.centre.r - 8}
            textAnchor="middle"
            fill="#E6ECF2"
            fillOpacity={phase >= 1 ? 0.8 : 0.45}
            style={{ transition: 'fill-opacity 500ms ease' }}
          >
            {t.how.mapLabels.centre}
          </text>
        </g>

        {/* Place, scale and attribution */}
        <g className="font-mono" fontSize="11">
          <rect x="14" y="14" width="210" height="44" rx="8" fill="#0F1623" fillOpacity="0.85" />
          <text x="26" y="33" fill="#E6ECF2" fontSize="12">{t.how.mapLabels.place}</text>
          <text x="26" y="49" fill="#E6ECF2" fillOpacity="0.6">16.40°S 71.54°W</text>

          <g transform={`translate(18 ${height - 30})`}>
            <rect x="-4" y="-16" width={data.scaleBar.px + 52} height="26" rx="6" fill="#0F1623" fillOpacity="0.85" />
            <line x1="4" y1="0" x2={data.scaleBar.px + 4} y2="0" stroke="#E6ECF2" strokeOpacity="0.8" strokeWidth="1.5" />
            <line x1="4" y1="-4" x2="4" y2="4" stroke="#E6ECF2" strokeOpacity="0.8" strokeWidth="1.5" />
            <line x1={data.scaleBar.px + 4} y1="-4" x2={data.scaleBar.px + 4} y2="4" stroke="#E6ECF2" strokeOpacity="0.8" strokeWidth="1.5" />
            <text x={data.scaleBar.px + 12} y="4" fill="#E6ECF2" fillOpacity="0.75">{data.scaleBar.km} km</text>
          </g>

          <text x={width - 14} y={height - 14} textAnchor="end" fill="#E6ECF2" fillOpacity="0.5" fontSize="10">
            © OpenStreetMap contributors
          </text>
        </g>
      </g>
    </svg>
  )
}

export default function ScreeningGrid({ data }: { data: ScreeningMapData }) {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [scrollPhase, setScrollPhase] = useState<Phase>(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Only the discrete phase goes into React state; the scroll value itself stays
  // a motion value, so scrolling doesn't re-render on every frame.
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next: Phase = value < 0.3 ? 0 : value < 0.65 ? 1 : 2
    setScrollPhase((current) => (current === next ? current : next))
  })

  const phase: Phase = reduce ? 2 : scrollPhase
  const readout = [
    t.how.readout.cells.replace('{n}', String(data.counts.total)),
    t.how.readout.excluded.replace('{n}', String(data.counts.excluded)),
    t.how.readout.ranked.replace('{n}', String(data.counts.top)),
  ]

  return (
    <div ref={ref} className={reduce ? '' : 'h-[260vh]'}>
      <div className={reduce ? 'py-8' : 'sticky top-0 min-h-[100dvh] flex items-center py-16'}>
        <div className="w-full grid lg:grid-cols-[4fr_7fr] gap-8 lg:gap-12 items-center">
          <ol className="space-y-3">
            {t.how.steps.map((step, index) => {
              const active = reduce || index === phase
              return (
                <li
                  key={step.label}
                  className={`rounded-2xl border p-5 md:p-6 transition-all duration-500 ${
                    active ? 'border-accent/50 bg-surface' : 'border-transparent opacity-45'
                  }`}
                >
                  <p className="font-mono text-sm text-accent mb-2">{step.label}</p>
                  <h3 className="text-lg md:text-xl font-medium text-ink mb-2 leading-snug">{step.title}</h3>
                  <p className="text-ink/70 leading-relaxed">{step.description}</p>
                </li>
              )
            })}
          </ol>

          <figure>
            <div className="rounded-2xl border border-line overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
              <MapFigure data={data} phase={phase} />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 font-mono text-xs text-ink/65">
              <span className="text-ink/85">{readout[phase]}</span>
              <span className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-hatch border border-line" aria-hidden />
                  {t.how.mapLabels.excluded}
                </span>
                <span className="flex items-center gap-2">
                  <span className="flex" aria-hidden>
                    {RAMP.map((colour) => (
                      <span key={colour} className="h-3 w-3 first:rounded-l-sm last:rounded-r-sm" style={{ backgroundColor: colour }} />
                    ))}
                  </span>
                  {t.how.mapLabels.score}
                </span>
              </span>
            </div>
            <figcaption className="mt-3 text-xs text-ink/55">{t.how.caption}</figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}
