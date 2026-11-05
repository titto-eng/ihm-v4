// /how-to-apply/ — WordPress page 17: entry requirements, lodging an application, the nine online application steps and the
// documents to provide. Copy in src/content/admissions.ts (ADMISSIONS['apply-*'], APPLY_STEPS).
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, FileCheck2, LifeBuoy } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { AdmissionsShell } from '@/components/admissions/parts'
import { Inline, KitBlocks, plain } from '@/components/page-kit/Kit'
import { Lead, Ticks, heroBtn } from '@/components/student-support/parts'
import { ADMISSIONS as A, APPLY_STEPS, APPLY_URL } from '@/content/admissions'
import { siteOrigin } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'How to Apply',
  path: '/how-to-apply/',
  metaTitle: 'How to Apply to IHM | Online Application Steps and Documents',
  description: 'Apply to the Institute of Health and Management online in nine steps: register, choose your course, upload documents, submit and receive your Letter of Offer, usually within 1–3 days.',
})

export default function HowToApplyRoute() {
  const docs = A['apply-docs'][0]
  const steps = APPLY_STEPS
  return (
    <AdmissionsShell
      path="/how-to-apply/"
      image={{ src: '/images/home/hero/healthcare-professionals-ihm-uniform.webp', alt: 'Healthcare professionals who studied at IHM' }}
      title={<>How to <em className="text-secondary">apply</em></>}
      intro="Before you start the online application, make sure you meet the entry requirements for your preferred course. Most complete applications receive an outcome within 1–3 days."
      actions={<><a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className={heroBtn(true)}>Apply Online Today<ArrowUpRight aria-hidden className="size-4" /></a><Link href="/courses/" className={heroBtn()}>Browse courses</Link></>}
    >
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to apply to IHM online', url: `${siteOrigin()}/how-to-apply/`,
        step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: plain(s.body) })),
      }} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div><Lead eyebrow="Before you start" title="Entry requirements and lodging" /><KitBlocks blocks={A['apply-before']} /></div>
          <aside className="rounded-card bg-ink p-7 text-ink-foreground lg:self-start">
            <FileCheck2 aria-hidden className="size-8 text-secondary" />
            <h2 className="display mt-4 text-2xl">What documents do I need to provide?</h2>
            {'ul' in docs && <div className="mt-5"><Ticks items={docs.ul} onDark /></div>}
            <KitBlocks blocks={A['apply-docs'].slice(1)} onDark className="mt-5 text-[15px]" />
          </aside>
        </div>
      </Section>

      <Section tone="muted" anchorId="apply-online">
        <Lead eyebrow="Step by step" title={<>How to apply <em className="text-primary-strong">online</em></>} />
        <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="group rounded-card border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
              <span className="bg-brand-gradient display grid size-11 place-items-center rounded-2xl text-lg text-foreground">{i + 1}</span>
              <h3 className="display mt-4 text-xl">{s.title}</h3>
              <p className="mt-2 text-[15px] text-muted-foreground"><Inline text={s.body} /></p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-4 rounded-card border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4"><LifeBuoy aria-hidden className="mt-1 size-6 shrink-0 text-primary-strong" /><div><p className="font-semibold">Experiencing technical difficulties?</p><KitBlocks blocks={A['apply-help']} className="text-[15px]" /></div></div>
          <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">Apply Online Today<ArrowRight aria-hidden className="size-4" /></a>
        </div>
      </Section>
    </AdmissionsShell>
  )
}
