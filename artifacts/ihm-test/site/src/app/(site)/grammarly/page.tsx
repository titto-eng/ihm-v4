// /grammarly/ — WordPress page 3076: Grammarly for IHM students.
import type { Metadata } from 'next'
import { ArrowUpRight, BookText, CheckCheck, ScanSearch, UserCheck } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { LibraryShell } from '@/components/library/LibraryShell'

export const metadata: Metadata = pageMetadata({
  title: 'Grammarly',
  path: '/grammarly/',
  metaTitle: 'Grammarly for IHM Students | Grammar, Plagiarism Checker and Writing Support',
  description: 'Grammarly at IHM: grammar, spelling and punctuation checks with explanations, a plagiarism checker against 16 million web pages and academic databases, human proof-reading and the writing handbook.',
})

const FEATURES = [
  { icon: ScanSearch, title: 'Plagiarism Checker', body: 'This programme runs and compares your material against academic databases and over 16 million online pages to ensure that it is 100% original.' },
  { icon: UserCheck, title: 'Human Proof-reader', body: 'If you are still not confident with what you have written even after editing and proofreading it using Grammarly’s tools, human intervention is your last resort. In situations such as these, Grammarly’s professional proof-readers are always willing to help check your work.' },
  { icon: BookText, title: 'The Handbook', body: 'Grammarly’s handbook brings us back to the basics of sentence constructions and ushers us forward to more complex elements and mechanics of composition. This feature is accessible to all users and can be used as a reference.' },
]

export default function GrammarlyRoute() {
  return (
    <LibraryShell path="/grammarly/" eyebrow="Library · Writing tools" title="Grammarly" intro="A digital writing tool that offers grammar and spell checking, plagiarism detection, and writing clarity, concision, vocabulary, style, and tone suggestions." image="/images/library/grammarly.webp">
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-4 text-[17px] leading-relaxed">
            <Eyebrow>Write with confidence</Eyebrow>
            <h2 className="display text-display-md">Learn from every correction</h2>
            <p>Grammarly is a digital writing tool that offers grammar and spell checking, plagiarism detection, and writing clarity, concision, vocabulary, style, and tone suggestions.</p>
            <p>Grammarly assists students in identifying and correcting errors in their written work, as well as avoiding unintended plagiarism. By requiring students to check their work in Grammarly before submitting it, instructors may concentrate on higher-level issues such as critical thinking, creativity, and evidence of learning.</p>
            <p>From grammar and spelling to style and tone, Grammarly’s suggestions are comprehensive, helping you communicate effectively and as you intend.</p>
            <p>Spelling, grammar, and punctuation checks are what you probably know Grammarly for. But when you use Grammarly, we don’t just help you figure out where the comma goes, we tell you why. Reading the details of the correctness alerts in the Grammarly Editor can help you learn more from your mistakes.</p>
          </div>
          <div className="rounded-card bg-ink p-7 text-ink-foreground lg:sticky lg:top-28">
            <CheckCheck aria-hidden className="size-8 text-secondary" />
            <p className="display mt-4 text-2xl">Students can start using Grammarly for their assessments, a click away.</p>
            <a href="https://www.grammarly.com" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-foreground hover:bg-secondary">Open Grammarly<ArrowUpRight aria-hidden className="size-4" /></a>
            <p className="mt-3 text-sm text-ink-foreground/70">www.grammarly.com</p>
          </div>
        </div>
      </Section>
      <Section tone="muted">
        <Eyebrow>Beyond grammar</Eyebrow>
        <h2 className="display text-display-md">Our additional key features</h2>
        <p className="mt-3 max-w-3xl text-muted-foreground">While these are not Grammarly&apos;s core grammar-checking features, it is crucial to note that Grammarly offers the following tools that can be useful:</p>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-card border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1">
              <span className="bg-brand-gradient grid size-12 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-5" /></span>
              <h3 className="display mt-5 text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
      </Section>
    </LibraryShell>
  )
}
