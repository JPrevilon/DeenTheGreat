"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { mediaPhotos, sectionCopy } from "@/lib/siteContent";

const PHOTOS = mediaPhotos.slice(0, 12);

const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
};
const photoAnim: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function MediaGrid() {
  const [active, setActive]       = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const reduceMotion              = useReducedMotion();

  // Escape + arrow key navigation
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setActive(null); return; }
      if (e.key === "ArrowRight") {
        const next = (activeIdx + 1) % PHOTOS.length;
        setActiveIdx(next); setActive(PHOTOS[next].src);
      }
      if (e.key === "ArrowLeft") {
        const prev = (activeIdx - 1 + PHOTOS.length) % PHOTOS.length;
        setActiveIdx(prev); setActive(PHOTOS[prev].src);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, activeIdx]);

  return (
    <SectionShell id="media">
      {/* Media logo heading */}
      <div className="mb-8">
        <img
          src="/brand/nav/media-nav-logo.png"
          alt="Media"
          className="h-16 w-auto object-contain md:h-24"
        />
      </div>

      {/* ── Photo grid ──────────────────────────────────────────────────── */}
      <motion.div
        className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        variants={stagger}
        initial={reduceMotion ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {PHOTOS.map((photo, i) => (
          <motion.button
            key={photo.src}
            onClick={() => { setActive(photo.src); setActiveIdx(i); }}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
            variants={photoAnim}
            whileHover={reduceMotion ? {} : { scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } }}
            aria-label={`View photo: ${photo.name}`}
          >
            <img
              src={photo.src}
              alt={photo.name}
              loading="lazy"
              className="h-full w-full object-cover opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
            />

            {/* Hover overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-t from-black/65 to-transparent opacity-0 transition-all duration-300 group-hover:border-acid/40 group-hover:opacity-100" />

            {/* View label */}
            <div className="pointer-events-none absolute bottom-2.5 left-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-[9px] font-black uppercase tracking-[.35em] text-acid">View</p>
            </div>

            {/* Index chip */}
            <div className="pointer-events-none absolute right-2.5 top-2.5 rounded-md bg-black/70 px-1.5 py-0.5 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-[8px] font-black uppercase tracking-[.28em] text-white/40">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Required fine print */}
      <p className="mt-6 text-[10px] uppercase tracking-[.22em] text-white/[0.28]">
        Private media archive — concept preview only. Not for redistribution.
      </p>

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="media-lightbox"
            className="fixed inset-0 z-[90] flex items-center justify-center p-5 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo preview"
          >
            <div className="absolute inset-0 bg-black/[0.92] backdrop-blur-sm" />

            <motion.div
              className="relative z-10 flex max-h-[90vh] max-w-[92vw] flex-col items-center gap-4"
              initial={reduceMotion ? false : { scale: 0.88, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ boxShadow: "0 0 0 1px rgba(196,255,0,0.35), 0 0 50px rgba(196,255,0,0.12)" }}
              >
                <img
                  src={active}
                  alt=""
                  className="block max-h-[80vh] max-w-full object-contain"
                  style={{ background: "#000" }}
                />

                {/* Arrow nav */}
                {!reduceMotion && PHOTOS.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const prev = (activeIdx - 1 + PHOTOS.length) % PHOTOS.length;
                        setActiveIdx(prev); setActive(PHOTOS[prev].src);
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/75 px-3 py-2 text-[11px] font-black text-white/50 backdrop-blur-sm transition-colors hover:border-acid/55 hover:text-acid"
                      aria-label="Previous photo"
                    >
                      ←
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const next = (activeIdx + 1) % PHOTOS.length;
                        setActiveIdx(next); setActive(PHOTOS[next].src);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/75 px-3 py-2 text-[11px] font-black text-white/50 backdrop-blur-sm transition-colors hover:border-acid/55 hover:text-acid"
                      aria-label="Next photo"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-[.3em] text-white/30">
                  {activeIdx + 1} / {PHOTOS.length}
                </span>
                <button
                  onClick={() => setActive(null)}
                  className="rounded-full border border-white/20 bg-black/70 px-5 py-2 text-[10px] font-black uppercase tracking-[.35em] text-white/50 backdrop-blur-sm transition-colors hover:border-acid/50 hover:text-acid"
                >
                  Close
                </button>
              </div>

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
