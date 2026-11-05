import Link from 'next/link'
import type { ReactNode } from 'react'
import Image from '@/components/blocks/MediaImage'
import { mediaOf } from '@/components/blocks/media'
import { Section } from '@/components/layout/Section'
import { pickSize } from '@/lib/media-sizes'
import { CourseCard, type CourseCardData } from './courseCards'
import type { Lookup, StaffCard } from './data'
import { Banner, LeadHero, SectionTitle, enquireHref, type HeroProps } from './pageParts'

export function StaffGrid({ staff }: { staff: StaffCard[] }) {
  return (
    <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {staff.map((s) => {
        const photo = pickSize(mediaOf(s.photo as never), 'thumb')
        const body = (
          <>
            <div className="aspect-[4/5] overflow-hidden rounded-card bg-muted">
              {photo ? (
                <Image src={photo.url} alt={`Photo of ${s.name}`} width={photo.width} height={photo.height} sizes="(min-width: 1024px) 22vw, 45vw" className="size-full object-cover object-[50%_20%]" />
              ) : (
                <span aria-hidden className="display flex size-full items-center justify-center text-5xl text-primary-strong">{s.name.replace(/^(dr|prof|assoc|mrs|mr|ms)\.?\s+/gi, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase()}</span>
              )}
            </div>
            <p className="mt-3 font-semibold leading-snug">{s.name}</p>
            {s.position && <p className="text-sm text-muted-foreground">{s.position}</p>}
          </>
        )
        return (
          <li key={s.id}>
            {s.path ? <Link href={s.path} className="block rounded-card hover:text-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2">{body}</Link> : body}
          </li>
        )
      })}
    </ul>
  )
}

type SchoolProps = { title: string; hero: HeroProps; children?: ReactNode; school: Lookup | null; courses: CourseCardData[]; staff: StaffCard[] }

// 05 §4.4 School: hero compact → the page's own content → the school's courses → staff → CTA.
export function SchoolView({ title, hero, children, school, courses, staff }: SchoolProps) {
  const mine = school ? courses.filter((c) => c.school?.slug === school.slug) : []
  const extra = {
    eyebrow: 'School',
    variant: school?.image && !hero.image ? ('split' as const) : ('compact' as const),
    ...(school?.image && !hero.image ? { image: school.image } : {}),
    ...(school?.description && !hero.subheading ? { subheading: school.description } : {}),
  }
  return (
    <>
      <LeadHero hero={{ ...hero, variant: hero.image ? hero.variant : undefined }} extra={extra} />
      {children}
      {mine.length > 0 && (
        <Section tone="muted" anchorId="courses">
          <SectionTitle eyebrow="Courses" heading={`Courses in ${school?.name ?? title}`} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mine.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        </Section>
      )}
      {staff.length > 0 && (
        <Section anchorId="staff">
          <SectionTitle eyebrow="People" heading="Meet our *staff*" />
          <StaffGrid staff={staff} />
        </Section>
      )}
      <Banner
        heading="Find your *course*"
        body={`Talk to us about studying with the ${school?.name ?? title}.`}
        links={[
          { label: 'Enquire now', href: enquireHref(null), style: 'primary' },
          { label: 'All courses', href: school ? `/courses/?school=${school.slug}` : '/courses/', style: 'light' },
        ]}
      />
    </>
  )
}
