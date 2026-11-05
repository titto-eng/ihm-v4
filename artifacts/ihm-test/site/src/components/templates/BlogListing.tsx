import Link from 'next/link'
import { PageBand } from '@/components/layout/PageBand'
import Image from '@/components/blocks/MediaImage'
import { mediaOf } from '@/components/blocks/media'
import { Container } from '@/components/layout/Container'
import { Card, CardContent } from '@/components/ui/card'
import { pickSize } from '@/lib/media-sizes'
import NextImage from 'next/image'
import { postImage } from '@/content/post-images'
import type { Post } from '@/payload-types'
import { formatPostDate } from './BlogPost'

export const POSTS_PER_PAGE = 12

/** `/blog/` for page 1, `/blog/page/2/` after that (the old WordPress pagination URLs, rule 1). */
export const pagePath = (base: string, n: number) => (n <= 1 ? base : `${base}page/${n}/`)

export function PostCard({ post }: { post: Post }) {
  const image = pickSize(mediaOf(post.heroImage as never), 'card')
  return (
    <Link href={post.path ?? '#'} className="block h-full rounded-card focus-visible:outline-2 focus-visible:outline-offset-2">
      <Card className="h-full gap-0 overflow-hidden py-0 transition-transform duration-300 hover:-translate-y-0.5">
        {image ? (
          <Image src={image.url} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw" style={{ objectPosition: image.position }} className="aspect-[4/3] w-full object-cover" />
        ) : (
          <NextImage src={postImage(post).src} alt={postImage(post).alt} width={800} height={600} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw" className="aspect-[4/3] w-full object-cover" />
        )}
        <CardContent className="flex flex-1 flex-col gap-3 p-6">
          <p className="label-mono text-accent"><time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time></p>
          <h2 className="display text-2xl leading-snug">{post.title}</h2>
          {post.excerpt && <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>}
        </CardContent>
      </Card>
    </Link>
  )
}

// Listing for /blog/ and /news/: cards, 12 per page, numbered pagination.
export function BlogListing({ title, posts, page, totalPages, base }: { title: string; posts: Post[]; page: number; totalPages: number; base: string }) {
  return (
    <section className="bg-background pb-12 md:pb-20">
      <div className="mb-12"><PageBand eyebrow="News and stories" title={title} /></div>
      <Container>
        {posts.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        ) : (
          <p className="text-muted-foreground">Nothing has been published yet.</p>
        )}
        {totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-14 flex flex-wrap items-center justify-center gap-2">
            {page > 1 && <Link href={pagePath(base, page - 1)} rel="prev" className="label-mono px-3 py-2 underline-offset-4 hover:underline">Previous</Link>}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={pagePath(base, n)}
                aria-current={n === page ? 'page' : undefined}
                className={n === page ? 'label-mono rounded-full bg-primary px-4 py-2 text-primary-foreground' : 'label-mono rounded-full px-4 py-2 hover:bg-muted'}
              >
                {n}
              </Link>
            ))}
            {page < totalPages && <Link href={pagePath(base, page + 1)} rel="next" className="label-mono px-3 py-2 underline-offset-4 hover:underline">Next</Link>}
          </nav>
        )}
      </Container>
    </section>
  )
}
