// /career/ — WordPress template-career.php (synced 2026-10-30). Current vacancies come from the ELMO careers portal, embedded
// as on the old site (host on site.allowedEmbedHosts).
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Briefcase, GraduationCap, HeartHandshake, Lightbulb } from 'lucide-react'
import { pageMetadata, IframeEmbed } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { HeroRays } from '@/blocks/hero/Component'
import { Eyebrow } from '@/components/micro-credentials/parts'

export const metadata: Metadata = pageMetadata({
  title: 'Career',
  path: '/career/',
  metaTitle: 'Careers at IHM | Academic and Professional Jobs in Health Education',
  description:
    'Join the Institute of Health and Management. Search current academic and professional vacancies and help healthcare professionals become visionary leaders through Education for Employment.',
})

const VALUES = [
  { icon: GraduationCap, title: 'Expert faculty', body: 'Work alongside experienced academics and clinicians across nursing, social work and health management.' },
  { icon: Lightbulb, title: 'Innovation and critical thinking', body: 'Our commitment goes beyond jobs: we aim to cultivate innovation, critical thinking and positive change.' },
  { icon: Briefcase, title: 'State-of-the-art facilities', body: 'Teach and support students in modern campuses and simulation laboratories across Australia.' },
  { icon: HeartHandshake, title: 'Strong industry partnerships', body: 'A supportive environment to unleash your potential and make a meaningful impact in healthcare.' },
]

export default function CareerRoute() {
  return (
    <>
      <section data-tone="sunrise" className="bg-brand-wash relative isolate overflow-hidden">
        <HeroRays id="career-rays" className="-top-24 -left-24 -z-10 w-[26rem] opacity-[0.12]" />
        <div className="mx-auto grid max-w-site items-center gap-12 px-5 py-14 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <Eyebrow>We are hiring</Eyebrow>
            <h1 className="display text-[clamp(2.6rem,6vw,4.8rem)] leading-[1.02]">Come and <em className="text-primary-strong">Join Us</em></h1>
            <span aria-hidden className="bg-brand-gradient mt-7 block h-1 w-20 rounded-full" />
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/80">
              Welcome to IHM, where we redefine education and empower healthcare professionals to become visionary leaders. Our commitment to &quot;Education for
              Employment: Bridging the gap globally&quot; goes beyond jobs; we aim to cultivate innovation, critical thinking, and positive change. With expert faculty,
              state-of-the-art facilities, and strong industry partnerships, IHM offers a supportive environment to unleash your potential and make a meaningful impact
              in the healthcare industry. Join us now and shape a brighter future in healthcare.
            </p>
            <p className="display mt-5 text-xl text-primary-strong italic">Transform your career with IHM. Empower your journey today!</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#jobs" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-semibold shadow-[0_12px_28px_-14px_hsl(5_85%_55%/0.9)] transition-all hover:-translate-y-0.5 hover:bg-secondary">Search jobs<ArrowRight aria-hidden className="size-4" /></a>
              <Link href="/our-people/" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-foreground/25 bg-card px-6 py-2.5 font-semibold hover:border-primary">Meet our people</Link>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-[0_32px_64px_-36px_hsl(348_35%_13%/0.6)] ring-4 ring-card">
            <Image src="/images/nursing-pathway/lead.webp" alt="IHM nurse educators and staff in a hospital corridor" fill priority sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
          </div>
        </div>
      </section>

      <Section anchorId="why">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <li key={v.title} className="rounded-card border border-border bg-card p-6">
              <span className={`grid size-11 place-items-center rounded-xl ${i % 2 ? 'bg-sand text-secondary-strong' : 'bg-blush text-primary-strong'}`}><v.icon aria-hidden className="size-5" /></span>
              <h2 className="display mt-4 text-xl">{v.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section anchorId="jobs" tone="muted">
        <Eyebrow>Current vacancies</Eyebrow>
        <h2 className="display mb-8 text-display-md">Search <em className="text-primary-strong">Jobs</em></h2>
        <div className="overflow-hidden rounded-card border border-border bg-card">
          <IframeEmbed url="https://healthcareers.elmotalent.com.au/careers/IHM/jobs?layout=iframe" title="IHM job vacancies" height={1100} />
        </div>
      </Section>
    </>
  )
}
