import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import ProjectsSwipeStack from "@/components/section/projects-swipe-stack";
import { DATA } from "@/data/resume";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projets",
  description: `Projets software, data et IA réalisés par ${DATA.name}.`,
  openGraph: {
    title: "Projets",
    description: `Projets software, data et IA réalisés par ${DATA.name}.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Projets",
    description: `Projets software, data et IA réalisés par ${DATA.name}.`,
  },
};

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
  return (
    <section id="all-projects" className="flex flex-col gap-6">
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
          Projets
          <span className="font-mono text-muted-foreground text-sm">
            [{DATA.projects.length}]
          </span>
        </h1>
      </BlurFade>

      {/* Mobile : swipe stack */}
      <BlurFade delay={BLUR_FADE_DELAY * 3} className="sm:hidden">
        <ProjectsSwipeStack projects={DATA.projects} />
      </BlurFade>

      {/* Desktop : grid 2 cols */}
      <div className="hidden sm:grid grid-cols-2 gap-3 max-w-[800px] mx-auto auto-rows-fr w-full">
        {DATA.projects.map((project, id) => (
          <BlurFade
            key={project.title}
            delay={BLUR_FADE_DELAY * 3 + id * 0.05}
            className="h-full"
          >
            <ProjectCard
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
