import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import PdfPreview from "@/components/section/pdf-preview";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export function generateStaticParams() {
  return DATA.docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = DATA.docs.find((d) => d.slug === slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
    },
    robots: { index: false, follow: false },
  };
}

export default async function DocPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = DATA.docs.find((d) => d.slug === slug);
  if (!doc) return notFound();

  return (
    <section id="doc-preview" className="flex flex-col gap-6">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/docs"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Retour aux documents
        </Link>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {doc.category}
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">{doc.title}</h1>
          <p className="text-sm text-muted-foreground">{doc.description}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            <Badge
              variant="outline"
              className="text-[11px] font-medium border border-border h-6 w-fit px-2"
            >
              {doc.date}
            </Badge>
            {doc.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <PdfPreview file={doc.file} title={doc.title} />
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <p className="text-xs text-muted-foreground italic">
          Document fourni en lecture seule. Téléchargement et impression
          désactivés.
        </p>
      </BlurFade>
    </section>
  );
}
