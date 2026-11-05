// /aboriginal-and-torres-strait-islander/ — WordPress page 1228: the Reconciliation Action Plan, support and events for
// Aboriginal and Torres Strait Islander students, commitments and professional development for staff, and the Education and
// Support Committee. Copy in src/content/about.ts (ATSI).
import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, CalendarDays, Repeat } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { AboutShell } from '@/components/about/parts'
import { Buttons, KitLink } from '@/components/page-kit/Kit'
import { Lead, Ticks, heroBtn } from '@/components/student-support/parts'
import { ATSI as A } from '@/content/about'
import { legacyImage } from '@/lib/legacy-image'

export const metadata: Metadata = pageMetadata({
  title: 'Aboriginal and Torres Strait Islander',
  path: '/aboriginal-and-torres-strait-islander/',
  metaTitle: 'Aboriginal and Torres Strait Islander Education & Support | IHM',
  description: 'Culturally safe learning and working at IHM: our Reconciliation Action Plan, priority admission, scholarships, mentorship and events for Aboriginal and Torres Strait Islander students and staff.',
})

type Ev = (typeof A.studentEvents)[number]
function Events({ items }: { items: Ev[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((e) => (
        <li key={e.title + e.when} className="flex flex-col rounded-card border border-border bg-card p-6">
          <span className="label-mono inline-flex items-center gap-2 text-[11px] text-primary-strong"><Repeat aria-hidden className="size-3.5" />{e.freq}</span>
          <h3 className="display mt-3 text-xl">{e.title}</h3>
          <p className="mt-1 flex items-center gap-2 text-sm font-semibold"><CalendarDays aria-hidden className="size-4 text-primary-strong" />{e.when}</p>
          {e.text && <p className="mt-3 text-sm text-muted-foreground">{e.text}</p>}
          {e.btn && <div className="mt-auto pt-5"><KitLink href={e.btn.href} className="inline-flex items-center gap-2 text-sm font-semibold text-primary-strong">{e.btn.t}<ArrowRight aria-hidden className="size-4" /></KitLink></div>}
        </li>
      ))}
    </ul>
  )
}

export default function AtsiRoute() {
  const bg = legacyImage('/images/cultural-events/aboriginal-bg.webp', '')
  return (
    <AboutShell path="" eyebrow={A.rapKicker} title={<>Aboriginal and Torres Strait Islander <em className="text-secondary">Education & Support</em></>} intro={A.intro}
      actions={<><a href="#students" className={heroBtn(true)}>For students</a><a href="#staff" className={heroBtn()}>For staff</a></>}>
      <Section anchorId="rap" className="relative overflow-hidden">
        {bg && <Image src={bg} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-10" />}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div><Lead eyebrow="Our commitment to reconciliation" title={A.rapTitle}><p>{A.rap}</p></Lead><Buttons items={A.rapLinks} /></div>
          <ul className="grid gap-3">{A.pillars.map(([t, d], i) => <li key={t} className="flex items-center gap-5 rounded-card border border-border bg-card p-5"><span className="display text-4xl text-primary-strong">{String(i + 1).padStart(2, '0')}</span><span><span className="display block text-2xl">{t}</span><span className="text-muted-foreground">{d}</span></span></li>)}</ul>
        </div>
      </Section>

      <Section tone="ink" className="bg-ink-glow" anchorId="students">
        <Lead onDark eyebrow="For students" title={A.studentsTitle}><p>{A.students}</p></Lead>
        <h3 className="display text-2xl">What we offer</h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {A.offers.map((o) => (
            <li key={o.title} className="flex flex-col rounded-card bg-ink-foreground/5 p-6 ring-1 ring-ink-foreground/10">
              <h4 className="display text-xl">{o.title}</h4>
              {o.text.map((t) => <p key={t.slice(0, 20)} className="mt-2 text-sm text-ink-foreground/80">{t}</p>)}
              {o.btn && <div className="mt-auto pt-5"><KitLink href={o.btn.href} className="inline-flex items-center gap-2 text-sm font-semibold text-secondary">{o.btn.t}<ArrowRight aria-hidden className="size-4" /></KitLink></div>}
            </li>
          ))}
        </ul>
      </Section>
      <Section anchorId="student-events">
        <Lead eyebrow="Students" title="Events" />
        <Events items={A.studentEvents} />
        <div className="mt-10 flex flex-col gap-4 rounded-card bg-sunrise-glow p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div><p className="display text-2xl">{A.readyTitle}</p><p className="mt-1">{A.ready}</p></div>
          <Buttons items={[A.readyBtn]} />
        </div>
      </Section>

      <Section tone="muted" anchorId="staff">
        <Lead eyebrow="For staff" title={A.staffTitle}><p>{A.staff}</p></Lead>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{A.commitments.map((c) => <li key={c.title} className="rounded-card border border-border bg-card p-6"><h3 className="display text-xl">{c.title}</h3>{c.list && <div className="mt-4"><Ticks items={c.list} /></div>}</li>)}</ul>
        <div className="mt-10 rounded-card bg-ink p-6 text-ink-foreground md:p-8"><p className="display text-2xl">{A.committeeJoinTitle}</p><p className="mt-2 text-ink-foreground/80">{A.committeeJoin}</p><div className="mt-5"><Buttons items={[A.committeeJoinBtn]} onDark /></div></div>
      </Section>
      <Section anchorId="staff-events">
        <Lead eyebrow="Staff" title="Professional development events" />
        <Events items={A.staffEvents} />
      </Section>
      <Section tone="muted" anchorId="committee">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-card border border-border bg-card p-6"><h2 className="display text-2xl">{A.rapTitle2}</h2><p className="mt-3 text-sm text-muted-foreground">{A.rap2}</p><div className="mt-5"><Buttons items={[{ t: 'Read the Full RAP', href: '/ihm-australias-reconciliation-action-plan/' }]} /></div></div>
          <div className="rounded-card border border-border bg-card p-6"><h2 className="display text-2xl">{A.committeeTitle}</h2><p className="mt-3 text-sm text-muted-foreground">{A.committee}</p></div>
          <div className="rounded-card bg-ink p-6 text-ink-foreground"><h2 className="display text-2xl">{A.joinTitle}</h2><p className="mt-3 text-sm text-ink-foreground/80">{A.join}</p><div className="mt-5"><Buttons items={[A.joinBtn]} onDark /></div></div>
        </div>
      </Section>
    </AboutShell>
  )
}
