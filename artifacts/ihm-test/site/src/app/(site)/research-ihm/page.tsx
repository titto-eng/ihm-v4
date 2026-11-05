// /research-ihm/ — WordPress page 8829 (updated 2026-10-22): overview, adjunct appointments, vision and the research team.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Compass, Globe2, Lightbulb, ShieldCheck } from 'lucide-react'
import { pageMetadata, Hero, img } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/blocks/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { siteOrigin } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Research – IHM',
  path: '/research-ihm/',
  metaTitle: 'Research at IHM | Nursing, Aged Care, Digital Health and Health Management Research',
  description:
    'IHM advances impactful, ethical and practice-informed research in health, nursing, aged care, digital health and health management, with applied research, innovation and global collaboration.',
})

const FOCUS = [
  { icon: Lightbulb, title: 'Applied and innovative', body: 'A strong emphasis on applied research, innovation and global collaboration.' },
  { icon: Globe2, title: 'Aligned with real priorities', body: 'Our agenda aligns with national and international priorities, industry needs and community wellbeing.' },
  { icon: ShieldCheck, title: 'Rigorous and responsive', body: 'Grounded in academic rigour, cultural responsiveness and real-world relevance.' },
]

const TEAM = [
  { name: 'Dr. Chandana Hewege', role: 'Chairman Board of Directors (Non-Executive Director)', photo: '/images/people/chandana-hewege.webp', bio: '/professor-chandana-hewege/' },
  { name: 'Dr. Abhishek Sharma', role: 'Research and Innovation Manager, IHM', photo: '/images/people/abhishek-sharma.webp', bio: '/dr-abhishek-sharma/' },
  { name: 'Dr. Priyanka Malaiyappan', role: 'Research and Innovation Coordinator, IHM', photo: '/images/people/priyanka-malaiyappan.webp', bio: '/dr-priyanka-malaiyappan/' },
]

const MORE = [
  { href: '/research-initiatives-global-collaborations/', label: 'Research initiatives & global collaborations' },
  { href: '/adjunct-appointments/', label: 'Adjunct appointments' },
  { href: '/our-people/', label: 'Our people' },
]

export default function ResearchIhmRoute() {
  const origin = siteOrigin()
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ResearchProject',
        name: 'Research at the Institute of Health and Management',
        description: 'Applied, ethical and practice-informed research in health, nursing, aged care, digital health and health management.',
        url: `${origin}/research-ihm/`,
        sponsor: { '@type': 'CollegeOrUniversity', name: 'Institute of Health and Management', url: origin },
        member: TEAM.map((t) => ({ '@type': 'Person', name: t.name, jobTitle: t.role, url: `${origin}${t.bio}` })),
      }} />
      <Hero
        variant="split"
        eyebrow="Research"
        heading="Research at *IHM*"
        subheading="Impactful, ethical and practice-informed research that addresses contemporary challenges in health, nursing, aged care, digital health and health management."
        image={img({ src: '/images/home/hero/health-leaders-ihm-uniform.webp', alt: 'Health leaders in discussion', width: 1920, height: 706, focal: [72, 50] })}
        ctas={[{ label: 'Meet the research team', href: '#team', style: 'primary' }, { label: 'Adjunct appointments', href: '/adjunct-appointments/', style: 'secondary' }]}
      />

      <Section anchorId="overview">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeader eyebrow="Overview" heading="Research with *real-world* impact" className="mb-6" />
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                The Institute of Health &amp; Management (IHM) is committed to advancing impactful, ethical, and practice-informed research that addresses contemporary
                challenges in health, nursing, aged care, digital health, and health management. Our research agenda aligns with national and international priorities,
                industry needs, and community wellbeing, with a strong emphasis on applied research, innovation, and global collaboration.
              </p>
              <p>IHM research is grounded in academic rigor, cultural responsiveness, and real-world relevance, supporting evidence-based education, policy, and professional practice.</p>
            </div>
          </div>
          <ul className="grid gap-4">
            {FOCUS.map((f, i) => (
              <li key={f.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-[0_18px_40px_-30px_hsl(348_35%_13%/0.3)]">
                <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${i % 2 ? 'bg-sand text-secondary-strong' : 'bg-blush text-primary-strong'}`}>
                  <f.icon aria-hidden className="size-5" />
                </span>
                <div>
                  <h3 className="display text-xl">{f.title}</h3>
                  <p className="mt-1 text-[15px] text-muted-foreground">{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section anchorId="vision" tone="muted">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-ink-glow relative overflow-hidden rounded-card p-8 text-ink-foreground md:p-10">
            <Compass aria-hidden className="size-8 text-secondary" />
            <p className="label-mono mt-6 text-[11px] tracking-[0.16em] text-secondary">Research vision</p>
            <p className="display mt-3 text-[clamp(1.5rem,2.6vw,2.1rem)] leading-snug">
              To be a globally connected, practice-oriented higher education institution recognised for impactful research that improves <em className="text-secondary">health outcomes, workforce capability, and health systems</em>.
            </p>
          </div>
          <div className="flex flex-col rounded-card border border-border bg-card p-8 md:p-10">
            <p className="label-mono text-[11px] tracking-[0.16em] text-primary-strong">Adjunct appointments</p>
            <h2 className="display mt-3 text-3xl leading-tight">Bring your expertise to IHM</h2>
            <p className="mt-4 text-muted-foreground">
              An adjunct appointment is an honorary, academic title - held for up to five years, across four levels from Adjunct Lecturer to Adjunct Professor - awarded
              to practising clinicians, industry leaders and researchers who bring real-world expertise into IHM&apos;s teaching, research and person-centred care.
            </p>
            <Link href="/adjunct-appointments/" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold transition-all hover:-translate-y-0.5 hover:bg-secondary">
              Explore Adjunct Appointments<ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section anchorId="team">
        <SectionHeader eyebrow="People" heading="Our Research *Team*" className="mb-10" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((t) => (
            <li key={t.name}>
              <article className="group/t relative overflow-hidden rounded-card border border-border bg-card shadow-[0_18px_40px_-30px_hsl(348_35%_13%/0.35)] transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/5] overflow-hidden bg-blush">
                  <Image src={t.photo} alt={`Portrait of ${t.name}`} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" className="object-cover transition-transform duration-700 group-hover/t:scale-105" />
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground">
                    <h3 className="display text-2xl"><Link href={t.bio} className="after:absolute after:inset-0">{t.name}</Link></h3>
                    <p className="mt-1 text-sm text-ink-foreground/85">{t.role}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-secondary">View Bio<ArrowUpRight aria-hidden className="size-4" /></span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <nav aria-label="More about research" className="mt-12 flex flex-wrap gap-3">
          {MORE.map((m) => (
            <Link key={m.href} href={m.href} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-[15px] font-semibold transition-colors hover:border-primary hover:text-primary-strong">
              {m.label}<ArrowRight aria-hidden className="size-4" />
            </Link>
          ))}
        </nav>
      </Section>
    </>
  )
}
