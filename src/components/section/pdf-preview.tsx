"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Load the pdf.js-based viewer only on the client.
// `pdfjs-dist` references DOM APIs (DOMMatrix, etc.) at module evaluation
// time, which breaks Next.js' static prerender pass on the server.
const PdfPreviewImpl = dynamic(() => import("./pdf-preview-impl"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-3/4 sm:aspect-4/3 border border-border rounded-xl bg-card flex items-center justify-center text-muted-foreground gap-2 text-sm">
      <Loader2 className="size-4 animate-spin" aria-hidden />
      Initialisation du visualiseur…
    </div>
  ),
});

export default function PdfPreview(props: { file: string; title: string }) {
  return <PdfPreviewImpl {...props} />;
}
