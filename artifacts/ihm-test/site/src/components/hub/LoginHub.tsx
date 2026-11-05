import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { HeroRays } from '@/blocks/hero/Component'
import { Eyebrow } from '@/components/micro-credentials/parts'

export type HubTile = { title: string; href: string; note: string; Icon: LucideIcon }

/** /student-login/ and /staff-login/: one ink screen of large link tiles to the systems people sign in to. */
export function LoginHub({ eyebrow, title, intro, tiles }: { eyebrow: string; title: React.ReactNode; intro: string; tiles: HubTile[] }) {
  return (
    <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
      <HeroRays id="hub-rays" className="-right-24 -bottom-28 -z-10 w-[30rem] opacity-[0.12]" />
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20">
        <div className="animate-rise max-w-2xl">
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <h1 className="display text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.03]">{title}</h1>
          <p className="mt-5 text-lg text-ink-foreground/80">{intro}</p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map(({ title: t, href, note, Icon }) => {
            const ext = /^https?:/.test(href)
            const cls = 'group flex h-full items-start gap-4 rounded-card bg-ink-foreground/5 p-6 ring-1 ring-ink-foreground/10 transition-all hover:-translate-y-1 hover:bg-ink-foreground/10 hover:ring-secondary/60'
            const body = (
              <>
                <span className="bg-brand-gradient grid size-12 shrink-0 place-items-center rounded-2xl text-foreground transition-transform group-hover:scale-105"><Icon aria-hidden className="size-6" /></span>
                <span className="min-w-0 flex-1"><span className="display block text-xl">{t}</span><span className="mt-1 block text-sm text-ink-foreground/70">{note}</span></span>
                {ext ? <ArrowUpRight aria-hidden className="size-5 shrink-0 text-secondary" /> : <ArrowRight aria-hidden className="size-5 shrink-0 text-secondary" />}
              </>
            )
            return <li key={t + href}>{ext ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{body}<span className="sr-only"> (opens in a new tab)</span></a> : <Link href={href} className={cls}>{body}</Link>}</li>
          })}
        </ul>
      </div>
    </section>
  )
}
