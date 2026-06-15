"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { sectionCopy, socialLinks, sponsorSignals } from "@/lib/siteContent";

// Per-platform display config — chip label, CTA text, accent (acid) treatment
const PLATFORM_CFG: Record<string, { chip: string; cta: string; accent: boolean }> = {
  "Kick":        { chip: "K",  cta: "Watch Live",  accent: true  },
  "Instagram":   { chip: "IG", cta: "Follow",      accent: false },
  "YouTube":     { chip: "YT", cta: "Subscribe",   accent: false },
  "TikTok":      { chip: "TT", cta: "Follow",      accent: false },
  "X":           { chip: "X",  cta: "Follow",      accent: false },
  "Discord":     { chip: "DC", cta: "Join",        accent: true  },
  "Kickbot TTS": { chip: "KB", cta: "Support TTS", accent: false },
};

const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } },
};

export default function SocialHub() {
  const reduceMotion = useReducedMotion();

  // Kick is the hero platform — render it separately
  const kick   = socialLinks[0];
  const others = socialLinks.slice(1);

  return (
    <SectionShell id="socials">
      {/* Socials logo heading */}
      <div className="mb-8">
        <img
          src="/brand/headings/socials-logo-nobg.png"
          alt="Socials"
          className="h-16 w-auto object-contain md:h-24"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">

        {/* ── Left: Platform links ─────────────────────────────────────── */}
        <div className="flex flex-col gap-4">

          {/* Kick hero card — primary streaming hub */}
          <motion.a
            href={kick.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-acid/35 bg-black/70 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            whileHover={reduceMotion ? {} : { borderColor: "rgba(196,255,0,0.72)", transition: { duration: 0.2 } }}
          >
            {/* Acid bloom */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse 65% 55% at 18% 50%, rgba(196,255,0,0.09), transparent 70%)" }}
            />

            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* K chip */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-acid/50 bg-acid/10">
                  <span className="text-xs font-black tracking-widest text-acid">K</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-black uppercase tracking-[.18em]">{kick.label}</p>
                    {/* Live pulse dot */}
                    <motion.span
                      className="block h-2 w-2 rounded-full bg-acid"
                      animate={reduceMotion ? {} : { scale: [1, 1.55, 1], opacity: [1, 0.35, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                  </div>
                  <p className="mt-0.5 text-[11px] text-white/45">{kick.note}</p>
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-acid px-4 py-2.5 text-[10px] font-black uppercase tracking-[.22em] text-black shadow-acid transition-all group-hover:brightness-110">
                Watch Live →
              </span>
            </div>

            <div className="mt-4 h-px bg-acid/[0.15]" />
            <p className="mt-3 text-[10px] tracking-[.06em] text-acid/40">{kick.href}</p>
          </motion.a>

          {/* Other platform grid */}
          <motion.div
            className="grid gap-3 sm:grid-cols-2"
            variants={stagger}
            initial={reduceMotion ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {others.map((link) => {
              const cfg = PLATFORM_CFG[link.label] ?? { chip: link.label[0], cta: "Open", accent: false };

              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  className={`group flex items-center gap-3 overflow-hidden rounded-2xl border p-4 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid ${
                    cfg.accent
                      ? "border-acid/[0.22] bg-black/60 hover:border-acid/55"
                      : "border-white/10 bg-black/50 hover:border-white/25"
                  }`}
                >
                  {/* Platform chip */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-[10px] font-black ${
                      cfg.accent
                        ? "border-acid/40 bg-acid/[0.08] text-acid"
                        : "border-white/[0.12] bg-white/5 text-white/55"
                    }`}
                  >
                    {cfg.chip}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black uppercase tracking-[.14em]">{link.label}</p>
                    <p className="truncate text-[10px] text-white/35">{link.note}</p>
                  </div>

                  <span
                    className={`shrink-0 text-[9px] font-black uppercase tracking-[.2em] transition-colors ${
                      cfg.accent
                        ? "text-acid/60 group-hover:text-acid"
                        : "text-white/25 group-hover:text-white/55"
                    }`}
                  >
                    {cfg.cta} →
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* ── Right: Sponsor signals ───────────────────────────────────── */}
        <motion.div
          className="rounded-2xl border border-white/10 bg-black/55 p-6"
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        >
          <div className="mb-5 flex items-end justify-between">
            <p className="text-xs font-black uppercase tracking-[.45em] text-acid">
              {sectionCopy.social.sponsorEyebrow}
            </p>
            <img
              src="/ui/sponsor-signal-badge.svg"
              alt=""
              aria-hidden="true"
              className="h-6 w-auto opacity-40"
            />
          </div>

          <div className="flex flex-col gap-3">
            {sponsorSignals.map((s, i) => (
              <motion.div
                key={s.brand}
                className="rounded-xl border border-white/[0.08] bg-black/40 p-4"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.06 }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-black uppercase tracking-[.12em]">{s.brand}</span>
                  <span className="rounded-md border border-acid/30 bg-acid/[0.08] px-2 py-0.5 text-[10px] font-black uppercase tracking-[.25em] text-acid">
                    {s.code}
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-white/[0.38]">{s.status}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-5 text-[10px] uppercase tracking-[.2em] text-white/[0.22]">
            Verify all codes and partnerships before public launch.
          </p>
        </motion.div>
      </div>

      {/* Required concept disclaimer */}
      <p className="mt-6 text-[10px] uppercase tracking-[.22em] text-white/[0.28]">
        Private concept. Social accounts and links pending final approval before embedding.
      </p>
    </SectionShell>
  );
}
