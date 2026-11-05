// /micro-credentials/requirements/ — WordPress template-mc-requirements.php (page 10427, synced 2026-10-30). The older slug
// /micro-credentials/microcredentials-requirements/ stays live (rule 1) and renders this page with this URL as canonical.
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Award, BadgeCheck, CircleAlert, CreditCard, Earth, FileCheck2, Languages, Layers, Monitor, ScrollText, Stethoscope, type LucideIcon } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { ApplyPortal, Breadcrumb, btnOnDark, Enquire, Eyebrow, Faq, faqJsonLd, Tbc } from '@/components/micro-credentials/parts'
import { MC_APPLY_STEPS, MC_ENGLISH, MC_FAQS, MC_LINKS } from '@/content/micro-credentials'

export const metadata: Metadata = pageMetadata({
  title: 'Microcredentials Requirements',
  path: '/micro-credentials/requirements/',
  metaTitle: 'Micro-credential Requirements and How to Apply | IHM',
  description:
    'Who can enrol in an IHM nursing micro-credential, qualifications and registration, English requirements, the $3,000 unit fee, credit into the Graduate Certificate in Advanced Nursing, and how to apply in five steps.',
})

const TOC = [
  ['who', 'Who can enrol'], ['qualifications', 'Qualifications'], ['english', 'English'], ['clinical', 'Clinical access'], ['technology', 'Technology'],
  ['fees', 'Fees and payment'], ['credit', 'Credit and pathways'], ['certification', 'Certification'], ['assessment', 'Assessment'],
] as const

function Card({ id, icon: Icon, title, label, children }: { id: string; icon: LucideIcon; title: string; label?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 rounded-card border border-border bg-card p-6 shadow-[0_18px_40px_-32px_hsl(348_35%_13%/0.35)] md:p-8">
      <div className="flex flex-wrap items-center gap-4">
        <span className="grid size-11 place-items-center rounded-xl bg-blush text-primary-strong"><Icon aria-hidden className="size-5" /></span>
        <h2 id={`${id}-h`} className="display text-2xl">{title}</h2>
        {label && <span className="ml-auto">{label}</span>}
      </div>
      <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-foreground/85">{children}</div>
    </section>
  )
}

const Ref = () => <span className="label-mono rounded-full bg-muted px-2.5 py-1 text-[10px] text-muted-foreground">Parent course reference</span>

export default function MicroCredentialsRequirementsRoute() {
  return (
    <>
      <JsonLd data={faqJsonLd(MC_FAQS)} />
      <section data-tone="sunrise" className="bg-brand-wash">
        <div className="mx-auto max-w-site px-5 pt-10 pb-14 md:px-8 lg:pt-14">
          <Breadcrumb items={[{ label: 'Courses', href: '/courses/' }, { label: 'Micro-Credentials', href: '/micro-credentials/' }, { label: 'Requirements' }]} />
          <h1 className="display max-w-3xl text-[clamp(2.4rem,5.4vw,4.2rem)] leading-[1.04]">Requirements and <em className="text-primary-strong">how to apply</em></h1>
          <p className="mt-5 max-w-2xl text-lg text-foreground/80">The same starting point for all twelve specialties. Where a detail has not been approved yet, we say so plainly.</p>
          <p className="mt-8 flex max-w-3xl gap-3 rounded-2xl border border-primary/25 bg-card p-5 text-[15px] leading-relaxed">
            <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-strong" />
            <span><strong>Important:</strong> standalone micro-credential enrolment is a proposal subject to IHM approval. Requirements below labelled “parent course” are the published
              admission requirements for the Graduate Certificate in Advanced Nursing, shown for reference. Standalone admission rules are subject to confirmation.</span>
          </p>
        </div>
      </section>

      <Section anchorId="requirements">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <ol className="sticky top-28 space-y-1 border-l border-border">
              {TOC.map(([id, label]) => (
                <li key={id}><a href={`#${id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground">{label}</a></li>
              ))}
            </ol>
          </nav>
          <div className="grid min-w-0 gap-6">
            <Card id="who" icon={Earth} title="Who can enrol" label={<span className="label-mono rounded-full bg-sand px-2.5 py-1 text-[10px] text-secondary-strong">Proposed rule</span>}>
              <p>Micro-credentials are proposed for <strong>domestic students and eligible non-student visa holders</strong> only.</p>
              <p>They are not CRICOS registered courses and cannot be used to apply for or support a student visa.</p>
            </Card>
            <Card id="qualifications" icon={BadgeCheck} title="Qualifications and registration" label={<Ref />}>
              <p>To be admitted to the Graduate Certificate in Advanced Nursing, IHM publishes that an applicant must:</p>
              <ul className="space-y-2">
                {[
                  'Have completed a Bachelor of Nursing or an equivalent qualification, or a three-year Diploma of Nursing leading to registered nurse status in their home country with one year of work experience; and',
                  'Hold valid registration as a nurse with Ahpra, or with the nurses’ board or council in their country of origin or residence.',
                ].map((t) => <li key={t} className="flex gap-3"><span aria-hidden className="bg-brand-gradient mt-2 size-2 shrink-0 rounded-full" />{t}</li>)}
              </ul>
              <p className="flex flex-wrap items-center gap-2">Standalone micro-credential admission requirements are <Tbc />.</p>
            </Card>
            <Card id="english" icon={Languages} title="English language proficiency" label={<Ref />}>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted"><tr><th scope="col" className="px-4 py-3 font-semibold">Test</th><th scope="col" className="px-4 py-3 font-semibold">Minimum requirement</th></tr></thead>
                  <tbody className="divide-y divide-border">
                    {MC_ENGLISH.map(([t, m]) => <tr key={t}><th scope="row" className="px-4 py-3 font-semibold">{t}</th><td className="px-4 py-3">{m}</td></tr>)}
                  </tbody>
                </table>
              </div>
              <p>An English waiver may apply. See <Link href={MC_LINKS.english} className="font-semibold text-primary-strong underline-offset-4 hover:underline">IHM English language entry requirements</Link>. Standalone requirements are subject to confirmation.</p>
            </Card>
            <Card id="clinical" icon={Stethoscope} title="Clinical access">
              <p>Clinical access expectations differ between specialties and have not been confirmed for standalone enrolment. Before applying, please ask IHM admissions to confirm any clinical access or workplace requirements relevant to your chosen specialty.</p>
            </Card>
            <Card id="technology" icon={Monitor} title="Technology">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1">The parent Graduate Certificate is delivered online. You can expect to need a reliable internet connection and a computer suitable for online study. Specific technical requirements for micro-credentials are <Tbc />.</p>
            </Card>
            <Card id="fees" icon={CreditCard} title="Fees and payment" label={<span className="display text-2xl text-primary-strong">$3,000</span>}>
              <p>The unit-based fee for a micro-credential is $3,000 ($250 per credit point for a 12-credit-point unit), under the IHM Fees, Charges and Refunds Policy. The enrolment and fee deadline is the Wednesday before the block starts, and the census date is Friday of Week 2. Fees published for the full Graduate Certificate do not apply to an individual micro-credential.</p>
              <p>Under the proposal, non-award enrolments are not expected to be eligible for FEE-HELP; IHM will confirm. Government postgraduate nursing scholarships generally fund award courses rather than single units, so ask IHM about the full award if you hold a scholarship.</p>
            </Card>
            <Card id="credit" icon={Layers} title="Credit and pathways">
              <p>Each micro-credential is proposed to be the same unit taught in the Graduate Certificate in Advanced Nursing. If you are later admitted to the award, credit is expected to be assessed under the IHM Credit and Recognition of Prior Learning Policy. Full credit into the Graduate Certificate applies if you enrol in the award within 24 months.</p>
              <p>Micro-credentials are not AQF qualifications. Credit toward other IHM courses, other institutions or ASU programs is not guaranteed, and no automatic professional certificate stacking applies.</p>
            </Card>
            <Card id="certification" icon={Award} title="Certification" label={<Tbc />}>
              <p>The form of certification, including whether a verifiable digital credential will be issued, is still to be confirmed. Completing a micro-credential does not confer registration, endorsement or a specialist title.</p>
            </Card>
            <Card id="assessment" icon={FileCheck2} title="Assessment and academic integrity">
              <p>Each seven-week block has two assessment points: Assessment 1 is due on Friday of Week 4 and the final assessment on Friday of Week 7. Under the proposal, micro-credential learners would complete the same assessment as award students and be subject to the same academic integrity, support and grievance policies.</p>
            </Card>
          </div>
        </div>
      </Section>

      <section data-tone="ink" className="bg-ink-glow text-ink-foreground">
        <div className="mx-auto max-w-site px-5 py-16 md:px-8 md:py-20">
          <ScrollText aria-hidden className="size-7 text-secondary" />
          <h2 className="display mt-4 text-display-md">How to apply, <em className="text-secondary">in five steps</em></h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {MC_APPLY_STEPS.map(([t, b], i) => (
              <li key={t} className="rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-5">
                <span className="bg-brand-gradient grid size-10 place-items-center rounded-full font-bold text-foreground">{i + 1}</span>
                <h3 className="display mt-4 text-xl">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-foreground/75">{b}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3"><Enquire /><ApplyPortal label="Official application portal" className={btnOnDark} /></div>
          <p className="mt-4 text-sm text-ink-foreground/70">Micro-credential availability must be confirmed with IHM before you apply.</p>
        </div>
      </section>

      <Section anchorId="faq">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>FAQs</Eyebrow>
          <h2 className="display mb-8 text-display-md">Common questions</h2>
          <Faq items={MC_FAQS} />
        </div>
      </Section>
    </>
  )
}
