// /cintana-alliance-partnership-ihm/ — the IHM, Cintana Education, Arizona State University and Ramsay Health Care strategic collaboration:
// partners, vision/mission, leaders and the partnership contact. Copy in src/content/partnerships.ts (ALLIANCE, PARTNERS).
import type { Metadata } from 'next'
import Image from 'next/image'
import { Award, Compass, Mail, MapPin, Phone, Target } from 'lucide-react'
import { SocialIcon, networkLabel } from '@/components/layout/SocialIcon'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { heroBtn } from '@/components/student-support/parts'
import { PartnerCards, PartnerShell, PersonCard } from '@/components/research/parts'
import { legacyImage } from '@/lib/legacy-image'
import { ALLIANCE as A } from '@/content/partnerships'
import { footer } from '@/content/footer'

export const metadata: Metadata = pageMetadata({
  title: 'Cintana Alliance Partnership – IHM',
  path: '/cintana-alliance-partnership-ihm/',
  metaTitle: 'Cintana Alliance Partnership | IHM, ASU and Ramsay Health Care',
  description: 'IHM, Cintana Education, Arizona State University and Ramsay Health Care: a strategic collaboration bringing global expertise and Education for Employment to healthcare education.',
})

const PILLAR_ICONS = [Compass, Target, Award]

export default function CintanaAllianceRoute() {
  return (
    <PartnerShell path="/cintana-alliance-partnership-ihm/" title={A.title} intro={A.tagline}
      image={{ src: '/images/partnerships/cintana-arizona.webp', alt: 'Leaders of IHM, Cintana Education and Ramsay Health Care at the partnership launch' }}
      actions={<><a href="#partners" className={heroBtn(true)}>Meet our partners</a><a href="#contact" className={heroBtn()}>Contact the team</a></>}>
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>The partnership</Eyebrow>
            <h2 className="display text-3xl leading-tight md:text-5xl">{A.introTitle}</h2>
          </div>
          <div className="relative aspect-[606/170] w-full">
            <Image src="/images/partnerships/ihm-asu-ramsay.svg" alt="IHM, Arizona State University and Ramsay Health Care" fill unoptimized className="object-contain" />
          </div>
        </div>
      </Section>

      <PartnerCards title="Three partners, one purpose" />

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Global expertise</Eyebrow>
            <h2 className="display text-3xl leading-tight md:text-4xl">{A.leverageTitle}</h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-muted-foreground">{A.leverage.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
          </div>
          <ol className="grid gap-4">
            {A.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i]
              return (
                <li key={p.title} className="flex gap-5 rounded-card border border-border bg-card p-6 transition-colors hover:border-primary">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blush text-primary-strong"><Icon aria-hidden className="size-6" /></span>
                  <div><h3 className="label-mono text-primary-strong">{p.title}</h3><p className="mt-2 text-[15px]">{p.body}</p></div>
                </li>
              )
            })}
          </ol>
        </div>
      </Section>

      <section data-tone="ink" className="bg-ink-glow relative overflow-hidden text-ink-foreground">
        <div className="mx-auto grid max-w-site grid-cols-1 gap-10 px-5 py-16 md:px-8 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src={legacyImage('/images/partnerships/be-part.webp', '/images/partnerships/cintana-arizona.webp')} alt="Students and healthcare professionals" fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
          </div>
          <div>
            <Eyebrow onDark>Join the movement</Eyebrow>
            <h2 className="display text-display-md">{A.futureTitle}</h2>
            <div className="mt-5 space-y-4 text-lg text-ink-foreground/80">{A.future.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
          </div>
        </div>
      </section>

      <Section anchorId="leaders">
        <Eyebrow>Leadership</Eyebrow>
        <h2 className="display mb-10 text-display-md">Meet the leaders</h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{A.leaders.map((l) => <li key={l.name}><PersonCard person={l} compact /></li>)}</ul>
      </Section>

      <Section tone="muted" anchorId="contact">
        <div className="grid grid-cols-1 overflow-hidden rounded-card border border-border bg-card lg:grid-cols-2">
          <div className="relative min-h-64">
            <Image src={legacyImage('/images/partnerships/contact.webp', '/images/partnerships/cintana-arizona.webp')} alt="IHM partnership team" fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
          </div>
          <div className="p-7 md:p-10">
            <Eyebrow>Get in touch</Eyebrow>
            <h2 className="display text-3xl">Contact details</h2>
            <ul className="mt-6 space-y-4 text-[15px]">
              <li className="flex gap-3"><MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-strong" />{A.contact.address}</li>
              <li><a href={A.contact.phone.href} className="flex gap-3 font-semibold hover:text-primary-strong"><Phone aria-hidden className="size-5 text-primary-strong" />{A.contact.phone.t}</a></li>
              <li><a href={A.contact.email.href} className="flex gap-3 font-semibold hover:text-primary-strong"><Mail aria-hidden className="size-5 text-primary-strong" />{A.contact.email.t}</a></li>
            </ul>
            <h3 className="label-mono mt-8 text-muted-foreground">Follow us</h3>
            <ul className="mt-3 flex gap-2">
              {footer.social.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`IHM on ${networkLabel[s.network]}`} className="grid size-11 place-items-center rounded-full bg-ink text-ink-foreground transition-colors hover:bg-primary hover:text-foreground"><SocialIcon network={s.network} /></a></li>)}
            </ul>
            <p className="mt-8 text-lg font-semibold">{A.closing}</p>
          </div>
        </div>
      </Section>
    </PartnerShell>
  )
}
