# Vercel Deploy Notes — DeenTheGreat Concept Platform

> **PRIVATE CONCEPT — DO NOT MAKE PUBLIC**  
> This is a pitch prototype for DeenTheGreat management review.  
> Keep the URL unlisted or password-protected until officially approved.

---

## 1. Quick Deploy (CLI)

```bash
cd 04_site_starter
npm install
npm run build        # confirm clean
npx vercel           # first deploy: follow prompts
```

Or connect the GitHub repo in the Vercel dashboard and point the root directory to `04_site_starter/`.

---

## 2. Environment & Settings

| Setting | Value |
|---|---|
| Framework Preset | Next.js |
| Root Directory | `04_site_starter` |
| Build Command | `npm run build` |
| Output Directory | `.next` (auto) |
| Node Version | 18.x or 20.x |
| Environment Variables | None required (prototype has no backend) |

---

## 3. Keep It Private

**Option A — Vercel Password Protection** (recommended for pitch reviews)
1. Vercel Dashboard → Project → Settings → Deployment Protection
2. Enable "Vercel Authentication" (requires Vercel login) OR
3. Enable "Password Protection" (Pro plan) → set a short password to share with management

**Option B — Unlisted URL**
- Simply don't share the URL publicly
- `robots: { index: false }` is already set in `layout.tsx` — search engines will not index it
- Vercel preview URLs are not indexed by default

---

## 4. Update the Site URL

Once deployed, update the `SITE_URL` constant in `src/app/layout.tsx`:

```ts
const SITE_URL = "https://your-actual-url.vercel.app";
```

Then redeploy. This affects Open Graph and Twitter card URLs.

---

## 5. OG Image

A placeholder OG image is at `/public/og-image.jpg` (1920×1080 fight photo).

Before sharing the pitch link, consider replacing it with a proper branded 1200×630 image:
- Recommended: wordmark on void background with acid green glow
- Ideal tool: Figma, Canva, or just export from the site itself at 1200×630

---

## 6. Custom Domain (optional)

If attaching a custom domain (e.g., `pitch.deenthegreat.com`):
1. Vercel Dashboard → Project → Settings → Domains
2. Add domain and follow DNS instructions
3. Update `SITE_URL` in `layout.tsx` to match

---

## 7. After Approval

When DeenTheGreat approves the platform for public launch:

- [ ] Remove `robots: { index: false }` in `layout.tsx`
- [ ] Wire up Kick live stream embed (replace placeholder in `LivePanel.tsx`)
- [ ] Connect waitlist form backend (replace `setSubmitted(true)` in `CrashoutBoyzDropSystem.tsx`)
- [ ] Connect contact form to management email (replace Discord link in `ContactPanel.tsx`)
- [ ] Set `fightMode.date` in `siteContent.ts` when fight is confirmed
- [ ] Verify all fight record results with team before launch
- [ ] Verify all sponsor codes with management
- [ ] Replace OG image with final branded version
- [ ] Remove `AssetIntegrityLog` component from `page.tsx`
- [ ] Remove `ReplayWalkoutButton` from `page.tsx` (pitch helper)
- [ ] Remove `PitchTourBar` from `page.tsx` (pitch helper)
