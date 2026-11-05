// /library/bibliography/ — WordPress page 407 ("Library Guides"): one guide per course, linking to /library/eresources/?course=<id>
// (the old ids) and, for social work, /library-guide-bsw/.
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { LibraryShell } from '@/components/library/LibraryShell'
import { LIBRARY_GUIDES } from '@/content/library-guides'

export const metadata: Metadata = pageMetadata({
  title: 'Library Guides',
  path: '/library/bibliography/',
  metaTitle: 'Library Guides by Course | Recommended Readings for Nursing and Social Work | IHM',
  description: 'IHM library guides: recommended readings and e-resources for each unit of the Graduate Certificate in Nursing, Master of Nursing, Bachelor of Nursing and Bachelor of Social Work.',
})

const GUIDES = [
  ...LIBRARY_GUIDES.filter((g) => g.id !== 4).map((g) => ({ ...g, href: `/library/eresources/?course=${g.id}` })),
  { ...LIBRARY_GUIDES.find((g) => g.id === 4)!, href: '/library-guide-bsw/' },
]

export default function BibliographyRoute() {
  return (
    <LibraryShell path="/library/bibliography/" image="/images/library/bibliography.webp" eyebrow="Library · Guides" title={<>Library <em className="text-secondary">Guides</em></>} intro="Recommended readings and e-resources for every core unit, organised by course.">
      <Section>
        <Eyebrow>Choose your course</Eyebrow>
        <h2 className="display text-display-md mb-10">Guides by course</h2>
        <ul className="grid gap-5 sm:grid-cols-2">
          {GUIDES.map((g, i) => (
            <li key={g.id}>
              <Link href={g.href} className="group/g relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                <span aria-hidden className={`absolute -top-16 -right-16 size-48 rounded-full opacity-15 ${i % 2 ? 'bg-secondary' : 'bg-primary'}`} />
                <span className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-2xl bg-ink text-secondary"><BookOpen aria-hidden className="size-5" /></span><span className="label-mono text-[10px] text-muted-foreground">IHM · {g.school}</span></span>
                <span className="display mt-5 text-2xl leading-snug">{g.name}</span>
                <span className="mt-3 flex gap-4 text-sm text-muted-foreground"><span><strong className="text-foreground">{g.units.length}</strong> core units</span><span><strong className="text-foreground">{g.units.reduce((n, u) => n + u.books.length, 0)}</strong> readings</span></span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-primary-strong">Read more<ArrowRight aria-hidden className="size-4 transition-transform group-hover/g:translate-x-1" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </LibraryShell>
  )
}
