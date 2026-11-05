import Link from 'next/link'
import Image from '@/components/blocks/MediaImage'
import { mediaOf } from '@/components/blocks/media'
import { Container } from '@/components/layout/Container'
import { Prose } from '@/components/layout/Prose'
import { RenderBlocks } from '@/components/RenderBlocks'
import { ArticleJsonLd } from '@/components/seo/Article'
import NextImage from 'next/image'
import { postImage } from '@/content/post-images'
import type { Post } from '@/payload-types'

const date = new Intl.DateTimeFormat('en-AU', { dateStyle: 'long', timeZone: 'Australia/Melbourne' })
export const formatPostDate = (iso: string) => date.format(new Date(iso))
export const listingPath = (post: Pick<Post, 'category'>) => (post.category === 'news' ? '/news/' : '/blog/')

// Blog and news post (05-design-system templates, 30-import): hero image (the CMS one, else a topic photo), date, Prose. Content is Lexical only, rendered by Prose.
export function BlogPost({ post }: { post: Post }) {
  const image = mediaOf(post.heroImage as never)
  const home = listingPath(post)
  return (
    <article className="bg-background py-12 md:py-20">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,52rem)_20rem] lg:justify-center">
        <div className="min-w-0">
        <nav aria-label="Breadcrumb" className="label-mono mb-8 text-muted-foreground">
          <Link href={home} className="underline-offset-4 hover:underline">{post.category === 'news' ? 'News' : 'Blog'}</Link>
        </nav>
        <header>
          <p className="label-mono mb-4 flex flex-wrap items-center gap-x-4 text-accent">
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            {post.readTime ? <span>{post.readTime} min read</span> : null}
            {post.author ? <span>{post.author}</span> : null}
          </p>
          <h1 className="display text-display-md">{post.title}</h1>
        </header>
        {image?.url && (
          <figure className="my-10 overflow-hidden rounded-card">
            <Image
              src={image.url}
              alt={image.alt ?? ''}
              width={image.width ?? 1600}
              height={image.height ?? 900}
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="h-auto w-full object-cover"
              priority
            />
          </figure>
        )}
        {!image?.url && (() => {
          // No CMS hero: a topic photo from public/ (src/content/post-images.ts).
          const fallback = postImage(post)
          return (
            <figure className="my-10 overflow-hidden rounded-card">
              <NextImage src={fallback.src} alt={fallback.alt} width={1600} height={900} sizes="(min-width: 1024px) 56rem, 100vw" className="aspect-[16/9] h-auto w-full object-cover" priority />
            </figure>
          )
        })()}
        <Prose data={post.content as never} className="mx-auto" />
        <footer className="mt-14 border-t border-border pt-6">
          <Link href={home} className="label-mono text-primary-strong underline-offset-4 hover:underline">
            ← All {post.category === 'news' ? 'news' : 'posts'}
          </Link>
        </footer>
        </div>
        {/* every post's sidebar carries the `blog-enquiry` form (old single.php:61) */}
        <aside aria-label="Enquire" className="lg:sticky lg:top-24 lg:self-start">
          <RenderBlocks blocks={[{ blockType: 'enquiryForm', formKey: 'blog-enquiry', heading: 'Interested in studying with IHM?', variant: 'sidebar', spacing: 'none', anchorId: 'quickContact' }]} ctx={{ depth: 1 }} />
        </aside>
      </Container>
      <ArticleJsonLd post={post} />
    </article>
  )
}
