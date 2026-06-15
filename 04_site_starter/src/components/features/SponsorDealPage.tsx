"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { sectionCopy, sponsorSignals, siteMeta } from "@/lib/siteContent";

// ── Offering definitions ─────────────────────────────────────────────────────
type Offering = { num: string; title: string; desc: string };

const OFFERINGS: Offering[] = [
  {
    num:   "01",
    title: "Stream Activation",
    desc:  "Live integrations on Kick — overlays, shoutouts, product reveals, and Kickbot TTS commands wired directly into the stream. Real-time access to an engaged audience.",
  },
  {
    num:   "02",
    title: "Fight-Night Sponsor",
    desc:  "Corner branding, walkout integrations, and fight-card placement. Premium visibility at high-energy fight events streamed to thousands.",
  },
  {
    num:   "03",
    title: "Giveaway Sponsor",
    desc:  "Live giveaway activations during stream events. Deep community engagement with direct audience participation through DeenTheGreat's platform.",
  },
  {
    num:   "04",
    title: "Promo Code Placements",
    desc:  "Recurring verbal and on-screen overlay promotions during live content. Trackable affiliate codes embedded in high-retention streams.",
  },
  {
    num:   "05",
    title: "Merch Collaboration",
    desc:  "CrashoutBoyz co-branded drops. Collaborative product concepts embedded in the COB movement — streetwear with built-in community.",
  },
];

// ── Variants ─────────────────────────────────────────────────────────────────
const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0, x: 20 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function SponsorDealPage() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell
      id="sponsors"
      eyebrow={sectionCopy.sponsors.eyebrow}
      title={sectionCopy.sponsors.title}
      body={sectionCopy.sponsors.body}
      action={
        <img
          src={sectionCopy.sponsors.badge}
          alt=""
          aria-hidden="true"
          className="hidden h-14 w-auto opacity-55 md:block"
        />
      }
      className="py-20 md:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">

        {/* ── Left: Offering cards ──────────────────────────────────────── */}
        <motion.div
          className="flex flex-col gap-4"
          variants={stagger}
          initial={reduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {OFFERINGS.map((o) => (
            <motion.div
              key={o.num}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-5 transition-colors duration-300 hover:border-acid/[0.38]"
            >
              {/* Subtle hover bloom */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "radial-gradient(ellipse 60% 55% at 0% 50%, rgba(196,255,0,0.05), transparent 70%)" }}
              />

              <div className="relative flex items-start gap-4">
                {/* Number chip */}
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-acid/30 bg-acid/[0.07]">
                  <span className="text-[10px] font-black tracking-wider text-acid/80">{o.num}</span>
                </div>

                <div className="min-w-0">
                  <h3 className="text-base font-black uppercase tracking-[.15em]">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{o.desc}</p>
                </div>

                {/* Arrow indicator */}
                <span className="ml-auto shrink-0 text-[11px] font-black text-white/[0.18] transition-colors duration-300 group-hover:text-acid/55">
                  →
                </span>
              </div>
            </motion.div>
          ))}

          {/* Inline CTA → contact section */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-3 pt-2"
          >
            <a
              href="#contact"
              className="motion-safe-transition inline-flex items-center gap-2 rounded-full bg-acid px-7 py-3.5 text-sm font-black uppercase tracking-[.22em] text-black shadow-acid hover:brightness-110 active:brightness-90"
            >
              Get In Touch →
            </a>
            <a
              href={siteMeta.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-safe-transition inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-black uppercase tracking-[.22em] text-white/65 hover:border-acid/50 hover:text-acid"
            >
              Join Discord
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: Sponsor signals panel ─────────────────────────────── */}
        <motion.div
          className="top-24 flex flex-col gap-5 lg:sticky"
          variants={fadeIn}
          initial={reduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Badge + header */}
          <div className="cyber-panel hud-corner overflow-hidden rounded-2xl p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[.45em] text-acid/70">Current Signals</p>
                <p className="mt-0.5 text-lg font-black uppercase tracking-[.1em]">Live Partners</p>
              </div>
              <img
                src={sectionCopy.sponsors.badge}
                alt=""
                aria-hidden="true"
                className="h-14 w-auto opacity-60"
              />
            </div>

            {/* Signal rows */}
            <div className="flex flex-col gap-2">
              {sponsorSignals.map((s, i) => (
                <motion.div
                  key={s.brand}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.07 }}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-black uppercase tracking-[.12em]">{s.brand}</p>
                    <p className="mt-0.5 truncate text-[10px] text-white/[0.38]">{s.status}</p>
                  </div>
                  <span className="shrink-0 rounded-md border border-acid/30 bg-acid/[0.08] px-2.5 py-1 text-[10px] font-black uppercase tracking-[.25em] text-acid">
                    {s.code}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Verify note */}
            <p className="mt-5 text-[10px] uppercase tracking-[.2em] text-white/[0.28]">
              {sectionCopy.sponsors.finePrint}
            </p>
          </div>

          {/* Inquiry prompt card */}
          <div className="rounded-2xl border border-acid/[0.22] bg-black/55 p-5">
            <p className="text-[9px] font-black uppercase tracking-[.42em] text-acid/65">Business Inquiry</p>
            <p className="mt-2 text-base font-black uppercase leading-snug">
              Ready to activate a deal?
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/45">
              Brand deals, fight-night sponsorships, and merch collabs — route through the contact panel below or reach the community on Discord.
            </p>
            <a
              href="#contact"
              className="motion-safe-transition mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-acid/50 py-3 text-[10px] font-black uppercase tracking-[.28em] text-acid transition-colors hover:bg-acid/[0.08]"
            >
              Contact Panel ↓
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Full-width stat/pitch rail ────────────────────────────────────── */}
      <motion.div
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={stagger}
        initial={reduceMotion ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {[
          { label: "Platform",    val: "Kick.com",   sub: "Primary live stream hub"      },
          { label: "Community",   val: "The Greats", sub: "Discord-based movement"       },
          { label: "Fight record",val: "7-1",        sub: "Pending final verification"   },
          { label: "Merch",       val: "Drop 001",   sub: "CrashoutBoyz concept preview" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="rounded-xl border border-white/[0.08] bg-black/50 p-4 text-center"
          >
            <p className="text-[9px] font-black uppercase tracking-[.38em] text-acid/55">{stat.label}</p>
            <p className="mt-2 text-xl font-black uppercase tracking-[.1em]">{stat.val}</p>
            <p className="mt-1 text-[10px] text-white/35">{stat.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Required concept disclaimer — do not remove */}
      <p className="mt-8 text-[10px] uppercase tracking-[.22em] text-white/[0.28]">
        Private concept. Sponsor relationships and codes require management verification before public launch.
        Not an official partnership page until approved.
      </p>
    </SectionShell>
  );
}
