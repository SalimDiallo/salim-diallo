import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { ArrowRight, ArrowUpRight, Award } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const BLUR_FADE_DELAY = 0.04;

function CertRow({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) {
  const className =
    "group flex items-start gap-x-3 justify-between p-4 rounded-xl border border-border hover:bg-accent/40 hover:ring-2 hover:ring-muted transition-all duration-200";
  if (href && href !== "#") {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={className + " focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"}
      >
        {children}
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
}

export default function CertificationsSection() {
  return (
    <section id="certifications" className="flex min-h-0 flex-col gap-y-4">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h2 className="text-xl font-bold">Certifications</h2>
      </BlurFade>
      <div className="flex flex-col gap-3">
        {DATA.certifications.map((cert, index) => {
          const linked = !!cert.credentialUrl && cert.credentialUrl !== "#";
          return (
            <BlurFade
              key={cert.name}
              delay={BLUR_FADE_DELAY * 2 + index * 0.05}
            >
              <CertRow href={cert.credentialUrl}>
                <div className="flex items-start gap-x-3 flex-1 min-w-0">
                  <div className="size-9 shrink-0 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                    <Award className="size-4" aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="font-semibold leading-snug flex items-center gap-2">
                      {cert.name}
                      {linked && (
                        <ArrowUpRight
                          className="size-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          aria-hidden
                        />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {cert.issuer}
                    </div>
                    {cert.tags && cert.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cert.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-[10px] font-medium border border-border h-5 w-fit px-1.5"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                  <span>{cert.date}</span>
                </div>
              </CertRow>
            </BlurFade>
          );
        })}
      </div>

      <BlurFade delay={BLUR_FADE_DELAY * 6}>
        <Link
          href="/certifications"
          className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:bg-accent/50 hover:ring-2 hover:ring-muted text-sm font-medium transition-all duration-200 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Voir tous les justificatifs
          <ArrowRight
            className="size-4 group-hover:translate-x-0.5 transition-transform"
            aria-hidden
          />
        </Link>
      </BlurFade>
    </section>
  );
}
