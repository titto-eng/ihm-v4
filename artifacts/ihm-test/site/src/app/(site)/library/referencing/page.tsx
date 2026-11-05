// /library/referencing/ — WordPress page 396: APA@IHM referencing guide and the referencing video tutorials.
import type { Metadata } from 'next'
import { Download, FileText, Quote } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { LibraryShell } from '@/components/library/LibraryShell'
import { VideoGallery } from '@/components/media/VideoGallery.client'
import { REFERENCING_VIDEOS } from '@/content/library'

export const metadata: Metadata = pageMetadata({
  title: 'Referencing',
  path: '/library/referencing/',
  metaTitle: 'APA 7th Referencing Guide for IHM Students | In-text Citations and Reference Lists',
  description: 'APA@IHM: a guide to referencing and formatting in the APA 7th style for IHM students, with in-text citation and end-text reference rules, a downloadable guide and video tutorials.',
})

export default function ReferencingRoute() {
  return (
    <LibraryShell path="/library/referencing/" eyebrow="Library · Referencing" title={<>Referencing</>} intro="APA@IHM: A Guide to Referencing and Formatting in the APA Style for IHM Students.">
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 text-[17px] leading-relaxed">
            <Eyebrow>APA@IHM</Eyebrow>
            <h2 className="display text-display-md">Why we reference</h2>
            <p>Referencing is a set of rules for acknowledging the sources you have used to create an idea, or to build or share knowledge. It strengthens your work by supporting your points, ideas or arguments, and shows how you engage critically with sources in your academic writing.</p>
            <p>Referencing also avoids plagiarism and demonstrates to readers that you have done your research and found valid supporting evidence for your ideas. Whether your source is a book, journal, website, facts, image, statistics, diagram, data, words, ideas, podcast, video or any other source, you need to reference all sources that you use in your writing. All sources used in your academic work must be acknowledged by referencing.</p>
            <p>All higher education courses at the Institute of Health &amp; Management require the use of the <strong>APA 7th</strong> referencing and formatting style when submitting written assignments.</p>
          </div>
          <div className="space-y-4">
            <p className="label-mono text-[11px] text-muted-foreground">APA consists of two parts</p>
            {[
              { icon: Quote, t: 'In-text citation', b: 'A short reference (Author, Date) included within the text of your assignment.', ex: 'e.g. (Crisp et al., 2020)' },
              { icon: FileText, t: 'End-text reference', b: 'The full citation details of each reference used in the text of your assignment, in alphabetical order.', ex: 'e.g. Crisp, J., Douglas, C., Rebeiro, G., & Waters, D. (2020). Potter and Perry’s fundamentals of nursing (6th ed.). Elsevier.' },
            ].map(({ icon: Icon, t, b, ex }) => (
              <div key={t} className="rounded-card border border-border bg-card p-6">
                <p className="flex items-center gap-2 font-semibold"><Icon aria-hidden className="size-5 text-primary-strong" />{t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{b}</p>
                <p className="mt-3 rounded-xl bg-sand/70 px-3 py-2 font-mono text-xs">{ex}</p>
              </div>
            ))}
            <a href="/pdf/APA_Referencing_Guide.pdf" target="_blank" rel="noopener" className="flex items-center gap-4 rounded-card bg-ink p-5 text-ink-foreground transition-transform hover:-translate-y-1">
              <span className="bg-brand-gradient grid size-12 shrink-0 place-items-center rounded-xl text-foreground"><Download aria-hidden className="size-5" /></span>
              <span><span className="display block text-xl">Download the APA@IHM guide</span><span className="text-sm text-ink-foreground/70">PDF</span></span>
            </a>
          </div>
        </div>
      </Section>
      <Section tone="muted" anchorId="digital-resources">
        <Eyebrow>Watch and learn</Eyebrow>
        <h2 className="display text-display-md mb-10">Digital Resources</h2>
        <VideoGallery videos={REFERENCING_VIDEOS} />
      </Section>
    </LibraryShell>
  )
}
