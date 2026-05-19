import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  FileText,
  Images,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

const tiles = [
  {
    href: "/projects",
    label: "projects",
    icon: Briefcase,
    descriptionFor: (count: number) => `${count} entries`,
  },
  {
    href: "/certifications",
    label: "certifications",
    icon: Award,
    descriptionFor: (count: number) => `${count} entries`,
  },
  {
    href: "/gallery",
    label: "gallery",
    icon: Images,
    descriptionFor: (count: number) => `${count} entries`,
  },
  {
    href: "/videos",
    label: "videos",
    icon: Youtube,
    descriptionFor: (count: number) => `${count} entries`,
  },
  {
    href: "/docs",
    label: "docs",
    icon: FileText,
    descriptionFor: (count: number) => `${count} entries`,
  },
] as const;

export default function ExploreSection() {
  const counts = {
    "/projects": DATA.projects.length,
    "/certifications": DATA.certifications.length,
    "/gallery": DATA.gallery.length,
    "/videos": DATA.videos.length,
    "/docs": DATA.docs.length,
  } as const;

  return (
    <section id="explore" className="flex min-h-0 flex-col gap-y-4">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span aria-hidden className="text-muted-foreground">●</span>
          Explorer
        </h2>
      </BlurFade>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tiles.map((tile, id) => {
          const Icon = tile.icon;
          const count = counts[tile.href];
          return (
            <BlurFade
              key={tile.href}
              delay={BLUR_FADE_DELAY * 2 + id * 0.05}
              className="h-full"
            >
              <Link
                href={tile.href}
                className="group flex flex-col gap-3 h-full p-4 border border-border rounded-xl hover:ring-2 hover:ring-muted transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="flex items-center justify-between">
                  <div className="size-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                    <Icon className="size-4" aria-hidden />
                  </div>
                  <ArrowUpRight
                    className="size-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-mono font-medium leading-none">
                    {tile.label}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                    {tile.descriptionFor(count)}
                  </p>
                </div>
              </Link>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
