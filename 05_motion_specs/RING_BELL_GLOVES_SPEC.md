# Ring Bell + Swinging Gloves Spec

## Placement
Top center of nav, layered between logo and nav links.

## Behavior
- Idle: gloves swing slowly left/right.
- Scroll fast: swing gets stronger briefly.
- Hover: glow/pulse.
- Click: bell flash and navigate home.
- Never block nav links on mobile.

## Build
Use a React client component with:
- CSS keyframes for idle swing.
- scroll event listener for amplitude changes.
- SVG assets from `/public/ui/`.
