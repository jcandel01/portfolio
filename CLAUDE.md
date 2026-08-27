# Portfolio — Jaime Candel

Single-page portfolio. Vite 8 + React 19 + TypeScript + Tailwind CSS v3. No router, no tests, no CI.
Deployed on Netlify (`npm run build` → `dist/`, Node 22).

## Commands

```bash
npm run dev       # vite dev server
npm run build     # tsc -b && vite build  ← the real gate: noUnusedLocals is on
npm run lint      # eslint .
npm run preview   # serve dist/
```

`npm run build` is the safety net. `tsc -b` runs with `noUnusedLocals` and `noUnusedParameters`, so
an orphaned import or unused variable fails the build. Run it after any deletion.

## Design system — source of truth

[DESIGN.md](DESIGN.md) at the repo root is the design system (an Apple analysis in the
[awesome-design-md](https://github.com/VoltAgent/awesome-design-md) format). Its YAML frontmatter
(`colors:`, `typography:`, `rounded:`, `spacing:`, `components:`) is the canonical token set.

**Precedence when DESIGN.md and the `design-taste-frontend` skill disagree:**

| Domain | Authority |
|---|---|
| Color, typography, spacing, radii, elevation, tile structure, responsive breakpoints | **DESIGN.md** |
| Motion, texture, layout variance | **the skill** (see "Taste layer" below) |
| Anti-slop bans | both — they agree |

Never write an inline hex value outside `tailwind.config.js`. Use the Tailwind tokens.

### Already-resolved conflicts — do not relitigate

- **No decorative gradients.** Not in backgrounds, not in text, not in borders. Atmosphere comes from
  imagery. (The previous design had two fixed radial gradients and a `.gradient-text` class; both are
  gone deliberately.)
- **One accent only:** `primary` #0066cc on light surfaces, `primary-on-dark` #2997ff on dark tiles.
  There is no second brand color. Do not add one.
- **Weight ladder is 300 / 400 / 600 / 700.** Weight 500 does not exist in this system. Body is 400,
  strong inline is 600, display is 600.
- **Body copy is 17px, not 16px.** Line-height 1.47, letter-spacing -0.374px. This is the brand's
  reading pace, not an accident.
- **Exactly one shadow exists** (`shadow-product`), and it applies only to device frames / product
  renders resting on a surface. Never on cards, buttons, or text. UI elevation comes from the
  light↔dark surface change instead.
- **No glassmorphism.** The only permitted `backdrop-filter` is `saturate(180%) blur(20px)` on the
  sticky sub-nav and the floating bar — functional, not decorative.
- **Light-dominant.** Canvas is white / parchment `#f5f5f7`; dark near-black tiles alternate for
  rhythm. Do not invert this, and do not add a dark-mode toggle (DESIGN.md notes the dark variants of
  utility cards are undocumented).

### Taste layer — the deliberate deviations from Apple

These come from the skill and are intentional. They live centralized in `src/index.css` and
`src/components/ui/`, not scattered:

1. **Subtle grain** — noise overlay at ≤3% opacity, on **dark tiles only**. Never on light canvases.
2. **Asymmetric offset** — allowed in editorial sections (About, Experience). Project product tiles
   stay centered and symmetric, as DESIGN.md prescribes.
3. **Micro-motion** — `active:scale-[0.95]` as the universal press state (Apple's own
   micro-interaction), plus framer-motion springs on scroll reveals. **No infinite-loop animations.**

### Structural rules

- Sections are full-bleed `<Tile>`s with `rounded-none` and `py-section` (80px). **The background
  color change is the section divider** — no borders, no rules, no shadows between sections.
- Three button grammars and nothing in between: `primary` (pill), `secondary` (ghost pill),
  `utility` (rounded-sm dark). Document default + active/pressed + focus-visible states only —
  DESIGN.md's iteration guide says never document hover.
- Radii grammar: `sm` (8px) compact utility · `lg` (18px) utility cards · `pill` actions. The `md`
  (11px) pearl capsule is rare. Nothing in between.

## Conventions

- **Code comments in English.** (The old codebase mixed Spanish comments into English code.)
- **Site copy in English**, including `index.html` meta tags.
- **Exception:** `EcoVecinosDemo` keeps its internal UI in Spanish ("¡Hola, Jaime!", "Tu impacto
  hoy"). It simulates a Valencian municipal recycling app — the Spanish is realism, not an
  inconsistency. Do not "fix" it.
- Content lives in two hardcoded TS arrays: [src/data/profile.ts](src/data/profile.ts) and
  [src/data/projects.ts](src/data/projects.ts). No CMS, no markdown, no i18n.
- Keep style out of the data files. Project records describe the project, not its appearance.

## The demos

[src/components/demos/](src/components/demos/) holds five fully hardcoded fake apps (~1140 LOC):
Sphere, best365, IdeaTracker, EcoVecinos, Storyforge. They are the portfolio's differentiator and are
meant to stay interactive.

They are **simulated product UI, not portfolio chrome**. Each may keep its own identity (a recycling
app can be green) but must follow the same grammar: radii from the `sm/md/lg/pill` scale, spacing from
the scale, `text-body`/`text-caption`, saturation under 80%, one accent per demo, no glassmorphism,
no decorative gradients.

All five ship in the initial bundle — they are not lazy-loaded. That is a known, accepted tradeoff.
