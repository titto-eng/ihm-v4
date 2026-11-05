import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, BookMarked, CalendarCheck, LogIn } from 'lucide-react'
import { HeroRays } from '@/blocks/hero/Component'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { cn } from '@/lib/cn'
import { LIBRARY_NAV, LIBRARY_REQUEST, PRIMO } from '@/content/library'
import { LibrarySearch } from './LibrarySearch.client'

const ALS = 'https://outlook.office365.com/owa/calendar/AcademicLanguageSupport@hcig.onmicrosoft.com/bookings/?skipRedirect=1'

/** Every /library/* page: ink hero with the catalogue search, a sub-navigation, the page, and the library help band. */
export function LibraryShell({ path, eyebrow = 'IHM Library', title, intro, children, image }: {
  path: string; eyebrow?: string; title: ReactNode; intro?: string; children: ReactNode; image?: string
}) {
  return (
    <>
      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="lib-rays" className="-top-24 -right-24 -z-10 w-[28rem] opacity-[0.12]" />
        <div className={cn('mx-auto grid max-w-site gap-10 px-5 pt-14 pb-10 md:px-8 md:pt-20', image && 'lg:grid-cols-[1.3fr_0.7fr] lg:items-center')}>
          <div className="animate-rise">
            <Eyebrow onDark>{eyebrow}</Eyebrow>
            <h1 className="display text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[1.03]">{title}</h1>
            {intro && <p className="mt-5 max-w-2xl text-lg text-ink-foreground/80">{intro}</p>}
            <LibrarySearch onDark className="mt-8" />
            <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href={PRIMO.home} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-secondary"><LogIn aria-hidden className="size-4" />Log in for full access</a>
              <a href={PRIMO.home} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-ink-foreground/80 hover:text-secondary">My Library Account<ArrowUpRight aria-hidden className="size-4" /></a>
            </p>
          </div>
          {image && (
            <div className="relative hidden aspect-square overflow-hidden rounded-[2rem] lg:block">
              <Image src={image} alt="" fill priority sizes="30vw" className="object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
          )}
        </div>
        <nav aria-label="Library" className="mx-auto max-w-site px-5 pb-6 md:px-8">
          <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {LIBRARY_NAV.map((n) => (
              <li key={n.href} className="shrink-0">
                <Link href={n.href} aria-current={n.href === path ? 'page' : undefined} className={cn('inline-block rounded-full px-4 py-2 text-sm font-semibold transition-colors', n.href === path ? 'bg-secondary text-foreground' : 'bg-ink-foreground/10 hover:bg-ink-foreground/20')}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      {children}
      <section data-tone="sunrise" className="bg-sunrise-glow">
        <div className="mx-auto grid max-w-site gap-6 px-5 py-12 md:grid-cols-2 md:px-8">
          <a href={LIBRARY_REQUEST} target="_blank" rel="noopener noreferrer" className="group/h flex items-center gap-5 rounded-card bg-card/90 p-6 transition-transform hover:-translate-y-1">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ink text-secondary"><BookMarked aria-hidden className="size-6" /></span>
            <span><span className="display block text-2xl">Request Library Resource</span><span className="text-sm text-muted-foreground">Can&apos;t find a book or article? Ask the library to source it.</span></span>
            <ArrowUpRight aria-hidden className="ml-auto size-5 shrink-0 text-primary-strong" />
          </a>
          <a href={ALS} target="_blank" rel="noopener noreferrer" className="group/h flex items-center gap-5 rounded-card bg-card/90 p-6 transition-transform hover:-translate-y-1">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ink text-secondary"><CalendarCheck aria-hidden className="size-6" /></span>
            <span><span className="display block text-2xl">Academic &amp; Language Support</span><span className="text-sm text-muted-foreground">Book a one-to-one session with the support team.</span></span>
            <ArrowUpRight aria-hidden className="ml-auto size-5 shrink-0 text-primary-strong" />
          </a>
        </div>
      </section>
    </>
  )
}
