# Prompt 09: Build Crashout Meter and crashout easter egg overlay

You are working inside a Next.js + React + TypeScript + Tailwind project for a private DeenTheGreat pitch prototype.

## Non-negotiable style
- Dark mode only.
- Black, white, and acid neon green.
- Futuristic cyber combat + premium streetwear.
- Distressed/sharp logo assets already exist in `/public/brand`.
- Keep structure clean even with heavy motion.
- This is a private concept. Do not remove approval/disclaimer language.

## Task

1. Implement sticky `CrashoutMeter`.
2. Meter should update by scroll progress through states:
   CALM, LOCKED IN, PRESSURE RISING, CRASHOUT MODE, BELL RINGS.
3. When `dtg-crashout-mode` event fires:
   - show green glitch overlay
   - temporarily shake/pulse background
   - reveal a hidden COB teaser card or message
4. Effect should end automatically and not annoy users.


## Done when
- The app runs with `npm run dev`.
- TypeScript compiles.
- Mobile does not break.
- Reduced motion users are respected.
- The page still clearly says it is a private concept until approved.
