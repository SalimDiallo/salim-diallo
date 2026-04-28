/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Award, FileText, ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const PdfPreview = dynamic(
  () => import("@/components/section/pdf-preview-impl"),
  { ssr: false },
);

type Cert = {
  slug: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  tags?: readonly string[];
  file?: string;
};

function FilePreview({ file, name }: { file: string; name: string }) {
  const [errored, setErrored] = useState(false);
  const isPdf = file.toLowerCase().endsWith(".pdf");

  if (isPdf) {
    return <PdfPreview file={file} title={name} />;
  }

  if (errored) {
    return (
      <div className="w-full aspect-video bg-muted flex flex-col items-center justify-center text-muted-foreground gap-2 text-sm rounded-xl border border-border">
        <ImageIcon className="size-8 opacity-50" aria-hidden />
        <span className="text-xs">Image introuvable</span>
        <code className="text-[10px]">{file}</code>
      </div>
    );
  }

  return (
    <img
      src={file}
      alt={name}
      onError={() => setErrored(true)}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      className="w-full h-auto rounded-xl border border-border bg-card object-contain select-none"
      loading="lazy"
    />
  );
}

export default function CertificationCard({
  cert,
  className,
}: {
  cert: Cert;
  className?: string;
}) {
  const isPdf = cert.file?.toLowerCase().endsWith(".pdf");
  return (
    <article
      className={cn(
        "flex flex-col gap-4 p-5 border border-border rounded-2xl bg-card",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="size-10 shrink-0 rounded-lg border border-border bg-background flex items-center justify-center text-muted-foreground">
          <Award className="size-5" aria-hidden />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <h3 className="font-semibold leading-snug">{cert.name}</h3>
          <span className="text-xs text-muted-foreground">{cert.issuer}</span>
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <Badge
              variant="outline"
              className="text-[11px] font-medium border border-border h-6 w-fit px-2"
            >
              {cert.date}
            </Badge>
            {cert.tags?.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
              >
                {tag}
              </Badge>
            ))}
            {isPdf && (
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <FileText className="size-3" aria-hidden />
                PDF
              </span>
            )}
          </div>
        </div>
      </div>
      {cert.file && <FilePreview file={cert.file} name={cert.name} />}
    </article>
  );
}
