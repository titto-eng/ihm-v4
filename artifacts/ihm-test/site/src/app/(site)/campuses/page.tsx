// /campuses/ — the four campus cities (Melbourne has two campuses), each linking to its campus page, then student life and culture.
// Copy in src/content/campus-pages.ts (CAMPUS_PAGES summaries); addresses in src/content/campuses.ts.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { CampusHero, StudentLife, photo } from '@/components/campus/parts'
import { CAMPUS_PAGES, oneLine } from '@/content/campus-pages'

export const metadata: Metadata = pageMetadata({
  title: 'Campuses',
  path: '/campuses/',
  metaTitle: 'Our Campuses: Melbourne, Sydney, Perth, Brisbane | IHM Australia',
  description: 'IHM campuses in Melbourne (North Melbourne and the CBD), Sydney (Parramatta), Perth CBD and Brisbane CBD, all close to public transport.',
})

const ORDER = ['sydney', 'melbourne', 'perth', 'brisbane'] as const

export default function CampusesRoute() {
  const list = ORDER.map((s) => CAMPUS_PAGES.find((c) => c.slug === s)!)
  return (
    <>
      <CampusHero path="/campuses/" eyebrow="Study across Australia" title={<>Our <em className="text-secondary not-italic">campuses</em></>}
        intro="Five campuses in four of Australia's great cities, each a short trip from public transport."
        image={{ src: '/images/campuses/sydney-header.webp', alt: 'Sydney Harbour Bridge and Opera House' }}
        actions={<Link href="/courses/" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">Find your perfect course<ArrowUpRight aria-hidden className="size-4" /></Link>} />

      <Section>
        <Eyebrow>Choose your city</Eyebrow>
        <h2 className="display mb-10 text-display-md">Where would you like to study?</h2>
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {list.map((c, i) => (
            <li key={c.slug}>
              <Link href={c.path} className="group block h-full overflow-hidden rounded-card border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl">
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image src={photo(c.photos[0]?.src ?? c.hero.src)} alt={c.photos[0]?.alt ?? c.hero.alt} fill priority={i < 2} sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-5 top-5 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-ink-foreground backdrop-blur">{c.state}</span>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="display flex items-center justify-between text-4xl">{c.city}<ArrowUpRight aria-hidden className="size-7 text-primary-strong transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></h3>
                  <div className="mt-3 space-y-3 text-[15px] text-muted-foreground">{c.summary.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {c.locations.map((l) => <li key={l.name} className="inline-flex items-center gap-1.5 rounded-full bg-blush px-3 py-1.5 text-xs font-semibold"><MapPin aria-hidden className="size-3.5 text-primary-strong" />{oneLine(l)}</li>)}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <StudentLife />
    </>
  )
}
