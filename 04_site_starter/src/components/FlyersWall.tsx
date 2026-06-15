import SectionShell from "@/components/SectionShell";
import { flyers, sectionCopy } from "@/lib/siteContent";

export default function FlyersWall() {
  return (
    <SectionShell
      id="flyers"
      eyebrow={sectionCopy.flyers.archiveEyebrow}
      title={sectionCopy.flyers.altTitle}
      titleClassName="text-4xl md:text-6xl"
      action={<img src="/brand/nav/flyers-nav-logo.png" className="hidden h-16 md:block" alt={sectionCopy.flyers.altTitle} />}
    >
      <div className="columns-2 gap-4 md:columns-4">
        {flyers.map((flyer) => <img key={flyer.src} src={flyer.src} alt={flyer.name} className="mb-4 rounded-2xl border border-white/10 bg-black/40 motion-safe-transition motion-safe-scale hover:border-acid/70" />)}
      </div>
    </SectionShell>
  );
}
