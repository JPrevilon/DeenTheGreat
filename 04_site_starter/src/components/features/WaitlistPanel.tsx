"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function WaitlistPanel() {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const reduceMotion              = useReducedMotion();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 md:pb-24">
      <div className="cyber-panel hud-corner overflow-hidden rounded-2xl p-6 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p
              className="text-xs font-black uppercase tracking-[.45em] text-acid"
              style={{ textShadow: "0 0 12px rgba(196,255,0,0.6)" }}
            >
              Early Access
            </p>
            <h3 className="mt-2 text-2xl font-black uppercase leading-tight md:text-3xl">
              Join the Waitlist
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
              Be first in line when Drop 001 goes live. Enter your email to hold your spot.
            </p>
          </div>

          {submitted ? (
            <motion.div
              className="rounded-xl border border-acid/45 bg-acid/10 px-6 py-5 text-center"
              initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-sm font-black uppercase tracking-[.25em] text-acid">
                You&apos;re on the list
              </p>
              <p className="mt-1.5 text-[11px] uppercase tracking-[.2em] text-white/40">
                We&apos;ll reach out once approved.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 sm:flex-row"
              aria-label="CrashoutBoyz waitlist"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                autoComplete="email"
                className="w-full rounded-full border border-white/15 bg-black/60 px-5 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm transition-colors focus:border-acid/55 focus:outline-none focus:ring-1 focus:ring-acid/35 sm:w-64"
              />
              <button
                type="submit"
                className="motion-safe-transition whitespace-nowrap rounded-full bg-acid px-6 py-3 text-xs font-black uppercase tracking-[.25em] text-black shadow-acid hover:brightness-110 active:brightness-90"
              >
                Join Waitlist
              </button>
            </form>
          )}
        </div>
        <p className="mt-5 text-[10px] uppercase tracking-[.2em] text-white/22">
          Concept collection preview. Not available for purchase until approved.
        </p>
      </div>
    </section>
  );
}
