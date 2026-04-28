import BlurFade from "@/components/magicui/blur-fade";
import VideosSection from "@/components/section/videos-section";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vidéos",
  description: `Collection de vidéos YouTube par ${DATA.name}.`,
  openGraph: {
    title: "Vidéos",
    description: `Collection de vidéos YouTube par ${DATA.name}.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidéos",
    description: `Collection de vidéos YouTube par ${DATA.name}.`,
  },
};

const BLUR_FADE_DELAY = 0.04;

export default function VideosPage() {
  return (
    <section id="videos">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Vidéos
          <span className="ml-2 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
            {DATA.videos.length} vidéos
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Présentations de projets, interviews et talks autour du software, de
          la data et de l'IA.
        </p>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <VideosSection items={DATA.videos} />
      </BlurFade>
    </section>
  );
}
