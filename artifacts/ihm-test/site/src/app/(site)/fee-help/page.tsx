// /fee-help/ — WordPress page 6158: what FEE-HELP is, explainer videos, the IHM courses approved for FEE-HELP (census date PDFs),
// application documents, related policies, 28 FAQs and the government booklet. Copy in src/content/admissions.ts.
import type { Metadata } from 'next'
import { ArrowUpRight, CalendarCheck, FileText } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { AdmissionsShell } from '@/components/admissions/parts'
import { DocLinks } from '@/components/international/parts'
import { KitBlocks, KitFaq, kitFaqJsonLd } from '@/components/page-kit/Kit'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { ADMISSIONS as A, FEE_HELP_FAQ } from '@/content/admissions'

export const metadata: Metadata = pageMetadata({
  title: 'Fee Help',
  path: '/fee-help/',
  metaTitle: 'FEE-HELP at IHM | Eligibility, Census Dates and FAQs',
  description: 'FEE-HELP is an Australian Government loan that helps eligible students pay tuition fees. See IHM courses approved for FEE-HELP, census dates, how to apply and answers to 28 common questions.',
})

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g
const links = (s: string) => [...s.matchAll(LINK)].map((m) => ({ label: m[1], href: m[2] }))

export default function FeeHelpRoute() {
  const courses = A['fee-help-courses'][0]
  const courseRows = 'ul' in courses ? courses.ul.map((s) => ({ name: /\*\*([^*:]+):?\*\*/.exec(s)?.[1] ?? s, href: links(s)[0]?.href ?? '' })) : []
  const appDocs = A['fee-help-courses'][1]
  const more = A['fee-help-more'][0]
  return (
    <AdmissionsShell
      path="/fee-help/"
      title={<>What is <em className="text-secondary">FEE-HELP?</em></>}
      intro="An Australian Government loan that helps eligible fee-paying students pay their tuition fees, repaid through the tax system once your income reaches the repayment threshold."
      actions={<a href="https://www.studyassist.gov.au/financial-and-study-support/fee-help" target="_blank" rel="noopener noreferrer" className={heroBtn(true)}>Know more on Study Assist<ArrowUpRight aria-hidden className="size-4" /></a>}
    >
      <JsonLd data={kitFaqJsonLd(FEE_HELP_FAQ)} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div><Lead eyebrow="Australian Government loan" title={<>Study now, <em className="text-primary-strong">repay later</em></>} /><KitBlocks blocks={A['fee-help-intro']} /></div>
          <KitBlocks blocks={A['fee-help-videos']} />
        </div>
      </Section>

      <Section tone="muted" anchorId="approved-courses">
        <Lead eyebrow="Approved provider" title="IHM is a FEE-HELP approved provider for these courses" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {courseRows.map((c) => (
            <li key={c.name}><a href={c.href} target="_blank" rel="noopener" className="group flex h-full flex-col rounded-card border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg">
              <CalendarCheck aria-hidden className="size-7 text-primary-strong" /><span className="display mt-4 text-xl">{c.name}</span>
              <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary-strong"><FileText aria-hidden className="size-4" />Census dates (PDF)</span>
            </a></li>
          ))}
        </ul>
        {'p' in appDocs && <div className="mt-8 rounded-card bg-ink p-6 text-ink-foreground"><p className="mb-4 font-semibold">Applying for FEE-HELP at IHM</p><DocLinks items={links(appDocs.p)} dark /></div>}
      </Section>

      <Section anchorId="faq">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Lead eyebrow="FAQs" title="Frequently asked questions for FEE-HELP" />
            <div className="rounded-card border border-border bg-card p-6"><p className="font-semibold">Read the government information booklet</p><KitBlocks blocks={A['fee-help-booklet']} className="mt-2 text-[15px]" /><a href="https://www.studyassist.gov.au/resources/2024-fee-help-information-booklet" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground hover:bg-primary hover:text-foreground">FEE-HELP booklet<ArrowUpRight aria-hidden className="size-4" /></a></div>
          </div>
          <KitFaq items={FEE_HELP_FAQ} />
        </div>
      </Section>

      <Section tone="muted" anchorId="want-to-know-more">
        <Lead eyebrow="Policies and procedures" title="Want to know more?" />
        {'ul' in more && <DocLinks items={more.ul.flatMap(links)} />}
      </Section>
    </AdmissionsShell>
  )
}
