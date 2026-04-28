import BlurFade from "@/components/magicui/blur-fade";
import GallerySection from "@/components/section/gallery-section";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";

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
    <section id="gallery">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Galerie
          <span className="ml-2 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
            {DATA.gallery.length} photos
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Une sélection de photos — coulisses, événements et moments marquants.
        </p>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <GallerySection items={DATA.gallery} />
      </BlurFade>
    </section>
  );
}
