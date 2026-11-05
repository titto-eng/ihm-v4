// /library-guide-bsw/ — WordPress page 8215: the Social Work Library Guide. Content in src/content/library-bsw.ts. The old page
// hid each part behind a tab; here every part is a section on the page (anchors below), so all of it is crawlable.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, BookOpen, ChevronDown, Database, GraduationCap, Library, Mail, PenLine, ShieldCheck } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { LibraryShell } from '@/components/library/LibraryShell'
import { legacyImage } from '@/lib/legacy-image'
import { siteOrigin } from '@/lib/seo/metadata'
import { BSW_ASK_LIBRARIAN, BSW_GUIDE as G, type GuideLink } from '@/content/library-bsw'

export const metadata: Metadata = pageMetadata({
  title: 'Library Guide – BSW',
  path: '/library-guide-bsw/',
  metaTitle: 'Social Work Library Guide | Databases, eBooks and Journals for BSW Students | IHM',
  description: 'The IHM Social Work Library Guide: key social work databases, recommended eBooks, journals by field, referencing and writing help, academic integrity and GenAI guidance, and IHM Library services.',
})

const PARTS = [
  { id: 'databases', label: 'Social Work Databases', icon: Database },
  { id: 'ebooks', label: 'Social Work eBooks', icon: BookOpen },
  { id: 'journals', label: 'Relevant Social Work Journals', icon: Library },
  { id: 'writing', label: 'Referencing and Writing Help', icon: PenLine },
  { id: 'integrity', label: 'Academic Integrity and GenAI', icon: ShieldCheck },
  { id: 'ihm-library', label: 'IHM Library', icon: GraduationCap },
]

const local = (u: string) => u.startsWith('/')

function LinkCards({ items, notes = {} }: { items: GuideLink[]; notes?: Record<string, string> }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((i) => {
        const cls = 'group/l flex h-full flex-col rounded-card border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_18px_40px_-30px_hsl(5_60%_30%/0.5)]'
        const inner = (
          <>
            <span className="flex items-start justify-between gap-3 font-semibold group-hover/l:text-primary-strong">{i.name}<ArrowUpRight aria-hidden className="mt-0.5 size-4 shrink-0" /></span>
            {i.body && <span className="mt-2 text-sm text-muted-foreground">{i.body}</span>}
            {notes[i.name] && <span className="mt-3 self-start rounded-full bg-sand px-3 py-1 text-xs font-semibold">{notes[i.name]}</span>}
          </>
        )
        return <li key={i.name}>{local(i.url) ? <Link href={i.url} className={cls}>{inner}</Link> : <a href={i.url} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>}</li>
      })}
    </ul>
  )
}

function Head({ id, eyebrow, title, intro }: { id: string; eyebrow: string; title: string; intro?: string }) {
  const Icon = PARTS.find((p) => p.id === id)!.icon
  return (
    <div className="mb-8 flex items-start gap-4">
      <span className="bg-brand-gradient grid size-12 shrink-0 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-5" /></span>
      <div><Eyebrow className="mb-2">{eyebrow}</Eyebrow><h2 className="display text-display-md">{title}</h2>{intro && <p className="mt-3 max-w-3xl text-muted-foreground">{intro}</p>}</div>
    </div>
  )
}

export default function LibraryGuideBswRoute() {
  const origin = siteOrigin()
  const books = G.books.map((b) => ({ ...b, src: legacyImage(b.cover, '') }))
  return (
    <LibraryShell path="/library-guide-bsw/" eyebrow="Library · School of Social Work" title={<>Social Work <em className="text-secondary">Library Guide</em></>} intro="Databases, eBooks, journals and writing support for Bachelor of Social Work students, in one place.">
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'ItemList', name: 'Recommended social work eBooks', url: `${origin}/library-guide-bsw/#ebooks`,
        itemListElement: G.books.map((b, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Book', name: b.title, author: b.author, datePublished: b.year, url: b.url } })),
      }} />
      <nav aria-label="On this page" className="sticky top-16 z-20 border-b border-border bg-background/90 backdrop-blur md:top-20">
        <ul className="mx-auto flex max-w-site gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] md:px-8">
          {PARTS.map(({ id, label, icon: Icon }) => <li key={id} className="shrink-0"><a href={`#${id}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary-strong"><Icon aria-hidden className="size-4" />{label}</a></li>)}
        </ul>
      </nav>

      <Section anchorId="databases">
        <Head id="databases" eyebrow="Search the research" title="Social Work Databases" />
        <div className="space-y-10">
          {G.databases.map((g) => <div key={g.title}><h3 className="display mb-4 text-2xl">{g.title}</h3><LinkCards items={g.items} /></div>)}
        </div>
      </Section>

      <Section tone="muted" anchorId="ebooks">
        <Head id="ebooks" eyebrow="Recommended reading" title="Social Work eBooks" intro={`${G.books.length} titles chosen for the Bachelor of Social Work. Open a book to read it in the library catalogue.`} />
        <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {books.map((b, i) => (
            <li key={`${b.url}-${i}`}>
              <a href={b.url} target="_blank" rel="noopener noreferrer" className="group/b block">
                <span className="relative block aspect-[2/3] overflow-hidden rounded-xl bg-ink shadow-[0_18px_34px_-18px_hsl(348_35%_13%/0.6)] transition-transform duration-300 group-hover/b:-translate-y-1.5 group-hover/b:rotate-[-1deg]">
                  {b.src ? <Image src={b.src} alt={`Cover of ${b.title}`} fill sizes="(min-width: 1024px) 17vw, (min-width: 640px) 30vw, 45vw" className="object-cover" /> : (
                    <span className={`flex size-full flex-col justify-between p-4 text-ink-foreground ${i % 3 === 0 ? 'bg-brand-gradient text-foreground' : i % 3 === 1 ? 'bg-ink' : 'bg-[#6d2e46]'}`}>
                      <span className="label-mono text-[9px] opacity-80">{b.year}</span>
                      <span className="display line-clamp-6 text-lg leading-snug">{b.title}</span>
                      <span className="line-clamp-2 text-[11px] opacity-80">{b.author}</span>
                    </span>
                  )}
                  <span aria-hidden className="absolute inset-y-0 left-0 w-2 bg-black/20" />
                </span>
                <span className="mt-3 line-clamp-3 block text-sm font-semibold leading-snug group-hover/b:text-primary-strong">{b.title}</span>
                <span className="mt-1 line-clamp-2 block text-xs text-muted-foreground">{b.author}{b.year && ` · ${b.year}`}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section anchorId="journals">
        <Head id="journals" eyebrow="Peer-reviewed literature" title="Relevant Social Work Journals" intro={G.journalsIntro} />
        <div className="grid gap-3">
          {G.journals.map((g, n) => (
            <details key={g.title} open={n === 0} className="group/d overflow-hidden rounded-card border border-border bg-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                <span className="display text-xl">{g.title}</span>
                <span className="flex items-center gap-3 text-sm text-muted-foreground">{g.items.length} journals<ChevronDown aria-hidden className="size-5 transition-transform group-open/d:rotate-180" /></span>
              </summary>
              <ul className="grid gap-x-6 gap-y-1 border-t border-border p-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((j, i) => (
                  <li key={`${j.name}-${i}`} className="text-sm">
                    {j.url ? <a href={j.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-1.5 rounded-lg px-2 py-1.5 hover:bg-blush hover:text-primary-strong"><ArrowUpRight aria-hidden className="mt-0.5 size-3.5 shrink-0" />{j.name}</a> : <span className="flex items-start gap-1.5 px-2 py-1.5 text-muted-foreground"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />{j.name}</span>}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
        <p className="mt-5 rounded-2xl bg-sand/70 p-4 text-sm">{G.journalsNote}</p>
      </Section>

      <Section tone="muted" anchorId="writing">
        <Head id="writing" eyebrow="Write and cite well" title="Referencing and Writing Help" />
        <LinkCards items={G.writing} notes={G.writingNotes} />
        <p className="mt-5 text-sm">For assistance with EndNote installation, please <a href={BSW_ASK_LIBRARIAN} className="font-semibold text-primary-strong underline underline-offset-4">ask a librarian</a>.</p>
      </Section>

      <Section anchorId="integrity">
        <Head id="integrity" eyebrow="Honest, fair, responsible" title="Academic Integrity and GenAI" />
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4 text-[17px] leading-relaxed">
            <p>{G.integrityIntro[0]}</p>
            <p className="bg-brand-gradient rounded-2xl p-5 font-semibold text-foreground">{G.integrityWhy}</p>
            <p>{G.integrityIntro[1]}</p>
            <p className="text-muted-foreground">{G.integrityMore[0]}</p>
          </div>
          <div><LinkCards items={G.integrity} /><p className="mt-4 text-sm text-muted-foreground">{G.integrityMore[1]}</p></div>
        </div>
      </Section>

      <Section tone="muted" anchorId="ihm-library">
        <Head id="ihm-library" eyebrow="Your library" title="IHM Library" />
        <LinkCards items={G.library} />
        <div className="mt-6 flex flex-col gap-4 rounded-card bg-ink p-6 text-ink-foreground md:flex-row md:items-center md:p-8">
          <p className="flex-1 text-ink-foreground/85">{G.librarian}</p>
          <a href={BSW_ASK_LIBRARIAN} className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-primary px-6 py-3 font-semibold text-foreground hover:bg-secondary md:self-center"><Mail aria-hidden className="size-4" />Ask a librarian</a>
        </div>
      </Section>
    </LibraryShell>
  )
}
