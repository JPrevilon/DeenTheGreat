"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Phase = "tunnel" | "flash" | "ropes" | "bell";

// Camera flash positions across the crowd zone
const CROWD_FLASHES = [
  { left: "13%", top: "68%", delay: 0.65 },
  { left: "74%", top: "71%", delay: 1.15 },
  { left: "31%", top: "62%", delay: 1.80 },
  { left: "83%", top: "59%", delay: 2.25 },
  { left: "7%",  top: "73%", delay: 2.85 },
  { left: "56%", top: "66%", delay: 3.30 },
  { left: "89%", top: "69%", delay: 3.75 },
  { left: "21%", top: "71%", delay: 4.00 },
] as const;

export default function WalkoutIntro() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<Phase>("tunnel");
  const reduceMotion  = useReducedMotion();
  // Detect touch/coarse-pointer devices — checked inside useEffect to avoid SSR mismatch
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = window.matchMedia("(pointer: coarse)").matches;

    const params    = new URLSearchParams(window.location.search);
    const forceDemo = params.get("demo") === "true";
    const seen      = sessionStorage.getItem("dtg-intro-seen");

    if (!seen || forceDemo) {
      setShow(true);
      setPhase("tunnel");

      // Fast path: reduced-motion OR touch/mobile — brief static reveal
      if (reduceMotion || isMobileRef.current) {
        const t = setTimeout(() => {
          sessionStorage.setItem("dtg-intro-seen", "true");
          setShow(false);
        }, 1500);
        return () => clearTimeout(t);
      }

      // Full 5–7 second cinematic sequence (desktop only)
      const ts = [
        setTimeout(() => setPhase("flash"),  4200),
        setTimeout(() => setPhase("ropes"),  4650),
        setTimeout(() => setPhase("bell"),   5350),
        setTimeout(() => {
          sessionStorage.setItem("dtg-intro-seen", "true");
          setShow(false);
        }, 6900),
      ];
      return () => ts.forEach(clearTimeout);
    }
  }, [reduceMotion]);

  const skip = () => {
    sessionStorage.setItem("dtg-intro-seen", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="walkout-intro"
          className="fixed inset-0 z-[100] select-none overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeIn" }}
        >
          {/* ── REDUCED MOTION / MOBILE: static reveal ── */}
          {(reduceMotion || isMobileRef.current) ? (
            <motion.div
              className="flex h-full flex-col items-center justify-center gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              <p
                className="text-xs font-black uppercase tracking-[0.55em] text-acid"
                style={{ textShadow: "0 0 18px rgba(196,255,0,0.8)" }}
              >
                Entering the Arena
              </p>
              <img
                src="/brand/hero/hero-wordmark-wide.png"
                alt="Deen The Great"
                className="w-[min(620px,80vw)]"
              />
            </motion.div>
          ) : (
            <>
              {/* ════════════════════════════════
                  LAYER 1 — TUNNEL (0 → 4.2 s)
                  Runs from mount; elements hold
                  their final state under the flash.
                  ════════════════════════════════ */}

              {/* Radial depth pulse — forward momentum illusion */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(196,255,0,0.11) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 2.7], opacity: [0.35, 0.90, 0.10] }}
                transition={{ duration: 4.2, ease: "easeIn" }}
              />

              {/* Cyber grid — floor rushing toward viewer */}
              <motion.div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-[52vh]"
                style={{
                  backgroundImage: [
                    "repeating-linear-gradient(90deg,  rgba(196,255,0,0.07) 0 1px, transparent 1px 80px)",
                    "repeating-linear-gradient(180deg, rgba(196,255,0,0.05) 0 1px, transparent 1px 50px)",
                  ].join(","),
                  transformOrigin: "50% 100%",
                  transform: "perspective(280px) rotateX(34deg)",
                }}
                animate={{ opacity: [0, 0.85, 0.25], y: [28, 0] }}
                transition={{ duration: 4.2, ease: "easeOut" }}
              />

              {/* Cyber grid — ceiling */}
              <motion.div
                className="pointer-events-none absolute top-0 left-0 right-0 h-[28vh]"
                style={{
                  backgroundImage: [
                    "repeating-linear-gradient(90deg,  rgba(196,255,0,0.04) 0 1px, transparent 1px 80px)",
                    "repeating-linear-gradient(180deg, rgba(196,255,0,0.04) 0 1px, transparent 1px 50px)",
                  ].join(","),
                  transformOrigin: "50% 0%",
                  transform: "perspective(280px) rotateX(-34deg)",
                }}
                animate={{ opacity: [0, 0.45, 0.15] }}
                transition={{ duration: 4.2 }}
              />

              {/* Crowd silhouettes — left bank */}
              <motion.div
                className="pointer-events-none absolute bottom-0 left-0 h-[42vh] w-[43%]"
                style={{
                  clipPath:
                    "polygon(0% 100%, 5% 42%, 11% 68%, 19% 30%, 27% 54%, 34% 24%, 43% 50%, 52% 32%, 60% 56%, 69% 28%, 77% 52%, 86% 36%, 95% 62%, 100% 100%)",
                  background: "rgba(255,255,255,0.038)",
                }}
                animate={{ opacity: [0, 0.85, 0.70, 0.45], y: [10, 0] }}
                transition={{ duration: 4.2 }}
              />

              {/* Crowd silhouettes — right bank */}
              <motion.div
                className="pointer-events-none absolute bottom-0 right-0 h-[42vh] w-[43%]"
                style={{
                  clipPath:
                    "polygon(0% 100%, 5% 62%, 14% 36%, 23% 52%, 32% 28%, 41% 56%, 50% 32%, 58% 50%, 67% 24%, 75% 54%, 82% 30%, 91% 68%, 95% 42%, 100% 100%)",
                  background: "rgba(255,255,255,0.038)",
                }}
                animate={{ opacity: [0, 0.85, 0.70, 0.45], y: [10, 0] }}
                transition={{ duration: 4.2, delay: 0.12 }}
              />

              {/* Camera flashes — pops of white light in the crowd */}
              {CROWD_FLASHES.map((f, i) => (
                <motion.div
                  key={`cf-${i}`}
                  className="pointer-events-none absolute h-2 w-2 rounded-full bg-white"
                  style={{ left: f.left, top: f.top }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 2.2, 0] }}
                  transition={{ duration: 0.13, delay: f.delay }}
                />
              ))}

              {/* Spotlight cone from above */}
              <motion.div
                className="pointer-events-none absolute top-0 left-1/2 h-[65vh] w-[52vw] -translate-x-1/2"
                style={{
                  background: "linear-gradient(to bottom, rgba(255,255,255,0.11), transparent)",
                  clipPath: "polygon(22% 0%, 78% 0%, 100% 100%, 0% 100%)",
                }}
                animate={{ opacity: [0, 0.55, 0.85, 0.25], scaleX: [0.6, 1, 1.12] }}
                transition={{ duration: 4.2 }}
              />

              {/* "ENTERING THE ARENA" label */}
              <motion.div
                className="pointer-events-none absolute top-[25%] left-1/2 -translate-x-1/2 whitespace-nowrap"
                animate={{ opacity: [0, 1, 1, 0], y: [14, 0, 0, -8] }}
                transition={{ duration: 4.0, times: [0, 0.12, 0.80, 1.0] }}
              >
                <p
                  className="font-tech text-[10px] font-black uppercase tracking-[0.55em] text-acid sm:text-sm"
                  style={{ textShadow: "0 0 18px rgba(196,255,0,0.9), 0 0 38px rgba(196,255,0,0.45)" }}
                >
                  Entering the Arena
                </p>
              </motion.div>

              {/* Wordmark — materialises mid-tunnel, fades before flash */}
              <motion.div
                className="pointer-events-none absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2"
                animate={{
                  opacity: [0, 0, 0.88, 0.88, 0],
                  scale:   [1.22, 1.12, 1.0, 1.0, 0.94],
                }}
                transition={{ duration: 4.2, times: [0, 0.20, 0.40, 0.85, 1.0] }}
              >
                <img
                  src="/brand/hero/hero-wordmark-wide.png"
                  alt="Deen The Great"
                  className="w-[min(820px,86vw)]"
                />
              </motion.div>

              {/* ════════════════════════════════
                  LAYER 2 — WHITE FLASH (4.2 s)
                  Crowd camera burst fills screen.
                  ════════════════════════════════ */}
              <AnimatePresence>
                {phase === "flash" && (
                  <motion.div
                    key="white-flash"
                    className="pointer-events-none absolute inset-0 bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.65] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                  />
                )}
              </AnimatePresence>

              {/* ════════════════════════════════
                  LAYER 3 — RING ROPES (4.65 s)
                  Ropes slide up; wordmark returns.
                  ════════════════════════════════ */}
              <AnimatePresence>
                {(phase === "ropes" || phase === "bell") && (
                  <motion.div
                    key="ropes-layer"
                    className="pointer-events-none absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                  >
                    {/* Arena floor ambient glow */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[32vh]"
                      style={{ background: "linear-gradient(to top, rgba(255,255,255,0.055), transparent)" }}
                    />

                    {/* Ring ropes slide up */}
                    <motion.img
                      src="/ui/ring-ropes.svg"
                      alt=""
                      className="absolute bottom-0 left-1/2 w-[120vw] max-w-none -translate-x-1/2"
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.52, ease: "easeOut" }}
                    />

                    {/* Wordmark re-enters clean */}
                    <motion.div
                      className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 text-center"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.38 }}
                    >
                      <img
                        src="/brand/hero/hero-wordmark-wide.png"
                        alt="Deen The Great"
                        className="mx-auto w-[min(820px,86vw)]"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ════════════════════════════════
                  LAYER 4 — BELL HIT (5.35 s)
                  Acid green flash + swinging bell.
                  ════════════════════════════════ */}
              <AnimatePresence>
                {phase === "bell" && (
                  <motion.div
                    key="bell-layer"
                    className="pointer-events-none absolute inset-0 flex items-start justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {/* Acid flash flood */}
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: "rgba(196,255,0,0.20)" }}
                      animate={{ opacity: [1, 0.55, 0] }}
                      transition={{ duration: 1.55 }}
                    />

                    {/* Ring bell — swings on impact */}
                    <motion.img
                      src="/ui/ring-bell.svg"
                      alt=""
                      className="relative z-10 mt-[27vh] h-16 w-16 sm:h-20 sm:w-20"
                      initial={{ scale: 0.45, rotate: -28, opacity: 0 }}
                      animate={{
                        scale:   [0.45, 1.35, 1.0,  1.0,  0.85],
                        rotate:  [-28,  22,   -12,   6,    0],
                        opacity: [0,    1,     1,    0.85,  0],
                      }}
                      transition={{ duration: 1.55 }}
                      style={{
                        filter: "drop-shadow(0 0 14px rgba(196,255,0,0.9)) drop-shadow(0 0 28px rgba(196,255,0,0.5))",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Skip Intro — always accessible */}
              <button
                onClick={skip}
                className="absolute bottom-7 right-7 z-10 rounded-full border border-acid/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-acid transition-all hover:bg-acid hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-acid"
              >
                Skip Intro
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
