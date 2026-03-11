# GalsPortfolio — Project Conventions

## Stack
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + CSS custom properties
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Fonts:** Inter (sans) + Fira Code (mono) via next/font
- **Icons:** Custom inline SVG components

## Paths
- Code: `/Users/galmoussan/projects/claude/GalsPortfolio/galsportfolio/`
- Docs: `/Users/galmoussan/projects/claude/GalsPortfolio/galsportfolio-docs/`
- Components: `src/components/`
- Data: `src/data/`
- Hooks: `src/hooks/`
- Pages: `src/app/`

## Component Conventions
- One component per file, named exports
- `"use client"` only when useState/useEffect needed
- Props: `interface {Name}Props { ... }`
- Layout components: `src/components/layout/`
- Section components: `src/components/sections/`
- Reusable UI: `src/components/ui/`

## Styling Rules
- Tailwind utility classes as primary styling
- CSS custom properties for all design tokens (defined in `src/app/globals.css`)
- No inline styles except dynamic values
- Order: layout → spacing → typography → colors → effects

## Design Tokens
All in `:root` CSS variables:
- Colors: `--navy`, `--green`, `--slate`, `--lightest-slate`, etc.
- Fonts: `--font-sans`, `--font-mono`
- Sizes: `--fz-xs` through `--fz-heading`
- Layout: `--nav-height`, `--border-radius`
- Animation: `--easing`, `--transition`

## Data Patterns
- Static data in `src/data/` as typed constants
- Each data file exports typed arrays/objects
- No API calls — everything is build-time static

## Commands
```bash
npm run dev        # Development server
npm run build      # Production build
npm run lint       # ESLint
npm run test       # Vitest unit tests
npm run test:e2e   # Playwright E2E tests
```

## Task Board
See `galsportfolio-docs/TASK_BOARD.md` for task tracking.

## Branch Convention
`feat/TXXX-task-name` (e.g., `feat/T001-scaffold`)

## Commit Convention
`[Phase X] TXXX: Brief description`
