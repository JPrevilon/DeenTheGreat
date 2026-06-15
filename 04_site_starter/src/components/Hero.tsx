"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { heroContent, siteMeta } from "@/lib/siteContent";

// CTAs per spec: Watch Live, Join Discord, View CrashoutBoyz
const CTAS = [
  { label: "Watch Live",    href: siteMeta.kickUrl,    external: true,  variant: "primary" },
  { label: "Join Discord",  href: siteMeta.discordUrl, external: true,  variant: "outline" },
  { label: "CrashoutBoyz", href: "#crashoutboyz",      external: false, variant: "ghost"   },
] as const;

const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.10, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  // "show" is reached by the parent propagating the variant name down
  show:   { opacity: 1, y: 0, transition: { duration: 0.52, ease: "easeOut" } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  // When reduceMotion: set initial="show" so elements start in their final
  // state and no transition fires.
  const initial = reduceMotion ? "show" : "hidden";

  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden px-4 pb-4 pt-20 scanline"
    >
      {/* Boxing video background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-[0.18]"
          style={{ filter: "saturate(0.4) brightness(0.7)" }}
        >
          <source src="/videos/boxing.mp4" type="video/mp4" />
        </video>
        {/* gradient fade to keep green/black ratio — heavy darken at edges */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 30%, rgba(2,3,2,0.82) 100%)",
              "linear-gradient(to bottom, rgba(2,3,2,0.55) 0%, transparent 25%, transparent 70%, rgba(2,3,2,0.85) 100%)",
            ].join(", "),
          }}
        />
        {/* acid green tint layer to preserve the green/black color palette */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(196,255,0,0.5), transparent 70%)" }}
        />
      </div>

      {/* Subtle 72 px grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(196,255,0,0.12) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(196,255,0,0.10) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "72px 72px",
        }}
      />

      {/* Fighter crest — ghosted far-right, decorative only */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden">
        <img
          src="/brand/hero/hero-fighter-crest.png"
          alt=""
          className="h-[90vh] max-h-[820px] w-auto translate-x-[12%] object-contain opacity-[0.055] md:opacity-[0.07]"
          style={{ filter: "drop-shadow(0 0 60px rgba(196,255,0,0.22))" }}
        />
      </div>

      {/* Monogram circuit — centered watermark */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025]">
        <img
          src="/brand/hero/hero-monogram-circuit.png"
          alt=""
          className="h-[70vh] w-auto object-contain"
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        className="relative mx-auto max-w-6xl text-center"
        variants={stagger}
        initial={initial}
        animate="show"
      >
        {/* Wordmark */}
        <motion.div variants={fadeUp}>
          <img
            src={heroContent.wordmark}
            alt="Deen The Great"
            className="mx-auto w-full max-w-2xl object-contain"
            style={{ filter: "drop-shadow(0 0 44px rgba(196,255,0,0.16))" }}
            fetchPriority="high"
          />
        </motion.div>

        {/* Fight video embed — starts at 11:00 (660s), capped at 48vh so buttons stay visible */}
        <motion.div
          variants={fadeUp}
          className="mx-auto mt-3 w-full max-w-4xl overflow-hidden rounded-2xl border border-acid/25 shadow-[0_0_48px_rgba(196,255,0,0.14)]"
          style={{ aspectRatio: "16/9", maxHeight: "48vh" }}
        >
          <iframe
            src="https://www.youtube.com/embed/uPKiCH_y4YU?si=PD3G-LvCseNM4jr9&start=660&autoplay=1&mute=1"
            title="DeenTheGreat — Fight"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="h-full w-full"
            style={{ border: 0 }}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-5 flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {CTAS.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={
                cta.variant === "primary"
                  ? "motion-safe-transition rounded-full bg-acid px-7 py-3.5 text-sm font-black uppercase tracking-[.25em] text-black shadow-acid hover:brightness-110 active:brightness-90"
                  : cta.variant === "outline"
                  ? "motion-safe-transition rounded-full border border-acid/60 px-7 py-3.5 text-sm font-black uppercase tracking-[.25em] text-acid hover:border-acid hover:bg-acid/10"
                  : "motion-safe-transition rounded-full border border-white/20 px-7 py-3.5 text-sm font-black uppercase tracking-[.25em] text-white/75 hover:border-white/40 hover:text-white"
              }
            >
              {cta.label}
            </a>
          ))}
        </motion.div>

        {/* Private concept notice — required, do not remove */}
        <motion.p
          variants={fadeUp}
          className="mt-5 text-[11px] font-black uppercase tracking-[.35em] text-white/30"
        >
          Private concept · Not an official site until approved by DeenTheGreat.
        </motion.p>
      </motion.div>
    </section>
  );
}
