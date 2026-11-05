// /enquirenow/scholarship/expression-of-interest/ — institutional partnership expression of interest (landing row in src/content/landing.ts,
// form `scholarship-eoi` to the partnerships recipient group, thank-you .../thanks.php). Copy in src/content/scholarship.ts.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Building2, Hospital, Users } from 'lucide-react'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { landingMetadata } from '@/components/templates/landing/pages'
import { FORM_END_ANCHOR } from '@/components/templates/landing/shared'
import { LandingLayout, landingDoc } from '@/components/landing/ScholarshipParts'
import { EOI, SCHOLARSHIP as S } from '@/content/scholarship'

const PATH = '/enquirenow/scholarship/expression-of-interest/'
export const metadata: Metadata = landingMetadata(PATH)

const WHO = [
  { icon: Building2, t: 'Nursing institutions' },
  { icon: Hospital, t: 'Hospitals and healthcare organisations' },
  { icon: Users, t: 'Nursing associations' },
]

export default async function ExpressionOfInterestRoute() {
  const doc = await landingDoc(PATH)
  return (
    <LandingLayout doc={doc} eyebrow={S.partnership.title} formHeading="Submit your interest" title={EOI.title} intro={<p>{EOI.intro}</p>}
      image={{ src: '/images/scholarship/banner.webp', alt: 'Graduates throwing their caps in the air' }}
      actions={<a href={`#${FORM_END_ANCHOR}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">Submit your interest</a>}>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <Eyebrow>Partner with IHM</Eyebrow>
          <h2 className="display text-display-md">Move the healthcare industry forward, together</h2>
          <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-muted-foreground">{S.partnership.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
        </div>
        <div className="relative mx-auto aspect-[344/761] w-full max-w-[16rem] overflow-hidden rounded-[2rem]">
          <Image src="/images/scholarship/eoi.webp" alt="IHM nursing student in uniform" fill sizes="16rem" className="object-cover" />
        </div>
      </section>
      <section>
        <Eyebrow>Who can apply</Eyebrow>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {WHO.map(({ icon: Icon, t }) => <li key={t} className="flex items-center gap-4 rounded-card border border-border bg-card p-5"><span className="bg-brand-gradient grid size-12 shrink-0 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-6" /></span><span className="font-semibold">{t}</span></li>)}
        </ul>
        <Link href="/enquirenow/scholarship/" className="mt-8 inline-flex items-center gap-2 font-semibold text-primary-strong hover:underline"><ArrowLeft aria-hidden className="size-4" />About the NCAP Gateway to Global Nursing Scholarship</Link>
      </section>
    </LandingLayout>
  )
}
