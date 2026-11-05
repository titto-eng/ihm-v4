// /lp/webinar-global-agents-ncap/ — webinar invite for global education agents (row in src/content/landing.ts, EventInvite,
// form lp-event-email). Copy in src/content/landing-events.ts.
import type { Metadata } from 'next'
import Image from 'next/image'
import { Globe2, Mail, Presentation, Users } from 'lucide-react'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { landingMetadata } from '@/components/templates/landing/pages'
import { FORM_END_ANCHOR } from '@/components/templates/landing/shared'
import { LandingLayout, landingDoc } from '@/components/landing/ScholarshipParts'
import { AGENTS_WEBINAR as W, LOCATED } from '@/content/landing-events'

const PATH = '/lp/webinar-global-agents-ncap/'
export const metadata: Metadata = landingMetadata(PATH)

export default async function WebinarGlobalAgentsNcapRoute() {
  const doc = await landingDoc(PATH)
  return (
    <LandingLayout doc={doc} eyebrow={W.kicker} formHeading="Join our Webinar" title={W.title}
      intro={<p>{LOCATED}</p>}
      image={{ src: '/images/landing/hero.webp', alt: 'Two nurses reviewing a tablet in a hospital corridor' }}
      actions={<a href={`#${FORM_END_ANCHOR}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">Join our Webinar</a>}>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <Eyebrow>For education agents</Eyebrow>
          <h2 className="display text-display-md">{W.greeting}</h2>
          <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-muted-foreground">{W.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
        </div>
        <div className="relative mx-auto aspect-[750/829] w-full max-w-xs overflow-hidden rounded-[2rem]"><Image src="/images/landing/webinar-banner.webp" alt="Nurse holding a tablet" fill sizes="20rem" className="object-cover" /></div>
      </section>
      <section>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[{ icon: Presentation, t: 'The program', b: 'Pathway to Nursing Registration in Australia' }, { icon: Globe2, t: 'Who it helps', b: 'Overseas registered nurses' }, { icon: Users, t: 'Your role', b: 'Represent IHM and recruit nurses to study' }].map(({ icon: Icon, t, b }) => (
            <li key={t} className="rounded-card border border-border bg-card p-6"><Icon aria-hidden className="size-8 text-primary-strong" /><p className="label-mono mt-4 text-muted-foreground">{t}</p><p className="mt-1 font-semibold">{b}</p></li>
          ))}
        </ul>
      </section>
      <section className="grid grid-cols-1 gap-6 rounded-card bg-ink p-7 text-ink-foreground md:grid-cols-[1fr_auto] md:items-center md:p-10">
        <div>
          <p className="font-semibold">{W.contact.heading}</p>
          <p className="display mt-1 text-2xl">{W.contact.name}</p>
          <p className="text-ink-foreground/75">{W.contact.role}</p>
          <a href={`mailto:${W.contact.email}`} className="mt-4 inline-flex items-center gap-2 font-semibold text-secondary hover:underline"><Mail aria-hidden className="size-4" />{W.contact.email}</a>
        </div>
        <a href={`#${FORM_END_ANCHOR}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">{W.signUp}</a>
      </section>
    </LandingLayout>
  )
}
