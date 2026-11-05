import { SSW_PATHS } from '@/content/school-of-social-work'
import { siteOrigin } from '@/lib/seo/metadata'

// /school-of-social-work/sitemap.xml — the microsite published its own sitemap (DEC-36); the URL keeps answering with the School's
// 35 pages. The site-wide /sitemap.xml lists them too.
export const dynamic = 'force-static'

export function GET() {
  const origin = siteOrigin()
  const urls = SSW_PATHS.map((p) => `  <url><loc>${origin}${p}</loc><changefreq>monthly</changefreq><priority>${p === '/school-of-social-work/' ? '1.0' : '0.8'}</priority></url>`)
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
