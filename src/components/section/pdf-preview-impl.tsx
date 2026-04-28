"use client";

import {
    ChevronLeft,
    ChevronRight,
    FileWarning,
    Loader2,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Worker is copied from `pdfjs-dist/build/pdf.worker.min.mjs` to /public/
// at install time (see scripts/copy-pdf-worker.mjs). Serving locally avoids
// CDN version mismatches and keeps the viewer working offline.
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const MIN_SCALE = 0.6;
const MAX_SCALE = 2.4;
const SCALE_STEP = 0.2;

export default function PdfPreview({
  file,
  title,
}: {
  file: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [errored, setErrored] = useState(false);

  // Track container width for responsive page sizing.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        // Reserve a little for padding.
        setWidth(Math.max(280, Math.floor(e.contentRect.width - 24)));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Block common save/print shortcuts while focused on the viewer.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ["s", "p"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, []);

  const documentOptions = useMemo(() => ({ isEvalSupported: false }), []);

  const goPrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const goNext = () =>
    setPageNumber((p) => Math.min(numPages ?? p, p + 1));
  const zoomIn = () =>
    setScale((s) => Math.min(MAX_SCALE, Number((s + SCALE_STEP).toFixed(2))));
  const zoomOut = () =>
    setScale((s) => Math.max(MIN_SCALE, Number((s - SCALE_STEP).toFixed(2))));

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      className="relative w-full border border-border rounded-xl bg-card select-none focus:outline-none flex flex-col"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 p-2 border-b border-border bg-muted/30 rounded-t-xl">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goPrev}
            disabled={pageNumber <= 1}
            className="size-8 rounded-md border border-border bg-background hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            aria-label="Page précédente"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <span className="text-xs tabular-nums text-muted-foreground px-2 min-w-[64px] text-center">
            {pageNumber} / {numPages ?? "…"}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={!!numPages && pageNumber >= numPages}
            className="size-8 rounded-md border border-border bg-background hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            aria-label="Page suivante"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={zoomOut}
            disabled={scale <= MIN_SCALE}
            className="size-8 rounded-md border border-border bg-background hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            aria-label="Dézoomer"
          >
            <ZoomOut className="size-4" aria-hidden />
          </button>
          <span className="text-xs tabular-nums text-muted-foreground px-2 min-w-[44px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={scale >= MAX_SCALE}
            className="size-8 rounded-md border border-border bg-background hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            aria-label="Zoomer"
          >
            <ZoomIn className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      {/* Document area */}
      <div className="relative flex justify-center bg-muted/40 p-3 overflow-auto min-h-[320px]">
        {errored ? (
          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground text-sm py-12 text-center">
            <FileWarning className="size-6" aria-hidden />
            Impossible d&apos;afficher ce document.
            <span className="text-xs">
              Vérifiez que le fichier <code>{file}</code> est bien présent.
            </span>
          </div>
        ) : (
          <Document
            file={file}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={() => setErrored(true)}
            onSourceError={() => setErrored(true)}
            loading={
              <div className="flex items-center gap-2 text-muted-foreground text-sm py-12">
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Chargement du document…
              </div>
            }
            error={
              <div className="flex flex-col items-center gap-2 text-muted-foreground text-sm py-12 text-center">
                <FileWarning className="size-6" aria-hidden />
                Document introuvable.
              </div>
            }
            options={documentOptions}
          >
            <Page
              pageNumber={pageNumber}
              width={width}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-md rounded-sm overflow-hidden"
              loading={
                <div className="flex items-center gap-2 text-muted-foreground text-sm py-12">
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Rendu en cours…
                </div>
              }
            />
          </Document>
        )}
      </div>

      {/* Watermark accessibility hint */}
      <span className="sr-only">Aperçu lecture seule de : {title}</span>
    </div>
  );
}
