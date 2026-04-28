import BlurFade from "@/components/magicui/blur-fade";
import DocsSection from "@/components/section/docs-section";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documents",
  description: `Rapports et documents de projets par ${DATA.name}.`,
  openGraph: {
    title: "Documents",
    description: `Rapports et documents de projets par ${DATA.name}.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Documents",
    description: `Rapports et documents de projets par ${DATA.name}.`,
  },
};

const BLUR_FADE_DELAY = 0.04;

export default function DocsPage() {
  return (
    <section id="docs">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Documents
          <span className="ml-2 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
            {DATA.docs.length} rapports
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Rapports de projets académiques et techniques rédigés à l'INSEA et en
          freelance.
        </p>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <DocsSection items={DATA.docs} />
      </BlurFade>
    </section>
  );
}
