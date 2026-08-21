// Editorial illustrations for the blog, built as inline SVG rather than stock
// photography: zero extra network weight, crisp at any size, and drawn from
// the site's own "Warm Cartography" palette (defined in app/globals.css)
// instead of introducing new brand colors.

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

/**
 * Schematic (non-satellite) map of the two evaluated sites: a cadastral-style
 * grid with the Majes and Santa Rita de Siguas parcels, in place of a real
 * satellite image we don't have permission to embed.
 */
export function MajesMapIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 420" className={className} role="img">
      <title>Mapa esquemático de los predios evaluados: Majes, en la irrigación Majes-Pedregal, y Santa Rita de Siguas, Arequipa</title>
      <defs>
        <pattern id="map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0 L0 0 0 32" fill="none" stroke={PALETTE.fog} strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="640" height="420" fill={PALETTE.paper} />
      <rect width="640" height="420" fill="url(#map-grid)" />

      {/* Predio Majes */}
      <polygon
        points="90,150 240,120 270,230 160,270 80,220"
        fill={PALETTE.meridian}
        opacity="0.16"
        stroke={PALETTE.meridian}
        strokeWidth="2.5"
      />
      <text x="115" y="205" fontSize="16" fontWeight="700" fill={PALETTE.obsidian}>
        Predio Majes
      </text>
      <text x="115" y="224" fontSize="12" fill={PALETTE.obsidian} opacity="0.6">
        Irrigación Majes-Pedregal
      </text>

      {/* Predio Santa Rita de Siguas */}
      <polygon
        points="360,220 480,190 540,270 470,330 370,310"
        fill={PALETTE.terra}
        opacity="0.16"
        stroke={PALETTE.terra}
        strokeWidth="2.5"
      />
      <text x="385" y="270" fontSize="16" fontWeight="700" fill={PALETTE.obsidian}>
        Santa Rita
      </text>
      <text x="385" y="289" fontSize="12" fill={PALETTE.obsidian} opacity="0.6">
        de Siguas
      </text>

      {/* Proximity connector */}
      <line x1="260" y1="205" x2="390" y2="255" stroke={PALETTE.sandstone} strokeWidth="2" strokeDasharray="6 6" />
      <text x="285" y="222" fontSize="11" fill={PALETTE.obsidian} opacity="0.55" fontStyle="italic">
        predios evaluados
      </text>

      {/* Compass rose */}
      <g transform="translate(568,58)" stroke={PALETTE.obsidian} opacity="0.5">
        <circle r="22" fill="none" strokeWidth="1.2" />
        <path d="M0,-18 L0,18 M-18,0 L18,0" strokeWidth="1.2" />
        <path d="M0,-18 L5,-8 L-5,-8 Z" fill={PALETTE.obsidian} stroke="none" />
        <text x="-4" y="-26" fontSize="11" fontWeight="700" stroke="none" fill={PALETTE.obsidian}>
          N
        </text>
      </g>

      {/* Scale reference (no fabricated distance value) */}
      <g transform="translate(40,380)" stroke={PALETTE.obsidian} opacity="0.45">
        <line x1="0" y1="0" x2="70" y2="0" strokeWidth="1.5" />
        <line x1="0" y1="-4" x2="0" y2="4" strokeWidth="1.5" />
        <line x1="70" y1="-4" x2="70" y2="4" strokeWidth="1.5" />
        <text x="0" y="18" fontSize="10" stroke="none" fill={PALETTE.obsidian}>
          escala referencial
        </text>
      </g>
    </svg>
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
