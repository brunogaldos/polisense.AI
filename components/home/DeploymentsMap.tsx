'use client'

import type { DeploymentsMapData } from '@/lib/geo/deploymentsMap'
import { useLanguage } from '@/lib/i18n/context'

const NAMES: Record<string, { en: string; es: string }> = {
  '604': { en: 'Peru', es: 'Perú' },
  '400': { en: 'Jordan', es: 'Jordania' },
  '498': { en: 'Moldova', es: 'Moldavia' },
  '032': { en: 'Argentina', es: 'Argentina' },
  '050': { en: 'Bangladesh', es: 'Bangladés' },
  '508': { en: 'Mozambique', es: 'Mozambique' },
}

// Labels sit left of the marker where the right side would collide with a
// neighbour or run off the map; everything else sits to the right.
const LABEL_LEFT = new Set(['604', '032'])

export default function DeploymentsMap({ data }: { data: DeploymentsMapData }) {
  const { t, language } = useLanguage()

  return (
    <figure>
      <svg
        viewBox={`0 0 ${data.width} ${data.height}`}
        className="w-full h-auto"
        role="img"
        aria-label={t.proof.mapAlt}
      >
        {/* Land as a dot matrix */}
        <path d={data.landDots} stroke="#E6ECF2" strokeOpacity={0.16} strokeWidth={3.2} strokeLinecap="round" fill="none" />

        {/* Deployment countries */}
        {data.countries.map((country) => (
          <path
            key={`${country.id}-shape`}
            d={country.outline}
            fill={country.status === 'live' ? '#7FB3CC' : 'transparent'}
            fillOpacity={country.status === 'live' ? 0.35 : 0}
            stroke="#7FB3CC"
            strokeOpacity={country.status === 'live' ? 0.9 : 0.7}
            strokeWidth={1}
            strokeDasharray={country.status === 'loi' ? '3 3' : undefined}
          />
        ))}

        {/* Markers and labels */}
        {data.countries.map((country) => {
          const left = LABEL_LEFT.has(country.id)
          return (
            <g key={country.id} transform={`translate(${country.x} ${country.y})`}>
              {country.status === 'live' ? (
                <>
                  {/* Pulse marks live deployments only; it stops under reduced motion. */}
                  <circle r={6} fill="#7FB3CC" className="origin-center motion-safe:animate-ping" style={{ transformBox: 'fill-box' }} opacity={0.5} />
                  <circle r={4.5} fill="#7FB3CC" />
                </>
              ) : (
                <circle r={4.5} fill="#0F1623" stroke="#7FB3CC" strokeWidth={1.5} />
              )}
              <text
                x={left ? -12 : 12}
                y={4}
                textAnchor={left ? 'end' : 'start'}
                className="font-mono"
                fontSize={13}
                fill="#E6ECF2"
                fillOpacity={country.status === 'live' ? 0.95 : 0.7}
              >
                {NAMES[country.id][language]}
              </text>
            </g>
          )
        })}
      </svg>

      <figcaption className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-ink/70">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
          {t.proof.legendLive}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-accent" aria-hidden />
          {t.proof.legendLoi}
        </span>
      </figcaption>
    </figure>
  )
}
