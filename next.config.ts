import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // Add basePath only if paths break post-deploy: basePath: '/polisense.AI'
}

export default nextConfig
