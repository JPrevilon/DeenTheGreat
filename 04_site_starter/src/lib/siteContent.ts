import { flyers as uploadedFlyers, photos as uploadedPhotos } from "./deenContent";

export const siteMeta = {
  name: "DeenTheGreat",
  conceptFooter: "Private brand concept prepared for DeenTheGreat review. Not an official public site until approved.",
  primaryCta: "Watch Live",
  kickUrl: "https://kick.com/deenthegreat",
  discordUrl: "https://discord.gg/PXE24SN49u",
  ttsUrl: "https://kickbot.com/tips/DeenTheGreat",
};

export const navItems = [
  { label: "Events", href: "#events", img: "/brand/nav/events-nav-logo.png" },
  { label: "Socials", href: "#socials", img: "/brand/nav/socials-nav-logo.png" },
  { label: "CrashoutBoyz", href: "#crashoutboyz", img: "/brand/nav/crashoutboyz-nav-logo.png" },
  { label: "Flyers", href: "#flyers", img: "/brand/nav/flyers-nav-logo.png" },
  { label: "Fights", href: "#fights", img: "/brand/nav/fights-nav-logo.png" },
  { label: "Media", href: "#media", img: "/brand/nav/media-nav-logo.png" },
  { label: "Contact", href: "#contact", img: "/brand/nav/contact-nav-logo.png" },
];

export const heroContent = {
  eyebrow: "Streamer // Boxer // Live Daily // Crashout Boyz",
  headline: "From the stream to the ring.",
  body: "A private concept platform for DeenTheGreat: live content, fight archive, CrashoutBoyz merch direction, flyers, socials, and upcoming events in one futuristic headquarters.",
  wordmark: "/brand/hero/hero-wordmark-wide.png",
  ctas: [
    { label: siteMeta.primaryCta, href: siteMeta.kickUrl, external: true, variant: "primary" },
    { label: "Crashout Boyz", href: "#crashoutboyz", external: false, variant: "outline" },
  ],
};

export const liveHub = {
  eyebrow: "Live command center",
  title: "Kick stream hub",
  body: "Embed the Kick player here after technical verification. The first prototype can use a direct Watch Live CTA so it stays reliable during the stream pitch.",
  signalAsset: "/brand/core/dtg-signal-icon.png",
  embedLabel: "Kick embed zone",
  linksEyebrow: "Quick links",
};

export const fightMode = {
  enabled: true,
  status: "Opponent Loading",
  eyebrow: "NEXT FIGHT MODE",
  headline: "UFC FIGHTER TBA",
  subheadline: "The next walkout is being prepared. Date and opponent will update once confirmed.",
  date: null as string | null,
  venue: "TBA",
  cta: "Join The Greats",
};

export const crashoutStates = [
  "CALM",
  "LOCKED IN",
  "PRESSURE RISING",
  "CRASHOUT MODE",
  "BELL RINGS",
];

export const socialLinks = [
  { label: "Kick", href: siteMeta.kickUrl, note: "Primary live stream hub" },
  { label: "Instagram", href: "https://www.instagram.com/deenthegreat", note: "Main visual/social platform" },
  { label: "YouTube", href: "https://www.youtube.com/@deenthegreat1", note: "Long-form video and fight/stream content" },
  { label: "TikTok", href: "https://www.tiktok.com/@deenthegreat1", note: "Short-form content" },
  { label: "X", href: "https://x.com/DeenTheGreat", note: "Updates and community" },
  { label: "Discord", href: siteMeta.discordUrl, note: "The Greats community" },
  { label: "Kickbot TTS", href: siteMeta.ttsUrl, note: "Stream support / TTS" },
];

export const sponsorSignals = [
  { brand: "Punt", code: "COB", status: "Public promo code signal / verify before launch" },
  { brand: "Kirgo", code: "DEEN", status: "Public promo code signal / verify before launch" },
  { brand: "Kick", code: "Partner", status: "Primary streaming platform" },
  { brand: "Misfits / DAZN", code: "Fight archive", status: "Fight content ecosystem" },
  { brand: "Brand Risk Promotions", code: "Fighter profile", status: "Streamer fight ecosystem" },
];

export const fightHistory = [
  { date: "Aug. 27, 2022", opponent: "Evil Hero", location: "O2 Arena, London", result: "Win by TKO" },
  { date: "Nov. 19, 2022", opponent: "Walid Sharks", location: "Moody Center, Texas", result: "Win by TKO" },
  { date: "Mar. 4, 2023", opponent: "Pully Arif", location: "Telford International Centre", result: "Win by unanimous decision" },
  { date: "July 22, 2023", opponent: "Walid Sharks tag bout", location: "Misfits event", result: "Win by unanimous decision" },
  { date: "Oct. 14, 2023", opponent: "Walid Sharks 2", location: "Manchester Arena", result: "Win by unanimous decision" },
  { date: "Aug. 31, 2024", opponent: "Dave Fogarty", location: "3Arena, Dublin", result: "Win by TKO R3" },
  { date: "Feb. 1, 2025", opponent: "Pully Arif / listing requires verification", location: "Brand Risk / verify", result: "Verify before launch" },
  { date: "Dec. 20, 2025", opponent: "Amado Vargas", location: "Misfits Mania Dubai", result: "Loss by unanimous decision / verify wording with team" },
];

export const events = [
  { title: "Upcoming Fight", status: fightMode.headline, date: "TBA", location: "TBA", type: "Fight announcement pending" },
  { title: "Live Daily", status: "Kick stream", date: "Daily", location: "Kick.com/DeenTheGreat", type: "Stream" },
  { title: "CrashoutBoyz Drop 001", status: "Concept merch preview", date: "After approval", location: "Private concept", type: "Merch" },
];

export const crashoutDrops = [
  { title: "COB Heavyweight Tee", type: "T-Shirt", status: "Coming Soon", asset: "/brand/nav/crashoutboyz-nav-logo.png" },
  { title: "CrashoutBoyz Hoodie", type: "Hoodie", status: "Concept Preview", asset: "/brand/core/dtg-fighter-crest.png" },
  { title: "Fight Night Tee", type: "T-Shirt", status: "Limited", asset: "/brand/core/deen-the-great-wordmark.png" },
  { title: "COB Cap", type: "Accessory", status: "Coming Soon", asset: "/brand/core/dtg-app-icon-favicon.png" },
];

export const fanWall = [
  { title: "Crashout of the Week", note: "Community spotlight placeholder" },
  { title: "Fan Art Wall", note: "Coming soon" },
  { title: "Giveaway Winners", note: "Coming soon" },
  { title: "Best Clip of the Week", note: "Coming soon" },
];

export const sectionCopy = {
  crashout: {
    eyebrow: "Drop 001",
    title: "CrashoutBoyz",
    body: "The concept drop: heavyweight streetwear built around the COB movement.",
    cta: "Join Waitlist",
    finePrint: "Concept collection preview. Not available for purchase until approved.",
  },
  fightArchive: {
    eyebrow: "Fight archive",
    title: "Fights",
    note: "Record wording must be confirmed before public launch.",
  },
  events: {
    eyebrow: "Upcoming",
    title: "Events",
  },
  flyers: {
    eyebrow: "Poster Archive",
    title: "Flyer Wall",
    altTitle: "Flyers",
    archiveEyebrow: "Promo archive",
  },
  fanWall: {
    eyebrow: "Community",
    title: "The Greats",
    body: "A community wall for fan clips, giveaways, fan art, and stream moments.",
    cta: "Join Discord",
    badge: "/brand/core/the-greats-community-badge.png",
  },
  social: {
    eyebrow: "Social hub",
    title: "Socials",
    sponsorEyebrow: "Sponsors / codes",
  },
  media: {
    eyebrow: "Media archive",
    title: "Media",
  },
  sponsors: {
    eyebrow: "Brand Deals",
    title: "Partner With Deen",
    body: "Stream activations, fight-night sponsorships, giveaways, promo codes, and CrashoutBoyz merch collaborations in one sponsor-ready funnel.",
    offerings: ["Stream Activation", "Fight-Night Sponsor", "Giveaway Sponsor", "Merch Collab"],
    finePrint: "Verify sponsor codes and relationships with management before public launch.",
    badge: "/ui/sponsor-signal-badge.svg",
  },
  contact: {
    title: "Brand deals. Fights. Stream collabs.",
    body: "Route this to the confirmed management/business contact after approval. For the pitch prototype, keep this as a controlled inquiry panel.",
    logo: "/brand/nav/contact-nav-logo.png",
    ctas: [
      { label: "Join Discord", href: siteMeta.discordUrl, variant: "primary" },
      { label: "Kickbot TTS", href: siteMeta.ttsUrl, variant: "outline" },
    ],
  },
};

export const flyers = uploadedFlyers;
export const flyerImages = flyers.slice(0, 16).map((flyer) => flyer.src);
export const mediaPhotos = uploadedPhotos;
