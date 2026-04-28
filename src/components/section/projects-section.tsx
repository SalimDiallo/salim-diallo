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
  title = "Découvrez mes derniers travaux",
  description = "Du full-stack au data engineering en passant par l'IA — une sélection de projets en freelance et à l'INSEA.",
}: Props) {
  const allProjects = DATA.projects;
  const projects =
    typeof limit === "number" ? allProjects.slice(0, limit) : allProjects;
  const hasMore =
    typeof limit === "number" && allProjects.length > projects.length;

  return (
    <section id="projects">
      <div className="flex min-h-0 flex-col gap-y-8">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">
                Mes Projets
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {title}
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              {description}
            </p>
          </div>
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
