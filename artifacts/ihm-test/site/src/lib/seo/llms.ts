import type { PageEntry } from '@/content/pages'

// /llms.txt (70-urls-seo §4, GEO): a Markdown map of the site for language models, in the llmstxt.org shape — H1, a one-paragraph
// summary, then "## Section" lists of `- [Title](url): description`. Built from the same registries as the sitemap: pages.ts (by
// template), published courses and the latest posts. Noindex pages, forms, utilities and landing pages are left out.
export type LlmsLink = { title: string; path: string; description?: string | null }

const SECTIONS: { title: string; templates: string[] }[] = [
  { title: 'About IHM', templates: ['home', 'about', 'partnership'] },
  { title: 'School of Social Work', templates: ['schoolOfSocialWork'] },
  { title: 'Micro-credentials', templates: ['microCredentialsHub', 'microCredential'] },
  { title: 'Study and admissions', templates: ['careers', 'events', 'paymentOptions', 'alumniHub'] },
  { title: 'Students', templates: ['studentSupport', 'library'] },
  { title: 'Research', templates: ['research'] },
  { title: 'Campuses and contact', templates: ['campus', 'campusListing', 'contact'] },
  { title: 'Policies', templates: ['policy'] },
]
const SKIP = new Set(['formPage', 'utility', 'landing'])

const clean = (s: string | null | undefined, max = 220) => {
  const t = (s ?? '').replace(/\s+/g, ' ').replace(/[[\]]/g, '').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(' ') > 80 ? cut.lastIndexOf(' ') : max)}…`
}
const line = (origin: string, l: LlmsLink) => `- [${clean(l.title, 120)}](${origin}${l.path})${l.description ? `: ${clean(l.description)}` : ''}`

export function buildLlmsTxt(args: { origin: string; siteName: string; summary: string; pages: PageEntry[]; courses: LlmsLink[]; posts: LlmsLink[] }): string {
  const { origin } = args
  const indexable = args.pages.filter((p) => !p.noindex && !SKIP.has(p.template) && p.path.startsWith('/'))
  const used = new Set<string>()
  const out: string[] = [`# ${args.siteName}`, '', `> ${clean(args.summary, 600)}`, '']
  out.push('Australian higher education provider (TEQSA PRV14040, CRICOS 03407G) teaching nursing, social work and health courses in Melbourne, Sydney, Brisbane and Perth and online. Every page below is public; prices, intakes and entry requirements on the course pages are the current ones.', '')
  if (args.courses.length) {
    out.push('## Courses', '', ...args.courses.map((c) => line(origin, c)), '')
  }
  for (const s of SECTIONS) {
    const rows = indexable.filter((p) => s.templates.includes(p.template))
    if (!rows.length) continue
    rows.forEach((r) => used.add(r.path))
    out.push(`## ${s.title}`, '', ...rows.map((r) => line(origin, r)), '')
  }
  if (args.posts.length) out.push('## News and blog', '', ...args.posts.map((p) => line(origin, p)), '')
  const rest = indexable.filter((p) => !used.has(p.path))
  if (rest.length) out.push('## Optional', '', ...rest.map((r) => line(origin, r)), '')
  return `${out.join('\n').trim()}\n`
}
