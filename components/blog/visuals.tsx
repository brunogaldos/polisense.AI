// Editorial illustrations for the blog, built as inline SVG rather than stock
// photography: zero extra network weight, crisp at any size, and drawn from
// the site's own "Warm Cartography" palette (defined in app/globals.css)
// instead of introducing new brand colors.

import majesGeo from './majes.geojson'
import santaRitaGeo from './santa_rita.geojson'

const PALETTE = {
  meridian: '#5E8EA6',
  strato: '#A3C4D4',
  haze: '#D0DFE6',
  obsidian: '#141517',
  parchment: '#F5F2EC',
  sandstone: '#B5AFA5',
  dune: '#C9A96E',
  duneDeep: '#B08F55',
  terra: '#BF6A5A',
  paper: '#FDFCFA',
  basalt: '#1E2024',
  fog: '#E3DED6',
}

/**
 * Wide editorial hero: desert dunes at dusk with a solar array and a
 * transmission tower on the horizon — the visual thread that ties the whole
 * article (desert siting, solar resource, grid infrastructure) together.
 */
export function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 500"
      className={className}
      role="img"
      preserveAspectRatio="xMidYMid slice"
    >
      <title>Atardecer sobre dunas desérticas con un parque solar y una torre de transmisión en el horizonte</title>
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PALETTE.haze} />
          <stop offset="65%" stopColor={PALETTE.parchment} />
          <stop offset="100%" stopColor={PALETTE.paper} />
        </linearGradient>
      </defs>

      <rect width="1200" height="500" fill="url(#hero-sky)" />

      {/* Sun with soft concentric glow */}
      <circle cx="960" cy="140" r="120" fill={PALETTE.meridian} opacity="0.06" />
      <circle cx="960" cy="140" r="80" fill={PALETTE.meridian} opacity="0.12" />
      <circle cx="960" cy="140" r="46" fill={PALETTE.meridian} opacity="0.85" />

      {/* Far dune ridge */}
      <path
        d="M0,300 Q150,260 320,290 T650,270 T1000,300 T1200,280 L1200,500 L0,500 Z"
        fill={PALETTE.sandstone}
        opacity="0.45"
      />
      {/* Mid dune ridge */}
      <path
        d="M0,360 Q200,320 420,350 T780,330 T1200,360 L1200,500 L0,500 Z"
        fill={PALETTE.dune}
        opacity="0.55"
      />
      {/* Near dune ridge */}
      <path
        d="M0,420 Q220,385 460,410 T860,395 T1200,420 L1200,500 L0,500 Z"
        fill={PALETTE.duneDeep}
        opacity="0.6"
      />

      {/* Transmission tower silhouette, right side */}
      <g stroke={PALETTE.basalt} strokeWidth="2.5" fill="none" opacity="0.55">
        <path d="M1090,430 L1105,320 L1120,430" />
        <path d="M1082,430 L1128,430" />
        <path d="M1088,380 L1122,380" />
        <path d="M1092,345 L1118,345" />
        <path d="M1075,318 L1105,320 L1135,318" />
        <path d="M1075,318 C1000,335 940,300 900,330" strokeWidth="1.5" opacity="0.6" />
        <path d="M1135,318 C1170,332 1195,310 1200,325" strokeWidth="1.5" opacity="0.6" />
      </g>

      {/* Solar array, left foreground */}
      <g opacity="0.92">
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={70 + col * 62 - row * 18}
              y={430 - row * 26}
              width="46"
              height="20"
              rx="2"
              fill={PALETTE.meridian}
              opacity={0.35 + row * 0.18}
              stroke={PALETTE.paper}
              strokeWidth="1"
            />
          ))
        )}
      </g>
    </svg>
  )
}

type LonLat = [number, number]

function ringsFromFeatureCollection(fc: {
  features: { geometry: { coordinates: number[][][] } }[]
}): LonLat[][] {
  return fc.features.map((f) => f.geometry.coordinates[0] as LonLat[])
}

function ringCentroid(ring: LonLat[]): LonLat {
  const sum = ring.reduce<LonLat>((acc, [lon, lat]) => [acc[0] + lon, acc[1] + lat], [0, 0])
  return [sum[0] / ring.length, sum[1] / ring.length]
}

const majesRings = ringsFromFeatureCollection(majesGeo)
const santaRitaRings = ringsFromFeatureCollection(santaRitaGeo)

// Bounding box of both parcels, in real WGS84 coordinates, padded for
// breathing room around the boundaries.
const allPoints = [...majesRings, ...santaRitaRings].flat()
const rawWest = Math.min(...allPoints.map((p) => p[0]))
const rawEast = Math.max(...allPoints.map((p) => p[0]))
const rawSouth = Math.min(...allPoints.map((p) => p[1]))
const rawNorth = Math.max(...allPoints.map((p) => p[1]))

const PAD_RATIO = 0.16
const lonPad = (rawEast - rawWest) * PAD_RATIO
const latPad = (rawNorth - rawSouth) * PAD_RATIO
const mapWest = rawWest - lonPad
const mapEast = rawEast + lonPad
const mapSouth = rawSouth - latPad
const mapNorth = rawNorth + latPad

const avgLatDeg = (mapSouth + mapNorth) / 2
const avgLatRad = (avgLatDeg * Math.PI) / 180
// Longitude degrees are shorter than latitude degrees away from the equator;
// correct for that so the requested image isn't stretched.
const effectiveAspect = ((mapEast - mapWest) * Math.cos(avgLatRad)) / (mapNorth - mapSouth)

const MAX_DIM = 1280
const MIN_DIM = 480
const mapW = Math.round(
  Math.min(Math.max(effectiveAspect >= 1 ? MAX_DIM : MAX_DIM * effectiveAspect, MIN_DIM), MAX_DIM)
)
const mapH = Math.round(
  Math.min(Math.max(effectiveAspect >= 1 ? MAX_DIM / effectiveAspect : MAX_DIM, MIN_DIM), MAX_DIM)
)

function project([lon, lat]: LonLat): [number, number] {
  const x = ((lon - mapWest) / (mapEast - mapWest)) * mapW
  const y = ((mapNorth - lat) / (mapNorth - mapSouth)) * mapH
  return [x, y]
}

function ringToPoints(ring: LonLat[]): string {
  return ring.map((p) => project(p).map((v) => v.toFixed(1)).join(',')).join(' ')
}

// Real, computed scale bar (metres per pixel at the crop's average latitude)
// rather than a placeholder distance.
const metersPerDegreeLon = 111320 * Math.cos(avgLatRad)
const metersPerPx = ((mapEast - mapWest) * metersPerDegreeLon) / mapW
const SCALE_STEPS_M = [250, 500, 1000, 2000, 5000, 10000, 20000]
const targetBarPx = mapW * 0.16
const scaleMeters = SCALE_STEPS_M.reduce(
  (best, m) => (m / metersPerPx <= targetBarPx * 1.5 ? m : best),
  SCALE_STEPS_M[0]
)
const scaleBarPx = scaleMeters / metersPerPx
const scaleLabel = scaleMeters >= 1000 ? `${scaleMeters / 1000} km` : `${scaleMeters} m`

// Esri World Imagery, requested in plain lat/lon (imageSR=4326) so pixels map
// linearly to coordinates — no tiling library needed to align the overlay.
const SATELLITE_IMAGE_URL =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export' +
  `?bbox=${mapWest},${mapSouth},${mapEast},${mapNorth}&bboxSR=4326&imageSR=4326` +
  `&size=${mapW},${mapH}&format=jpg&transparent=false&f=image`

/**
 * Real satellite view (Esri World Imagery) of the two evaluated sites, with
 * the actual surveyed boundaries of Predio Majes and Santa Rita de Siguas
 * overlaid from their source GeoJSON.
 */
export function SatelliteMapIllustration({ className = '' }: { className?: string }) {
  const majesLabelPos = project(ringCentroid(majesRings[0]))
  const santaRitaLabelPos = project(ringCentroid(santaRitaRings[1] ?? santaRitaRings[0]))

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={SATELLITE_IMAGE_URL}
        alt="Vista satelital de los predios Majes, en la irrigación Majes-Pedregal, y Santa Rita de Siguas, Arequipa, con los límites evaluados delimitados"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <svg
        viewBox={`0 0 ${mapW} ${mapH}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-hidden="true"
      >
        <title>Límites evaluados de los predios Majes y Santa Rita de Siguas sobre imagen satelital</title>

        {majesRings.map((ring, i) => (
          <polygon
            key={`majes-${i}`}
            points={ringToPoints(ring)}
            fill={PALETTE.meridian}
            fillOpacity="0.22"
            stroke={PALETTE.meridian}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        ))}

        {santaRitaRings.map((ring, i) => (
          <polygon
            key={`sr-${i}`}
            points={ringToPoints(ring)}
            fill={PALETTE.terra}
            fillOpacity="0.22"
            stroke={PALETTE.terra}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        ))}

        <g>
          <rect x={majesLabelPos[0] - 62} y={majesLabelPos[1] - 15} width="124" height="24" rx="6" fill={PALETTE.obsidian} opacity="0.6" />
          <text x={majesLabelPos[0]} y={majesLabelPos[1] + 2} textAnchor="middle" fontSize="13" fontWeight="700" fill={PALETTE.paper}>
            Predio Majes
          </text>
        </g>
        <g>
          <rect x={santaRitaLabelPos[0] - 86} y={santaRitaLabelPos[1] - 15} width="172" height="24" rx="6" fill={PALETTE.obsidian} opacity="0.6" />
          <text x={santaRitaLabelPos[0]} y={santaRitaLabelPos[1] + 2} textAnchor="middle" fontSize="13" fontWeight="700" fill={PALETTE.paper}>
            Santa Rita de Siguas
          </text>
        </g>

        {/* Compass rose */}
        <g transform={`translate(${mapW - 46},46)`} stroke={PALETTE.paper} opacity="0.9">
          <circle r="20" fill={PALETTE.obsidian} fillOpacity="0.4" strokeWidth="1.2" />
          <path d="M0,-16 L0,16 M-16,0 L16,0" strokeWidth="1.2" />
          <path d="M0,-16 L5,-7 L-5,-7 Z" fill={PALETTE.paper} stroke="none" />
          <text x="-4" y="-24" fontSize="11" fontWeight="700" stroke="none" fill={PALETTE.paper}>
            N
          </text>
        </g>

        {/* Scale bar, computed from the crop's real geographic extent */}
        <g transform={`translate(28,${mapH - 22})`} stroke={PALETTE.paper} opacity="0.9">
          <line x1="0" y1="0" x2={scaleBarPx} y2="0" strokeWidth="2" />
          <line x1="0" y1="-5" x2="0" y2="5" strokeWidth="2" />
          <line x1={scaleBarPx} y1="-5" x2={scaleBarPx} y2="5" strokeWidth="2" />
          <text x="0" y="-9" fontSize="11" fontWeight="600" stroke="none" fill={PALETTE.paper}>
            {scaleLabel}
          </text>
        </g>
      </svg>
    </div>
  )
}

/**
 * Horizontal strip diagram of the infrastructure and regulatory elements the
 * desk analysis located: substation, transmission corridor, solar resource,
 * logistics route, and the permitting sequence.
 */
export function InfrastructureIllustration({ className = '' }: { className?: string }) {
  const nodeY = 120
  return (
    <svg viewBox="0 0 1000 240" className={className} role="img">
      <title>Elementos identificados por Polisense: subestación de Majes, corredor de transmisión previsto, recurso solar, ruta logística a Matarani y secuencia normativa</title>

      <line x1="60" y1={nodeY} x2="940" y2={nodeY} stroke={PALETTE.fog} strokeWidth="2" />

      {/* 1. Substation */}
      <g transform="translate(100,0)">
        <circle cx="0" cy={nodeY} r="7" fill={PALETTE.meridian} />
        <rect x="-22" y={nodeY - 60} width="44" height="34" rx="3" fill="none" stroke={PALETTE.meridian} strokeWidth="2" />
        <circle cx="-9" cy={nodeY - 43} r="7" fill="none" stroke={PALETTE.meridian} strokeWidth="2" />
        <circle cx="9" cy={nodeY - 43} r="7" fill="none" stroke={PALETTE.meridian} strokeWidth="2" />
        <text x="0" y={nodeY + 30} textAnchor="middle" fontSize="12" fontWeight="700" fill={PALETTE.obsidian}>
          Subestación Majes
        </text>
        <text x="0" y={nodeY + 46} textAnchor="middle" fontSize="11" fill={PALETTE.obsidian} opacity="0.6">
          138 / 60 / 10 kV
        </text>
      </g>

      {/* 2. Transmission corridor */}
      <g transform="translate(300,0)" stroke={PALETTE.duneDeep} fill="none" strokeWidth="2">
        <circle cx="0" cy={nodeY} r="7" fill={PALETTE.duneDeep} stroke="none" />
        <path d={`M-16,${nodeY - 26} L-16,${nodeY - 60} L16,${nodeY - 60} L16,${nodeY - 26}`} />
        <path d={`M-24,${nodeY - 55} L24,${nodeY - 55}`} />
        <path d={`M-24,${nodeY - 45} L24,${nodeY - 45}`} />
        <text x="0" y={nodeY + 30} textAnchor="middle" fontSize="12" fontWeight="700" fill={PALETTE.obsidian} stroke="none">
          Corredor previsto
        </text>
        <text x="0" y={nodeY + 46} textAnchor="middle" fontSize="11" fill={PALETTE.obsidian} opacity="0.6" stroke="none">
          500 / 220 kV
        </text>
      </g>

      {/* 3. Solar resource */}
      <g transform="translate(500,0)">
        <circle cx="0" cy={nodeY} r="7" fill={PALETTE.terra} />
        <circle cx="0" cy={nodeY - 45} r="16" fill="none" stroke={PALETTE.terra} strokeWidth="2.5" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4
          const x1 = Math.cos(angle) * 22
          const y1 = nodeY - 45 + Math.sin(angle) * 22
          const x2 = Math.cos(angle) * 30
          const y2 = nodeY - 45 + Math.sin(angle) * 30
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={PALETTE.terra} strokeWidth="2.5" />
        })}
        <text x="0" y={nodeY + 30} textAnchor="middle" fontSize="12" fontWeight="700" fill={PALETTE.obsidian}>
          Recurso solar
        </text>
        <text x="0" y={nodeY + 46} textAnchor="middle" fontSize="11" fill={PALETTE.obsidian} opacity="0.6">
          declarado en el expediente
        </text>
      </g>

      {/* 4. Logistics route to Matarani */}
      <g transform="translate(700,0)">
        <circle cx="0" cy={nodeY} r="7" fill={PALETTE.sandstone} />
        <path d={`M-20,${nodeY - 22} Q0,${nodeY - 60} 22,${nodeY - 22}`} fill="none" stroke={PALETTE.sandstone} strokeWidth="2.5" strokeDasharray="5 5" />
        <path d="M14,-8 L28,-2 L14,4 Z" fill={PALETTE.sandstone} transform={`translate(0,${nodeY - 22})`} />
        <text x="0" y={nodeY + 30} textAnchor="middle" fontSize="12" fontWeight="700" fill={PALETTE.obsidian}>
          Ruta a Matarani
        </text>
        <text x="0" y={nodeY + 46} textAnchor="middle" fontSize="11" fill={PALETTE.obsidian} opacity="0.6">
          ~129 km por carretera
        </text>
      </g>

      {/* 5. Regulatory sequence */}
      <g transform="translate(900,0)">
        <circle cx="0" cy={nodeY} r="7" fill={PALETTE.meridian} />
        <rect x="-16" y={nodeY - 62} width="32" height="38" rx="3" fill="none" stroke={PALETTE.meridian} strokeWidth="2" />
        <path d={`M-9,${nodeY - 50} L9,${nodeY - 50}`} stroke={PALETTE.meridian} strokeWidth="1.5" />
        <path d={`M-9,${nodeY - 43} L9,${nodeY - 43}`} stroke={PALETTE.meridian} strokeWidth="1.5" />
        <path d={`M-9,${nodeY - 36} L3,${nodeY - 36}`} stroke={PALETTE.meridian} strokeWidth="1.5" />
        <text x="0" y={nodeY + 30} textAnchor="middle" fontSize="12" fontWeight="700" fill={PALETTE.obsidian}>
          Secuencia normativa
        </text>
        <text x="0" y={nodeY + 46} textAnchor="middle" fontSize="11" fill={PALETTE.obsidian} opacity="0.6">
          SEIA · concesiones · ANA
        </text>
      </g>
    </svg>
  )
}
