// /lp/enquiry-ihm/ — multi-course enquiry landing page (row in src/content/landing.ts: form lp-portal-hubspot, indexable). Six courses
// as CourseOfferCard; the live page's duplicated course blocks are merged. Copy in src/content/landing-enquiry-ihm.ts.
import type { Metadata } from 'next'
import { ArrowDown, CheckCircle2 } from 'lucide-react'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { landingMetadata } from '@/components/templates/landing/pages'
import { FORM_END_ANCHOR } from '@/components/templates/landing/shared'
import { LandingLayout, landingDoc } from '@/components/landing/ScholarshipParts'
import { CourseOfferCard } from '@/components/landing/CourseOfferCard'
import { ENQUIRY_IHM as E } from '@/content/landing-enquiry-ihm'

const PATH = '/lp/enquiry-ihm/'
export const metadata: Metadata = landingMetadata(PATH)

export default async function EnquiryIhmRoute() {
  const doc = await landingDoc(PATH)
  return (
    <LandingLayout doc={doc} eyebrow={E.kicker} formHeading="Enquire now" title={E.title}
      intro={<p>{E.question}</p>}
      image={{ src: '/images/landing/hero.webp', alt: 'Two nurses reviewing a tablet in a hospital corridor' }}
      actions={<>
        <a href={`#${FORM_END_ANCHOR}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">Enquire now</a>
        <a href="#courses" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink-foreground/40 px-6 font-semibold backdrop-blur hover:border-secondary hover:text-secondary">See the courses<ArrowDown aria-hidden className="size-4" /></a>
      </>}
      after={<p className="mx-auto max-w-site px-5 pb-6 text-center md:px-8"><span className="display text-3xl md:text-4xl">{E.closing[0]} <span className="text-primary-strong">{E.closing[1]}</span></span></p>}>
      <section>
        <p className="text-lg text-muted-foreground">{E.questionBody}</p>
        <h2 className="display mt-10 text-display-md">{E.whyTitle}</h2>
        <p className="mt-3 text-lg text-muted-foreground">{E.whyBody}</p>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {E.stats.map((s) => <li key={s.label} className="rounded-card bg-ink p-6 text-ink-foreground"><p className="display text-4xl text-secondary">{s.value}</p><p className="mt-2 text-sm text-ink-foreground/75">{s.label}</p></li>)}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground"><a href={E.source.href} target="_blank" rel="noopener noreferrer" className="hover:underline">{E.source.t}</a></p>
        <p className="mt-4 rounded-2xl border border-border p-4 text-sm font-semibold">{E.registrationNote}</p>
      </section>

      <section id="courses" className="scroll-mt-24">
        <Eyebrow>Courses</Eyebrow>
        <h2 className="display text-3xl leading-tight md:text-4xl">{E.coursesTitle}</h2>
        <p className="mt-3 text-lg text-muted-foreground">{E.coursesIntro}</p>
        <div className="mt-8 space-y-6">
          {E.courses.slice(0, 1).map((c) => <CourseOfferCard key={c.n} c={c} />)}
          <div className="rounded-card bg-sunrise-glow p-6 md:p-8">
            <h3 className="display text-2xl">{E.differentTitle}</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">{E.different.map((d) => <li key={d.t} className="flex gap-3"><CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0" /><span><span className="font-semibold">{d.t}:</span> {d.b}</span></li>)}</ul>
          </div>
          {E.courses.slice(1).map((c, i) => <CourseOfferCard key={c.n} c={c} flip={i % 2 === 0} />)}
        </div>
      </section>
    </LandingLayout>
  )
}
