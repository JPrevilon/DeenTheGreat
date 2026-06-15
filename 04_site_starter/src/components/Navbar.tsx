"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RingBellGloves from "./RingBellGloves";
import { navItems, siteMeta } from "@/lib/siteContent";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-acid/20 bg-black/70 backdrop-blur-xl">
      {/* ── MAIN BAR ── */}
      <div className="relative mx-auto flex h-24 max-w-7xl items-center justify-between px-4 md:px-6">

        {/* Home logo — left */}
        <a
          href="#home"
          aria-label="Back to homepage"
          className="group flex shrink-0 items-center"
        >
          <img
            src="/brand/nav/deenthegreat-home-logo.png"
            alt="DeenTheGreat"
            className="h-12 w-auto object-contain motion-safe-transition group-hover:scale-105"
            fetchPriority="high"
          />
        </a>

        {/* Bell + gloves — absolute center, desktop only (md+) */}
        <RingBellGloves />

        {/* Right cluster: nav links (lg only) + Watch Live + hamburger */}
        <div className="flex items-center gap-2">
          {/* Desktop nav — hidden below lg */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Site navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group rounded-lg px-2 py-2 motion-safe-transition hover:bg-acid/10"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="h-7 w-28 object-contain opacity-80 motion-safe-transition group-hover:scale-110 group-hover:opacity-100"
                />
                <span className="sr-only">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Watch Live CTA — always visible; abbreviated on xs to avoid overflow */}
          <a
            href={siteMeta.kickUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch DeenTheGreat live on Kick"
            className="rounded-full border border-acid/60 px-3 py-2 text-xs font-black uppercase tracking-[.2em] text-acid shadow-acid motion-safe-transition hover:bg-acid hover:text-black sm:px-4 sm:tracking-[.25em]"
          >
            <span className="sm:hidden">Live</span>
            <span className="hidden sm:inline">{siteMeta.primaryCta}</span>
          </a>

          {/* Hamburger button — visible below lg */}
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 motion-safe-transition hover:border-acid/40 hover:bg-acid/10 lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <motion.span
              className="block h-0.5 w-5 origin-center rounded-full bg-white"
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
            <motion.span
              className="block h-0.5 w-5 rounded-full bg-white"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block h-0.5 w-5 origin-center rounded-full bg-white"
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
          </button>
        </div>
      </div>

      {/* ── MOBILE DRAWER ── slides open below the main bar */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            key="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-t border-acid/15 bg-black/92 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-3 sm:grid-cols-3 sm:px-6 sm:py-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-center rounded-lg px-3 py-3 motion-safe-transition hover:bg-acid/10"
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="h-6 w-auto max-w-[110px] object-contain opacity-75 motion-safe-transition group-hover:opacity-100"
                  />
                  <span className="sr-only">{item.label}</span>
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
