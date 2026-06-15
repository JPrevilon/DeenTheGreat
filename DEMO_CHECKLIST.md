# Demo & Screenshot Checklist — DeenTheGreat Concept Platform

Run `npm run dev` in `04_site_starter/` then walk through each item below.

---

## Walkout Intro

- [ ] On first load (or `?demo=true`), the intro plays automatically
- [ ] "ENTERING THE ARENA" text appears, wordmark materialises, white flash, ropes, bell hit
- [ ] "Skip Intro" button is visible and dismisses the intro immediately
- [ ] After dismiss, page scrolls straight to the hero
- [ ] Second load (same tab) skips the intro entirely (sessionStorage gate)
- [ ] Append `?demo=true` to the URL to replay at any time
- [ ] "Replay Walkout" button (bottom-left, desktop only) replays correctly
- [ ] **Reduced motion:** intro shows a static wordmark for 1.5 s then dismisses
- [ ] **Mobile:** intro skips the 7 s tunnel, shows the 1.5 s static reveal

---

## Navbar

- [ ] Fixed at top, never overlaps content (body has `pt-24` via `SectionShell`)
- [ ] Ring bell glows at idle; clicking it flashes green + scrolls to `#home`
- [ ] Boxing gloves swing gently at idle; scroll makes them tilt
- [ ] Click gloves 5× → "CRASHOUT MODE" easter egg triggers
- [ ] Click counter `1/5 … 4/5` appears below gloves during the sequence
- [ ] Desktop (lg+): nav logo links are visible in the right cluster
- [ ] Mobile: hamburger appears, gloves/bell are hidden
- [ ] Mobile drawer opens/closes with animation
- [ ] All nav links close the mobile drawer on tap
- [ ] "Watch Live" shows as "Live" on small screens, "Watch Live" on sm+
- [ ] **Reduced motion:** no swing, no glowing filter animation

---

## Hero

- [ ] Wordmark loads without layout shift (space reserved by `aspect-[4/1]`)
- [ ] Fighter crest is visible as a ghost on the right side
- [ ] Stagger entrance animation: eyebrow → wordmark → headline → body → CTAs
- [ ] "Watch Live" CTA opens Kick in new tab
- [ ] "Join Discord" CTA opens Discord in new tab
- [ ] "CrashoutBoyz" CTA scrolls to `#crashoutboyz`
- [ ] "Private concept · Not an official site until approved" line is visible
- [ ] **Reduced motion:** all elements appear instantly, no stagger

---

## Reactive Background

- [ ] Mouse glow follows cursor across the hero (acid green radial glow)
- [ ] Scrolling creates a subtle parallax shift in the grid and smoke layers
- [ ] Scan line animation visible, looping
- [ ] **Mobile:** smoke blobs use lighter blur (less GPU load)
- [ ] **Reduced motion:** static center glow, no scan animation, no parallax

---

## Live Panel (Kick Command Center)

- [ ] "OFFLINE" state shown by default with white/dim dot
- [ ] 16:9 embed zone has HUD corner brackets and signal icon breathing
- [ ] "Watch Live on Kick", "Join The Greats", "Kickbot TTS" command links all work
- [ ] Signal stats grid shows record, platform, stream frequency, mode
- [ ] Giveaway slot shows "No active giveaway" placeholder
- [ ] "Kick player embeds after approval" note is visible

---

## Fight Mode Takeover

- [ ] If `fightMode.enabled = true` and `fightMode.date = null`: TBA chips visible
- [ ] Fighter crest panel on the right shows "Loading…" for opponent
- [ ] "Join The Greats" CTA links to Discord (not `#socials`)
- [ ] Disclaimer: "Opponent & date pending confirmation · Not official until approved."
- [ ] If a future date is set, countdown tiles appear with days/hrs/mins/secs

---

## CrashoutBoyz Drop System

- [ ] Drop 001 status strip shows "Coming Soon" / "Drop Date: TBA"
- [ ] 4 product cards visible in a responsive grid (4 cols desktop, 2 on tablet, 1 on mobile)
- [ ] Each card has art area, status chip, title, type, and "Concept preview only" footer
- [ ] Waitlist panel shows email input + "Join Waitlist" button
- [ ] Submitting an email shows the "You're on the list" confirmed state
- [ ] CrashoutBoyz nav logo appears in the section header (desktop)
- [ ] Fine print: "Concept collection preview. Not available for purchase until approved."

---

## Fights & Events

- [ ] Fight timeline: 8 past fights + 1 upcoming, each with result badge/color
- [ ] Win = acid green badge, Loss = white/dim badge, Unconfirmed = grey/transparent
- [ ] Timeline dots pulse on upcoming fight
- [ ] Unconfirmed entries show "⚠ Verify before launch" and 60% opacity
- [ ] Events column: dominant upcoming fight card with "Join The Greats" CTA
- [ ] Stream and merch events below the dominant card
- [ ] Fight archive note: "Record wording must be confirmed before public launch"

---

## Poster Wall (Flyer Grid)

- [ ] 16 flyer posters load lazily in a 4-col grid (2 on sm, 1 on xs)
- [ ] Desktop: cards have a subtle 3D rotateY tilt by column
- [ ] Hover: card scales forward with acid green glow
- [ ] Click opens a full-screen modal with `object-contain` (no text cropping)
- [ ] Left/right arrows navigate between posters in the modal
- [ ] Counter `01 / 16` visible in modal
- [ ] Esc key closes the modal
- [ ] Disclaimer: "Private concept preview. Not for redistribution until approved."
- [ ] **Reduced motion:** no tilt, no scale, no glow on hover

---

## Fan Wall

- [ ] "The Greats" badge visible with acid glow
- [ ] "Crashout of the Week" featured card spans full width on md+
- [ ] All 4 wall slots have play button, grid overlay, and HUD corner accents
- [ ] "Join The Greats" and "Submit Clips" CTAs both link to Discord
- [ ] Discord pull banner at the bottom
- [ ] Fine print: "Community features activate post-approval."

---

## Social Hub

- [ ] Kick hero card is prominent with live pulse dot
- [ ] Other 6 platforms in a 2-col staggered grid
- [ ] Kick and Discord get acid treatment, others are white/dim
- [ ] Sponsor signals panel shows all 5 brands with code chips
- [ ] All social links open in new tab
- [ ] Fine print: "Verify all codes and partnerships before public launch."

---

## Media Grid

- [ ] 12 photos in a 4-col grid (3 on md, 2 on sm)
- [ ] Hover scales image and shows acid border + "View" label
- [ ] Click opens lightbox with arrow navigation and counter
- [ ] Esc closes lightbox
- [ ] Fine print: "Private media archive — concept preview only."

---

## Sponsor / Brand Deal Page

- [ ] 5 offering cards: Stream Activation, Fight-Night Sponsor, Giveaway, Promo Code, Merch Collab
- [ ] Hover shows subtle left bloom on each card
- [ ] Right panel shows 5 sponsor signals with brand + code chip + verify note
- [ ] Sticky on desktop, stacks on mobile
- [ ] "Get In Touch →" scrolls to `#contact`
- [ ] Stat rail at bottom: Platform / Community / Fight record / Merch
- [ ] Fine print: "Sponsor relationships require management verification before public launch."

---

## Contact Panel

- [ ] 5 inquiry types selectable: Sponsorship, Merch Collab, Booking, Media, Site Handoff
- [ ] Active chip has acid highlight; inactive chips are white/dim
- [ ] Right panel animates when switching types (`AnimatePresence mode="wait"`)
- [ ] Scope hint box updates per type
- [ ] "Reach Out on Discord" = primary CTA; "Stream Support / TTS" = secondary
- [ ] Prototype note: "No data is collected or stored."
- [ ] Bottom strip: full concept footer text

---

## Footer

- [ ] DTG wordmark fades in on scroll
- [ ] Platform chips: Kick / Discord / TTS all link correctly
- [ ] 3 nav columns: Live / Sections / Prototype
- [ ] "Replay Intro" link in Prototype column = `?demo=true`
- [ ] "Private Concept" / "Not Official Until Approved" / "Prepared For Review" badges
- [ ] Full concept footer text centered
- [ ] Bottom row: "This is not an official public site" with acid dot

---

## Crashout Easter Egg (hidden)

- [ ] Click boxing gloves in navbar 5× → "CRASHOUT MODE ENABLED" overlay appears
- [ ] Glitch scan bars animate across screen
- [ ] COB teaser card bounces in with shake
- [ ] Auto-dismisses after ~4.2 seconds OR tap anywhere to dismiss
- [ ] "Dismiss" button in card also works
- [ ] "View Drop" CTA scrolls to `#crashoutboyz`

---

## Crashout Meter (desktop only)

- [ ] Visible as a fixed widget bottom-right on md+
- [ ] Scrolling through the page fills the 5 segments
- [ ] Label updates: CALM → LOCKED IN → PRESSURE RISING → CRASHOUT MODE → BELL RINGS
- [ ] During easter egg: segments flash, border and background go full acid
- [ ] Auto-resets 5 s after easter egg

---

## Global QA

- [ ] TypeScript: `npx tsc --noEmit` → 0 errors
- [ ] Build: `npm run build` → no errors, no warnings
- [ ] No horizontal scroll at 375px viewport width
- [ ] Navbar never overlaps section content (check at every breakpoint)
- [ ] All buttons have accessible names (test with screen reader or browser a11y tools)
- [ ] `prefers-reduced-motion: reduce` disables all animations globally
- [ ] `robots noindex` confirmed in page source (view source → look for `<meta name="robots">`)
- [ ] OG preview: paste the Vercel URL into <https://opengraph.xyz> or Slack to verify card
