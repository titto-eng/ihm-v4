import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { Payload } from 'payload'
import { findLegacyMarkup } from '../../scripts/import/lib/assert-clean'
import { boot } from '../collections/helpers'

// Rule 5 (AGENTS.md, 30-import check 4) for the content this module owns: no stored JSON in posts or staff contains
// `class=`, `style=`, `className`, raw div/span, theme asset URLs or a non-empty Lexical style. Passes trivially on an empty database.
let payload: Payload
beforeAll(async () => {
  payload = await boot()
})
afterAll(async () => {
  await payload.destroy?.()
})

const scan = async (collection: 'posts' | 'staff', fields: string[]) => {
  const bad: string[] = []
  let page = 1
  for (;;) {
    const res = await payload.find({ collection, page, limit: 100, depth: 0, overrideAccess: true, draft: false })
    for (const doc of res.docs as unknown as Record<string, unknown>[]) {
      const hits = findLegacyMarkup(Object.fromEntries(fields.map((f) => [f, doc[f]])))
      if (hits.length) bad.push(`${collection}/${String(doc.id)}: ${hits.join(', ')}`)
    }
    if (page >= res.totalPages) break
    page++
  }
  return bad
}

describe('no legacy markup is stored', () => {
  it('posts (content)', async () => expect(await scan('posts', ['content'])).toEqual([]))
  it('staff (every imported field)', async () =>
    expect(await scan('staff', ['name', 'position', 'postNominals', 'bio', 'research', 'grants', 'activities', 'supervision', 'linkedin', 'googleScholar', 'orcid'])).toEqual([]))
})
