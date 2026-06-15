import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://deenthegreat.vercel.app"; // update once deployed

export const metadata: Metadata = {
  title: {
    default: "DeenTheGreat — Private Concept Platform",
    template: "%s | DeenTheGreat",
  },
  description:
    "Private brand concept prepared for DeenTheGreat review. Live combat. Streetwear. Community. Not an official public site until approved.",
  keywords: [
    "DeenTheGreat",
    "Deen The Great",
    "boxing",
    "creator boxing",
    "Kick",
    "CrashoutBoyz",
    "concept prototype",
  ],
  authors: [{ name: "DeenTheGreat" }],
  creator: "DeenTheGreat",
  robots: {
    index: false,   // private prototype — keep out of search indexes
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         SITE_URL,
    siteName:    "DeenTheGreat",
    title:       "DeenTheGreat — Private Concept Platform",
    description: "Private brand concept. Live combat, streetwear movement, community. Not official until approved.",
    images: [
      {
        url:    `${SITE_URL}/og-image.jpg`,
        width:  1920,
        height: 1080,
        alt:    "DeenTheGreat — concept platform preview",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "DeenTheGreat — Private Concept Platform",
    description: "Private brand concept prepared for review. Not an official public site.",
    images:      [`${SITE_URL}/og-image.jpg`],
    creator:     "@DeenTheGreat",
  },
  icons: {
    icon: [
      { url: "/brand/favicon/dtg-favicon-16.png",  sizes: "16x16",   type: "image/png" },
      { url: "/brand/favicon/dtg-favicon-32.png",  sizes: "32x32",   type: "image/png" },
      { url: "/brand/favicon/dtg-favicon-48.png",  sizes: "48x48",   type: "image/png" },
      { url: "/brand/favicon/dtg-favicon-64.png",  sizes: "64x64",   type: "image/png" },
      { url: "/brand/favicon/dtg-favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/favicon/dtg-favicon-256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [
      { url: "/brand/favicon/dtg-favicon-180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/brand/favicon/dtg-signal-256.png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor:   "#020302",
  width:        "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
