"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionShell from "@/components/SectionShell";

type View = "front" | "back";

const MERCH = [
  {
    id:     "forthelove",
    title:  "For The Love Tee",
    type:   "T-Shirt",
    status: "Coming Soon",
    front:  "/merch/forthelove-front.png",
    back:   "/merch/forthelove-back.png",
  },
  {
    id:     "leather",
    title:  "COB Leather Jacket",
    type:   "Leather Jacket",
    status: "Coming Soon",
    front:  "/merch/leather-front.png",
    back:   "/merch/leather-back.png",
  },
  {
    id:     "beanie",
    title:  "Crashout Boys Beanie",
    type:   "Beanie Hat",
    status: "Coming Soon",
    front:  "/merch/beanie.png",
    back:   null,
  },
  {
    id:     "gymwars",
    title:  "Gym Wars Jacket",
    type:   "Jacket",
    status: "Coming Soon",
    front:  "/merch/gym-front.png",
    back:   "/merch/gym-back.png",
  },
] as const;

type Modal = { itemId: string; view: View } | null;

export default function CrashoutBoyzDropSystem() {
  const [views, setViews] = useState<Record<string, View>>({});
  const [modal, setModal] = useState<Modal>(null);
  const reduceMotion      = useReducedMotion();

  const getView = (id: string): View => views[id] ?? "front";
  const setView = (id: string, v: View) => setViews((prev) => ({ ...prev, [id]: v }));
  const getImg  = (item: typeof MERCH[number]) =>
    getView(item.id) === "back" && item.back ? item.back : item.front;

  const openModal = (itemId: string, view: View) => setModal({ itemId, view });
  const closeModal = () => setModal(null);

  const modalItem = modal ? MERCH.find((m) => m.id === modal.itemId) ?? null : null;
  const modalSrc  = modalItem
    ? modal!.view === "back" && modalItem.back ? modalItem.back : modalItem.front
    : null;
  const modalHasBack = !!modalItem?.back;


  return (
    <SectionShell id="crashoutboyz">
      {/* CrashoutBoyz logo heading */}
      <div className="mb-8">
        <img
          src="/brand/headings/crashoutboyz-logo-nobg.png"
          alt="CrashoutBoyz"
          className="h-16 w-auto object-contain md:h-24"
        />
      </div>

      {/* Drop status strip */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-acid/45 bg-black/55 px-4 py-2 text-xs font-black uppercase tracking-[.35em] text-acid">
          <span className="block h-2 w-2 rounded-full bg-acid" />
          Coming Soon
        </span>
        <span className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs font-black uppercase tracking-[.25em] text-white/45">
          Drop Date: TBA
        </span>
        <span className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs font-black uppercase tracking-[.25em] text-white/45">
          Drop 001 · COB
        </span>
      </div>

      {/* Product grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {MERCH.map((item, i) => {
          const activeView = getView(item.id);
          const src        = getImg(item);
          const hasBack    = !!item.back;

          return (
            <motion.article
              key={item.id}
              className="cyber-panel group relative flex flex-col overflow-hidden rounded-3xl p-5 transition-colors duration-300 hover:border-acid/45"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.08 }}
            >
              {/* Image — click to zoom */}
              <button
                onClick={() => openModal(item.id, activeView)}
                className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-acid/10 bg-white p-4 transition-colors duration-300 hover:border-acid/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
                aria-label={`Zoom ${item.title} ${activeView}`}
              >
                <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-black/60 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-[.25em] text-white/70 backdrop-blur-sm">
                  Tap to zoom
                </span>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={src}
                    src={src}
                    alt={`${item.title} — ${activeView}`}
                    className="max-h-full max-w-full object-contain"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
              </button>

              {/* Front / Back toggle */}
              {hasBack && (
                <div className="mt-3 flex gap-2">
                  {(["front", "back"] as View[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(item.id, v)}
                      className={`flex-1 rounded-full border py-1.5 text-[10px] font-black uppercase tracking-[.3em] transition-colors ${
                        activeView === v
                          ? "border-acid bg-acid/15 text-acid"
                          : "border-white/15 text-white/40 hover:border-acid/40 hover:text-white/70"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}

              {/* Info */}
              <div className="mt-3 flex-1">
                <h3 className="text-base font-black uppercase leading-tight">{item.title}</h3>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[.2em] text-white/40">{item.type}</p>
              </div>

              <div className="mt-3 border-t border-white/10 pt-3">
                <span className="rounded-full border border-acid/40 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[.25em] text-acid/80">
                  {item.status}
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {modal && modalSrc && (
          <motion.div
            key="merch-modal"
            className="fixed inset-0 z-[90] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label="Merch zoom view"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            <motion.div
              className="relative z-10 flex max-h-[90vh] max-w-[90vw] flex-col items-center gap-4"
              initial={reduceMotion ? false : { scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduceMotion ? undefined : { scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image + side arrows */}
              <div className="flex items-center gap-3">
                {/* Left arrow — go to front */}
                <button
                  onClick={() => modal && setModal((p) => p ? { ...p, view: "front" } : null)}
                  disabled={!modalHasBack || modal?.view === "front"}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-lg font-black transition-colors ${
                    modalHasBack && modal?.view !== "front"
                      ? "border-acid/40 bg-black/70 text-acid hover:bg-acid/20"
                      : "border-white/10 bg-black/30 text-white/15 cursor-default"
                  }`}
                  aria-label="View front"
                >
                  ←
                </button>

                <div
                  className="overflow-hidden rounded-2xl bg-white"
                  style={{ boxShadow: "0 0 60px rgba(196,255,0,0.18), 0 0 0 1px rgba(196,255,0,0.35)" }}
                >
                  <div className="h-0.5 w-full bg-acid" />
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={modalSrc}
                      src={modalSrc}
                      alt={`${modalItem?.title} — ${modal.view}`}
                      className="block max-h-[75vh] max-w-[75vw] object-contain"
                      initial={reduceMotion ? false : { opacity: 0, x: modal?.view === "back" ? 18 : -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, x: modal?.view === "back" ? -18 : 18 }}
                      transition={{ duration: 0.18 }}
                    />
                  </AnimatePresence>
                </div>

                {/* Right arrow — go to back */}
                <button
                  onClick={() => modal && setModal((p) => p ? { ...p, view: "back" } : null)}
                  disabled={!modalHasBack || modal?.view === "back"}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-lg font-black transition-colors ${
                    modalHasBack && modal?.view !== "back"
                      ? "border-acid/40 bg-black/70 text-acid hover:bg-acid/20"
                      : "border-white/10 bg-black/30 text-white/15 cursor-default"
                  }`}
                  aria-label="View back"
                >
                  →
                </button>
              </div>

              {/* View label + close */}
              <div className="flex items-center gap-4">
                {modalHasBack && (
                  <span className="text-[10px] font-black uppercase tracking-[.35em] text-acid/70">
                    {modal.view}
                  </span>
                )}
                <button
                  onClick={closeModal}
                  className="rounded-full border border-white/20 bg-black/70 px-6 py-2 text-[10px] font-black uppercase tracking-[.35em] text-white/50 backdrop-blur-sm transition-colors hover:border-acid/50 hover:text-acid"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
