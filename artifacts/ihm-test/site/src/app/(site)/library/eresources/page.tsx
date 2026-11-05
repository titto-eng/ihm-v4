// /library/eresources/ — WordPress page 409: `?course=<id>` lists that course's core units and readings (the old
// [LibraryCourseResources], from src/content/library-guides.ts); without a course it offers the guides to choose from.
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { LibraryShell } from '@/components/library/LibraryShell'
import { UnitReadings } from '@/components/library/UnitReadings.client'
import { LIBRARY_GUIDES } from '@/content/library-guides'
import { cn } from '@/lib/cn'

export const metadata: Metadata = pageMetadata({
  title: 'eResources',
  path: '/library/eresources/',
  metaTitle: 'e-Resources by Course | Core Unit Readings | IHM Library',
  description: 'Core unit reading lists and e-resources for IHM nursing and social work courses, with links to each book and article in the library catalogue.',
})

type Search = Promise<Record<string, string | string[] | undefined>>

export default async function EresourcesRoute({ searchParams }: { searchParams: Search }) {
  const { course } = await searchParams
  const guide = LIBRARY_GUIDES.find((g) => String(g.id) === course)
  return (
    <LibraryShell
      path="/library/eresources/"
      image="/images/library/banner.webp"
      eyebrow="Library · e-Resources"
      title={guide ? <>e-Resources: <em className="text-secondary">{guide.name}</em></> : 'e-Resources'}
      intro={guide ? `${guide.school} · ${guide.units.length} core units. Open a unit to see its recommended readings in the catalogue.` : 'Choose a course to see the recommended readings for each of its core units.'}
    >
      <Section>
        <nav aria-label="Courses" className="mb-10 flex flex-wrap gap-2">
          {LIBRARY_GUIDES.map((g) => (
            <Link key={g.id} href={`/library/eresources/?course=${g.id}`} aria-current={g === guide ? 'page' : undefined} className={cn('rounded-full px-4 py-2 text-sm font-semibold', g === guide ? 'bg-ink text-ink-foreground' : 'border border-border bg-card hover:border-primary')}>{g.name}</Link>
          ))}
        </nav>
        {guide ? (
          <>
            <Eyebrow>Core Units</Eyebrow>
            <h2 className="display text-display-md mb-8">Readings by unit</h2>
            <UnitReadings key={guide.id} units={guide.units} />
          </>
        ) : (
          <Link href="/library/bibliography/" className="inline-flex items-center gap-1.5 font-semibold text-primary-strong">Browse the library guides<ArrowRight aria-hidden className="size-4" /></Link>
        )}
      </Section>
    </LibraryShell>
  )
}
