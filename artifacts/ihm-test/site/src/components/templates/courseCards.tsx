import Link from 'next/link'
import Image from '@/components/blocks/MediaImage'
import { mediaOf } from '@/components/blocks/media'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { pickSize } from '@/lib/media-sizes'
import type { Course } from '@/payload-types'

// Serializable view of a course for listing, school, campus and home cards. Built on the server, used by server and client components.
export type Ref = { slug: string; name: string; sortOrder: number }
export type CourseCardData = {
  id: number
  slug: string
  path: string
  title: string
  excerpt: string | null
  accreditation: string | null
  fee: string | null
  featured: boolean
  featuredOrder: number
  studentType: 'domestic' | 'international' | 'both'
  image: { url: string; alt: string; width: number; height: number; position?: string } | null
  school: Ref | null
  delivery: Ref[]
  campus: Ref[]
  level: Ref[]
  discipline: Ref[]
  duration: string | null
}

const refOf = (row: unknown): Ref | null => {
  if (!row || typeof row !== 'object') return null
  const r = row as { slug?: string | null; name?: string | null; sortOrder?: number | null }
  return r.slug && r.name ? { slug: r.slug, name: r.name, sortOrder: r.sortOrder ?? 0 } : null
}
const refsOf = (rows: unknown): Ref[] =>
  (Array.isArray(rows) ? rows : []).flatMap((r) => refOf(r) ?? []).sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))

/** `course` must be loaded at depth >= 1 so the lookups are populated. */
export function toCardData(course: Course): CourseCardData {
  const image = pickSize(mediaOf(course.heroImage as never), 'card')
  const duration = (Array.isArray(course.durations) ? course.durations : []).find((d) => d && typeof d === 'object') as { name?: string } | undefined
  return {
    id: course.id,
    slug: course.slug,
    path: course.path ?? `/courses/${course.slug}/`,
    title: course.title,
    excerpt: course.excerpt ?? null,
    accreditation: course.accreditation ?? null,
    fee: course.fees?.displayAmount ?? null,
    featured: Boolean(course.featured),
    featuredOrder: course.featuredOrder ?? 9999,
    studentType: course.studentType ?? 'both',
    image,
    school: refOf(course.school),
    delivery: refsOf(course.deliveryModes),
    campus: refsOf(course.campuses),
    level: refsOf(course.levels),
    discipline: refsOf(course.disciplines),
    duration: duration?.name ?? null,
  }
}

export function CourseCard({ course, detailed = false }: { course: CourseCardData; detailed?: boolean }) {
  return (
    <Link href={course.path} className="block h-full rounded-card focus-visible:outline-2 focus-visible:outline-offset-2" data-course-card={course.slug}>
      <Card className="h-full gap-0 overflow-hidden py-0 transition-transform duration-300 hover:-translate-y-0.5">
        {course.image ? (
          <Image src={course.image.url} alt={course.image.alt} width={course.image.width} height={course.image.height} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw" style={{ objectPosition: course.image.position }} className="aspect-[4/3] w-full object-cover" />
        ) : (
          <div aria-hidden className="bg-sunrise-glow flex aspect-[16/7] w-full items-end p-6">
            <span className="label-mono text-ink-foreground">{course.school?.name ?? 'Course'}</span>
          </div>
        )}
        <CardContent className="flex flex-1 flex-col gap-3 p-6">
          {course.school && course.image && <p className="label-mono text-accent">{course.school.name}</p>}
          <h3 className="display text-2xl leading-snug">{course.title}</h3>
          {(detailed || !course.image) && course.excerpt && <p className="line-clamp-3 text-muted-foreground">{course.excerpt}</p>}
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
            {course.delivery.map((d) => <Badge key={d.slug} variant="secondary" className="label-mono rounded-full px-3 text-[10px] tracking-widest">{d.name}</Badge>)}
            {course.duration && <span className="text-sm text-muted-foreground">{course.duration}</span>}
          </div>
          {detailed && (
            <dl className="grid gap-1 text-sm text-muted-foreground">
              {course.campus.length > 0 && <div><dt className="sr-only">Campuses</dt><dd>{course.campus.map((c) => c.name).join(' · ')}</dd></div>}
              {course.accreditation && <div><dt className="sr-only">Accreditation</dt><dd>{course.accreditation}</dd></div>}
              {course.fee && <div><dt className="sr-only">Fee</dt><dd>{course.fee}</dd></div>}
            </dl>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
