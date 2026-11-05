import type { ReactNode } from 'react'
import { ArrowUpRight, BadgeCheck, FileText } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { AdmissionsBand } from '@/components/admissions/parts'
import { Inline, KitFaq, KitTable } from '@/components/page-kit/Kit'
import { Lead, SupportShell } from '@/components/student-support/parts'
import { ABOUT } from '@/content/about'

export const ABOUT_NAV = [
  { href: '/about-us/', label: 'About us' },
  { href: '/meet-our-md/', label: 'Meet our MD' },
  { href: '/governance/', label: 'Governance' },
  { href: '/rankings-and-recognitions/', label: 'Rankings' },
  { href: '/logo-statement/', label: 'Logo statement' },
  { href: '/hci-australia/', label: 'HCI Australia' },
  { href: '/partner-with-us/', label: 'Partner with us' },
  { href: '/gallery/', label: 'Gallery' },
] as const

/** The About IHM pages: SupportShell with the about sub-navigation and the admissions contact band. */
export function AboutShell(props: { path: string; eyebrow?: string; title: ReactNode; intro?: string; image?: { src: string; alt: string }; actions?: ReactNode; children: ReactNode }) {
  return <SupportShell {...props} eyebrow={props.eyebrow ?? 'About IHM'} nav={ABOUT_NAV} navLabel="About IHM" band={<AdmissionsBand />} />
}

/** Provider registration, course accreditations, QILT, financial standing, enrolments and constitution (shared by /about-us/ and /rankings-and-recognitions/). */
export function Registration({ tone = 'default' }: { tone?: 'default' | 'muted' }) {
  const A = ABOUT
  return (
    <Section tone={tone} anchorId="our-registration">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <Lead eyebrow="Our registration" title="Registered and accredited" />
          <ul className="grid gap-2.5 text-[15px]">{A.registration.map((r) => <li key={r} className="flex gap-3"><BadgeCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-strong" /><span><Inline text={r} /></span></li>)}</ul>
          <h3 className="display mt-8 text-2xl">Course accreditations</h3>
          <ul className="mt-3 grid gap-2">{A.accreditations.map((r) => <li key={r} className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold">{r}</li>)}</ul>
          <a href={A.qiltUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground hover:bg-primary hover:text-foreground">View the QILT details<ArrowUpRight aria-hidden className="size-4" /></a>
        </div>
        <div className="space-y-8">
          <div className="rounded-card bg-ink p-6 text-ink-foreground md:p-8">
            <h3 className="display text-2xl">Financial standing</h3>
            <p className="mt-3 text-[15px] text-ink-foreground/80">{A.financial}</p>
            <ul className="mt-5 flex flex-wrap gap-2">{A.financialPdfs.map((f) => <li key={f.href}><a href={f.href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary"><FileText aria-hidden className="size-4" />{f.t}</a></li>)}</ul>
          </div>
          <div>
            <h3 className="display mb-4 text-2xl">Student enrolment</h3>
            <KitTable rows={A.enrolment} />
          </div>
          <a href={A.constitution.href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-semibold text-primary-strong"><FileText aria-hidden className="size-4" />{A.constitution.t}</a>
        </div>
      </div>
    </Section>
  )
}

/** TEQSA, AHPRA, IHEA, HEPP-QN, DESE, Advance HE, AQF, QILT and ComparED explained. */
export function Regulators({ tone = 'muted' }: { tone?: 'default' | 'muted' }) {
  return (
    <Section tone={tone} anchorId="regulators">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="lg:sticky lg:top-28 lg:self-start"><Lead eyebrow="Quality and regulation" title="The bodies that keep us accountable"><p>Who regulates, accredits and measures Australian higher education, and where IHM sits in each.</p></Lead></div>
        <KitFaq items={ABOUT.regulators} numbered={false} />
      </div>
    </Section>
  )
}
