// /english-language-proficiency-entry-requirements/ — WordPress page 4862: English language entry requirements and waivers.
// Scores, countries and exclusion tables are verbatim (src/content/international.ts, ENGLISH).
import type { Metadata } from 'next'
import { ArrowUpRight, Check, Globe2, GraduationCap, School, Briefcase } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { IntlShell } from '@/components/international/parts'
import { Lead, Ticks, heroBtn } from '@/components/student-support/parts'
import { ENGLISH as E } from '@/content/international'

export const metadata: Metadata = pageMetadata({
  title: 'English Language Proficiency Entry Requirements',
  path: '/english-language-proficiency-entry-requirements/',
  metaTitle: 'English Language Entry Requirements and Waivers | IELTS, PTE, OET for Nursing and Social Work | IHM',
  description: 'IHM English requirements: IELTS 6.5 (no band below 6), PTE 59, OET C+ or EAP 70% for GCAN and Master of Nursing; IELTS 7 or PTE 65 for Bachelor of Social Work; English-speaking countries and exclusions.',
})

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-card border border-border bg-card">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead className="bg-ink text-ink-foreground"><tr>{head.map((h) => <th key={h} scope="col" className="p-4 font-semibold">{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i} className="border-t border-border align-top even:bg-muted/40">{r.map((c, j) => j === 0 ? <th key={j} scope="row" className="p-4 font-semibold">{c}</th> : <td key={j} className="p-4">{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

export default function EnglishRoute() {
  return (
    <IntlShell
      path="/english-language-proficiency-entry-requirements/"
      image={{ src: '/images/international/melbourne.webp', alt: 'International students in Melbourne' }}
      title={<>English Language Entry <em className="text-secondary">Requirements and Waivers</em></>}
      intro="Check whether you need an English test, which tests IHM accepts for your course, and the exclusions that may apply to you."
      actions={<><a href="#tests" className={heroBtn(true)}>Course test scores</a><a href="#exclusions" className={heroBtn()}>Exclusions</a></>}
    >
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Lead eyebrow="No test needed?" title="Applicants from English-speaking countries"><p>{E.exemptIntro}</p></Lead>
            <Ticks items={E.exempt} />
            <div className="mt-6 rounded-card bg-sand/60 p-5"><p className="font-semibold">Applicants are required to provide the following documents as evidence to support their application:</p><div className="mt-3"><Ticks items={E.evidence} /></div></div>
          </div>
          <div className="rounded-card border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 font-semibold"><Globe2 aria-hidden className="size-5 text-primary-strong" />Recognised English-Speaking Countries</h2>
            <ul className="mt-4 flex flex-wrap gap-2">{E.countries.map((c) => <li key={c} className="rounded-full bg-muted px-3 py-1.5 text-sm">{c}</li>)}</ul>
          </div>
        </div>
      </Section>
      <Section tone="muted" anchorId="tests">
        <Lead eyebrow="Applicants from Non-English-speaking countries" title="Course Wise English Language Requirements"><p>{E.testsIntro}</p></Lead>
        <div className="grid gap-6 lg:grid-cols-2">
          {E.courses.map((c, i) => (
            <div key={c.course} className={`rounded-card p-6 md:p-8 ${i === 0 ? 'bg-ink text-ink-foreground' : 'border border-border bg-card'}`}>
              <GraduationCap aria-hidden className={`size-7 ${i === 0 ? 'text-secondary' : 'text-primary-strong'}`} />
              <h3 className="display mt-3 text-2xl">{c.course}</h3>
              <dl className="mt-5 grid gap-3">{c.tests.map(([t, s]) => <div key={t} className={`rounded-2xl p-4 ${i === 0 ? 'bg-ink-foreground/5' : 'bg-muted/60'}`}><dt className="text-sm">{t}</dt><dd className={`display mt-1 text-xl ${i === 0 ? 'text-secondary' : 'text-primary-strong'}`}>{s}</dd></div>)}</dl>
              {'note' in c && c.note && <p className="mt-4 text-xs opacity-80">{c.note}</p>}
            </div>
          ))}
        </div>
      </Section>
      <Section anchorId="exclusions">
        <Lead eyebrow="General Exclusions to English Language" title="Exclusions to English language tests"><p>{E.exclusionsIntro}</p></Lead>
        <div className="mb-10 grid gap-4 md:grid-cols-[1fr_auto] md:items-start"><Ticks items={E.exclusionsEvidence} /><p className="rounded-2xl bg-blush p-4 text-sm md:max-w-sm"><strong>NOTE:</strong> {E.exclusionsNote}</p></div>
        <div className="space-y-12">
          <div id="secondary" className="scroll-mt-28">
            <h3 className="flex items-center gap-2 display text-2xl"><School aria-hidden className="size-6 text-primary-strong" />Exclusion Category (Secondary School Education)</h3>
            <p className="mt-2 mb-5 text-muted-foreground">{E.secondaryIntro}</p>
            <Table head={['Country', 'Qualification', 'Details of how the English language requirement can be satisfied']} rows={E.secondary} />
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">{E.secondaryNote.map((n) => <p key={n.slice(0, 30)}>{n}</p>)}<a href={E.pearsonHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary-strong">Find a Pearson centre<ArrowUpRight aria-hidden className="size-4" /></a></div>
          </div>
          <div id="tertiary" className="scroll-mt-28">
            <h3 className="flex items-center gap-2 display text-2xl"><GraduationCap aria-hidden className="size-6 text-primary-strong" />Exclusion Category (Tertiary Studies)</h3>
            <p className="mt-2 mb-5 text-muted-foreground">{E.tertiaryIntro}</p>
            <Table head={['Country', 'Tertiary Course', 'Requirements', 'Criteria']} rows={E.tertiary} />
            <p className="mt-4 text-sm text-muted-foreground">{E.tertiaryNote}</p>
          </div>
          <div id="work-experience" className="scroll-mt-28 rounded-card bg-sunrise-glow p-6 md:p-8">
            <h3 className="flex items-center gap-2 display text-2xl"><Briefcase aria-hidden className="size-6" />Exclusion Category (Work Experience)</h3>
            <dl className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-card/90 p-4"><dt className="text-xs font-semibold">Work Experience (English Speaking)</dt><dd className="mt-1">{E.work.condition}</dd></div>
              <div className="rounded-2xl bg-card/90 p-4"><dt className="text-xs font-semibold">Min duration of continuous work experience in English language</dt><dd className="display mt-1 text-3xl">{E.work.duration}</dd></div>
              <div className="rounded-2xl bg-card/90 p-4"><dt className="text-xs font-semibold">Additional Notes</dt><dd className="mt-1 text-sm">{E.work.note}</dd></div>
            </dl>
          </div>
        </div>
        <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"><Check aria-hidden className="size-4 text-primary-strong" />Tests must have been completed no more than two years before your intended start date.</p>
      </Section>
    </IntlShell>
  )
}
