"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "intro-played-v1";
const DURATION_MS = 2400;

export default function IntroOverlay({ name }: { name: string }) {
  const [show, show_] = useState<boolean | null>(null);
  const reduced = useReducedMotion();

  // Decide on mount whether to show the intro (once per browser session).
  useEffect(() => {
    try {
      const played = sessionStorage.getItem(STORAGE_KEY);
      if (played) {
        show_(false);
        return;
      }
      sessionStorage.setItem(STORAGE_KEY, "1");
      show_(true);
    } catch {
      show_(true);
    }
  }, []);

  // Auto-dismiss after the intro plays.
  useEffect(() => {
    if (!show) return;
    const dur = reduced ? 600 : DURATION_MS;
    const t = setTimeout(() => show_(false), dur);
    return () => clearTimeout(t);
  }, [show, reduced]);

  // Lock body scroll while intro is visible.
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  if (show === null) return null;

  const letters = name.toUpperCase().split("");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          aria-hidden
          className="fixed inset-0 z-100 flex items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
          }}
        >
          {/* Subtle radial accent */}
          <motion.div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, color-mix(in oklab, var(--foreground) 10%, transparent) 0%, transparent 70%)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Sliding line above */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+80px)] h-px bg-foreground origin-center"
            initial={{ width: 0 }}
            animate={{ width: 220 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.05,
            }}
          />

          {/* Name */}
          <h1 className="font-display flex items-end gap-x-1 sm:gap-x-1.5 text-foreground select-none">
            <motion.span
              aria-hidden
              className="text-2xl sm:text-4xl md:text-5xl font-medium leading-none text-muted-foreground self-end pb-1 sm:pb-2"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              ~/
            </motion.span>
            {letters.map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                className="inline-block text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-none"
                initial={{ y: "120%", opacity: 0, filter: "blur(8px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                exit={{
                  y: "-30%",
                  opacity: 0,
                  filter: "blur(6px)",
                  transition: {
                    duration: 0.45,
                    ease: [0.65, 0, 0.35, 1],
                    delay: i * 0.015,
                  },
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.18 + i * 0.045,
                }}
                style={ch === " " ? { width: "0.5em" } : undefined}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
            {/* Blinking terminal caret */}
            <motion.span
              aria-hidden
              className="inline-block w-[0.5em] h-[0.85em] sm:h-[1em] bg-foreground ml-1 self-end mb-1.5 sm:mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0, 0, 1] }}
              transition={{
                duration: 1.4,
                ease: "linear",
                delay: 0.18 + letters.length * 0.045,
                repeat: Infinity,
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            />
          </h1>

          {/* Sliding line below */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(50%+72px)] h-px bg-foreground origin-center"
            initial={{ width: 0 }}
            animate={{ width: 220 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.05,
            }}
          />

          {/* Tagline */}
          <motion.p
            className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[calc(50%+108px)] text-[11px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.18 + letters.length * 0.045,
            }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            Data · Software · IA
          </motion.p>

          {/* Wipe-out reveal */}
          <motion.div
            className="absolute inset-0 bg-foreground origin-bottom pointer-events-none"
            initial={{ scaleY: 0 }}
            exit={{
              scaleY: 1,
              transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
