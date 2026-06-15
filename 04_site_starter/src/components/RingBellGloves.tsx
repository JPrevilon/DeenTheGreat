"use client";
import {
  useMotionValue,
  useSpring,
  useTransform,
  motion,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";

export default function RingBellGloves() {
  const reduceMotion = useReducedMotion();
  const scrollVelocity = useMotionValue(0);
  const scrollSpring = useSpring(scrollVelocity, { stiffness: 85, damping: 14 });
  // Scroll maps to ±16° extra tilt on the gloves
  const scrollRotate = useTransform(scrollSpring, [-100, 100], [-16, 16]);

  const [bellFlash, setBellFlash] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    let last = window.scrollY;
    const onScroll = () => {
      const now = window.scrollY;
      // Amplify slightly so a normal scroll produces visible swing
      scrollVelocity.set(Math.max(-100, Math.min(100, (now - last) * 2.5)));
      last = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollVelocity, reduceMotion]);

  const handleBellClick = () => {
    if (bellFlash) return;
    setBellFlash(true);
    setTimeout(() => setBellFlash(false), 500);
    window.location.hash = "#home";
  };

  const handleGlovesClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) {
      setClickCount(0);
      window.dispatchEvent(new Event("dtg-crashout-mode"));
    }
  };

  return (
    // pointer-events-none on the wrapper so the absolute positioning never
    // swallows clicks meant for nav links behind it; only the explicit
    // interactive children re-enable pointer events.
    <div className="pointer-events-none absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 flex-col items-center md:flex">

      {/* ── RING BELL ── click navigates home */}
      <motion.button
        type="button"
        className="pointer-events-auto outline-none focus-visible:ring-2 focus-visible:ring-acid/70"
        onClick={handleBellClick}
        whileHover={reduceMotion ? {} : { scale: 1.08 }}
        whileTap={reduceMotion ? {} : { scale: 0.94 }}
        aria-label="Ring bell – go to top"
      >
        <motion.img
          src="/ui/ring-bell.svg"
          alt=""
          className="h-12 w-16 object-contain"
          animate={
            reduceMotion
              ? {}
              : { filter: ["drop-shadow(0 0 10px rgba(196,255,0,0.5))", "drop-shadow(0 0 22px rgba(196,255,0,0.95))", "drop-shadow(0 0 10px rgba(196,255,0,0.5))"] }
          }
          transition={reduceMotion ? {} : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Brief green flash on bell click */}
        <AnimatePresence>
          {bellFlash && (
            <motion.div
              key="bell-flash"
              className="pointer-events-none absolute inset-0 rounded-full bg-acid"
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 2.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── BOXING GLOVES ── click 5× triggers crashout easter egg */}
      <motion.button
        type="button"
        className="pointer-events-auto -mt-1 origin-top outline-none focus-visible:ring-2 focus-visible:ring-acid/60"
        onClick={handleGlovesClick}
        whileTap={reduceMotion ? {} : { scale: 0.92 }}
        aria-label={`Boxing gloves – click ${5 - clickCount} more time${5 - clickCount === 1 ? "" : "s"} for crashout mode`}
      >
        {/*
         * Two-layer composition so idle swing and scroll tilt don't fight:
         *   Outer motion.div  → scroll-driven tilt  (MotionValue in style)
         *   Inner motion.img  → idle pendulum swing  (framer animate)
         * CSS nesting stacks the rotations cleanly.
         */}
        <motion.div
          className="origin-top"
          style={reduceMotion ? {} : { rotate: scrollRotate }}
        >
          <motion.img
            src="/ui/boxing-gloves.svg"
            alt=""
            className="h-20 w-24 origin-top object-contain"
            animate={reduceMotion ? {} : { rotate: [-5, 5, -5] }}
            transition={
              reduceMotion
                ? {}
                : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </motion.div>
      </motion.button>

      {/* Subtle click counter indicator (visible only when count > 0) */}
      <AnimatePresence>
        {clickCount > 0 && (
          <motion.span
            key={clickCount}
            className="pointer-events-none mt-1 font-tech text-[9px] font-black uppercase tracking-[0.3em] text-acid"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ textShadow: "0 0 10px rgba(196,255,0,0.8)" }}
          >
            {clickCount}/5
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
