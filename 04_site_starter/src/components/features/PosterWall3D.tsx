"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { flyerImages, sectionCopy } from "@/lib/siteContent";

// Per-column 3D tilt angle (degrees) — outer cols lean more, inner lean less
const COL_TILT = [-5.5, -1.8, 1.8, 5.5] as const;

const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
};

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 26 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function PosterWall3D() {
  const [active, setActive]       = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const reduceMotion              = useReducedMotion();

  // Escape key + arrow navigation in modal
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setActive(null); return; }
      if (e.key === "ArrowRight") {
        const next = (activeIdx + 1) % flyerImages.length;
        setActiveIdx(next); setActive(flyerImages[next]);
      }
      if (e.key === "ArrowLeft") {
        const prev = (activeIdx - 1 + flyerImages.length) % flyerImages.length;
        setActiveIdx(prev); setActive(flyerImages[prev]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, activeIdx]);

  const openPoster = (src: string, idx: number) => {
    setActive(src);
    setActiveIdx(idx);
  };

  return (
    <SectionShell
      id="flyers"
      className="py-20 md:py-28"
    >
      {/* Flyers logo heading */}
      <div className="mb-8">
        <img
          src="/brand/headings/flyers-logo-nobg.png"
          alt="Flyers"
          className="h-16 w-auto object-contain md:h-24"
        />
      </div>

      {/* ── 3D perspective grid ─────────────────────────────────────────────── */}
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        style={reduceMotion ? {} : { perspective: "900px", perspectiveOrigin: "50% 35%" }}
        variants={stagger}
        initial={reduceMotion ? "show" : "hidden"}
        animate="show"
      >
        {flyerImages.map((src, i) => {
          const col  = i % 4;
          const tilt = reduceMotion ? 0 : COL_TILT[col];

          return (
            <motion.button
              key={src}
              onClick={() => openPoster(src, i)}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.18] bg-black text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid hover:border-acid/60"
              variants={cardAnim}
              style={reduceMotion ? {} : { rotateY: tilt }}
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      scale:     1.06,
                      rotateY:   0,
                      z:         32,
                      boxShadow: "0 0 44px 6px rgba(196,255,0,0.22), 0 8px 32px rgba(0,0,0,0.65)",
                      transition: { duration: 0.22, ease: "easeOut" },
                    }
              }
              aria-label={`Open flyer ${i + 1} of ${flyerImages.length}`}
            >
              {/* Poster — object-contain preserves all text at any aspect ratio */}
              <img
                src={src}
                alt={`DeenTheGreat event flyer ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-contain opacity-[0.88] transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Poster-wall-frame SVG — HUD corner accent on hover */}
              <img
                src="/ui/poster-wall-frame.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-50"
              />

              {/* Bottom bar — slides in on hover */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-[9px] font-black uppercase tracking-[.38em] text-acid">
                  View Poster
                </p>
              </div>

              {/* Number chip — top-left */}
              <div className="pointer-events-none absolute left-2.5 top-2.5 rounded-md bg-black/70 px-1.5 py-0.5 backdrop-blur-sm">
                <span className="text-[8px] font-black uppercase tracking-[.3em] text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Required concept fine print */}
      <p className="mt-6 text-[10px] uppercase tracking-[.22em] text-white/28">
        Promo archive — private concept preview. Not for redistribution until approved.
      </p>

      {/* ── Poster modal ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="poster-modal"
            className="fixed inset-0 z-[90] flex items-center justify-center p-5 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Poster preview"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/92 backdrop-blur-sm" />

            {/* Poster card */}
            <motion.div
              className="relative z-10 flex max-h-[90vh] max-w-[92vw] flex-col items-center gap-4"
              initial={reduceMotion ? false : { scale: 0.88, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { scale: 0.93, opacity: 0, y: 12 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Acid border frame + image */}
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ boxShadow: "0 0 60px rgba(196,255,0,0.22), 0 0 0 1px rgba(196,255,0,0.45)" }}
              >
                {/* Top accent line */}
                <div className="h-0.5 w-full bg-acid shadow-acid" />

                <img
                  src={active}
                  alt="DeenTheGreat event flyer — full size"
                  className="block max-h-[80vh] max-w-full object-contain"
                  style={{ background: "#000" }}
                />

                {/* Arrow navigation (desktop) */}
                {!reduceMotion && flyerImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const prev = (activeIdx - 1 + flyerImages.length) % flyerImages.length;
                        setActiveIdx(prev); setActive(flyerImages[prev]);
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/75 px-3 py-2 text-[11px] font-black text-white/50 backdrop-blur-sm transition-colors hover:border-acid/55 hover:text-acid"
                      aria-label="Previous poster"
                    >
                      ←
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const next = (activeIdx + 1) % flyerImages.length;
                        setActiveIdx(next); setActive(flyerImages[next]);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/75 px-3 py-2 text-[11px] font-black text-white/50 backdrop-blur-sm transition-colors hover:border-acid/55 hover:text-acid"
                      aria-label="Next poster"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Counter + close row */}
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-[.3em] text-white/30">
                  {activeIdx + 1} / {flyerImages.length}
                </span>
                <button
                  onClick={() => setActive(null)}
                  className="rounded-full border border-white/20 bg-black/70 px-5 py-2 text-[10px] font-black uppercase tracking-[.35em] text-white/50 backdrop-blur-sm transition-colors hover:border-acid/50 hover:text-acid"
                >
                  Close
                </button>
              </div>

              {/* Keyboard hint */}
              <p className="hidden text-[9px] uppercase tracking-[.28em] text-white/[0.18] sm:block">
                ← → to navigate · Esc to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
