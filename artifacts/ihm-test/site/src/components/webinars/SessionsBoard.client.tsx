'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, CalendarDays, Clock, MapPin, Mic, Video } from 'lucide-react'
import { cn } from '@/lib/cn'

export type BoardSession = { id: number; kind: 'webinar' | 'event'; date: string; label: string; time: string; topic: string; market: string; presenter: string; image?: string; registrationLink?: string; past: boolean }

const PAGE = 6

/** Webinars / events × upcoming / previous, with market and presenter filters (the old pages' panes keep their anchors). */
export function SessionsBoard({ sessions, markets, presenters }: { sessions: BoardSession[]; markets: Record<string, string>; presenters: Record<string, string> }) {
  const [kind, setKind] = useState<'webinar' | 'event'>('webinar')
  const firstWhen = (k: 'webinar' | 'event') => (sessions.some((s) => s.kind === k && !s.past) ? 'upcoming' : 'past')
  const [when, setWhen] = useState<'upcoming' | 'past'>(() => firstWhen('webinar'))
  const [market, setMarket] = useState('all')
  const [presenter, setPresenter] = useState('all')
  const [shown, setShown] = useState(PAGE)
  const usedMarkets = useMemo(() => Object.entries(markets).filter(([k]) => sessions.some((s) => s.market === k)), [markets, sessions])
  const usedPresenters = useMemo(() => Object.entries(presenters).filter(([k]) => sessions.some((s) => s.presenter === k)), [presenters, sessions])
  const list = sessions
    .filter((s) => s.kind === kind && s.past === (when === 'past') && (market === 'all' || s.market === market) && (presenter === 'all' || s.presenter === presenter))
    .sort((a, b) => (when === 'past' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)))
  const reset = () => setShown(PAGE)
  const pill = (on: boolean) => cn('rounded-full px-5 py-2 text-sm font-semibold transition-colors', on ? 'bg-ink text-ink-foreground' : 'hover:text-primary-strong')
  const select = 'min-h-11 rounded-full border border-border bg-card px-4 text-sm font-semibold focus:border-primary focus:outline-none'
  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          <div role="tablist" aria-label="Type" className="inline-flex rounded-full border border-border bg-card p-1">
            {(['webinar', 'event'] as const).map((k) => <button key={k} id={`pane-${k}s`} role="tab" aria-selected={kind === k} onClick={() => { setKind(k); setWhen(firstWhen(k)); reset() }} className={pill(kind === k)}>{k === 'webinar' ? 'Webinars' : 'Events'}</button>)}
          </div>
          <div role="tablist" aria-label="When" className="inline-flex rounded-full border border-border bg-card p-1">
            {(['upcoming', 'past'] as const).map((w) => <button key={w} id={`sub-${kind}-${w}`} role="tab" aria-selected={when === w} onClick={() => { setWhen(w); reset() }} className={pill(when === w)}>{w === 'upcoming' ? 'Upcoming' : 'Previous'} <span className="opacity-60">{sessions.filter((s) => s.kind === kind && s.past === (w === 'past')).length}</span></button>)}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="sr-only" htmlFor="sess-market">Location</label>
          <select id="sess-market" value={market} onChange={(e) => { setMarket(e.target.value); reset() }} className={select}><option value="all">Global Locations (All Markets)</option>{usedMarkets.map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
          <label className="sr-only" htmlFor="sess-presenter">Presenter</label>
          <select id="sess-presenter" value={presenter} onChange={(e) => { setPresenter(e.target.value); reset() }} className={select}><option value="all">All Facilitators &amp; Presenters</option>{usedPresenters.map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="mt-8 rounded-card border border-dashed border-border bg-card p-10 text-center">
          <CalendarDays aria-hidden className="mx-auto size-8 text-primary-strong" />
          <p className="display mt-3 text-2xl">{when === 'upcoming' ? `No upcoming ${kind}s scheduled right now` : `No previous ${kind}s match`}</p>
          <p className="mt-2 text-muted-foreground">{when === 'upcoming' ? 'Register your interest below and we will let you know when the next session opens.' : 'Try another location or presenter.'}</p>
          {when === 'upcoming' && <a href="#register" className="mt-5 inline-flex rounded-full bg-primary px-6 py-2.5 font-semibold text-foreground hover:bg-secondary">Register your interest</a>}
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, shown).map((s) => (
            <li key={s.id} className="animate-rise flex flex-col overflow-hidden rounded-card border border-border bg-card transition-shadow hover:shadow-xl">
              {s.image ? (
                <div className="relative aspect-[4/3] bg-muted"><Image src={s.image} alt={s.topic} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className={cn('object-cover', s.past && 'grayscale-[40%]')} /></div>
              ) : (
                <div className="bg-ink-glow flex aspect-[4/3] flex-col justify-end p-6 text-ink-foreground"><span className="label-mono text-[11px] text-secondary">{s.kind === 'event' ? 'Event' : 'Webinar'}</span><span className="display mt-2 text-3xl">{s.label}</span></div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-semibold leading-snug">{s.topic}</h3>
                <ul className="mt-3 grid gap-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CalendarDays aria-hidden className="size-4 text-primary-strong" />{s.label}</li>
                  <li className="flex items-center gap-2"><Clock aria-hidden className="size-4 text-primary-strong" />{s.time}</li>
                  <li className="flex items-center gap-2"><MapPin aria-hidden className="size-4 text-primary-strong" />{markets[s.market] ?? s.market}</li>
                  <li className="flex items-center gap-2">{s.kind === 'webinar' ? <Video aria-hidden className="size-4 text-primary-strong" /> : <Mic aria-hidden className="size-4 text-primary-strong" />}{presenters[s.presenter] ?? s.presenter}</li>
                </ul>
                <div className="mt-auto pt-5">
                  {!s.past && s.registrationLink
                    ? <a href={s.registrationLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary">Register now<ArrowUpRight aria-hidden className="size-4" /></a>
                    : !s.past ? <a href="#register" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground hover:bg-primary hover:text-foreground">Register your interest</a>
                    : <span className="label-mono text-[11px] text-muted-foreground">Session held</span>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {list.length > shown && <div className="mt-8 text-center"><button onClick={() => setShown((n) => n + PAGE)} className="rounded-full border border-border bg-card px-6 py-2.5 font-semibold hover:border-primary">Load more sessions</button></div>}
    </div>
  )
}
