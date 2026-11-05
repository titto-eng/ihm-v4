// /school-of-social-work/** — the School of Social Work microsite (DEC-36): 9 section pages, 13 career pages, 13 event pages.
// ihm.edu.au serves these as static HTML; here they are pages in the site design, built from src/content/school-of-social-work.
// The microsite's own links end in `index.html`; those requests redirect to the clean URL.
import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { pageMetadata } from '@/components/page/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { SswCareerPage, SswEventPage, SswPage } from '@/components/school-of-social-work/SswPage'
import { SSW_BASE, SSW_CAREERS, SSW_EVENTS, SSW_PAGES } from '@/content/school-of-social-work'

type Params = Promise<{ slug?: string[] }>

export const dynamicParams = true

export function generateStaticParams() {
  return [
    ...Object.keys(SSW_PAGES).map((s) => ({ slug: s ? [s] : [] })),
    ...SSW_CAREERS.map((c) => ({ slug: ['careers', c.slug] })),
    ...SSW_EVENTS.map((e) => ({ slug: ['events', e.slug] })),
  ]
}

type Resolved =
  | { kind: 'page'; slug: string; path: string }
  | { kind: 'career'; career: (typeof SSW_CAREERS)[number]; path: string }
  | { kind: 'event'; event: (typeof SSW_EVENTS)[number]; path: string }

function resolve(parts: string[]): Resolved | null {
  const path = `${SSW_BASE}/${parts.length ? `${parts.join('/')}/` : ''}`
  if (parts.length <= 1 && (parts[0] ?? '') in SSW_PAGES) return { kind: 'page', slug: parts[0] ?? '', path }
  if (parts.length === 2 && parts[0] === 'careers') {
    const career = SSW_CAREERS.find((c) => c.slug === parts[1])
    return career ? { kind: 'career', career, path } : null
  }
  if (parts.length === 2 && parts[0] === 'events') {
    const event = SSW_EVENTS.find((e) => e.slug === parts[1].toLowerCase())
    return event ? { kind: 'event', event, path } : null
  }
  return null
}

/** The microsite's own <title>s already name the School ("… | IHM School of Social Work"): used as is, without the site suffix. */
function meta(title: string, path: string, description: string): Metadata {
  const m = pageMetadata({ title, path, description })
  return { ...m, title: { absolute: title }, openGraph: { ...m.openGraph, title }, twitter: { ...m.twitter, title } }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const r = resolve((await params).slug ?? [])
  if (!r) return {}
  if (r.kind === 'page') {
    const p = SSW_PAGES[r.slug]
    return meta(p.title, r.path, p.desc)
  }
  if (r.kind === 'career') return meta(`${r.career.title} | IHM School of Social Work`, r.path, r.career.desc)
  return meta(`${r.event.title} | IHM School of Social Work`, r.path, r.event.summary)
}

/** The conference as a schema.org Event (dates and venues from the conference page). */
const conferenceLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationEvent',
  name: 'IHM Inaugural Social Work Conference 2026',
  description: 'Social Work: Connecting Education, Practice and Innovation.',
  startDate: '2026-11-16T08:30:00+11:00',
  endDate: '2026-11-17T16:15:00+11:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: [
    { '@type': 'Place', name: 'Community Hub at The Dock', address: { '@type': 'PostalAddress', streetAddress: '912 Collins Street', addressLocality: 'Docklands', addressRegion: 'VIC', postalCode: '3008', addressCountry: 'AU' } },
    { '@type': 'Place', name: 'IHM North Melbourne Campus', address: { '@type': 'PostalAddress', streetAddress: 'Level 2, 187 Boundary Road', addressLocality: 'North Melbourne', addressRegion: 'VIC', postalCode: '3051', addressCountry: 'AU' } },
  ],
  organizer: { '@type': 'CollegeOrUniversity', name: 'Institute of Health & Management (IHM Australia)', url: 'https://ihm.edu.au/' },
}

export default async function Page({ params }: { params: Params }) {
  const parts = (await params).slug ?? []
  if (parts.at(-1)?.toLowerCase() === 'index.html') {
    const clean = parts.slice(0, -1).join('/')
    permanentRedirect(`${SSW_BASE}/${clean ? `${clean}/` : ''}`)
  }
  const r = resolve(parts)
  if (!r) notFound()
  if (r.kind === 'career') return <SswCareerPage career={r.career} />
  if (r.kind === 'event') return <SswEventPage event={r.event} />
  return (
    <>
      {r.slug === 'conference-2026' && <JsonLd data={conferenceLd} />}
      <SswPage slug={r.slug} page={SSW_PAGES[r.slug]} />
    </>
  )
}
