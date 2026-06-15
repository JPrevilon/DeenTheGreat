"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ── Presentation stops — in page order ──────────────────────────────────────
type Stop = { id: string; label: string; short: string; anchor: string };

const STOPS: Stop[] = [
  { id: "intro",    label: "Walkout Intro",  short: "Intro",    anchor: "#home"         },
  { id: "hero",     label: "Hero",           short: "Hero",     anchor: "#home"         },
  { id: "fight",    label: "Fight Mode",     short: "Fight",    anchor: "#fight-mode"   },
  { id: "drop",     label: "CrashoutBoyz",   short: "Drop",     anchor: "#crashoutboyz" },
  { id: "flyers",   label: "Flyer Wall",     short: "Flyers",   anchor: "#flyers"       },
  { id: "sponsors", label: "Sponsors",       short: "Sponsors", anchor: "#sponsors"     },
];

// Sections to watch for active-stop highlighting
const WATCH_IDS = ["home", "fight-mode", "crashoutboyz", "flyers", "sponsors"];

// Map section id → stop index
const SECTION_TO_STOP: Record<string, number> = {
  "home":         1, // hero
  "fight-mode":   2,
  "crashoutboyz": 3,
  "flyers":       4,
  "sponsors":     5,
};

export default function PitchTourBar() {
  const [visible, setVisible]   = useState(false);
  const [active,  setActive]    = useState(0);
  const [open,    setOpen]      = useState(true);
  const reduceMotion            = useReducedMotion();
  const observerRef             = useRef<IntersectionObserver | null>(null);

  // Only render when ?demo=true is in the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("demo") === "true") setVisible(true);
  }, []);

  // Track which section is in view → highlight the correct stop
  useEffect(() => {
    if (!visible) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = SECTION_TO_STOP[entry.target.id];
            if (idx !== undefined) setActive(idx);
          }
        }
      },
      { threshold: 0.25 }
    );

    WATCH_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [visible]);

  const goTo = (stop: Stop) => {
    const el = document.querySelector(stop.anchor);
    if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  const goNext = () => {
    const next = Math.min(active + 1, STOPS.length - 1);
    setActive(next);
    goTo(STOPS[next]);
  };

  const goPrev = () => {
    const prev = Math.max(active - 1, 0);
    setActive(prev);
    goTo(STOPS[prev]);
  };

  const replayIntro = () => {
    sessionStorage.removeItem("dtg-intro-seen");
    window.location.href = window.location.pathname + "?demo=true";
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="pitch-tour-bar"
          className="fixed bottom-0 left-0 right-0 z-[60] border-t border-acid/25 bg-black/92 backdrop-blur-xl"
          initial={reduceMotion ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? undefined : { y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          role="navigation"
          aria-label="Demo presentation tour"
        >
          {/* Top acid line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-acid/55 to-transparent" />

          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2.5 sm:gap-3 sm:px-6">

            {/* DEMO MODE badge */}
            <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-acid/35 bg-acid/[0.08] px-2.5 py-1.5">
              <motion.span
                className="block h-1.5 w-1.5 rounded-full bg-acid"
                animate={reduceMotion ? {} : { opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <span className="text-[8px] font-black uppercase tracking-[.4em] text-acid">
                Demo
              </span>
            </div>

            {/* Divider */}
            <div className="h-5 w-px shrink-0 bg-white/[0.12]" />

            {/* Stop buttons — scrollable row */}
            <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto scrollbar-none">
              {STOPS.map((stop, i) => (
                <button
                  key={stop.id}
                  onClick={() => { setActive(i); goTo(stop); }}
                  aria-current={active === i ? "step" : undefined}
                  aria-label={`Go to ${stop.label}`}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[.2em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid ${
                    active === i
                      ? "bg-acid text-black"
                      : "border border-white/[0.08] bg-white/[0.04] text-white/45 hover:border-acid/35 hover:text-acid/80"
                  }`}
                >
                  <span className={`text-[7px] font-black ${active === i ? "text-black/50" : "text-white/25"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="hidden sm:inline">{stop.short}</span>
                  <span className="sm:hidden">{String(i + 1)}</span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-5 w-px shrink-0 bg-white/[0.12]" />

            {/* Prev / Next arrows */}
            <div className="flex shrink-0 items-center gap-1">
              <button
                onClick={goPrev}
                disabled={active === 0}
                aria-label="Previous section"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] text-[10px] font-black text-white/40 transition-colors hover:border-acid/35 hover:text-acid disabled:opacity-25 disabled:hover:border-white/[0.08] disabled:hover:text-white/40"
              >
                ←
              </button>
              <button
                onClick={goNext}
                disabled={active === STOPS.length - 1}
                aria-label="Next section"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] text-[10px] font-black text-white/40 transition-colors hover:border-acid/35 hover:text-acid disabled:opacity-25 disabled:hover:border-white/[0.08] disabled:hover:text-white/40"
              >
                →
              </button>
            </div>

            {/* Divider */}
            <div className="hidden h-5 w-px shrink-0 bg-white/[0.12] sm:block" />

            {/* Replay intro */}
            <button
              onClick={replayIntro}
              aria-label="Replay walkout intro"
              className="hidden shrink-0 rounded-lg border border-acid/30 bg-acid/[0.06] px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[.22em] text-acid/75 transition-colors hover:bg-acid/[0.14] hover:text-acid sm:block"
            >
              ↺ Replay
            </button>

            {/* Close bar */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close demo tour bar"
              className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded text-[11px] text-white/25 transition-colors hover:text-white/55"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
