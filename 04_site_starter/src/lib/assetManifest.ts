import { crashoutDrops, flyerImages, flyers, mediaPhotos } from "@/lib/siteContent";

const coreBrandAssets = [
  "/brand/core/deen-the-great-wordmark.png",
  "/brand/core/dtg-app-icon-favicon.png",
  "/brand/core/dtg-fighter-crest.png",
  "/brand/core/dtg-monogram-circuit.png",
  "/brand/core/dtg-signal-icon.png",
  "/brand/core/the-greats-community-badge.png",
  "/brand/hero/hero-community-badge.png",
  "/brand/hero/hero-fighter-crest.png",
  "/brand/hero/hero-monogram-circuit.png",
  "/brand/hero/hero-signal-icon.png",
  "/brand/hero/hero-wordmark-wide.png",
  "/brand/nav/contact-nav-logo.png",
  "/brand/nav/crashoutboyz-nav-logo.png",
  "/brand/nav/deenthegreat-home-logo.png",
  "/brand/nav/events-nav-logo.png",
  "/brand/nav/fights-nav-logo.png",
  "/brand/nav/flyers-nav-logo.png",
  "/brand/nav/media-nav-logo.png",
  "/brand/nav/socials-nav-logo.png",
];

const uiAssets = [
  "/ui/boxing-gloves.svg",
  "/ui/crashout-meter.svg",
  "/ui/fight-mode-frame.svg",
  "/ui/poster-wall-frame.svg",
  "/ui/ring-bell.svg",
  "/ui/ring-ropes.svg",
  "/ui/sponsor-signal-badge.svg",
];

export const requiredPublicAssets = Array.from(
  new Set([
    ...coreBrandAssets,
    ...uiAssets,
    ...crashoutDrops.map((drop) => drop.asset),
    ...flyerImages,
    ...flyers.map((flyer) => flyer.src),
    ...mediaPhotos.map((photo) => photo.src),
  ]),
).sort();
