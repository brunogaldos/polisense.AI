import HomePage from '@/components/home/HomePage'
import { buildScreeningMap } from '@/lib/geo/screeningMap'

// Server wrapper: the Arequipa map is projected once at build time, so the
// browser receives plain SVG paths instead of d3-geo and the raw geometry.
export default function Page() {
  return <HomePage screening={buildScreeningMap()} />
}
