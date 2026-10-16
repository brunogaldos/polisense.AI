// One-off download of the OpenStreetMap features drawn under the homepage's
// "Ask / Analyze / Act" screening map: main roads, the Chili river and the
// airport around central Arequipa, Peru. The result is committed to
// data/geo/arequipa-osm.json so builds never call OpenStreetMap.
//
// Data (c) OpenStreetMap contributors, ODbL. The site credits it on the map.
//
// Run:  node scripts/fetch-osm-arequipa.mjs

import { writeFile } from 'node:fs/promises'

// south, west, north, east
const BBOX = [-16.445, -71.585, -16.355, -71.485]

const query = `
[out:json][timeout:90];
(
  way["highway"~"^(motorway|trunk|primary|secondary|tertiary)$"](${BBOX});
  way["waterway"="river"](${BBOX});
  way["aeroway"="aerodrome"](${BBOX});
);
out geom;
`

const response = await fetch('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    'User-Agent': 'polisense-landing/1.0 (static site build; info@polisenseai.com)',
  },
  body: new URLSearchParams({ data: query }),
})
if (!response.ok) throw new Error(`Overpass returned ${response.status}`)
const json = await response.json()

// Keep only what the map draws: a kind and a coordinate list per way.
const kindOf = (tags) =>
  tags.aeroway === 'aerodrome'
    ? 'airport'
    : tags.waterway === 'river'
      ? 'river'
      : ['motorway', 'trunk', 'primary'].includes(tags.highway)
        ? 'major'
        : 'minor'

const features = json.elements
  .filter((el) => el.type === 'way' && el.geometry)
  .map((el) => ({
    kind: kindOf(el.tags ?? {}),
    // [lon, lat], rounded to ~1 m
    coords: el.geometry.map((p) => [Number(p.lon.toFixed(5)), Number(p.lat.toFixed(5))]),
  }))

await writeFile(
  new URL('../data/geo/arequipa-osm.json', import.meta.url),
  JSON.stringify({ bbox: BBOX, attribution: '© OpenStreetMap contributors', features })
)

const counts = features.reduce((acc, f) => ({ ...acc, [f.kind]: (acc[f.kind] ?? 0) + 1 }), {})
console.log('saved', features.length, 'ways', counts)
