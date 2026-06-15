"use client";
import {
  useMotionValue,
  useSpring,
  useTransform,
  motion,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { useEffect } from "react";

export default function ReactiveArenaBackground() {
  const reduceMotion = useReducedMotion();

  // ── Mouse glow ──────────────────────────────────────────────────────────
  // Raw mouse position (% of viewport). Spring-smoothed so the glow
  // trails the cursor with inertia instead of snapping.
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const glowX = useSpring(mouseX, { stiffness: 28, damping: 18, mass: 0.9 });
  const glowY = useSpring(mouseY, { stiffness: 28, damping: 18, mass: 0.9 });

  // ── Scroll parallax ──────────────────────────────────────────────────────
  // One spring drives all parallax layers; each gets a different output
  // range so layers move at different rates.
  const rawScroll = useMotionValue(0);
  const scrollSpring = useSpring(rawScroll, { stiffness: 60, damping: 24 });
  const gridY  = useTransform(scrollSpring, [0, 3000], [0, -55]);
  const smokeY = useTransform(scrollSpring, [0, 3000], [0, 28]);

  useEffect(() => {
    if (reduceMotion) return;

    // Direct MotionValue.set() — framer-motion batches these internally,
    // so no rAF throttle is needed here.
    const onPointerMove = (e: PointerEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 100);
      mouseY.set((e.clientY / window.innerHeight) * 100);
    };
    const onScroll = () => rawScroll.set(window.scrollY);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll",      onScroll,      { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll",      onScroll);
    };
  }, [mouseX, mouseY, rawScroll, reduceMotion]);

  // MotionTemplate builds the CSS string whenever glowX/glowY update —
  // no React re-render, DOM style is written directly by framer-motion.
  const reactiveGlow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(196,255,0,0.19) 0%, transparent 28%)`;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">

      {/* ── 1. BASE: void black ────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#020302]" />

      {/* ── 2. SMOKE: atmospheric acid-green blobs ─────────────────────
           Drift upward slightly as page scrolls (smokeY parallax).
           Reduced-motion: static, no translate.                          */}
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? {} : { y: smokeY }}
      >
        {/* Top-left corner bloom — blur-xl on mobile, blur-3xl on md+ */}
        <div className="absolute -left-[8%] -top-[6%] h-[58vh] w-[56vw] bg-[radial-gradient(ellipse_at_center,rgba(196,255,0,0.055)_0%,transparent_65%)] blur-xl md:blur-3xl" />
        {/* Bottom-right counter-bloom */}
        <div className="absolute -bottom-[8%] -right-[8%] h-[52vh] w-[50vw] bg-[radial-gradient(ellipse_at_center,rgba(196,255,0,0.042)_0%,transparent_65%)] blur-xl md:blur-3xl" />
        {/* Top-center arena overhead light (white, colder) */}
        <div className="absolute left-1/2 top-0 h-[38vh] w-[62vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.052)_0%,transparent_55%)] blur-lg md:blur-2xl" />
      </motion.div>

      {/* ── 3. GRID: subtle cyber lines ────────────────────────────────
           Scroll parallax shifts the grid up slower than the content,
           giving depth without any 3-D perspective.                      */}
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? {} : { y: gridY }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "repeating-linear-gradient(90deg, rgba(196,255,0,0.04) 0 1px, transparent 1px 80px)",
              "repeating-linear-gradient(0deg,  rgba(196,255,0,0.03) 0 1px, transparent 1px 80px)",
            ].join(", "),
          }}
        />
      </motion.div>

      {/* ── 4. MOUSE GLOW: cursor spotlight ────────────────────────────
           Skipped entirely for reduced-motion; stays at 50 / 50 default
           for touch/pointer-absent devices (looks like a center bloom).  */}
      {reduceMotion ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(196,255,0,0.10) 0%, transparent 28%)",
          }}
        />
      ) : (
        <motion.div className="absolute inset-0" style={{ background: reactiveGlow }} />
      )}

      {/* ── 5. SCAN LINES ──────────────────────────────────────────────
           Static repeating pattern always visible.
           Non-reduced-motion: the overlay drifts downward on a loop,
           simulating a CRT/arena monitor scan.
           Reduced-motion: static lines only (animation set to empty).   */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 h-[200%]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, transparent 0%, transparent 94%, rgba(196,255,0,0.035) 96%, transparent 100%)",
            backgroundSize: "100% 8px",
          }}
          animate={reduceMotion ? {} : { y: ["0%", "50%"] }}
          transition={
            reduceMotion
              ? {}
              : { duration: 12, repeat: Infinity, ease: "linear" }
          }
        />
      </div>

      {/* ── 6. VIGNETTE: darken all four edges ─────────────────────────
           Frames the content and prevents blobs from bleeding too bright. */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 100% 55% at 50% 0%,   transparent 40%, rgba(2,3,2,0.72) 100%)",
            "radial-gradient(ellipse 68% 100% at 0%   50%, transparent 38%, rgba(2,3,2,0.68) 100%)",
            "radial-gradient(ellipse 68% 100% at 100% 50%, transparent 38%, rgba(2,3,2,0.68) 100%)",
            "radial-gradient(ellipse 100% 38% at 50% 100%, transparent 32%, rgba(2,3,2,0.82) 100%)",
          ].join(", "),
        }}
      />
    </div>
  );
}
