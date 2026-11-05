import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { mediaOf } from '@/components/blocks/media'
import type { Category, Media, Post, Staff } from '@/payload-types'
import { staffPaths } from '@/content/staff-paths'
import { toCardData, type CourseCardData } from './courseCards'
import { HIDDEN_COURSE_SLUGS } from './courseFilters'

// Server-side loaders for the page templates. Each is cached under the tags the collection hooks revalidate (10 §hook 3),
// with a short fallback TTL, so a template never costs more than one query per collection per few minutes.
const cached = <T>(key: string, tags: string[], fn: () => Promise<T>, revalidate = 300) =>
  unstable_cache(fn, ['templates', key], { tags, revalidate })()

const published = { _status: { equals: 'published' } } as const

/** Every published course except the DEC-34 junk pages, as card data (lookups populated). Uncached: tests call it directly. */
export async function loadListingCourses(): Promise<CourseCardData[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'courses',
    where: { and: [published, { slug: { not_in: [...HIDDEN_COURSE_SLUGS] } }] },
    depth: 1, limit: 0, pagination: false, sort: 'title',
  })
  return docs.map(toCardData)
}

export const getListingCourses = (): Promise<CourseCardData[]> => cached('courses', ['collection:courses', 'courses'], loadListingCourses)

export type Lookup = { id: number; slug: string; name: string; description: string | null; image: Media | null; detailPath: string | null }
const toLookup = (d: Category & { detailPath?: string | null }): Lookup => ({
  id: d.id, slug: d.slug ?? '', name: d.name, description: d.description ?? null, image: mediaOf(d.image as never), detailPath: d.detailPath ?? null,
})

/** Active schools (the `categories` lookup). */
export const getSchools = (): Promise<Lookup[]> =>
  cached('schools', ['collection:categories', 'collection:courses'], async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({ collection: 'categories', where: { active: { equals: true } }, depth: 1, limit: 0, pagination: false, sort: ['sortOrder', 'name'] })
    return docs.map((d) => toLookup(d as Category))
  })

/** Active campuses (the `campuses` lookup). `enquiryEmail` is admin-only and never leaves this function. */
export const getCampuses = (): Promise<Lookup[]> =>
  cached('campuses', ['collection:campuses', 'collection:courses'], async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({ collection: 'campuses', where: { active: { equals: true } }, depth: 1, limit: 0, pagination: false, sort: ['sortOrder', 'name'] })
    return docs.map((d) => toLookup(d as never))
  })

export const getLatestPosts = (n: number): Promise<Post[]> =>
  cached(`posts-${n}`, ['collection:posts', 'posts'], async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({ collection: 'posts', where: published, sort: '-publishedAt', limit: n, depth: 1 })
    return docs as Post[]
  })

export type TestimonialItem = { quote: string; name: string; role: string | null; photo: Media | number | null; videoUrl?: string | null }
export const getTestimonials = (n: number): Promise<TestimonialItem[]> =>
  cached(`testimonials-${n}`, ['collection:testimonials'], async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'testimonials', where: published, sort: ['-featured', '-createdAt'], limit: n, depth: 1,
    })
    return docs.map((t) => ({
      quote: t.quote,
      name: t.name,
      role: t.course && typeof t.course === 'object' ? t.course.title : null,
      photo: t.image && typeof t.image === 'object' ? (t.image as Media) : null,
      videoUrl: t.videoUrl ?? null,
    }))
  })

export type StaffCard = { id: number; name: string; position: string | null; photo: Media | null; school: { id: number; name: string } | null; path: string | null }

const pathOfStaff = new Map<string, string>()
for (const [path, slug] of Object.entries(staffPaths)) if (!pathOfStaff.has(slug)) pathOfStaff.set(slug, path)

/** Active staff (optionally of one school) with the path of their profile page (src/content/staff-paths.ts). */
export const getStaff = (schoolId?: number): Promise<StaffCard[]> =>
  cached(`staff-${schoolId ?? 'all'}`, ['collection:staff'], async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'staff',
      where: { and: [{ active: { not_equals: false } }, ...(schoolId ? [{ school: { equals: schoolId } }] : [])] },
      depth: 1, limit: 0, pagination: false, sort: ['sortOrder', 'name'],
    })
    return (docs as Staff[]).map((s) => ({
      id: s.id, name: s.name, position: s.position ?? null,
      photo: mediaOf(s.photo as never),
      school: s.school && typeof s.school === 'object' ? { id: s.school.id, name: s.school.name } : null,
      path: (s.slug && pathOfStaff.get(s.slug)) ?? (s.slug ? `/${s.slug}/` : null),
    }))
  })

export const getCounts = (): Promise<{ courses: number; campuses: number; staff: number; schools: number }> =>
  cached('counts', ['collection:courses', 'collection:campuses', 'collection:staff', 'collection:categories'], async () => {
    const [courses, campuses, staff, schools] = await Promise.all([getListingCourses(), getCampuses(), getStaff(), getSchools()])
    return { courses: courses.length, campuses: campuses.length, staff: staff.length, schools: schools.length }
  })

export type { CourseCardData }

/** Published posts with these slugs, in the order given (missing ones are skipped). */
export const getPostsBySlugs = (slugs: string[]): Promise<Post[]> =>
  cached(`posts-by-${slugs.join(',')}`, ['collection:posts', 'posts'], async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({ collection: 'posts', where: { and: [published, { slug: { in: slugs } }] }, limit: slugs.length, depth: 1 })
    return slugs.map((s) => (docs as Post[]).find((d) => d.slug === s)).filter((d): d is Post => Boolean(d))
  })
