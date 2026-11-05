import { getPayload } from 'payload'
import config from '@payload-config'
import { pages } from '@/content/pages'
import { site } from '@/content/site'
import { buildLlmsTxt, type LlmsLink } from '@/lib/seo/llms'
import { siteOrigin } from '@/lib/seo/metadata'

// GET /llms.txt — the site map for language models (70-urls-seo §4). Rebuilt at most hourly.
export const revalidate = 3600

const SUMMARY =
  'The Institute of Health & Management (IHM) is an Australian institute of higher education, in partnership with Arizona State University through the Cintana Education Alliance. IHM offers the Bachelor of Nursing, Master of Nursing (on campus and online), the Graduate Certificate in Advanced Nursing with 12 specialisations and the Australian Nursing Practice (RN bridging) program, the Bachelor of Social Work, nursing micro-credentials, and NCLEX and OSCE preparation for internationally qualified nurses.'

export async function GET() {
  let courses: LlmsLink[] = []
  let posts: LlmsLink[] = []
  try {
    const payload = await getPayload({ config })
    const find = (collection: 'courses' | 'posts', sort: string, limit: number) =>
      payload.find({ collection, where: { _status: { equals: 'published' } }, sort, limit, depth: 0, draft: false, overrideAccess: true, pagination: false,
        select: { title: true, path: true, excerpt: true, meta: true, seo: true } as never })
    const [c, p] = await Promise.all([find('courses', 'title', 0), find('posts', '-publishedAt', 30)])
    type Doc = { title?: string; path?: string; excerpt?: string | null; meta?: { description?: string | null } | null; seo?: { noindex?: boolean | null } | null }
    const map = (docs: unknown[]) => (docs as Doc[]).filter((d) => d.title && d.path && !d.seo?.noindex).map((d) => ({ title: d.title!, path: d.path!, description: d.meta?.description || d.excerpt }))
    courses = map(c.docs)
    posts = map(p.docs)
  } catch (e) {
    console.error('[llms.txt] CMS unavailable, pages only', e instanceof Error ? e.message : e)
  }
  const body = buildLlmsTxt({ origin: siteOrigin(), siteName: site.siteName || 'Institute of Health & Management', summary: SUMMARY, pages, courses, posts })
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
