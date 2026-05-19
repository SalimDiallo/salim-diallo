/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  FileText,
  ImageIcon,
  LayoutGrid,
  List,
  Loader2,
  Pin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

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

type ViewMode = "wall" | "list";
type SortDir = "desc" | "asc";

const MONTHS_FR: Record<string, number> = {
  janvier: 1, février: 2, fevrier: 2, mars: 3, avril: 4, mai: 5, juin: 6,
  juillet: 7, août: 8, aout: 8, septembre: 9, octobre: 10, novembre: 11,
  décembre: 12, decembre: 12,
};

function parseDate(d: string): number {
  const [mRaw, yRaw] = d.toLowerCase().trim().split(/\s+/);
  const m = MONTHS_FR[mRaw] ?? 0;
  const y = parseInt(yRaw, 10) || 0;
  return y * 100 + m;
}

function shortDate(d: string): string {
  const [mRaw, yRaw] = d.toLowerCase().trim().split(/\s+/);
  const m = MONTHS_FR[mRaw] ?? 0;
  return `${yRaw || "----"}.${String(m).padStart(2, "0")}`;
}

function shortIssuer(issuer: string): string {
  if (issuer.includes("DataCamp")) return "datacamp";
  if (issuer.includes("IBM")) return "ibm";
  if (issuer.includes("Coursera")) return "coursera";
  return issuer.toLowerCase().split(/\s+/)[0];
}

// Deterministic rotation from slug so polaroids don't reshuffle on re-render.
function rotationFor(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  const range = 5; // -5° to +5°
  return ((Math.abs(h) % (range * 200)) / 100) - range;
}

function PolaroidPreview({ cert }: { cert: Cert }) {
  if (!cert.file) {
    return (
      <div className="w-full aspect-[4/3] bg-muted flex flex-col items-center justify-center text-muted-foreground gap-2 text-xs">
        <ImageIcon className="size-6 opacity-50" aria-hidden />
        <span>No preview</span>
      </div>
    );
  }
  const isPdf = cert.file.toLowerCase().endsWith(".pdf");
  if (isPdf) {
    return <PdfThumb file={cert.file} />;
  }
  return (
    <img
      src={cert.file}
      alt={cert.name}
      className="w-full aspect-[4/3] object-cover bg-muted"
      loading="lazy"
      draggable={false}
    />
  );
}

function PdfThumb({ file }: { file: string }) {
  // Tiny PDF thumb without toolbar — first page only, no interaction.
  // Lazy require react-pdf only on client.
  const [Comp, setComp] = useState<null | {
    Document: typeof import("react-pdf").Document;
    Page: typeof import("react-pdf").Page;
  }>(null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const mod = await import("react-pdf");
      mod.pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      if (mounted) setComp({ Document: mod.Document, Page: mod.Page });
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (errored) {
    return (
      <div className="w-full aspect-[4/3] bg-muted flex flex-col items-center justify-center text-muted-foreground gap-2 text-xs">
        <FileText className="size-6 opacity-50" aria-hidden />
        <span>PDF</span>
      </div>
    );
  }

  if (!Comp) {
    return (
      <div className="w-full aspect-[4/3] bg-muted flex items-center justify-center text-muted-foreground">
        <Loader2 className="size-4 animate-spin" aria-hidden />
      </div>
    );
  }

  const { Document, Page } = Comp;
  return (
    <div className="w-full aspect-[4/3] overflow-hidden bg-muted flex items-start justify-center">
      <Document
        file={file}
        onLoadError={() => setErrored(true)}
        onSourceError={() => setErrored(true)}
        loading={
          <div className="flex items-center justify-center w-full h-full text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden />
          </div>
        }
        error={
          <div className="flex flex-col items-center justify-center w-full h-full text-muted-foreground gap-2 text-xs">
            <FileText className="size-6 opacity-50" aria-hidden />
            <span>PDF</span>
          </div>
        }
      >
        <Page
          pageNumber={1}
          width={420}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="pointer-events-none"
        />
      </Document>
    </div>
  );
}

function Polaroid({
  cert,
  onOpen,
}: {
  cert: Cert;
  onOpen: () => void;
}) {
  const rot = rotationFor(cert.slug);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
      style={{ transform: `rotate(${rot}deg)` }}
      aria-label={`Ouvrir ${cert.name}`}
    >
      {/* Pin */}
      <span
        aria-hidden
        className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-10 size-3 rounded-full bg-red-500 ring-2 ring-red-700/40 shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
      />
      {/* Polaroid frame */}
      <div
        className={cn(
          "bg-white dark:bg-neutral-100 text-neutral-900 p-2.5 pb-3 shadow-[0_10px_25px_-12px_rgba(0,0,0,0.55),0_4px_8px_-4px_rgba(0,0,0,0.4)]",
          "transition-all duration-300 ease-out",
          "group-hover:[transform:rotate(0deg)_scale(1.04)] group-hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7),0_8px_16px_-4px_rgba(0,0,0,0.5)]",
          "will-change-transform",
        )}
        style={{ transformOrigin: "center top" }}
      >
        <div className="relative overflow-hidden border border-neutral-200">
          <PolaroidPreview cert={cert} />
        </div>
        <div className="pt-2 flex flex-col gap-0.5">
          <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 flex items-center justify-between gap-1">
            <span className="truncate">{shortIssuer(cert.issuer)}</span>
            <span className="tabular-nums shrink-0">{shortDate(cert.date)}</span>
          </div>
          <div className="text-xs font-semibold leading-snug line-clamp-2 text-neutral-800">
            {cert.name}
          </div>
        </div>
      </div>
    </button>
  );
}

function CliRow({ cert, onOpen }: { cert: Cert; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full flex items-center gap-2 sm:gap-3 px-2 py-1.5 font-mono text-[11px] sm:text-xs hover:bg-accent/40 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors whitespace-nowrap"
    >
      <span className="text-muted-foreground tabular-nums shrink-0 w-[58px]">
        [{shortDate(cert.date)}]
      </span>
      <span className="text-foreground shrink-0 w-[70px] sm:w-[80px] truncate">
        {shortIssuer(cert.issuer)}
      </span>
      <span className="text-muted-foreground flex-1 min-w-[140px] truncate group-hover:text-foreground transition-colors">
        {cert.slug}
      </span>
      <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        →
      </span>
    </button>
  );
}

function Modal({
  cert,
  onClose,
}: {
  cert: Cert;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 grid place-items-center p-0 sm:p-4 bg-background/80 backdrop-blur-sm overflow-y-auto overscroll-contain"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cert.name}
    >
      <div
        className="relative w-full sm:max-w-3xl h-[100dvh] sm:h-auto sm:max-h-[min(90dvh,calc(100dvh-2rem))] flex flex-col sm:rounded-xl border-0 sm:border sm:border-border bg-card shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border bg-card rounded-t-xl shrink-0">
          <div className="font-mono text-[11px] sm:text-xs text-muted-foreground truncate min-w-0">
            <span className="text-foreground">$ cat</span>{" "}
            {cert.file ?? cert.slug}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="size-8 shrink-0 rounded-md border border-border bg-background hover:bg-accent flex items-center justify-center transition-colors"
            aria-label="Fermer"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
        <div className="p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm sm:text-base font-semibold leading-snug">
              {cert.name}
            </h2>
            <div className="font-mono text-[11px] sm:text-xs text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
              <span>issuer: {shortIssuer(cert.issuer)}</span>
              <span>date: {shortDate(cert.date)}</span>
              {cert.credentialUrl && cert.credentialUrl !== "#" && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:underline"
                >
                  verify ↗
                </a>
              )}
            </div>
            {cert.tags && cert.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1 font-mono text-[10px] sm:text-[11px]">
                {cert.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-border rounded px-1.5 py-0.5 text-muted-foreground"
                  >
                    #{t.toLowerCase().replace(/\s+/g, "-")}
                  </span>
                ))}
              </div>
            )}
          </div>
          {cert.file && <PdfPreview file={cert.file} title={cert.name} />}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function CertificationsWall({
  certs,
}: {
  certs: readonly Cert[];
}) {
  const [query, setQuery] = useState("");
  const [issuerFilter, setIssuerFilter] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<SortDir>("desc");
  const [view, setView] = useState<ViewMode>("wall");
  const [active, setActive] = useState<Cert | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFiltersCount =
    (issuerFilter ? 1 : 0) + (tagFilter ? 1 : 0) + (query ? 1 : 0);

  const clearAll = () => {
    setQuery("");
    setIssuerFilter(null);
    setTagFilter(null);
  };

  const issuers = useMemo(() => {
    const set = new Set<string>();
    for (const c of certs) set.add(shortIssuer(c.issuer));
    return Array.from(set).sort();
  }, [certs]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const c of certs) for (const t of c.tags ?? []) set.add(t);
    return Array.from(set).sort();
  }, [certs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = certs.filter((c) => {
      if (issuerFilter && shortIssuer(c.issuer) !== issuerFilter) return false;
      if (tagFilter && !(c.tags ?? []).includes(tagFilter)) return false;
      if (q) {
        const hay = [
          c.name,
          c.issuer,
          c.slug,
          ...(c.tags ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    out = [...out].sort((a, b) => {
      const da = parseDate(a.date);
      const db = parseDate(b.date);
      return sort === "desc" ? db - da : da - db;
    });
    return out;
  }, [certs, query, issuerFilter, tagFilter, sort]);

  return (
    <div className="flex flex-col gap-4">
      {/* Header — terminal prompt */}
      <div className="font-mono text-[11px] sm:text-xs overflow-hidden">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-muted-foreground break-all">
          <span className="text-foreground">$</span>
          <span>ls ~/certifications</span>
          <span className="text-muted-foreground">
            --sort=date{sort === "desc" ? "-desc" : "-asc"}
          </span>
          {issuerFilter && (
            <span className="text-muted-foreground">
              --issuer={issuerFilter}
            </span>
          )}
          {tagFilter && (
            <span className="text-muted-foreground">
              --tag=&quot;{tagFilter}&quot;
            </span>
          )}
          {query && (
            <span className="text-muted-foreground">
              | grep &quot;{query}&quot;
            </span>
          )}
        </div>
        <div className="text-muted-foreground mt-1">
          <span className="tabular-nums">{filtered.length}</span> /{" "}
          <span className="tabular-nums">{certs.length}</span> results ·{" "}
          {issuers.length} issuers · {tags.length} tags
        </div>
      </div>

      {/* Compact bar : sort + view + filters toggle */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          aria-expanded={filtersOpen}
          aria-controls="cert-filters"
          className={cn(
            "h-9 px-3 inline-flex items-center gap-1.5 border rounded-md text-xs font-mono transition-colors",
            filtersOpen || activeFiltersCount > 0
              ? "border-foreground text-foreground bg-foreground/5"
              : "border-border bg-background text-muted-foreground hover:text-foreground hover:bg-accent",
          )}
        >
          <SlidersHorizontal className="size-3.5" aria-hidden />
          filters
          {activeFiltersCount > 0 && (
            <span className="tabular-nums bg-foreground text-background rounded px-1 text-[10px] leading-tight">
              {activeFiltersCount}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setSort((s) => (s === "desc" ? "asc" : "desc"))}
          className="h-9 px-3 inline-flex items-center gap-1.5 border border-border rounded-md bg-background hover:bg-accent text-xs font-mono transition-colors"
          aria-label="Inverser le tri"
          title={sort === "desc" ? "Récents d'abord" : "Anciens d'abord"}
        >
          {sort === "desc" ? (
            <ArrowDownAZ className="size-3.5" aria-hidden />
          ) : (
            <ArrowUpAZ className="size-3.5" aria-hidden />
          )}
          date
        </button>
        <div className="inline-flex border border-border rounded-md overflow-hidden h-9 font-mono text-xs ml-auto">
          <button
            type="button"
            onClick={() => setView("wall")}
            className={cn(
              "px-3 inline-flex items-center gap-1.5 transition-colors",
              view === "wall"
                ? "bg-foreground text-background"
                : "bg-background text-muted-foreground hover:bg-accent",
            )}
            aria-pressed={view === "wall"}
          >
            <LayoutGrid className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">wall</span>
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            className={cn(
              "px-3 inline-flex items-center gap-1.5 transition-colors border-l border-border",
              view === "list"
                ? "bg-foreground text-background"
                : "bg-background text-muted-foreground hover:bg-accent",
            )}
            aria-pressed={view === "list"}
          >
            <List className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">list</span>
          </button>
        </div>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="h-9 px-3 inline-flex items-center gap-1.5 border border-border rounded-md bg-background hover:bg-accent text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">clear</span>
          </button>
        )}
      </div>

      {/* Collapsible filters panel */}
      {filtersOpen && (
        <div
          id="cert-filters"
          className="flex flex-col gap-3 p-3 border border-border rounded-lg bg-card/50"
        >
          <label className="flex items-center gap-2 border border-border rounded-md bg-background px-2 h-9 font-mono text-xs">
            <Search className="size-3.5 text-muted-foreground shrink-0" aria-hidden />
            <span className="text-muted-foreground shrink-0 hidden sm:inline">grep</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="sql, python..."
              className="flex-1 min-w-0 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Effacer la recherche"
                className="text-muted-foreground hover:text-foreground shrink-0"
              >
                <X className="size-3.5" />
              </button>
            )}
          </label>

          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] sm:text-xs">
            <span className="text-muted-foreground shrink-0">--issuer:</span>
            <button
              type="button"
              onClick={() => setIssuerFilter(null)}
              className={cn(
                "px-2 py-0.5 rounded border transition-colors",
                issuerFilter === null
                  ? "border-foreground text-foreground bg-foreground/5"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              *
            </button>
            {issuers.map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIssuerFilter(issuerFilter === i ? null : i)}
                className={cn(
                  "px-2 py-0.5 rounded border transition-colors",
                  issuerFilter === i
                    ? "border-foreground text-foreground bg-foreground/5"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {i}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] sm:text-xs">
            <span className="text-muted-foreground shrink-0">--tag:</span>
            <button
              type="button"
              onClick={() => setTagFilter(null)}
              className={cn(
                "px-2 py-0.5 rounded border transition-colors",
                tagFilter === null
                  ? "border-foreground text-foreground bg-foreground/5"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              *
            </button>
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTagFilter(tagFilter === t ? null : t)}
                className={cn(
                  "px-2 py-0.5 rounded border transition-colors",
                  tagFilter === t
                    ? "border-foreground text-foreground bg-foreground/5"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                #{t.toLowerCase().replace(/\s+/g, "-")}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="font-mono text-xs text-muted-foreground border border-dashed border-border rounded-lg p-6 text-center">
          <Pin className="size-4 inline-block mr-1 -mt-0.5" aria-hidden /> no
          match. try clearing filters.
        </div>
      )}

      {/* Wall */}
      {view === "wall" && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 pt-6 px-1 sm:px-2">
          {filtered.map((cert) => (
            <Polaroid
              key={cert.slug}
              cert={cert}
              onOpen={() => setActive(cert)}
            />
          ))}
        </div>
      )}

      {/* List */}
      {view === "list" && filtered.length > 0 && (
        <div className="border border-border rounded-lg bg-card/50 p-2 font-mono overflow-x-auto">
          {filtered.map((cert) => (
            <CliRow
              key={cert.slug}
              cert={cert}
              onOpen={() => setActive(cert)}
            />
          ))}
        </div>
      )}

      {active && <Modal cert={active} onClose={() => setActive(null)} />}
    </div>
  );
}
