import { geoMercator } from 'd3-geo'
import type { Feature, Polygon } from 'geojson'
import osm from '@/data/geo/arequipa-osm.json'

// Builds the basemap and grid for the homepage's Ask / Analyze / Act map, at
// build time only (called from a Server Component). The streets and the river
// are real OpenStreetMap data for central Arequipa; the study boundary, the
// historic-centre radius and the scores are illustrative, and the page says so.

export interface ScreeningCell {
  x: number
  y: number
  size: number
  excluded: boolean
  score: number
  rank: number | null
}

export interface ScreeningMapData {
  width: number
  height: number
  minorRoads: string
  majorRoads: string
  river: string
  boundary: string
  centre: { x: number; y: number; r: number }
  riverLabel: { x: number; y: number }
  scaleBar: { px: number; km: number }
  cells: ScreeningCell[]
  counts: { total: number; excluded: number; top: number }
}

type Kind = 'major' | 'minor' | 'river' | 'airport'
interface OsmFeature {
  kind: Kind
  coords: [number, number][]
}

const WIDTH = 800
const HEIGHT = 560
const COLS = 20
const TOP = 5
const PLAZA_DE_ARMAS: [number, number] = [-71.5369, -16.3988]

// Small seeded PRNG so every build draws the same grid.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

let cached: ScreeningMapData | null = null

// Computed once per process; `next dev` re-renders the homepage on every visit.
export function buildScreeningMap(): ScreeningMapData {
  cached ??= computeScreeningMap()
  return cached
}

function computeScreeningMap(): ScreeningMapData {
  const [south, west, north, east] = osm.bbox
  const frame: Feature<Polygon> = {
    type: 'Feature',
    properties: {},
    geometry: { type: 'Polygon', coordinates: [[[west, south], [west, north], [east, north], [east, south], [west, south]]] },
  }
  const projection = geoMercator().fitSize([WIDTH, HEIGHT], frame)
  const project = (c: [number, number]) => projection(c) ?? [0, 0]

  // Project a line and round to whole pixels, dropping repeated points: at this
  // scale that loses nothing visible and keeps the SVG small.
  const toPath = (coords: [number, number][], grid = 1) => {
    let d = ''
    let last = ''
    for (const c of coords) {
      const [x, y] = project(c)
      const key = `${Math.round(x / grid) * grid} ${Math.round(y / grid) * grid}`
      if (key === last) continue
      d += `${d ? 'L' : 'M'}${key}`
      last = key
    }
    return d.includes('L') ? d : ''
  }
  const segments = (d: string) => d.split('L').length

  const features = osm.features as OsmFeature[]
  const pathsOf = (kind: Kind, grid = 1, minSegments = 1) =>
    features
      .filter((f) => f.kind === kind)
      .map((f) => toPath(f.coords, grid))
      .filter((d) => d && segments(d) > minSegments)
      .join('')
  const riverPoints = features.filter((f) => f.kind === 'river').flatMap((f) => f.coords.map(project))
  const majorPoints = features.filter((f) => f.kind === 'major').flatMap((f) => f.coords.map(project))

  const nearest = (x: number, y: number, points: [number, number][]) => {
    let best = Infinity
    for (const [px, py] of points) best = Math.min(best, (px - x) ** 2 + (py - y) ** 2)
    return Math.sqrt(best)
  }

  // Scale: pixels per kilometre at the map's centre latitude.
  const midLat = (south + north) / 2
  const midLon = (west + east) / 2
  const oneKmLon = 1 / (111.32 * Math.cos((midLat * Math.PI) / 180))
  const pxPerKm = project([midLon + oneKmLon, midLat])[0] - project([midLon, midLat])[0]

  // Illustrative study boundary: a wobbly ellipse over the city.
  const cx = WIDTH / 2
  const cy = HEIGHT / 2
  const rx = WIDTH * 0.46
  const ry = HEIGHT * 0.44
  const inside = (x: number, y: number) => {
    const angle = Math.atan2(y - cy, x - cx)
    const wobble = 1 + 0.07 * Math.sin(angle * 3) + 0.04 * Math.cos(angle * 5)
    return ((x - cx) / (rx * wobble)) ** 2 + ((y - cy) / (ry * wobble)) ** 2 < 1
  }
  let boundary = ''
  for (let i = 0; i <= 72; i++) {
    const angle = (i / 72) * Math.PI * 2
    const wobble = 1 + 0.07 * Math.sin(angle * 3) + 0.04 * Math.cos(angle * 5)
    boundary += `${i ? 'L' : 'M'}${Math.round(cx + Math.cos(angle) * rx * wobble)} ${Math.round(cy + Math.sin(angle) * ry * wobble)}`
  }
  boundary += 'Z'

  const [plazaX, plazaY] = project(PLAZA_DE_ARMAS)
  const centre = { x: Math.round(plazaX), y: Math.round(plazaY), r: Math.round(0.9 * pxPerKm) }
  const riverBuffer = 0.52 * pxPerKm // just over half a cell diagonal: any cell the river crosses drops out

  const size = WIDTH / COLS
  const rows = Math.floor(HEIGHT / size)
  const offsetY = (HEIGHT - rows * size) / 2
  const random = mulberry32(20260929)
  const cells: ScreeningCell[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = col * size
      const y = offsetY + row * size
      const mx = x + size / 2
      const my = y + size / 2
      if (!inside(mx, my)) continue
      const excluded =
        nearest(mx, my, riverPoints) < riverBuffer || Math.hypot(mx - centre.x, my - centre.y) < centre.r
      // Illustrative score: closer to main roads scores higher, plus terrain-like
      // variation and a little noise.
      const access = Math.max(0, 1 - nearest(mx, my, majorPoints) / (1.2 * pxPerKm))
      const terrain = 0.5 + 0.5 * Math.sin(col * 0.45 + 1.3) * Math.cos(row * 0.38 - 0.4)
      const score = Math.min(0.999, 0.45 * access + 0.35 * terrain + 0.2 * random())
      cells.push({ x: Math.round(x), y: Math.round(y), size: Math.round(size), excluded, score, rank: null })
    }
  }
  cells
    .filter((c) => !c.excluded)
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP)
    .forEach((c, i) => (c.rank = i + 1))

  // Put the river label on the river, near the top-left third of the map.
  const labelPoint = riverPoints.reduce((best, p) =>
    Math.abs(p[1] - HEIGHT * 0.3) < Math.abs(best[1] - HEIGHT * 0.3) ? p : best
  )

  return {
    width: WIDTH,
    height: HEIGHT,
    // Minor roads are faint background texture: snap them to a 3px grid and
    // drop tiny stubs, which keeps the inline SVG small without visible change.
    minorRoads: pathsOf('minor', 3, 2),
    majorRoads: pathsOf('major'),
    river: pathsOf('river'),
    boundary,
    centre,
    riverLabel: { x: Math.round(labelPoint[0]), y: Math.round(labelPoint[1]) },
    scaleBar: { px: Math.round(2 * pxPerKm), km: 2 },
    cells,
    counts: { total: cells.length, excluded: cells.filter((c) => c.excluded).length, top: TOP },
  }
}
