import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Box, Bus, MapPin, Navigation, Phone, Sparkles, Users } from 'lucide-react'
import { HeroRays } from '@/blocks/hero/Component'
import { Section } from '@/components/layout/Section'
import { VideoGallery } from '@/components/media/VideoGallery.client'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { PersonCard } from '@/components/research/parts'
import { RenderBlocks, type AnyBlock } from '@/components/RenderBlocks'
import { CourseCard } from '@/components/templates/courseCards'
import { getListingCourses } from '@/components/templates/data'
import { cn } from '@/lib/cn'
import { legacyImage } from '@/lib/legacy-image'
import { campusPage, STUDENT_LIFE, type CampusLocation, type CampusPageData } from '@/content/campus-pages'
import { SUPPORT_EMAIL } from '@/content/student-support'

export const CAMPUS_NAV = [
  { href: '/campuses/', label: 'All campuses' },
  { href: '/melbourne-campuses/', label: 'Melbourne' },
  { href: '/sydney-campus/', label: 'Sydney' },
  { href: '/perth-campus/', label: 'Perth' },
  { href: '/brisbane-campus/', label: 'Brisbane' },
  { href: '/contact/', label: 'Contact us' },
] as const

const FALLBACK = '/images/about/about-hero.webp'
export const photo = (src: string) => legacyImage(src, FALLBACK)
export const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`
/** +61 2 8228 6402 from +61282286402 */
export const prettyTel = (n: string) => n.replace(/^\+61(\d)(\d{4})(\d{4})$/, '+61 $1 $2 $3')

/** Full-bleed photo hero with the campus sub-navigation. */
export function CampusHero({ path, eyebrow, title, intro, image, actions }: { path: string; eyebrow: string; title: ReactNode; intro?: string; image: { src: string; alt: string }; actions?: ReactNode }) {
  return (
    <section data-tone="ink" className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
      <HeroRays id="campus-rays" className="-right-24 -bottom-28 -z-10 w-[28rem] opacity-[0.12]" />
      <div className="mx-auto max-w-site px-5 pt-20 pb-12 md:px-8 md:pt-28 md:pb-16">
        <div className="max-w-2xl animate-rise">
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <h1 className="display text-[clamp(2.5rem,6vw,4.8rem)] leading-[1.02]">{title}</h1>
          {intro && <p className="mt-5 text-lg text-ink-foreground/85">{intro}</p>}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
      <nav aria-label="Campuses" className="mx-auto max-w-site px-5 pb-6 md:px-8">
        <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {CAMPUS_NAV.map((n) => (
            <li key={n.href} className="shrink-0">
              <Link href={n.href} aria-current={n.href === path ? 'page' : undefined} className={cn('inline-block rounded-full px-4 py-2 text-sm font-semibold backdrop-blur transition-colors', n.href === path ? 'bg-secondary text-foreground' : 'bg-ink-foreground/15 hover:bg-ink-foreground/25')}>{n.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}

export function MapCard({ loc, phone }: { loc: CampusLocation; phone?: string | null }) {
  return (
    <article className="overflow-hidden rounded-card border border-border bg-card">
      <iframe src={loc.map} title={`Map: ${loc.name}`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="aspect-[16/10] w-full border-0 bg-muted" />
      <div className="space-y-3 p-6">
        <h3 className="display text-2xl">{loc.name}</h3>
        <p className="flex gap-2.5 text-muted-foreground"><MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-strong" /><span>{loc.lines.map((l) => <span key={l} className="block">{l}</span>)}</span></p>
        {phone && <p><a href={telHref(phone)} className="flex gap-2.5 font-semibold hover:text-primary-strong"><Phone aria-hidden className="size-5 text-primary-strong" />{prettyTel(phone)}</a></p>}
        <a href={loc.directions} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-ink-foreground hover:bg-primary hover:text-foreground"><Navigation aria-hidden className="size-4" />Get directions</a>
      </div>
    </article>
  )
}

export function StudentLife({ tone = 'muted' }: { tone?: 'default' | 'muted' }) {
  return (
    <Section tone={tone} anchorId="student-life">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <article className="rounded-card bg-ink p-7 text-ink-foreground md:p-10">
          <Sparkles aria-hidden className="size-8 text-secondary" />
          <h2 className="display mt-4 text-3xl">Student Life at IHM</h2>
          <p className="mt-4 text-ink-foreground/80">{STUDENT_LIFE.life}</p>
        </article>
        <article className="bg-sunrise-glow rounded-card p-7 md:p-10">
          <Users aria-hidden className="size-8" />
          <h2 className="display mt-4 text-3xl">IHM Culture</h2>
          <p className="mt-4">{STUDENT_LIFE.culture}</p>
        </article>
      </div>
    </Section>
  )
}

export function EnquireSection({ heading }: { heading: string }) {
  return <RenderBlocks blocks={[{ blockType: 'enquiryForm', formKey: 'quick-enquiry', heading, variant: 'card', anchorId: 'quickContact', tone: 'muted' } as AnyBlock]} />
}

const btn = (primary = false) => cn('inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-2.5 font-semibold transition-colors', primary ? 'bg-primary text-foreground hover:bg-secondary' : 'border border-ink-foreground/40 backdrop-blur hover:border-secondary hover:text-secondary')

/** A whole campus page: hero, the city, photos, video or 3D tour, the campus team, locations and maps, courses taught there,
 *  student life and the enquiry form. Courses come from the CMS (`courses.campuses`). */
export async function CampusDetail({ slug }: { slug: CampusPageData['slug'] }) {
  const c = campusPage(slug)
  const courses = (await getListingCourses().catch(() => [])).filter((x) => x.campus.some((k) => k.slug === slug))
  const photos = c.photos.map((p) => ({ ...p, src: photo(p.src) }))
  return (
    <>
      <CampusHero path={c.path} eyebrow={`${c.state} · Campus`} title={<>Introducing <em className="text-secondary not-italic">{c.city}</em></>} intro={c.tagline}
        image={{ ...c.hero, src: photo(c.hero.src) }}
        actions={<><a href="#quickContact" className={btn(true)}>Enquire about {c.city}</a><a href="#location" className={btn()}><MapPin aria-hidden className="size-4" />Find us</a></>} />

      <div className="border-b border-border bg-card">
        <ul className="mx-auto grid max-w-site grid-cols-1 divide-y divide-border px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-8">
          {c.highlights.map((h) => <li key={h} className="flex items-center gap-3 py-4 font-semibold sm:px-5 sm:first:pl-0"><span aria-hidden className="size-2 rounded-full bg-primary" />{h}</li>)}
        </ul>
      </div>

      <Section anchorId="about">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Life in {c.city}</Eyebrow>
            <div className="space-y-5 text-[17px] leading-relaxed text-muted-foreground [&>p:first-child]:text-xl [&>p:first-child]:text-foreground">{c.about.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3 self-start lg:sticky lg:top-24">
            {photos.map((p, i) => (
              <div key={p.alt} className={cn('relative overflow-hidden rounded-2xl', i === 0 && photos.length % 2 === 1 ? 'col-span-2 aspect-[16/9]' : 'aspect-[607/361]')}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {(c.video || c.tour) && (
        <Section tone="ink" className="bg-ink-glow" anchorId={c.tour ? 'virtual-tour' : 'video'}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              {c.tour ? <Box aria-hidden className="size-9 text-secondary" /> : null}
              <Eyebrow onDark>{c.tour ? 'Virtual tour' : 'Campus video'}</Eyebrow>
              <h2 className="display text-display-md">{c.tour ? `Walk through the ${c.city} campus` : `See the ${c.city} campus`}</h2>
              <p className="mt-4 text-ink-foreground/75">{c.tour ? 'Explore our classrooms and student spaces in 3D before you visit.' : 'Take a look inside before you visit.'}</p>
            </div>
            {c.tour
              ? <iframe src={c.tour.src} title={c.tour.title} loading="lazy" allowFullScreen allow="xr-spatial-tracking; fullscreen" className="aspect-video w-full rounded-card border-0 bg-black" />
              : c.video && <VideoGallery videos={[c.video]} columns={1} />}
          </div>
        </Section>
      )}

      {c.team.length > 0 && (
        <Section anchorId="team">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div><Eyebrow>Your campus team</Eyebrow><h2 className="display text-display-md">{c.teamTitle}</h2>{c.teamIntro && <p className="mt-3 text-lg text-muted-foreground">{c.teamIntro}</p>}</div>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-primary-strong hover:underline">{SUPPORT_EMAIL}</a>
          </div>
          <ul className={cn('grid grid-cols-2 gap-4', c.team.length > 2 ? 'md:grid-cols-3 lg:grid-cols-5' : 'max-w-xl')}>{c.team.map((p) => <li key={p.name}><PersonCard person={p} compact /></li>)}</ul>
        </Section>
      )}

      <Section tone="muted" anchorId="location">
        <Eyebrow>Campus address and location</Eyebrow>
        <h2 className="display mb-10 text-display-md">Find us in {c.city}</h2>
        <div className={cn('grid grid-cols-1 gap-5', c.locations.length > 1 && 'lg:grid-cols-2')}>
          {c.locations.map((l) => <MapCard key={l.name} loc={l} phone={l.tel} />)}
        </div>
        {c.transport && (
          <div className="mt-8 grid grid-cols-1 gap-6 rounded-card border border-border bg-card p-6 md:grid-cols-[auto_1fr] md:p-8">
            <span className="grid size-14 place-items-center rounded-2xl bg-blush text-primary-strong"><Bus aria-hidden className="size-7" /></span>
            <div>
              <h3 className="display text-2xl">Public Transport</h3>
              <p className="mt-2 text-muted-foreground">{c.transport.intro}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">{c.transport.items.map((t) => <li key={t} className="rounded-2xl bg-blush px-4 py-3 text-sm font-semibold">{t}</li>)}</ul>
              <p className="mt-3 text-sm italic text-muted-foreground">{c.transport.note}</p>
            </div>
          </div>
        )}
      </Section>

      {courses.length > 0 && (
        <Section anchorId="courses">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div><Eyebrow>Courses</Eyebrow><h2 className="display text-display-md">Study in {c.city}</h2></div>
            <Link href="/courses/" className="inline-flex items-center gap-2 font-semibold text-primary-strong">All courses<ArrowRight aria-hidden className="size-4" /></Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{courses.map((x) => <CourseCard key={x.id} course={x} />)}</div>
        </Section>
      )}

      <StudentLife tone={courses.length ? 'muted' : 'default'} />
      <EnquireSection heading={`Enquire about studying in ${c.city}`} />
    </>
  )
}
