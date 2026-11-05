import type { CourseCardData, Ref } from './courseCards'

// Facets of the live /courses/ page (02-ihm-theme §6), in its order: delivery mode (tabs), campus, student type, school.
// Level and discipline are our additions (same lookups the course doc carries).
export const FACETS = [
  { param: 'delivery', label: 'Delivery mode' },
  { param: 'campus', label: 'Campus' },
  { param: 'type', label: 'Student type' },
  { param: 'school', label: 'School' },
  { param: 'level', label: 'Level' },
  { param: 'discipline', label: 'Discipline' },
] as const
export type FacetParam = (typeof FACETS)[number]['param']
export type Selected = Partial<Record<FacetParam, string[]>>
export type SearchParams = Record<string, string | string[] | undefined>

/** Hidden from the listing, reachable by URL only (DEC-34). */
export const HIDDEN_COURSE_SLUGS = ['test-1', 'test-2'] as const

const STUDENT_TYPES: Ref[] = [
  { slug: 'domestic', name: 'Domestic', sortOrder: 0 },
  { slug: 'international', name: 'International', sortOrder: 1 },
]

/** `?school=a,b` and `?school=a&school=b` both mean "a or b". Unknown params are ignored. */
export function parseFilters(sp: SearchParams): Selected {
  const out: Selected = {}
  for (const { param } of FACETS) {
    const raw = sp[param]
    const values = (Array.isArray(raw) ? raw : raw ? [raw] : []).flatMap((v) => v.split(',')).map((v) => v.trim().toLowerCase()).filter((v) => /^[a-z0-9-]+$/.test(v))
    if (values.length) out[param] = [...new Set(values)]
  }
  return out
}

const valuesOf = (c: CourseCardData, param: FacetParam): string[] => {
  switch (param) {
    case 'delivery': return c.delivery.map((r) => r.slug)
    case 'campus': return c.campus.map((r) => r.slug)
    case 'school': return c.school ? [c.school.slug] : []
    case 'level': return c.level.map((r) => r.slug)
    case 'discipline': return c.discipline.map((r) => r.slug)
    case 'type': return c.studentType === 'both' ? ['domestic', 'international'] : [c.studentType]
  }
}

/** OR within a facet, AND across facets. */
export function filterCourses(courses: CourseCardData[], selected: Selected, skip?: FacetParam): CourseCardData[] {
  return courses.filter((c) =>
    FACETS.every(({ param }) => {
      const want = selected[param]
      if (!want?.length || param === skip) return true
      const have = valuesOf(c, param)
      return want.some((w) => have.includes(w))
    }),
  )
}

export type FacetOption = { slug: string; name: string; count: number }
export type FacetGroup = { param: FacetParam; label: string; options: FacetOption[] }

/** Options come from the courses themselves, so a facet never offers a value with no course. Counts respect the other facets. */
export function buildFacets(courses: CourseCardData[], selected: Selected): FacetGroup[] {
  return FACETS.flatMap(({ param, label }) => {
    const pool = filterCourses(courses, selected, param)
    const known = new Map<string, Ref>()
    for (const c of courses) {
      const refs: Ref[] = param === 'type' ? STUDENT_TYPES.filter((t) => valuesOf(c, 'type').includes(t.slug)) : param === 'school' ? (c.school ? [c.school] : []) : (c[param] as Ref[])
      for (const r of refs) known.set(r.slug, r)
    }
    const options = [...known.values()]
      .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))
      .map((r) => ({ slug: r.slug, name: r.name, count: pool.filter((c) => valuesOf(c, param).includes(r.slug)).length }))
    return options.length ? [{ param, label, options }] : []
  })
}

/** Query string for a facet change, keeping the other selections; empty when nothing is selected. */
export function hrefWith(selected: Selected, param: FacetParam, slug: string | null): string {
  const next: Selected = { ...selected }
  if (slug) next[param] = [slug]
  else delete next[param]
  const qs = new URLSearchParams()
  for (const { param: p } of FACETS) if (next[p]?.length) qs.set(p, next[p]!.join(','))
  const s = qs.toString()
  return s ? `/courses/?${s}` : '/courses/'
}

export const hasFilters = (selected: Selected) => Object.keys(selected).length > 0
