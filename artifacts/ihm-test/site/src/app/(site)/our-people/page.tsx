// /our-people/ — WordPress page 23 (updated 2026-10-29). The directory is data in src/content/people.ts; portraits come from the
// CMS staff photo when the person has a profile page, else public/images/people/, else an initials tile.
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building2, GraduationCap, Users } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { HeroRays } from '@/blocks/hero/Component'
import { JsonLd } from '@/components/seo/JsonLd'
import { PeopleDirectory, type DirectoryTab } from '@/components/people/PeopleDirectory.client'
import { getStaff } from '@/components/templates/data'
import { localUrl } from '@/components/blocks/media'
import { PEOPLE_TABS } from '@/content/people'
import { siteOrigin } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Our people',
  path: '/our-people/',
  metaTitle: 'Our People | Board, Executive and Academic Staff | IHM',
  description:
    'Meet the people behind IHM: the Board of Directors, Academic Board, Executive Management Team and the academic staff of the Schools of Nursing and Social Work.',
})

// Payload returns absolute URLs; next/image needs the same-origin path (localUrl, as mediaOf does for `url`).
// A portrait not downloaded yet (`npm run people:photos`) falls back to the initials tile instead of a broken image.
const onDisk = (path?: string) => (path && existsSync(join(process.cwd(), 'public', path)) ? path : undefined)

const photoUrl = (m: { url?: string | null; sizes?: { card?: { url?: string | null } | null } | null } | null) => {
  const u = m?.sizes?.card?.url ?? m?.url
  return u ? localUrl(u) : undefined
}

export default async function OurPeopleRoute() {
  const staff = await getStaff().catch(() => [])
  const cmsPhoto = new Map(staff.filter((s) => s.path && s.photo).map((s) => [s.path as string, photoUrl(s.photo as never)]))

  const tabs: DirectoryTab[] = PEOPLE_TABS.map((t) => ({
    ...t,
    groups: t.groups.map((g) => ({ ...g, people: g.people.map((p) => ({ ...p, src: (p.bio && cmsPhoto.get(p.bio)) || onDisk(p.photo) })) })),
  }))

  const unique = new Map<string, DirectoryTab['groups'][number]['people'][number]>()
  for (const t of tabs) for (const g of t.groups) for (const p of g.people) if (!unique.has(p.name)) unique.set(p.name, p)
  const academic = new Set(tabs.find((t) => t.id === 'academic-staff')?.groups.flatMap((g) => g.people.map((p) => p.name)) ?? [])
  const mosaic = [...unique.values()].filter((p) => p.src).slice(0, 6)

  const origin = siteOrigin()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'People of the Institute of Health and Management',
    itemListElement: [...unique.values()].map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        name: p.name,
        jobTitle: p.role,
        worksFor: { '@type': 'CollegeOrUniversity', name: 'Institute of Health and Management', url: origin },
        ...(p.bio && { url: `${origin}${p.bio}` }),
        ...(p.links && { sameAs: Object.values(p.links) }),
      },
    })),
  }

  const STATS = [
    { icon: Building2, value: tabs.find((t) => t.id === 'board')?.groups[0]?.people.length ?? 0, label: 'Board directors' },
    { icon: GraduationCap, value: academic.size, label: 'Academic staff' },
    { icon: Users, value: 2, label: 'Schools: Nursing and Social Work' },
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="bg-brand-wash relative isolate overflow-hidden" data-tone="sunrise">
        <HeroRays id="people-rays" className="-bottom-40 -left-40 -z-10 w-[32rem] opacity-[0.1]" />
        <div className="mx-auto grid max-w-site items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="label-mono mb-5 inline-flex items-center gap-2 rounded-full bg-card px-3.5 py-1.5 text-[11px] tracking-[0.16em] text-primary-strong ring-1 ring-primary/20">
              <span aria-hidden className="bg-brand-gradient size-1.5 rounded-full" />About IHM
            </p>
            <h1 className="display text-[clamp(2.3rem,5vw,4.2rem)] leading-[1.04] text-balance">
              Our people are our backbone, and the reason behind IHM’s <em className="text-primary-strong">steadfast performance</em> and stellar growth!
            </h1>
            <span aria-hidden className="bg-brand-gradient mt-7 block h-1 w-20 rounded-full" />
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Teamwork is the only way we work. Meet the directors, academic leaders, managers and educators who shape every IHM course.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#directory" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[15px] font-semibold shadow-[0_12px_28px_-14px_hsl(5_85%_55%/0.9)] transition-all hover:-translate-y-0.5 hover:bg-secondary">
                Meet the team<ArrowRight aria-hidden className="size-4" />
              </a>
              <Link href="/career-with-us/" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-foreground/25 bg-card px-6 py-2.5 text-[15px] font-semibold transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary-strong">
                Career With Us
              </Link>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col rounded-2xl border border-border bg-card/80 p-4 backdrop-blur">
                  <s.icon aria-hidden className="size-5 text-primary-strong" />
                  <dt className="order-last mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dt>
                  <dd className="display mt-2 text-3xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ul aria-hidden className="grid grid-cols-3 gap-3 sm:gap-4">
            {mosaic.map((p, i) => (
              <li key={p.name} className={`relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_24px_48px_-28px_hsl(348_35%_13%/0.55)] ring-4 ring-card ${i % 3 === 1 ? 'translate-y-8' : ''}`}>
                <Image src={p.src as string} alt="" fill sizes="(min-width: 1024px) 14vw, 30vw" priority={i < 3} className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section anchorId="directory">
        <h2 className="display mb-8 text-[clamp(2rem,4vw,3.2rem)] leading-tight">
          Teamwork is the <em className="text-primary-strong">only way</em> we work
        </h2>
        <PeopleDirectory tabs={tabs} />
      </Section>

      <section className="bg-ink-glow text-ink-foreground" data-tone="ink">
        <div className="mx-auto flex max-w-site flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="label-mono text-[11px] tracking-[0.16em] text-secondary">Join us</p>
            <h2 className="display mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight">Want to grow with IHM?</h2>
            <p className="mt-3 max-w-xl text-ink-foreground/80">See current roles, or bring your expertise to our teaching and research as an adjunct.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/career-with-us/" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-secondary">
              Career With Us<ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/adjunct-appointments/" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink-foreground/50 px-6 py-2.5 font-semibold transition-colors hover:border-secondary hover:text-secondary">
              Adjunct appointments
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
