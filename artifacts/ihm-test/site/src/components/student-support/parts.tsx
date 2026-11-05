import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check, Mail, MessageCircle, Phone } from 'lucide-react'
import { HeroRays } from '@/blocks/hero/Component'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { cn } from '@/lib/cn'
import { LIVECHAT, SUPPORT_EMAIL, SUPPORT_NAV } from '@/content/student-support'

/** Hero + sub-navigation shared by the student support and international student pages. */
export function SupportShell({ path, eyebrow = 'Student support', title, intro, image, actions, children, nav = SUPPORT_NAV, navLabel = 'Student support', band }: {
  path: string; eyebrow?: string; title: ReactNode; intro?: string; image?: { src: string; alt: string }; actions?: ReactNode; children: ReactNode
  /** Sub-navigation (defaults to the student support pages; the international pages pass their own). */
  nav?: readonly { href: string; label: string }[]; navLabel?: string
  /** Closing band (defaults to the Student Support contact band). */
  band?: ReactNode
}) {
  return (
    <>
      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="support-rays" className="-right-24 -bottom-28 -z-10 w-[28rem] opacity-[0.13]" />
        <div className={cn('mx-auto grid max-w-site gap-10 px-5 pt-14 pb-10 md:px-8 md:pt-20', image && 'lg:grid-cols-[1.25fr_0.75fr] lg:items-center')}>
          <div className="animate-rise">
            <Eyebrow onDark>{eyebrow}</Eyebrow>
            <h1 className="display text-[clamp(2.3rem,5vw,4.2rem)] leading-[1.04]">{title}</h1>
            {intro && <p className="mt-5 max-w-2xl text-lg text-ink-foreground/80">{intro}</p>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {image && (
            <div className="relative hidden aspect-square overflow-hidden rounded-[2rem] lg:block">
              <Image src={image.src} alt={image.alt} fill priority sizes="30vw" className="object-cover" />
            </div>
          )}
        </div>
        {nav.length > 0 && <nav aria-label={navLabel} className="mx-auto max-w-site px-5 pb-6 md:px-8">
          <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {nav.map((n) => (
              <li key={n.href} className="shrink-0">
                <Link href={n.href} aria-current={n.href === path ? 'page' : undefined} className={cn('inline-block rounded-full px-4 py-2 text-sm font-semibold transition-colors', n.href === path ? 'bg-secondary text-foreground' : 'bg-ink-foreground/10 hover:bg-ink-foreground/20')}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>}
        {nav.length === 0 && <div className="pb-6" />}
      </section>
      {children}
      {band ?? <ContactBand />}
    </>
  )
}

export const heroBtn = (primary = false) => cn('inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-2.5 font-semibold transition-colors', primary ? 'bg-primary text-foreground hover:bg-secondary' : 'border border-ink-foreground/30 hover:border-secondary hover:text-secondary')

/** "Need to talk now?" band: emergency, Lifeline and Beyond Blue. Shown on the wellbeing pages. */
export function CrisisBand() {
  const lines = [['Emergency (Police, Fire, Ambulance)', '000'], ['Lifeline (24 hours)', '13 11 14'], ['Beyond Blue (24/7)', '1300 22 4636'], ['13YARN (24/7)', '13 92 76']]
  return (
    <aside aria-label="Urgent help" className="rounded-card border border-primary/40 bg-blush/60 p-5 md:p-6">
      <p className="font-semibold">If you or someone else is in immediate danger, call <a href="tel:000" className="text-primary-strong underline">000</a>. For 24/7 support:</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {lines.map(([l, n]) => <li key={n}><a href={`tel:${n.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold hover:text-primary-strong"><Phone aria-hidden className="size-4 text-primary-strong" />{l}: {n}</a></li>)}
      </ul>
    </aside>
  )
}

/** Closing band on every support page: Student Support mailbox and LiveChat. */
export function ContactBand() {
  return (
    <section data-tone="sunrise" className="bg-sunrise-glow">
      <div className="mx-auto grid max-w-site gap-4 px-5 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:items-center md:px-8">
        <p className="display text-2xl md:text-3xl">Not sure where to start? We&apos;ve got your back.</p>
        <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-4 rounded-card bg-card/90 p-5 transition-transform hover:-translate-y-1"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-secondary"><Mail aria-hidden className="size-5" /></span><span className="min-w-0"><span className="block font-semibold">Email Student Support</span><span className="block truncate text-sm text-muted-foreground">{SUPPORT_EMAIL}</span></span></a>
        <a href={LIVECHAT} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-card bg-card/90 p-5 transition-transform hover:-translate-y-1"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-secondary"><MessageCircle aria-hidden className="size-5" /></span><span><span className="block font-semibold">LiveChat, 24/7</span><span className="block text-sm text-muted-foreground">Get instant support</span></span><ArrowUpRight aria-hidden className="ml-auto size-4" /></a>
      </div>
    </section>
  )
}

export function Ticks({ items, onDark = false }: { items: readonly string[]; onDark?: boolean }) {
  return (
    <ul className="grid gap-2.5">
      {items.map((t) => <li key={t} className="flex gap-3 text-[15px]"><span className={cn('mt-0.5 grid size-6 shrink-0 place-items-center rounded-full', onDark ? 'bg-secondary text-foreground' : 'bg-brand-gradient text-foreground')}><Check aria-hidden className="size-3.5" /></span>{t}</li>)}
    </ul>
  )
}

/** A heading + intro block used across these pages. */
export function Lead({ eyebrow, title, children, onDark }: { eyebrow: string; title: ReactNode; children?: ReactNode; onDark?: boolean }) {
  return <div className="mb-10 max-w-3xl"><Eyebrow onDark={onDark}>{eyebrow}</Eyebrow><h2 className="display text-display-md">{title}</h2>{children && <div className={cn('mt-4 space-y-3 text-lg', onDark ? 'text-ink-foreground/80' : 'text-muted-foreground')}>{children}</div>}</div>
}

export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href) || href.endsWith('.pdf')
