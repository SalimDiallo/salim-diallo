/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "motion/react";
import { ArrowUpRight, ChevronRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

type Project = {
  title: string;
  href?: string;
  dates: string;
  description: string;
  technologies: readonly string[];
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
};

const SWIPE_THRESHOLD = 60;
const SWIPE_VELOCITY = 400;
const SPRING = { type: "spring" as const, stiffness: 200, damping: 22 };

function vibrate(ms = 15) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(ms);
    } catch {
      /* ignored */
    }
  }
}

function Media({ project }: { project: Project }) {
  if (project.video) {
    return (
      <video
        src={project.video}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-56 object-cover bg-muted pointer-events-none"
      />
    );
  }
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-56 object-cover bg-muted pointer-events-none"
        draggable={false}
      />
    );
  }
  return <div className="w-full h-56 bg-muted" />;
}

function TopCard({
  project,
  onSwipe,
  index,
  total,
  exitDir,
}: {
  project: Project;
  onSwipe: (dir: 1 | -1) => void;
  index: number;
  total: number;
  exitDir: 1 | -1;
}) {
  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-200, 0, 200], [-14, 0, 14]);
  const opacity = useTransform(
    dragX,
    [-260, -120, 0, 120, 260],
    [0.3, 1, 1, 1, 0.3],
  );

  // Halo glow on each side, proportional to drag direction.
  const haloRight = useTransform(dragX, [0, SWIPE_THRESHOLD, 200], [0, 0.6, 1]);
  const haloLeft = useTransform(
    dragX,
    [-200, -SWIPE_THRESHOLD, 0],
    [1, 0.6, 0],
  );

  const thresholdHit = useRef(false);

  useEffect(() => {
    const unsub = dragX.on("change", (v) => {
      const beyond = Math.abs(v) >= SWIPE_THRESHOLD;
      if (beyond && !thresholdHit.current) {
        thresholdHit.current = true;
        vibrate(12);
      } else if (!beyond) {
        thresholdHit.current = false;
      }
    });
    return () => unsub();
  }, [dragX]);

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > SWIPE_VELOCITY) {
      vibrate(20);
      onSwipe(1);
    } else if (
      info.offset.x < -SWIPE_THRESHOLD ||
      info.velocity.x < -SWIPE_VELOCITY
    ) {
      vibrate(20);
      onSwipe(-1);
    }
  };

  return (
    <motion.div
      key={project.title}
      style={{ x: dragX, rotate, opacity, touchAction: "pan-y" }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      initial={{ scale: 0.94, y: 14, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{
        x: exitDir * 500,
        rotate: exitDir * 28,
        opacity: 0,
        transition: { duration: 0.32, ease: [0.32, 0.72, 0, 1] },
      }}
      transition={SPRING}
      className="absolute inset-0 flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)] cursor-grab active:cursor-grabbing select-none"
    >
      {/* Right halo (next) — green glow */}
      <motion.div
        aria-hidden
        style={{ opacity: haloRight }}
        className="absolute inset-0 pointer-events-none z-20 rounded-xl"
      >
        <div className="absolute inset-0 rounded-xl ring-2 ring-emerald-500/70 shadow-[inset_-30px_0_60px_-20px_rgba(16,185,129,0.55)]" />
      </motion.div>
      {/* Left halo (skip) — neutral glow */}
      <motion.div
        aria-hidden
        style={{ opacity: haloLeft }}
        className="absolute inset-0 pointer-events-none z-20 rounded-xl"
      >
        <div className="absolute inset-0 rounded-xl ring-2 ring-muted-foreground/70 shadow-[inset_30px_0_60px_-20px_rgba(115,115,115,0.55)]" />
      </motion.div>

      <div className="relative shrink-0">
        <Media project={project} />
        {/* Index badge */}
        <div className="absolute top-2 left-2 font-mono text-[10px] bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur tabular-nums z-10">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </div>
        {project.links && project.links.length > 0 && (
          <div className="absolute bottom-2 right-2 flex flex-wrap gap-1.5 z-10">
            {project.links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-[10px] bg-black text-white hover:bg-black/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1 min-h-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5 min-w-0">
            <h3 className="font-semibold leading-snug truncate">
              {project.title}
            </h3>
            <time className="font-mono text-[11px] text-muted-foreground">
              {project.dates}
            </time>
          </div>
          {project.href && project.href !== "#" && (
            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 size-7 rounded-md border border-border bg-background hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Ouvrir ${project.title}`}
            >
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          )}
        </div>
        <div className="text-xs prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{project.description}</Markdown>
        </div>
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-1">
            {project.technologies.map((tag) => (
              <Badge
                key={tag}
                className="text-[10px] font-medium border border-border h-5 w-fit px-1.5"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function PeekCard({
  project,
  offset,
}: {
  project: Project;
  offset: number;
}) {
  const scale = 1 - offset * 0.04;
  const y = offset * 8;

  return (
    <motion.div
      style={{ zIndex: -offset }}
      initial={{ scale: scale - 0.02, y: y + 4, opacity: 0 }}
      animate={{ scale, y, opacity: 1 }}
      transition={SPRING}
      className="absolute inset-0 flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] pointer-events-none"
    >
      <div className="relative shrink-0 opacity-90">
        <Media project={project} />
      </div>
      <div className="p-4 opacity-80">
        <h3 className="font-semibold leading-snug truncate">{project.title}</h3>
        <time className="font-mono text-[11px] text-muted-foreground">
          {project.dates}
        </time>
      </div>
    </motion.div>
  );
}

export default function ProjectsSwipeStack({
  projects,
}: {
  projects: readonly Project[];
}) {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [exitDir, setExitDir] = useState<1 | -1>(1);

  const total = projects.length;
  const current = projects[index];

  const advance = () => {
    setExitDir(1);
    setHistory((h) => [...h, index]);
    setIndex((i) => (i + 1) % total);
  };

  const back = () => {
    setExitDir(-1);
    if (history.length === 0) {
      setIndex((i) => (i - 1 + total) % total);
    } else {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setIndex(prev);
    }
  };

  if (!current) return null;

  const peek = [1, 2]
    .map((step) => projects[(index + step) % total])
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-3 overflow-x-hidden">
      {/* Stack */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "3 / 4" }}
      >
        {peek.map((p, i) => (
          <PeekCard
            key={`peek-${p.title}`}
            project={p}
            offset={i + 1}
          />
        ))}
        <AnimatePresence mode="popLayout">
          <TopCard
            key={current.title}
            project={current}
            index={index}
            total={total}
            exitDir={exitDir}
            onSwipe={(dir) => {
              if (dir === 1) advance();
              else back();
            }}
          />
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={back}
          className="size-10 inline-flex items-center justify-center rounded-full border border-border bg-background hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Carte précédente"
        >
          <RotateCcw className="size-4" aria-hidden />
        </button>

        <div className="flex items-center gap-1 overflow-x-auto px-2 max-w-[60%]">
          {projects.map((_, i) => (
            <span
              key={i}
              aria-hidden
              className={cn(
                "h-1.5 rounded-full transition-all shrink-0",
                i === index ? "bg-foreground w-5" : "bg-border w-1.5",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={advance}
          className="size-10 inline-flex items-center justify-center rounded-full border border-foreground bg-foreground text-background hover:opacity-90 transition-opacity"
          aria-label="Carte suivante"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>

      <p className="font-mono text-[10px] text-muted-foreground text-center">
        swipe ← → · tap buttons
      </p>
    </div>
  );
}
