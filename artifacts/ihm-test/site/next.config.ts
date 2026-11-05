import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'
import { redirects } from './src/content/redirects'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

/** HSTS (90-security §4): two years, subdomains included; production only, so a local http://localhost never pins itself. */
export const HSTS_VALUE = 'max-age=63072000; includeSubDomains'
export const productionHeaders = (nodeEnv: string | undefined) =>
  nodeEnv === 'production' ? [{ source: '/:path*', headers: [{ key: 'Strict-Transport-Security', value: HSTS_VALUE }] }] : []

const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost', '127.0.0.1', ...(process.env.REPLIT_DEV_DOMAIN ? [process.env.REPLIT_DEV_DOMAIN] : [])],
  output: 'standalone', // Dockerfile copies .next/standalone (00-architecture §6 Deploy)
  poweredByHeader: false,
  headers: async () => productionHeaders(process.env.NODE_ENV),
  trailingSlash: true, // WordPress-style URLs (rule 1); non-slashed requests get a 308
  // Exact old-URL redirects (70-urls-seo §4). The list is code: src/content/redirects.ts.
  // `statusCode` instead of `permanent`: Next would answer 308/307, the old site and the parity crawl expect 301/302.
  redirects: async () => redirects.map((r) => ({ source: r.from, destination: r.to, statusCode: r.permanent ? 301 : 302 })),
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      // Site photography and brand files shipped in public/ (home banners, course thumbnails, logo).
      { pathname: '/images/**' },
      { pathname: '/brand/**' },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
