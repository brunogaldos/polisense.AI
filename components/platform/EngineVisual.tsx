'use client'

import type { Toolkit } from '@/lib/toolkits'

// The picture at the top of an engine card: a schematic drawing of what the
// engine does. Drawn rather than taken from the product maps so the platform
// page does not repeat the product pages. Abstract on purpose, with no text or
// numbers, so they never pass for a product screen.

const INK = '#E6ECF2'
const ACCENT = '#7FB3CC'
const LINE = '#26344A'
const PANEL = '#1C293C'
const RAMP = ['#2A4F66', '#3B7190', '#5C95B3', '#8FBDD3']
const GREEN = ['#1F4A47', '#2C6B63', '#3F9184', '#62B7A6']
const DECLINE = '#E0A458'

// Small seeded PRNG so every build draws the same cells.
const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}

// A ranked candidate: white pin with an accent halo.
const pin = (x: number, y: number, key: string) => (
  <g key={key}>
    <circle cx={x} cy={y} r={11} fill={ACCENT} fillOpacity={0.25} />
    <circle cx={x} cy={y} r={6} fill={INK} />
  </g>
)

// Terrain contours closing around natural basins that can hold water.
function HydroDrawing() {
  const ring = (cx: number, cy: number, rx: number, ry: number, k: number) =>
    `M${cx - rx} ${cy} C${cx - rx} ${cy - ry * k} ${cx + rx * 0.4} ${cy - ry} ${cx + rx} ${cy - ry * 0.2} S${cx + rx * 0.3} ${cy + ry} ${cx - rx} ${cy}Z`
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path key={`a${i}`} d={ring(250, 140, 60 + i * 34, 34 + i * 17, 1.1)} fill="none" stroke={INK} strokeOpacity={0.1 + (6 - i) * 0.02} strokeWidth={1.5} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <path key={`b${i}`} d={ring(470, 92, 30 + i * 22, 18 + i * 12, 0.9)} fill="none" stroke={INK} strokeOpacity={0.12} strokeWidth={1.5} />
      ))}
      <path d={ring(250, 140, 60, 34, 1.1)} fill={ACCENT} fillOpacity={0.45} />
      <path d={ring(470, 92, 30, 18, 0.9)} fill={ACCENT} fillOpacity={0.35} />
      <path d={ring(120, 210, 34, 16, 1)} fill={ACCENT} fillOpacity={0.25} stroke={INK} strokeOpacity={0.15} />
      {/* Drainage lines into the basins */}
      <path d="M40 40 C90 70 150 90 196 130 M380 240 C360 200 320 175 300 156 M560 30 C530 50 510 70 494 86"
        fill="none" stroke="#4F8FB0" strokeWidth={2.5} strokeLinecap="round" />
      {pin(262, 126, 'p1')}
      {pin(474, 86, 'p2')}
      {pin(124, 206, 'p3')}
    </>
  )
}

// A territory scored cell by cell, off-limits land removed, the best ranked.
function SitingDrawing() {
  const rand = seeded(7)
  const cols = 14
  const rows = 6
  const size = 30
  const x0 = 95
  const y0 = 36
  const excluded = new Set([3, 4, 17, 18, 31, 45, 60, 61, 74, 75, 9, 10, 23])
  const top = new Set([40, 54, 68])
  return (
    <>
      <defs>
        <pattern id="siting-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke={INK} strokeOpacity="0.4" strokeWidth="2" />
        </pattern>
      </defs>
      {Array.from({ length: cols * rows }, (_, i) => {
        const x = x0 + (i % cols) * (size + 2)
        const y = y0 + Math.floor(i / cols) * (size + 2)
        const score = rand()
        if (excluded.has(i)) {
          return <rect key={i} x={x} y={y} width={size} height={size} rx={3} fill="url(#siting-hatch)" stroke={INK} strokeOpacity={0.15} />
        }
        return (
          <rect key={i} x={x} y={y} width={size} height={size} rx={3}
            fill={top.has(i) ? RAMP[3] : RAMP[Math.floor(score * 3)]} fillOpacity={top.has(i) ? 1 : 0.75}
            stroke={top.has(i) ? INK : 'none'} strokeWidth={2.5} />
        )
      })}
      {/* Sun over the territory */}
      <circle cx={556} cy={44} r={16} fill={DECLINE} fillOpacity={0.9} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4
        return <line key={i} x1={556 + Math.cos(a) * 22} y1={44 + Math.sin(a) * 22} x2={556 + Math.cos(a) * 30} y2={44 + Math.sin(a) * 30} stroke={DECLINE} strokeWidth={2.5} strokeLinecap="round" />
      })}
    </>
  )
}

// The same area in an early and a recent year, and the change between them.
function VegetationDrawing() {
  const panel = (x0: number, seed: number, shift: number, key: string) => {
    const rand = seeded(seed)
    return (
      <g key={key}>
        <rect x={x0} y={46} width={150} height={150} rx={10} fill={PANEL} stroke={LINE} strokeWidth={2} />
        {Array.from({ length: 64 }, (_, i) => {
          const level = Math.max(0, Math.min(3, Math.floor(rand() * 3 + shift * ((i % 8) / 7))))
          return <rect key={i} x={x0 + 9 + (i % 8) * 17} y={55 + Math.floor(i / 8) * 17} width={15} height={15} rx={2} fill={GREEN[level]} />
        })}
      </g>
    )
  }
  const change = seeded(3)
  const arrow = (x: number) => (
    <path d={`M${x} 121 h20 m-6 -6 l6 6 l-6 6`} fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  )
  return (
    <>
      {panel(40, 11, 0, 'early')}
      {arrow(198)}
      {panel(230, 11, 1.2, 'recent')}
      {arrow(388)}
      <rect x={420} y={46} width={150} height={150} rx={10} fill={PANEL} stroke={LINE} strokeWidth={2} />
      {Array.from({ length: 64 }, (_, i) => {
        const r = change()
        const marked = r > 0.62 || r < 0.12
        return (
          <rect key={i} x={429 + (i % 8) * 17} y={55 + Math.floor(i / 8) * 17} width={15} height={15} rx={2}
            fill={r > 0.62 ? GREEN[3] : r < 0.12 ? DECLINE : INK} fillOpacity={marked ? 0.95 : 0.06} />
        )
      })}
    </>
  )
}

// A satellite passing over, its swath read into an indicator surface.
function ObservationDrawing() {
  const heat = ['#3B2F5C', '#7A3B6E', '#C2526A', '#E98A4F', '#F5C866']
  const rand = seeded(5)
  return (
    <>
      <path d="M20 70 C180 0 430 0 590 70" fill="none" stroke={INK} strokeOpacity={0.15} strokeWidth={1.5} strokeDasharray="5 6" />
      {/* Swath */}
      <path d="M300 44 L170 196 L450 196 Z" fill={ACCENT} fillOpacity={0.07} />
      <line x1={300} y1={44} x2={170} y2={196} stroke={ACCENT} strokeOpacity={0.45} strokeDasharray="4 4" />
      <line x1={300} y1={44} x2={450} y2={196} stroke={ACCENT} strokeOpacity={0.45} strokeDasharray="4 4" />
      {/* Satellite */}
      <g transform="translate(300 36) rotate(-12)">
        <rect x={-46} y={-8} width={30} height={16} rx={2} fill={RAMP[1]} stroke={ACCENT} strokeWidth={1.5} />
        <rect x={16} y={-8} width={30} height={16} rx={2} fill={RAMP[1]} stroke={ACCENT} strokeWidth={1.5} />
        <line x1={-16} y1={0} x2={16} y2={0} stroke={ACCENT} strokeWidth={2} />
        <rect x={-10} y={-11} width={20} height={22} rx={3} fill={INK} />
      </g>
      {/* Indicator surface, seen at an angle */}
      <g transform="translate(150 186) skewX(-35) scale(1 0.42)">
        {Array.from({ length: 12 * 6 }, (_, i) => {
          const col = i % 12
          const row = Math.floor(i / 12)
          const d = Math.hypot(col - 5.5, (row - 2.5) * 1.6) / 6.5
          const level = Math.max(0, Math.min(4, Math.round((1 - d) * 4 + (rand() - 0.5))))
          return <rect key={i} x={col * 27} y={row * 27} width={25} height={25} rx={2} fill={heat[level]} fillOpacity={0.9} />
        })}
      </g>
    </>
  )
}

const textLines = (x: number, y: number, widths: number[], gap = 13) =>
  widths.map((w, i) => <rect key={i} x={x} y={y + i * gap} width={w} height={5} rx={2.5} fill={INK} fillOpacity={0.18} />)

// Uploaded layers of different kinds, each recognised and profiled.
function LayerDrawing() {
  const sheet = (y: number, children: React.ReactNode, key: string) => (
    <g key={key} transform={`translate(70 ${y}) skewX(-40) scale(1 0.5)`}>
      <rect width={230} height={150} rx={10} fill={PANEL} stroke={ACCENT} strokeOpacity={0.35} strokeWidth={2} />
      {children}
    </g>
  )
  return (
    <>
      {sheet(132, (
        // Raster: a grid of graded cells
        Array.from({ length: 6 * 4 }, (_, i) => (
          <rect key={i} x={14 + (i % 6) * 34} y={14 + Math.floor(i / 6) * 32} width={30} height={28} rx={3}
            fill={RAMP[(i * 7 + Math.floor(i / 6)) % RAMP.length]} fillOpacity={0.85} />
        ))
      ), 'raster')}
      {sheet(84, (
        // Polygons: parcels
        <>
          <path d="M20 20 L110 16 L120 70 L30 80 Z" fill={ACCENT} fillOpacity={0.18} stroke={ACCENT} strokeWidth={2} />
          <path d="M120 70 L210 60 L214 132 L128 136 Z" fill={ACCENT} fillOpacity={0.3} stroke={ACCENT} strokeWidth={2} />
          <path d="M30 80 L120 70 L128 136 L36 132 Z" fill="none" stroke={ACCENT} strokeOpacity={0.6} strokeWidth={2} />
        </>
      ), 'polygons')}
      {sheet(36, (
        // Lines: a road network
        <path d="M10 120 C60 100 80 60 130 58 S200 30 222 18 M40 140 L90 70 L150 40 M120 145 C130 110 170 95 222 92"
          fill="none" stroke={INK} strokeOpacity={0.75} strokeWidth={3} strokeLinecap="round" />
      ), 'lines')}
      {/* Leader lines to the profile card */}
      {[78, 126, 174].map((y) => (
        <line key={y} x1={330} y1={y} x2={402} y2={y} stroke={ACCENT} strokeOpacity={0.5} strokeWidth={1.5} strokeDasharray="4 4" />
      ))}
      <rect x={402} y={44} width={150} height={150} rx={12} fill={PANEL} stroke={LINE} strokeWidth={2} />
      {[66, 114, 162].map((y, i) => (
        <g key={y}>
          <circle cx={424} cy={y + 8} r={8} fill={ACCENT} fillOpacity={0.2} stroke={ACCENT} strokeWidth={1.5} />
          <path d={`M420 ${y + 8} l3 3 l6 -6`} fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" />
          <rect x={442} y={y + 2} width={[78, 62, 88][i]} height={5} rx={2.5} fill={INK} fillOpacity={0.45} />
          <rect x={442} y={y + 13} width={[54, 70, 44][i]} height={5} rx={2.5} fill={INK} fillOpacity={0.18} />
        </g>
      ))}
    </>
  )
}

// A regulation with a cited passage, and a boundary table drawn on the map.
function DocumentDrawing() {
  return (
    <>
      <rect x={58} y={24} width={190} height={210} rx={10} fill={PANEL} stroke={LINE} strokeWidth={2} />
      <rect x={78} y={44} width={110} height={8} rx={4} fill={INK} fillOpacity={0.5} />
      {textLines(78, 68, [150, 138, 146, 120])}
      <rect x={72} y={120} width={162} height={34} rx={6} fill={ACCENT} fillOpacity={0.16} stroke={ACCENT} strokeOpacity={0.6} />
      {textLines(80, 128, [140, 112])}
      <circle cx={234} cy={120} r={9} fill={ACCENT} />
      {textLines(78, 168, [146, 130, 150, 96])}
      {/* Boundary table rows */}
      <path d="M248 137 C300 137 300 120 340 120" fill="none" stroke={ACCENT} strokeOpacity={0.6} strokeWidth={1.5} strokeDasharray="4 4" />
      <rect x={340} y={36} width={210} height={180} rx={10} fill={PANEL} stroke={LINE} strokeWidth={2} />
      {Array.from({ length: 7 }, (_, i) => (
        <line key={`v${i}`} x1={340 + 30 * i} y1={36} x2={340 + 30 * i} y2={216} stroke={LINE} strokeWidth={1} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={`h${i}`} x1={340} y1={36 + 30 * i} x2={550} y2={36 + 30 * i} stroke={LINE} strokeWidth={1} />
      ))}
      <path d="M380 70 L470 58 L520 120 L488 186 L398 176 L370 120 Z" fill={ACCENT} fillOpacity={0.2} stroke={ACCENT} strokeWidth={2.5} strokeLinejoin="round" />
      {[[380, 70], [470, 58], [520, 120], [488, 186], [398, 176], [370, 120]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={4.5} fill={INK} />
      ))}
    </>
  )
}

// A finished report: a map, a chart and a reference list.
function ReportDrawing() {
  return (
    <>
      <rect x={232} y={30} width={200} height={220} rx={10} fill={PANEL} fillOpacity={0.6} stroke={LINE} strokeWidth={2} transform="rotate(6 332 140)" />
      <rect x={170} y={20} width={210} height={230} rx={10} fill={PANEL} stroke={LINE} strokeWidth={2} />
      <rect x={190} y={40} width={120} height={9} rx={4.5} fill={INK} fillOpacity={0.55} />
      <rect x={190} y={56} width={80} height={5} rx={2.5} fill={INK} fillOpacity={0.2} />
      <rect x={190} y={74} width={170} height={70} rx={6} fill="#151F2F" stroke={LINE} />
      {Array.from({ length: 5 * 3 }, (_, i) => (
        <rect key={i} x={198 + (i % 5) * 32} y={81 + Math.floor(i / 5) * 19} width={28} height={15} rx={2}
          fill={RAMP[(i * 5 + 1) % RAMP.length]} fillOpacity={i === 7 ? 1 : 0.65} stroke={i === 7 ? INK : 'none'} strokeWidth={1.5} />
      ))}
      {[34, 52, 26, 44, 60].map((h, i) => (
        <rect key={i} x={194 + i * 16} y={204 - h} width={10} height={h} rx={2} fill={ACCENT} fillOpacity={0.35 + i * 0.12} />
      ))}
      {textLines(286, 158, [74, 60, 70, 52], 12)}
      <rect x={190} y={212} width={170} height={1.5} fill={LINE} />
      {[220, 230].map((y, i) => (
        <g key={y}>
          <circle cx={194} cy={y + 2.5} r={2.5} fill={ACCENT} />
          <rect x={202} y={y} width={[120, 96][i]} height={5} rx={2.5} fill={INK} fillOpacity={0.18} />
        </g>
      ))}
    </>
  )
}

const DRAWINGS: Record<string, () => React.ReactElement> = {
  'hydro-screening': HydroDrawing,
  'renewable-siting': SitingDrawing,
  'vegetation-change': VegetationDrawing,
  'earth-observation': ObservationDrawing,
  'layer-intelligence': LayerDrawing,
  'document-intelligence': DocumentDrawing,
  'report-builder': ReportDrawing,
}

export default function EngineVisual({ toolkit, className = '' }: { toolkit: Toolkit; className?: string }) {
  const Drawing = DRAWINGS[toolkit.id]
  if (!Drawing) return <div className={`bg-contour ${className}`} aria-hidden />
  return (
    <div className={`bg-contour ${className}`} aria-hidden>
      <svg viewBox="0 0 610 260" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
        <Drawing />
      </svg>
    </div>
  )
}
