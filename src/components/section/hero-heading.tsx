"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const ROLES = [
  "des apps full-stack",
  "des pipelines de données",
  "des solutions IA",
  "des bots & automatisations",
] as const;

export default function HeroHeading({
  firstName,
  lastName,
  location,
}: {
  firstName: string;
  lastName?: string;
  location: string;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % ROLES.length);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Top meta line — terminal style */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-2"
      >
        <span className="relative inline-flex size-2">
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
          <span className="relative rounded-full bg-emerald-500 size-2" />
        </span>
        {/* <span>Disponible</span> */}
        {/* <span aria-hidden className="text-border">/</span> */}
        <span>{location}</span>
      </motion.div>

      {/* Greeting + name */}
      <h1 className="font-display flex flex-wrap items-baseline gap-x-3 gap-y-1 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05]">
        <motion.span
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground font-medium"
        >
          Salut, je suis
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.12,
          }}
          className="relative inline-block text-foreground"
        >
          {firstName} {lastName ? lastName : ""}
        </motion.span>
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="inline-block w-[0.55em] h-[0.95em] -mb-[0.05em] bg-foreground align-baseline animate-pulse"
        />
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-foreground"
        >
          .
        </motion.span>
      </h1>

      {/* Sub-headline with rotating role */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
        className="text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed max-w-[620px]"
      >
        Étudiant ingénieur INSEA. Je construis{" "}
        <span className="relative inline-flex items-baseline align-baseline">
          <AnimatePresence mode="wait">
            <motion.span
              key={ROLES[idx]}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "inline-block font-display font-semibold text-foreground",
              )}
            >
              {ROLES[idx]}
            </motion.span>
          </AnimatePresence>
        </span>
        .
      </motion.p>
    </div>
  );
}
