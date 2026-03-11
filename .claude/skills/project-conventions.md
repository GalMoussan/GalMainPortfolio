# GalsPortfolio Conventions

## Design System
All design tokens are CSS custom properties on `:root` in `src/app/globals.css`. Key tokens:
- `--navy` (#0a192f) — main background
- `--green` (#64ffda) — accent color
- `--slate` (#8892b0) — body text
- `--lightest-slate` (#ccd6f6) — headings
- `--light-navy` (#112240) — card backgrounds
- `--font-sans` — Inter, system fallbacks
- `--font-mono` — Fira Code, monospace fallbacks

## Tailwind Extensions
Colors, fonts, and sizes extended in `tailwind.config.ts` to reference CSS variables. Use Tailwind classes like `bg-navy`, `text-green`, `font-mono`.

## Component Patterns
- Sections: full-width `<section>` with `id` for scroll targeting, `padding: 100px 0`
- Numbered headings: use `numbered-heading` CSS class (auto-incrementing counter)
- Outline buttons: green border, transparent bg, font-mono, hover fills with green-tint
- Bullet lists: `▹` prefix in green via CSS `::before`

## Animation Patterns
- Entrance: `@keyframes fadeup` with staggered `animation-delay`
- Scroll reveal: IntersectionObserver adds `.reveal` class, CSS handles transition
- Hover: `var(--transition)` (all 0.25s cubic-bezier)
- Nav: scroll direction detection for hide/show, height transition for shrink

## Data Files
- `src/data/jobs.ts` — 5 job entries for Experience tabs
- `src/data/featured-projects.ts` — 3 featured projects
- `src/data/other-projects.ts` — 6+ noteworthy project cards
- `src/data/social-links.ts` — social media URLs and icon mappings
