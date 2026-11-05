'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { cn } from '@/lib/cn'

export type Photo = { src: string; width: number; height: number }
export type PhotoSet = { campus: string; images: Photo[] }

/** Campus tabs over a masonry grid, with one keyboard-friendly lightbox (Esc closes, ←/→ step through). */
export function PhotoGallery({ sets }: { sets: PhotoSet[] }) {
  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef<HTMLDialogElement>(null)
  const imgs = sets[tab]?.images ?? []
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + imgs.length) % imgs.length)), [imgs.length])
  useEffect(() => {
    const dl = ref.current
    if (!dl) return
    if (open !== null && !dl.open) dl.showModal()
    if (open === null && dl.open) dl.close()
  }, [open])
  useEffect(() => {
    if (open === null) return
    const k = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, step])
  const label = (i: number) => `${sets[tab].campus}, photo ${i + 1} of ${imgs.length}`
  return (
    <div>
      <div role="tablist" aria-label="Campus" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {sets.map((s, i) => (
          <button key={s.campus} role="tab" aria-selected={tab === i} onClick={() => setTab(i)} className={cn('shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors', tab === i ? 'bg-ink text-ink-foreground' : 'border border-border bg-card hover:border-primary')}>
            {s.campus} <span className="opacity-60">{s.images.length}</span>
          </button>
        ))}
      </div>
      {sets.map((set, si) => (
        <ul key={set.campus} hidden={tab !== si} className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {set.images.map((p, i) => (
            <li key={p.src} className="mb-4 break-inside-avoid">
              <button type="button" onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden rounded-card" aria-label={`Open ${set.campus}, photo ${i + 1} of ${set.images.length}`}>
                <Image src={p.src} alt={`${set.campus}, photo ${i + 1} of ${set.images.length}`} width={p.width} height={p.height} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="h-auto w-full transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-card/90 opacity-0 transition-opacity group-hover:opacity-100"><Expand aria-hidden className="size-4" /></span>
              </button>
            </li>
          ))}
        </ul>
      ))}
      <dialog ref={ref} onClose={() => setOpen(null)} onClick={(e) => { if (e.target === ref.current) setOpen(null) }} aria-label="Photo viewer" className="m-auto w-[min(1200px,96vw)] bg-transparent p-0 backdrop:bg-ink/90">
        {open !== null && imgs[open] && (
          <div className="relative">
            <Image src={imgs[open].src} alt={label(open)} width={imgs[open].width} height={imgs[open].height} className="max-h-[85vh] w-full rounded-card object-contain" />
            <p className="mt-3 text-center text-sm text-ink-foreground">{label(open)}</p>
            <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-card"><X className="size-5" /></button>
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-card"><ChevronLeft className="size-6" /></button>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-card"><ChevronRight className="size-6" /></button>
          </div>
        )}
      </dialog>
    </div>
  )
}
