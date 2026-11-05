import { describe, expect, it } from 'vitest'
import { loadListingCourses } from '@/components/templates/data'
import { filterCourses, HIDDEN_COURSE_SLUGS } from '@/components/templates/courseFilters'
import { searchContent } from '@/components/templates/search'

// Real Postgres through the Local API (content is already imported in the dev database).
describe('course listing data (DEC-34)', () => {
  it('leaves test-1 and test-2 out of the listing', async () => {
    const all = await loadListingCourses()
    expect(all.length).toBeGreaterThan(10)
    for (const slug of HIDDEN_COURSE_SLUGS) expect(all.map((c) => c.slug)).not.toContain(slug)
  })

  it('filters real courses by one facet', async () => {
    const all = await loadListingCourses()
    const school = all.find((c) => c.slug === 'bachelor-of-social-work')?.school
    expect(school).toBeTruthy()
    const only = filterCourses(all, { school: [school!.slug] })
    expect(only.length).toBeGreaterThan(0)
    expect(only.length).toBeLessThan(all.length)
    expect(only.every((c) => c.school?.slug === school!.slug)).toBe(true)
  })
})

describe('search (Postgres full-text)', () => {
  it('finds a known course by name and groups it under courses', async () => {
    const r = await searchContent('bachelor of nursing')
    expect(r.courses.map((c) => c.path)).toContain('/courses/bachelor-of-nursing/')
    expect(r.total).toBe(r.courses.length + r.pages.length + r.posts.length)
  })

  it('finds posts and pages by content, never the hidden junk courses', async () => {
    const r = await searchContent('nursing')
    expect(r.courses.length).toBeGreaterThan(0)
    expect(r.posts.length + r.pages.length).toBeGreaterThan(0)
    const test = await searchContent('test')
    expect(test.courses.map((c) => c.path)).not.toContain('/courses/test-1/')
  })

  it('returns nothing for a query that is too short, and does not throw on odd input', async () => {
    expect((await searchContent('a')).total).toBe(0)
    await expect(searchContent('"unbalanced -(')).resolves.toBeTruthy()
  })
})
