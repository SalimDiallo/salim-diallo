/* eslint-disable @next/next/no-img-element */
"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.04;

type GalleryItem = {
  src: string;
  alt: string;
  orientation: "horizontal" | "vertical";
};

function GalleryImage({ item }: { item: GalleryItem }) {
  const [imageError, setImageError] = useState(false);

  if (!item.src || imageError) {
    return (
      <div
        className={cn(
          "w-full bg-muted flex items-center justify-center text-muted-foreground",
          item.orientation === "horizontal" ? "aspect-4/3" : "aspect-3/4"
        )}
      >
        <ImageIcon className="size-8 opacity-40" aria-hidden />
      </div>
    );
  }

  return (
    <img
      src={item.src}
      alt={item.alt}
      loading="lazy"
      onError={() => setImageError(true)}
      className={cn(
        "w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.02]",
        item.orientation === "horizontal" ? "aspect-4/3" : "aspect-3/4"
      )}
    />
  );
}

export default function GallerySection({
  items,
}: {
  items: readonly GalleryItem[];
}) {
  return (
    <section id="gallery" className="flex min-h-0 flex-col gap-y-6">
      <div className="columns-1 sm:columns-2 gap-3 [column-fill:balance]">
        {items.map((item, id) => (
          <BlurFade
            key={`${item.src}-${id}`}
            delay={BLUR_FADE_DELAY * 2 + id * 0.04}
            className="mb-3 break-inside-avoid"
          >
            <div className="overflow-hidden rounded-xl border border-border ring-1 ring-border/40 bg-card">
              <GalleryImage item={item} />
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
