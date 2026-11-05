// /partner-with-us/ — WordPress page 4359: institutional partnerships (expression of interest on monday.com), clinical partners
// by state and international student recruitment agents. Copy in src/content/about.ts (PARTNER).
import type { Metadata } from 'next'
import { ArrowUpRight, ChevronDown, Globe2, Handshake, Hospital } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { AboutShell } from '@/components/about/parts'
import { DocLinks } from '@/components/international/parts'
import { Inline } from '@/components/page-kit/Kit'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { PARTNER as P } from '@/content/about'

export const metadata: Metadata = pageMetadata({
  title: 'Partner With Us',
  path: '/partner-with-us/',
  metaTitle: 'Partner With IHM | Institutional, Clinical and Recruitment Partners',
  description: 'Nursing institutions, hospitals, healthcare organisations and associations: partner with IHM. See our clinical placement partners across Australia and register as an international student recruitment agent.',
})

export default function PartnerWithUsRoute() {
  const total = P.states.reduce((n, s) => n + s.partners.length, 0)
  return (
    <AboutShell path="/partner-with-us/" eyebrow={P.kicker} title={<>Join us in our <em className="text-secondary">growth story</em></>} intro={P.title}
      image={{ src: '/images/about/partner-with-us.webp', alt: 'Healthcare partners shaking hands' }}
      actions={<><a href={P.eoi} target="_blank" rel="noopener noreferrer" className={heroBtn(true)}>Institutional Partnership<ArrowUpRight aria-hidden className="size-4" /></a><a href="#agents" className={heroBtn()}>Recruitment agents</a></>}>
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 text-[17px] leading-relaxed">{P.intro.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
          <aside className="rounded-card bg-ink p-7 text-ink-foreground lg:self-start">
            <Handshake aria-hidden className="size-8 text-secondary" />
            <h2 className="display mt-4 text-2xl">{P.ctaTitle}</h2>
            <p className="mt-3 text-ink-foreground/80">{P.cta}</p>
            <a href={P.eoi} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">Express your interest<ArrowUpRight aria-hidden className="size-4" /></a>
          </aside>
        </div>
      </Section>

      <Section tone="muted" anchorId="clinical-partners">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Lead eyebrow="Clinical partners" title={<><span className="text-primary-strong">{total}</span> clinical partners across Australia</>}><p>{P.clinical[2]}</p></Lead>
          </div>
          <div className="divide-y divide-border rounded-card border border-border bg-card">
            {P.states.map((s, i) => (
              <details key={s.state} className="group/s" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3"><Hospital aria-hidden className="size-5 text-primary-strong" />{s.state}<span className="rounded-full bg-blush px-2.5 py-0.5 text-xs">{s.partners.length}</span></span>
                  <ChevronDown aria-hidden className="size-5 transition-transform group-open/s:rotate-180" />
                </summary>
                <ul className="grid gap-x-6 gap-y-2 px-5 pb-6 text-sm sm:grid-cols-2">{s.partners.map((p) => <li key={p} className="flex gap-2"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" /><Inline text={p} /></li>)}</ul>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section anchorId="agents">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
          <div><Globe2 aria-hidden className="size-9 text-primary-strong" /><Lead eyebrow="International" title={P.agentsTitle}>{P.agents.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</Lead></div>
          <div className="rounded-card border border-border bg-card p-6 lg:self-center"><p className="mb-4 font-semibold">Agent documents</p><DocLinks items={P.agentDocs.map((d) => ({ label: d.t, href: d.href }))} /></div>
        </div>
      </Section>
    </AboutShell>
  )
}
