# Prompt 03: Build global layout, section shell, and content data

You are working inside a Next.js + React + TypeScript + Tailwind project for a private DeenTheGreat pitch prototype.

## Non-negotiable style
- Dark mode only.
- Black, white, and acid neon green.
- Futuristic cyber combat + premium streetwear.
- Distressed/sharp logo assets already exist in `/public/brand`.
- Keep structure clean even with heavy motion.
- This is a private concept. Do not remove approval/disclaimer language.

## Task

1. Use `src/lib/siteContent.ts` as the source of truth for links, fight mode, sponsors, drops, events, fan wall, and flyers.
2. Create a `SectionShell` component for consistent spacing, titles, eyebrow text, and optional HUD corners.
3. Refactor sections to use data from `siteContent.ts` rather than hardcoding repeated content.
4. Keep unconfirmed fight opponent/date as TBA.


## Done when
- The app runs with `npm run dev`.
- TypeScript compiles.
- Mobile does not break.
- Reduced motion users are respected.
- The page still clearly says it is a private concept until approved.
