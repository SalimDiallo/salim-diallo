import BlurFade from "@/components/magicui/blur-fade";
import CertificationCard from "@/components/section/certification-card";
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
    <section id="certifications-page" className="flex flex-col gap-8">
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
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-2">
            Certifications
            <span className="bg-card border border-border rounded-md px-2 py-0.5 text-muted-foreground text-sm">
              {DATA.certifications.length}
            </span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-prose">
            Diplômes et certifications obtenus en data, IA et software
            engineering. Aperçu document/image en lecture seule.
          </p>
        </div>
      </BlurFade>

      <div className="flex flex-col gap-4">
        {DATA.certifications.map((cert, id) => (
          <BlurFade
            key={cert.slug}
            delay={BLUR_FADE_DELAY * 3 + id * 0.05}
          >
            <CertificationCard cert={cert} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
