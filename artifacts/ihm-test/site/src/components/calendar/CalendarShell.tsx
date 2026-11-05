import Link from 'next/link'
import { ArrowRight, CalendarClock, Globe2, Home } from 'lucide-react'
import { EnquiryForm } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { HeroRays } from '@/blocks/hero/Component'
import { JsonLd } from '@/components/seo/JsonLd'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { PortalNotice } from '@/components/templates/PortalNotice'
import { siteOrigin } from '@/lib/seo/metadata'
import { cn } from '@/lib/cn'
import { loadCalendar } from './load'
import { MonthCalendar } from './MonthCalendar.client'

const AUDIENCES = [
  { value: null, label: 'All students', icon: CalendarClock },
  { value: 0, label: 'Domestic', icon: Home },
  { value: 1, label: 'International', icon: Globe2 },
] as const

/** /monthly-calendar/ and /course-calendar/: hero, the Domestic / International switch (`?stud_type=`), the month calendar. */
export async function CalendarShell({ path, title, intro, studentType, initial }: {
  path: string; title: string; intro: string; studentType: 0 | 1 | null; initial?: { year: number; month: number } | null
}) {
  const data = await loadCalendar(studentType)
  const origin = siteOrigin()
  const who = studentType === 0 ? 'Domestic ' : studentType === 1 ? 'International ' : ''
  return (
    <>
      {data.state === 'ok' && (
        <JsonLd data={{
          '@context': 'https://schema.org', '@type': 'ItemList', name: `${who}IHM course intakes`,
          itemListElement: data.entries.slice(0, 30).map((e, i) => ({
            '@type': 'ListItem', position: i + 1,
            item: {
              '@type': 'CourseInstance', name: e.course, startDate: e.date, courseMode: e.mode.startsWith('Online') ? 'blended' : 'onsite',
              location: { '@type': 'Place', name: `IHM ${e.campus}` }, url: `${origin}${e.path}`,
            },
          })),
        }} />
      )}
      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="cal-rays" className="-right-24 -bottom-28 -z-10 w-[28rem] opacity-[0.14]" />
        <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20">
          <Eyebrow onDark>Calendar</Eyebrow>
          <h1 className="display max-w-3xl text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.03]">{who && <span className="text-secondary">{who}</span>}{title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-foreground/80">{intro}</p>
          <nav aria-label="Student type" className="mt-8 grid grid-cols-3 gap-1 rounded-2xl bg-ink-foreground/10 p-1 sm:inline-grid sm:rounded-full">
            {AUDIENCES.map(({ value, label, icon: Icon }) => (
              <Link key={label} href={value === null ? path : `${path}?stud_type=${value}`} aria-current={studentType === value ? 'page' : undefined} scroll={false} className={cn('inline-flex items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-[13px] font-semibold transition-colors sm:rounded-full sm:px-5 sm:text-sm', studentType === value ? 'bg-primary text-foreground' : 'hover:text-secondary')}>
                <Icon aria-hidden className="hidden size-4 sm:block" />{label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <Section tone="muted" anchorId="calendar">
        {data.state === 'ok' ? <MonthCalendar key={String(studentType)} data={data} initial={initial} /> : data.state === 'empty' ? (
          <p className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">No {who.toLowerCase()}intakes are scheduled in the next 12 months yet — <Link href="#quickContact" className="font-semibold text-primary-strong underline underline-offset-4">enquire for the next intake</Link>.</p>
        ) : <PortalNotice />}
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <Link href="/key-dates/" className="inline-flex items-center gap-1.5 font-semibold text-primary-strong">Key dates and census dates<ArrowRight aria-hidden className="size-4" /></Link>
          <Link href="/how-to-apply/" className="inline-flex items-center gap-1.5 font-semibold text-primary-strong">How to apply<ArrowRight aria-hidden className="size-4" /></Link>
          <Link href="/courses/" className="inline-flex items-center gap-1.5 font-semibold text-primary-strong">All courses<ArrowRight aria-hidden className="size-4" /></Link>
        </div>
      </Section>
      <EnquiryForm formKey="quick-enquiry" heading="Ask about the next intake" variant="card" anchorId="quickContact" tone="default" />
    </>
  )
}
