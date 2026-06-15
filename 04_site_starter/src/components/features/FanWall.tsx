"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { sectionCopy, siteMeta } from "@/lib/siteContent";

// Community wall cards — each slot maps to a community feature
type WallSlot = {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  featured: boolean;
  placeholder: string;
  cta?: string;
};

const WALL_SLOTS: WallSlot[] = [
  {
    id:          "crashout-week",
    label:       "Crashout of the Week",
    sublabel:    "Community spotlight",
    icon:        "⚡",
    featured:    true,
    placeholder: "Drop your most unhinged clip in Discord. The community votes — the winner gets highlighted here.",
    cta:         "Submit Your Clip",
  },
  {
    id:          "fan-art",
    label:       "Fan Art Wall",
    sublabel:    "Created by The Greats",
    icon:        "🎨",
    featured:    false,
    placeholder: "Art, edits, and creative from the community. Post in Discord to be featured.",
  },
  {
    id:          "giveaway",
    label:       "Giveaway Winners",
    sublabel:    "Live stream drops",
    icon:        "🏆",
    featured:    false,
    placeholder: "Stream giveaway winners get their W showcased here. Watch live to enter.",
  },
  {
    id:          "best-clip",
    label:       "Best Clip of the Week",
    sublabel:    "Stream highlights",
    icon:        "🎬",
    featured:    false,
    placeholder: "Clips from the live stream — fights, raids, and crashout moments.",
  },
];

const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
};

// Placeholder video-frame card component
function ClipCard({ slot, reduceMotion }: { slot: WallSlot; reduceMotion: boolean | null }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`group relative overflow-hidden rounded-2xl border bg-black/60 ${
        slot.featured
          ? "border-acid/35 md:col-span-2"
          : "border-white/10 hover:border-white/25"
      } transition-colors duration-300`}
    >
      {/* Placeholder art / video frame */}
      <div
        className={`relative flex items-center justify-center bg-black/80 ${
          slot.featured ? "aspect-video" : "aspect-[4/3]"
        }`}
      >
        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(196,255,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,255,0,1) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Corner HUD lines */}
        <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-acid/[0.28]" />
        <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-acid/[0.28]" />

        {/* Play button */}
        <div
          className={`flex flex-col items-center gap-3 transition-transform duration-300 group-hover:scale-105 ${
            slot.featured ? "" : ""
          }`}
        >
          <div
            className={`flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-sm ${
              slot.featured ? "h-16 w-16" : "h-12 w-12"
            }`}
          >
            <span className={`ml-1 font-black text-white/60 ${slot.featured ? "text-xl" : "text-base"}`}>
              ▶
            </span>
          </div>

          <span
            className={`rounded-full border border-white/[0.12] bg-black/60 px-3 py-1 font-black uppercase tracking-[.28em] text-white/30 backdrop-blur-sm ${
              slot.featured ? "text-[10px]" : "text-[9px]"
            }`}
          >
            {slot.featured ? "Community Spotlight" : "Coming Soon"}
          </span>
        </div>

        {/* Featured acid bar top */}
        {slot.featured && <div className="absolute inset-x-0 top-0 h-0.5 bg-acid shadow-acid" />}
      </div>

      {/* Card info */}
      <div className={`p-4 ${slot.featured ? "md:p-6" : ""}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              {slot.featured && (
                <span
                  className="rounded-full border border-acid/40 bg-acid/[0.08] px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[.28em] text-acid"
                  style={{ textShadow: "0 0 10px rgba(196,255,0,0.6)" }}
                >
                  ⚡ Featured
                </span>
              )}
            </div>
            <h3
              className={`font-black uppercase leading-tight ${
                slot.featured ? "mt-2 text-lg md:text-xl" : "mt-1 text-sm"
              }`}
            >
              {slot.label}
            </h3>
            <p className="mt-0.5 text-[10px] font-black uppercase tracking-[.25em] text-acid/55">
              {slot.sublabel}
            </p>
          </div>
          <span className="shrink-0 text-lg" aria-hidden="true">
            {slot.icon}
          </span>
        </div>

        <p
          className={`mt-3 leading-relaxed text-white/45 ${
            slot.featured ? "max-w-lg text-sm" : "text-xs"
          }`}
        >
          {slot.placeholder}
        </p>

        {slot.cta && (
          <a
            href={siteMeta.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="motion-safe-transition mt-4 inline-flex items-center gap-1.5 rounded-full border border-acid/50 px-4 py-2 text-[10px] font-black uppercase tracking-[.25em] text-acid transition-colors hover:bg-acid/[0.08]"
          >
            {slot.cta} →
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function FanWall() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell id="community" className="py-20 md:py-28">

      {/* ── Badge + headline ─────────────────────────────────────────────── */}
      <div className="mb-14 grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">

        {/* The Greats badge */}
        <motion.div
          className="cyber-panel flex items-center justify-center rounded-3xl p-8 lg:w-72"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img
            src={sectionCopy.fanWall.badge}
            alt="The Greats community badge"
            className="w-full max-w-[220px] object-contain"
            style={{ filter: "drop-shadow(0 0 28px rgba(196,255,0,0.35))" }}
          />
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.48, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-xs font-black uppercase tracking-[.45em] text-acid">
            {sectionCopy.fanWall.eyebrow}
          </p>
          <h2 className="cyber-title mt-3 text-5xl md:text-7xl">
            {sectionCopy.fanWall.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
            {sectionCopy.fanWall.body}
          </p>

          {/* Stats row — community signals */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { label: "Platform", val: "Discord" },
              { label: "Community", val: "The Greats" },
              { label: "Movement", val: "COB" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-black/50 px-4 py-2.5"
              >
                <p className="text-[9px] font-black uppercase tracking-[.3em] text-white/35">{stat.label}</p>
                <p className="mt-0.5 text-sm font-black uppercase tracking-[.14em] text-acid/80">{stat.val}</p>
              </div>
            ))}
          </div>

          {/* Discord CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteMeta.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-safe-transition inline-flex items-center gap-2 rounded-full bg-acid px-7 py-3.5 text-sm font-black uppercase tracking-[.22em] text-black shadow-acid hover:brightness-110 active:brightness-90"
            >
              {sectionCopy.fanWall.cta} →
            </a>
            <a
              href={siteMeta.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-safe-transition inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-black uppercase tracking-[.22em] text-white/65 hover:border-acid/50 hover:text-acid"
            >
              Submit Clips
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Community wall grid ──────────────────────────────────────────── */}
      <motion.div
        className="grid gap-4 md:grid-cols-2"
        variants={stagger}
        initial={reduceMotion ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {WALL_SLOTS.map((slot) => (
          <ClipCard key={slot.id} slot={slot} reduceMotion={reduceMotion} />
        ))}
      </motion.div>

      {/* Discord pull banner */}
      <motion.div
        className="cyber-panel hud-corner mt-8 flex flex-col items-center gap-4 rounded-2xl p-6 text-center sm:flex-row sm:justify-between sm:text-left"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.42, ease: "easeOut", delay: 0.15 }}
      >
        <div>
          <p className="text-xs font-black uppercase tracking-[.4em] text-acid">Movement HQ</p>
          <p className="mt-2 text-xl font-black uppercase leading-tight">
            The Greats live on Discord
          </p>
          <p className="mt-1 text-sm text-white/50">
            Clips. Raids. Giveaways. Crashout moments. All in one community.
          </p>
        </div>
        <a
          href={siteMeta.discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="motion-safe-transition shrink-0 rounded-full bg-acid px-7 py-3.5 text-sm font-black uppercase tracking-[.22em] text-black shadow-acid hover:brightness-110 active:brightness-90"
        >
          Join Now →
        </a>
      </motion.div>

      {/* Required concept fine print */}
      <p className="mt-6 text-[10px] uppercase tracking-[.22em] text-white/[0.28]">
        Private concept. Community features activate post-approval. Fan content placeholders only.
      </p>
    </SectionShell>
  );
}
