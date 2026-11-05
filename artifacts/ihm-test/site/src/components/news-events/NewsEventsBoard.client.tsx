'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CalendarDays, Clock, MapPin, Mic, Newspaper, Sparkles, UserRound, X } from 'lucide-react'
import { cn } from '@/lib/cn'

export type BoardEvent = {
  id: number; title: string; startsAt: string; day: string | null; time: string | null; frequency: string | null; discipline: string | null
  hostedBy: string | null; venue: string | null; speaker: string | null; speakerBio: string | null; description: string | null
  joinUrl: string | null; image: string | null; tags: string[]
}
export type BoardPost = { id: number; title: string; path: string; publishedAt: string; excerpt: string | null; image: string | null }

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const fmt = (iso: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-AU', { ...o, timeZone: 'Australia/Melbourne' }).format(new Date(iso))
const PERIODS = [['week', 'Last week', 7], ['month', 'Last month', 30], ['quarter', 'Last 3 months', 91]] as const
const PAGE = 9

// /news-and-events/ (WordPress template-events-and-news.php): News | Events tabs; events filter by tag, by a recent period or a
// month and year, as on the old page. Upcoming events come first, then past events newest first. `now` comes from the server.
export function NewsEventsBoard({ events, posts, now }: { events: BoardEvent[]; posts: BoardPost[]; now: string }) {
  const [tab, setTab] = useState<'news' | 'events'>('events')
  const [tag, setTag] = useState<string | null>(null)
  const [period, setPeriod] = useState<string | null>(null)
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [shown, setShown] = useState(PAGE)
  const nowMs = new Date(now).getTime()

  const tags = useMemo(() => [...new Set(events.flatMap((e) => e.tags))].sort((a, b) => a.localeCompare(b)), [events])
  const years = useMemo(() => [...new Set([...events.map((e) => e.startsAt.slice(0, 4)), ...posts.map((p) => p.publishedAt.slice(0, 4))])].sort().reverse(), [events, posts])
  const inDate = (iso: string) => {
    const t = new Date(iso).getTime()
    if (period) { const days = PERIODS.find((p) => p[0] === period)![2]; if (t < nowMs - days * 864e5 || t > nowMs) return false }
    if (year && !iso.startsWith(year)) return false
    if (month && new Date(iso).getMonth() !== Number(month)) return false
    return true
  }
  const upcoming = events.filter((e) => new Date(e.startsAt).getTime() >= nowMs - 864e5).sort((a, b) => a.startsAt.localeCompare(b.startsAt))
  const past = events.filter((e) => !upcoming.includes(e))
  const evList = [...upcoming, ...past].filter((e) => (!tag || e.tags.includes(tag)) && inDate(e.startsAt))
  const newsList = posts.filter((p) => inDate(p.publishedAt))
  const filtered = Boolean(tag || period || month || year)
  const clear = () => { setTag(null); setPeriod(null); setMonth(''); setYear(''); setShown(PAGE) }
  const sel = 'h-10 rounded-full border border-border bg-card px-4 text-sm outline-none focus:border-primary'

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
        <div role="tablist" aria-label="Show" className="grid grid-cols-2 gap-1 rounded-full bg-muted p-1">
          {(['news', 'events'] as const).map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => { setTab(t); setShown(PAGE) }} className={cn('inline-flex items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold capitalize transition-colors', tab === t ? 'bg-ink text-ink-foreground' : 'text-muted-foreground hover:text-foreground')}>
              {t === 'news' ? <Newspaper aria-hidden className="size-4" /> : <CalendarDays aria-hidden className="size-4" />}{t}
            </button>
          ))}
        </div>
        {tab === 'events' && tags.length > 0 && (
          <div>
            <p className="label-mono mb-3 text-[10px] text-muted-foreground">Filter by type</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => <button key={t} type="button" aria-pressed={tag === t} onClick={() => { setTag(tag === t ? null : t); setShown(PAGE) }} className={cn('rounded-full px-3 py-1.5 text-xs font-semibold transition-colors', tag === t ? 'bg-primary text-foreground' : 'border border-border bg-card hover:border-primary')}>{t}</button>)}
            </div>
          </div>
        )}
        <div>
          <p className="label-mono mb-3 text-[10px] text-muted-foreground">{tab === 'news' ? 'News from' : 'Browse by date'}</p>
          <div className="flex flex-wrap gap-2">
            {PERIODS.map(([id, label]) => <button key={id} type="button" aria-pressed={period === id} onClick={() => { setPeriod(period === id ? null : id); setShown(PAGE) }} className={cn('rounded-full px-3 py-1.5 text-xs font-semibold', period === id ? 'bg-ink text-ink-foreground' : 'border border-border bg-card hover:border-primary')}>{label}</button>)}
          </div>
          <p className="mt-4 mb-2 text-xs font-semibold">Select month &amp; year</p>
          <div className="grid grid-cols-2 gap-2">
            <label><span className="sr-only">Month</span><select value={month} onChange={(e) => { setMonth(e.target.value); setShown(PAGE) }} className={sel}><option value="">Month</option>{MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}</select></label>
            <label><span className="sr-only">Year</span><select value={year} onChange={(e) => { setYear(e.target.value); setShown(PAGE) }} className={sel}><option value="">Year</option>{years.map((y) => <option key={y}>{y}</option>)}</select></label>
          </div>
        </div>
        {filtered && <button type="button" onClick={clear} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong"><X aria-hidden className="size-4" />Clear filter</button>}
      </aside>

      <div aria-live="polite">
        {tab === 'news' ? (
          <>
            <h2 className="display mb-6 text-3xl">Latest News</h2>
            {newsList.length ? (
              <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {newsList.slice(0, shown).map((p) => (
                  <li key={p.id}>
                    <Link href={p.path} className="group/n flex h-full flex-col overflow-hidden rounded-card border border-border bg-card transition-all hover:-translate-y-1">
                      <div className="relative aspect-[4/3] bg-muted">{p.image ? <Image src={p.image} alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 40vw, 92vw" className="object-cover" /> : <span className="bg-sunrise-glow absolute inset-0" />}</div>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="label-mono text-[10px] text-primary-strong">{fmt(p.publishedAt, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <h3 className="display mt-2 text-xl leading-snug group-hover/n:text-primary-strong">{p.title}</h3>
                        {p.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>}
                        <span className="mt-auto pt-4 text-sm font-semibold text-primary-strong">Read more →</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : <p className="rounded-card border border-dashed border-border p-8 text-center text-muted-foreground">No news found.</p>}
            {newsList.length > shown && <More onClick={() => setShown(shown + PAGE)} />}
          </>
        ) : (
          <>
            <h2 className="display mb-6 text-3xl">{upcoming.length && !filtered ? 'Upcoming and recent events' : 'Events'}</h2>
            {evList.length ? (
              <ul className="grid gap-5">
                {evList.slice(0, shown).map((e) => <EventCard key={e.id} e={e} upcoming={upcoming.includes(e)} />)}
              </ul>
            ) : <p className="rounded-card border border-dashed border-border p-8 text-center text-muted-foreground">No events match those filters.</p>}
            {evList.length > shown && <More onClick={() => setShown(shown + PAGE)} />}
          </>
        )}
      </div>
    </div>
  )
}

const More = ({ onClick }: { onClick: () => void }) => (
  <div className="mt-8 text-center"><button type="button" onClick={onClick} className="rounded-full border border-foreground/25 bg-card px-6 py-3 text-sm font-semibold hover:border-primary">Show more</button></div>
)

function EventCard({ e, upcoming }: { e: BoardEvent; upcoming: boolean }) {
  const rows = [
    [Sparkles, 'Frequency', e.frequency], [Sparkles, 'Discipline', e.discipline], [MapPin, 'Host', e.venue], [UserRound, 'Hosted by', e.hostedBy],
    [Mic, 'Speaker', e.speaker], [UserRound, 'Moderator', e.speakerBio],
  ].filter((r) => r[2]) as [typeof MapPin, string, string][]
  return (
    <li>
      <article className={cn('grid overflow-hidden rounded-card border bg-card sm:grid-cols-[200px_1fr]', upcoming ? 'border-primary/40 shadow-[0_24px_48px_-32px_hsl(5_60%_30%/0.5)]' : 'border-border')}>
        <div className="relative min-h-44 bg-ink text-ink-foreground">
          <Image src={e.image ?? '/images/news-events/default.webp'} alt="" fill sizes="(min-width: 640px) 200px, 92vw" className={cn('object-cover', e.image ? 'opacity-90' : 'opacity-60')} />
          <div className="absolute top-4 left-4 overflow-hidden rounded-xl bg-card text-center text-foreground shadow-lg">
            <p className="bg-primary px-3 py-0.5 text-[10px] font-bold">{fmt(e.startsAt, { month: 'short' }).toUpperCase()}</p>
            <p className="display px-3 text-3xl leading-tight">{fmt(e.startsAt, { day: '2-digit' })}</p>
            <p className="pb-1 text-[9px] font-semibold">{(e.day ?? fmt(e.startsAt, { weekday: 'short' })).slice(0, 3).toUpperCase()}</p>
          </div>
          {upcoming && <span className="label-mono absolute right-3 bottom-3 rounded-full bg-secondary px-2.5 py-1 text-[9px] text-foreground">Upcoming</span>}
        </div>
        <div className="p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-2">{e.tags.map((t) => <span key={t} className="rounded-full bg-blush px-2.5 py-0.5 text-[11px] font-semibold text-primary-strong">{t}</span>)}<span className="text-xs text-muted-foreground">{fmt(e.startsAt, { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
          <h3 className="display mt-2 text-2xl leading-snug">{e.title}</h3>
          {e.description && e.description !== e.title && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{e.description}</p>}
          {rows.length > 0 && <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">{rows.map(([Icon, k, v]) => <div key={k} className="flex gap-1.5"><Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-strong" /><dt className="font-semibold">{k}:</dt><dd className="line-clamp-3 min-w-0">{v}</dd></div>)}</dl>}
          {e.time && <p className="mt-2 flex items-center gap-1.5 text-sm"><Clock aria-hidden className="size-4 text-primary-strong" />{e.time}</p>}
          {upcoming && e.joinUrl && <a href={e.joinUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary">Register Now<ArrowUpRight aria-hidden className="size-4" /></a>}
        </div>
      </article>
    </li>
  )
}
