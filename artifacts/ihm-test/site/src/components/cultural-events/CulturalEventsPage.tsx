import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { EventsExplorer } from './EventsExplorer.client'
import type { CulturalEvent } from '@/content/cultural-events'
import { legacyImage } from '@/lib/legacy-image'
import { siteOrigin } from '@/lib/seo/metadata'

// /student-cultural-workshop-events/ and /staff-cultural-workshop-events/ (WordPress template-*-aboriginal-workshops.php).
// The hero uses the theme's Aboriginal artwork background when it has been downloaded (`npm run assets:legacy`).
export function CulturalEventsPage({ events, categories, audience, path }: { events: CulturalEvent[]; categories: string[]; audience: 'Students' | 'Staff'; path: string }) {
  const origin = siteOrigin()
  const hero = legacyImage('/images/cultural-events/aboriginal-bg.webp', events[events.length - 1]?.images[0] ?? '/images/home/about-community.webp')
  const mosaic = events.flatMap((e) => e.images.slice(0, 1)).slice(0, 4)
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `IHM cultural workshops and events for ${audience.toLowerCase()}`,
        itemListElement: events.map((e, i) => ({
          '@type': 'ListItem', position: i + 1,
          item: { '@type': 'Event', name: e.title, description: e.body[0], eventStatus: 'https://schema.org/EventScheduled', location: { '@type': 'Place', name: e.venue }, organizer: { '@type': 'CollegeOrUniversity', name: 'Institute of Health and Management', url: origin }, image: `${origin}${e.images[0]}`, ...(e.year && { startDate: e.year }) },
        })),
      }} />
      <section data-tone="ink" className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <Image src={hero} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-45" />
        <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="mx-auto grid max-w-site items-center gap-10 px-5 py-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <Eyebrow onDark>Aboriginal and Torres Strait Islander cultures · {audience}</Eyebrow>
            <h1 className="display text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[1.02]">Cultural Workshops <em className="text-secondary">&amp; Events</em></h1>
            <p className="mt-6 max-w-xl text-lg text-ink-foreground/85">Participate in hands-on workshops exploring traditional arts, storytelling, and cultural practices led by community elders and artists.</p>
            <a href="#events" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-secondary">Search events<ArrowRight aria-hidden className="size-4" /></a>
          </div>
          <ul aria-hidden className="hidden grid-cols-2 gap-3 lg:grid">
            {mosaic.map((src, i) => <li key={src} className={`relative aspect-[4/3] overflow-hidden rounded-2xl ring-4 ring-ink-foreground/10 ${i % 2 ? 'translate-y-6' : ''}`}><Image src={src} alt="" fill sizes="20vw" className="object-cover" /></li>)}
          </ul>
        </div>
      </section>
      <Section anchorId="events">
        <EventsExplorer events={events} categories={categories} />
      </Section>
      <section data-tone="sunrise" className="bg-sunrise-glow">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-6 px-5 py-12 md:px-8">
          <p className="display max-w-2xl text-[clamp(1.5rem,3vw,2.2rem)] leading-snug">IHM acknowledges the Traditional Owners of country throughout Australia and recognises continuing connection to land, waters and culture.</p>
          <Link href={path === '/student-cultural-workshop-events/' ? '/staff-cultural-workshop-events/' : '/student-cultural-workshop-events/'} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 py-2.5 font-semibold text-ink-foreground">
            {audience === 'Students' ? 'Staff' : 'Student'} cultural events<ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
