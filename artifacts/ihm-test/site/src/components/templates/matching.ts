import type { Lookup } from './data'

// Which lookup row (school, campus) a CMS page stands for. The pages carry no relationship to the lookups, so the match is by name or slug.
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

export function pageMatchesSchool(page: { title: string; path?: string | null }, school: Lookup): boolean {
  const slugWords = school.slug.replace(/-/g, ' ')
  return norm(page.title) === norm(school.name) || norm(page.path ?? '') === slugWords || norm(page.title).includes(norm(school.name))
}

export function pageMatchesCampus(page: { title: string; path?: string | null }, campus: Lookup): boolean {
  if (campus.detailPath && page.path === campus.detailPath) return true
  const hay = norm(`${page.path ?? ''} ${page.title}`)
  return hay.split(' ').includes(campus.slug) || hay.split(' ').includes(norm(campus.name))
}

export const findSchool = (page: { title: string; path?: string | null }, schools: Lookup[]) => schools.find((s) => pageMatchesSchool(page, s)) ?? null
export const findCampus = (page: { title: string; path?: string | null }, campuses: Lookup[]) => campuses.find((c) => pageMatchesCampus(page, c)) ?? null
