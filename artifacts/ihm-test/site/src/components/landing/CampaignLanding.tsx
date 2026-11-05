import { Fragment, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, CheckCircle2, Plus, Quote, Stethoscope } from 'lucide-react'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { RenderBlocks, type AnyBlock } from '@/components/RenderBlocks'
import { safeJsonLd } from '@/components/blocks/lexicalText'
import { FORM_END_ANCHOR, nestedCtx, type LandingDoc } from '@/components/templates/landing/shared'
import { LandingLayout, landingDoc } from '@/components/landing/ScholarshipParts'
import { cn } from '@/lib/cn'
import { legacyImage } from '@/lib/legacy-image'
import type { CampaignPage, CampaignSection } from '@/content/landing-campaign'

/** md+ column count for facts grids that divide evenly; other counts use 3 columns and a filler cell */
const FACT_COLS: Record<number, string> = { 2: 'md:grid-cols-2', 4: 'md:grid-cols-4' }
const cta = 'inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold'

/** **bold** and [label](href) inside a copy string; internal links use next/link, external ones open in a new tab. */
export function inline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((p, i) => {
    const bold = /^\*\*([^*]+)\*\*$/.exec(p)
    if (bold) return <strong key={i} className="font-semibold">{bold[1]}</strong>
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(p)
    if (link) {
      const [, label, href] = link
      return href.startsWith('/') || href.startsWith('#')
        ? <Link key={i} href={href} className="font-semibold text-primary-strong underline-offset-4 hover:underline">{label}</Link>
        : <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-strong underline-offset-4 hover:underline">{label}</a>
    }
    return <Fragment key={i}>{p}</Fragment>
  })
}

const plain = (text: string) => text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

function Heading({ eyebrow, title, onDark }: { eyebrow?: string; title?: string; onDark?: boolean }) {
  return (
    <>
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      {title && <h2 className="display text-display-md">{title}</h2>}
    </>
  )
}

function Paras({ items, className }: { items?: string[]; className?: string }) {
  if (!items?.length) return null
  return <div className={cn('space-y-3 text-[17px] leading-relaxed', className)}>{items.map((p) => <p key={p.slice(0, 40)}>{inline(p)}</p>)}</div>
}

function List({ items, style = 'check', onDark }: { items: string[]; style?: 'check' | 'number' | 'dot'; onDark?: boolean }) {
  if (style === 'number') {
    return (
      <ol className="mt-5 space-y-3">
        {items.map((it, i) => (
          <li key={it.slice(0, 40)} className="flex gap-3">
            <span className="bg-brand-gradient display grid size-8 shrink-0 place-items-center rounded-lg text-sm text-foreground">{i + 1}</span>
            <span className="pt-1">{inline(it)}</span>
          </li>
        ))}
      </ol>
    )
  }
  return (
    <ul className={cn('mt-5 space-y-2.5', style === 'dot' && 'list-disc space-y-1.5 pl-5')}>
      {items.map((it) => style === 'dot'
        ? <li key={it.slice(0, 40)}>{inline(it)}</li>
        : <li key={it.slice(0, 40)} className="flex gap-2.5"><CheckCircle2 aria-hidden className={cn('mt-0.5 size-5 shrink-0', onDark ? 'text-secondary' : 'text-primary-strong')} /><span>{inline(it)}</span></li>)}
    </ul>
  )
}

function Section({ s, doc }: { s: CampaignSection; doc: LandingDoc }) {
  switch (s.kind) {
    case 'facts':
      return (
        <section id={s.id} className="scroll-mt-24">
          <Heading eyebrow={s.eyebrow} title={s.title} />
          <dl className={cn('grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border', FACT_COLS[s.items.length] ?? 'md:grid-cols-3', s.title && 'mt-6')}>
            {s.items.map((f) => <div key={f.label} className="bg-card p-5"><dt className="label-mono text-muted-foreground">{f.label}</dt><dd className="mt-1 font-semibold">{inline(f.value)}</dd></div>)}
            {/* fill the last row so the grid has no empty cell */}
            {!FACT_COLS[s.items.length] && s.items.length % 3 !== 0 && <div aria-hidden className={cn('hidden bg-card md:block', s.items.length % 3 === 1 && 'md:col-span-2')} />}
            {s.items.length % 2 !== 0 && <div aria-hidden className="bg-card md:hidden" />}
          </dl>
          {s.note && <p className="mt-4 rounded-2xl bg-blush px-4 py-3 text-[15px]">{inline(s.note)}</p>}
        </section>
      )
    case 'prose': {
      const dark = s.tone === 'ink'
      const text = (
        <div>
          <Heading eyebrow={s.eyebrow} title={s.title} onDark={dark} />
          <Paras items={s.body} className={cn('mt-4', dark ? 'text-ink-foreground/85' : 'text-muted-foreground')} />
          {s.list && <List items={s.list} style={s.listStyle} onDark={dark} />}
          <Paras items={s.after} className={cn('mt-4', dark ? 'text-ink-foreground/85' : 'text-muted-foreground')} />
        </div>
      )
      return (
        <section id={s.id} className={cn('scroll-mt-24', s.tone === 'ink' && 'rounded-card bg-ink p-7 text-ink-foreground md:p-10', s.tone === 'blush' && 'rounded-card bg-blush p-7 md:p-10', s.image && 'grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center')}>
          {s.image && <div className="overflow-hidden rounded-card"><Image src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} sizes="(min-width: 768px) 28vw, 92vw" className="h-auto w-full" /></div>}
          {text}
        </section>
      )
    }
    case 'grid': {
      const dark = s.tone === 'ink'
      return (
        <section id={s.id} className={cn('scroll-mt-24', dark && 'rounded-card bg-ink p-7 text-ink-foreground md:p-10')}>
          <Heading eyebrow={s.eyebrow} title={s.title} onDark={dark} />
          {s.intro && <p className={cn('mt-3 text-[17px]', dark ? 'text-ink-foreground/80' : 'text-muted-foreground')}>{inline(s.intro)}</p>}
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {s.items.map((it) => (
              <li key={it} className={cn('flex items-center gap-3 rounded-2xl border p-4 font-semibold', dark ? 'border-ink-foreground/15 bg-ink-foreground/5' : 'border-border bg-card')}>
                <BadgeCheck aria-hidden className={cn('size-5 shrink-0', dark ? 'text-secondary' : 'text-primary-strong')} />{inline(it)}
              </li>
            ))}
          </ul>
          <Paras items={s.after} className={cn('mt-5', dark ? 'text-ink-foreground/85' : 'text-muted-foreground')} />
        </section>
      )
    }
    case 'cards':
      return (
        <section id={s.id} className="scroll-mt-24">
          <Heading eyebrow={s.eyebrow} title={s.title} />
          {s.intro && <p className="mt-3 text-[17px] text-muted-foreground">{inline(s.intro)}</p>}
          <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {s.items.map((c, i) => (
              <li key={(c.title ?? c.body).slice(0, 40)} className="rounded-card border border-border bg-card p-6 transition-transform hover:-translate-y-1">
                {s.numbered && <span className="label-mono text-primary-strong">{String(i + 1).padStart(2, '0')}</span>}
                {c.title && <h3 className="mt-1 text-lg font-semibold">{c.title}</h3>}
                <p className="mt-2 text-[15px] text-muted-foreground">{inline(c.body)}</p>
              </li>
            ))}
          </ol>
          <Paras items={s.after} className="mt-5 text-muted-foreground" />
        </section>
      )
    case 'groups':
      return (
        <section id={s.id} className="scroll-mt-24">
          <Heading eyebrow={s.eyebrow} title={s.title} />
          {s.intro && <p className="mt-3 text-[17px] text-muted-foreground">{inline(s.intro)}</p>}
          <div className="mt-6 space-y-3">
            {s.groups.map((g, i) => (
              <details key={g.title} open={i === 0} className="group rounded-card border border-border bg-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold md:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="display text-2xl">{g.title}</span><Plus aria-hidden className="size-5 shrink-0 text-primary-strong transition-transform group-open:rotate-45" />
                </summary>
                <div className="px-5 pb-6 md:px-6"><p className="text-muted-foreground">{inline(g.body)}</p><List items={g.items} /></div>
              </details>
            ))}
          </div>
        </section>
      )
    case 'stats':
      return (
        <section id={s.id} className="scroll-mt-24">
          <Heading eyebrow={s.eyebrow} title={s.title} />
          {s.intro && <p className="mt-3 text-[17px] text-muted-foreground">{inline(s.intro)}</p>}
          <dl className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', s.items.length >= 3 && 'lg:grid-cols-3', (s.title || s.intro) && 'mt-6')}>
            {s.items.map((st) => (
              <div key={st.label} className={cn('rounded-card bg-ink p-6 text-ink-foreground', s.items.length === 1 && 'flex flex-col gap-2 sm:col-span-2 md:flex-row md:items-center md:gap-8 md:p-8 lg:col-span-3')}>
                <dd className="display shrink-0 text-5xl text-secondary md:text-6xl">{st.value}</dd>
                <div><dt className="mt-2 font-semibold md:mt-0 md:text-lg">{st.label}</dt>
                {st.note && <p className="mt-1 text-sm text-ink-foreground/70">{inline(st.note)}</p>}</div>
              </div>
            ))}
          </dl>
          {s.note && <p className="mt-3 text-sm text-muted-foreground">{inline(s.note)}</p>}
        </section>
      )
    case 'pathway':
      return (
        <section id={s.id} className="scroll-mt-24">
          <Heading eyebrow={s.eyebrow} title={s.title} />
          <ol className="relative mt-8 space-y-5 border-l-2 border-primary/40 pl-8">
            {s.steps.map((st, i) => (
              <li key={st.title} className="relative">
                <span aria-hidden className="bg-brand-gradient absolute top-4 -left-[2.6rem] size-5 rounded-full ring-4 ring-blush" />
                <div className={cn('bg-brand-gradient px-6 py-4 text-foreground', st.points ? 'rounded-card' : 'rounded-full')}>
                  <p className="label-mono">Step {i + 1}{st.meta && ` · ${st.meta}`}</p>
                  <p className="text-lg font-semibold">{st.title}</p>
                  {st.sub && <p className="text-sm">{st.sub}</p>}
                  {st.points && <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px]">{st.points.map((pt) => <li key={pt}>{inline(pt)}</li>)}</ul>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )
    case 'specialisations':
      return (
        <section id={s.id} className="scroll-mt-24">
          <Heading eyebrow={s.eyebrow} title={s.title} />
          {s.intro && <p className="mt-3 text-[17px] text-muted-foreground">{inline(s.intro)}</p>}
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {s.items.map((c) => (
              <li key={c.title} className="group overflow-hidden rounded-card border border-border bg-card transition-shadow hover:shadow-lg">
                {c.image && <div className="relative aspect-[16/10] overflow-hidden"><Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 640px) 25vw, 92vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>}
                <div className="p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold"><Stethoscope aria-hidden className="size-5 shrink-0 text-primary-strong" />{c.title}</h3>
                  {c.facts && <ul className="mt-3 flex flex-wrap gap-1.5">{c.facts.map((f) => <li key={f} className="rounded-full bg-blush px-2.5 py-1 text-xs font-semibold">{f}</li>)}</ul>}
                  <div className="mt-3 space-y-2 text-[15px] text-muted-foreground">{c.body.map((b) => <p key={b.slice(0, 40)}>{inline(b)}</p>)}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )
    case 'table':
      return (
        <section id={s.id} className="scroll-mt-24">
          <Heading eyebrow={s.eyebrow} title={s.title} />
          {s.intro && <p className="mt-3 text-[17px] text-muted-foreground">{inline(s.intro)}</p>}
          <div className="mt-6 overflow-x-auto rounded-card border border-border">
            <table className="w-full min-w-[28rem] text-left text-[15px]">
              {s.head.some(Boolean) && <thead className="bg-ink text-ink-foreground"><tr>{s.head.map((h, j) => <th key={j} scope="col" className="px-5 py-3 font-semibold">{h}</th>)}</tr></thead>}
              <tbody className="divide-y divide-border bg-card">{s.rows.map((r) => <tr key={r.join('|')}>{r.map((c, j) => <td key={j} className={cn('px-5 py-3', j === 0 && 'font-semibold')}>{inline(c)}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <Paras items={s.after} className="mt-4 text-[15px] text-muted-foreground" />
        </section>
      )
    case 'startDates':
      return doc.course ? (
        <section>
          <Heading eyebrow="Intakes" title={s.title} />
          <RenderBlocks blocks={[{ blockType: 'startDates', mode: 'all' } as AnyBlock]} ctx={nestedCtx(doc)} />
        </section>
      ) : null
    case 'quotes': {
      const shown = s.visible ?? 6
      const card = (q: { name: string; text: string[]; photo?: string }) => {
        const photo = q.photo ? legacyImage(q.photo, '') : ''
        return (
          <figure key={q.name} className="mb-4 break-inside-avoid rounded-card border border-border bg-card p-6">
            <Quote aria-hidden className="size-6 text-primary-strong" />
            <blockquote className="mt-3 space-y-2 text-[15px] leading-relaxed">{q.text.map((t) => <p key={t.slice(0, 40)}>{t}</p>)}</blockquote>
            <figcaption className="mt-4 flex items-center gap-3 font-semibold">
              {photo
                ? <Image src={photo} alt={q.name} width={48} height={48} className="size-12 rounded-full object-cover" />
                : <span aria-hidden className="bg-brand-gradient grid size-12 place-items-center rounded-full text-sm text-foreground">{q.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('')}</span>}
              {q.name}
            </figcaption>
          </figure>
        )
      }
      return (
        <section className="scroll-mt-24">
          <Heading eyebrow={s.eyebrow} title={s.title} />
          {s.intro && <p className="mt-3 text-[17px] text-muted-foreground">{inline(s.intro)}</p>}
          <div className="mt-6 columns-1 gap-4 md:columns-2">{s.items.slice(0, shown).map(card)}</div>
          {s.items.length > shown && (
            <details className="group">
              <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-border px-5 font-semibold hover:border-primary [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">Show all {s.items.length} testimonials</span><span className="hidden group-open:inline">Show fewer</span>
              </summary>
              <div className="mt-4 columns-1 gap-4 md:columns-2">{s.items.slice(shown).map(card)}</div>
            </details>
          )}
        </section>
      )
    }
    case 'faq':
      return (
        <section id={s.id} className="scroll-mt-24">
          <Heading eyebrow="FAQ" title={s.title} />
          <div className="mt-6 divide-y divide-border rounded-card border border-border bg-card">
            {s.items.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold md:px-6 [&::-webkit-details-marker]:hidden">
                  {f.q}<Plus aria-hidden className="size-5 shrink-0 text-primary-strong transition-transform group-open:rotate-45" />
                </summary>
                <div className="px-5 pb-6 text-muted-foreground md:px-6"><Paras items={f.a} className="text-[16px]" />{f.list && <List items={f.list} />}</div>
              </details>
            ))}
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
            '@context': 'https://schema.org', '@type': 'FAQPage',
            mainEntity: s.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain([...f.a, ...(f.list ?? [])].join(' ')) } })),
          }) }} />
        </section>
      )
    case 'callout':
      return (
        <section className="bg-brand-gradient flex flex-col items-start justify-between gap-5 rounded-card p-7 text-foreground md:flex-row md:items-center md:p-9">
          <div><h2 className="display text-[clamp(1.4rem,2.6vw,2rem)] leading-tight">{s.title}</h2>{s.body && <p className="mt-2">{inline(s.body)}</p>}</div>
          {s.cta && <a href={`#${FORM_END_ANCHOR}`} className={`${cta} shrink-0 bg-ink text-ink-foreground hover:bg-ink/85`}>{s.cta}<ArrowRight aria-hidden className="size-4" /></a>}
        </section>
      )
    case 'links':
      return (
        <div className="flex flex-wrap gap-3">
          {s.items.map((l) => <Link key={l.href} href={l.href} className={`${cta} border border-border hover:border-primary`}>{l.label}<ArrowRight aria-hidden className="size-4" /></Link>)}
        </div>
      )
    case 'videos': {
      const block = { blockType: 'testimonials', variant: 'carousel', inline: s.videos.map((v) => ({ name: v.title, role: '', videoUrl: `https://www.youtube.com/watch?v=${v.youtubeId}` })) } as AnyBlock
      return (
        <section>
          <Heading eyebrow={s.eyebrow} title={s.title} />
          {s.intro && <p className="mt-3 text-[17px] text-muted-foreground">{inline(s.intro)}</p>}
          <RenderBlocks blocks={[block]} ctx={nestedCtx(doc)} />
        </section>
      )
    }
  }
}

/** A course-campaign landing page (rows in src/content/landing.ts; copy in landing-campaign-*.ts, shape in landing-campaign.ts). */
export async function CampaignLanding({ path, page: p }: { path: string; page: CampaignPage }) {
  const doc = await landingDoc(path)
  const { hero } = p
  const title = hero.accent && hero.title.includes(hero.accent)
    ? <>{hero.title.split(hero.accent)[0]}<em className="text-secondary not-italic">{hero.accent}</em>{hero.title.split(hero.accent).slice(1).join(hero.accent)}</>
    : hero.title
  const brochure: AnyBlock[] = p.brochure && doc.course ? [{ blockType: 'brochureDownload', label: 'Download Brochure', spacing: 'none' } as AnyBlock] : []
  return (
    <LandingLayout doc={doc} eyebrow={hero.eyebrow} formHeading={p.formHeading} title={title}
      intro={<>
        {hero.intro?.map((t) => <p key={t.slice(0, 30)} className="mt-2 first:mt-0">{inline(t)}</p>)}
        {hero.chips && <ul className="mt-5 flex flex-wrap gap-2">{hero.chips.map((c) => <li key={c} className="inline-flex items-center gap-1.5 rounded-full border border-secondary/50 bg-secondary/15 px-3.5 py-1.5 text-sm font-semibold text-secondary"><BadgeCheck aria-hidden className="size-4" />{c}</li>)}</ul>}
        {hero.note && <p className="mt-4 text-sm text-ink-foreground/70">{inline(hero.note)}</p>}
      </>}
      image={hero.image}
      actions={<a href={`#${FORM_END_ANCHOR}`} className={`${cta} bg-primary text-foreground hover:bg-secondary`}>Enquire Now<ArrowRight aria-hidden className="size-4" /></a>}
      after={
        <section className="mx-auto max-w-site px-5 pb-6 md:px-8">
          <div className="bg-ink flex flex-col items-start justify-between gap-5 rounded-card p-8 text-ink-foreground md:flex-row md:items-center md:p-10">
            <div><h2 className="display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">{p.closing.title}</h2>{p.closing.body && <p className="mt-2 text-ink-foreground/80">{p.closing.body}</p>}</div>
            <a href={`#${FORM_END_ANCHOR}`} className={`${cta} shrink-0 bg-primary text-foreground hover:bg-secondary`}>{p.closing.cta}<ArrowRight aria-hidden className="size-4" /></a>
          </div>
        </section>
      }>
      {p.sections.map((s, i) => <Section key={`${s.kind}-${i}`} s={s} doc={doc} />)}
      {brochure.length > 0 && <RenderBlocks blocks={brochure} ctx={nestedCtx(doc)} />}
    </LandingLayout>
  )
}
