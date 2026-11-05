import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { AdmissionsBand } from '@/components/admissions/parts'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { SupportShell } from '@/components/student-support/parts'
import { cn } from '@/lib/cn'
import { legacyImage } from '@/lib/legacy-image'
import { PARTNERS } from '@/content/partnerships'
import { ETHICS_EMAIL, RESEARCH_NAV, type Person } from '@/content/research'

type ShellProps = { path: string; eyebrow?: string; title: ReactNode; intro?: string; image?: { src: string; alt: string }; actions?: ReactNode; children: ReactNode }

export const PARTNER_NAV = [
  { href: '/cintana-alliance-partnership-ihm/', label: 'Strategic collaboration' },
  { href: '/cintana-education-partnership-how-are-we-leveraging-global-expertise/', label: 'Cintana Education' },
  { href: '/arizona-state-university-asu-partnership/', label: 'Arizona State University' },
  { href: '/collaboration-with-ramsay-healthcare/', label: 'Ramsay Health Care' },
] as const

/** The four partnership pages: SupportShell with the partnership sub-navigation and the admissions contact band. */
export function PartnerShell(props: ShellProps) {
  return <SupportShell {...props} eyebrow={props.eyebrow ?? 'Global partnerships'} nav={PARTNER_NAV} navLabel="Partnerships" band={<AdmissionsBand />} />
}

/** The research pages: SupportShell with the research sub-navigation and the research ethics contact band. */
export function ResearchShell(props: ShellProps) {
  return <SupportShell {...props} eyebrow={props.eyebrow ?? 'Research & innovation'} nav={RESEARCH_NAV} navLabel="Research" band={<ResearchBand />} />
}

export function ResearchBand() {
  return (
    <section data-tone="ink" className="bg-ink-glow text-ink-foreground">
      <div className="mx-auto grid max-w-site gap-8 px-5 py-14 md:grid-cols-[1.3fr_1fr] md:items-center md:px-8">
        <div>
          <Eyebrow onDark>Research enquiries</Eyebrow>
          <h2 className="display text-display-md">Talk to the Research &amp; Innovation team</h2>
          <p className="mt-3 max-w-xl text-ink-foreground/80">Ethics applications, risk classification, external HREC referrals and research collaboration.</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <a href={`mailto:${ETHICS_EMAIL}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary"><Mail aria-hidden className="size-4" />{ETHICS_EMAIL}</a>
          <Link href="/research-initiatives-global-collaborations/#collaborate" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink-foreground/30 px-6 font-semibold hover:border-secondary hover:text-secondary">Collaborate with IHM<ArrowRight aria-hidden className="size-4" /></Link>
        </div>
      </div>
    </section>
  )
}

const initials = (n: string) => n.replace(/^(Ms|Mr|Dr)\.?\s+/, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('')

/** Portrait card; the photo is a live-only image until `npm run assets:legacy` has run, so it falls back to initials. */
export function PersonCard({ person, compact = false }: { person: Person; compact?: boolean }) {
  const src = person.image ? legacyImage(person.image, '') : ''
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-card transition-shadow hover:shadow-lg">
      <div className={cn('relative overflow-hidden bg-blush', compact ? 'aspect-[4/4]' : 'aspect-[4/5]')}>
        {src
          ? <Image src={src} alt={`Portrait of ${person.name}`} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
          : <span aria-hidden className="bg-brand-gradient absolute inset-0 grid place-items-center text-4xl font-bold text-foreground">{initials(person.name)}</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="display text-xl">{person.name}</h3>
        <p className="mt-1 flex-1 text-sm text-muted-foreground">{person.role}</p>
        {person.bio && <Link href={person.bio} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong hover:underline">View bio<ArrowRight aria-hidden className="size-4" /></Link>}
      </div>
    </article>
  )
}

/** Cintana, ASU and Ramsay cards linking to each partner page (`except` hides the current one). */
export function PartnerCards({ except, tone = 'muted', title = 'Our strategic partners' }: { except?: string; tone?: 'default' | 'muted'; title?: string }) {
  const list = PARTNERS.filter((p) => p.href !== except)
  return (
    <Section tone={tone} anchorId="partners">
      <Eyebrow>Education for Employment</Eyebrow>
      <h2 className="display mb-10 text-display-md">{title}</h2>
      <div className={cn('grid grid-cols-1 gap-5', list.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
        {list.map((p) => (
          <Link key={p.key} href={p.href} className="group flex flex-col rounded-card border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl">
            <div className="relative h-20 w-40">
              {p.key === 'cintana' && !legacyImage(p.logo, '')
                ? <span className="display flex h-full items-center text-3xl tracking-wide">CINTANA</span>
                : <Image src={p.logo} alt={`${p.name} logo`} fill sizes="160px" className="object-contain object-left" />}
            </div>
            <h3 className="display mt-6 text-2xl">{p.name}</h3>
            <p className="mt-3 flex-1 text-[15px] text-muted-foreground">{p.summary}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary-strong">Know more<ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
          </Link>
        ))}
      </div>
    </Section>
  )
}

/** Text beside a photo, alternating sides. */
export function Feature({ title, body, image, flip = false, eyebrow }: { title: string; body: ReactNode; image?: { src: string; alt: string }; flip?: boolean; eyebrow?: string }) {
  return (
    <div className={cn('grid grid-cols-1 items-center gap-8 lg:gap-14', image && 'lg:grid-cols-2')}>
      {image && (
        <div className={cn('relative aspect-[4/3] overflow-hidden rounded-[2rem]', flip && 'lg:order-2')}>
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
        </div>
      )}
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="display text-3xl leading-tight md:text-4xl">{title}</h2>
        <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-muted-foreground">{body}</div>
      </div>
    </div>
  )
}
