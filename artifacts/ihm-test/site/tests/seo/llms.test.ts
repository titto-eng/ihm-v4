import { describe, expect, it } from 'vitest'
import { buildLlmsTxt } from '@/lib/seo/llms'
import type { PageEntry } from '@/content/pages'

// 70-urls-seo §4: /llms.txt is llmstxt.org Markdown built from the registries; noindex, form and utility pages stay out.
const pages: PageEntry[] = [
  { path: '/about-us/', title: 'About Us', template: 'about', description: 'Who we are.' },
  { path: '/school-of-social-work/', title: 'School of Social Work', template: 'schoolOfSocialWork', description: 'BSW in Melbourne.' },
  { path: '/course-enquiry/', title: 'Course enquiry', template: 'formPage' },
  { path: '/hidden/', title: 'Hidden', template: 'about', noindex: true },
  { path: '/odd/', title: 'Odd [page]', template: 'generic' },
]

describe('buildLlmsTxt', () => {
  const txt = buildLlmsTxt({
    origin: 'https://ihm.edu.au', siteName: 'IHM', summary: 'Health education.', pages,
    courses: [{ title: 'Bachelor of Nursing', path: '/courses/bachelor-of-nursing/', description: 'Three years.' }],
    posts: [{ title: 'News item', path: '/news/item/' }],
  })

  it('has the llms.txt shape: H1, summary quote, sections of links', () => {
    expect(txt.startsWith('# IHM\n\n> Health education.\n')).toBe(true)
    expect(txt).toContain('## Courses\n\n- [Bachelor of Nursing](https://ihm.edu.au/courses/bachelor-of-nursing/): Three years.')
    expect(txt).toContain('## School of Social Work\n\n- [School of Social Work](https://ihm.edu.au/school-of-social-work/): BSW in Melbourne.')
    expect(txt).toContain('## News and blog\n\n- [News item](https://ihm.edu.au/news/item/)')
    expect(txt).toContain('## Optional\n\n- [Odd page](https://ihm.edu.au/odd/)')
  })

  it('leaves out noindex and form pages', () => {
    expect(txt).not.toContain('/hidden/')
    expect(txt).not.toContain('/course-enquiry/')
  })
})
