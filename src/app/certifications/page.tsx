import BlurFade from "@/components/magicui/blur-fade";
import CertificationsWall from "@/components/section/certifications-wall";
import { DATA } from "@/data/resume";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Certifications",
  description: `Certifications obtenues par ${DATA.name} en data, IA et software engineering.`,
  openGraph: {
    title: "Certifications",
    description: `Certifications obtenues par ${DATA.name} en data, IA et software engineering.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Certifications",
    description: `Certifications obtenues par ${DATA.name} en data, IA et software engineering.`,
  },
};

const BLUR_FADE_DELAY = 0.04;

export default function CertificationsPage() {
  return (
    <section id="certifications-page" className="flex flex-col gap-6">
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
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <span aria-hidden className="text-muted-foreground">●</span>
            Certifications
            <span className="font-mono bg-card border border-border rounded-md px-2 py-0.5 text-muted-foreground text-sm">
              {DATA.certifications.length}
            </span>
          </h1>
          <p className="font-mono text-xs text-muted-foreground">
            # mur des justificatifs — filtre, trie, clique pour zoomer.
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <CertificationsWall certs={DATA.certifications} />
      </BlurFade>
    </section>
  );
}
