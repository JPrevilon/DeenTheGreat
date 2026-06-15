"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { sectionCopy } from "@/lib/siteContent";

// Horizontal glitch scan bars — positions + timing
const GLITCH_BARS = [
  { top: "13%", h: 2,  delay: 0.04 },
  { top: "29%", h: 4,  delay: 0.14 },
  { top: "51%", h: 2,  delay: 0.07 },
  { top: "68%", h: 3,  delay: 0.20 },
  { top: "84%", h: 2,  delay: 0.10 },
  { top: "42%", h: 1,  delay: 0.26 },
] as const;

const AUTO_DISMISS_MS = 4_200;

export default function EasterEggGlitch() {
  const [show, setShow]   = useState(false);
  const reduceMotion      = useReducedMotion();
  const timerRef          = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = () => {
    setShow(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    const handler = () => {
      setShow(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(dismiss, AUTO_DISMISS_MS);
    };
    window.addEventListener("dtg-crashout-mode", handler);
    return () => {
      window.removeEventListener("dtg-crashout-mode", handler);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="egg"
          className="fixed inset-0 z-[130] flex items-end justify-center pb-10 sm:items-center sm:pb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.08 }}
          // Click backdrop → dismiss
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-label="Crashout mode activated"
        >
          {/* ── Dark backdrop ───────────────────────────────────────── */}
          <div className="absolute inset-0 bg-black/82" />

          {/* ── Acid green pulse — jagged keyframes simulate glitch ── */}
          {!reduceMotion && (
            <motion.div
              className="pointer-events-none absolute inset-0 bg-acid/10"
              animate={{
                opacity: [0.18, 0.42, 0.06, 0.30, 0.08, 0.36, 0],
              }}
              transition={{
                duration: 2.0,
                times:    [0, 0.08, 0.18, 0.32, 0.55, 0.75, 1],
              }}
            />
          )}

          {/* ── Chromatic aberration layers (screen blend) ─────────── */}
          {!reduceMotion && (
            <>
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{ background: "rgba(196,255,0,0.05)", mixBlendMode: "screen" }}
                animate={{ x: [-4, 4, -2, 0], opacity: [0.7, 1, 0.4, 0] }}
                transition={{ duration: 1.1, times: [0, 0.25, 0.65, 1] }}
              />
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{ background: "rgba(0,220,220,0.06)", mixBlendMode: "screen" }}
                animate={{ x: [5, -5, 2, 0], opacity: [0.6, 1, 0.3, 0] }}
                transition={{ duration: 1.1, times: [0, 0.25, 0.65, 1] }}
              />
            </>
          )}

          {/* ── Horizontal glitch scan bars ─────────────────────────── */}
          {!reduceMotion &&
            GLITCH_BARS.map((bar, i) => (
              <motion.div
                key={i}
                className="pointer-events-none absolute left-0 right-0 bg-acid/28"
                style={{ top: bar.top, height: bar.h }}
                animate={{ opacity: [0, 1, 0, 0.9, 0], x: [0, -10, 14, -5, 0] }}
                transition={{
                  duration:    0.38,
                  delay:       bar.delay,
                  repeat:      3,
                  repeatDelay: 0.55,
                }}
              />
            ))}

          {/* ── COB Teaser Card ─────────────────────────────────────── */}
          <motion.div
            className="relative z-10 mx-4 w-full max-w-sm overflow-hidden rounded-2xl border border-acid/55 bg-black/92 backdrop-blur-xl"
            initial={reduceMotion ? false : { scale: 0.86, opacity: 0, y: 24 }}
            animate={
              reduceMotion
                ? {}
                : {
                    scale: [0.86, 1.04, 1],
                    opacity: 1,
                    y: 0,
                    // Brief horizontal shake on entry
                    x: [0, -6, 8, -4, 4, -2, 0],
                  }
            }
            exit={reduceMotion ? undefined : { scale: 0.92, opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            // Prevent backdrop click from bleeding through the card
            onClick={(e) => e.stopPropagation()}
          >
            {/* Acid glow top border accent */}
            <div className="h-0.5 w-full bg-acid shadow-acid" />

            <div className="p-7 text-center">
              {/* CrashoutBoyz logo */}
              <img
                src="/brand/nav/crashoutboyz-nav-logo.png"
                alt="CrashoutBoyz"
                className="mx-auto mb-5 h-10 w-auto object-contain"
                style={{ filter: "drop-shadow(0 0 12px rgba(196,255,0,0.6))" }}
              />

              {/* Glitch headline */}
              <p
                className="cyber-title text-3xl text-acid"
                style={{ textShadow: "0 0 22px rgba(196,255,0,0.9)" }}
              >
                CRASHOUT
              </p>
              <p
                className="cyber-title text-3xl text-acid"
                style={{ textShadow: "0 0 22px rgba(196,255,0,0.9)" }}
              >
                MODE ENABLED
              </p>

              <div className="my-5 h-px bg-acid/25" />

              {/* Body */}
              <p className="text-sm leading-relaxed text-white/65">
                {sectionCopy.crashout.body}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[.2em] text-white/28">
                {sectionCopy.crashout.finePrint}
              </p>

              {/* CTAs */}
              <div className="mt-6 flex flex-col gap-2">
                <a
                  href="#crashoutboyz"
                  onClick={dismiss}
                  className="motion-safe-transition rounded-full bg-acid px-6 py-3 text-xs font-black uppercase tracking-[.25em] text-black shadow-acid hover:brightness-110"
                >
                  {sectionCopy.crashout.cta}
                </a>
                <button
                  type="button"
                  onClick={dismiss}
                  className="text-xs font-black uppercase tracking-[.25em] text-white/30 transition-colors hover:text-white/55"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tap/click hint */}
          <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-[10px] font-black uppercase tracking-[.3em] text-white/22">
            Tap anywhere to dismiss
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
