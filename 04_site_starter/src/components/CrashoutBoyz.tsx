import SectionShell from "@/components/SectionShell";
import { crashoutDrops, sectionCopy } from "@/lib/siteContent";

export default function CrashoutBoyz() {
  return (
    <SectionShell id="crashoutboyz" className="py-24">
      <div className="rounded-[2rem] border border-acid/30 bg-black/70 p-6 md:p-10">
        <img src="/brand/nav/crashoutboyz-nav-logo.png" alt={sectionCopy.crashout.title} className="mx-auto mb-8 max-h-32 object-contain" />
        <p className="mx-auto max-w-3xl text-center text-white/65">{sectionCopy.crashout.finePrint}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {crashoutDrops.map((drop) => <div key={drop.title} className="min-h-64 rounded-3xl border border-white/10 bg-gradient-to-b from-acid/15 to-black p-5 motion-safe-transition motion-safe-lift hover:border-acid/60"><p className="text-xs uppercase tracking-[.3em] text-acid">{drop.status}</p><h3 className="mt-3 text-2xl font-black uppercase">{drop.title}</h3></div>)}
        </div>
      </div>
    </SectionShell>
  );
}
