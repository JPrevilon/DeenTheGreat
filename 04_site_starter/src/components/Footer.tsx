"use client";
import { motion, useReducedMotion } from "framer-motion";
import { navItems, siteMeta } from "@/lib/siteContent";

// Quick-link sections for the footer nav
const FOOTER_NAV = [
  {
    heading: "Live",
    links: [
      { label: "Watch Live",   href: siteMeta.kickUrl,    external: true  },
      { label: "Kickbot TTS",  href: siteMeta.ttsUrl,     external: true  },
      { label: "Join Discord", href: siteMeta.discordUrl, external: true  },
    ],
  },
  {
    heading: "Sections",
    links: navItems.map((n) => ({ label: n.label, href: n.href, external: false })),
  },
  {
    heading: "Prototype",
    links: [
      { label: "Replay Intro",   href: "?demo=true",  external: false },
      { label: "CrashoutBoyz",   href: "#crashoutboyz", external: false },
      { label: "Sponsor Deals",  href: "#sponsors",     external: false },
      { label: "Contact",        href: "#contact",      external: false },
    ],
  },
];

export default function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative z-10 border-t border-acid/[0.18] bg-black">
      {/* Top acid line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-acid/60 to-transparent" />

      {/* Main footer body */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-start">

          {/* ── Brand block ─────────────────────────────────────────────── */}
          <div className="max-w-sm">
            <motion.img
              src="/brand/core/deen-the-great-wordmark.png"
              alt="DeenTheGreat"
              className="mb-5 h-10 w-auto object-contain opacity-80"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 0.8, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />

            <p className="text-sm leading-relaxed text-white/45">
              Live combat. Streetwear movement. Community built on Discord.
              DeenTheGreat — The Greats don&apos;t wait.
            </p>

            {/* Platform quick links */}
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={siteMeta.kickUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-acid/40 bg-acid/[0.07] px-4 py-1.5 text-[10px] font-black uppercase tracking-[.28em] text-acid transition-colors hover:bg-acid/[0.14]"
              >
                Kick
              </a>
              <a
                href={siteMeta.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 text-[10px] font-black uppercase tracking-[.28em] text-white/55 transition-colors hover:border-acid/35 hover:text-acid/80"
              >
                Discord
              </a>
              <a
                href={siteMeta.ttsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 text-[10px] font-black uppercase tracking-[.28em] text-white/55 transition-colors hover:border-acid/35 hover:text-acid/80"
              >
                TTS
              </a>
            </div>
          </div>

          {/* ── Nav columns ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
            {FOOTER_NAV.map((col) => (
              <div key={col.heading}>
                <p className="mb-4 text-[9px] font-black uppercase tracking-[.45em] text-acid/60">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="text-[11px] font-black uppercase tracking-[.18em] text-white/40 transition-colors hover:text-acid/80"
                      >
                        {link.label}
                        {link.external && (
                          <span className="ml-1 text-[8px] text-white/[0.18]">↗</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Concept disclaimer strip — REQUIRED, do not remove ──────────── */}
      <div className="border-t border-white/[0.06] bg-black/80">
        <div className="mx-auto max-w-7xl px-6 py-6">
          {/* Prominent concept warning */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-acid/[0.28] bg-acid/[0.06] px-4 py-1.5 text-[9px] font-black uppercase tracking-[.4em] text-acid/70">
              Private Concept
            </span>
            <span className="hidden text-white/[0.18] sm:block">·</span>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-[9px] font-black uppercase tracking-[.4em] text-white/30">
              Not Official Until Approved
            </span>
            <span className="hidden text-white/[0.18] sm:block">·</span>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-[9px] font-black uppercase tracking-[.4em] text-white/30">
              Prepared For Review
            </span>
          </div>

          {/* Full concept footer text */}
          <p className="text-center text-[10px] uppercase tracking-[.28em] text-white/[0.22]">
            {siteMeta.conceptFooter}
          </p>

          {/* Bottom micro row */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[9px] uppercase tracking-[.22em] text-white/[0.18]">
              DeenTheGreat — Private Pitch Prototype
            </p>
            <div className="flex items-center gap-1.5">
              <span className="block h-1.5 w-1.5 rounded-full bg-acid/50" />
              <p className="text-[9px] uppercase tracking-[.22em] text-white/[0.18]">
                This is not an official public site
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
