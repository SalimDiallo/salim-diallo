import BlurFade from "@/components/magicui/blur-fade";
import GalleryAlbum from "@/components/section/gallery-album";
import { DATA } from "@/data/resume";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Galerie",
  description: `Collection de photos par ${DATA.name}.`,
  openGraph: {
    title: "Galerie",
    description: `Collection de photos par ${DATA.name}.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie",
    description: `Collection de photos par ${DATA.name}.`,
  },
};

const BLUR_FADE_DELAY = 0.04;

export default function GalleryPage() {
  return (
    <section id="gallery" className="flex flex-col gap-6">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/"
          className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-2 py-1 inline-flex items-center gap-1 group w-fit"
          aria-label="Retour à l'accueil"
        >
          <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
          cd ..
        </Link>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight flex items-center gap-2">
          <span aria-hidden className="text-muted-foreground">●</span>
          Galerie
          <span className="font-mono text-muted-foreground text-sm">
            [{DATA.gallery.length}]
          </span>
        </h1>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <GalleryAlbum items={DATA.gallery} />
      </BlurFade>
    </section>
  );
}
