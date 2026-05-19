import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

type Props = {
  /** Limit the number of projects shown. Pass `Infinity` (or omit) to show all. */
  limit?: number;
  /** When `true`, displays a "voir tout" CTA below the grid (used on the home page). */
  showSeeAll?: boolean;
  /** Override heading copy. */
  title?: string;
  description?: string;
};

export default function ProjectsSection({
  limit,
  showSeeAll = false,
  title = "Projets",
  description = "Sélection software, data & IA.",
}: Props) {
  const allProjects = DATA.projects;
  const projects =
    typeof limit === "number" ? allProjects.slice(0, limit) : allProjects;
  const hasMore =
    typeof limit === "number" && allProjects.length > projects.length;

  return (
    <section id="projects">
      <div className="flex min-h-0 flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <div className="font-mono text-xs text-muted-foreground flex items-center gap-2 overflow-hidden">
            <span aria-hidden>#</span>
            <span aria-hidden>──</span>
            <span>projects</span>
            <span aria-hidden className="flex-1 truncate text-border">
              ──────────────────────────────────────────────
            </span>
          </div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span aria-hidden className="text-muted-foreground">●</span>
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr w-full">
          {projects.map((project, id) => (
            <BlurFade
              key={project.title}
              delay={BLUR_FADE_DELAY * 12 + id * 0.05}
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

        {showSeeAll && hasMore && (
          <BlurFade delay={BLUR_FADE_DELAY * 14} className="mx-auto">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:bg-accent/50 hover:ring-2 hover:ring-muted text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Voir tous les projets
              <span className="text-xs text-muted-foreground tabular-nums">
                ({allProjects.length})
              </span>
              <ArrowRight
                className="size-4 group-hover:translate-x-0.5 transition-transform"
                aria-hidden
              />
            </Link>
          </BlurFade>
        )}
      </div>
    </section>
  );
}
