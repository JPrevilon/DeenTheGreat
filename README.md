# DeenTheGreat — Private Concept Platform

> **PRIVATE PITCH PROTOTYPE — NOT AN OFFICIAL SITE**  
> This is a private concept prepared for DeenTheGreat management review.  
> Do not redistribute or make public until officially approved.

---

## What This Is

A full-stack brand platform prototype for **DeenTheGreat** — combat creator, streetwear pioneer, community builder. Built to show what the brand can look like at full execution.

Sections:
- **Walkout Intro** — cinematic arena entrance before the page loads
- **Hero** — live identity + primary CTAs
- **Fight Mode Takeover** — pre-fight countdown and event staging
- **CrashoutBoyz Drop System** — streetwear drops and waitlist
- **Fights & Events** — fight record timeline and upcoming card
- **Flyer Wall** — 3D poster archive from events
- **Fan Wall** — community clips and Crashout of the Week
- **Social Hub** — Kick, Discord, Instagram, YouTube, TikTok, X
- **Sponsor / Deal Page** — partnership offerings
- **Contact Panel** — business inquiry funnel
- **Footer** — brand navigation and concept disclaimer

---

## Quick Start (Local Dev)

```bash
# 1. Go into the Next.js project
cd 04_site_starter

# 2. Install dependencies (first time only)
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Demo Mode

### Activate Demo Mode

Append `?demo=true` to any URL to activate the full presentation experience:

```
http://localhost:3000/?demo=true
```

When demo mode is active:
- The **Walkout Intro** replays every time (ignores the session gate)
- A **Demo Tour Bar** appears at the bottom of the screen with labeled section stops and ← → navigation
- Stop buttons scroll you directly to each key section in order

### Demo Tour Stops

| # | Label | What It Shows |
|---|---|---|
| 01 | Intro | Replay walkout from the top |
| 02 | Hero | Main identity, CTAs, live presence |
| 03 | Fight Mode | Pre-fight countdown staging |
| 04 | CrashoutBoyz | Drop system + streetwear waitlist |
| 05 | Flyers | 3D poster wall |
| 06 | Sponsors | Partnership offering page |

---

## How to Run the Demo on Discord or Stream

### Step 1 — Deploy or run locally

Deploy to Vercel (see [`VERCEL_DEPLOY_NOTES.md`](VERCEL_DEPLOY_NOTES.md)) **or** run locally with `npm run dev` and use a screen share.

### Step 2 — Open the demo URL

Share your screen and navigate to:
```
https://your-url.vercel.app/?demo=true
```
or on local:
```
http://localhost:3000/?demo=true
```

The walkout intro will play automatically. Let it run — it sets the tone.

### Step 3 — Walk the pitch path

Use the Demo Tour Bar at the bottom of the screen to navigate:

```
[01 Intro] → [02 Hero] → [03 Fight] → [04 Drop] → [05 Flyers] → [06 Sponsors]
```

Or use the **← →** arrow buttons to step through in order.

### Step 4 — Hit the easter egg (optional, great for streams)

While on the navbar, click the **boxing gloves** 5 times quickly. This triggers "CRASHOUT MODE" — a glitch takeover with the CrashoutBoyz teaser. Dismiss it and continue the tour.

### Step 5 — Replay anytime

- Click **↺ Replay** in the Demo Tour Bar to fire the intro again
- Or append `?demo=true` to the URL and reload

### Notes for Discord screenshare

- Use Chrome or Firefox (not Safari) for best animation performance
- Set browser zoom to 100% — the layout is optimized for full-width
- For a clean pitch, use Chrome's **Guest Profile** so no personal tabs show
- If streaming on OBS, set canvas to 1920×1080 and capture the browser window directly

---

## Deploying (Vercel)

See [`VERCEL_DEPLOY_NOTES.md`](VERCEL_DEPLOY_NOTES.md) for full instructions.

Short version:

```bash
cd 04_site_starter
npm run build        # verify clean
npx vercel           # deploy
```

Keep the URL unlisted or password-protected during the review phase.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v3 (custom acid/void/panel theme) |
| Animation | Framer Motion 11 |
| Language | TypeScript |
| Deploy | Vercel |

---

## Private Concept Notice

All content in this project — fight records, sponsor codes, social links, merch items, and community features — are **concept placeholders**. Nothing is live, confirmed, or for sale until approved by DeenTheGreat management.

After approval, see the **After Approval** checklist in [`VERCEL_DEPLOY_NOTES.md`](VERCEL_DEPLOY_NOTES.md).
