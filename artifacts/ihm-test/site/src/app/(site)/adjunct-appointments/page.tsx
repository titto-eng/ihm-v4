// Migrated from the WordPress page "Adjunct Appointments" (wp id 10459, updated 2026-10-22).
import type { Metadata } from 'next'
import { ArrowRight, BadgeCheck, CalendarCheck, ClipboardCheck, FileSignature, KeyRound, Mail, Send, Sparkles, Users } from 'lucide-react'
import { pageMetadata, Hero, img } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/blocks/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { AdjunctApplicationForm } from '@/components/forms/AdjunctApplicationForm.client'
import { getFormView } from '@/lib/enquiries/formView'

export const metadata: Metadata = pageMetadata({
  title: 'Adjunct Appointments',
  path: '/adjunct-appointments/',
  description:
    'Adjunct appointments at IHM: an honorary academic title for up to five years, from Adjunct Lecturer to Adjunct Professor, for practising clinicians, industry leaders and researchers who contribute to IHM teaching and research.',
})

const JOURNEY = [
  { icon: Send, title: 'Apply', body: 'Complete the online Adjunct Application Form in the Health Ovation Research Hub, with your current CV.' },
  { icon: ClipboardCheck, title: 'Screening', body: 'The Research Coordinator checks your application for completeness and eligibility, usually within 5 business days. Supporting qualifications or further information may be requested during assessment.' },
  { icon: BadgeCheck, title: 'Approval', body: 'The Head of School assesses your eligibility, academic level, conflict of interest and proposed Contribution Plan, usually within 10 business days.' },
  { icon: FileSignature, title: 'Offer', body: 'People and Culture issues your formal Engagement Letter for e-signature, usually within 5 business days.' },
  { icon: KeyRound, title: 'Access', body: 'Once you accept, your email, library, LMS and research system access is set up within 5 business days.' },
  { icon: Users, title: 'Induction', body: 'A welcome, research and teaching induction is completed within 30 days.' },
  { icon: CalendarCheck, title: 'Engagement', body: 'Ongoing activities, an annual review, and renewal or a farewell with thanks.' },
]

const FACTS = [
  { label: 'Term', value: 'Up to 5 years' },
  { label: 'Levels', value: 'Adjunct Lecturer to Adjunct Professor' },
  { label: 'Streams', value: 'Teaching and Research, or Research Only' },
  { label: 'Target', value: '20 business days to Engagement Letter' },
]

const NEED = [
  'Your contact details and professional profile, if held',
  'Your preferred appointment type, adjunct level and Host School or discipline',
  'A current CV in PDF, DOC or DOCX format, maximum 10MB',
  'Confirmation of the six declarations and consent statements',
]

export default async function AdjunctAppointmentsRoute() {
  const view = await getFormView('adjunct-application')
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to apply for an adjunct appointment at IHM',
        totalTime: 'P28D',
        step: JOURNEY.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.body })),
      }} />
      <Hero
        variant="split"
        eyebrow="Research at IHM"
        heading="Adjunct *Appointments*"
        subheading="Caring with Passion: Growing Our Academic Community"
        image={img({ src: '/images/home/hero/social-work-conference.webp', alt: 'Academic presenting to a full lecture theatre', width: 1920, height: 706, focal: [78, 50] })}
        ctas={[{ label: 'Apply now', href: '#application-form', style: 'primary' }, { label: 'How to apply', href: '#journey', style: 'secondary' }]}
      />

      <Section anchorId="about">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeader eyebrow="The appointment" heading="About the *Appointment*" className="mb-6" />
            <p className="text-lg leading-relaxed text-muted-foreground">
              An adjunct appointment is an honorary, academic title — held for up to five years, across four levels from Adjunct Lecturer to Adjunct Professor, for
              either Teaching and Research or Research Only — awarded to practising clinicians, industry leaders and researchers who contribute to IHM&apos;s teaching
              and research. It&apos;s one of the ways our academic community grows beyond our own staff: bringing real-world expertise into the classroom, the research
              lab and the life of the Institute, keeping that expertise connected to IHM&apos;s curriculum and person-centred care, opening research collaboration through
              co-authorship, grants and student supervision, and joining a wider scholarly community across IHM&apos;s Schools, including regional partners.
            </p>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {FACTS.map((f, i) => (
              <div key={f.label} className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[0_18px_40px_-30px_hsl(348_35%_13%/0.3)]">
                <span aria-hidden className={`absolute inset-y-0 left-0 w-1 ${i % 2 ? 'bg-secondary' : 'bg-primary'}`} />
                <dt className="label-mono text-[10px] text-muted-foreground">{f.label}</dt>
                <dd className="display mt-2 text-xl leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="muted" anchorId="journey">
        <SectionHeader eyebrow="Seven steps" heading="How to Apply: The Appointment *Journey*" intro="End-to-end target: 20 business days from application to Engagement Letter." />
        <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((s, i) => (
            <li key={s.title} className="group relative rounded-card border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-30px_hsl(5_60%_30%/0.5)]">
              <div className="flex items-center justify-between">
                <span className={`grid size-12 place-items-center rounded-2xl ${i % 2 ? 'bg-sand text-secondary-strong' : 'bg-blush text-primary-strong'}`}><s.icon aria-hidden className="size-6" /></span>
                <span className="display text-4xl text-border transition-colors group-hover:text-primary/40">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="display mt-5 text-2xl">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
            </li>
          ))}
          <li className="bg-ink-glow flex flex-col justify-center rounded-card p-6 text-ink-foreground">
            <Sparkles aria-hidden className="size-6 text-secondary" />
            <p className="display mt-4 text-2xl leading-snug">20 business days</p>
            <p className="mt-2 text-ink-foreground/75">from application to Engagement Letter.</p>
          </li>
        </ol>
      </Section>

      <Section anchorId="apply">
        <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="bg-ink-glow rounded-card p-8 text-ink-foreground md:p-10">
              <p className="label-mono text-secondary">Ready to apply?</p>
              <h2 className="display mt-4 text-[clamp(1.8rem,3vw,2.5rem)] leading-tight">Share your expertise. Shape the next generation of <em className="font-normal text-secondary">health professionals</em>.</h2>
              <p className="mt-5 text-ink-foreground/80">Every adjunct strengthens how IHM educates compassionate, person-centred health professionals for communities across Australia.</p>
              <p className="mt-3 text-ink-foreground/80">Know someone who&apos;d make a great adjunct, or ready to apply yourself? Applications are open through the Health Ovation Research Hub.</p>
              <p className="mt-6 font-semibold">Questions? Get in touch.</p>
              <a href="mailto:hr@ihm.edu.au" className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-full bg-secondary px-6 font-semibold text-secondary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary"><Mail aria-hidden className="size-4" />hr@ihm.edu.au</a>
            </div>
            <div className="rounded-card border border-border bg-card p-8">
              <h3 className="label-mono text-primary-strong">What you&apos;ll need to apply</h3>
              <ul className="mt-4 space-y-3">
                {NEED.map((n) => (
                  <li key={n} className="flex gap-3"><BadgeCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-strong" /><span>{n}</span></li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl bg-ink p-5 text-sm text-ink-foreground"><span className="font-semibold text-secondary">Target:</span> 20 business days from application to Engagement Letter.</p>
            </div>
          </aside>
          <div id="application-form" className="scroll-mt-28">
            <h2 className="display text-3xl md:text-4xl">Adjunct Application Form</h2>
            <p className="mt-3 mb-6 text-muted-foreground">Apply in three steps: your details, your proposed appointment, and declarations.</p>
            {view
              ? <AdjunctApplicationForm def={view.def} />
              : <a href="mailto:hr@ihm.edu.au?subject=Adjunct%20appointment%20application" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground">Email your application <ArrowRight aria-hidden className="size-4" /></a>}
          </div>
        </div>
      </Section>
    </>
  )
}
