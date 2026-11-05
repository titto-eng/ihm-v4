// Renders the blocks of a School of Social Work page (src/content/school-of-social-work, DEC-36) as JSX in the site design.
// `tone` is the band the block sits on (light cream, dark warm ink, coral); cards, numbers and links adapt to it.
import type React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Images, Plus, Quote } from 'lucide-react'
import { Buttons, Inline, KitFaq, KitLink, KitTable } from '@/components/page-kit/Kit'
import { VideoGallery } from '@/components/media/VideoGallery.client'
import { FieldaShowcase } from './FieldaShowcase.client'
import { legacyImage } from '@/lib/legacy-image'
import { cn } from '@/lib/cn'
import { CAREER_PHOTO, SSW_BASE, SSW_CAREERS, SSW_EVENTS, eventPhoto, sswLocalImage, type SswBlock } from '@/content/school-of-social-work'

export type Tone = 'light' | 'dark' | 'coral'

/** Local path of a microsite image (all are in public/images/school-of-social-work/). */
export const sswPhoto = (src: string) => sswLocalImage(src)
/** The image when it is in public/, otherwise null (portraits and logos render a text stand-in). */
const present = (src: string) => legacyImage(src, '') || null

const initials = (name: string) => name.replace(/^(Prof|Dr|Ms|Mr|Mrs)\.?\s+/i, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
/** Microsite photo slugs whose portrait in public/images/people/ has another name. */
const PORTRAIT: Record<string, string> = { 'abraham-francis': 'abraham-p-francis' }
export const portraitOf = (slug: string) => present(`/images/people/${PORTRAIT[slug] ?? slug}.webp`)

/** The offset "paper" shadow of the School's cards. */
export const paper = 'shadow-[10px_10px_0_0_var(--color-sand)]'
const card = (tone: Tone) =>
  tone === 'dark' ? 'bg-ink-foreground/[0.06] ring-1 ring-ink-foreground/15 text-ink-foreground'
    : tone === 'coral' ? 'bg-card text-foreground shadow-[10px_10px_0_0_hsl(5_72%_40%/0.35)]'
      : cn('border border-border bg-card', paper)
const accent = (tone: Tone) => (tone === 'light' ? 'text-primary-strong' : 'text-secondary')
const soft = (tone: Tone) => (tone === 'light' ? 'text-foreground/75' : 'text-ink-foreground/80')

/** Blocks that need the full content width; the rest read in a narrower column. */
export const isWide = (b: SswBlock) =>
  ['stats', 'cards', 'links', 'people', 'tree', 'quotes', 'videos', 'events', 'gallery', 'partners', 'faq', 'schedule', 'table', 'logos', 'pubs', 'pillars', 'audiences'].some((k) => k in b)

/** A card grid whose last row is centred (no lone card hugging the left edge). */
export function CenteredGrid({ cols = 3, className, children }: { cols?: 2 | 3; className?: string; children: React.ReactNode }) {
  return <ul className={cn('flex flex-wrap justify-center gap-5', '[&>li]:w-full sm:[&>li]:w-[calc((100%-1.25rem)/2)]', cols === 3 ? 'md:[&>li]:w-[calc((100%-2.5rem)/3)]' : 'md:[&>li]:w-[calc((100%-1.25rem)/2)]', className)}>{children}</ul>
}

/** With 3k+1 cards the first one is featured across the row, so every row is full. */
const featured = (n: number) => n % 3 === 1

export function CareerCards({ exclude, limit }: { exclude?: string; limit?: number }) {
  const list = SSW_CAREERS.filter((c) => c.slug !== exclude).slice(0, limit)
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((c, k) => {
        const big = k === 0 && featured(list.length)
        return (
        <li key={c.slug} className={cn(big && 'sm:col-span-2 lg:col-span-3')}>
          <Link href={`${SSW_BASE}/careers/${c.slug}/`} className={cn('group flex h-full flex-col overflow-hidden rounded-card border border-border bg-card transition-all duration-300 hover:-translate-y-1', big && 'lg:flex-row', paper)}>
            <span className={cn('relative block aspect-[16/10] overflow-hidden bg-muted', big && 'lg:aspect-auto lg:min-h-[20rem] lg:w-[58%] lg:shrink-0')}>
              <Image src={CAREER_PHOTO[c.slug]} alt="" fill sizes={big ? '(min-width:1024px) 55vw, 100vw' : '(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw'} className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <span className="label-mono absolute bottom-3 left-4 text-[11px] text-ink-foreground">{String(SSW_CAREERS.indexOf(c) + 1).padStart(2, '0')} / 13</span>
            </span>
            <span className={cn('flex flex-1 flex-col p-6', big && 'lg:justify-center lg:p-10')}>
              {big && <span className="label-mono mb-3 hidden text-[11px] text-primary-strong lg:block">Featured area of practice</span>}
              <span className={cn('display text-xl', big && 'lg:text-3xl')}>{c.heading.replace(/\.$/, '')}</span>
              <span className={cn('mt-2 text-sm text-foreground/75', big ? 'line-clamp-3 lg:line-clamp-none lg:text-base' : 'line-clamp-3')}>{c.lead}</span>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary-strong">Explore the area<ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </span>
          </Link>
        </li>
        )
      })}
    </ul>
  )
}

export function EventCards({ exclude, limit }: { exclude?: string; limit?: number }) {
  const list = SSW_EVENTS.filter((e) => e.slug !== exclude).slice(0, limit)
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((e, k) => {
        const big = k === 0 && featured(list.length)
        return (
        <li key={e.slug} className={cn(big && 'sm:col-span-2 lg:col-span-3')}>
          <Link href={`${SSW_BASE}/events/${e.slug}/`} className={cn('group flex h-full flex-col overflow-hidden rounded-card border border-border bg-card transition-all duration-300 hover:-translate-y-1', big && 'lg:flex-row', paper)}>
            <span className={cn('grid aspect-[4/3] grid-cols-[2fr_1fr] grid-rows-2 gap-0.5 overflow-hidden bg-ink', big && 'lg:aspect-auto lg:min-h-[22rem] lg:w-[58%] lg:shrink-0')}>
              {[1, 2, 3].map((n) => (
                <span key={n} className={cn('relative overflow-hidden', n === 1 && 'row-span-2')}>
                  <Image src={eventPhoto(e.slug, n)} alt={n === 1 ? `${e.title} at IHM Melbourne` : ''} fill sizes={n === 1 ? '(min-width:1024px) 20vw, 60vw' : '15vw'} className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
              ))}
            </span>
            <span className={cn('flex flex-1 flex-col p-6', big && 'lg:justify-center lg:p-10')}>
              <span className="label-mono flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{String(SSW_EVENTS.indexOf(e) + 1).padStart(2, '0')} / IHM Melbourne</span>
                <span className="inline-flex items-center gap-1"><Images aria-hidden className="size-3.5" />{e.photos} photos</span>
              </span>
              <span className={cn('display mt-2 text-xl', big && 'lg:text-3xl')}>{e.title}</span>
              <span className={cn('mt-2 text-sm text-foreground/75', big && 'lg:text-base')}>{e.summary}</span>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary-strong">View the story<ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </span>
          </Link>
        </li>
        )
      })}
    </ul>
  )
}

export function SswBlockView({ b, tone = 'light' }: { b: SswBlock; tone?: Tone }) {
  const dark = tone !== 'light'
  if ('h' in b) {
    return b.h <= 3
      ? <h3 className="display pt-2 text-2xl"><Inline text={b.t} /></h3>
      : <h4 className={cn('label-mono pt-2 text-[11px] tracking-[0.16em]', accent(tone))}><Inline text={b.t} /></h4>
  }
  if ('p' in b) return <p><Inline text={b.p} /></p>
  if ('ul' in b || 'ol' in b) {
    const items = 'ul' in b ? b.ul : b.ol
    const Tag = 'ol' in b ? 'ol' : 'ul'
    return (
      <Tag className={cn('grid divide-y', dark ? 'divide-ink-foreground/15' : 'divide-border')}>
        {items.map((t, n) => (
          <li key={n} className="flex gap-3 py-2.5">
            {'ol' in b
              ? <span className="bg-brand-gradient mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold text-foreground">{n + 1}</span>
              : <Plus aria-hidden className={cn('mt-1 size-4 shrink-0', accent(tone))} />}
            <span><Inline text={t} /></span>
          </li>
        ))}
      </Tag>
    )
  }
  if ('table' in b) return <div className={cn('text-foreground', dark && 'shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]')}><KitTable rows={b.table} /></div>
  if ('img' in b) {
    return <Image src={sswPhoto(b.img)} alt={b.alt ?? ''} width={1400} height={900} sizes="(min-width:1024px) 50vw, 100vw" className={cn('h-auto w-full rounded-card', tone === 'light' && paper)} />
  }
  if ('btn' in b) return <Buttons items={b.btn} onDark={dark} />
  if ('chips' in b) {
    return (
      <ul className="flex flex-wrap gap-2">
        {b.chips.map((c) => <li key={c} className={cn('rounded-full px-3.5 py-1.5 text-sm font-medium', dark ? 'bg-ink-foreground/10 text-ink-foreground ring-1 ring-ink-foreground/20' : 'border border-primary/25 bg-card text-foreground')}>{c}</li>)}
      </ul>
    )
  }
  if ('note' in b) return <p className={cn('border-l-2 border-secondary pl-4 text-sm', soft(tone))}><Inline text={b.note} /></p>
  if ('quote' in b) {
    return (
      <blockquote className="relative my-2 rounded-card bg-blush p-6 text-foreground md:p-8">
        <Quote aria-hidden className="absolute -top-3 left-6 size-8 rounded-full bg-primary p-1.5 text-primary-foreground" />
        <p className="display text-2xl leading-snug md:text-3xl"><Inline text={b.quote} /></p>
      </blockquote>
    )
  }
  if ('stats' in b) {
    const cols = b.stats.length >= 4 ? 'grid-cols-2 lg:grid-cols-4' : b.stats.length === 3 ? 'sm:grid-cols-3' : b.stats.length === 2 ? 'sm:grid-cols-2' : ''
    return (
      <dl className={cn('grid gap-5', cols)}>
        {b.stats.map(([value, label, note]) => (
          <div key={value + label} className={cn('rounded-card p-6', card(tone))}>
            <dt className="sr-only">{label}</dt>
            <dd className={cn('display text-4xl leading-none md:text-5xl', tone === 'coral' ? 'text-primary-strong' : accent(tone))}>{value}</dd>
            <dd className="mt-3 text-[15px] leading-snug">{label}</dd>
            {note && <dd className={cn('mt-1 text-xs', tone === 'dark' ? 'text-ink-foreground/65' : 'text-muted-foreground')}>{note}</dd>}
          </div>
        ))}
      </dl>
    )
  }
  if ('cards' in b) {
    const cols = b.cards.length % 3 === 0 || b.cards.length > 4 ? 3 : 2
    // On a dark band the cards are coral (the School's "competent, confident, compassionate" tiles).
    return (
      <CenteredGrid cols={cols}>
        {b.cards.map(([title, body], i) => (
          <li key={title + body} className={cn('relative overflow-hidden rounded-card p-7', tone === 'dark' ? 'bg-coral-band text-ink-foreground' : card(tone))}>
            {tone !== 'dark' && <span aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 h-1" />}
            <p className={cn('label-mono text-[11px]', tone === 'dark' ? 'text-ink-foreground/75' : 'text-muted-foreground')}>{String(i + 1).padStart(2, '0')}</p>
            <p className="display mt-3 text-2xl">{title}</p>
            <p className={cn('mt-2 text-[15px] leading-relaxed', tone === 'dark' ? 'text-ink-foreground/90' : 'text-foreground/75')}><Inline text={body} /></p>
          </li>
        ))}
      </CenteredGrid>
    )
  }
  if ('pillars' in b) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        {b.pillars.map((p, i) => (
          <article key={p.n} className={cn('relative overflow-hidden rounded-card p-8 md:p-10', i === 0 ? 'bg-ink-glow text-ink-foreground' : cn('border border-border border-t-4 border-t-primary bg-card', paper))}>
            <div className="flex items-start gap-5">
              <span className={cn('display text-5xl leading-none', i === 0 ? 'text-secondary' : 'text-primary')}>{p.n}</span>
              <div>
                <p className={cn('label-mono text-[11px] tracking-[0.16em]', i === 0 ? 'text-secondary' : 'text-primary-strong')}>{p.label}</p>
                <h3 className={cn('display mt-3 text-2xl leading-snug md:text-3xl', i === 1 && 'text-primary-strong')}>{p.title}</h3>
              </div>
            </div>
            <div className={cn('mt-6 space-y-3 text-[15px] leading-relaxed', i === 0 ? 'text-ink-foreground/80' : 'text-foreground/80')}>{p.body.map((t) => <p key={t}><Inline text={t} /></p>)}</div>
            {p.items && (
              <dl className="mt-6 divide-y divide-border border-y border-border">
                {p.items.map(([t, d]) => (
                  <div key={t} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-primary-strong">{t}</dt>
                    <dd className="text-sm text-foreground/75">{d}</dd>
                  </div>
                ))}
              </dl>
            )}
          </article>
        ))}
      </div>
    )
  }
  if ('links' in b) {
    if (b.links === 'CAREERS') return <CareerCards />
    const n = b.links.length
    const f2 = (2 - (n % 2)) % 2
    const f3 = (3 - (n % 3)) % 3
    return (
      <ol className="grid overflow-hidden rounded-2xl border-t border-l border-border bg-card/60 sm:grid-cols-2 lg:grid-cols-3">
        {b.links.map(([label, href], i) => (
          <li key={label + href} className="border-r border-b border-border">
            <KitLink href={href} className="group flex h-full items-start gap-3 px-4 py-3.5 text-[15px] text-foreground transition-colors hover:bg-card hover:text-primary-strong">
              <span className="label-mono mt-1 w-6 shrink-0 text-[10px] text-primary-strong">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex-1">{label}</span>
              {/^https?:/.test(href) ? <ArrowUpRight aria-hidden className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-primary" /> : <ArrowRight aria-hidden className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-primary" />}
            </KitLink>
          </li>
        ))}
        {/* Empty cells complete the last row of the table at 2 and 3 columns. */}
        {Array.from({ length: Math.max(f2, f3) }, (_, i) => (
          <li key={`fill-${i}`} aria-hidden className={cn('hidden border-r border-b border-border bg-muted/30', i < f2 ? 'sm:block' : 'sm:hidden', i < f3 ? 'lg:block' : 'lg:hidden')} />
        ))}
      </ol>
    )
  }
  if ('people' in b) {
    // Up to three leaders: large portrait cards across the row. A team: compact rows with a square portrait.
    const lead = b.people.length <= 3
    return (
      <ul className={cn('grid gap-5', lead ? (b.people.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2') : cn('sm:grid-cols-2 lg:grid-cols-3', b.people.length % 4 === 0 && 'xl:grid-cols-4'))}>
        {b.people.map(([name, role, slug]) => {
          const photo = portraitOf(slug)
          return (
            <li key={name + role} className={cn('flex items-center rounded-card', lead ? cn('gap-6 p-6 md:p-7', card(tone)) : cn('gap-4 p-3', tone === 'dark' ? 'bg-ink-foreground/[0.06] ring-1 ring-ink-foreground/15' : card(tone)))}>
              <div className={cn('relative shrink-0 overflow-hidden bg-brand-wash', lead ? 'size-28 rounded-full ring-4 ring-sand md:size-32' : 'size-16 rounded-xl')}>
                {photo
                  ? <Image src={photo} alt={`${name}, ${role}`} fill sizes="128px" className="object-cover object-top" />
                  : <span aria-hidden className="display grid size-full place-items-center text-xl text-primary-strong">{initials(name)}</span>}
              </div>
              <div className="min-w-0">
                <p className={cn('font-semibold leading-tight', lead && 'display text-2xl font-normal md:text-3xl')}>{name}</p>
                <p className={cn('mt-2 text-sm', lead ? cn('label-mono text-[11px] tracking-[0.14em]', accent(tone)) : soft(tone))}>{role}</p>
                {lead && <span aria-hidden className="bg-brand-gradient mt-4 block h-0.5 w-12 rounded-full" />}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
  if ('tree' in b) {
    return (
      <ol className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {b.tree.map(([title, desc, children], i) => {
          // The governing body spans the row; the last committee widens to close an uneven last row (2 and 3 columns).
          const c = b.tree.length - 1
          const last = i === c && i > 0
          return (
          <li key={title} className={cn('rounded-card p-5', i === 0 ? 'bg-ink text-ink-foreground md:col-span-2 xl:col-span-3' : card('light'), last && c % 2 === 1 && 'md:col-span-2', last && (c % 3 === 2 ? 'xl:col-span-2' : 'xl:col-span-1'))}>
            <p className="label-mono text-[11px] opacity-70">{i === 0 ? 'Governing body' : `Reports to the Board · ${String(i).padStart(2, '0')}`}</p>
            <p className="display mt-1 text-xl">{title}</p>
            <p className="mt-1 text-sm opacity-80">{desc}</p>
            {children.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {children.map((c) => <li key={c} className="rounded-full bg-blush px-3 py-1 text-xs font-medium text-foreground">{c}</li>)}
              </ul>
            )}
          </li>
          )
        })}
      </ol>
    )
  }
  if ('quotes' in b) {
    return (
      <ul className="grid gap-6 md:grid-cols-3">
        {b.quotes.map(([q, who]) => (
          <li key={q}>
            <figure className={cn('relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-card', paper)}>
              <div className="flex flex-1 flex-col bg-ink-glow p-7 text-ink-foreground">
                <Quote aria-hidden className="size-8 text-secondary" />
                <blockquote className="display mt-4 text-xl leading-snug">“{q}”</blockquote>
                <span aria-hidden className="min-h-6 flex-1" />
                <p className="label-mono border-t border-ink-foreground/20 pt-3 text-[10px] text-ink-foreground/70">IHM School of Social Work</p>
              </div>
              <figcaption className="p-6 text-sm font-semibold text-primary-strong">{who}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    )
  }
  if ('videos' in b) {
    const n = b.videos.length
    return (
      <div className={cn('text-foreground', tone === 'coral' && 'rounded-card bg-card p-3 shadow-[10px_10px_0_0_hsl(5_72%_40%/0.35)] md:p-4')}>
        <VideoGallery videos={b.videos.map(([id, title]) => ({ id, title }))} columns={n % 3 === 0 ? 3 : 4} feature={n % 4 === 1} />
      </div>
    )
  }
  if ('events' in b) return <EventCards />
  if ('gallery' in b) return <FieldaShowcase screens={b.gallery.map(([src, title, caption]) => ({ src: sswPhoto(src), title, caption }))} />
  if ('audiences' in b) {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        {b.audiences.map(([title, body]) => (
          <article key={title} className={cn('border-t-2 pt-[17px]', tone === 'light' ? 'border-primary' : 'border-secondary')}>
            <h4 className={cn('mb-2 font-sans text-[12px] font-bold tracking-[0.08em] uppercase', accent(tone))}>{title}</h4>
            <p className="text-[14px] leading-[1.7]"><Inline text={body} /></p>
          </article>
        ))}
      </div>
    )
  }
  if ('pending' in b) return <p className={cn('italic [&_strong]:text-secondary', tone === 'light' ? 'text-[#6b7572]' : 'text-ink-foreground/70')}><Inline text={b.pending} /></p>
  if ('partners' in b) {
    return (
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {b.partners.map(([logo, name, full, desc]) => {
          const src = present(logo)
          return (
            <li key={name} className={cn('flex flex-col rounded-card p-5', card(tone))}>
              <div className="grid h-20 place-items-center rounded-2xl bg-muted/60 px-4">
                {src
                  ? <Image src={src} alt={`${name} logo`} width={220} height={70} unoptimized={src.endsWith('.svg')} className="h-12 w-auto max-w-full object-contain" />
                  : <span className="display text-2xl text-primary-strong">{name}</span>}
              </div>
              <p className="mt-4 font-semibold">{name}</p>
              <p className="label-mono mt-0.5 text-[10px] text-muted-foreground">{full}</p>
              <p className="mt-2 text-sm text-foreground/75">{desc}</p>
            </li>
          )
        })}
      </ul>
    )
  }
  if ('pubs' in b) {
    return (
      <div className="grid items-start gap-6 lg:grid-cols-3">
        {b.pubs.map(([heading, refs]) => (
          <section key={heading} className={cn('rounded-card p-6', card('light'))}>
            <h3 className="label-mono text-[11px] text-primary-strong">{heading}</h3>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/80">
              {refs.map((r) => <li key={r} className="border-l-2 border-secondary/60 pl-3 [overflow-wrap:anywhere]"><Inline text={r} /></li>)}
            </ol>
          </section>
        ))}
      </div>
    )
  }
  if ('faq' in b) return <div className={cn(dark && 'rounded-card bg-card p-6 text-foreground')}><KitFaq items={b.faq.map(([q, a]) => ({ title: q, blocks: [{ p: a }] }))} /></div>
  if ('schedule' in b) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        {b.schedule.map(([day, rows]) => (
          <section key={day} className={cn('rounded-card p-6', card(tone))}>
            <h3 className="display text-xl">{day}</h3>
            <ol className="mt-4 divide-y divide-border">
              {rows.map(([time, item]) => (
                <li key={time + item} className="flex gap-4 py-2.5 text-[15px]">
                  <span className="label-mono w-14 shrink-0 pt-0.5 text-[12px] text-primary-strong">{time}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    )
  }
  if ('logos' in b) {
    return (
      <ul className="flex flex-wrap items-center gap-6">
        {b.logos.map(([src, alt]) => <li key={src}><Image src={sswPhoto(src)} alt={alt} width={420} height={140} className="h-16 w-auto" /></li>)}
      </ul>
    )
  }
  return null
}
