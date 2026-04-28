import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { ArrowRight, ArrowUpRight, Sparkles, Trophy } from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default function CertificationsSummary() {
  const certs = DATA.certifications;
  const total = certs.length;

  // Featured: first entry (most representative, e.g. the career track).
  const featured = certs[0];
  const featuredHref: string | undefined = featured?.credentialUrl;
  const featuredLinked = !!featuredHref && featuredHref !== "#";

  // Group by issuer family (DataCamp vs Coursera/IBM/etc.).
  const issuerCounts = certs.reduce<Record<string, number>>((acc, c) => {
    const key = c.issuer.includes("DataCamp")
      ? "DataCamp"
      : c.issuer.includes("Coursera") || c.issuer.includes("IBM")
        ? "Coursera"
        : c.issuer;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  // Unique themes across all tags, capped to keep the cloud breathable.
  const themes = Array.from(
    new Set(certs.flatMap((c) => c.tags ?? [])),
  ).slice(0, 12);

  return (
    <section id="certifications" className="flex min-h-0 flex-col gap-y-4">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h2 className="text-xl font-bold flex items-center gap-2">
          Certifications
          <span className="bg-card border border-border rounded-md px-2 py-0.5 text-muted-foreground text-sm font-medium">
            {total}
          </span>
        </h2>
      </BlurFade>

      {/* Featured cert — hero card */}
      {featured && (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          {(() => {
            const inner = (
              <div className="relative overflow-hidden p-4 rounded-xl border border-border bg-linear-to-br from-card via-card to-accent/30 hover:ring-2 hover:ring-muted transition-all duration-200">
                <div
                  aria-hidden
                  className="absolute -top-10 -right-10 size-32 rounded-full bg-emerald-500/10 blur-2xl"
                />
                <div className="relative flex items-start gap-3">
                  <div className="size-10 shrink-0 rounded-lg border border-border bg-card flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Trophy className="size-5" aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Mise en avant
                    </div>
                    <div className="font-semibold leading-snug flex items-center gap-2">
                      {featured.name}
                      {featuredLinked && (
                        <ArrowUpRight
                          className="size-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          aria-hidden
                        />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {featured.issuer} · {featured.date}
                    </div>
                    {featured.tags && featured.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {featured.tags.map((tag) => (
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
              </div>
            );
            return featuredLinked && featuredHref ? (
              <Link
                href={featuredHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
              >
                {inner}
              </Link>
            ) : (
              <div className="group">{inner}</div>
            );
          })()}
        </BlurFade>
      )}

      {/* Issuer counts */}
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="flex flex-wrap gap-2">
          {Object.entries(issuerCounts).map(([issuer, count]) => (
            <div
              key={issuer}
              className="inline-flex items-center gap-2 h-8 px-3 rounded-full border border-border bg-card text-sm"
            >
              <span className="font-medium">{issuer}</span>
              <span className="text-xs tabular-nums text-muted-foreground">
                ×{count}
              </span>
            </div>
          ))}
        </div>
      </BlurFade>

      {/* Theme cloud */}
      {themes.length > 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="flex flex-wrap items-center gap-1.5">
            <Sparkles
              className="size-3.5 text-muted-foreground mr-1"
              aria-hidden
            />
            {themes.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[11px] font-medium border border-border h-6 px-2"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </BlurFade>
      )}

      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <Link
          href="/certifications"
          className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:bg-accent/50 hover:ring-2 hover:ring-muted text-sm font-medium transition-all duration-200 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Voir les {total} justificatifs
          <ArrowRight
            className="size-4 group-hover:translate-x-0.5 transition-transform"
            aria-hidden
          />
        </Link>
      </BlurFade>
    </section>
  );
}
