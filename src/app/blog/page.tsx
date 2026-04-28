/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { normalizePage, paginate } from "@/lib/pagination";
import { cn, formatDateFr, readingTime } from "@/lib/utils";
import { allPosts } from "content-collections";
import {
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    Clock,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Réflexions et retours d'expérience sur le software engineering, la data et l'IA.",
  openGraph: {
    title: "Blog",
    description:
      "Réflexions et retours d'expérience sur le software engineering, la data et l'IA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description:
      "Réflexions et retours d'expérience sur le software engineering, la data et l'IA.",
  },
};

const PAGE_SIZE = 6;
const BLUR_FADE_DELAY = 0.04;

type Post = (typeof allPosts)[number];

function getSlug(post: Post) {
  return post._meta.path.replace(/\.mdx$/, "");
}

function PostCover({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={cn(
          "w-full bg-linear-to-br from-muted via-muted to-accent/40",
          className,
        )}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={cn(
        "w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
        className,
      )}
    />
  );
}

function FeaturedCard({ post, delay }: { post: Post; delay: number }) {
  const slug = getSlug(post);
  const minutes = readingTime(post.content);
  return (
    <BlurFade delay={delay}>
      <Link
        href={`/blog/${slug}`}
        className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover:ring-2 hover:ring-muted transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="relative aspect-16/8 overflow-hidden">
          <PostCover
            src={post.image}
            alt={post.title}
            className="h-full aspect-auto"
          />
          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-medium uppercase tracking-wide bg-background/90 backdrop-blur border border-border rounded-md px-2 py-1">
              À la une
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <time>{formatDateFr(post.publishedAt)}</time>
            <span className="size-1 rounded-full bg-border" aria-hidden />
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" aria-hidden />
              {minutes} min de lecture
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight leading-snug">
            <span className="group-hover:text-foreground transition-colors">
              {post.title}
              <ArrowUpRight
                className="ml-1 inline-block size-5 stroke-2 text-muted-foreground opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                aria-hidden
              />
            </span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {post.summary}
          </p>
        </div>
      </Link>
    </BlurFade>
  );
}

function PostCard({ post, delay }: { post: Post; delay: number }) {
  const slug = getSlug(post);
  const minutes = readingTime(post.content);
  return (
    <BlurFade delay={delay} className="h-full">
      <Link
        href={`/blog/${slug}`}
        className="group flex flex-col h-full overflow-hidden rounded-xl border border-border bg-card hover:ring-2 hover:ring-muted transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="relative aspect-video overflow-hidden">
          <PostCover src={post.image} alt={post.title} className="h-full" />
        </div>
        <div className="flex flex-col gap-2 p-4 flex-1">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <time>{formatDateFr(post.publishedAt)}</time>
            <span className="size-1 rounded-full bg-border" aria-hidden />
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" aria-hidden />
              {minutes} min
            </span>
          </div>
          <h3 className="font-semibold leading-snug">
            <span className="group-hover:text-foreground transition-colors">
              {post.title}
            </span>
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {post.summary}
          </p>
        </div>
      </Link>
    </BlurFade>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;

  const sortedPosts = [...allPosts].sort((a, b) =>
    new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1,
  );

  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE);
  const currentPage = normalizePage(pageParam, totalPages);
  const { items: paginatedPosts, pagination } = paginate(sortedPosts, {
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  // Featured = newest post on page 1 only.
  const showFeatured = pagination.page === 1 && paginatedPosts.length > 0;
  const featured = showFeatured ? paginatedPosts[0] : null;
  const rest = showFeatured ? paginatedPosts.slice(1) : paginatedPosts;

  return (
    <section id="blog" className="flex flex-col gap-10">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-2">
            Blog
            <span className="bg-card border border-border rounded-md px-2 py-0.5 text-muted-foreground text-sm">
              {sortedPosts.length}
            </span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-prose">
            Réflexions et retours d&apos;expérience sur le software engineering,
            la data et l&apos;IA. Articles courts, écrits en chemin entre deux
            projets.
          </p>
        </div>
      </BlurFade>

      {paginatedPosts.length === 0 ? (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
            <p className="text-muted-foreground text-center">
              Aucun article pour l&apos;instant. Reviens bientôt !
            </p>
          </div>
        </BlurFade>
      ) : (
        <>
          {featured && (
            <FeaturedCard post={featured} delay={BLUR_FADE_DELAY * 2} />
          )}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rest.map((post, id) => (
                <PostCard
                  key={getSlug(post)}
                  post={post}
                  delay={BLUR_FADE_DELAY * 3 + id * 0.05}
                />
              ))}
            </div>
          )}

          {pagination.totalPages > 1 && (
            <BlurFade delay={BLUR_FADE_DELAY * 6}>
              <div className="flex flex-row items-center justify-between gap-3 pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Page {pagination.page} sur {pagination.totalPages}
                </div>
                <div className="flex gap-2">
                  {pagination.hasPreviousPage ? (
                    <Link
                      href={`/blog?page=${pagination.page - 1}`}
                      className="h-8 px-3 inline-flex items-center gap-1 text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <ChevronLeft className="size-3.5" aria-hidden />
                      Précédent
                    </Link>
                  ) : (
                    <span className="h-8 px-3 inline-flex items-center gap-1 text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">
                      <ChevronLeft className="size-3.5" aria-hidden />
                      Précédent
                    </span>
                  )}
                  {pagination.hasNextPage ? (
                    <Link
                      href={`/blog?page=${pagination.page + 1}`}
                      className="h-8 px-3 inline-flex items-center gap-1 text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Suivant
                      <ChevronRight className="size-3.5" aria-hidden />
                    </Link>
                  ) : (
                    <span className="h-8 px-3 inline-flex items-center gap-1 text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">
                      Suivant
                      <ChevronRight className="size-3.5" aria-hidden />
                    </span>
                  )}
                </div>
              </div>
            </BlurFade>
          )}
        </>
      )}
    </section>
  );
}
