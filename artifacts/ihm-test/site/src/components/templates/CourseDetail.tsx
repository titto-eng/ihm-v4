import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ChevronRight, MessageCircle, Phone } from 'lucide-react'
import { hasBrochure } from '@/lib/courses/brochure'
import type { Course } from '@/payload-types'
import { CtaLink, type CtaItem } from '@/components/CtaLink'
import { CourseJsonLd } from '@/components/seo/Course'
import { CourseFacts, hasCourseFacts } from '@/components/course/CourseFacts'
import { RenderBlocks, type AnyBlock } from '@/components/RenderBlocks'
import { namesOf } from '@/components/templates/courseContext'
import { HeroRays } from '@/blocks/hero/Component'
import { AudienceSwitch } from '@/components/audience/AudienceSwitch'
import { mediaOf } from '@/components/blocks/media'
import { courseImage } from '@/content/course-images'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'
import type { BlockCtx } from '@/blocks/types'
import { groupVideoRuns } from '@/blocks/testimonials/video'

type Slot = 'overview' | 'entry' | 'structure' | 'careers' | 'placements' | 'pathways' | 'faq' | 'fees' | 'additional'
type CourseSection = NonNullable<Course['sections']>[number]

// BON order (05-design-system §4.4 CourseDetail): pathways -> overview -> placements -> curriculum -> admissions -> fees -> careers -> FAQ.
const ORDER: Slot[] = ['pathways', 'overview', 'placements', 'structure', 'entry', 'fees', 'careers', 'faq', 'additional']
const EYEBROW: Record<Slot, string> = {
  pathways: 'Pathways', overview: 'About the course', placements: 'Placements', structure: 'Curriculum', entry: 'Admissions',
  fees: 'Fees and dates', careers: 'Careers', faq: 'Questions', additional: 'More information',
}

type Props = {
  course: Course
  /** `courseShared.layout` (DEC-22), rendered after the course's own blocks. */
  shared?: AnyBlock[] | null
  /** The other-audience page of the same course (domestic <-> international), when it exists. */
  sibling?: { label: string; path: string } | null
}

/** True when a block of `type` appears anywhere in `blocks` (sections, tabs, accordions). */
const hasBlock = (blocks: unknown, type: string): boolean =>
  Array.isArray(blocks) &&
  blocks.some((b) => {
    if (!b || typeof b !== 'object') return false
    const o = b as { blockType?: string; tabs?: { blocks?: unknown }[]; items?: { blocks?: unknown }[] }
    return o.blockType === type || o.tabs?.some((t) => hasBlock(t.blocks, type)) || o.items?.some((i) => hasBlock(i.blocks, type)) || false
  })

const first = (names: string[]) => names[0] ?? null

/** "Master of Nursing (Online)" → ["Master of", "Nursing (Online)"]: the last word (with a trailing bracket group) is the accent. */
function splitTitle(title: string): [string, string] {
  const m = /^(.*?)(\S+(?:\s*\([^)]*\))?)$/.exec(title.trim())
  return m && m[1] ? [m[1], m[2]] : ['', title]
}

const btn = 'inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold transition-colors'

// Course page (courses collection, /courses/<slug>/): sunrise hero with the course photo and the animated IHM sun, key facts as cards,
// a sticky section bar, the course sections beside a sticky "at a glance" card, then fees and dates, related courses, the shared
// blocks, the enquiry form and a closing band. Bachelor of Nursing and GCAN – Australian Nursing Practice have bespoke route files.
export function CourseDetail({ course, shared, sibling }: Props) {
  const ctx: BlockCtx = { depth: 0, course }
  const nested: BlockCtx = { depth: 1, course }
  const sections = (course.sections ?? []) as CourseSection[]
  const bySlot = new Map<Slot, CourseSection>(sections.map((s) => [s.slot as Slot, s]))
  const allLayouts = sections.map((s) => s.layout)
  const ensure = (type: string) => !allLayouts.some((l) => hasBlock(l, type))

  const ctas: CtaItem[] = [
    ...(course.applyLink ? [{ label: 'Apply now', href: course.applyLink, style: 'primary' as const }] : []),
    { label: 'Enquire now', href: '#quickContact', style: course.applyLink ? ('secondary' as const) : ('primary' as const) },
  ]
  const school = first(namesOf([course.school]))
  const category = first(namesOf(course.categories))
  const hero = mediaOf(course.heroImage)
  const photo = hero ? { src: hero.url as string, alt: hero.alt || course.title } : courseImage(course.slug)
  const [lead, accent] = splitTitle(course.title)

  // the section bar only lists slots the course has
  const present = ORDER.filter((slot) => bySlot.get(slot)?.layout?.length)
  const nav = present.map((slot, i) => ({ slot, n: i + 1, label: bySlot.get(slot)?.title || EYEBROW[slot] }))

  const data = (type: string, extra: Record<string, unknown> = {}): AnyBlock => ({ blockType: type, ...extra }) as AnyBlock
  const dataBlocks = (c: BlockCtx, ...types: AnyBlock[]) => <RenderBlocks blocks={types} ctx={c} />

  const renderSection = (slot: Slot) => {
    const s = bySlot.get(slot)
    if (!s?.layout?.length) return null
    const n = present.indexOf(slot) + 1
    return (
      <section key={slot} id={`section-${slot}`} className="scroll-mt-36 border-b border-border py-12 first:pt-4 last:border-b-0" data-course-slot={slot}>
        <header className="mb-8 flex items-start gap-4">
          <span aria-hidden className="bg-brand-gradient display grid size-12 shrink-0 place-items-center rounded-2xl text-lg text-foreground shadow-sm">{String(n).padStart(2, '0')}</span>
          <div>
            <p className="label-mono text-[11px] tracking-widest text-primary-strong">{EYEBROW[slot]}</p>
            <h2 className="display mt-1 text-[clamp(1.8rem,3.2vw,2.6rem)] leading-tight">{s.title || EYEBROW[slot]}</h2>
          </div>
        </header>
        <div className="space-y-6">
          {/* consecutive student videos render as one testimonials carousel, not a stack of players (DEC-71) */}
          <RenderBlocks blocks={groupVideoRuns(s.layout as AnyBlock[]) as AnyBlock[]} ctx={nested} />
        </div>
      </section>
    )
  }

  // fees region: the course's fee fields, the start dates when switched on (DEC-7), and the census table (the live default)
  const feesRegion = (
    <div className="space-y-6">
      {ensure('feesTable') && dataBlocks(nested, data('feesTable'))}
      {course.showStartDates && ensure('startDates') && dataBlocks(nested, data('startDates', { mode: 'all' }))}
      {ensure('censusDates') && dataBlocks(nested, data('censusDates'))}
    </div>
  )

  return (
    <article className="pb-20 lg:pb-0" data-course={course.slug}>
      {/* ---------- hero ---------- */}
      <section data-tone="sunrise" className="bg-brand-wash relative isolate overflow-hidden border-b border-border">
        <HeroRays id="course-rays" className="-top-24 -left-28 -z-10 w-[26rem] opacity-[0.14] md:w-[34rem]" />
        <div className="mx-auto grid max-w-site gap-10 px-5 pt-8 pb-12 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-10 lg:pb-16">
          <div className="animate-rise min-w-0">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-primary-strong">Home</Link></li>
                <li aria-hidden><ChevronRight className="size-3.5" /></li>
                <li><Link href="/courses/" className="hover:text-primary-strong">Courses</Link></li>
                {course.school && typeof course.school === 'object' && (
                  <>
                    <li aria-hidden><ChevronRight className="size-3.5" /></li>
                    <li><Link href={`/courses/?school=${course.school.slug}`} className="hover:text-primary-strong">{course.school.name}</Link></li>
                  </>
                )}
              </ol>
            </nav>
            <p className="label-mono flex flex-wrap items-center gap-2 text-[11px] tracking-widest text-primary-strong">
              <span aria-hidden className="bg-brand-gradient h-0.5 w-8 rounded-full" />{[school, category && category !== school ? category : null].filter(Boolean).join(' · ') || 'Course'}
            </p>
            <h1 className="display mt-4 text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[1.03] text-balance">
              {lead}<em className="text-primary-strong italic">{accent}</em>
            </h1>
            {course.excerpt && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{course.excerpt}</p>}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {course.applyLink && <a href={course.applyLink} className={cn(btn, 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary-strong')}>Apply now<ArrowUpRight aria-hidden className="size-4" /></a>}
              <a href="#quickContact" className={cn(btn, course.applyLink ? 'border border-foreground/20 bg-card hover:border-primary' : 'bg-primary text-primary-foreground hover:bg-primary-strong')}>Enquire now</a>
              {nav.length > 0 && <a href={`#section-${nav[0].slot}`} className="inline-flex items-center gap-1.5 px-2 font-semibold text-primary-strong hover:underline">Explore the course<ArrowRight aria-hidden className="size-4" /></a>}
            </div>
            {course.studentType === 'both' && <AudienceSwitch className="mt-6" />}
            {sibling && (
              <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted-foreground">Show me details for</span>
                <span className="rounded-full bg-foreground px-4 py-1.5 font-semibold text-background">{course.studentType === 'international' ? 'International' : 'Domestic'}</span>
                <Link href={sibling.path} className="rounded-full border border-border bg-card px-4 py-1.5 font-semibold hover:border-primary hover:text-primary-strong">{sibling.label}</Link>
              </div>
            )}
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden className="bg-brand-gradient absolute -inset-3 -z-10 rotate-2 rounded-[2.4rem] opacity-25 blur-xl" />
            <div className="relative aspect-[4/4.4] overflow-hidden rounded-[2rem] border-4 border-card shadow-2xl">
              <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover transition-transform duration-[2s] hover:scale-105" />
            </div>
            {school && (
              <p className="absolute -bottom-4 left-6 rounded-2xl bg-ink px-4 py-2.5 text-sm font-semibold text-ink-foreground shadow-xl">
                <span className="text-secondary">{school}</span>{course.studentType && course.studentType !== 'both' ? ` · ${course.studentType === 'international' ? 'International' : 'Domestic'} students` : ''}
              </p>
            )}
          </div>
        </div>
        {ensure('courseFacts') && hasCourseFacts(course) && (
          <div className="mx-auto max-w-site px-5 pb-10 md:px-8" data-course-block="courseFacts">
            <CourseFacts course={course} variant="cards" />
          </div>
        )}
      </section>

      {/* ---------- section bar ---------- */}
      {nav.length > 1 && (
        <nav aria-label="On this page" className="sticky top-[72px] z-30 hidden border-b border-border bg-background/90 backdrop-blur lg:block">
          <ul className="mx-auto flex w-full max-w-site gap-1 overflow-x-auto px-8 py-2 text-sm">
            {nav.map((n) => (
              <li key={n.slot}>
                <a href={`#section-${n.slot}`} className="group flex items-center gap-2 rounded-full px-4 py-2 font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-blush hover:text-primary-strong">
                  <span className="label-mono text-[10px] text-primary-strong/70 group-hover:text-primary-strong">{String(n.n).padStart(2, '0')}</span>{n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* ---------- sections + at-a-glance ---------- */}
      <div className="mx-auto grid max-w-site gap-10 px-5 py-10 md:px-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="min-w-0">
          {ORDER.map((slot) => (
            <div key={slot}>
              {renderSection(slot)}
              {slot === 'fees' && feesRegion}
            </div>
          ))}
        </div>
        <aside className="lg:sticky lg:top-36" aria-label="Course at a glance">
          <div className="relative isolate overflow-hidden rounded-card bg-ink p-6 text-ink-foreground shadow-xl">
            <HeroRays id="glance-rays" className="-top-16 -right-16 -z-10 w-48 opacity-[0.12]" />
            <p className="label-mono text-[11px] tracking-widest text-secondary">At a glance</p>
            <p className="display mt-1 text-2xl leading-tight">{course.title}</p>
            {hasCourseFacts(course) && <CourseFacts course={course} variant="compact" className="mt-4" />}
            <div className="mt-6 flex flex-col gap-2">
              {course.applyLink && <a href={course.applyLink} className={cn(btn, 'justify-center bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground')}>Apply now<ArrowUpRight aria-hidden className="size-4" /></a>}
              <a href="#quickContact" className={cn(btn, 'justify-center border border-ink-foreground/25 hover:border-secondary hover:text-secondary')}><MessageCircle aria-hidden className="size-4" />Enquire now</a>
            </div>
            {site.phone && (
              <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="mt-5 flex items-center gap-3 rounded-2xl bg-ink-foreground/5 p-3 text-sm hover:bg-ink-foreground/10">
                <span className="grid size-9 place-items-center rounded-full bg-secondary text-secondary-foreground"><Phone aria-hidden className="size-4" /></span>
                <span><span className="block text-xs text-ink-foreground/60">Talk to a course advisor</span><span className="font-semibold">{site.phone}</span></span>
              </a>
            )}
          </div>
          {hasBrochure(course) && ensure('brochureDownload') && <div className="mt-4">{dataBlocks(nested, data('brochureDownload', { spacing: 'none' }))}</div>}
        </aside>
      </div>

      {ensure('courseManagers') && dataBlocks(ctx, data('courseManagers'))}
      {ensure('relatedCourses') && dataBlocks(ctx, data('relatedCourses', { limit: 6 }))}
      {shared?.length ? <RenderBlocks blocks={shared} ctx={ctx} /> : null}
      <RenderBlocks
        blocks={[
          data('enquiryForm', { formKey: 'quick-enquiry', heading: 'Enquire about this course', variant: 'card', anchorId: 'quickContact', tone: 'muted' }),
          data('cta', { heading: `Ready to *start*?`, body: course.title, variant: 'banner', tone: 'ink', links: ctas }),
        ]}
        ctx={ctx}
      />

      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
        {ctas.map((c) => (
          <div key={c.href} className="flex-1 [&_a]:w-full"><CtaLink cta={c} /></div>
        ))}
      </div>
      <CourseJsonLd course={course} />
    </article>
  )
}
