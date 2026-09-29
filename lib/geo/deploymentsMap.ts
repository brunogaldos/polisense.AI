import { geoBounds, geoCentroid, geoContains, geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from 'geojson'
import type { GeometryCollection, Topology } from 'topojson-specification'
import landTopology from 'world-atlas/land-110m.json'
import countriesTopology from 'world-atlas/countries-110m.json'

// Runs at build time only (imported from a Server Component), so d3-geo and the
// world geometry never reach the browser: the page ships plain SVG path strings.

export type DeploymentStatus = 'live' | 'loi'

export interface DeploymentCountry {
  /** ISO 3166-1 numeric code, as used by world-atlas. */
  id: string
  status: DeploymentStatus
  /** Marker position in the SVG's coordinate space. */
  x: number
  y: number
  outline: string
}

export interface DeploymentsMapData {
  width: number
  height: number
  /** Every land dot, drawn as one path of zero-length segments with round caps. */
  landDots: string
  countries: DeploymentCountry[]
}

// Where Polisense runs today (Polisense_traction.md): live pilots and letters of intent.
const DEPLOYMENTS: { id: string; status: DeploymentStatus }[] = [
  { id: '604', status: 'live' }, // Peru
  { id: '400', status: 'live' }, // Jordan
  { id: '498', status: 'live' }, // Moldova
  { id: '032', status: 'loi' }, // Argentina
  { id: '050', status: 'loi' }, // Bangladesh
  { id: '508', status: 'loi' }, // Mozambique
]

const WIDTH = 1000
const HEIGHT = 480
const STEP = 2.2 // degrees between dots

let cached: DeploymentsMapData | null = null

// The result never changes between renders, so compute it once per process:
// `next dev` re-renders the homepage on every visit and would otherwise redo it.
export function buildDeploymentsMap(): DeploymentsMapData {
  cached ??= computeDeploymentsMap()
  return cached
}

function computeDeploymentsMap(): DeploymentsMapData {
  const land = feature(
    landTopology as unknown as Topology,
    (landTopology as unknown as Topology).objects.land as GeometryCollection
  ) as FeatureCollection<Polygon | MultiPolygon>

  const countries = feature(
    countriesTopology as unknown as Topology,
    (countriesTopology as unknown as Topology).objects.countries as GeometryCollection
  ) as FeatureCollection<Polygon | MultiPolygon>

  // Antarctica adds nothing here and eats vertical space, so fit latitudes -56..80.
  const extent: Feature<Polygon> = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [[[-170, -56], [-170, 80], [180, 80], [180, -56], [-170, -56]]],
    },
  }
  const projection = geoNaturalEarth1().fitSize([WIDTH, HEIGHT], extent)
  const path = geoPath(projection)

  // Split land into single polygons with their bounding boxes, so each dot is
  // tested only against the one or two polygons that could contain it. This is
  // what makes the dot grid fast (it was a few seconds against the whole world).
  const polygons = land.features.flatMap((f) =>
    f.geometry.type === 'MultiPolygon'
      ? f.geometry.coordinates.map((coordinates) => ({ type: 'Polygon' as const, coordinates }))
      : [f.geometry]
  ).map((geometry) => {
    const shape: Feature<Polygon> = { type: 'Feature', properties: {}, geometry }
    const [[west, south], [east, north]] = geoBounds(shape)
    // A box that crosses the antimeridian comes back with west > east.
    return { shape, south, north, west, east, wraps: west > east }
  })
  const onLand = (lon: number, lat: number) =>
    polygons.some(
      (p) =>
        lat >= p.south &&
        lat <= p.north &&
        (p.wraps ? lon >= p.west || lon <= p.east : lon >= p.west && lon <= p.east) &&
        geoContains(p.shape, [lon, lat])
    )

  let landDots = ''
  for (let lat = 78; lat >= -56; lat -= STEP) {
    for (let lon = -170; lon < 180; lon += STEP) {
      if (!onLand(lon, lat)) continue
      const point = projection([lon, lat])
      if (!point) continue
      landDots += `M${point[0].toFixed(1)} ${point[1].toFixed(1)}h0`
    }
  }

  const deployed = DEPLOYMENTS.map(({ id, status }) => {
    const shape = countries.features.find((f) => String(f.id) === id)
    if (!shape) throw new Error(`Country ${id} missing from world-atlas`)
    const [x, y] = projection(geoCentroid(shape)) ?? [0, 0]
    return { id, status, x: Number(x.toFixed(1)), y: Number(y.toFixed(1)), outline: path(shape) ?? '' }
  })

  return { width: WIDTH, height: HEIGHT, landDots, countries: deployed }
}
