/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Play, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

type Video = {
  title: string;
  description: string;
  url: string;
};

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace(/^\//, "").split("/")[0] || null;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const parts = u.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "embed" || p === "shorts");
      if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    }
  } catch {
    return null;
  }
  return null;
}

function VideoThumbnail({ id, title }: { id: string; title: string }) {
  const [errored, setErrored] = useState(false);
  const src = errored
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  return (
    <img
      src={src}
      alt={title}
      onError={() => setErrored(true)}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  );
}

function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const id = extractYouTubeId(video.url);

  return (
    <div className="flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 hover:ring-muted transition-all duration-200">
      <div className="relative aspect-video bg-muted shrink-0">
        {playing && id ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => id && setPlaying(true)}
            className="group absolute inset-0 w-full h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`Lire la vidéo : ${video.title}`}
          >
            {id ? (
              <VideoThumbnail id={id} title={video.title} />
            ) : (
              <div className="w-full h-full bg-muted" />
            )}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="size-14 rounded-full bg-background/95 border border-border shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="size-6 fill-foreground text-foreground translate-x-0.5" />
              </div>
            </div>
          </button>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-snug">{video.title}</h3>
          <Link
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            aria-label={`Ouvrir sur YouTube : ${video.title}`}
          >
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
        {video.description && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {video.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function VideosSection({
  items,
}: {
  items: readonly Video[];
}) {
  return (
    <section id="videos" className="flex min-h-0 flex-col gap-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((video, id) => (
          <BlurFade
            key={video.url}
            delay={BLUR_FADE_DELAY * 2 + id * 0.05}
            className="h-full"
          >
            <VideoCard video={video} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
