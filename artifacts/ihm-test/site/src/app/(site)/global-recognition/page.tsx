// /global-recognition/ — WordPress page 8116: how IHM's Graduate Certificate in Advanced Nursing (GCAN) is recognised in
// Ireland (NFQ), the United Kingdom (RQF) and Canada (CES/IRCC), with frameworks, videos, verification steps and FAQs.
// The old tab anchors (#pills-news, #pills-events, #pills-canada) are kept. Copy in src/content/about2.ts.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Globe2 } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { AboutShell } from '@/components/about/parts'
import { KitBlocks, KitFaq, kitFaqJsonLd } from '@/components/page-kit/Kit'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { GLOBAL_RECOGNITION as G, RECOGNITION_REGIONS as R } from '@/content/about2'

export const metadata: Metadata = pageMetadata({
  title: 'Global Recognition',
  path: '/global-recognition/',
  metaTitle: 'Global Recognition of GCAN | Ireland NFQ, UK RQF and Canada | IHM',
  description: 'IHM’s TEQSA-accredited Graduate Certificate in Advanced Nursing is benchmarked at NFQ Level 8 in Ireland, RQF Level 6 in the UK and a Post-Bachelor Certificate in Canada. Frameworks, verification and FAQs.',
})

const CODE: Record<string, string> = { Ireland: 'IE', 'United Kingdom': 'UK', Canada: 'CA' }

export default function GlobalRecognitionRoute() {
  return (
    <AboutShell path="/global-recognition/" eyebrow="Global recognition" title={<>Global recognition <em className="text-secondary">of GCAN</em></>} intro={G.lead}
      actions={<><a href="#regions" className={heroBtn(true)}>Choose your region</a><Link href="/graduate-certificate-in-advanced-nursing/" className={heroBtn()}>About GCAN<ArrowRight aria-hidden className="size-4" /></Link></>}>
      <JsonLd data={kitFaqJsonLd(R.flatMap((r) => r.faq.map((f) => ({ ...f, title: `${f.title}` }))).filter((f, i, a) => a.findIndex((x) => x.title === f.title) === i))} />
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Lead eyebrow="GCAN overview" title="An Australian qualification, recognised abroad" />
            <ul className="grid gap-3">{G.overview.map((t) => <li key={t.slice(0, 20)} className="rounded-2xl border border-border bg-card p-4 text-[15px]">{t}</li>)}</ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card"><Image src="/images/about/global-recognition.webp" alt="Two nurses in scrubs smiling in a hospital ward" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-[75%_50%]" /></div>
        </div>
      </Section>
      <Section tone="muted" anchorId="why-teqsa">
        <Lead eyebrow="TEQSA" title={G.whyTitle} />
        <ul className="grid gap-4 md:grid-cols-2">{G.why.map((w) => <li key={w.title} className="rounded-card border border-border bg-card p-6"><h3 className="display text-xl">{w.title}</h3><KitBlocks blocks={w.blocks} className="mt-3 text-[15px]" /></li>)}</ul>
      </Section>

      <nav id="regions" aria-label="Regions" className="sticky top-16 z-20 scroll-mt-24 border-b border-border bg-background/90 backdrop-blur md:top-20">
        <ul className="mx-auto flex max-w-site gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] md:px-8">
          <li className="label-mono shrink-0 self-center pr-2 text-[11px] text-muted-foreground"><Globe2 aria-hidden className="mr-1 inline size-4" />Choose your region</li>
          {R.map((r) => <li key={r.anchor} className="shrink-0"><a href={`#${r.anchor}`} className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary-strong"><span className="label-mono mr-1.5 text-[10px] text-primary-strong">{CODE[r.name]}</span>{r.name}</a></li>)}
        </ul>
      </nav>

      {R.map((r, i) => (
        <div key={r.anchor}>
          <Section anchorId={r.anchor} tone={i % 2 ? 'muted' : 'default'}>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div className="lg:sticky lg:top-40 lg:self-start"><span aria-hidden className="bg-brand-gradient display mb-5 grid size-16 place-items-center rounded-2xl text-2xl text-foreground">{CODE[r.name]}</span><Lead eyebrow={`Region ${i + 1} of ${R.length}`} title={r.name} /></div>
              <KitBlocks blocks={r.body} />
            </div>
          </Section>
          {r.faq.length > 0 && (
            <Section tone={i % 2 ? 'muted' : 'default'} spacing="compact">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr]"><Lead eyebrow="FAQs" title={`Recognition in ${r.name}`} /><KitFaq items={r.faq} /></div>
            </Section>
          )}
        </div>
      ))}
    </AboutShell>
  )
}
