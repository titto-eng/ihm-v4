// /site-map/ — the human site map. Built from the header menu (src/content/nav.ts), the published courses (CMS), the footer
// links and every page in the registry (src/content/pages.ts), so it never goes stale. Not-indexed and thank-you/error pages are
// left out. Filtering is client-side (SiteMapBrowser); every link is in the server HTML. The XML sitemap is /sitemap.xml.
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { LegalShell } from '@/components/legal/parts'
import { SiteMapBrowser, type SiteMapGroup } from '@/components/legal/SiteMapBrowser.client'
import { networkLabel } from '@/components/layout/SocialIcon'
import { getListingCourses } from '@/components/templates/data'
import { footer } from '@/content/footer'
import { nav } from '@/content/nav'
import { pages } from '@/content/pages'

export const metadata: Metadata = pageMetadata({
  title: 'Site map',
  path: '/site-map/',
  metaTitle: 'Site Map | IHM Australia',
  description: 'Every page on the IHM Australia website: courses, admissions, student life, research, partnerships, campuses, policies and more.',
})

export const revalidate = 3600

const HIDE = new Set(['/thanks/', '/thanks-events/', '/pay-online-error/', '/google-review-design/', '/site-map/'])
const TEMPLATE_LABEL: Record<string, string> = {
  policy: 'Policies and guides', about: 'About IHM', microCredential: 'Micro-credentials', microCredentialsHub: 'Micro-credentials', studentSupport: 'Student support',
  partnership: 'Partnerships', library: 'Library', research: 'Research', landing: 'Courses and study', formPage: 'Forms', campus: 'Campuses', campusListing: 'Campuses',
  careers: 'Careers', contact: 'Contact', events: 'News and events', paymentOptions: 'Payments', alumniHub: 'Alumni', generic: 'More', utility: 'More', home: 'Home',
}
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const isPage = (h: string) => h.startsWith('/') && !h.startsWith('/?') && !h.startsWith('?')

export default async function SiteMapRoute() {
  const courses = await getListingCourses().catch(() => [])
  const seen = new Set<string>()
  const take = (links: { label: string; href: string }[]) => links.filter((l) => {
    if (!l.href || l.href.startsWith('?') || HIDE.has(l.href) || seen.has(l.href)) return false
    seen.add(l.href)
    return true
  })

  const groups: SiteMapGroup[] = [{ id: 'home', title: 'Home', links: take([{ label: 'Home page', href: '/' }]) }]
  for (const item of nav.menu) {
    if (!item.groups.length) continue
    // a linked group heading (a school page) is listed too; query-string links (the filtered course finder) are not
    const links = take(item.groups.flatMap((g) => [...(g.heading && g.href && !g.href.includes('?') ? [{ label: g.heading, href: g.href }] : []), ...g.links]))
    if (item.label === 'Courses') {
      const labels = new Set(links.map((l) => l.label.toLowerCase()))
      links.push(...take(courses.filter((c) => !labels.has(c.title.toLowerCase())).map((c) => ({ label: c.title, href: c.path }))))
    }
    if (links.length) groups.push({ id: slug(item.label), title: item.label, links })
  }
  const quick = take([...nav.utilityLinks, ...footer.columns.flatMap((c) => c.links)])
  if (quick.length) groups.push({ id: 'quick-links', title: 'Quick links', links: quick })

  const rest = new Map<string, { label: string; href: string }[]>()
  for (const p of pages) {
    if (p.noindex || HIDE.has(p.path) || seen.has(p.path) || !isPage(p.path)) continue
    seen.add(p.path)
    // the registry tags a few unrelated pages `partnership` (e.g. /dataflow/, /end-note/, /grammarly/): only real partner pages keep it
    const key = p.template === 'partnership' && !/partner|cintana|arizona|ramsay/.test(p.path) ? 'More' : (TEMPLATE_LABEL[p.template] ?? 'More')
    rest.set(key, [...(rest.get(key) ?? []), { label: p.title, href: p.path }])
  }
  for (const [title, links] of [...rest].sort((a, b) => (a[0] === 'More' ? 1 : b[0] === 'More' ? -1 : a[0].localeCompare(b[0])))) {
    const existing = groups.find((g) => g.title === title)
    if (existing) existing.links.push(...links)
    else groups.push({ id: slug(title), title, links: links.sort((a, b) => a.label.localeCompare(b.label)) })
  }
  groups.push({ id: 'follow-us', title: 'Follow IHM', links: footer.social.map((s) => ({ label: networkLabel[s.network], href: s.href })) })

  return (
    <LegalShell path="/site-map/" eyebrow="Site map" title="Explore every page" intro="All pages and resources on the IHM Australia website, in one place.">
      <Section>
        <SiteMapBrowser groups={groups} />
      </Section>
    </LegalShell>
  )
}
