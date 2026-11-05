import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { CardCarousel } from '@/components/blocks/CardCarousel'
import Image from '@/components/blocks/MediaImage'
import { Section } from '@/components/layout/Section'
import { pickSize } from '@/lib/media-sizes'
import { RenderBlocks, type AnyBlock } from '@/components/RenderBlocks'
import { HeroCarousel } from '@/blocks/hero/HeroCarousel'
import { Button } from '@/components/ui/button'
import type { Post } from '@/payload-types'
import { CourseCard, type CourseCardData } from './courseCards'
import type { Lookup, TestimonialItem } from './data'
import { PostCard } from './BlogListing'
import { HERO_FALLBACK, heroSubheading } from './homeCopy'
import { Banner, SectionTitle, enquireHref, type HeroProps } from './pageParts'

export type HomeData = {
  /**
   * The page's own hero, or several as a hero carousel (slide one is the h1 and the preloaded image); without one, a
   * placeholder from homeCopy.ts and the first featured course's image.
   */
  hero?: HeroProps | HeroProps[] | null
  /** The page's own stats band; without one, the live counts. */
  stats?: AnyBlock | null
  /** The page's remaining content, rendered after the testimonials. */
  children?: ReactNode
  header?: { primaryCta?: { label?: string | null; href?: string | null } | null } | null
  courses: CourseCardData[]
  schools: Lookup[]
  campuses: Lookup[]
  testimonials: TestimonialItem[]
  posts: Post[]
  counts: { courses: number; campuses: number; staff: number; schools: number }
}

/** `courses.featured` in `featuredOrder`; with none flagged, the first domestic courses so the section is never empty. */
export function pickFeatured(courses: CourseCardData[], n = 6): CourseCardData[] {
  const flagged = courses.filter((c) => c.featured).sort((a, b) => a.featuredOrder - b.featuredOrder || a.title.localeCompare(b.title))
  if (flagged.length) return flagged.slice(0, n)
  const domestic = courses.filter((c) => c.studentType !== 'international' && !c.slug.endsWith('-international'))
  return [...domestic.filter((c) => c.image), ...domestic.filter((c) => !c.image)].slice(0, n)
}

/** One photo per campus (the `campuses.image` lookup), linking to the campus page. Fixed 4:3 frames: no layout shift. */
function CampusStrip({ campuses }: { campuses: Lookup[] }) {
  const items = campuses.flatMap((c) => { const pic = pickSize(c.image, 'card'); return pic ? [{ c, pic }] : [] })
  if (items.length < 2) return null
  return (
    <Section anchorId="campuses">
      <SectionTitle eyebrow="Campuses" heading="Study in the *city* you choose" />
      <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {items.map(({ c, pic }) => (
          <li key={c.id}>
            <Link href={c.detailPath ?? '/campuses/'} className="group relative block aspect-[4/3] overflow-hidden rounded-card focus-visible:outline-2 focus-visible:outline-offset-2">
              <Image src={pic.url} alt={`${c.name} campus`} width={pic.width} height={pic.height} sizes="(min-width: 1024px) 22vw, 45vw" style={{ objectPosition: pic.position }} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" />
              <span className="display absolute bottom-4 left-4 text-2xl text-ink-foreground">{c.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

// 05 §4.4 Home: hero, featured courses, schools, why IHM (stats), testimonials, latest posts, CTA.
export function HomeView({ hero: ownHero, stats: ownStats, children, header, courses, schools, campuses, testimonials, posts, counts }: HomeData) {
  const featured = pickFeatured(courses)
  const contactHref = enquireHref(header?.primaryCta?.href)
  const heroImage = featured.find((c) => c.image)?.image ?? undefined

  const slides = Array.isArray(ownHero) ? ownHero : []
  const single = Array.isArray(ownHero) ? (ownHero.length === 1 ? ownHero[0] : null) : ownHero
  const hero: AnyBlock = (single ? { blockType: 'hero', ...single } : {
    blockType: 'hero',
    variant: 'split',
    eyebrow: HERO_FALLBACK.eyebrow,
    heading: HERO_FALLBACK.heading,
    subheading: heroSubheading(campuses.map((c) => c.name)),
    image: heroImage,
    ctas: [
      { label: 'Explore courses', href: '/courses/', style: 'primary' },
      { label: header?.primaryCta?.label || 'Enquire now', href: contactHref, style: 'secondary' },
    ],
  }) as AnyBlock

  const stats: AnyBlock = (ownStats ?? {
    blockType: 'stats', tone: 'card', spacing: 'default', heading: 'Why *IHM*',
    items: [
      { value: String(counts.courses), label: 'Courses' },
      { value: String(counts.campuses), label: 'Campuses' },
      { value: String(counts.schools), label: 'Schools' },
      { value: String(counts.staff), label: 'Academic and professional staff' },
    ].filter((i) => Number(i.value) > 0),
  }) as AnyBlock

  const schoolCards = schools
    .map((s) => ({ s, n: courses.filter((c) => c.school?.slug === s.slug).length }))
    .filter(({ n }) => n > 0)
    .map(({ s, n }) => ({ title: s.name, body: s.description ?? undefined, badge: `${n} ${n === 1 ? 'course' : 'courses'}`, href: s.detailPath ?? `/courses/?school=${s.slug}`, image: s.image }))

  return (
    <>
      {slides.length > 1 ? <HeroCarousel slides={slides} /> : <RenderBlocks blocks={[hero]} />}

      {featured.length > 0 && (
        <Section tone="muted" anchorId="featured-courses">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-12">
            <SectionTitle eyebrow="Courses" heading="Featured *courses*" className="" />
            <Button asChild variant="link"><Link href="/courses/">All courses <ArrowRight aria-hidden /></Link></Button>
          </div>
          <CardCarousel label="Featured courses">
            {featured.map((c) => <CourseCard key={c.id} course={c} />)}
          </CardCarousel>
        </Section>
      )}

      {schoolCards.length > 0 && (
        <RenderBlocks blocks={[{ blockType: 'cardGrid', heading: 'Study with our *schools*', columns: schoolCards.length >= 3 ? '3' : '2', variant: 'grid', cards: schoolCards } as AnyBlock]} />
      )}

      <RenderBlocks blocks={[stats]} />

      <CampusStrip campuses={campuses} />

      {testimonials.length > 0 && (
        <RenderBlocks blocks={[{ blockType: 'testimonials', tone: 'muted', heading: 'In their *words*', variant: 'carousel', inline: testimonials } as AnyBlock]} />
      )}

      {children}

      {posts.length > 0 && (
        <Section anchorId="latest-news">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-12">
            <SectionTitle eyebrow="News" heading="Latest *news*" className="" />
            <Button asChild variant="link"><Link href="/news/">All news <ArrowRight aria-hidden /></Link></Button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        </Section>
      )}

      <Banner
        heading="Ready to *start*?"
        body="Talk to our admissions team about the right course for you."
        links={[
          { label: header?.primaryCta?.label || 'Enquire now', href: contactHref, style: 'primary' },
          { label: 'Browse courses', href: '/courses/', style: 'light' },
        ]}
      />
    </>
  )
}
