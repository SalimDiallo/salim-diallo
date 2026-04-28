import BlurFade from "@/components/magicui/blur-fade";
import ProjectsSection from "@/components/section/projects-section";
import { DATA } from "@/data/resume";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projets",
  description: `Tous les projets software, data et IA réalisés par ${DATA.name}.`,
  openGraph: {
    title: "Projets",
    description: `Tous les projets software, data et IA réalisés par ${DATA.name}.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Projets",
    description: `Tous les projets software, data et IA réalisés par ${DATA.name}.`,
  },
};

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
  return (
    <section id="all-projects" className="flex flex-col gap-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 group w-fit"
          aria-label="Retour à l'accueil"
        >
          <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
          Retour à l&apos;accueil
        </Link>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <ProjectsSection
          title="Tous mes projets"
          description="L'intégralité de mes projets en software engineering, data et IA — du prototype au produit livré."
        />
      </BlurFade>
    </section>
  );
}
