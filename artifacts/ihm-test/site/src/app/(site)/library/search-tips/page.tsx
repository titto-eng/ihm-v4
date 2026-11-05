// /library/search-tips/ — WordPress page 401: improve your catalogue searches (combination words, omitting, grouping, wildcards).
import type { Metadata } from 'next'
import { Lightbulb } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { LibraryShell } from '@/components/library/LibraryShell'
import { SEARCH_TIPS } from '@/content/library'

export const metadata: Metadata = pageMetadata({
  title: 'Search Tips',
  path: '/library/search-tips/',
  metaTitle: 'Library Search Tips | AND, OR, NOT, Grouping and Wildcards | IHM Library',
  description: 'Improve your library searches: combine keywords with AND, OR and NOT, exclude words, group terms with parentheses and use wildcards such as Nurs* in IHM LibrarySearch.',
})

export default function SearchTipsRoute() {
  return (
    <LibraryShell path="/library/search-tips/" image="/images/library/search-tips.webp" eyebrow="Library · Search tips" title={<>Improve your <em className="text-secondary">searches</em></>} intro="Refine your search if you find too many or not enough results. Try the examples in the search box above.">
      <Section>
        <Eyebrow>Search tips</Eyebrow>
        <h2 className="display text-display-md mb-10">Four ways to sharpen a search</h2>
        <ol className="grid gap-5 md:grid-cols-2">
          {SEARCH_TIPS.map((t, i) => (
            <li key={t.title} className="flex flex-col rounded-card border border-border bg-card p-6 md:p-7">
              <div className="flex items-center gap-3"><span className="display text-4xl text-primary/70">{String(i + 1).padStart(2, '0')}</span><h3 className="display text-2xl">{t.title}</h3></div>
              <div className="mt-3 flex-1 space-y-2 text-[15px]">{t.body.map((b) => <p key={b}>{b}</p>)}</div>
              <p className="mt-4 rounded-xl bg-ink px-4 py-3 font-mono text-sm text-secondary">{t.example}</p>
              {t.tip && <p className="mt-3 flex gap-2 rounded-xl bg-sand/70 p-3 text-sm"><Lightbulb aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-strong" /><span><strong>Tip:</strong> {t.tip}</span></p>}
            </li>
          ))}
        </ol>
      </Section>
    </LibraryShell>
  )
}
