'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Quote as QuoteIcon } from 'lucide-react'
import { PlayBadge, VideoDialog, ytPoster, type GalleryVideo } from '@/components/media/VideoGallery.client'
import type { Quote, VideoStory } from '@/content/testimonials-page'
import { cn } from '@/lib/cn'

const PROGRAMS = [
  ['all', 'All stories'],
  ['mn', 'Master of Nursing'],
  ['gcan', 'Advanced Nursing (GCAN)'],
  ['bsw', 'Social Work'],
  ['gdn', 'GDN & bridging'],
  ['exam', 'OSCE & NCLEX'],
] as const
type Program = (typeof PROGRAMS)[number][0]

const programOf = (t: string): Program => {
  if (/advanced nursing|gcan/i.test(t)) return 'gcan'
  if (/social work|bsw/i.test(t)) return 'bsw'
  if (/graduate diploma|gdn|epiq|bridging|graduate certificate in nursing/i.test(t)) return 'gdn'
  if (/osce|nclex/i.test(t)) return 'exam'
  if (/master of nursing/i.test(t)) return 'mn'
  return 'all'
}

/** Video stories with a programme filter (one shared player), then the written testimonials as a masonry wall. */
export function StoriesBrowser({ videos }: { videos: VideoStory[] }) {
  const [program, setProgram] = useState<Program>('all')
  const [open, setOpen] = useState<GalleryVideo | null>(null)
  const [shown, setShown] = useState(12)
  const counts = useMemo(() => Object.fromEntries(PROGRAMS.map(([k]) => [k, k === 'all' ? videos.length : videos.filter((v) => programOf(v.title + ' ' + (v.name ?? '')) === k).length])), [videos])
  const list = program === 'all' ? videos : videos.filter((v) => programOf(v.title + ' ' + (v.name ?? '')) === program)
  return (
    <div>
      <div role="tablist" aria-label="Programme" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {PROGRAMS.filter(([k]) => counts[k] > 0).map(([k, l]) => (
          <button key={k} role="tab" aria-selected={program === k} onClick={() => { setProgram(k); setShown(12) }} className={cn('shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors', program === k ? 'bg-ink text-ink-foreground' : 'border border-border bg-card hover:border-primary')}>
            {l} <span className="ml-1 opacity-60">{counts[k]}</span>
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v, i) => (
          <li key={v.id} className={i >= shown ? 'hidden' : undefined}>
            <button type="button" onClick={() => setOpen({ id: v.id, title: v.name ? `${v.name} — ${v.title}` : v.title })} className="group/v block w-full text-left">
              <span className="relative block aspect-video overflow-hidden rounded-card bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element -- YouTube poster, not optimised by next/image */}
                <img src={ytPoster(v.id)} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover/v:scale-105" />
                <span className="absolute inset-0 grid place-items-center bg-ink/20"><PlayBadge /></span>
              </span>
              <span className="mt-3 block font-semibold leading-snug">{v.name ?? v.title}</span>
              {v.name && <span className="block text-sm text-muted-foreground">{v.title}</span>}
            </button>
          </li>
        ))}
      </ul>
      {list.length > shown && <div className="mt-8 text-center"><button onClick={() => setShown((n) => n + 12)} className="rounded-full border border-border bg-card px-6 py-2.5 font-semibold hover:border-primary">Show more stories</button></div>}
      <VideoDialog video={open} onClose={() => setOpen(null)} channel="https://www.youtube.com/channel/UCSvAFoQ0sdb2h8-zKzMu7Bw" />
    </div>
  )
}

const initials = (n: string) => n.replace(/\(.*?\)/g, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

export function QuoteWall({ quotes }: { quotes: Quote[] }) {
  const [all, setAll] = useState(false)
  return (
    <div>
      <ul className="columns-1 gap-5 md:columns-2 lg:columns-3">
        {quotes.map((q, i) => (
          <li key={q.name} className={cn('mb-5 break-inside-avoid rounded-card border border-border bg-card p-6', !all && i >= 12 && 'hidden')}>
            <QuoteIcon aria-hidden className="size-6 text-secondary" />
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">{q.quote}</p>
            <div className="mt-5 flex items-center gap-3">
              {q.photo ? <Image src={q.photo} alt="" width={48} height={48} className="size-12 rounded-full object-cover" /> : <span className="bg-brand-gradient grid size-12 place-items-center rounded-full text-sm font-bold text-foreground">{initials(q.name)}</span>}
              <span className="font-semibold">{q.name}</span>
            </div>
          </li>
        ))}
      </ul>
      {!all && quotes.length > 12 && <div className="mt-4 text-center"><button onClick={() => setAll(true)} className="rounded-full border border-border bg-card px-6 py-2.5 font-semibold hover:border-primary">Read all {quotes.length} testimonials</button></div>}
    </div>
  )
}
