// /advice-for-international-students/ — WordPress page 5917: student visa conditions, work limits, course requirements, OSHC,
// contact detail updates and transfers. The old tabs are sections here.
import type { Metadata } from 'next'
import { CalendarClock, ClipboardCheck, FileText, HeartPulse, MapPinned, ShieldCheck } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { DocLinks, IntlShell } from '@/components/international/parts'
import { Lead, Ticks, heroBtn } from '@/components/student-support/parts'
import { legacyImage } from '@/lib/legacy-image'
import { TRANSFER, VISA_ADVICE } from '@/content/international'

export const metadata: Metadata = pageMetadata({
  title: 'Advice for International Students',
  path: '/advice-for-international-students/',
  metaTitle: 'Advice for International Students | Visa Conditions, Work Limits, OSHC and Course Progress | IHM',
  description: 'Student visa conditions for IHM international students: your CoE, VEVO, working up to 48 hours per fortnight, course progress, Overseas Student Health Cover, updating contact details within 7 days and transfers.',
})

const ICONS = [ShieldCheck, FileText, CalendarClock, ClipboardCheck, HeartPulse, MapPinned]

export default function AdviceRoute() {
  const img = legacyImage('/images/international/student-advice.webp', '')
  return (
    <IntlShell
      path="/advice-for-international-students/"
      title={<>Advice for <em className="text-secondary">International Students</em></>}
      intro="Understand your student visa conditions and what IHM must report, so your studies in Australia run smoothly."
      image={img ? { src: img, alt: 'International students at IHM' } : undefined}
      actions={<a href="#work" className={heroBtn(true)}>48 hours per fortnight: work limits</a>}
    >
      <Section>
        <Lead eyebrow="International Student Information" title="Your visa, your responsibilities" />
        <nav aria-label="Topics" className="mb-8 flex flex-wrap gap-2">{VISA_ADVICE.map((v) => <a key={v.id} href={`#${v.id}`} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary-strong">{v.title}</a>)}</nav>
        <div className="grid gap-5 md:grid-cols-2">
          {VISA_ADVICE.map((v, i) => { const Icon = ICONS[i]; return (
            <article key={v.id} id={v.id} className={`scroll-mt-32 rounded-card p-6 md:p-7 ${v.id === 'work' ? 'bg-ink text-ink-foreground' : 'border border-border bg-card'}`}>
              <span className="bg-brand-gradient grid size-11 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-5" /></span>
              <h2 className="display mt-4 text-2xl">{v.title}</h2>
              {v.id === 'work' && <p className="display mt-3 text-5xl text-secondary">48 hrs <span className="text-xl text-ink-foreground/80">per fortnight</span></p>}
              <div className={`mt-3 space-y-3 text-[15px] ${v.id === 'work' ? 'text-ink-foreground/80' : 'text-muted-foreground'}`}>{v.body.map((b) => <p key={b.slice(0, 30)}>{b}</p>)}</div>
              {'list' in v && v.list && <div className="mt-3"><Ticks items={v.list} /></div>}
              {'after' in v && v.after && <p className="mt-3 rounded-2xl bg-blush p-3 text-sm">{v.after}</p>}
              {'links' in v && v.links && <div className="mt-4"><DocLinks items={v.links} /></div>}
            </article>
          ) })}
        </div>
      </Section>
      <Section tone="muted" anchorId="transfer">
        <div className="grid gap-8 rounded-card bg-card p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div><h2 className="display text-3xl">Transfers and release requests</h2><p className="mt-3 text-[15px]">{TRANSFER.body}</p><p className="mt-3 text-xs text-muted-foreground">{TRANSFER.note}</p></div>
          <DocLinks items={TRANSFER.links} />
        </div>
      </Section>
    </IntlShell>
  )
}
