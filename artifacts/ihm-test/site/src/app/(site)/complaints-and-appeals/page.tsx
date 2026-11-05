// /complaints-and-appeals/ — WordPress page 135: the complaints and appeals process, external bodies, timelines, confidentiality,
// student advocacy and mental wellbeing links; the old tabs are sections here. The portal complaint form stays embedded.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Clock, FileText, Lock, Megaphone, MessageSquare, Scale, UserX } from 'lucide-react'
import { IframeEmbed, pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { Lead, SupportShell, heroBtn } from '@/components/student-support/parts'
import { legacyImage } from '@/lib/legacy-image'
import { COMPLAINTS as C, STATE_MENTAL_HEALTH } from '@/content/student-support'

export const metadata: Metadata = pageMetadata({
  title: 'Complaints and Appeals',
  path: '/complaints-and-appeals/',
  metaTitle: 'Student Complaints and Appeals | Process, Timelines, Ombudsman and Advocacy | IHM',
  description: 'How IHM handles student complaints and appeals: informal and formal complaints, appeals panels, 5-day acknowledgement and 20-day outcomes, confidentiality, the National Student Ombudsman and student advocacy.',
})

const NAV = [['process', 'About the Process'], ['complaints', 'Complaints'], ['appeals', 'Appeals'], ['confidentiality', 'Confidentiality'], ['timely-resolution', 'Timely Resolution'], ['external-bodies', 'Ombudsman and External Bodies'], ['advocacy', 'Student Advocacy']] as const

function Steps({ items }: { items: string[] }) {
  return <ol className="grid gap-3">{items.map((t, i) => <li key={t} className="flex gap-4 rounded-2xl bg-card p-4 text-[15px]"><span className="bg-brand-gradient grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold">{i + 1}</span>{t}</li>)}</ol>
}

export default function ComplaintsAppealsRoute() {
  const flow = legacyImage('/images/student-support/complaints-flowchart.webp', '')
  return (
    <SupportShell
      path="/complaints-and-appeals/"
      eyebrow="Student support · Complaints & Appeals"
      title={<>Complaints and <em className="text-secondary">Appeals</em></>}
      intro={C.intro[0]}
      actions={<><Link href="/ihm-student-complaints/" className={heroBtn(true)}>Register a Complaint<ArrowRight aria-hidden className="size-4" /></Link><Link href="/ihm-student-appeals/" className={heroBtn()}>Register an Appeal</Link></>}
    >
      <nav aria-label="On this page" className="sticky top-16 z-20 border-b border-border bg-background/90 backdrop-blur md:top-20">
        <ul className="mx-auto flex max-w-site gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] md:px-8">{NAV.map(([id, l]) => <li key={id} className="shrink-0"><a href={`#${id}`} className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary-strong">{l}</a></li>)}</ul>
      </nav>
      <Section anchorId="process">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4 text-[17px] leading-relaxed">
            <Eyebrow>About the Process</Eyebrow>
            {C.intro.slice(1).map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
            <ul className="flex flex-wrap gap-2 pt-2">{C.docs.map((d) => <li key={d.href}><a href={d.href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground hover:bg-primary hover:text-foreground"><FileText aria-hidden className="size-4" />{d.label}</a></li>)}</ul>
          </div>
          {flow ? <div className="relative overflow-hidden rounded-card border border-border bg-card p-3"><Image src={flow} alt="Student/Staff Complaints and Grievances process" width={1400} height={900} className="h-auto w-full rounded-xl" /></div> : (
            <ol className="grid content-start gap-3">{[['Talk to us', 'Lecturer or Student Support staff, then your Course Coordinator.'], ['Formal complaint', 'Complete the Complaints and Grievances Form; a panel investigates.'], ['Appeal', 'A more senior panel reviews the outcome.'], ['External review', 'Resolution Institute mediation or an Ombudsman.']].map(([t, b], i) => <li key={t} className="flex gap-4 rounded-card border border-border bg-card p-5"><span className="bg-brand-gradient grid size-10 shrink-0 place-items-center rounded-full font-bold">{i + 1}</span><span><span className="block font-semibold">{t}</span><span className="text-sm text-muted-foreground">{b}</span></span></li>)}</ol>
          )}
        </div>
        <div className="mt-10"><IframeEmbed url={C.form} title="Student Complaints and Grievances Form" height={560} depth={1} /></div>
      </Section>
      <Section tone="muted" anchorId="complaints">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><Lead eyebrow="Complaints" title="Informal and formal complaints" /><div className="space-y-3 text-[15px]">{C.informal.map((p) => <p key={p.slice(0, 30)} className="rounded-2xl border border-border bg-card p-4"><MessageSquare aria-hidden className="mb-2 size-5 text-primary-strong" />{p}</p>)}</div></div>
          <div><p className="mb-4 font-semibold">Formal Complaints</p><Steps items={C.formal} /><Link href="/ihm-student-complaints/" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold hover:bg-secondary">Register a Complaint<ArrowRight aria-hidden className="size-4" /></Link></div>
        </div>
      </Section>
      <Section anchorId="appeals">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Lead eyebrow="Appeals" title="Formal Appeals"><p>If you are not satisfied with the outcome of a complaint, you can appeal.</p></Lead>
          <div><Steps items={C.appeals} /><Link href="/ihm-student-appeals/" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold hover:bg-secondary">Register an Appeal<ArrowRight aria-hidden className="size-4" /></Link></div>
        </div>
      </Section>
      <Section tone="muted" anchorId="confidentiality">
        <div className="grid gap-5 lg:grid-cols-3">
          <div id="timely-resolution" className="scroll-mt-32 rounded-card bg-ink p-6 text-ink-foreground">
            <Clock aria-hidden className="size-7 text-secondary" /><h3 className="display mt-3 text-2xl">Timely Resolution</h3>
            <dl className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-ink-foreground/5 p-4"><dd className="display text-4xl text-secondary">5</dd><dt className="text-xs">working days to acknowledge</dt></div><div className="rounded-2xl bg-ink-foreground/5 p-4"><dd className="display text-4xl text-secondary">20</dd><dt className="text-xs">working days to an outcome</dt></div></dl>
            <div className="mt-4 space-y-2 text-sm text-ink-foreground/80">{C.timely.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
          </div>
          <div className="rounded-card border border-border bg-card p-6">
            <Lock aria-hidden className="size-7 text-primary-strong" /><h3 className="display mt-3 text-2xl">Confidentiality</h3>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">{C.confidentiality.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
          </div>
          <div className="rounded-card border border-border bg-card p-6">
            <UserX aria-hidden className="size-7 text-primary-strong" /><h3 className="display mt-3 text-2xl">Anonymous Complainants</h3>
            <p className="mt-3 text-sm text-muted-foreground">{C.anonymous}</p>
          </div>
        </div>
      </Section>
      <Section anchorId="external-bodies">
        <Lead eyebrow="Independent review" title="Ombudsman and External Bodies"><p>{C.externalIntro}</p></Lead>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {C.external.map((e) => {
            const inner = <><span className="flex items-start justify-between gap-3 font-semibold"><span className="flex gap-2"><Scale aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-strong" />{e.name}</span>{e.href && <ArrowUpRight aria-hidden className="size-4 shrink-0" />}</span>{e.note && <span className="mt-1 block text-sm text-muted-foreground">{e.note}</span>}</>
            return <li key={e.name}>{e.href ? <a href={e.href} target="_blank" rel="noopener noreferrer" className="block h-full rounded-2xl border border-border bg-card p-4 hover:border-primary">{inner}</a> : <div className="h-full rounded-2xl border border-border bg-card p-4">{inner}</div>}</li>
          })}
        </ul>
      </Section>
      <section data-tone="ink" id="advocacy" className="bg-ink-glow scroll-mt-32 text-ink-foreground">
        <div className="mx-auto max-w-site px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <Eyebrow onDark>Student Advocacy</Eyebrow>
              <h2 className="display text-display-md">Someone in your corner</h2>
              <div className="mt-5 space-y-3 text-ink-foreground/80">{C.advocacy.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}<p>{C.ssaf.text} <a href={C.ssaf.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-secondary underline">About SSAF</a></p></div>
            </div>
            <div>
              <p className="mb-4 flex items-center gap-2 font-semibold"><Megaphone aria-hidden className="size-5 text-secondary" />Topics covered in the weekly sessions may include:</p>
              <ul className="grid gap-3 sm:grid-cols-2">{C.advocacyTopics.map(([t, b]) => <li key={t} className="rounded-2xl bg-ink-foreground/5 p-4"><p className="font-semibold">{t}</p><p className="mt-1 text-sm text-ink-foreground/70">{b}</p></li>)}</ul>
              <p className="mt-5 text-sm text-ink-foreground/80">{C.advocacyClose}</p>
            </div>
          </div>
          <div className="mt-12 rounded-card bg-card p-6 text-foreground md:p-8">
            <h3 className="display text-2xl">Mental Wellbeing</h3>
            <p className="mt-1 text-sm text-muted-foreground">For more support regarding student mental health and wellbeing services please refer to:</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{STATE_MENTAL_HEALTH.map((s) => <li key={s.state}><a href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-2xl bg-muted/60 p-4 font-semibold hover:bg-blush hover:text-primary-strong">{s.state}<ArrowUpRight aria-hidden className="size-4" /></a></li>)}</ul>
          </div>
        </div>
      </section>
    </SupportShell>
  )
}
