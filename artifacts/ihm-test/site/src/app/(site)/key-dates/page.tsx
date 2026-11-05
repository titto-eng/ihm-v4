// /key-dates/ — WordPress page "Key Dates": intake dates for 2024–2026 (year tabs keep the old #nav-<year> anchors) and the
// 2026 courses-by-campus table. Data in src/content/key-dates.ts.
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { AdmissionsShell } from '@/components/admissions/parts'
import { KeyDatesTabs } from '@/components/admissions/KeyDatesTabs.client'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { KEY_DATES, KEY_DATES_LEGEND } from '@/content/key-dates'

export const metadata: Metadata = pageMetadata({
  title: 'Key Dates',
  path: '/key-dates/',
  metaTitle: 'Key Dates 2026 | Intakes, Census Dates and Semester Breaks | IHM',
  description: 'IHM academic calendar: orientation weeks, theory start and end dates, enrolment end and census dates, breaks and semester outcome dates for every intake, plus 2026 courses by campus.',
})

export default function KeyDatesRoute() {
  const campus = KEY_DATES.find((y) => y.campus)
  return (
    <AdmissionsShell
      path="/key-dates/"
      image={{ src: '/images/campuses/mel-2.webp', alt: 'Students on the IHM Melbourne campus' }}
      title={<>Key <em className="text-secondary">dates</em></>}
      intro="Orientation, theory start and end dates, enrolment end and census dates, breaks and semester outcome dates for every intake."
      actions={<><Link href="/course-calendar/" className={heroBtn(true)}>Course calendar<ArrowRight aria-hidden className="size-4" /></Link><Link href="/monthly-calendar/" className={heroBtn()}>Monthly calendar</Link></>}
    >
      <Section>
        <Lead eyebrow="Academic calendar" title="Intake schedule" />
        <KeyDatesTabs years={KEY_DATES} />
      </Section>
      {campus?.campus && (
        <Section tone="muted" anchorId="intakes-by-campus">
          <Lead eyebrow={campus.year} title="Course intakes by campus" />
          <div className="overflow-x-auto rounded-card border border-border bg-card">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">Course availability by intake month and campus, {campus.year}</caption>
              <thead className="bg-ink text-ink-foreground"><tr>{campus.campus[0].map((h) => <th key={h} scope="col" className="p-3.5 font-semibold">{h}</th>)}</tr></thead>
              <tbody>{campus.campus.slice(1).map((r) => <tr key={r[0]} className="border-t border-border even:bg-muted/40">{r.map((c, j) => j === 0 ? <th key={j} scope="row" className="p-3.5 font-semibold">{c}</th> : <td key={j} className="p-3.5">{c === '—' ? <span className="text-muted-foreground">—</span> : <span className="flex flex-wrap gap-1">{c.split(/\s+/).map((t) => <span key={t} className="rounded-full bg-blush px-2.5 py-0.5 text-xs font-semibold">{t}</span>)}</span>}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <dl className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {KEY_DATES_LEGEND.map(([k, v]) => <div key={k} className="flex gap-3 text-sm"><dt className="font-bold text-primary-strong">{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </Section>
      )}
    </AdmissionsShell>
  )
}
