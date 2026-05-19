import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { ArrowUpRight, Users } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const BLUR_FADE_DELAY = 0.04;

function ClubRow({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) {
  const className = "flex items-center gap-x-3 justify-between group";
  if (href && href !== "#") {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={className}
      >
        {children}
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
}

export default function ClubsSection() {
  return (
    <section id="clubs" className="flex min-h-0 flex-col gap-y-4">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span aria-hidden className="text-muted-foreground">●</span>
          Vie associative
        </h2>
      </BlurFade>
      <div className="flex flex-col gap-6">
        {DATA.clubs.map((club, index) => {
          const linked = !!club.href;
          return (
            <BlurFade
              key={club.name}
              delay={BLUR_FADE_DELAY * 2 + index * 0.05}
            >
              <ClubRow href={club.href}>
                <div className="flex items-center gap-x-3 flex-1 min-w-0">
                  <div className="size-8 md:size-10 shrink-0 rounded-full border shadow ring-2 ring-border bg-card overflow-hidden flex items-center justify-center text-muted-foreground">
                    {club.logoUrl ? (
                      <img
                        src={club.logoUrl}
                        alt={club.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      <Users className="size-4" aria-hidden />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <div className="font-semibold leading-none flex items-center gap-2">
                      {club.name}
                      {linked && (
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          aria-hidden
                        />
                      )}
                    </div>
                    <div className="font-sans text-sm text-muted-foreground">
                      <span className="font-medium text-foreground/80">
                        {club.role}
                      </span>
                      {club.description ? ` — ${club.description}` : ""}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                  <span>{club.timeframe}</span>
                </div>
              </ClubRow>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
