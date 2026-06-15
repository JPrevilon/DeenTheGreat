"use client";
import { motion, useReducedMotion } from "framer-motion";
import SectionShell from "@/components/SectionShell";
import { events, fightHistory, sectionCopy, siteMeta } from "@/lib/siteContent";

// ── Result parsing ───────────────────────────────────────────────────────────
type ResultType = "win" | "loss" | "unconfirmed";

function parseResult(raw: string): { display: string; type: ResultType; needsVerify: boolean } {
  const lower = raw.toLowerCase();
  const needsVerify = lower.includes("verify");
  const display = raw.includes(" / ") ? raw.split(" / ")[0].trim() : raw;
  const type: ResultType = lower.includes("win")
    ? "win"
    : lower.includes("loss")
    ? "loss"
    : "unconfirmed";
  return { display, type, needsVerify };
}

function parseOpponent(raw: string): { display: string; needsVerify: boolean } {
  const needsVerify = raw.toLowerCase().includes("verify");
  const display = raw.includes(" / ") ? raw.split(" / ")[0].trim() : raw;
  return { display, needsVerify };
}

const RESULT_CFG: Record<ResultType, { badge: string; dot: string; border: string; label: string }> = {
  win:         { badge: "bg-acid/15 text-acid border-acid/40",       dot: "bg-acid",     border: "border-acid/20",  label: "WIN"  },
  loss:        { badge: "bg-white/10 text-white/55 border-white/15", dot: "bg-white/40", border: "border-white/10", label: "LOSS" },
  unconfirmed: { badge: "bg-white/5 text-white/30 border-white/10",  dot: "bg-white/20", border: "border-white/10", label: "TBC"  },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function FightsEvents() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionShell id="events">
      <div className="grid gap-10 xl:grid-cols-2">

        {/* ════════════════════════════════════════════════════
            LEFT: Fight archive — vertical timeline
            ════════════════════════════════════════════════════ */}
        <section id="fights">
          {/* Section header */}
          <header className="mb-8">
            <p className="text-xs font-black uppercase tracking-[.45em] text-acid">
              {sectionCopy.fightArchive.eyebrow}
            </p>
            <h2 className="cyber-title mt-3 text-5xl md:text-6xl">
              {sectionCopy.fightArchive.title}
            </h2>
          </header>

          {/* Timeline — acid line + fight cards */}
          <div className="relative pl-10">
            {/* Vertical gradient bar */}
            <div className="absolute bottom-0 left-3.5 top-0 w-px bg-gradient-to-b from-acid/70 via-acid/30 to-transparent" />

            <div className="flex flex-col gap-3">
              {fightHistory.map((fight, i) => {
                const { display: result, type, needsVerify: rv } = parseResult(fight.result);
                const { display: opponent, needsVerify: ov }     = parseOpponent(fight.opponent);
                const needsVerify = rv || ov;
                const cfg = RESULT_CFG[type];

                return (
                  <motion.div
                    key={fight.date + fight.opponent}
                    className="relative"
                    initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.38, ease: "easeOut", delay: Math.min(i * 0.055, 0.28) }}
                  >
                    {/* Timeline dot — sits on the bar */}
                    <span
                      className={`absolute -left-[26px] top-4 z-10 h-2.5 w-2.5 rounded-full ring-2 ring-black ${cfg.dot}`}
                    />

                    {/* Fight card — collectible styling */}
                    <article
                      className={`overflow-hidden rounded-2xl border bg-black/60 p-4 transition-colors duration-300 hover:bg-black/75 ${cfg.border} ${
                        needsVerify ? "opacity-60" : ""
                      }`}
                    >
                      {/* Card header */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {/* Fight number chip */}
                          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[8px] font-black uppercase tracking-[.35em] text-white/35">
                            #{i + 1}
                          </span>
                          {/* Result badge */}
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[.25em] ${cfg.badge}`}
                          >
                            {cfg.label}
                          </span>
                        </div>
                        <span className="shrink-0 text-[10px] text-white/40">{fight.date}</span>
                      </div>

                      {/* Opponent */}
                      <h3 className="mt-2 text-base font-black uppercase leading-tight">
                        {opponent}
                      </h3>

                      {/* Location + method */}
                      <div className="mt-1 flex flex-wrap gap-x-3">
                        <p className="text-[11px] text-white/45">{fight.location}</p>
                        {type !== "unconfirmed" && (
                          <p className="text-[11px] text-white/30">· {result}</p>
                        )}
                      </div>

                      {/* Verification flag */}
                      {needsVerify && (
                        <p className="mt-2 text-[9px] font-black uppercase tracking-[.2em] text-white/30">
                          ⚠ Verify before launch
                        </p>
                      )}
                    </article>
                  </motion.div>
                );
              })}

              {/* Upcoming fight — end of timeline */}
              <motion.div
                className="relative"
                initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.38, ease: "easeOut", delay: 0.3 }}
              >
                {/* Pulsing dot — "next fight" */}
                <motion.span
                  className="absolute -left-[26px] top-4 z-10 h-2.5 w-2.5 rounded-full bg-acid ring-2 ring-black"
                  animate={reduceMotion ? {} : { scale: [1, 1.6, 1], opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />

                <article className="overflow-hidden rounded-2xl border border-acid/20 bg-acid/5 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[8px] font-black uppercase tracking-[.35em] text-white/35">
                        #{fightHistory.length + 1}
                      </span>
                      <span className="rounded-full border border-acid/35 bg-acid/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[.25em] text-acid">
                        UPCOMING
                      </span>
                    </div>
                    <span className="shrink-0 text-[10px] text-white/40">TBA</span>
                  </div>
                  <h3 className="mt-2 text-base font-black uppercase">UFC Fighter TBA</h3>
                  <p className="mt-1 text-[11px] text-white/40">Location TBA</p>
                  <p className="mt-2 text-[9px] font-black uppercase tracking-[.2em] text-white/28">
                    Announcement pending
                  </p>
                </article>
              </motion.div>
            </div>
          </div>

          {/* Verification note */}
          <p className="mt-6 text-[10px] uppercase tracking-[.22em] text-white/35">
            {sectionCopy.fightArchive.note}
          </p>
        </section>

        {/* ════════════════════════════════════════════════════
            RIGHT: Upcoming events
            ════════════════════════════════════════════════════ */}
        <section>
          {/* Section header */}
          <header className="mb-8">
            <p className="text-xs font-black uppercase tracking-[.45em] text-acid">
              {sectionCopy.events.eyebrow}
            </p>
            <h2 className="cyber-title mt-3 text-5xl md:text-6xl">
              {sectionCopy.events.title}
            </h2>
          </header>

          <div className="flex flex-col gap-4">
            {/* Upcoming fight — dominant card */}
            <motion.article
              className="cyber-panel hud-corner overflow-hidden rounded-2xl p-6"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-[.4em] text-acid">
                  {events[0].type}
                </p>
                {/* Loading indicator */}
                <span className="flex items-center gap-1.5">
                  <motion.span
                    className="block h-2 w-2 rounded-full bg-acid/65"
                    animate={reduceMotion ? {} : { scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  <span className="text-[9px] font-black uppercase tracking-[.3em] text-acid/55">
                    Loading
                  </span>
                </span>
              </div>

              <h3 className="text-3xl font-black uppercase leading-tight">
                {events[0].status}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-acid/35 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.25em] text-acid/80">
                  Date: {events[0].date}
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em] text-white/45">
                  Venue: {events[0].location}
                </span>
              </div>

              <a
                href={siteMeta.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-safe-transition mt-5 inline-flex rounded-full bg-acid px-5 py-2.5 text-xs font-black uppercase tracking-[.25em] text-black shadow-acid hover:brightness-110 active:brightness-90"
              >
                Join The Greats
              </a>

              {/* Unconfirmed-safe disclaimer */}
              <p className="mt-3 text-[9px] uppercase tracking-[.2em] text-white/25">
                Opponent details pending confirmation · Not official until approved.
              </p>
            </motion.article>

            {/* Stream + drop event cards */}
            {events.slice(1).map((event, i) => (
              <motion.article
                key={event.title}
                className="overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-5"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.38, ease: "easeOut", delay: (i + 1) * 0.1 }}
              >
                <p className="text-[10px] font-black uppercase tracking-[.35em] text-acid/65">
                  {event.type}
                </p>
                <h3 className="mt-2 text-xl font-black uppercase">{event.title}</h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[.2em] text-white/50">
                    {event.date}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[.15em] text-white/40">
                    {event.location}
                  </span>
                </div>

                <p className="mt-3 text-sm text-white/50">{event.status}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </SectionShell>
  );
}
