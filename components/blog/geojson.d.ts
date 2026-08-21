// Type declaration for importing the parcel boundary files
// (majes.geojson, santa_rita.geojson) as plain JSON modules — see the
// `turbopack.rules['*.geojson']` mapping in next.config.ts.
declare module '*.geojson' {
  interface GeoJsonFeature {
    type: 'Feature'
    properties: Record<string, unknown>
    geometry: {
      type: string
      coordinates: number[][][]
    }
  }

  interface GeoJsonFeatureCollection {
    type: 'FeatureCollection'
    features: GeoJsonFeature[]
  }

  const value: GeoJsonFeatureCollection
  export default value
}
