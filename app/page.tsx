import HomePage from '@/components/home/HomePage'
import { buildDeploymentsMap } from '@/lib/geo/deploymentsMap'
import { buildScreeningMap } from '@/lib/geo/screeningMap'

// Server wrapper: both maps are projected once at build time, so the browser
// receives plain SVG paths instead of d3-geo and the raw geometry.
export default function Page() {
  return <HomePage map={buildDeploymentsMap()} screening={buildScreeningMap()} />
}
