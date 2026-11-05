import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound, permanentRedirect } from 'next/navigation'
import { getPayload, type Where } from 'payload'
import config from '@payload-config'
import { getSeoMetadata } from '@/lib/seo/get-metadata'
import { pageAt } from '@/content/pages'
import { BlogListing, POSTS_PER_PAGE, pagePath } from './BlogListing'
import { BlogPost } from './BlogPost'
import type { Post } from '@/payload-types'

// Shared by /blog/[[...parts]] and /news/[[...parts]]: `/<base>/` listing, `/<base>/page/N/` pagination, `/<base>/<slug>/` post.
// Posts keep the URL they had on WordPress (rule 1): 82 under /blog/, 9 under /news/. The listing for each is its own category.
export type Base = 'blog' | 'news'
export type Parts = string[] | undefined
type Route = { kind: 'listing'; page: number } | { kind: 'post'; slug: string } | null

const LISTING_TITLES: Record<Base, string> = { blog: 'Blog', news: 'News' }
// WordPress capped the blog archive at 6 pages: an old `/blog/page/N/` past our last page goes to the last page rather than a 404.
const LEGACY_PAGE_CAP = 6

// DEC-39: live `/news/` is the archive of ALL posts (it answers 200 for any `/news/page/N/`), so the `news` base lists every post;
// `/blog/` keeps listing the `blog` category only. Post URLs keep their own prefix (`/blog/<slug>/` or `/news/<slug>/`).
const listingWhere = (base: Base): Where => (base === 'news' ? { _status: { equals: 'published' } } : { and: [{ category: { equals: base } }, { _status: { equals: 'published' } }] })

export function parseParts(parts: Parts): Route {
  if (!parts?.length) return { kind: 'listing', page: 1 }
  if (parts[0] === 'page') {
    const n = Number(parts[1])
    return parts.length === 2 && Number.isInteger(n) && n >= 2 ? { kind: 'listing', page: n } : null
  }
  return parts.length === 1 && /^[a-z0-9-]+$/.test(parts[0]) ? { kind: 'post', slug: parts[0] } : null
}

async function getPost(base: Base, slug: string): Promise<Post | null> {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts', where: { slug: { equals: slug }, category: { equals: base } }, draft, limit: 1, depth: 2, overrideAccess: draft,
  })
  return (docs[0] as Post | undefined) ?? null
}

async function getListing(base: Base, page: number) {
  const payload = await getPayload({ config })
  const posts = await payload.find({ collection: 'posts', where: listingWhere(base), sort: '-publishedAt', limit: POSTS_PER_PAGE, page, depth: 1 })
  // the registry row for /blog/ or /news/ (src/content/pages.ts) owns the listing's title
  return { posts, title: pageAt(`/${base}/`)?.title ?? LISTING_TITLES[base] }
}

export async function blogMetadata(base: Base, parts: Parts): Promise<Metadata> {
  const route = parseParts(parts)
  if (!route) return {}
  if (route.kind === 'post') {
    const post = await getPost(base, route.slug)
    if (!post) return {}
    // `seo.noindex`, `seo.canonical`, staging NEXT_PUBLIC_ROBOTS, title template and article OG all come from the builder (70 §4)
    return getSeoMetadata(post, {}, { type: 'article' })
  }
  const { title } = await getListing(base, 1)
  return getSeoMetadata({ title: route.page > 1 ? `${title} (page ${route.page})` : title, path: pagePath(`/${base}/`, route.page) })
}

export async function BlogRoute({ base, parts }: { base: Base; parts: Parts }) {
  const route = parseParts(parts)
  if (!route) notFound()
  if (route.kind === 'post') {
    const post = await getPost(base, route.slug)
    if (!post) notFound()
    return <BlogPost post={post} />
  }
  const { posts, title } = await getListing(base, route.page)
  const root = `/${base}/`
  if (route.page > posts.totalPages) {
    if (base === 'blog' && route.page <= LEGACY_PAGE_CAP && posts.totalPages >= 1) permanentRedirect(pagePath(root, posts.totalPages))
    notFound()
  }
  return <BlogListing title={title} posts={posts.docs as Post[]} page={route.page} totalPages={posts.totalPages} base={root} />
}
