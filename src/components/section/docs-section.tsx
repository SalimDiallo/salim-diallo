import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Eye, FileText } from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

type Doc = {
  slug: string;
  title: string;
  description: string;
  category: string;
  file: string;
  date: string;
  tags: readonly string[];
};

function DocCard({ doc }: { doc: Doc }) {
  return (
    <div className="group flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 hover:ring-muted transition-all duration-200">
      <Link
        href={`/docs/${doc.slug}`}
        className="flex flex-col h-full p-5 gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="size-10 shrink-0 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
            <FileText className="size-5" aria-hidden />
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{doc.date}</span>
            <ArrowUpRight
              className="size-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
              aria-hidden
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {doc.category}
          </span>
          <h3 className="font-semibold leading-snug">{doc.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed flex-1">
            {doc.description}
          </p>
        </div>

        {doc.tags && doc.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
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
        )}

        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors mt-auto pt-1">
          <Eye className="size-3.5" aria-hidden />
          <span>Aperçu du document</span>
        </div>
      </Link>
    </div>
  );
}

export default function DocsSection({
  items,
}: {
  items: readonly Doc[];
}) {
  return (
    <section id="docs" className="flex min-h-0 flex-col gap-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((doc, id) => (
          <BlurFade
            key={doc.file}
            delay={BLUR_FADE_DELAY * 2 + id * 0.05}
            className="h-full"
          >
            <DocCard doc={doc} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
