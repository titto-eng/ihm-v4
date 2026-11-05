'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Play, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { videoSrc } from '@/blocks/embeds'

export type GalleryVideo = { id: string; title: string }
export const ytPoster = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

/** One modal YouTube player; the iframe exists only while it is open, so nothing loads from YouTube until a click. */
export function VideoDialog({ video, onClose, channel }: { video: GalleryVideo | null; onClose: () => void; channel?: string }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (video && !d.open) d.showModal()
    if (!video && d.open) d.close()
  }, [video])
  return (
    <dialog ref={ref} onClose={onClose} onClick={(e) => { if (e.target === ref.current) onClose() }} aria-label={video?.title ?? 'Video'} className="m-auto w-[min(1080px,94vw)] overflow-hidden rounded-card bg-ink p-0 text-ink-foreground backdrop:bg-ink/80 backdrop:backdrop-blur-sm">
      {video && (
        <div>
          <div className="flex items-center justify-between gap-4 px-5 py-3">
            <p className="display truncate text-lg">{video.title}</p>
            <button type="button" onClick={onClose} aria-label="Close video" className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-ink-foreground/10"><X className="size-5" /></button>
          </div>
          <div className="relative aspect-video bg-black">
            <iframe src={videoSrc({ provider: 'youtube', id: video.id })} title={video.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="absolute inset-0 size-full" />
          </div>
          {channel && (
            <p className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-sm text-ink-foreground/70">
              Playing in a dedicated player so the rest of the page stays undisturbed.
              <a href={channel} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-secondary">Open IHM YouTube<ArrowUpRight aria-hidden className="size-4" /></a>
            </p>
          )}
        </div>
      )}
    </dialog>
  )
}

export function PlayBadge({ big = false, className }: { big?: boolean; className?: string }) {
  return (
    <span aria-hidden className={cn('grid place-items-center rounded-full bg-primary text-foreground shadow-[0_10px_30px_-6px_hsl(5_86%_40%/0.7)] transition-transform duration-300 group-hover/v:scale-110', big ? 'size-20' : 'size-14', className)}>
      <Play className={cn('translate-x-0.5 fill-current', big ? 'size-8' : 'size-6')} />
    </span>
  )
}

/** A grid of click-to-play video cards (poster + title) sharing one modal player. */
/** `feature` makes the first video twice the size (2 columns × 2 rows on wide screens), e.g. to fill the grid with 5 videos in 4 columns. */
export function VideoGallery({ videos, columns = 3, feature = false }: { videos: GalleryVideo[]; columns?: 1 | 2 | 3 | 4; feature?: boolean }) {
  const [open, setOpen] = useState<GalleryVideo | null>(null)
  return (
    <>
      <ul className={cn('grid gap-5', columns > 1 && 'sm:grid-cols-2', columns === 4 ? 'lg:grid-cols-4' : columns === 3 ? 'lg:grid-cols-3' : null)}>
        {videos.map((v, i) => {
          const big = feature && i === 0 && columns > 1
          return (
          <li key={v.id} className={cn(big && 'sm:col-span-2 lg:row-span-2')}>
            <button type="button" onClick={() => setOpen(v)} className="group/v flex h-full w-full flex-col overflow-hidden rounded-card border border-border bg-card text-left text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
              <span className={cn('relative block aspect-video overflow-hidden bg-ink', big && 'lg:aspect-auto lg:min-h-0 lg:flex-1')}>
                {/* eslint-disable-next-line @next/next/no-img-element -- YouTube poster (i.ytimg.com is in the CSP img-src) */}
                <img src={ytPoster(v.id)} alt="" loading="lazy" decoding="async" width={480} height={360} className={cn('size-full object-cover opacity-90 transition-transform duration-700 group-hover/v:scale-105', big && 'lg:absolute lg:inset-0')} />
                <span className="absolute inset-0 grid place-items-center bg-gradient-to-t from-ink/60 to-transparent"><PlayBadge big={columns === 1 || big} /></span>
                <span className="label-mono absolute top-3 left-3 rounded-full bg-card/95 px-2.5 py-1 text-[10px] text-foreground">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <span className={cn('flex items-start justify-between gap-3 p-4', !big && 'flex-1')}>
                <span className={cn('font-semibold leading-snug', big && 'lg:text-lg')}>{v.title}</span>
              </span>
            </button>
          </li>
          )
        })}
      </ul>
      <VideoDialog video={open} onClose={() => setOpen(null)} />
    </>
  )
}
