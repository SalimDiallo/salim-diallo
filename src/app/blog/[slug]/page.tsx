/* eslint-disable @next/next/no-img-element */
import { mdxComponents } from "@/mdx-components";
import { DATA } from "@/data/resume";
import { formatDateFr, readingTime } from "@/lib/utils";
import { MDXContent } from "@content-collections/mdx/react";
import { allPosts } from "content-collections";
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

function getSortedPosts() {
  return [...allPosts].sort((a, b) =>
    new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1,
  );
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = allPosts.find(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug,
  );
  if (!post) return undefined;

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${slug}`,
      ...(image && { images: [{ url: `${DATA.url}${image}` }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [`${DATA.url}${image}`] }),
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sortedPosts = getSortedPosts();
  const currentIndex = sortedPosts.findIndex(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug,
  );
  const post = sortedPosts[currentIndex];
  if (!post) notFound();

  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;

  const getSlug = (p: (typeof sortedPosts)[number]) =>
    p._meta.path.replace(/\.mdx$/, "");

  const minutes = readingTime(post.content);

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    description: post.summary,
    image: post.image
      ? `${DATA.url}${post.image}`
      : `${DATA.url}/blog/${slug}/opengraph-image`,
    url: `${DATA.url}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: post.author ?? DATA.name,
    },
  }).replace(/</g, "\\u003c");

  return (
    <section id="blog" className="flex flex-col gap-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLdContent }}
      />

      <div>
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 group"
          aria-label="Retour au blog"
        >
          <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
          Retour au blog
        </Link>
      </div>

      <header className="flex flex-col gap-4">
        <h1 className="font-semibold text-3xl md:text-4xl tracking-tight leading-tight">
          {post.title}
        </h1>
        {post.summary && (
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-prose">
            {post.summary}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <User className="size-3.5" aria-hidden />
            {post.author ?? DATA.name}
          </span>
          <span className="size-1 rounded-full bg-border" aria-hidden />
          <time>{formatDateFr(post.publishedAt)}</time>
          <span className="size-1 rounded-full bg-border" aria-hidden />
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden />
            {minutes} min de lecture
          </span>
          {post.updatedAt && post.updatedAt !== post.publishedAt && (
            <>
              <span className="size-1 rounded-full bg-border" aria-hidden />
              <span className="italic">
                Mis à jour le {formatDateFr(post.updatedAt)}
              </span>
            </>
          )}
        </div>
      </header>

      {post.image && (
        <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <article className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
        <MDXContent code={post.mdx} components={mdxComponents} />
      </article>

      <nav className="mt-8 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          {previousPost ? (
            <Link
              href={`/blog/${getSlug(previousPost)}`}
              className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" />
                Article précédent
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors line-clamp-2">
                {previousPost.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}

          {nextPost ? (
            <Link
              href={`/blog/${getSlug(nextPost)}`}
              className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors text-right"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Article suivant
                <ChevronRight className="size-3" />
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}
        </div>
      </nav>
    </section>
  );
}
