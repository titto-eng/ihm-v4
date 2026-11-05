// /counselling/ — WordPress page 132: external counselling (Relationships Australia) and four other support services.
import type { Metadata } from 'next'
import { ArrowUpRight, Phone } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { CrisisBand, Lead, SupportShell, heroBtn } from '@/components/student-support/parts'
import { OTHER_COUNSELLING, RELATIONSHIPS_AUSTRALIA as RA, TALK_ABOUT } from '@/content/student-support'

export const metadata: Metadata = pageMetadata({
  title: 'Counselling Support',
  path: '/counselling/',
  metaTitle: 'Counselling Support for IHM Students | Relationships Australia, Beyond Blue, 13YARN',
  description: 'Free confidential counselling for IHM students through Relationships Australia (two free sessions a year), plus Beyond Blue, Head to Health, Embrace Multicultural Mental Health and 13YARN.',
})

export default function CounsellingRoute() {
  return (
    <SupportShell
      path="/counselling/"
      image={{ src: '/images/landing/counsellors.webp', alt: 'A counsellor in conversation with a student' }}
      eyebrow="Student support · Counselling (External)"
      title={<>Counselling <em className="text-secondary">Support</em></>}
      intro="IHM students have access to staff for counselling and advice on appointment. An external counselling service is available, on referral, for the students of IHM to access as required."
      actions={<a href="#how" className={heroBtn(true)}>How to access counselling</a>}
    >
      <Section>
        <div className="mb-12"><CrisisBand /></div>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Lead eyebrow="In confidence" title="They can talk about" />
            <ul className="flex flex-wrap gap-2">{TALK_ABOUT.map((t) => <li key={t} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold">{t}</li>)}</ul>
          </div>
          <div id="how" className="scroll-mt-28 rounded-card bg-ink p-6 text-ink-foreground md:p-8">
            <p className="label-mono text-[10px] text-secondary">IHM partner</p>
            <h2 className="display mt-2 text-3xl">Relationships Australia</h2>
            <p className="mt-3 text-ink-foreground/80">IHM has arrangements in place with Relationships Australia to provide IHM counselling sessions and tele services to IHM students.</p>
            <p className="mt-3 text-sm text-ink-foreground/70">{RA.about}</p>
            <h3 className="mt-6 font-semibold">How can IHM students access counselling and support services?</h3>
            <p className="mt-2 text-sm text-ink-foreground/80">{RA.access}</p>
            <h3 className="mt-6 font-semibold">Costs for Counselling and Support Services?</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-[auto_1fr]">
              <p className="bg-brand-gradient rounded-2xl p-4 text-center text-foreground"><span className="display block text-4xl">2</span><span className="text-xs font-semibold">free sessions / 12 months</span></p>
              <ul className="grid gap-2 text-sm text-ink-foreground/80">{RA.costs.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
            <a href={RA.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-secondary">relationships.org.au<ArrowUpRight aria-hidden className="size-4" /></a>
          </div>
        </div>
      </Section>
      <Section tone="muted">
        <Lead eyebrow="More support" title="Four other sources of counselling and support">
          <p>The following are four other sources for students to obtain counselling and support services:</p>
        </Lead>
        <ol className="grid gap-5 md:grid-cols-2">
          {OTHER_COUNSELLING.map((s, i) => (
            <li key={s.name} className="flex flex-col rounded-card border border-border bg-card p-6">
              <span className="display text-3xl text-primary/70">{i + 1}.</span>
              <h3 className="display mt-2 text-2xl">{s.name}</h3>
              <p className="mt-2 flex-1 text-[15px] text-muted-foreground">{s.body}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {s.phone && <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground"><Phone aria-hidden className="size-4 text-secondary" />{s.phone}{s.hours && <span className="font-normal text-ink-foreground/70">· {s.hours}</span>}</a>}
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-primary">Visit website<ArrowUpRight aria-hidden className="size-4" /></a>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </SupportShell>
  )
}
