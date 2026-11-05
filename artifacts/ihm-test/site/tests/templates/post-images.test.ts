import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { postImage } from '@/content/post-images'

// 05 §4.5: a post without a CMS hero gets a topic photo; the photo always exists in public/ and is stable per post.
describe('postImage', () => {
  it('picks by topic', () => {
    expect(postImage({ slug: 'how-to-become-a-palliative-care-nurse' }).src).toContain('palliative-care-nursing')
    expect(postImage({ slug: 'the-ultimate-guide-to-nclex-exam-preparation' }).src).toContain('nclex')
    expect(postImage({ slug: 'why-social-workers-are-needed-more-than-ever-in-australia' }).src).toContain('/bsw/')
    expect(postImage({ slug: 'celebrating-naidoc-week-with-ihm-australia', category: 'news' }).src).toContain('naidoc')
  })

  it('is stable and points at a shipped file', () => {
    const a = postImage({ slug: 'stress-relieving-tips-for-nurses' })
    expect(postImage({ slug: 'stress-relieving-tips-for-nurses' })).toEqual(a)
    for (const slug of ['stress-relieving-tips-for-nurses', 'nurses-the-future-of-healthcare', 'x', 'y-news']) {
      expect(existsSync(join(process.cwd(), 'public', postImage({ slug }).src))).toBe(true)
    }
  })
})
