// /talk-to-rishi/ — Rishi, the student help chatbot: what it handles and the LiveChat link (the same LiveChat licence as Student
// Support; the old button pointed at LiveChat's UTM builder page). Copy in src/content/campus-pages.ts (RISHI).
import type { Metadata } from 'next'
import Image from 'next/image'
import { Briefcase, Building2, GraduationCap, HeartPulse, Laptop, MessageCircle, MessageSquareWarning, Scale, Wallet } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { HeroRays } from '@/blocks/hero/Component'
import { EnquireSection } from '@/components/campus/parts'
import { RISHI as R } from '@/content/campus-pages'
import { LIVECHAT, SUPPORT_EMAIL } from '@/content/student-support'

export const metadata: Metadata = pageMetadata({
  title: 'Talk to Rishi',
  path: '/talk-to-rishi/',
  metaTitle: 'Talk to Rishi | IHM Student Help Chat',
  description: 'Rishi, IHM’s student help chatbot: academic requests, administration, IT support, finance, jobs, complaints and appeals. Get the advice you need, when you need it.',
})

const ICONS = { academic: GraduationCap, admin: Building2, it: Laptop, finance: Wallet, job: Briefcase, complaints: MessageSquareWarning, appeals: Scale, covid: HeartPulse } as const

export default function TalkToRishiRoute() {
  return (
    <>
      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="rishi-rays" className="-right-24 -bottom-28 -z-10 w-[28rem] opacity-[0.13]" />
        <div className="mx-auto grid max-w-site grid-cols-1 items-center gap-10 px-5 pt-14 pb-10 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:pt-20">
          <div className="animate-rise">
            <Eyebrow onDark>Need help?</Eyebrow>
            <h1 className="display text-[clamp(2.5rem,6vw,4.6rem)] leading-[1.02]">{R.title}</h1>
            <p className="mt-5 max-w-xl text-lg text-ink-foreground/80">{R.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={LIVECHAT} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary"><MessageCircle aria-hidden className="size-5" />Live Chat</a>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink-foreground/30 px-6 font-semibold hover:border-secondary hover:text-secondary">Email Student Support</a>
            </div>
          </div>
          <div className="relative mx-auto aspect-[651/798] w-56 md:w-72">
            <span aria-hidden className="absolute inset-6 rounded-full bg-secondary/30 blur-3xl" />
            <Image src="/images/campuses/rishi.webp" alt="Rishi, the IHM help chatbot" fill priority sizes="300px" className="object-contain motion-safe:animate-[float_6s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      <Section>
        <Eyebrow>What Rishi can do</Eyebrow>
        <h2 className="display mb-10 max-w-3xl text-display-md">{R.topicsTitle}</h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {R.topics.map((t) => {
            const Icon = ICONS[t.key]
            return (
              <li key={t.key} className="group rounded-card border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                <span className="grid size-12 place-items-center rounded-2xl bg-blush text-primary-strong transition-colors group-hover:bg-brand-gradient group-hover:text-foreground"><Icon aria-hidden className="size-6" /></span>
                <h3 className="display mt-5 text-2xl">{t.t}</h3>
                <p className="mt-2 text-[15px] text-muted-foreground">{t.b}</p>
              </li>
            )
          })}
        </ul>
        <div className="bg-sunrise-glow mt-10 flex flex-col items-start justify-between gap-5 rounded-card p-7 md:flex-row md:items-center md:p-10">
          <p className="display text-2xl md:text-3xl">Chat with Rishi now. Available 24/7.</p>
          <a href={LIVECHAT} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-ink-foreground hover:bg-primary hover:text-foreground"><MessageCircle aria-hidden className="size-5" />Start Live Chat</a>
        </div>
      </Section>

      <EnquireSection heading="Prefer to send a message?" />
    </>
  )
}
