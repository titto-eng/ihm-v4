'use client'

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { SSW_BASE, SSW_MENU, type SswNavItem } from '@/content/school-of-social-work'

// The School of Social Work sub-navigation (DEC-36), sticky under the site header, with the microsite's "Study with us" menu.
// The menu opens on hover (pointer devices), on click or Enter/Space, and with ArrowDown; Escape, a click outside or leaving
// the menu closes it. The panel is placed under its button but outside the horizontally scrolling list, so it is never clipped
// on small screens. Without JavaScript the menu's first page is still reachable through its links on the School pages.

const hrefOf = (slug: string) => `${SSW_BASE}/${slug ? `${slug}/` : ''}`

const linkCls = (on: boolean) =>
  cn('relative inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors', on ? 'text-primary-strong' : 'text-foreground/70 hover:text-foreground')

const Underline = () => <span aria-hidden className="bg-brand-gradient absolute inset-x-3 -bottom-2 h-0.5 rounded-full" />

export function SchoolNav({ active }: { active: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const [left, setLeft] = useState(0)
  const bar = useRef<HTMLDivElement>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const panel = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const id = useId()

  const place = (i: number) => {
    const b = buttons.current[i]
    const box = bar.current
    if (!b || !box) return
    const width = 280
    const x = b.getBoundingClientRect().left - box.getBoundingClientRect().left
    setLeft(Math.max(0, Math.min(x, box.clientWidth - width)))
  }
  const show = (i: number) => { if (closeTimer.current) clearTimeout(closeTimer.current); place(i); setOpen(i) }
  const hideSoon = () => { if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpen(null), 160) }

  useEffect(() => {
    if (open === null) return
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (!panel.current?.contains(t) && !buttons.current[open]?.contains(t)) setOpen(null)
    }
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') { setOpen(null); buttons.current[open]?.focus() } }
    const onScroll = () => place(open)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onScroll)
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onScroll) }
  }, [open])

  const onButtonKey = (e: KeyboardEvent, i: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      show(i)
      requestAnimationFrame(() => panel.current?.querySelector<HTMLAnchorElement>('a')?.focus())
    }
  }
  const onPanelKey = (e: KeyboardEvent) => {
    const links = [...(panel.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])]
    const at = links.indexOf(document.activeElement as HTMLAnchorElement)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      links[(at + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length]?.focus()
    }
  }

  const menu: SswNavItem | null = open === null ? null : SSW_MENU[open]

  return (
    <nav aria-label="School of Social Work pages" className="sticky top-[73px] z-30 border-b border-border bg-card/95 backdrop-blur">
      <div ref={bar} className="relative mx-auto flex max-w-site items-center gap-4 px-5 md:px-8">
        <Link href={`${SSW_BASE}/`} className="hidden shrink-0 border-r border-border py-2 pr-4 text-sm leading-tight lg:block">
          <span className="block text-[11px] text-muted-foreground">School of</span><span className="font-semibold">Social Work</span>
        </Link>
        <ul className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]" onScroll={() => open !== null && place(open)}>
          {SSW_MENU.map((n, i) => {
            if (n.items) {
              const on = Boolean(n.slugs?.includes(active))
              const expanded = open === i
              return (
                <li key={n.label} className="shrink-0" onPointerEnter={(e) => e.pointerType === 'mouse' && show(i)} onPointerLeave={(e) => e.pointerType === 'mouse' && hideSoon()}>
                  <button
                    ref={(el) => { buttons.current[i] = el }}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`${id}-menu`}
                    onClick={() => (expanded ? setOpen(null) : show(i))}
                    onKeyDown={(e) => onButtonKey(e, i)}
                    className={cn(linkCls(on || expanded), 'cursor-pointer')}
                  >
                    {n.label}
                    <ChevronDown aria-hidden className={cn('size-3.5 transition-transform duration-200', expanded && 'rotate-180')} />
                    {on && <Underline />}
                  </button>
                </li>
              )
            }
            const on = n.slug === active
            return (
              <li key={n.label} className="shrink-0">
                <Link href={hrefOf(n.slug ?? '')} aria-current={on ? 'page' : undefined} className={linkCls(on)}>
                  {n.label}
                  {on && <Underline />}
                </Link>
              </li>
            )
          })}
        </ul>

        <div
          ref={panel}
          id={`${id}-menu`}
          hidden={!menu}
          onPointerEnter={(e) => e.pointerType === 'mouse' && open !== null && show(open)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && hideSoon()}
          onKeyDown={onPanelKey}
          onBlur={(e) => { if (!panel.current?.contains(e.relatedTarget as Node | null) && !buttons.current.includes(e.relatedTarget as HTMLButtonElement)) setOpen(null) }}
          style={{ left }}
          className="absolute top-full z-40 mt-px w-[280px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-b-2xl border border-t-0 border-border bg-card shadow-[0_24px_48px_-20px_rgb(38_27_24/0.45)] motion-safe:animate-[ssw-menu-in_.18s_ease-out]"
        >
          <span aria-hidden className="bg-brand-gradient block h-0.5" />
          {menu?.items && (
            <ul className="py-2">
              {menu.items.map((it) => {
                const here = it.href === hrefOf(active) || false
                return (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      onClick={() => setOpen(null)}
                      aria-current={here ? 'page' : undefined}
                      className={cn('group flex items-center gap-3 px-5 py-3 text-[15px] transition-colors hover:bg-blush focus-visible:bg-blush focus-visible:outline-none', here ? 'font-semibold text-primary-strong' : 'text-foreground/80 hover:text-foreground')}
                    >
                      <span aria-hidden className={cn('h-4 w-0.5 rounded-full transition-colors', here ? 'bg-primary' : 'bg-transparent group-hover:bg-secondary group-focus-visible:bg-secondary')} />
                      {it.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}
