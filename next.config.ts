import type { NextConfig } from 'next'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  turbopack: {
    rules: {
      // Let the blog's parcel boundary files (components/blog/*.geojson) be
      // imported as plain JSON modules.
      '*.geojson': {
        loaders: [],
        as: '*.json',
      },
    },
  },
}

export default nextConfig
