// /news-and-events/ — WordPress template-events-and-news.php (synced 2026-10-30). News posts (category `news`) and the `events`
// collection (imported from wp_mwt_events by `npm run import -- wp-events`).
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { HeroRays } from '@/blocks/hero/Component'
import { JsonLd } from '@/components/seo/JsonLd'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { localUrl } from '@/components/blocks/media'
import { NewsEventsBoard, type BoardEvent, type BoardPost } from '@/components/news-events/NewsEventsBoard.client'
import { siteOrigin } from '@/lib/seo/metadata'
import type { Media } from '@/payload-types'

export const metadata: Metadata = pageMetadata({
  title: 'News and Events',
  path: '/news-and-events/',
  metaTitle: 'News & Events | Seminars, Webinars, Workshops and Campus Events | IHM',
  description: 'IHM news, and upcoming and past seminars, guest lectures, webinars, workshops, graduations and campus events across Melbourne, Sydney, Perth and Brisbane.',
})

const img = (m: unknown): string | null => {
  if (!m || typeof m !== 'object') return null
  const media = m as Media
  const u = media.sizes?.card?.url ?? media.url
  return u ? localUrl(u) : null
}

const load = unstable_cache(
  async (): Promise<{ events: BoardEvent[]; posts: BoardPost[] }> => {
    try {
      const payload = await getPayload({ config })
      const [ev, po] = await Promise.all([
        payload.find({ collection: 'events', where: { _status: { equals: 'published' } }, sort: '-startsAt', limit: 0, pagination: false, depth: 1 }),
        payload.find({ collection: 'posts', where: { and: [{ _status: { equals: 'published' } }, { category: { equals: 'news' } }] }, sort: '-publishedAt', limit: 0, pagination: false, depth: 1 }),
      ])
      return {
        events: ev.docs.map((e) => ({
          id: e.id, title: e.title, startsAt: e.startsAt, day: e.dayLabel ?? null, time: e.timeText ?? null, frequency: e.frequency ?? null,
          discipline: typeof e.discipline === 'object' && e.discipline ? (e.discipline as { name?: string }).name ?? null : null,
          hostedBy: e.hostedBy ?? null, venue: e.venue ?? null, speaker: e.speaker ?? null, speakerBio: e.speakerBio ?? null, description: e.description ?? null,
          joinUrl: e.joinUrl && /^https?:\/\//.test(e.joinUrl) ? e.joinUrl : null, image: img(e.image), tags: (e.tags as string[] | null) ?? [],
        })),
        posts: po.docs.map((p) => ({ id: p.id, title: p.title, path: p.path ?? '#', publishedAt: p.publishedAt, excerpt: p.excerpt ?? null, image: img(p.heroImage) })),
      }
    } catch {
      return { events: [], posts: [] }
    }
  },
  ['news-and-events'],
  { tags: ['collection:events', 'collection:posts', 'posts'], revalidate: 600 },
)

export default async function NewsAndEventsRoute() {
  const { events, posts } = await load()
  const now = new Date().toISOString()
  const origin = siteOrigin()
  const upcoming = events.filter((e) => e.startsAt >= now).slice(0, 10)
  return (
    <>
      {upcoming.length > 0 && (
        <JsonLd data={{
          '@context': 'https://schema.org', '@type': 'ItemList', name: 'Upcoming IHM events',
          itemListElement: upcoming.map((e, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Event', name: e.title, startDate: e.startsAt, eventAttendanceMode: e.joinUrl ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode', location: e.joinUrl ? { '@type': 'VirtualLocation', url: e.joinUrl } : { '@type': 'Place', name: e.venue ?? 'IHM' }, organizer: { '@type': 'CollegeOrUniversity', name: 'Institute of Health and Management', url: origin } } })),
        }} />
      )}
      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="ne-rays" className="-right-24 -bottom-24 -z-10 w-[28rem] opacity-[0.14]" />
        <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20">
          <Eyebrow onDark>News &amp; Events</Eyebrow>
          <h1 className="display max-w-3xl text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[1.02]">What&apos;s happening <em className="text-secondary">at IHM</em></h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-foreground/80">Seminars, guest lectures, webinars, workshops, graduations and campus celebrations, with the latest news from across our campuses.</p>
          <dl className="mt-8 flex flex-wrap gap-3">
            {[[String(events.length), 'events'], [String(upcoming.length), 'upcoming'], [String(posts.length), 'news stories']].map(([v, l]) => (
              <div key={l} className="flex items-baseline gap-2 rounded-full bg-ink-foreground/10 px-4 py-2"><dd className="display text-2xl text-secondary">{v}</dd><dt className="text-sm">{l}</dt></div>
            ))}
          </dl>
        </div>
      </section>
      <Section anchorId="board">
        <NewsEventsBoard events={events} posts={posts} now={now} />
      </Section>
      <section data-tone="sunrise" className="bg-sunrise-glow">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-4 px-5 py-10 md:px-8">
          <p className="display text-2xl">Looking for stories and study tips?</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog/" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 py-2.5 font-semibold text-ink-foreground">Read the blog<ArrowRight aria-hidden className="size-4" /></Link>
            <Link href="/news/" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-card/90 px-6 py-2.5 font-semibold">All news</Link>
          </div>
        </div>
      </section>
    </>
  )
}
