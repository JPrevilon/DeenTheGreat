"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { crashoutStates } from "@/lib/siteContent";

// Segment fill colors: intensity ramps up across the 5 states
const SEG_COLORS = [
  "bg-acid/50",  // 0 CALM
  "bg-acid/65",  // 1 LOCKED IN
  "bg-acid/80",  // 2 PRESSURE RISING
  "bg-acid/95",  // 3 CRASHOUT MODE
  "bg-acid",     // 4 BELL RINGS
] as const;

export default function CrashoutMeter() {
  const [level, setLevel]     = useState(0);
  const [crashed, setCrashed] = useState(false);
  const reduceMotion          = useReducedMotion();
  const resetRef              = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const computeLevel = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const progress = window.scrollY / max;
      setLevel(Math.min(4, Math.floor(progress * 5)));
    };

    const onCrashout = () => {
      setCrashed(true);
      setLevel(4);
      if (resetRef.current) clearTimeout(resetRef.current);
      resetRef.current = setTimeout(() => {
        setCrashed(false);
        computeLevel();
      }, 5_000);
    };

    computeLevel();
    window.addEventListener("scroll",           computeLevel, { passive: true });
    window.addEventListener("dtg-crashout-mode", onCrashout);
    return () => {
      window.removeEventListener("scroll",           computeLevel);
      window.removeEventListener("dtg-crashout-mode", onCrashout);
      if (resetRef.current) clearTimeout(resetRef.current);
    };
  }, []);

  const hot   = crashed || level >= 3;
  const label = crashoutStates[level];

  return (
    <aside
      aria-label="Crashout Meter"
      className={`fixed bottom-5 right-5 z-50 hidden w-64 rounded-2xl border backdrop-blur-xl transition-colors duration-500 md:block ${
        crashed
          ? "border-acid bg-acid/10 shadow-acid"
          : hot
          ? "border-acid/55 bg-black/72"
          : "border-acid/22 bg-black/65"
      }`}
    >
      <div className="p-4">

        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-[.45em] text-white/40">
            Crashout Meter
          </span>
          <span className="text-[9px] font-black uppercase tracking-[.3em] text-acid/55">
            {level + 1} / 5
          </span>
        </div>

        {/* Decorative SVG strip */}
        <img
          src="/ui/crashout-meter.svg"
          alt=""
          aria-hidden="true"
          className="mb-3 w-full opacity-30"
        />

        {/* 5-segment HUD bar */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) => {
            const filled = i <= level;
            const isTop  = i === level && filled;
            return (
              <motion.div
                key={i}
                className={`h-2.5 flex-1 rounded-sm transition-colors duration-300 ${
                  filled ? SEG_COLORS[level] : "bg-white/10"
                }`}
                animate={
                  isTop && crashed && !reduceMotion
                    ? { opacity: [1, 0.3, 1] }
                    : {}
                }
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            );
          })}
        </div>

        {/* State label — transitions between states */}
        <div className="mt-3 min-h-[18px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={label}
              className={`text-[11px] font-black uppercase tracking-[.38em] ${
                hot ? "text-acid" : "text-white/50"
              }`}
              style={hot ? { textShadow: "0 0 12px rgba(196,255,0,0.72)" } : undefined}
              initial={reduceMotion ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
            >
              {label}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}
