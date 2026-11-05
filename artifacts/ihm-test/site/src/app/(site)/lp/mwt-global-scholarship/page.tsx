// /lp/mwt-global-scholarship/ — MWT Global $500 Scholarship invite (row in src/content/landing.ts, EventInvite, form lp-event-email,
// thank-you /lp/mwt-global-scholarship/thankyou.php). Copy in src/content/landing-events.ts.
import type { Metadata } from 'next'
import Image from 'next/image'
import { BadgeCheck, Mail, MapPin, Phone } from 'lucide-react'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { landingMetadata } from '@/components/templates/landing/pages'
import { FORM_END_ANCHOR } from '@/components/templates/landing/shared'
import { LandingLayout, landingDoc } from '@/components/landing/ScholarshipParts'
import { LOCATED, MWT_SCHOLARSHIP as M, OFFICES } from '@/content/landing-events'

const PATH = '/lp/mwt-global-scholarship/'
export const metadata: Metadata = landingMetadata(PATH)

export default async function MwtGlobalScholarshipRoute() {
  const doc = await landingDoc(PATH)
  return (
    <LandingLayout doc={doc} eyebrow={M.kicker} formHeading="Enquire Now" title={<>MWT Global <em className="text-secondary not-italic">$500</em> Scholarship</>}
      intro={<p>{LOCATED}</p>}
      image={{ src: '/images/scholarship/banner.webp', alt: 'Graduates throwing their caps in the air' }}
      actions={<a href={`#${FORM_END_ANCHOR}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">Enquire Now</a>}
      after={
        <section className="mx-auto max-w-site px-5 pb-6 md:px-8">
          <Eyebrow>Our Education Partners</Eyebrow>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {M.partners.map((p, i) => <li key={p} className="grid place-items-center rounded-2xl border border-border bg-white p-3"><Image src={`/images/landing/mwt/partner-${i + 1}.webp`} alt={p} width={286} height={116} className="h-auto w-full" /></li>)}
          </ul>
        </section>
      }>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div className="relative mx-auto aspect-[750/829] w-full max-w-xs overflow-hidden rounded-[2rem]"><Image src="/images/landing/mwt/banner.webp" alt="Student sitting on books beside a dollar sign" fill sizes="20rem" className="object-cover" /></div>
        <div>
          <Eyebrow>Who can apply</Eyebrow>
          <h2 className="display text-display-md">Eligibility</h2>
          <ul className="mt-5 space-y-3">{M.eligibility.map((e) => <li key={e} className="flex gap-3"><BadgeCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-strong" />{e}</li>)}</ul>
        </div>
      </section>

      <section>
        <Eyebrow>Ten steps</Eyebrow>
        <h2 className="display text-display-md">How to Apply</h2>
        <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {M.steps.map((s, i) => (
            <li key={s} className="flex items-center gap-4 rounded-card border border-border bg-card p-4">
              <span className="bg-brand-gradient display grid size-12 shrink-0 place-items-center rounded-2xl text-lg text-foreground">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[15px] font-semibold">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-card bg-ink p-7 text-ink-foreground">
          <Image src="/images/landing/mwt/mwt-logo.webp" alt="MWT Global" width={500} height={133} className="h-10 w-auto rounded bg-white p-1" />
          <p className="mt-5 font-semibold">{M.contact.heading}</p>
          <p className="display mt-1 text-2xl">{M.contact.name}</p>
          <p className="text-ink-foreground/75">{M.contact.role}</p>
          <a href={`mailto:${M.contact.email}`} className="mt-4 inline-flex items-center gap-2 font-semibold text-secondary hover:underline"><Mail aria-hidden className="size-4" />{M.contact.email}</a>
        </div>
        <ul className="space-y-3">
          {OFFICES.map((o) => (
            <li key={o.name} className="rounded-card border border-border bg-card p-5">
              <p className="font-semibold">{o.name}</p>
              <p className="mt-1 flex gap-2 text-sm text-muted-foreground"><MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-strong" />{o.address}</p>
              <a href={`tel:${o.tel.replace(/\s/g, '')}`} className="mt-1 flex items-center gap-2 text-sm font-semibold hover:text-primary-strong"><Phone aria-hidden className="size-4 text-primary-strong" />Tel: {o.tel}</a>
            </li>
          ))}
        </ul>
      </section>
    </LandingLayout>
  )
}
