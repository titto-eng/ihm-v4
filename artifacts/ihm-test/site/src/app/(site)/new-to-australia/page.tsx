// /new-to-australia/ — WordPress page 161: pre-arrival information, why Australia, life in Australia (Melbourne, Perth, Sydney),
// working, after graduation, student visas and CRICOS. Copy in src/content/international.ts (NEW_TO_AUSTRALIA).
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BadgeCheck, BookOpen, Briefcase, CloudSun, FileText, GraduationCap, Landmark, Languages, Map, Scale, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { IntlShell } from '@/components/international/parts'
import { Lead, Ticks, heroBtn } from '@/components/student-support/parts'
import { INTERNATIONAL_HANDBOOK, NEW_TO_AUSTRALIA as N } from '@/content/international'

export const metadata: Metadata = pageMetadata({
  title: 'New to Australia',
  path: '/new-to-australia/',
  metaTitle: 'New to Australia? Guide for International Students | Living Costs, Cities, Work and Visas | IHM',
  description: 'Everything international students need to know about Australia: states and territories, climate, living costs (around AUD $29,710 a year), Melbourne, Perth and Sydney, working rights, visas and CRICOS.',
})

const FACT_ICONS = [Map, CloudSun, Landmark, Users, Languages]
const NAV = [['pre-arrival', 'Pre-Arrival'], ['why-australia', 'Why Australia?'], ['life', 'Life in Australia'], ['working', 'Working'], ['after-graduation', 'After Graduation'], ['visas', 'Visas & CRICOS']] as const

export default function NewToAustraliaRoute() {
  return (
    <IntlShell
      path="/new-to-australia/"
      title={<>New to Australia? <em className="text-secondary">Everything you need to know!</em></>}
      intro={N.preArrivalLead}
      image={{ src: '/images/international/new-to-australia.webp', alt: 'Students planning their move to Australia' }}
      actions={<><Link href="/courses/" className={heroBtn(true)}>Find Your Perfect Course<ArrowRight aria-hidden className="size-4" /></Link><a href={INTERNATIONAL_HANDBOOK} target="_blank" rel="noopener" className={heroBtn()}>International Student Handbook</a></>}
    >
      <nav aria-label="On this page" className="sticky top-16 z-20 border-b border-border bg-background/90 backdrop-blur md:top-20">
        <ul className="mx-auto flex max-w-site gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] md:px-8">{NAV.map(([id, l]) => <li key={id} className="shrink-0"><a href={`#${id}`} className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary-strong">{l}</a></li>)}</ul>
      </nav>

      <Section anchorId="pre-arrival">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Lead eyebrow="Pre-Arrival Information" title={<>A natural <em className="text-primary-strong">wonderland</em></>}><p>{N.preArrivalBody}</p></Lead>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {N.states.map(([name, abbr, note]) => <li key={abbr} className="rounded-2xl border border-border bg-card p-4"><span className="display block text-3xl text-primary-strong">{abbr}</span><span className="text-sm font-semibold">{name}</span>{note && <span className="block text-xs text-muted-foreground">{note}</span>}</li>)}
          </ul>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {N.facts.map((f, i) => { const Icon = FACT_ICONS[i]; return (
            <li key={f.title} className="rounded-card border border-border bg-card p-5"><span className="bg-brand-gradient grid size-11 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-5" /></span><h3 className="display mt-4 text-xl">{f.title}</h3><div className="mt-2 space-y-2 text-sm text-muted-foreground">{f.body.map((b) => <p key={b.slice(0, 30)}>{b}</p>)}</div></li>
          ) })}
        </ul>
        <p className="display mt-10 text-center text-2xl md:text-3xl"><Sparkles aria-hidden className="mr-2 inline size-6 text-secondary" />{N.welcome}</p>
      </Section>

      <Section tone="muted" anchorId="why-australia">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div><Lead eyebrow="Study in Australia" title="Why Australia?" /><div className="space-y-4 text-[17px] leading-relaxed">{N.why.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div></div>
          <div className="space-y-5">
            <div className="rounded-card bg-ink p-6 text-ink-foreground"><GraduationCap aria-hidden className="size-7 text-secondary" /><h3 className="display mt-3 text-2xl">World Class Education</h3><p className="mt-2 text-ink-foreground/80">{N.education}</p></div>
            <div className="rounded-card border border-border bg-card p-6"><h3 className="display text-2xl">Facts and Figures</h3><p className="mt-1 mb-4 text-sm text-muted-foreground">Did you know…?</p><Ticks items={N.figures} /></div>
          </div>
        </div>
      </Section>

      <Section anchorId="life">
        <Lead eyebrow="Life in Australia" title={<>Living <em className="text-primary-strong">costs</em> and cities</>}><p>{N.livingCost}</p><p>{N.livingVaries}</p></Lead>
        <div className="mb-10 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
          <p className="bg-brand-gradient rounded-card px-8 py-6 text-center"><span className="display block text-5xl">$29,710</span><span className="text-sm font-semibold">AUD per person per year (living expenses)</span></p>
          <p className="text-sm text-muted-foreground">{N.costs.body} <a href={N.costs.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-strong underline">Living and education costs in Australia</a></p>
        </div>
        <div className="grid gap-6">
          {N.cities.map((c, i) => (
            <article key={c.city} id={`living-in-${c.city.toLowerCase()}`} className="grid scroll-mt-32 overflow-hidden rounded-card border border-border bg-card lg:grid-cols-[0.9fr_1.1fr]">
              <div className={`relative min-h-60 ${i % 2 ? 'lg:order-2' : ''}`}><Image src={c.image} alt={`${c.city} skyline`} fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" /><span className="display absolute bottom-4 left-4 rounded-full bg-card/95 px-4 py-1.5 text-xl">Living in {c.city}</span></div>
              <div className="p-6 md:p-8">
                <p className="text-[15px]">{c.intro}</p>
                {'extra' in c && c.extra && <div className="mt-4"><h3 className="font-semibold">{c.extra.title}</h3><div className="mt-1 space-y-1 text-sm text-muted-foreground">{c.extra.body.map((b) => <p key={b.slice(0, 30)}>{b}</p>)}</div></div>}
                <div className="mt-4 rounded-2xl bg-sand/60 p-4"><h3 className="flex items-center gap-2 font-semibold"><CloudSun aria-hidden className="size-4 text-primary-strong" />Weather and Seasons</h3><div className="mt-1 space-y-1 text-sm">{c.weather.map((w) => <p key={w.slice(0, 30)}>{w}</p>)}</div><a href={c.weatherMore} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary-strong">Read more<ArrowUpRight aria-hidden className="size-4" /></a></div>
                <a href={c.more.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary-strong">{c.more.label}<ArrowUpRight aria-hidden className="size-4" /></a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted" anchorId="working">
        <div className="grid gap-10 lg:grid-cols-2">
          <div><Lead eyebrow="Work rights" title="Working in Australia?">{N.working.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</Lead><a href={N.workingHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-primary-strong">Visa and work information<ArrowUpRight aria-hidden className="size-4" /></a></div>
          <div className="rounded-card bg-ink p-6 text-ink-foreground md:p-8">
            <Scale aria-hidden className="size-7 text-secondary" />
            <h3 className="display mt-3 text-2xl">The Fair Work Ombudsman</h3>
            <p className="mt-2 text-sm text-ink-foreground/80">{N.fairWork.intro}</p>
            <div className="mt-3"><Ticks items={N.fairWork.aims} onDark /></div>
            <p className="mt-5 text-sm text-ink-foreground/80">{N.fairWork.statement}</p>
            <ul className="mt-3 flex flex-wrap gap-2">{N.fairWork.topics.map((t) => <li key={t} className="rounded-full bg-ink-foreground/10 px-3 py-1 text-xs">{t}</li>)}</ul>
            <a href={N.fairWork.statementHref} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"><FileText aria-hidden className="size-4" />Download the Fair Work Information Statement</a>
          </div>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {N.entitlements.map((e) => <li key={e.title} className="rounded-card border border-border bg-card p-6"><Briefcase aria-hidden className="size-6 text-primary-strong" /><h3 className="display mt-3 text-xl">{e.title}</h3><p className="mt-2 text-sm text-muted-foreground">{e.body}</p>{e.href && <a href={e.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-strong">Know more<ArrowUpRight aria-hidden className="size-4" /></a>}</li>)}
        </ul>
      </Section>

      <Section anchorId="after-graduation">
        <div className="grid gap-10 lg:grid-cols-2">
          <div><Lead eyebrow="Your next step" title="After Graduation"><p>{N.afterGraduation.intro}</p></Lead><Ticks items={N.afterGraduation.options} /><p className="mt-5 text-muted-foreground">{N.afterGraduation.visa} <a href={N.afterGraduation.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-strong underline">Department of Home Affairs</a></p></div>
          <div id="visas" className="grid scroll-mt-32 gap-4">
            {[{ icon: BookOpen, title: 'Student Visa Options', body: N.visaOptions.body, href: N.visaOptions.href }, { icon: ShieldCheck, title: 'International Student Visa Conditions', body: N.visaConditions.body, href: N.visaConditions.href }].map(({ icon: Icon, title, body, href }) => (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer" className="group/v rounded-card border border-border bg-card p-6 transition-colors hover:border-primary"><Icon aria-hidden className="size-6 text-primary-strong" /><h3 className="display mt-3 text-xl">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{body}</p><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-strong">Read more<ArrowUpRight aria-hidden className="size-4" /></span></a>
            ))}
            <div className="rounded-card bg-sunrise-glow p-6">
              <BadgeCheck aria-hidden className="size-6" />
              <h3 className="display mt-3 text-xl">CRICOS: What does it mean to be a CRICOS provider?</h3>
              <div className="mt-2 space-y-2 text-sm">{N.cricos.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}<p>{N.cricosProvider.text}</p></div>
              <div className="mt-4 flex flex-wrap gap-3"><a href={N.cricosProvider.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold underline">National Code 2018<ArrowUpRight aria-hidden className="size-4" /></a><a href={INTERNATIONAL_HANDBOOK} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sm font-semibold underline">International Student Handbook</a></div>
            </div>
          </div>
        </div>
      </Section>
    </IntlShell>
  )
}
