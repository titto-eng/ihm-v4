// The School of Social Work pages (DEC-36), in the design of the School's own microsite: a dark hero with a photo card and the
// country lines, the School sub-navigation, then bands that alternate cream, warm-ink ("teal" on the microsite) and coral
// ("terracotta"), cards with an offset paper shadow, photo bands and numbered tiles. SswPage renders the 9 section pages (the
// conference has its own layout, ConferenceLayout), SswCareerPage the 13 career pages and SswEventPage the 13 event pages.
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, ChevronRight, Mail, MapPin, Plus, Ticket } from 'lucide-react'
import { Buttons, Inline, KitLink } from '@/components/page-kit/Kit'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd, faqLd } from '@/lib/seo/jsonld'
import { cn } from '@/lib/cn'
import {
  CAREER_PHOTO, SSW_BASE, SSW_CAREERS, SSW_HERO, SSW_NAV, eventPhoto,
  type SswBlock, type SswCareer, type SswEvent, type SswImage, type SswPageData,
} from '@/content/school-of-social-work'
import { CareerCards, EventCards, SswBlockView, isWide, paper, sswPhoto, type Tone } from './SswBlocks'
import { ConferenceNotice, ProgramTabs, StreamFilter } from './Conference.client'
import { SchoolNav } from './SchoolNav.client'

const SCHOOL = 'School of Social Work'
const isEyebrow = (b: SswBlock): b is { p: string; id?: string } => 'p' in b && b.p.length < 60 && /^[A-Z0-9][A-Z0-9 &·'’,.?:/–-]+$/.test(b.p)
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
type Crumb = { name: string; path: string }
type H2 = Extract<SswBlock, { h: number }>
type Sec = { id?: string; eyebrow?: string; head?: H2; blocks: SswBlock[] }

/** The microsite's "country lines": land and water lines drawn across the foot of the hero and above the footer. */
function CountryLines({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 92" preserveAspectRatio="none" className={cn('pointer-events-none absolute inset-x-0 h-14 w-full md:h-20', className)}>
      <path d="M-40 64C100 14 245 88 394 43S675 19 824 54s306 31 656-29" fill="none" stroke="hsl(38 83% 57%)" strokeWidth="1.6" opacity=".75" />
      <path d="M-32 78c168-43 277 20 430-8s279-48 438-10 338 31 646-6" fill="none" stroke="hsl(5 85% 63%)" strokeWidth="1.4" opacity=".6" />
      <path d="M-35 35c137 32 259-23 412 4s249 55 417 18 329-25 688 15" fill="none" stroke="hsl(38 83% 57%)" strokeWidth="1" strokeDasharray="10 8" opacity=".45" />
      <path d="M-20 88c193-20 280-5 443-29s279-14 421 10 319 7 616-27" fill="none" stroke="hsl(5 85% 63%)" strokeWidth="1" strokeDasharray="6 10" opacity=".35" />
    </svg>
  )
}

/** Concentric ripples behind the dark bands. */
function Ripples({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 600 600" className={cn('pointer-events-none absolute', className)}>
      {[60, 110, 160, 210, 260, 290].map((r) => <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="currentColor" strokeWidth="1" />)}
    </svg>
  )
}

/** "_words_" in a title are set in gold italics; without markers, the second sentence of a two-sentence title is. */
function Accent({ text }: { text: string }) {
  const marked = /_[^_]+_/.test(text) ? text : text.replace(/^([^.]+\.\s+)(.+)$/, (_, a: string, b: string) => `${a}_${b}_`)
  return <>{marked.split(/(_[^_]+_)/).map((part, i) => (part.startsWith('_') && part.endsWith('_') ? <em key={i} className="font-normal text-secondary italic">{part.slice(1, -1)}</em> : part))}</>
}

function Eyebrow({ children, tone = 'light' }: { children: ReactNode; tone?: Tone }) {
  return (
    <p className={cn('label-mono mb-4 flex items-center gap-3 text-[11px] tracking-[0.18em]', tone === 'light' ? 'text-primary-strong' : tone === 'dark' ? 'text-secondary' : 'text-ink-foreground/85')}>
      <span aria-hidden className={cn('h-0.5 w-8 shrink-0 rounded-full', tone === 'coral' ? 'bg-ink-foreground/70' : 'bg-brand-gradient')} />{children}
    </p>
  )
}

function Hero({ crumbs, eyebrow, title, lead, image, children }: { crumbs: Crumb[]; eyebrow?: string; title: string; lead?: string; image?: SswImage & { tag?: string; caption?: string }; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-glow pb-16 text-ink-foreground md:pb-24">
      <Ripples className="-top-40 -left-40 -z-10 w-[36rem] text-ink-foreground/[0.05]" />
      <div className={cn('mx-auto grid max-w-site items-center gap-10 px-5 pt-10 md:px-8 md:pt-14', image && 'lg:grid-cols-[1.05fr_0.95fr]')}>
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-foreground/60">
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight aria-hidden className="size-3.5" />}
                  {i < crumbs.length - 1 ? <Link href={c.path} className="hover:text-secondary hover:underline">{c.name}</Link> : <span aria-current="page" className="text-ink-foreground/90">{c.name}</span>}
                </li>
              ))}
            </ol>
          </nav>
          {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}
          <h1 className="display text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1.02] text-balance"><Accent text={title} /></h1>
          {lead && <p className="mt-6 max-w-xl [font-family:var(--font-display)] text-xl leading-relaxed text-ink-foreground/85"><Inline text={lead} /></p>}
          {children && <div className="mt-7 space-y-6">{children}</div>}
        </div>
        {image && (
          <figure className="relative">
            <span aria-hidden className="absolute -top-4 -right-4 size-24 rounded-2xl bg-primary/80" />
            <span aria-hidden className="absolute -bottom-4 -left-4 size-20 rounded-2xl bg-secondary/80" />
            <div className="relative overflow-hidden rounded-card shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)]">
              <Image src={sswPhoto(image.src)} alt={image.alt} width={1200} height={1000} priority sizes="(min-width:1024px) 45vw, 100vw" className="aspect-[6/5] w-full object-cover" />
              {(image.tag || image.caption) && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-6 pt-20">
                  {image.tag && <span className="flex items-center gap-2 text-xs text-ink-foreground/85"><span aria-hidden className="size-2 rounded-full bg-secondary" />{image.tag}</span>}
                  {image.caption && <span className="display mt-1 block text-2xl">{image.caption}</span>}
                </figcaption>
              )}
            </div>
          </figure>
        )}
      </div>
      <CountryLines className="bottom-0" />
    </section>
  )
}

const bandCls: Record<Tone | 'sand', string> = {
  light: 'bg-background',
  sand: 'bg-sand/60',
  dark: 'bg-ink-glow text-ink-foreground',
  coral: 'bg-coral-band text-ink-foreground',
}
const toneOf = (t?: string): Tone => (t === 'dark' ? 'dark' : t === 'coral' ? 'coral' : 'light')

type Run = { wide: boolean; blocks: SswBlock[] }
type ImgBlock = Extract<SswBlock, { img: string }>
const isImg = (b: SswBlock): b is ImgBlock => 'img' in b

/** Groups blocks into runs: consecutive reading blocks share a run, each wide block (cards, tables, grids) is its own run. */
function runsOf(blocks: SswBlock[]): Run[] {
  const runs: Run[] = []
  for (const b of blocks) {
    const wide = isWide(b)
    const last = runs[runs.length - 1]
    if (last && !last.wide && !wide) last.blocks.push(b)
    else runs.push({ wide, blocks: [b] })
  }
  return runs
}

const textCls = (tone: Tone) => cn('space-y-4 text-[16px] leading-relaxed', tone === 'light' ? 'text-foreground/85' : 'text-ink-foreground/85')
/** Rough reading length of a run, to decide whether a photo sits beside it centred (short text) or sticky at the top (long text). */
const lengthOf = (blocks: SswBlock[]) => JSON.stringify(blocks).length

/** A section photo with the School's offset colour block; sticky beside long text so the column never shows a hole. */
function SidePhoto({ photo, tone, sticky }: { photo: SswImage; tone: Tone; sticky?: boolean }) {
  return (
    <div className={cn('relative', sticky && 'lg:sticky lg:top-40')}>
      <span aria-hidden className={cn('absolute -right-3 -bottom-3 h-2/3 w-2/3 rounded-card', tone === 'light' ? 'bg-brand-gradient opacity-70' : 'bg-secondary/60')} />
      <Image src={sswPhoto(photo.src)} alt={photo.alt} width={1400} height={1000} sizes="(min-width:1024px) 45vw, 100vw" className={cn('relative w-full rounded-card', photo.natural ? 'h-auto bg-card' : 'aspect-[4/3] object-cover')} />
    </div>
  )
}

const photoOf = (b?: ImgBlock): SswImage | null => (b ? { src: b.img, alt: b.alt ?? '' } : null)

/** Text beside a photo: top-aligned with a sticky photo when the text is long, centred when it is short. */
function WithPhoto({ photo, tone, children, long }: { photo: SswImage; tone: Tone; children: ReactNode; long: boolean }) {
  return (
    <div className={cn('grid gap-10 lg:grid-cols-2 lg:gap-16', long ? 'items-start' : 'items-center')}>
      <div className="min-w-0">{children}</div>
      <SidePhoto photo={photo} tone={tone} sticky={long} />
    </div>
  )
}

/** Blocks in order: a reading run beside its photo (or the section photo `side`), wide blocks across the full width. */
/** `offset`: text without a photo sits in the right-hand column, under the section's opening text (heading-left layout). */
function Flow({ blocks, tone, side, offset }: { blocks: SswBlock[]; tone: Tone; side?: SswImage; offset?: boolean }) {
  const runs = runsOf(blocks)
  // The section photo goes beside the first reading run that has no photo of its own.
  const sideAt = side ? runs.findIndex((r) => !r.wide && !r.blocks.some(isImg) && r.blocks.length > 0) : -1
  return (
    <div className="space-y-10">
      {runs.map((r, i) => {
        if (r.wide) return <SswBlockView key={i} b={r.blocks[0]} tone={tone} />
        const rest = r.blocks.filter((b) => !isImg(b))
        const photo = photoOf(r.blocks.find(isImg)) ?? (i === sideAt && side ? side : null)
        if (photo && rest.length) {
          return (
            <WithPhoto key={i} photo={photo} tone={tone} long={lengthOf(rest) > 700}>
              <div className={textCls(tone)}>{rest.map((b, j) => <SswBlockView key={j} b={b} tone={tone} />)}</div>
            </WithPhoto>
          )
        }
        const body = r.blocks.map((b, j) => <SswBlockView key={j} b={b} tone={tone} />)
        // Text stays in the right-hand column until a full-width block (table, grid) has broken the column; after it, it runs full width.
        if (offset && !runs.slice(0, i).some((x) => x.wide) && !runs[i + 1]?.wide) return <div key={i} className="grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"><div aria-hidden /><div className={textCls(tone)}>{body}</div></div>
        if (runs.slice(0, i).some((x) => x.wide) && r.blocks[0] && 'h' in r.blocks[0]) {
          // A sub-heading after a grid opens a new part of the section (e.g. Fielda after the placement partners): a rule above it.
          return <div key={i} className={cn('border-t pt-12 lg:mt-6', tone === 'light' ? 'border-border' : 'border-ink-foreground/15')}><div className={cn(textCls(tone), 'max-w-4xl')}>{body}</div></div>
        }
        return <div key={i} className={cn(textCls(tone), 'max-w-3xl')}>{body}</div>
      })}
    </div>
  )
}

function SecHeader({ sec, tone, className }: { sec: Sec; tone: Tone; className?: string }) {
  if (!sec.eyebrow && !sec.head) return null
  return (
    <header className={className}>
      {sec.eyebrow && <Eyebrow tone={tone}>{sec.eyebrow}</Eyebrow>}
      {sec.head && <h2 className="display text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.05] text-balance"><Inline text={sec.head.t} /></h2>}
    </header>
  )
}

function Band({ sec, index }: { sec: Sec; index: number }) {
  const h = sec.head
  const tone = toneOf(h?.tone)
  const surface = bandCls[h?.tone === 'sand' ? 'sand' : tone]
  // A photo band: the photo fills one half, the text sits on warm ink beside it.
  if (h?.band) {
    return (
      <section id={sec.id} className="relative grid scroll-mt-[140px] bg-ink text-ink-foreground lg:grid-cols-2">
        <div className="relative min-h-[18rem] lg:min-h-[28rem]">
          <Image src={sswPhoto(h.band.src)} alt={h.band.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="relative flex flex-col justify-center overflow-hidden px-6 py-14 md:px-14">
          <Ripples className="-right-40 -bottom-40 w-[28rem] text-ink-foreground/[0.06]" />
          {sec.eyebrow && <Eyebrow tone="dark">{sec.eyebrow}</Eyebrow>}
          <h2 className="display text-4xl leading-tight md:text-5xl"><Inline text={h.t} /></h2>
          <div className="mt-6 max-w-md space-y-4 text-ink-foreground/80">{sec.blocks.map((b, j) => <SswBlockView key={j} b={b} tone="dark" />)}</div>
        </div>
      </section>
    )
  }
  // The opening reading run sits beside the heading (no photo: heading left, text right) or under it beside the photo;
  // wide blocks (cards, tables, grids) and later runs follow across the full width.
  const runs = runsOf(sec.blocks)
  const first = runs[0] && !runs[0].wide ? runs[0] : null
  let lead = first ? first.blocks.filter((b) => !isImg(b)) : []
  // A heading at the end of the opening run introduces the grid below it, so it moves down beside that grid.
  const tail: SswBlock[] = []
  while (lead.length > 1 && 'h' in lead[lead.length - 1]) tail.unshift(lead.pop()!)
  if (lead.length === 1 && 'h' in lead[0]) { tail.unshift(lead[0]); lead = [] }
  const leadPhoto = (first && photoOf(first.blocks.find(isImg))) || (first && h?.img) || null
  const later = [...tail, ...(first ? runs.slice(1) : runs).flatMap((r) => r.blocks)]
  const hasHeader = Boolean(sec.eyebrow || h)
  let top: ReactNode
  const split = !(leadPhoto && lead.length) && lead.length > 0 && hasHeader
  if (leadPhoto && lead.length) {
    top = (
      <WithPhoto photo={leadPhoto} tone={tone} long={lengthOf(lead) > 900}>
        <SecHeader sec={sec} tone={tone} className="mb-8" />
        <div className={textCls(tone)}>{lead.map((b, j) => <SswBlockView key={j} b={b} tone={tone} />)}</div>
      </WithPhoto>
    )
  } else if (lead.length && hasHeader) {
    top = (
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SecHeader sec={sec} tone={tone} className="lg:sticky lg:top-40 lg:self-start" />
        <div className={cn(textCls(tone), 'lg:pt-9')}>{lead.map((b, j) => <SswBlockView key={j} b={b} tone={tone} />)}</div>
      </div>
    )
  } else {
    top = (
      <>
        <SecHeader sec={sec} tone={tone} className="max-w-3xl" />
        {lead.length > 0 && <div className={cn(textCls(tone), 'max-w-3xl')}>{lead.map((b, j) => <SswBlockView key={j} b={b} tone={tone} />)}</div>}
      </>
    )
  }
  return (
    <section id={sec.id} data-index={index} className={cn('relative isolate scroll-mt-[140px] overflow-clip py-16 md:py-24', surface)}>
      {tone === 'dark' && <Ripples className="-top-32 -right-32 -z-10 w-[40rem] text-ink-foreground/[0.06]" />}
      {tone === 'coral' && <Ripples className="-bottom-48 -left-32 -z-10 w-[36rem] text-ink-foreground/[0.12]" />}
      <div className="mx-auto max-w-site px-5 md:px-8">
        {top}
        {later.length > 0 && <div className={cn(hasHeader || lead.length ? 'mt-12' : '')}><Flow blocks={later} tone={tone} side={leadPhoto && lead.length ? undefined : h?.img} offset={split} /></div>}
      </div>
    </section>
  )
}

const homeCrumbs = (): Crumb[] => [{ name: 'Home', path: '/' }, { name: SCHOOL, path: `${SSW_BASE}/` }]

/** Splits a page into hero blocks and h2 sections; an all-caps paragraph just before an h2 is that section's eyebrow. */
function parse(blocks: SswBlock[]) {
  const first = blocks.findIndex((b, i) => ('h' in b && b.h === 2) || (isEyebrow(b) && i > 1 && 'h' in (blocks[i + 1] ?? {}) && (blocks[i + 1] as H2).h === 2))
  const hero = first === -1 ? blocks : blocks.slice(0, first)
  const sections: Sec[] = []
  let pending: { p: string; id?: string } | null = null
  const cur = () => sections[sections.length - 1] ?? sections[sections.push({ blocks: [] }) - 1]
  for (const b of first === -1 ? [] : blocks.slice(first)) {
    if (isEyebrow(b)) { pending = b; continue }
    if ('h' in b && b.h <= 2) {
      sections.push({ id: pending?.id ?? b.id ?? slugify(b.t), eyebrow: pending?.p, head: b, blocks: [] })
      pending = null
      continue
    }
    if (pending) {
      // An eyebrow not followed by a heading is a sub-label inside the section.
      cur().blocks.push({ h: 4, t: pending.p })
      pending = null
    }
    cur().blocks.push(b)
  }
  return { hero, sections }
}

function heroParts(page: SswPageData, slug: string) {
  const { hero, sections } = parse(page.blocks)
  const h1 = hero.find((b): b is H2 => 'h' in b && b.h === 1)
  const eyebrow = hero.find(isEyebrow)?.p
  const afterH1 = h1 ? hero.slice(hero.indexOf(h1) + 1) : hero
  const leadBlock = afterH1.find((b): b is { p: string } => 'p' in b && !isEyebrow(b))
  const heroImg = hero.find((b): b is Extract<SswBlock, { img: string }> => 'img' in b)
  const image = heroImg ? { src: heroImg.img, alt: heroImg.alt ?? '', tag: heroImg.tag, caption: heroImg.caption } : SSW_HERO[slug]
  const extra = afterH1.filter((b) => b !== leadBlock && !('img' in b) && !isEyebrow(b))
  return { sections, title: h1?.t ?? page.title, eyebrow, lead: leadBlock?.p, image, extra }
}

export function SswPage({ slug, page }: { slug: string; page: SswPageData }) {
  if (slug === 'conference-2026') return <ConferenceLayout page={page} />
  const { sections, title, eyebrow, lead, image, extra } = heroParts(page, slug)
  const crumbs = slug ? [...homeCrumbs(), { name: SSW_NAV.find((n) => n.slug === slug)?.label ?? title, path: `${SSW_BASE}/${slug}/` }] : homeCrumbs()
  const faqs = page.blocks.flatMap((b) => ('faq' in b ? b.faq : []))
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      {faqs.length > 0 && <JsonLd data={faqLd(faqs.map(([question, answer]) => ({ question, answer: answer.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') })))} />}
      <Hero crumbs={crumbs} eyebrow={eyebrow} title={title} lead={lead} image={image}>
        {extra.map((b, i) => <SswBlockView key={i} b={b} tone="dark" />)}
      </Hero>
      <SchoolNav active={slug} />
      {sections.map((s, i) => <Band key={i} sec={s} index={i} />)}
    </>
  )
}

// ---- The conference -------------------------------------------------------------------------------------------------

const CONF_NAV: [string, string][] = [
  ['conference-about', 'Overview'], ['conference-program', 'Program'], ['conference-streams', 'Streams'], ['conference-abstracts', 'Abstracts'],
  ['conference-dates', 'Key dates'], ['conference-registration', 'Attend'], ['conference-contacts', 'Contact'],
]

const CONF_ASIDE: Record<string, string> = { 'conference-about': 'What to expect', 'conference-abstracts': 'Submission formats' }

function ConfHeading({ n, sec, tone }: { n: number; sec: Sec; tone: Tone }) {
  return (
    <header className="mb-10 max-w-4xl">
      <p className={cn('label-mono mb-3 flex items-center gap-3 text-[11px] tracking-[0.18em]', tone === 'light' ? 'text-muted-foreground' : 'text-ink-foreground/60')}>
        <span className={cn('grid size-8 place-items-center rounded-full text-[11px] font-semibold', tone === 'light' ? 'bg-primary/10 text-primary-strong' : 'bg-secondary/15 text-secondary')}>{String(n).padStart(2, '0')}</span>
        {sec.eyebrow}
      </p>
      <h2 className="display text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.05] text-balance">{sec.head?.t}</h2>
    </header>
  )
}

function ConferenceLayout({ page }: { page: SswPageData }) {
  const { sections, title, eyebrow, lead, image, extra } = heroParts(page, 'conference-2026')
  const crumbs = [...homeCrumbs(), { name: 'Conference 2026', path: `${SSW_BASE}/conference-2026/` }]
  const facts = sections[0]
  const factCards = facts.blocks.find((b): b is Extract<SswBlock, { cards: [string, string][] }> => 'cards' in b)?.cards ?? []
  const factBtns = facts.blocks.find((b): b is Extract<SswBlock, { btn: { t: string; href: string }[] }> => 'btn' in b)?.btn ?? []
  const factNote = facts.blocks.find((b): b is Extract<SswBlock, { note: string }> => 'note' in b)
  const rest = sections.slice(1)
  const faqs = page.blocks.flatMap((b) => ('faq' in b ? b.faq : []))
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      {faqs.length > 0 && <JsonLd data={faqLd(faqs.map(([question, answer]) => ({ question, answer })))} />}
      <ConferenceNotice image="/images/school-of-social-work/conference-2026/popup.webp" href={`${SSW_BASE}/conference-2026/IHM_SWC2026_Submission_Popup_Before_You_Begin.pdf`} alt="IHM Social Work Conference 2026: read the submission guidance before you begin." />
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <Ripples className="-top-40 -left-40 -z-10 w-[36rem] text-ink-foreground/[0.05]" />
        <div className="mx-auto grid max-w-site gap-10 px-5 pt-10 pb-14 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-foreground/60">
              <ol className="flex flex-wrap items-center gap-1">
                {crumbs.map((c, i) => <li key={c.path} className="flex items-center gap-1">{i > 0 && <ChevronRight aria-hidden className="size-3.5" />}{i < crumbs.length - 1 ? <Link href={c.path} className="hover:text-secondary">{c.name}</Link> : <span className="text-ink-foreground/90">{c.name}</span>}</li>)}
              </ol>
            </nav>
            {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}
            <h1 className="display text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.98]"><Accent text={title} /></h1>
            {lead && <p className="mt-6 max-w-xl [font-family:var(--font-display)] text-2xl leading-snug text-ink-foreground/90">{lead}</p>}
            <div className="mt-7 space-y-5">{extra.map((b, i) => <SswBlockView key={i} b={b} tone="dark" />)}</div>
          </div>
          {image && (
            <div className="relative mx-auto w-full max-w-sm">
              <span aria-hidden className="absolute -inset-3 rotate-2 rounded-card bg-secondary/30" />
              <Image src={sswPhoto(image.src)} alt={image.alt} width={1179} height={1742} priority sizes="24rem" className="relative h-auto w-full rounded-card shadow-2xl" />
            </div>
          )}
        </div>
        <CountryLines className="bottom-0 opacity-70" />
      </section>

      {/* Facts strip */}
      <section aria-label="Conference at a glance" className="bg-coral-band text-ink-foreground">
        {facts.head && (
          <div className="mx-auto flex max-w-site flex-wrap items-baseline gap-x-5 gap-y-1 px-5 pt-10 md:px-8">
            {facts.eyebrow && <p className="label-mono text-[11px] tracking-[0.18em] text-ink-foreground/80">{facts.eyebrow}</p>}
            <h2 className="display text-3xl md:text-4xl">{facts.head.t}</h2>
          </div>
        )}
        <div className={cn('mx-auto grid max-w-site gap-6 px-5 pb-10 sm:grid-cols-2 md:px-8 lg:grid-cols-4', facts.head ? 'pt-6' : 'pt-10')}>
          {factCards.map(([t, d], i) => (
            <div key={t} className="lg:border-l lg:border-ink-foreground/30 lg:pl-6">
              <p className="label-mono flex items-center gap-2 text-[11px] text-ink-foreground/80">{i === 0 ? <CalendarDays aria-hidden className="size-4" /> : <MapPin aria-hidden className="size-4" />}{t}</p>
              <p className="mt-2 font-semibold leading-snug">{d}</p>
            </div>
          ))}
          <div className="lg:border-l lg:border-ink-foreground/30 lg:pl-6">
            <p className="label-mono flex items-center gap-2 text-[11px] text-ink-foreground/80"><Ticket aria-hidden className="size-4" />Registration &amp; enquiries</p>
            <ul className="mt-2 space-y-1.5">
              {factBtns.map((b) => <li key={b.href}><KitLink href={b.href} className="inline-flex items-center gap-1.5 font-semibold underline decoration-ink-foreground/40 underline-offset-4 hover:decoration-ink-foreground">{/^mailto:/.test(b.href) ? <Mail aria-hidden className="size-4" /> : <ArrowRight aria-hidden className="size-4" />}{b.t}</KitLink></li>)}
            </ul>
          </div>
        </div>
        {factNote && <p className="mx-auto max-w-site px-5 pb-8 text-sm text-ink-foreground/90 md:px-8 [&_a]:text-ink-foreground [&_a]:decoration-ink-foreground/60"><Inline text={factNote.note} /></p>}
      </section>

      <nav aria-label="On this page" className="sticky top-[73px] z-30 border-b border-border bg-card/95 backdrop-blur">
        <ul className="mx-auto flex max-w-site gap-1 overflow-x-auto px-5 py-2 [scrollbar-width:none] md:justify-between md:px-8">
          {CONF_NAV.map(([id, label]) => <li key={id} className="shrink-0"><a href={`#${id}`} className="inline-flex rounded-full px-3 py-1.5 text-sm font-semibold text-foreground/75 hover:bg-blush hover:text-foreground">{label}</a></li>)}
        </ul>
      </nav>

      {rest.map((sec, i) => {
        const n = i + 1
        const program = sec.id === 'conference-program'
        const streams = sec.id === 'conference-streams'
        const dates = sec.id === 'conference-dates'
        const tone: Tone = program ? 'dark' : 'light'
        const surface = program ? 'bg-ink text-ink-foreground' : streams ? 'bg-sand/70' : n % 2 ? 'bg-background' : 'bg-card'
        if (program) {
          const days = sec.blocks.find((b): b is Extract<SswBlock, { schedule: unknown }> => 'schedule' in b)?.schedule ?? []
          const intro = sec.blocks.find((b): b is { p: string } => 'p' in b)
          return (
            <section key={sec.id} id={sec.id} className={cn('relative isolate scroll-mt-[140px] overflow-clip py-16 md:py-24', surface)}>
              <Ripples className="-right-40 -bottom-40 -z-10 w-[36rem] text-ink-foreground/[0.06]" />
              <div className="mx-auto max-w-site px-5 md:px-8">
                <ConfHeading n={n} sec={sec} tone={tone} />
                <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
                  <div>
                    <p className="display text-8xl leading-none text-secondary">{String(days.length).padStart(2, '0')}</p>
                    <p className="label-mono mt-2 text-[11px] text-secondary">Days</p>
                    {intro && <p className="mt-6 text-ink-foreground/80">{intro.p}</p>}
                    <a href="#conference-streams" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:text-secondary">Explore the streams<ArrowRight aria-hidden className="size-4" /></a>
                  </div>
                  <ProgramTabs days={days} />
                </div>
              </div>
            </section>
          )
        }
        if (streams) {
          const cards = sec.blocks.find((b): b is Extract<SswBlock, { cards: [string, string][] }> => 'cards' in b)?.cards ?? []
          const note = sec.blocks.find((b): b is Extract<SswBlock, { note: string }> => 'note' in b)
          return (
            <section key={sec.id} id={sec.id} className={cn('scroll-mt-[140px] py-16 md:py-24', surface)}>
              <div className="mx-auto max-w-site px-5 md:px-8">
                <ConfHeading n={n} sec={sec} tone="light" />
                <StreamFilter streams={cards} />
                {note && <p className="mt-6 text-sm text-foreground/70">{note.note}</p>}
              </div>
            </section>
          )
        }
        if (dates) {
          const rows = sec.blocks.find((b): b is Extract<SswBlock, { stats: [string, string, string?][] }> => 'stats' in b)?.stats ?? []
          return (
            <section key={sec.id} id={sec.id} className={cn('scroll-mt-[140px] py-16 md:py-24', surface)}>
              <div className="mx-auto max-w-site px-5 md:px-8">
                <ConfHeading n={n} sec={sec} tone="light" />
                <ol className="divide-y divide-border border-y border-border">
                  {rows.map(([date, label], k) => (
                    <li key={label} className={cn('grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-4', k === rows.length - 1 && 'text-primary-strong')}>
                      <span className="label-mono text-[11px] text-primary-strong">{String(k + 1).padStart(2, '0')}</span>
                      <span className="text-[15px]">{label}</span>
                      <span className="font-semibold">{date}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )
        }
        // About and Call for abstracts: the text beside a sand card holding the closing part (what to expect / formats and FAQ).
        const cut = CONF_ASIDE[sec.id ?? '']
        const at = cut ? sec.blocks.findIndex((b) => 'h' in b && b.t === cut) : -1
        return (
          <section key={sec.id} id={sec.id} className={cn('scroll-mt-[140px] py-16 md:py-24', surface)}>
            <div className="mx-auto max-w-site px-5 md:px-8">
              <ConfHeading n={n} sec={sec} tone="light" />
              {at > 0 ? (
                <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
                  <Flow blocks={sec.blocks.slice(0, at)} tone="light" />
                  <aside className="rounded-card border-t-4 border-secondary bg-sand/70 p-7 shadow-[10px_10px_0_0_hsl(38_83%_57%/0.3)] md:p-8">
                    <Flow blocks={sec.blocks.slice(at)} tone="light" />
                  </aside>
                </div>
              ) : <Flow blocks={sec.blocks} tone="light" />}
            </div>
          </section>
        )
      })}
    </>
  )
}

// ---- Careers and events --------------------------------------------------------------------------------------------

export function SswCareerPage({ career }: { career: SswCareer }) {
  const i = SSW_CAREERS.indexOf(career)
  const crumbs = [...homeCrumbs(), { name: 'Careers', path: `${SSW_BASE}/careers/` }, { name: career.heading.replace(/\.$/, ''), path: `${SSW_BASE}/careers/${career.slug}/` }]
  const related = [1, 2, 3].map((n) => SSW_CAREERS[(i + n) % SSW_CAREERS.length])
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Hero crumbs={crumbs} eyebrow="SOCIAL WORK CAREERS" title={career.heading} lead={career.lead} image={{ src: CAREER_PHOTO[career.slug], alt: `${career.heading.replace(/\.$/, '')}: social work practice` }} />
      <SchoolNav active="careers" />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-site px-5 md:px-8">
          <header className="mb-10 max-w-3xl"><Eyebrow>THE WORK</Eyebrow><h2 className="display text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.05]">What this practice looks like</h2></header>
          <div className="grid gap-6 md:grid-cols-2">
            {([['Day to day', career.dayToDay], ['Where you could work', career.whereYouWork]] as const).map(([h, items]) => (
              <article key={h} className={cn('rounded-card border border-border bg-card p-7', paper)}>
                <h3 className="display text-2xl">{h}</h3>
                <ul className="mt-5 divide-y divide-border">
                  {items.map((t) => <li key={t} className="flex gap-3 py-2.5 text-[15px]"><Plus aria-hidden className="mt-1 size-4 shrink-0 text-primary" />{t}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="relative isolate overflow-hidden bg-ink-glow py-16 text-ink-foreground md:py-24">
        <Ripples className="-top-32 -right-32 -z-10 w-[40rem] text-ink-foreground/[0.06]" />
        <div className="mx-auto max-w-site px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <header>
              <Eyebrow tone="dark">YOUR PATHWAY</Eyebrow>
              <h2 className="display text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.05] text-balance">Getting there with the IHM BSW</h2>
            </header>
            <div className="lg:pt-9">
              <p className="text-lg leading-relaxed text-ink-foreground/85">{career.pathway}</p>
              <div className="mt-8"><Buttons onDark items={[{ t: 'Explore the BSW', href: `${SSW_BASE}/study/` }, { t: 'All career areas', href: `${SSW_BASE}/careers/` }]} /></div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-site px-5 md:px-8">
          <header className="mb-10"><Eyebrow>RELATED AREAS</Eyebrow><h2 className="display text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.05]">Practice areas that connect</h2></header>
          <ul className="grid gap-6 sm:grid-cols-3">
            {related.map((c) => (
              <li key={c.slug}>
                <Link href={`${SSW_BASE}/careers/${c.slug}/`} className={cn('group flex h-full flex-col overflow-hidden rounded-card border border-border bg-card transition-transform hover:-translate-y-1', paper)}>
                  <span className="relative block aspect-[16/10] overflow-hidden"><Image src={CAREER_PHOTO[c.slug]} alt="" fill sizes="(min-width:640px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className="display text-xl">{c.heading.replace(/\.$/, '')}</span>
                    <span className="mt-2 line-clamp-2 text-sm text-foreground/75">{c.lead}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary-strong">Explore<ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" /></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

/** Gallery photos (3 columns) that span two columns so the last row is full (with 3k photos the first is also two rows high). */
const wideAt = (n: number) => (n % 3 === 1 ? [0, n - 1] : [0])

export function SswEventPage({ event }: { event: SswEvent }) {
  const crumbs = [...homeCrumbs(), { name: 'Life at School of Social Work', path: `${SSW_BASE}/life/` }, { name: event.title, path: `${SSW_BASE}/events/${event.slug}/` }]
  const photos = Array.from({ length: event.photos }, (_, n) => eventPhoto(event.slug, n + 1))
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Hero crumbs={crumbs} eyebrow="ACTIVITIES & EVENTS" title={event.title} lead={event.summary} image={{ src: photos[0], alt: `${event.title} at IHM Melbourne`, tag: 'IHM Melbourne', caption: `${event.photos} photos from the day` }} />
      <SchoolNav active="life" />
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-site items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Eyebrow>THE STORY</Eyebrow>
            <h2 className="display text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.05]">Learning, connection and community</h2>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-foreground/85">{event.story.map((p) => <p key={p}>{p}</p>)}</div>
            <div className="mt-8"><Buttons items={[{ t: 'Back to Life at School of Social Work', href: `${SSW_BASE}/life/` }]} /></div>
          </div>
          {photos[1] && (
            <div className="relative">
              <span aria-hidden className="bg-brand-gradient absolute -right-3 -bottom-3 h-2/3 w-2/3 rounded-card opacity-70" />
              <Image src={photos[1]} alt={`${event.title} event highlight`} width={1280} height={960} sizes="(min-width:1024px) 45vw, 100vw" className="relative aspect-[4/3] w-full rounded-card object-cover" />
            </div>
          )}
        </div>
      </section>
      <section className="bg-ink py-16 text-ink-foreground md:py-24">
        <div className="mx-auto max-w-site px-5 md:px-8">
          <Eyebrow tone="dark">EVENT GALLERY</Eyebrow>
          <h2 className="display mb-10 text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.05]">Moments from the day</h2>
          <ul className="grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[13rem] md:grid-cols-3 md:gap-4 lg:auto-rows-[15rem]">
            {photos.map((src, n) => (
              <li key={n} className={cn('overflow-hidden rounded-2xl', wideAt(photos.length).includes(n) && 'md:col-span-2', n === 0 && photos.length % 3 === 0 && 'md:row-span-2')}>
                <a href={src} target="_blank" rel="noopener" className="group relative block size-full">
                  <Image src={src} alt={`${event.title} - gallery photo ${n + 1} of ${photos.length}`} fill sizes="(min-width:768px) 40vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-site px-5 md:px-8">
          <Eyebrow>MORE FROM THE SCHOOL</Eyebrow>
          <h2 className="display mb-10 text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.05]">Other activities and events</h2>
          <EventCards exclude={event.slug} limit={3} />
          <div className="mt-10"><Buttons items={[{ t: 'All activities and events', href: `${SSW_BASE}/life/#learning-beyond-the-classroom` }]} /></div>
        </div>
      </section>
    </>
  )
}

export { CareerCards }
