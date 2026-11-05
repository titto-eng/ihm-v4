'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'

// The Fielda showcase of /school-of-social-work/study/ (DEC-36), as on the School's microsite (its js/showcases.js and the
// .fielda-* rules of css/site.css): a list of the seven Fielda screens on the left and the active screen in an app window on
// the right. The screens rotate every 6.5 s with a progress line under the window bar and under the active tab; rotation pauses
// while the pointer or focus is inside, while the tab is hidden, with reduced motion, or with "Pause rotation". Tabs follow the
// ARIA tab pattern (arrow keys, Home, End). Without JavaScript the first screen shows.

export type FieldaScreen = { src: string; title: string; caption: string }

const INTERVAL = 6500

export function FieldaShowcase({ screens }: { screens: FieldaScreen[] }) {
  const [current, setCurrent] = useState(0)
  const [manual, setManual] = useState(false) // paused with the button
  const [hold, setHold] = useState(false) // pointer or focus inside, or document hidden
  const [reduced, setReduced] = useState(false)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const root = useRef<HTMLDivElement>(null)
  const paused = manual || hold || reduced
  const n = screens.length

  const activate = useCallback((i: number, focus = false) => {
    const next = (i + n) % n
    setCurrent(next)
    if (focus) tabs.current[next]?.focus()
  }, [n])

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    const vis = () => setHold(document.hidden)
    document.addEventListener('visibilitychange', vis)
    return () => { mq.removeEventListener('change', sync); document.removeEventListener('visibilitychange', vis) }
  }, [])

  // A new timer on every change of screen restarts the 6.5 s (as clicking a tab does on the microsite).
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setCurrent((c) => (c + 1) % n), INTERVAL)
    return () => clearInterval(t)
  }, [paused, current, n])

  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: current + 1, ArrowRight: current + 1, ArrowUp: current - 1, ArrowLeft: current - 1, Home: 0, End: n - 1 }
    if (keys[e.key] === undefined) return
    e.preventDefault()
    activate(keys[e.key], true)
  }

  return (
    <div
      ref={root}
      aria-label="Fielda placement platform showcase"
      data-paused={paused || undefined}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => { if (!root.current?.contains(e.relatedTarget as Node | null)) setHold(false) }}
      className="group/fielda grid border border-border bg-card shadow-[10px_10px_0_0_#f0dfc3] min-[801px]:grid-cols-[245px_minmax(0,1fr)]"
    >
      <div role="tablist" aria-label="Fielda features" aria-orientation="vertical" className="grid grid-cols-1 bg-background p-3 min-[521px]:grid-cols-2 min-[801px]:flex min-[801px]:flex-col">
        {screens.map((s, i) => {
          const active = i === current
          return (
            <button
              key={s.title}
              ref={(el) => { tabs.current[i] = el }}
              type="button"
              role="tab"
              id={`fielda-tab-${i}`}
              aria-controls={`fielda-panel-${i}`}
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              onClick={() => activate(i)}
              onKeyDown={onKey}
              className={cn(
                'relative flex min-w-0 flex-col gap-[3px] overflow-hidden border-b border-border px-3 py-[13px] text-left text-muted-foreground transition-colors hover:bg-[#f7e5c5]',
                active && 'bg-[#f7e5c5] shadow-[inset_-3px_0_0_var(--color-primary)]',
              )}
            >
              <strong className="text-[12px] font-bold text-foreground">{s.title}</strong>
              <span className="text-[10px]">{s.caption}</span>
              {active && !reduced && (
                <span key={`p-${current}`} aria-hidden className="fielda-progress absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-secondary to-primary" />
              )}
            </button>
          )
        })}
        {!reduced && (
          <button
            type="button"
            aria-pressed={manual}
            aria-label={`${manual ? 'Resume' : 'Pause'} Fielda rotation`}
            onClick={() => setManual((m) => !m)}
            className="col-span-full mt-2 border border-border bg-card px-3 py-[11px] text-[10px] font-extrabold tracking-[0.04em] text-primary-strong hover:border-primary hover:bg-[#f7e5c5] min-[801px]:mt-auto"
          >
            {manual ? 'Resume rotation' : 'Pause rotation'}
          </button>
        )}
      </div>

      <div className="min-w-0 bg-[linear-gradient(145deg,#281713,#4a241c)] p-2.5 min-[801px]:p-[18px]">
        {screens.map((s, i) => (
          <div key={s.title} role="tabpanel" id={`fielda-panel-${i}`} aria-labelledby={`fielda-tab-${i}`} hidden={i !== current} className={cn('h-full', !reduced && 'fielda-panel-in')}>
            <figure className="m-0 h-full overflow-hidden rounded-[3px] border border-[color-mix(in_srgb,var(--color-secondary)_42%,rgb(255_255_255/0.2))] bg-[#f7f8f3] shadow-[6px_6px_0_rgb(237_171_55/0.14)] min-[801px]:shadow-[12px_12px_0_rgb(237_171_55/0.16),0_22px_48px_rgb(10_5_4/0.28)]">
              <div className="flex items-center gap-3 bg-[#321b16] px-[13px] py-2.5 text-[11px] text-white">
                <span aria-hidden className="flex gap-[5px]">
                  <i className="block size-[7px] rounded-full bg-secondary" />
                  <i className="block size-[7px] rounded-full bg-primary" />
                  <i className="block size-[7px] rounded-full bg-white opacity-55" />
                </span>
                <b className="font-semibold tracking-[0.03em]">fielda · {s.title.toLowerCase()}</b>
                <span className="ml-auto text-[9px] font-extrabold tracking-[0.1em] text-[#e9c7b9] tabular-nums">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
              </div>
              <div aria-hidden className="h-[3px] overflow-hidden bg-[#513028]">
                {i === current && <span key={`w-${current}`} className={cn('block h-full w-full bg-gradient-to-r from-secondary to-primary', reduced ? '' : 'fielda-progress')} />}
              </div>
              <div className="group/img relative aspect-[1.25] overflow-hidden bg-[#eef4ee] min-[521px]:aspect-[1734/907]">
                {i === current && (
                  <Image
                    key={`i-${current}`}
                    src={s.src}
                    alt={`Fielda - ${s.title} interface`}
                    fill
                    sizes="(min-width:801px) 60vw, 100vw"
                    className={cn('object-cover object-left transition-transform duration-500 min-[521px]:object-center', !reduced && 'fielda-image-in group-hover/img:scale-[1.035]')}
                  />
                )}
                <span aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.28)]" />
              </div>
              <figcaption className="sr-only">{s.title} - {s.caption}</figcaption>
            </figure>
          </div>
        ))}
      </div>
    </div>
  )
}
