"use client";
import { useEffect, useState } from "react";

export default function ReplayWalkoutButton() {
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Hide when PitchTourBar is active — it has its own replay button
    const params = new URLSearchParams(window.location.search);
    setIsDemoMode(params.get("demo") === "true");
  }, []);

  if (isDemoMode) return null;

  const replay = () => {
    sessionStorage.removeItem("dtg-intro-seen");
    window.location.href = window.location.pathname + "?demo=true";
  };

  return (
    <button
      onClick={replay}
      aria-label="Replay walkout intro"
      className="fixed bottom-5 left-5 z-50 hidden items-center gap-2 rounded-full border border-acid/30 bg-black/80 px-4 py-2.5 text-[9px] font-black uppercase tracking-[.3em] text-acid/70 backdrop-blur-xl transition-all duration-200 hover:border-acid/60 hover:bg-acid/10 hover:text-acid md:flex"
    >
      <span className="text-acid/50">↺</span>
      Replay
    </button>
  );
}
