"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { sectionCopy, siteMeta } from "@/lib/siteContent";

// ── Inquiry type definitions ─────────────────────────────────────────────────
type InquiryType = {
  id:    string;
  label: string;
  chip:  string;
  desc:  string;
  hint:  string;
};

const INQUIRY_TYPES: InquiryType[] = [
  {
    id:    "sponsorship",
    label: "Sponsorship",
    chip:  "01",
    desc:  "Stream activations, fight-night branding, giveaway sponsorships, and promo code placements across Kick and live events.",
    hint:  "Includes: stream overlays, Kickbot integrations, verbal promos, fight-card branding",
  },
  {
    id:    "merch",
    label: "Merch Collab",
    chip:  "02",
    desc:  "CrashoutBoyz co-branded drops and collaborative product concepts embedded in the COB movement community.",
    hint:  "Includes: co-branded tees, hoodies, limited drops, community-first releases",
  },
  {
    id:    "booking",
    label: "Booking",
    chip:  "03",
    desc:  "Fight bookings, exhibition matches, and event collaborations. Refer through official management channels.",
    hint:  "Includes: creator boxing matches, exhibition fights, event appearances",
  },
  {
    id:    "media",
    label: "Media",
    chip:  "04",
    desc:  "Press coverage, editorial, interviews, and content collaborations. All media handled through management.",
    hint:  "Includes: interviews, editorial features, content partnerships, press kits",
  },
  {
    id:    "website",
    label: "Site Handoff",
    chip:  "05",
    desc:  "This prototype is ready for handoff to the development or management team. All source files included.",
    hint:  "Includes: full Next.js source, asset library, content schema, deploy-ready build",
  },
];

// ── Framer variants ──────────────────────────────────────────────────────────
const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function ContactPanel() {
  const [selected, setSelected] = useState<string>("sponsorship");
  const reduceMotion             = useReducedMotion();

  const active = INQUIRY_TYPES.find((t) => t.id === selected) ?? INQUIRY_TYPES[0];

  return (
    <SectionShell id="contact" className="pb-24 pt-20 md:pb-32 md:pt-28">
      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-acid/30 bg-black/70"
        initial={reduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {/* Acid glow bloom */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(196,255,0,0.07), transparent 62%)",
          }}
        />

        {/* HUD corner accents */}
        <div className="pointer-events-none absolute left-5 top-5 h-6 w-6 border-l-2 border-t-2 border-acid/40" />
        <div className="pointer-events-none absolute bottom-5 right-5 h-6 w-6 border-b-2 border-r-2 border-acid/40" />
        <div className="pointer-events-none absolute right-5 top-5 h-6 w-6 border-r-2 border-t-2 border-acid/[0.18]" />
        <div className="pointer-events-none absolute bottom-5 left-5 h-6 w-6 border-b-2 border-l-2 border-acid/[0.18]" />

        <div className="relative grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">

          {/* ── Left: Header + inquiry type selector ─────────────────────── */}
          <div className="border-b border-white/[0.08] p-8 lg:border-b-0 lg:border-r md:p-10">
            {/* Logo */}
            <img
              src={sectionCopy.contact.logo}
              alt="Contact DeenTheGreat"
              className="mb-6 h-12 w-auto object-contain opacity-65"
            />

            <p className="text-xs font-black uppercase tracking-[.45em] text-acid">
              Management Inquiries
            </p>
            <h2 className="cyber-title mt-3 text-4xl md:text-5xl">
              {sectionCopy.contact.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Select your inquiry type below. All requests route to management for review after approval.
            </p>

            {/* Inquiry type chips */}
            <motion.div
              className="mt-8 flex flex-col gap-2"
              variants={stagger}
              initial={reduceMotion ? "show" : "hidden"}
              whileInView="show"
              viewport={{ once: true }}
            >
              {INQUIRY_TYPES.map((t) => {
                const isActive = t.id === selected;
                return (
                  <motion.button
                    key={t.id}
                    variants={fadeUp}
                    onClick={() => setSelected(t.id)}
                    className={`group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid ${
                      isActive
                        ? "border-acid/50 bg-acid/[0.08]"
                        : "border-white/[0.08] bg-black/40 hover:border-white/20 hover:bg-black/60"
                    }`}
                    aria-pressed={isActive}
                  >
                    {/* Chip number */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[9px] font-black transition-colors ${
                        isActive
                          ? "border-acid/50 bg-acid/[0.12] text-acid"
                          : "border-white/[0.12] bg-white/5 text-white/40 group-hover:border-white/20 group-hover:text-white/60"
                      }`}
                    >
                      {t.chip}
                    </div>

                    <span
                      className={`text-sm font-black uppercase tracking-[.14em] transition-colors ${
                        isActive ? "text-acid" : "text-white/65 group-hover:text-white/85"
                      }`}
                    >
                      {t.label}
                    </span>

                    {isActive && (
                      <span className="ml-auto text-[10px] font-black text-acid/60">Selected</span>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Concept note */}
            <p className="mt-8 text-[10px] uppercase tracking-[.22em] text-white/[0.28]">
              Private concept — prepared for DeenTheGreat management review.
            </p>
          </div>

          {/* ── Right: Active inquiry detail + CTA ──────────────────────── */}
          <div className="flex flex-col justify-between p-8 md:p-10">

            {/* Selected inquiry detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.26, ease: "easeOut" }}
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-full border border-acid/40 bg-acid/[0.08] px-3 py-1 text-[9px] font-black uppercase tracking-[.3em] text-acid"
                    style={{ textShadow: "0 0 10px rgba(196,255,0,0.5)" }}
                  >
                    {active.chip} — {active.label}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-5 text-2xl font-black uppercase leading-tight md:text-3xl">
                  {active.label}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/55">
                  {active.desc}
                </p>

                {/* Includes hint */}
                <div className="mt-5 rounded-xl border border-white/[0.08] bg-black/40 p-4">
                  <p className="text-[9px] font-black uppercase tracking-[.35em] text-acid/55">
                    Scope
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-white/45">{active.hint}</p>
                </div>

                {/* Prototype note */}
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                  <span className="mt-0.5 text-[10px] text-white/30">ℹ</span>
                  <p className="text-[11px] leading-relaxed text-white/35">
                    This inquiry panel is a concept prototype. Contact form connects to management after approval.
                    No data is collected or stored.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3">
              {/* Primary → Discord (interim contact channel) */}
              <a
                href={siteMeta.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-safe-transition flex w-full items-center justify-center gap-2 rounded-full bg-acid px-7 py-4 text-sm font-black uppercase tracking-[.22em] text-black shadow-acid hover:brightness-110 active:brightness-90"
              >
                Reach Out on Discord →
              </a>

              {/* Secondary → Kick TTS support */}
              <a
                href={siteMeta.ttsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-safe-transition flex w-full items-center justify-center gap-2 rounded-full border border-acid/45 px-7 py-4 text-sm font-black uppercase tracking-[.22em] text-acid hover:bg-acid/[0.08]"
              >
                Stream Support / TTS
              </a>

              {/* Sponsor back-link */}
              <a
                href="#sponsors"
                className="mt-1 text-center text-[10px] font-black uppercase tracking-[.28em] text-white/28 transition-colors hover:text-acid/55"
              >
                ↑ View Brand Deal Info
              </a>
            </div>
          </div>
        </div>

        {/* Bottom strip — concept badge */}
        <div className="border-t border-white/[0.06] px-8 py-4 md:px-10">
          <p className="text-center text-[10px] uppercase tracking-[.25em] text-white/[0.22]">
            {siteMeta.conceptFooter}
          </p>
        </div>
      </motion.div>
    </SectionShell>
  );
}
