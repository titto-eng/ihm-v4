// /student-counselling-internal/ — WordPress page 6683: IHM's own counselling, pastoral care and mental health support, and the
// staff who provide it (name, role, location and bio; contact goes through Student Support).
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Compass, HandHeart, HeartPulse, LifeBuoy, Mail, MapPin, Sparkles, Users, Wind } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { CrisisBand, Lead, SupportShell, heroBtn } from '@/components/student-support/parts'
import { legacyImage } from '@/lib/legacy-image'
import { INTERNAL_COUNSELLING as C, SUPPORT_EMAIL } from '@/content/student-support'

export const metadata: Metadata = pageMetadata({
  title: 'Student Counselling (Internal)',
  path: '/student-counselling-internal/',
  metaTitle: 'Student Counselling, Pastoral Care and Mental Health Support at IHM',
  description: 'Confidential counselling, pastoral care and mental health support for IHM students: individual sessions, stress and anxiety management, wellbeing workshops and crisis support from IHM staff.',
})

const PASTORAL_ICONS = [HandHeart, Compass, Users]
const MENTAL_ICONS = [HeartPulse, Wind, Sparkles, LifeBuoy]
const initials = (n: string) => n.replace(/^Dr\.\s*/, '').split(' ').map((w) => w[0]).slice(0, 2).join('')

export default function StudentCounsellingInternalRoute() {
  return (
    <SupportShell
      path="/student-counselling-internal/"
      eyebrow="Student support · Counselling (Internal)"
      title={<>Student <em className="text-secondary">Counselling</em></>}
      intro={C.intro[0]}
      actions={<><a href={`mailto:${SUPPORT_EMAIL}?subject=Counselling%20session`} className={heroBtn(true)}><Mail aria-hidden className="size-4" />Book a confidential session</a><a href="#team" className={heroBtn()}>Meet the team</a></>}
    >
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-4 text-[17px] leading-relaxed"><p>{C.intro[1]}</p></div>
          <CrisisBand />
        </div>
      </Section>
      <Section tone="muted" anchorId="pastoral-care">
        <Lead eyebrow="Mind, body and spirit" title="Pastoral Care"><p>{C.pastoral}</p></Lead>
        <p className="mb-4 font-semibold">Our Pastoral Care team can assist with:</p>
        <ul className="grid gap-5 md:grid-cols-3">
          {C.pastoralHelp.map(([t, b], i) => { const Icon = PASTORAL_ICONS[i]; return <li key={t} className="rounded-card border border-border bg-card p-6"><span className="bg-brand-gradient grid size-12 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-5" /></span><h3 className="display mt-4 text-xl">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{b}</p></li> })}
        </ul>
        <p className="mt-6 max-w-3xl text-muted-foreground">{C.pastoralClose}</p>
      </Section>
      <Section anchorId="team">
        <Lead eyebrow="To book a confidential session or ask about our services" title="Your counselling and pastoral care team">
          <p>Contact Student Support at <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-primary-strong underline">{SUPPORT_EMAIL}</a> and we will connect you with the right person.</p>
        </Lead>
        <ul className="grid gap-6 md:grid-cols-3">
          {C.team.map((p) => {
            const src = 'legacy' in p && p.legacy ? legacyImage(p.photo, '') : p.photo
            return (
              <li key={p.name} className="flex flex-col overflow-hidden rounded-card border border-border bg-card">
                <div className="relative aspect-[4/3] bg-ink">
                  {src ? <Image src={src} alt={p.name} fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover object-top" /> : <span className="display bg-brand-gradient grid size-full place-items-center text-6xl text-foreground">{initials(p.name)}</span>}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="display text-2xl">{p.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-primary-strong">{p.role}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin aria-hidden className="size-4" />{p.location}</p>
                  {'bio' in p && p.bio && (
                    <details className="group/b mt-4 border-t border-border pt-3">
                      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden">View Bio<ChevronDown aria-hidden className="size-4 transition-transform group-open/b:rotate-180" /></summary>
                      <p className="mt-3 text-sm text-muted-foreground">{p.bio}</p>
                    </details>
                  )}
                  {'profile' in p && p.profile && <Link href={p.profile} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong">Full profile<ArrowRight aria-hidden className="size-4" /></Link>}
                </div>
              </li>
            )
          })}
        </ul>
      </Section>
      <section data-tone="ink" id="mental-health" className="bg-ink scroll-mt-24 text-ink-foreground">
        <div className="mx-auto grid max-w-site gap-10 px-5 py-16 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Lead eyebrow="Here to listen and help" title="Mental Health Support" onDark><p>{C.mental}</p></Lead>
          <div>
            <p className="mb-4 font-semibold">Our mental health services include:</p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {C.mentalServices.map(([t, b], i) => { const Icon = MENTAL_ICONS[i]; return <li key={t} className="rounded-card bg-ink-foreground/5 p-5"><Icon aria-hidden className="size-6 text-secondary" /><h3 className="mt-3 font-semibold">{t}</h3><p className="mt-1 text-sm text-ink-foreground/75">{b}</p></li> })}
            </ul>
            <Link href="/counselling/" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-secondary">External counselling with Relationships Australia<ArrowRight aria-hidden className="size-4" /></Link>
          </div>
        </div>
      </section>
    </SupportShell>
  )
}
