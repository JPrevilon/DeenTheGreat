# Prompt 04: Build walkout intro with demo/replay support

You are working inside a Next.js + React + TypeScript + Tailwind project for a private DeenTheGreat pitch prototype.

## Non-negotiable style
- Dark mode only.
- Black, white, and acid neon green.
- Futuristic cyber combat + premium streetwear.
- Distressed/sharp logo assets already exist in `/public/brand`.
- Keep structure clean even with heavy motion.
- This is a private concept. Do not remove approval/disclaimer language.

## Task

1. Complete `WalkoutIntro.tsx` as a 5–7 second boxer walkout POV:
   - black screen
   - entering arena/tunnel
   - crowd silhouettes/camera flashes
   - ring ropes reveal
   - green/white bell flash
   - homepage unlock
2. It must play once per session.
3. `?demo=true` must force replay.
4. Add Skip Intro.
5. Respect `prefers-reduced-motion` by showing a quick static reveal.
6. Keep audio muted by default if any sound is added later.


## Done when
- The app runs with `npm run dev`.
- TypeScript compiles.
- Mobile does not break.
- Reduced motion users are respected.
- The page still clearly says it is a private concept until approved.
