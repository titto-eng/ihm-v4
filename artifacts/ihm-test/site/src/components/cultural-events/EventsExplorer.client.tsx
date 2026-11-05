'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { CalendarDays, ChevronLeft, ChevronRight, Images, MapPin, Search, UserRound, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { CulturalEvent } from '@/content/cultural-events'

const PER_PAGE = 6

// Cultural workshops and events: keyword / category / year filters, event cards, and a dialog with the full story and a
// photo gallery. Every card (title, date, venue, story) is in the server HTML; the dialog only enlarges what is already there.
export function EventsExplorer({ events, categories }: { events: CulturalEvent[]; categories: string[] }) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [year, setYear] = useState('all')
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState<CulturalEvent | null>(null)
  const years = useMemo(() => [...new Set(events.map((e) => e.year).filter(Boolean))].sort().reverse(), [events])
  const term = q.trim().toLowerCase()
  const list = events.filter((e) => (cat === 'all' || e.category === cat) && (year === 'all' || e.year === year) && (!term || [e.title, e.venue, e.ledBy, e.agenda, ...e.body].join(' ').toLowerCase().includes(term)))
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const shown = list.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const reset = () => { setQ(''); setCat('all'); setYear('all'); setPage(1) }

  const field = 'h-11 w-full rounded-full border border-border bg-card px-4 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/25'
  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="grid gap-3 rounded-card border border-border bg-card p-4 shadow-[0_18px_40px_-30px_hsl(348_35%_13%/0.35)] md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-end md:p-5">
        <label className="block text-sm font-semibold">Keyword
          <span className="relative mt-1.5 block"><Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" /><input type="search" value={q} onChange={(e) => { setQ(e.target.value); setPage(1) }} placeholder="Workshop, campus, facilitator…" className={`${field} pl-11`} /></span>
        </label>
        <label className="block text-sm font-semibold">Category
          <select value={cat} onChange={(e) => { setCat(e.target.value); setPage(1) }} className={`${field} mt-1.5`}><option value="all">All Types</option>{categories.map((c) => <option key={c}>{c}</option>)}</select>
        </label>
        <label className="block text-sm font-semibold">Year
          <select value={year} onChange={(e) => { setYear(e.target.value); setPage(1) }} className={`${field} mt-1.5`}><option value="all">Any Year</option>{years.map((y) => <option key={y}>{y}</option>)}</select>
        </label>
        <button type="button" onClick={reset} className="h-11 rounded-full border border-foreground/25 px-5 text-sm font-semibold hover:border-primary">Clear</button>
      </form>

      <p className="label-mono mt-6 text-[11px] text-muted-foreground" aria-live="polite">{list.length} {list.length === 1 ? 'event' : 'events'}</p>
      {list.length === 0 ? (
        <p className="mt-4 rounded-card border border-dashed border-border bg-card p-10 text-center text-muted-foreground">No events match those filters. <button type="button" onClick={reset} className="font-semibold text-primary-strong underline">Show all</button></p>
      ) : (
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((e) => (
            <li key={e.id}>
              <article className="group/e relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-card shadow-[0_18px_40px_-30px_hsl(348_35%_13%/0.35)] transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image src={e.images[0]} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" className="object-cover transition-transform duration-700 group-hover/e:scale-105" />
                  <span className="absolute top-3 left-3 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold">{e.category}</span>
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-1 text-xs text-ink-foreground"><Images aria-hidden className="size-3.5" />{e.images.length}</span>
                  {e.status === 'closed' && <span className="label-mono absolute bottom-3 left-3 rounded-full bg-ink/80 px-2.5 py-1 text-[9px] text-ink-foreground">Held</span>}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-primary-strong"><CalendarDays aria-hidden className="size-4" />{e.date}</p>
                  <h3 className="display mt-2 text-xl leading-snug">
                    <button type="button" onClick={() => setOpen(e)} className="text-left after:absolute after:inset-0 focus-visible:outline-none">{e.title}</button>
                  </h3>
                  <p className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground"><MapPin aria-hidden className="mt-0.5 size-4 shrink-0" />{e.venue}</p>
                  <p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground"><UserRound aria-hidden className="mt-0.5 size-4 shrink-0" />{e.ledBy}</p>
                  <p className="mt-3 line-clamp-3 text-sm">{e.body[0]}</p>
                  <span aria-hidden className="mt-auto pt-4 text-sm font-semibold text-primary-strong">Read more and view photos →</span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
      {pages > 1 && (
        <nav aria-label="Event pages" className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => <button key={n} type="button" aria-current={n === page ? 'page' : undefined} onClick={() => setPage(n)} className={cn('size-10 rounded-full text-sm font-semibold', n === page ? 'bg-ink text-ink-foreground' : 'border border-border bg-card')}>{n}</button>)}
        </nav>
      )}

      {/* Full stories for crawlers and no-JS readers (the dialog shows the same text). */}
      <div className="sr-only">
        {events.map((e) => <section key={e.id} aria-label={e.title}>{e.body.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}<p>Agenda: {e.agenda}</p></section>)}
      </div>

      <EventDialog event={open} onClose={() => setOpen(null)} />
    </div>
  )
}

function EventDialog({ event: e, onClose }: { event: CulturalEvent | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [i, setI] = useState(0)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (e && !d.open) { setI(0); d.showModal() }
    if (!e && d.open) d.close()
  }, [e])
  return (
    <dialog ref={ref} onClose={onClose} onClick={(ev) => { if (ev.target === ref.current) onClose() }} className="m-auto w-[min(1100px,94vw)] max-h-[92dvh] overflow-hidden rounded-card bg-card p-0 text-foreground backdrop:bg-ink/70 backdrop:backdrop-blur-sm">
      {e && (
        <div className="grid max-h-[92dvh] overflow-y-auto lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative aspect-[4/3] bg-ink lg:aspect-auto lg:min-h-[32rem]">
            <Image key={e.images[i]} src={e.images[i]} alt={`${e.title}, photo ${i + 1} of ${e.images.length}`} fill sizes="(min-width: 1024px) 55vw, 94vw" className="animate-rise object-contain" />
            {e.images.length > 1 && (
              <>
                <button type="button" aria-label="Previous photo" onClick={() => setI((i - 1 + e.images.length) % e.images.length)} className="absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-card/90 shadow"><ChevronLeft className="size-5" /></button>
                <button type="button" aria-label="Next photo" onClick={() => setI((i + 1) % e.images.length)} className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-card/90 shadow"><ChevronRight className="size-5" /></button>
                <p className="label-mono absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink/80 px-3 py-1 text-[10px] text-ink-foreground">{i + 1} / {e.images.length}</p>
              </>
            )}
          </div>
          <div className="relative p-6 md:p-8">
            <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 grid size-9 place-items-center rounded-full hover:bg-muted"><X className="size-5" /></button>
            <p className="label-mono text-[10px] text-primary-strong">{e.category}</p>
            <h2 className="display mt-2 pr-8 text-3xl leading-tight">{e.title}</h2>
            <dl className="mt-5 grid gap-2 text-sm">
              <div className="flex gap-2"><dt className="sr-only">Date</dt><CalendarDays aria-hidden className="size-4 text-primary-strong" /><dd>{e.date}{e.time ? ` · ${e.time}` : ''}</dd></div>
              <div className="flex gap-2"><dt className="sr-only">Venue</dt><MapPin aria-hidden className="size-4 text-primary-strong" /><dd>{e.venue}</dd></div>
              <div className="flex gap-2"><dt className="sr-only">Led by</dt><UserRound aria-hidden className="size-4 text-primary-strong" /><dd>Led by {e.ledBy}</dd></div>
            </dl>
            <div className="mt-5 space-y-3 text-[15px] leading-relaxed">{e.body.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
            <div className="mt-5 rounded-xl bg-sand/70 p-4 text-sm"><p className="font-semibold">Agenda</p><p className="mt-1">{e.agenda}</p></div>
            {e.images.length > 1 && (
              <ul className="mt-5 grid grid-cols-5 gap-2">
                {e.images.map((src, n) => <li key={src}><button type="button" onClick={() => setI(n)} aria-label={`Show photo ${n + 1}`} className={cn('relative block aspect-square w-full overflow-hidden rounded-lg ring-2', n === i ? 'ring-primary' : 'ring-transparent')}><Image src={src} alt="" fill sizes="80px" className="object-cover" /></button></li>)}
              </ul>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}
