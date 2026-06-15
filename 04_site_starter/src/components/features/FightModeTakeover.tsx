"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { fightMode, siteMeta } from "@/lib/siteContent";

// ── Countdown hook ───────────────────────────────────────────────────────────
type Tick = { days: number; hours: number; mins: number; secs: number; past: boolean };

function useFightCountdown(dateStr: string | null): Tick | null {
  const [tick, setTick] = useState<Tick | null>(null);

  useEffect(() => {
    if (!dateStr) return;
    const target = new Date(dateStr).getTime();
    if (isNaN(target)) return;

    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTick({ days: 0, hours: 0, mins: 0, secs: 0, past: true });
        return;
      }
      setTick({
        days:  Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        mins:  Math.floor((diff % 3_600_000)  / 60_000),
        secs:  Math.floor((diff % 60_000)     / 1_000),
        past:  false,
      });
    };

    update();
    const id = setInterval(update, 1_000);
    return () => clearInterval(id);
  }, [dateStr]);

  return tick;
}

const pad = (n: number) => String(n).padStart(2, "0");

// ── Countdown display ────────────────────────────────────────────────────────
function CountdownGrid({ tick }: { tick: Tick }) {
  if (tick.past) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-acid/60 bg-acid/10 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-acid" />
        <span className="text-xs font-black uppercase tracking-[.35em] text-acid">Fight Night</span>
      </div>
    );
  }

  const units = [
    { label: "Days",  val: tick.days  },
    { label: "Hrs",   val: tick.hours },
    { label: "Mins",  val: tick.mins  },
    { label: "Secs",  val: tick.secs  },
  ] as const;

  return (
    <div className="grid max-w-[280px] grid-cols-4 gap-2">
      {units.map(({ label, val }) => (
        <div
          key={label}
          className="rounded-xl border border-acid/30 bg-black/70 px-2 py-3 text-center"
        >
          <p className="font-tech text-2xl font-black tabular-nums text-white">{pad(val)}</p>
          <p className="mt-0.5 text-[9px] font-black uppercase tracking-[.3em] text-acid/65">{label}</p>
        </div>
      ))}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function FightModeTakeover() {
  const reduceMotion = useReducedMotion();
  const countdown    = useFightCountdown(fightMode.date);

  if (!fightMode.enabled) return null;

  return (
    <SectionShell id="fight-mode">
      <motion.div
        className="cyber-panel hud-corner relative overflow-hidden rounded-[2rem] p-8 md:p-12"
        initial={reduceMotion ? false : { opacity: 0, y: 36 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Fight-mode-frame SVG — acts as HUD overlay */}
        <img
          src="/ui/fight-mode-frame.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />

        {/* Green bloom behind the frame */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(196,255,0,0.06), transparent 70%)",
          }}
        />

        {/* Content grid */}
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">

          {/* ── LEFT: Fight info ─────────────────────────────────────────── */}
          <div>
            {/* Eyebrow + live status chip */}
            <div className="flex flex-wrap items-center gap-3">
              <p
                className="text-xs font-black uppercase tracking-[.45em] text-acid"
                style={{ textShadow: "0 0 16px rgba(196,255,0,0.75)" }}
              >
                {fightMode.eyebrow}
              </p>

              <span className="flex items-center gap-1.5 rounded-full border border-acid/30 bg-black/50 px-3 py-1">
                <motion.span
                  className="block h-2 w-2 rounded-full bg-acid"
                  animate={
                    reduceMotion
                      ? {}
                      : { scale: [1, 1.55, 1], opacity: [1, 0.35, 1] }
                  }
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="text-[10px] font-black uppercase tracking-[.35em] text-acid/80">
                  {fightMode.status}
                </span>
              </span>
            </div>

            {/* Main headline */}
            <h2 className="cyber-title mt-4 text-5xl leading-none md:text-6xl xl:text-7xl">
              {fightMode.headline}
            </h2>

            {/* Subheadline */}
            <p className="mt-4 max-w-lg text-base text-white/60">
              {fightMode.subheadline}
            </p>

            {/* Countdown (if date set) or TBA chips */}
            <div className="mt-6">
              {fightMode.date && countdown ? (
                <CountdownGrid tick={countdown} />
              ) : (
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-acid/50 px-4 py-2 text-xs font-black uppercase tracking-[.25em] text-acid">
                    Date: TBA
                  </span>
                  <span className="rounded-full border border-white/15 px-4 py-2 text-xs font-black uppercase tracking-[.25em] text-white/55">
                    Venue: {fightMode.venue}
                  </span>
                </div>
              )}
            </div>

            {/* Join The Greats CTA → Discord */}
            <div className="mt-8">
              <a
                href={siteMeta.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-safe-transition inline-flex items-center gap-2 rounded-full bg-acid px-7 py-3.5 text-sm font-black uppercase tracking-[.25em] text-black shadow-acid hover:brightness-110 active:brightness-90"
              >
                {fightMode.cta}
              </a>
            </div>

            {/* Unconfirmed-safe disclaimer — required, do not remove */}
            <p className="mt-6 text-[10px] font-black uppercase tracking-[.25em] text-white/25">
              Opponent &amp; date pending confirmation · Not official until approved.
            </p>
          </div>

          {/* ── RIGHT: Fighter crest panel ───────────────────────────────── */}
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-acid/20 bg-black/55 p-6 text-center">
            <img
              src="/brand/core/dtg-fighter-crest.png"
              alt="DTG fighter crest"
              className="mx-auto max-h-72 w-auto object-contain"
              style={{
                filter: "drop-shadow(0 0 28px rgba(196,255,0,0.38))",
              }}
            />

            <div className="w-full border-t border-white/10 pt-4">
              <p className="text-[10px] font-black uppercase tracking-[.4em] text-acid/55">
                Next opponent
              </p>
              <p className="mt-1 text-lg font-black uppercase tracking-[.15em] text-white/40">
                Loading…
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[.2em] text-white/22">
                Details update once confirmed
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
