'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/cn'

export type HomeSlide = {
  id: string
  eyebrow?: string
  title: string
  body?: string
  image: { src: string; alt: string; position?: string }
  ctas: { label: string; href: string; external?: boolean }[]
}

const AUTOPLAY_MS = 7000

// Home hero (migrated from the WordPress front page carousel, 2026 banners): full-bleed photos that crossfade under the
// copy, coral-to-gold progress bars as the indicator, pause on hover/focus/hidden tab and under reduced motion.
// Every slide's copy is in the server HTML (slide one is the h1), so crawlers and no-JS visitors read all six.
export function HomeHero({ slides }: { slides: HomeSlide[] }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hold, setHold] = useState(false)
  const [reduced, setReduced] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const count = slides.length

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const set = () => setReduced(mq.matches)
    set()
    mq.addEventListener('change', set)
    const vis = () => setHold(document.hidden)
    document.addEventListener('visibilitychange', vis)
    return () => { mq.removeEventListener('change', set); document.removeEventListener('visibilitychange', vis) }
  }, [])

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count])

  const running = playing && !hold && !reduced && count > 1
  useEffect(() => {
    if (!running) return
    timer.current = setTimeout(() => go(index + 1), AUTOPLAY_MS)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [index, running, go])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="IHM highlights"
      className="relative isolate overflow-hidden bg-ink text-ink-foreground"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(index + 1); if (e.key === 'ArrowLeft') go(index - 1) }}
    >
      <div className="relative grid min-h-[34rem] md:min-h-[38rem] lg:min-h-[40rem]">
        {slides.map((s, i) => {
          const active = i === index
          const H = i === 0 ? 'h1' : 'h2'
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              inert={!active}
              className={cn('col-start-1 row-start-1 grid transition-opacity duration-1000 ease-out', active ? 'z-10 opacity-100' : 'z-0 opacity-0')}
            >
              {/* photo: top band on phones, full bleed from md */}
              <div className="relative h-56 sm:h-72 md:absolute md:inset-0 md:h-auto">
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  priority={i === 0}
                  loading={i === 0 ? undefined : 'lazy'}
                  sizes="100vw"
                  className={cn('object-cover transition-transform duration-[8000ms] ease-out', active && !reduced ? 'scale-105' : 'scale-100')}
                  style={{ objectPosition: s.image.position ?? '75% center' }}
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent md:bg-gradient-to-r md:from-ink md:via-ink/75 md:to-ink/5" />
              </div>
              <div className="relative mx-auto flex w-full max-w-site items-center px-5 pt-2 pb-28 md:px-8 md:py-24">
                <div className="max-w-xl lg:max-w-2xl">
                  {s.eyebrow && (
                    <p className={cn('label-mono mb-5 inline-flex items-center gap-2 rounded-full bg-ink-foreground/10 px-3.5 py-1.5 text-[11px] tracking-[0.16em] text-secondary ring-1 ring-secondary/30 backdrop-blur', active && !reduced && 'animate-rise')}>
                      <span aria-hidden className="bg-brand-gradient size-1.5 rounded-full" />{s.eyebrow}
                    </p>
                  )}
                  <H className={cn('display text-[clamp(2.3rem,5.6vw,4.6rem)] leading-[1.02] text-balance', active && !reduced && 'animate-rise')}>{s.title}</H>
                  <span aria-hidden className="bg-brand-gradient mt-6 block h-1 w-20 rounded-full" />
                  {s.body && <p className={cn('mt-6 max-w-lg text-lg leading-relaxed text-ink-foreground/85', active && !reduced && 'animate-rise [animation-delay:120ms]')}>{s.body}</p>}
                  <div className="mt-8 flex flex-wrap gap-3">
                    {s.ctas.map((c, ci) => {
                      const cls = cn(
                        'inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-2.5 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5',
                        ci === 0 ? 'bg-primary text-foreground shadow-[0_12px_28px_-14px_hsl(5_85%_55%/0.9)] hover:bg-secondary' : 'border border-ink-foreground/60 hover:border-secondary hover:text-secondary',
                      )
                      return c.external
                        ? <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>{c.label}<ArrowRight aria-hidden className="size-4" /></a>
                        : <Link key={c.href} href={c.href} className={cls}>{c.label}{ci === 0 && <ArrowRight aria-hidden className="size-4" />}</Link>
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="mx-auto flex max-w-site items-center gap-4 px-5 pb-6 md:px-8 md:pb-8">
            <div className="flex flex-1 gap-2" role="tablist" aria-label="Choose a slide">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1}: ${s.title}`}
                  onClick={() => go(i)}
                  className="group relative h-8 flex-1 max-w-24"
                >
                  <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-ink-foreground/25 group-hover:bg-ink-foreground/40">
                    <span
                      key={`${i}-${index}-${running}`}
                      className={cn('bg-brand-gradient block h-full origin-left rounded-full', i < index ? 'scale-x-100' : i === index ? (running ? 'animate-[hero-progress_linear_forwards]' : 'scale-x-100') : 'scale-x-0')}
                      style={i === index && running ? { animationDuration: `${AUTOPLAY_MS}ms` } : undefined}
                    />
                  </span>
                </button>
              ))}
            </div>
            <span className="label-mono hidden text-ink-foreground/70 sm:inline" aria-live={running ? 'off' : 'polite'}>
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide" className="grid size-10 place-items-center rounded-full border border-ink-foreground/40 transition-colors hover:border-secondary hover:text-secondary"><ChevronLeft className="size-5" /></button>
              <button type="button" onClick={() => go(index + 1)} aria-label="Next slide" className="grid size-10 place-items-center rounded-full border border-ink-foreground/40 transition-colors hover:border-secondary hover:text-secondary"><ChevronRight className="size-5" /></button>
              {!reduced && (
                <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} className="grid size-10 place-items-center rounded-full border border-ink-foreground/40 transition-colors hover:border-secondary hover:text-secondary">
                  {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
