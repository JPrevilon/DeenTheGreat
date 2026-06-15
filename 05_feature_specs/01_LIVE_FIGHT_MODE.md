# Live Fight Mode

## Goal
Create a homepage takeover state for when Deen has an upcoming fight or major stream event. Right now the opponent/date can be unknown, so the UI must support `TBA`.

## UX
- If `fightMode.enabled === true`, the hero receives a green fight-night overlay.
- Show: `NEXT FIGHT`, opponent, date, venue, status, countdown if date exists.
- If opponent/date unknown, show “UFC FIGHTER TBA” and “Contract loading.”
- Add a “Notify Me” / “Join The Greats” CTA.
- Add a pulsing HUD frame using `/ui/fight-mode-frame.svg`.

## Data
Use `fightMode` in `src/lib/siteContent.ts`.

## Important
Do not hardcode a fight opponent or date unless confirmed.
