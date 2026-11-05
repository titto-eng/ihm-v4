// /scholarship/ — WordPress page 85: the NCAP Gateway to Global Nursing Scholarship (introduction, about, the GCN pathway with
// the AUD 2,000 scholarship, what else is offered, eligibility) and institutional partnership. Copy in src/content/admissions.ts.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, BookOpenCheck, Clock, Handshake, Languages, Stethoscope } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { AdmissionsShell } from '@/components/admissions/parts'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { KitBlocks } from '@/components/page-kit/Kit'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { ADMISSIONS as A, SCHOLARSHIP_FACTS, SCHOLARSHIP_OFFERS } from '@/content/admissions'

export const metadata: Metadata = pageMetadata({
  title: 'Scholarship',
  path: '/scholarship/',
  metaTitle: 'NCAP Gateway to Global Nursing Scholarship | IHM',
  description: 'The IHM NCAP Gateway to Global Nursing Scholarship takes AUD 2,000 off the Graduate Certificate in Nursing for overseas nurses working towards registration in Australia, the USA, Canada, the UK and New Zealand.',
})

const APPLY = '/enquirenow/scholarship/'
const EOI = '/enquirenow/scholarship/expression-of-interest/'
const OFFER_ICONS = [Stethoscope, Languages]
/** "NCAP for NCLEX-RN Course This course …" → title + text at the first sentence-like break. */
const offer = (s: string) => { const m = /^(.+?(?:Course|Nurses))\s+(.*)$/.exec(s); return m ? { t: m[1], d: m[2] } : { t: s, d: '' } }

export default function ScholarshipRoute() {
  const eligibility = A['scholarship-eligibility']
  return (
    <AdmissionsShell
      path="/scholarship/"
      eyebrow="Scholarship"
      title={<>NCAP Gateway to <em className="text-secondary">Global Nursing</em> Scholarship</>}
      intro="We want to ease your financial burden so that you can focus on your studies."
      image={{ src: '/images/admissions/scholarship.webp', alt: 'A smiling student giving two thumbs up' }}
      actions={<><Link href={APPLY} className={heroBtn(true)}>Apply Now<ArrowRight aria-hidden className="size-4" /></Link><Link href={APPLY} className={heroBtn()}>Enquire Now</Link></>}
    >
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div><Lead eyebrow="Introduction" title="Supporting your next step" /><KitBlocks blocks={A['scholarship-intro'].slice(0, 1)} /></div>
          <div><Lead eyebrow="About the scholarship" title={<>Nursing, <em className="text-primary-strong">without borders</em></>} /><KitBlocks blocks={A['scholarship-about']} /></div>
        </div>
      </Section>

      <Section tone="ink" anchorId="pathway" className="bg-ink-glow">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Eyebrow onDark>Our scholarship pathway</Eyebrow>
            <h2 className="display text-display-md">GCN – Graduate Certificate in Nursing (Non-Specialisation)</h2>
            <KitBlocks blocks={A['scholarship-gcn']} onDark className="mt-6" />
          </div>
          <div className="space-y-4 lg:self-start">
            {SCHOLARSHIP_FACTS.map((f, i) => { const [k, ...v] = f.split(': '); const Icon = i ? Clock : Award; return (
              <div key={k} className="rounded-card bg-card p-6 text-foreground"><Icon aria-hidden className="size-7 text-primary-strong" /><p className="label-mono mt-3 text-xs text-muted-foreground">{k}</p><p className="display mt-1 text-xl">{v.join(': ')}</p></div>
            ) })}
          </div>
        </div>
      </Section>

      <Section>
        <Lead eyebrow="Also included" title="As part of the scholarship pathway, we also offer" />
        <ul className="grid gap-4 md:grid-cols-2">
          {SCHOLARSHIP_OFFERS.map((s, i) => { const o = offer(s); const Icon = OFFER_ICONS[i] ?? BookOpenCheck; return (
            <li key={o.t} className="rounded-card border border-border bg-card p-6"><span className="bg-brand-gradient grid size-11 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-5" /></span><h3 className="display mt-4 text-xl">{o.t}</h3>{o.d && <p className="mt-2 text-muted-foreground">{o.d}</p>}</li>
          ) })}
        </ul>
      </Section>

      <Section tone="muted" anchorId="eligibility">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Lead eyebrow="Eligibility" title="Who can apply?"><p>Eligibility requirements apply and not all applicants will be offered a scholarship.</p></Lead>
          <div><KitBlocks blocks={eligibility} /><div className="mt-8 flex flex-wrap gap-3"><Link href={APPLY} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">Apply Now<ArrowRight aria-hidden className="size-4" /></Link><Link href={APPLY} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border px-6 font-semibold hover:border-primary">Enquire Now</Link></div></div>
        </div>
      </Section>

      <Section anchorId="institutional-partnership">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card"><Image src="/images/alumni/ceremony-stage.webp" alt="IHM graduation ceremony" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" /></div>
          <div>
            <Lead eyebrow="Partner with IHM" title="Institutional partnership" />
            <KitBlocks blocks={A['scholarship-partnership']} />
            <Link href={EOI} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-ink-foreground hover:bg-primary hover:text-foreground"><Handshake aria-hidden className="size-4" />Institutional Partnership</Link>
          </div>
        </div>
      </Section>
    </AdmissionsShell>
  )
}
