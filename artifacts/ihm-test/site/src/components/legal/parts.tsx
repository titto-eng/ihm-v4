import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Mail, Phone } from 'lucide-react'
import { HeroRays } from '@/blocks/hero/Component'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { KitBlocks } from '@/components/page-kit/Kit'
import { SupportShell } from '@/components/student-support/parts'
import { AdmissionsBand } from '@/components/admissions/parts'
import type { PolicyChapter } from '@/content/legal'
import { site } from '@/content/site'

export const LEGAL_NAV = [
  { href: '/ihm-privacy-policy/', label: 'Privacy policy' },
  { href: '/privacy-at-the-institute-of-health-and-management/', label: 'Website privacy' },
  { href: '/policies-procedures/', label: 'Policies & procedures' },
  { href: '/complaints-and-appeals/', label: 'Complaints & appeals' },
  { href: '/site-map/', label: 'Site map' },
] as const

type ShellProps = { path: string; eyebrow?: string; title: ReactNode; intro?: string; actions?: ReactNode; children: ReactNode }

/** Policy, privacy, site map and complaint pages: SupportShell with the legal sub-navigation and the admissions band. */
export function LegalShell(props: ShellProps) {
  return <SupportShell {...props} eyebrow={props.eyebrow ?? 'Policies'} nav={LEGAL_NAV} navLabel="Policies and legal" band={<AdmissionsBand />} />
}

/** A long policy: sticky contents list (desktop), chapters with anchors, optional extra sections after them. */
export function PolicyDoc({ chapters, after }: { chapters: PolicyChapter[]; after?: ReactNode }) {
  return (
    <Section>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[17rem_1fr]">
        <nav aria-label="Contents" className="lg:sticky lg:top-24 lg:self-start">
          <details className="group rounded-card border border-border bg-card p-5 lg:open:block" open>
            <summary className="label-mono cursor-pointer list-none text-primary-strong [&::-webkit-details-marker]:hidden">Contents</summary>
            <ol className="mt-3 max-h-[70vh] space-y-1 overflow-y-auto text-sm">
              {chapters.map((c) => (
                <li key={c.id}>
                  {c.group && <p className="label-mono mt-3 mb-1 text-[11px] text-muted-foreground first:mt-0">{c.group}</p>}
                  <a href={`#${c.id}`} className="block rounded-lg px-2 py-1.5 text-muted-foreground hover:bg-blush hover:text-foreground">{c.title}</a>
                </li>
              ))}
            </ol>
          </details>
        </nav>
        <div className="min-w-0 space-y-10">
          {chapters.map((c) => (
            <section key={c.id} id={c.id} className="scroll-mt-28">
              {c.group && <Eyebrow>{c.group}</Eyebrow>}
              <h2 className="display text-3xl leading-tight">{c.title}</h2>
              <KitBlocks blocks={c.blocks} className="mt-4 text-[16px] leading-relaxed" />
            </section>
          ))}
          {after}
        </div>
      </div>
    </Section>
  )
}

/** Shared by /thanks/, /thanks-events/ (and anything else that ends a form). */
export function ThankYou({ eyebrow, title, body, next }: { eyebrow: string; title: string; body: ReactNode; next: { href: string; label: string; note: string }[] }) {
  return (
    <>
      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="thanks-rays" className="-right-24 -bottom-28 -z-10 w-[28rem] opacity-[0.13]" />
        <div className="mx-auto max-w-3xl px-5 pt-20 pb-16 text-center md:px-8 md:pt-28">
          <span className="mx-auto grid size-20 animate-rise place-items-center rounded-full bg-brand-gradient text-foreground shadow-2xl"><CheckCircle2 aria-hidden className="size-10" /></span>
          <div className="mt-8"><Eyebrow onDark className="justify-center">{eyebrow}</Eyebrow></div>
          <h1 className="display text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.04]">{title}</h1>
          <div className="mx-auto mt-5 max-w-xl text-lg text-ink-foreground/80">{body}</div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary"><Phone aria-hidden className="size-4" />{site.phone} (toll free)</a>
            <a href={`mailto:${site.email}`} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink-foreground/30 px-6 font-semibold hover:border-secondary hover:text-secondary"><Mail aria-hidden className="size-4" />{site.email}</a>
          </div>
        </div>
      </section>
      <Section>
        <Eyebrow>While you wait</Eyebrow>
        <h2 className="display mb-8 text-display-md">Keep exploring</h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {next.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="group flex h-full flex-col rounded-card border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                <span className="display text-2xl">{n.label}</span>
                <span className="mt-2 flex-1 text-[15px] text-muted-foreground">{n.note}</span>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary-strong">Go<ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
