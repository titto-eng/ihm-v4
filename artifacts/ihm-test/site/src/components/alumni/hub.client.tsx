'use client'

import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { PlayBadge, VideoDialog, ytPoster } from '@/components/media/VideoGallery.client'
import type { AlumniVideo } from '@/content/alumni'

const poster = ytPoster

/** "Alumni stories in their own words": course filter, a scroll-snap rail with prev/next, and the modal player. */
export function VideoStories({ videos, channel }: { videos: AlumniVideo[]; channel: string }) {
  const courses = ['All stories', ...new Set(videos.map((v) => v.course))]
  const [course, setCourse] = useState(courses[0])
  const [open, setOpen] = useState<AlumniVideo | null>(null)
  const rail = useRef<HTMLUListElement>(null)
  const list = course === courses[0] ? videos : videos.filter((v) => v.course === course)
  const scroll = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter stories by course" className="flex flex-wrap gap-2">
          {courses.map((c) => (
            <button key={c} type="button" aria-pressed={course === c} onClick={() => { setCourse(c); rail.current?.scrollTo({ left: 0 }) }} className={cn('rounded-full px-4 py-2 text-sm font-semibold transition-colors', course === c ? 'bg-ink text-ink-foreground' : 'border border-border bg-card hover:border-primary')}>{c}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous stories" className="grid size-11 place-items-center rounded-full border border-border bg-card hover:border-primary"><ChevronLeft className="size-5" /></button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next stories" className="grid size-11 place-items-center rounded-full border border-border bg-card hover:border-primary"><ChevronRight className="size-5" /></button>
        </div>
      </div>
      <ul ref={rail} className="-mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-6 [scrollbar-width:thin] md:-mx-8 md:px-8">
        {list.map((v) => (
          <li key={v.id} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
            <article className="group/v relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-card shadow-[0_18px_40px_-30px_hsl(348_35%_13%/0.4)] transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-video overflow-hidden bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element -- YouTube poster (i.ytimg.com is in the CSP img-src) */}
                <img src={poster(v.id)} alt="" loading="lazy" decoding="async" width={480} height={360} className="size-full object-cover opacity-90 transition-transform duration-700 group-hover/v:scale-105" />
                <span className="absolute inset-0 grid place-items-center bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"><PlayBadge /></span>
                <span className="absolute top-3 left-3 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold text-foreground">{v.course}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="display text-xl leading-snug">
                  <button type="button" onClick={() => setOpen(v)} className="text-left after:absolute after:inset-0 focus-visible:outline-none">{v.title}</button>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
                <span aria-hidden className="mt-auto pt-4 text-sm font-semibold text-primary-strong">Watch {v.name.split(' ')[0]}&apos;s story →</span>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <VideoDialog video={open} onClose={() => setOpen(null)} channel={channel} />
    </div>
  )
}

type Spot = { id: string; title: string; body: string; tag: string }

/** "Celebrating your achievement": a featured player card and the spotlight list that switches it. */
export function Spotlight({ items, channel }: { items: Spot[]; channel: string }) {
  const [i, setI] = useState(0)
  const [open, setOpen] = useState<Spot | null>(null)
  const cur = items[i]
  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <button type="button" onClick={() => setOpen(cur)} className="group/v relative block aspect-[4/3] overflow-hidden rounded-card bg-ink text-left text-ink-foreground sm:aspect-video" aria-label={`Play ${cur.title}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- YouTube poster */}
        <img key={cur.id} src={poster(cur.id)} alt="" loading="lazy" decoding="async" width={480} height={360} className="animate-rise size-full object-cover opacity-80 transition-transform duration-700 group-hover/v:scale-105" />
        <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <span className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-1/2"><PlayBadge big /></span>
        <span className="absolute right-0 bottom-0 left-0 p-6 md:p-8">
          <span className="label-mono text-[10px] text-secondary">Now featuring</span>
          <span className="display mt-2 block text-2xl md:text-3xl">{cur.title}</span>
          <span className="mt-2 block max-w-xl text-sm text-ink-foreground/80">{cur.body}</span>
        </span>
      </button>
      <ul className="grid content-start gap-3">
        {items.map((s, n) => (
          <li key={s.id}>
            <button type="button" onClick={() => setI(n)} aria-pressed={n === i} className={cn('flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all', n === i ? 'border-primary bg-card shadow-[0_14px_30px_-22px_hsl(5_60%_30%/0.6)]' : 'border-border bg-card/60 hover:border-primary/50')}>
              <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element -- YouTube poster */}
                <img src={poster(s.id)} alt="" loading="lazy" decoding="async" width={480} height={360} className="size-full object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold leading-snug">{s.title}</span>
                <span className="mt-1 line-clamp-2 block text-xs text-muted-foreground">{s.tag}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <VideoDialog video={open} onClose={() => setOpen(null)} channel={channel} />
    </div>
  )
}
