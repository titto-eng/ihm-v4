import { Fragment, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ChevronDown, FileText } from 'lucide-react'
import { VideoGallery } from '@/components/media/VideoGallery.client'
import { cn } from '@/lib/cn'

/**
 * The page kit for text-heavy pages migrated from WordPress. Copy is stored as typed "kit blocks" in src/content/*.ts (plain
 * text with `**bold**` and `[label](href)` markers, produced from the old page by tools/tokit.py) and rendered here as JSX —
 * no HTML strings, no old classes (AGENTS rule 5).
 */
export type KitBlock =
  | { h: number; t: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { table: string[][] }
  | { video: string; title?: string }
  | { img: string; alt?: string; width?: number; height?: number }
  | { btn: { t: string; href: string }[] }
  /** Stat tiles: [label, value, note?]. */
  | { stats: [string, string, string?][] }

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href) || /\.pdf($|\?)/i.test(href)
const localise = (href: string) => href.trim().replace(/ /g, '%20').replace(/^https?:\/\/(www\.)?ihm\.edu\.au(?=\/)/, '')

export function KitLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const h = localise(href)
  if (isExternal(h)) {
    const http = h.startsWith('http')
    return <a href={h} {...(http || h.endsWith('.pdf') ? { target: '_blank', rel: http ? 'noopener noreferrer' : 'noopener' } : {})} className={className}>{children}</a>
  }
  return <Link href={h} className={className}>{children}</Link>
}

/** Renders `**bold**` and `[label](href)` inside a string. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
        const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
        if (m) return <KitLink key={i} href={m[2]} className="font-semibold text-primary-strong underline decoration-primary/40 underline-offset-4 hover:decoration-primary">{m[1]}</KitLink>
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

/** Plain text of a kit string (for JSON-LD and metadata). */
export const plain = (text: string) => text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim()

/** Links-only list: every item is a single link → rendered as document/link chips. */
const linkOnly = (s: string) => /^\s*\[[^\]]+\]\([^)]+\)\s*$/.test(s)

export function KitBlocks({ blocks, onDark = false, className }: { blocks: KitBlock[]; onDark?: boolean; className?: string }) {
  const videos: { id: string; title: string }[] = []
  const out: ReactNode[] = []
  const flushVideos = (key: string) => {
    if (videos.length) { out.push(<div key={key} className="not-prose"><VideoGallery videos={[...videos]} columns={videos.length === 1 ? 1 : videos.length === 2 ? 2 : 3} /></div>); videos.length = 0 }
  }
  blocks.forEach((b, i) => {
    if ('video' in b) { videos.push({ id: b.video, title: b.title ?? 'Video' }); return }
    flushVideos(`v${i}`)
    if ('h' in b) {
      const cls = b.h <= 2 ? 'display text-3xl pt-4' : b.h === 3 ? 'display text-2xl pt-2' : 'text-lg font-semibold pt-2'
      out.push(b.h <= 2 ? <h2 key={i} className={cls}><Inline text={b.t} /></h2> : b.h === 3 ? <h3 key={i} className={cls}><Inline text={b.t} /></h3> : <h4 key={i} className={cls}><Inline text={b.t} /></h4>)
    } else if ('p' in b) {
      if (linkOnly(b.p) || /^(\s*\[[^\]]+\]\([^)]+\)\s*)+$/.test(b.p)) {
        const links = [...b.p.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((m) => ({ t: m[1], href: m[2] }))
        out.push(<Buttons key={i} items={links} onDark={onDark} />)
      } else out.push(<p key={i}><Inline text={b.p} /></p>)
    } else if ('ul' in b || 'ol' in b) {
      const items = 'ul' in b ? b.ul : b.ol
      if (items.every(linkOnly)) {
        out.push(<Buttons key={i} items={items.map((s) => { const m = /\[([^\]]+)\]\(([^)]+)\)/.exec(s)!; return { t: m[1], href: m[2] } })} onDark={onDark} />)
      } else {
        const Tag = 'ol' in b ? 'ol' : 'ul'
        out.push(
          <Tag key={i} className="grid gap-2">
            {items.map((t, n) => (
              <li key={n} className="flex gap-3">
                {'ol' in b
                  ? <span className={cn('mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold', onDark ? 'bg-secondary text-foreground' : 'bg-brand-gradient text-foreground')}>{n + 1}</span>
                  : <span aria-hidden className={cn('mt-2.5 size-1.5 shrink-0 rounded-full', onDark ? 'bg-secondary' : 'bg-primary')} />}
                <span><Inline text={t} /></span>
              </li>
            ))}
          </Tag>,
        )
      }
    } else if ('table' in b) {
      out.push(<KitTable key={i} rows={b.table} />)
    } else if ('img' in b) {
      out.push(<Image key={i} src={b.img} alt={b.alt ?? ''} width={b.width ?? 1200} height={b.height ?? 800} className="h-auto w-full rounded-card" />)
    } else if ('btn' in b) {
      out.push(<Buttons key={i} items={b.btn} onDark={onDark} />)
    } else if ('stats' in b) {
      out.push(
        <dl key={i} className="not-prose grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {b.stats.map(([label, value, note]) => (
            <div key={label} className={cn('rounded-2xl p-4', onDark ? 'bg-ink-foreground/5 ring-1 ring-ink-foreground/10' : 'border border-border bg-card')}>
              <dt className="label-mono text-[11px] text-muted-foreground">{label}</dt>
              <dd className="display mt-1 text-2xl text-primary-strong">{value}</dd>
              {note && <dd className="mt-0.5 text-xs text-muted-foreground">{note}</dd>}
            </div>
          ))}
        </dl>,
      )
    }
  })
  flushVideos('vend')
  return <div className={cn('space-y-4 text-[16px] leading-relaxed', onDark ? 'text-ink-foreground/85' : 'text-foreground/85', className)}>{out}</div>
}

export function Buttons({ items, onDark = false }: { items: { t: string; href: string }[]; onDark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2 pt-1">
      {items.map((l) => {
        const pdf = /\.pdf($|\?)/i.test(l.href)
        const ext = /^https?:/.test(localise(l.href))
        return (
          <li key={l.href + l.t}>
            <KitLink href={l.href} className={cn('inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', onDark ? 'bg-card text-foreground hover:bg-secondary' : 'bg-ink text-ink-foreground hover:bg-primary hover:text-foreground')}>
              {pdf ? <FileText aria-hidden className="size-4" /> : null}{l.t}{ext ? <ArrowUpRight aria-hidden className="size-4" /> : !pdf ? <ArrowRight aria-hidden className="size-4" /> : null}
            </KitLink>
          </li>
        )
      })}
    </ul>
  )
}

export function KitTable({ rows, head = true }: { rows: string[][]; head?: boolean }) {
  const [h, ...body] = head ? rows : [[], ...rows]
  const cols = Math.max(...rows.map((r) => r.length))
  return (
    <div className="not-prose overflow-x-auto rounded-card border border-border bg-card">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        {head && <thead className="bg-ink text-ink-foreground"><tr>{h.map((c, i) => <th key={i} scope="col" colSpan={i === h.length - 1 ? cols - h.length + 1 : 1} className="p-3.5 font-semibold"><Inline text={c} /></th>)}</tr></thead>}
        <tbody>{body.map((r, i) => <tr key={i} className="border-t border-border align-top even:bg-muted/40">{r.map((c, j) => <td key={j} colSpan={j === r.length - 1 ? cols - r.length + 1 : 1} className={cn('p-3.5', j === 0 && 'font-semibold')}><Inline text={c} /></td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

/** Splits blocks into sections at headings of `level` (or higher). Blocks before the first heading go into `lead`. */
export function sections(blocks: KitBlock[], level = 2): { lead: KitBlock[]; items: { title: string; blocks: KitBlock[] }[] } {
  const lead: KitBlock[] = []
  const items: { title: string; blocks: KitBlock[] }[] = []
  for (const b of blocks) {
    if ('h' in b && b.h <= level) items.push({ title: b.t, blocks: [] })
    else if (items.length) items[items.length - 1].blocks.push(b)
    else lead.push(b)
  }
  return { lead, items }
}

/** Rich FAQ (answers are kit blocks). Pair with `kitFaqJsonLd`. */
export function KitFaq({ items, numbered = true }: { items: { title: string; blocks: KitBlock[] }[]; numbered?: boolean }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((f, i) => (
        <details key={f.title} className="group/f" id={`faq-${i + 1}`}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-base font-semibold transition-colors hover:text-primary-strong md:text-lg [&::-webkit-details-marker]:hidden">
            <span className="flex items-start gap-4">{numbered && <span className="label-mono mt-1.5 text-[11px] text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>}{f.title.replace(/^\d+\.\s*/, '')}</span>
            <ChevronDown aria-hidden className="mt-1 size-5 shrink-0 transition-transform group-open/f:rotate-180" />
          </summary>
          <div className="pb-6 md:pl-9"><KitBlocks blocks={f.blocks} className="text-[15px]" /></div>
        </details>
      ))}
    </div>
  )
}

export const kitFaqJsonLd = (items: { title: string; blocks: KitBlock[] }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.title.replace(/^\d+\.\s*/, ''),
    acceptedAnswer: { '@type': 'Answer', text: f.blocks.map((b) => ('p' in b ? plain(b.p) : 'ul' in b ? b.ul.map(plain).join('; ') : 'ol' in b ? b.ol.map(plain).join('; ') : '')).filter(Boolean).join(' ') },
  })),
})
