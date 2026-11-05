// /library/assessment-guide/ — WordPress page 398: how to prepare and submit assessment, with the downloadable guide.
import type { Metadata } from 'next'
import { Download } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { LibraryShell } from '@/components/library/LibraryShell'

export const metadata: Metadata = pageMetadata({
  title: 'Assessment Guide',
  path: '/library/assessment-guide/',
  metaTitle: 'Assessment Guide for IHM Students | Essays, Literature Reviews and Reports in APA 7th',
  description: 'How to prepare and submit assessment at IHM: academic essays, discussion papers, literature reviews, appraisals, reports and reflective journals, structured and referenced in APA 7th style.',
})

const TYPES = ['Academic essays', 'Discussion papers', 'Literature review papers', 'Appraisals', 'Reports', 'Reflective journals']
const ESSAY = [['Introduction', 'Sets out the question, context and your argument.'], ['Body', 'Three to five main paragraphs, each supported by evidence.'], ['Conclusion', 'Draws the argument together and answers the question.']]
const LAB = ['Aim', 'Method', 'Results', 'Discussion', 'Conclusion']

export default function AssessmentGuideRoute() {
  return (
    <LibraryShell path="/library/assessment-guide/" image="/images/library/assessment-guide.webp" eyebrow="Library · Assessment" title="Assessment Guide" intro="How to prepare and submit assessment: A Guide for IHM Students.">
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 text-[17px] leading-relaxed">
            <Eyebrow>A Guide for IHM Students</Eyebrow>
            <h2 className="display text-display-md">How to prepare and submit assessment</h2>
            <p>The assessment guide is a major component of IHM postgraduate courses. This includes a variety of assessment forms, including academic essays, discussion papers, literature review papers, appraisals, reports, reflective journals and many others. Students are expected to learn and apply the conventions of each assessment document and apply the current APA 7th style of referencing and formatting. All your assignments must be supported by evidence and sources properly cited with the APA system.</p>
            <p>IHM assessments are designed to test your ability to synthesise into an original piece of work. The basic format of a paper or essay is an introduction, a body consisting of three to five main paragraphs and a conclusion. This format applies whether your paper is an analytical essay, an argumentative essay or a literature review. This is one of two structural patterns you will see in published papers, the other being the laboratory report format consisting of aim, method, results, discussion and conclusion. Both formats may be accompanied by an abstract at the beginning, which is a brief summary of the content.</p>
            <ul className="flex flex-wrap gap-2 pt-2">{TYPES.map((t) => <li key={t} className="rounded-full bg-blush px-3 py-1.5 text-sm font-semibold text-primary-strong">{t}</li>)}</ul>
          </div>
          <div className="space-y-5">
            <div className="rounded-card border border-border bg-card p-6">
              <p className="label-mono text-[10px] text-muted-foreground">Essay / literature review structure</p>
              <ol className="mt-4 grid gap-3">
                {ESSAY.map(([t, b], i) => <li key={t} className="flex gap-3"><span className="bg-brand-gradient grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold">{i + 1}</span><span><span className="block font-semibold">{t}</span><span className="text-sm text-muted-foreground">{b}</span></span></li>)}
              </ol>
            </div>
            <div className="rounded-card border border-border bg-card p-6">
              <p className="label-mono text-[10px] text-muted-foreground">Laboratory report structure</p>
              <ol className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold">{LAB.map((t, i) => <li key={t} className="flex items-center gap-2"><span className="rounded-full bg-muted px-3 py-1.5">{t}</span>{i < LAB.length - 1 && <span aria-hidden className="text-muted-foreground">→</span>}</li>)}</ol>
              <p className="mt-3 text-xs text-muted-foreground">Both formats may open with an abstract: a brief summary of the content.</p>
            </div>
            <a href="/pdf/Assessment_Guidelines_APA7_IHM.pdf" target="_blank" rel="noopener" className="flex items-center gap-4 rounded-card bg-ink p-5 text-ink-foreground transition-transform hover:-translate-y-1">
              <span className="bg-brand-gradient grid size-12 shrink-0 place-items-center rounded-xl text-foreground"><Download aria-hidden className="size-5" /></span>
              <span><span className="display block text-xl">Download the assessment guide</span><span className="text-sm text-ink-foreground/70">PDF · APA 7th</span></span>
            </a>
          </div>
        </div>
      </Section>
    </LibraryShell>
  )
}
