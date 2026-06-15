"use client";
import { useState } from "react"; // isLive state kept for future live detection
import { motion, useReducedMotion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { liveHub, siteMeta } from "@/lib/siteContent";

const COMMAND_LINKS = [
  {
    label: "Watch Live on Kick",
    sub:   "kick.com/deenthegreat",
    href:  siteMeta.kickUrl,
    primary: true,
  },
  {
    label: "Join The Greats",
    sub:   "Discord community",
    href:  siteMeta.discordUrl,
    primary: false,
  },
  {
    label: "Kickbot TTS",
    sub:   "Stream support link",
    href:  siteMeta.ttsUrl,
    primary: false,
  },
] as const;

const STREAM_STATS = [
  { label: "Record",   val: "7–0"    },
  { label: "Platform", val: "Kick"   },
  { label: "Stream",   val: "Daily"  },
  { label: "Mode",     val: "Crashout" },
] as const;

export default function LivePanel() {
  const [isLive] = useState(true);
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell id="live">
      {/* Kick logo replaces text heading */}
      <div className="mb-8">
        <img
          src="/ui/kick-logo.svg"
          alt="Kick"
          className="h-12 w-auto"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">

        {/* ══ LEFT: Stream area ════════════════════════════════════════════ */}
        <div className="flex flex-col gap-3">

          {/* Status bar */}
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/60 px-5 py-3">
            <div className="flex items-center gap-3" role="status" aria-live="polite">
              <motion.span
                className={`block h-2.5 w-2.5 rounded-full ${
                  isLive ? "bg-acid" : "bg-white/25"
                }`}
                animate={
                  isLive && !reduceMotion
                    ? { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }
                    : {}
                }
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <span
                className={`text-xs font-black uppercase tracking-[.4em] ${
                  isLive ? "text-acid" : "text-white/35"
                }`}
                style={
                  isLive
                    ? { textShadow: "0 0 14px rgba(196,255,0,0.8)" }
                    : undefined
                }
              >
                {isLive ? "Live Now" : "Offline"}
              </span>
            </div>
            <span className="font-mono text-[11px] tracking-[.15em] text-white/22">
              kick.com/deenthegreat
            </span>
          </div>

          {/* Kick embed zone */}
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-acid/20 bg-black/80 scanline">
            {/* HUD corner brackets */}
            <span className="pointer-events-none absolute left-3 top-3 block h-6 w-6 border-l-2 border-t-2 border-acid/50" />
            <span className="pointer-events-none absolute right-3 top-3 block h-6 w-6 border-r-2 border-t-2 border-acid/50" />
            <span className="pointer-events-none absolute bottom-3 left-3 block h-6 w-6 border-b-2 border-l-2 border-acid/50" />
            <span className="pointer-events-none absolute bottom-3 right-3 block h-6 w-6 border-b-2 border-r-2 border-acid/50" />

            {/* Kick live embed */}
            <iframe
              src="https://player.kick.com/deenthegreat"
              className="absolute inset-0 h-full w-full"
              height="720"
              width="1280"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              title="DeenTheGreat live on Kick"
            />

          </div>
        </div>

        {/* ══ RIGHT: Command panel ═════════════════════════════════════════ */}
        <div className="flex flex-col gap-3">

          {/* Panel label */}
          <div className="flex items-center justify-between rounded-xl border border-acid/25 bg-black/70 px-4 py-2.5">
            <p className="text-[10px] font-black uppercase tracking-[.5em] text-acid">
              Command Panel
            </p>
            <span className="font-mono text-[10px] tracking-[.15em] text-white/22">v1.0</span>
          </div>

          {/* CTA links */}
          <div className="flex flex-col gap-2">
            {COMMAND_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  link.primary
                    ? "cyber-panel-strong group flex items-center justify-between rounded-xl px-4 py-4 motion-safe-transition hover:brightness-110"
                    : "group flex items-center justify-between rounded-xl border border-white/10 bg-black/50 px-4 py-4 motion-safe-transition hover:border-acid/50 hover:bg-acid/10"
                }
              >
                <div>
                  <p
                    className={`text-sm font-black uppercase tracking-[.2em] ${
                      link.primary ? "text-acid" : "text-white/85"
                    }`}
                  >
                    {link.label}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[.15em] text-white/30">
                    {link.sub}
                  </p>
                </div>
                <span className="text-base text-white/25 motion-safe-transition group-hover:text-acid">
                  ↗
                </span>
              </a>
            ))}
          </div>

          {/* Signal stats grid */}
          <div className="rounded-xl border border-white/10 bg-black/50 p-4">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[.45em] text-white/38">
              Signal Stats
            </p>
            <div className="grid grid-cols-2 gap-2">
              {STREAM_STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5"
                >
                  <p className="text-base font-black uppercase text-white">{s.val}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[.18em] text-white/32">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Giveaway module */}
          <div className="flex-1 rounded-xl border border-acid/15 bg-black/50 p-4">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[.45em] text-white/38">
              Giveaway
            </p>
            <div className="flex min-h-[72px] items-center justify-center rounded-lg border border-dashed border-white/[0.07]">
              <p className="text-[11px] uppercase tracking-[.22em] text-white/20">
                No active giveaway
              </p>
            </div>
          </div>

          {/* Prototype note */}
          <p className="px-1 text-[10px] uppercase tracking-[.2em] text-white/18">
            Kick embed active · live status via Kick API post-approval.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
