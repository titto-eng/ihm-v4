// /student-success-gcan/ — WordPress page 8310 "Student Success Program for GCAN": objectives, why it matters, your role and
// upcoming events (the NCLEX session poster links to its Zoom registration). Contact goes to the Student Support mailbox, not
// personal staff addresses. Copy in src/content/study.ts (STUDENT_SUCCESS).
import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Mail, Sparkles } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { ChapterBody } from '@/components/admissions/parts'
import { KitBlocks, sections } from '@/components/page-kit/Kit'
import { SupportShell, Lead, heroBtn } from '@/components/student-support/parts'
import { SUPPORT_EMAIL } from '@/content/student-support'
import { STUDENT_SUCCESS } from '@/content/study'
import { legacyImage } from '@/lib/legacy-image'

export const metadata: Metadata = pageMetadata({
  title: 'Student Success (GCAN)',
  path: '/student-success-gcan/',
  metaTitle: 'Student Success Program for GCAN Students | IHM',
  description: 'The Student Success Programme supports GCAN students to stay engaged, prepare for registration (AHPRA, OSCE, NCLEX) and become career-ready, with workshops, guidance and industry connections.',
})

const ZOOM = 'https://hcigroup.zoom.us/meeting/register/xSaN1gYiRsC8X_Q3V-sB7g#/registration'

export default function StudentSuccessGcanRoute() {
  const { items } = sections(STUDENT_SUCCESS, 5)
  const events = items.find((s) => s.title === 'Upcoming events')
  const body = items.filter((s) => s !== events)
  const poster = legacyImage('/images/study/nclex-event.webp', '')
  return (
    <SupportShell
      path=""
      eyebrow="GCAN students"
      title={<>Student Success Program <em className="text-secondary">for GCAN</em></>}
      intro="Support for your personal success at IHM, including careers and nursing registration."
      actions={<><a href="#upcomingEvents" className={heroBtn(true)}>Upcoming events<ArrowDown aria-hidden className="size-4" /></a><a href={`mailto:${SUPPORT_EMAIL}`} className={heroBtn()}><Mail aria-hidden className="size-4" />Ask your student support officers!</a></>}
      nav={[]}
    >
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {body.map((s, i) => (
            <article key={s.title} className="rounded-card border border-border bg-card p-6">
              <span className="display text-4xl text-primary-strong">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="display mt-3 text-2xl">{s.title}</h2>
              <ChapterBody blocks={s.blocks} />
            </article>
          ))}
        </div>
      </Section>
      <Section tone="muted" anchorId="upcomingEvents">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Lead eyebrow="Events" title="Upcoming events" />
            {events && <KitBlocks blocks={events.blocks} className="text-lg" />}
            <a href={ZOOM} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-ink-foreground hover:bg-primary hover:text-foreground"><Sparkles aria-hidden className="size-4" />Register for the NCLEX session<ArrowUpRight aria-hidden className="size-4" /></a>
          </div>
          {poster && <a href={ZOOM} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-card border border-secondary/60 transition-transform hover:-translate-y-1"><Image src={poster} alt="NCLEX event poster" width={900} height={900} className="h-auto w-full" /></a>}
        </div>
      </Section>
    </SupportShell>
  )
}
