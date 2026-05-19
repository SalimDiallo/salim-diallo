/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Contact,
  ImageIcon,
  LayoutGrid,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type GalleryItem = {
  src: string;
  alt: string;
  orientation: "horizontal" | "vertical";
};

type OrientationFilter = "all" | "horizontal" | "vertical";
type ViewMode = "album" | "contact";

function indexLabel(index: number): string {
  return `IMG_${String(index + 1).padStart(4, "0")}`;
}

function GalleryThumb({
  item,
  onClick,
  className,
  imgClassName,
}: {
  item: GalleryItem;
  onClick?: () => void;
  className?: string;
  imgClassName?: string;
}) {
  const [errored, setErrored] = useState(false);
  const ratio = item.orientation === "horizontal" ? "aspect-[4/3]" : "aspect-[3/4]";

  if (errored) {
    return (
      <div
        className={cn(
          "w-full bg-muted flex items-center justify-center text-muted-foreground",
          ratio,
          className,
        )}
      >
        <ImageIcon className="size-6 opacity-40" aria-hidden />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group block w-full overflow-hidden bg-muted",
        ratio,
        className,
      )}
      aria-label={`Ouvrir ${item.alt}`}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        onError={() => setErrored(true)}
        draggable={false}
        className={cn(
          "w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
          imgClassName,
        )}
      />
    </button>
  );
}

function PhotoCard({
  item,
  globalIndex,
  onClick,
}: {
  item: GalleryItem;
  globalIndex: number;
  onClick: () => void;
}) {
  return (
    <div className="group/photo relative">
      <div className="overflow-hidden bg-card">
        <GalleryThumb item={item} onClick={onClick} />
      </div>
      {/* Caption — fades in on hover, very discreet */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity">
        {indexLabel(globalIndex)}
      </div>
    </div>
  );
}

function ContactCell({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  return (
    <div className="overflow-hidden bg-card">
      <GalleryThumb item={item} onClick={onClick} />
    </div>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  if (!mounted) return null;

  const item = items[index];
  if (!item) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
    >
      <div
        className="relative w-full h-[100dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — minimal */}
        <div className="flex items-center justify-between gap-3 px-3 py-2 shrink-0 absolute top-0 inset-x-0 z-10 bg-linear-to-b from-black/40 to-transparent">
          <div className="font-mono text-[11px] text-white/80 tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="size-8 shrink-0 rounded-md bg-black/40 hover:bg-black/60 text-white/90 flex items-center justify-center transition-colors backdrop-blur"
            aria-label="Fermer"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        {/* Image area */}
        <div className="relative flex-1 min-h-0 flex items-center justify-center p-4 sm:p-10">
          <img
            src={item.src}
            alt={item.alt}
            className="max-w-full max-h-full object-contain select-none"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />

          {/* Prev / Next overlay buttons */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/40 hover:bg-black/70 text-white/90 backdrop-blur flex items-center justify-center transition-colors"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/40 hover:bg-black/70 text-white/90 backdrop-blur flex items-center justify-center transition-colors"
            aria-label="Photo suivante"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>

      </div>
    </div>,
    document.body,
  );
}

export default function GalleryAlbum({
  items,
}: {
  items: readonly GalleryItem[];
}) {
  const [orientation, setOrientation] = useState<OrientationFilter>("all");
  const [view, setView] = useState<ViewMode>("album");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filtered items, with original index preserved for IMG_XXXX label.
  const filtered = useMemo(() => {
    return items
      .map((item, originalIndex) => ({ item, originalIndex }))
      .filter(({ item }) =>
        orientation === "all" ? true : item.orientation === orientation,
      );
  }, [items, orientation]);

  const openLightbox = (filteredIndex: number) => setLightboxIndex(filteredIndex);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const goNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  // Lightbox shows the filtered list, so build a flat array of items for it.
  const lightboxList = filtered.map((f) => f.item);

  return (
    <div className="flex flex-col gap-3">
      {/* Controls — compact, icon-driven */}
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex border border-border rounded-md overflow-hidden h-8 font-mono text-[11px]">
          {(["all", "horizontal", "vertical"] as const).map((o, i) => (
            <button
              key={o}
              type="button"
              onClick={() => setOrientation(o)}
              className={cn(
                "px-2.5 inline-flex items-center transition-colors",
                i > 0 && "border-l border-border",
                orientation === o
                  ? "bg-foreground text-background"
                  : "bg-background text-muted-foreground hover:bg-accent",
              )}
              aria-pressed={orientation === o}
              aria-label={`Filter: ${o}`}
            >
              {o === "all" ? "*" : o === "horizontal" ? "▭" : "▯"}
            </button>
          ))}
        </div>

        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground tabular-nums">
          {String(filtered.length).padStart(2, "0")}
        </div>

        <div className="inline-flex border border-border rounded-md overflow-hidden h-8 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => setView("album")}
            className={cn(
              "px-2.5 inline-flex items-center transition-colors",
              view === "album"
                ? "bg-foreground text-background"
                : "bg-background text-muted-foreground hover:bg-accent",
            )}
            aria-pressed={view === "album"}
            aria-label="Album view"
          >
            <LayoutGrid className="size-3.5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setView("contact")}
            className={cn(
              "px-2.5 inline-flex items-center transition-colors border-l border-border",
              view === "contact"
                ? "bg-foreground text-background"
                : "bg-background text-muted-foreground hover:bg-accent",
            )}
            aria-pressed={view === "contact"}
            aria-label="Contact sheet view"
          >
            <Contact className="size-3.5" aria-hidden />
          </button>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="font-mono text-xs text-muted-foreground border border-dashed border-border rounded-md p-6 text-center">
          # empty
        </div>
      ) : (
        view === "album" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {filtered.map(({ item, originalIndex }, idx) => (
              <PhotoCard
                key={`${item.src}-${originalIndex}`}
                item={item}
                globalIndex={originalIndex}
                onClick={() => openLightbox(idx)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-1">
            {filtered.map(({ item, originalIndex }, idx) => (
              <ContactCell
                key={`${item.src}-${originalIndex}`}
                item={item}
                onClick={() => openLightbox(idx)}
              />
            ))}
          </div>
        )
      )}

      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxList}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}
