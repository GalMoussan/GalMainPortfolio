# GALMOUSSAN_RECON.md

**Structured Codebase Reconnaissance for galmoussan.com**
**Purpose:** Context for adding `/ai-integration` landing page without disrupting existing infrastructure.
**Date:** 2026-04-22
**Status:** Read-only analysis

---

## 1. High-level Overview

| Aspect | Details |
|--------|---------|
| **Project Name** | `galsportfolio` |
| **Framework** | Next.js 14.2.35 (App Router) |
| **Router Type** | App Router — confirmed by presence of `src/app/` directory |
| **Language** | TypeScript with `strict: true` mode enabled |
| **Package Manager** | npm (evidenced by `package-lock.json`) |
| **Node Version** | Not specified (no `.nvmrc` or `engines` field in package.json) |
| **Deploy Target** | Vercel (confirmed by `vercel.json` with proxy rewrites) |

**Routing Architecture:** Next.js 14 App Router with file-system routing in `src/app/`.

---

## 2. Dependencies Snapshot

### Production Dependencies

| Package | Version |
|---------|---------|
| `next` | `14.2.35` |
| `react` | `^18` |
| `react-dom` | `^18` |

### Development Dependencies

| Package | Version | Category |
|---------|---------|----------|
| `@playwright/test` | `^1.58.2` | E2E Testing |
| `@testing-library/jest-dom` | `^6.9.1` | Unit Testing |
| `@testing-library/react` | `^16.3.2` | Unit Testing |
| `@types/node` | `^20` | TypeScript |
| `@types/react` | `^18` | TypeScript |
| `@types/react-dom` | `^18` | TypeScript |
| `@vitejs/plugin-react` | `^5.1.4` | Testing |
| `eslint` | `^8` | Linting |
| `eslint-config-next` | `14.2.35` | Linting |
| `jsdom` | `^28.1.0` | Testing |
| `postcss` | `^8` | CSS Processing |
| `tailwindcss` | `^3.4.1` | Styling |
| `typescript` | `^5` | Language |
| `vitest` | `^4.0.18` | Unit Testing |

**Key Observations:**
- **Tailwind CSS:** v3.4.1 present
- **shadcn/ui:** Not installed
- **Framer Motion:** Not installed
- **Form libraries:** None
- **State management:** None (relies on React hooks)
- **ORM/Data layer:** None — all data is static TypeScript exports
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Fonts:** `next/font` with Inter (sans) and Fira Code (mono)
- **Icons:** Custom inline SVG components (no icon library)
- **CMS:** None

---

## 3. Directory Structure

```
galsportfolio/
├── .claude/                 # Project-specific Claude Code config
│   ├── CLAUDE.md            # Project conventions and stack documentation
│   ├── agents/              # Custom agent definitions
│   ├── commands/            # Workflow slash commands
│   └── skills/              # Always-on context modules
├── .next/                   # Next.js build output (ignored)
├── node_modules/            # Dependencies (ignored)
├── public/                  # Static assets
│   ├── images/              # Project screenshots, profile photo, SVG icons
│   ├── resume.pdf           # PDF resume file
│   └── favicon.ico          # Site favicon
├── src/                     # Application source code
│   ├── app/                 # Next.js App Router pages and layouts
│   │   ├── archive/         # Archive page (project list table)
│   │   ├── fonts/           # Font files (if any local fonts)
│   │   ├── tools/           # Interactive tool pages (cinema-query, snake)
│   │   ├── layout.tsx       # Root layout with Nav, Sidebars, Footer
│   │   ├── page.tsx         # Homepage with Hero, About, Experience, Projects, Contact
│   │   ├── globals.css      # Global styles + CSS custom properties
│   │   └── favicon.ico      # App favicon
│   ├── components/          # React components
│   │   ├── layout/          # Nav, Footer, Sidebars, HamburgerMenu, HexLogo
│   │   ├── sections/        # Hero, About, Experience, FeaturedProjects, NoteworthyProjects, Contact
│   │   └── ui/              # Icons, ScrollRevealSection
│   ├── data/                # Static TypeScript data exports
│   │   ├── featured-projects.ts
│   │   ├── jobs.ts
│   │   ├── other-projects.ts
│   │   └── social-links.ts
│   ├── hooks/               # Custom React hooks
│   │   ├── usePrefersReducedMotion.ts
│   │   ├── useScrollDirection.ts
│   │   └── useScrollReveal.ts
│   └── test/                # Test setup files
│       └── setup.ts         # Vitest setup with @testing-library/jest-dom
├── tests/                   # Playwright E2E tests
│   └── portfolio.spec.ts    # E2E test suite for homepage and archive
├── .eslintrc.json           # ESLint config (extends next/core-web-vitals)
├── .gitignore               # Git ignore file
├── next.config.mjs          # Next.js config (empty, default)
├── package.json             # Dependencies and scripts
├── package-lock.json        # npm lockfile
├── playwright.config.ts     # Playwright E2E test config
├── postcss.config.mjs       # PostCSS config for Tailwind
├── README.md                # Project README
├── tailwind.config.ts       # Tailwind config with custom theme
├── tsconfig.json            # TypeScript config with strict mode
├── vercel.json              # Vercel deployment config with proxy rewrites
└── vitest.config.ts         # Vitest unit test config
```

**Annotations:**
- `.claude/` — Project-specific Claude Code configuration for workflows and agents
- `public/` — Static assets served directly (images, resume, favicon)
- `src/app/` — Next.js App Router pages with file-based routing
- `src/components/layout/` — Site chrome (nav, footer, sidebars)
- `src/components/sections/` — Homepage sections (Hero, About, etc.)
- `src/data/` — Typed static content (jobs, projects, social links)
- `tests/` — Playwright E2E tests

---

## 4. Routing and Pages

| URL Path | Source File | Summary | Layout |
|----------|-------------|---------|--------|
| `/` | `src/app/page.tsx` | Homepage with Hero, About, Experience, FeaturedProjects, NoteworthyProjects, Contact sections | `src/app/layout.tsx` |
| `/archive` | `src/app/archive/page.tsx` | Full project list in table format with year, title, tech, links | `src/app/layout.tsx` |
| `/tools/cinema-query` | `src/app/tools/cinema-query/page.tsx` | Embedded iframe of CinemaQuery movie search app | `src/app/layout.tsx` |
| `/tools/snake` | `src/app/tools/snake/page.tsx` | Embedded iframe of Snake game | `src/app/layout.tsx` |
| `/lander` | Proxy rewrite | Proxies to external Vercel deployment (`https://portfolio-kappa-kohl-74.vercel.app/lander`) | External |
| `/lander/:path*` | Proxy rewrite | Proxies to external Vercel deployment with dynamic paths | External |

**Middleware:** None present.

**Dynamic Routes:** None.

**Catch-all Routes:** None.

**Key Observations:**
- All tool pages embed external apps via iframe
- Archive page aggregates data from `featured-projects.ts` and `other-projects.ts`
- `/lander` routes are externally proxied via `vercel.json`

---

## 5. Layouts and Shared Chrome

### Root Layout: `src/app/layout.tsx`

**Wraps:** All pages with:
- `StarBackground` component (animated canvas stars)
- Skip-to-content link (accessibility)
- `Nav` component (header navigation)
- `SocialSidebar` (left sidebar with GitHub, LinkedIn links)
- `EmailSidebar` (right sidebar with email link)
- Main content wrapper with responsive padding
- `Footer` component

**Providers:** None

**Fonts Loaded:**
- `Inter` (sans-serif) via `next/font/google` as `--font-sans`
- `Fira_Code` (monospace) via `next/font/google` as `--font-mono`

**Default Metadata:**
```typescript
{
  title: "Gal Moussan | Fullstack Developer & Tech Lead",
  description: "Gal Moussan is a fullstack developer...",
  openGraph: { title, description, locale: "en_US", type: "website" },
  robots: { index: true, follow: true },
  other: { "theme-color": "#0a192f" }
}
```

### Primary Navigation: `src/components/layout/Nav.tsx`

**Structure:**
- Sticky header with backdrop blur
- Logo (HexLogo) linking to `/`
- Desktop nav links: About, Experience, Work, Contact (anchor links to sections)
- Resume button linking to `/resume.pdf`
- Mobile hamburger menu (HamburgerMenu component)
- Auto-hide on scroll down, reveal on scroll up (via `useScrollDirection` hook)

**Styling:** Glass morphism effect with backdrop blur, navy background, green accents

### Footer: `src/components/layout/Footer.tsx`

**Contents:**
- Mobile-only social icons (GitHub, LinkedIn) — duplicates SocialSidebar for small screens
- "Built by Gal Moussan" link to GitHub profile

**Styling:** Minimal footer with mono font, green hover states

### Other Shared Chrome

- **SocialSidebar** (`src/components/layout/SocialSidebar.tsx`) — Fixed left sidebar with GitHub, LinkedIn icons (hidden on mobile)
- **EmailSidebar** (`src/components/layout/EmailSidebar.tsx`) — Fixed right sidebar with vertical email link (hidden on mobile)
- **StarBackground** (`src/components/StarBackground.tsx`) — Animated canvas background with interactive stars that respond to mouse movement
- **Skip-to-content link** — Accessibility feature in root layout (hidden until focused)

**No cookie banners, announcement bars, or theme toggles present.**

---

## 6. Design System and Styling

### Tailwind Config: `tailwind.config.ts`

**Theme Extensions:**

| Category | Tokens |
|----------|--------|
| **Colors** | `dark-navy`, `navy`, `light-navy`, `lightest-navy`, `dark-slate`, `slate`, `light-slate`, `lightest-slate`, `white`, `green`, `green-tint`, `pink`, `blue` — all mapped to CSS variables |
| **Fonts** | `sans` → `var(--font-sans)`, `mono` → `var(--font-mono)` |
| **Font Sizes** | `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `heading` — all mapped to CSS variables |
| **Border Radius** | `DEFAULT` → `var(--border-radius)` (4px) |
| **Box Shadow** | `navy` → navy shadow with offset and blur |
| **Transition Timing** | `custom` → cubic-bezier easing |

**Custom Animations:** None in Tailwind config — all animations are CSS-based.

### Global CSS: `src/app/globals.css`

**CSS Variables (`:root`):**

```css
/* Colors */
--dark-navy: #020c1b;
--navy: #0a192f;
--light-navy: #112240;
--lightest-navy: #233554;
--navy-shadow: rgba(2, 12, 27, 0.7);
--dark-slate: #495670;
--slate: #8892b0;
--light-slate: #a8b2d1;
--lightest-slate: #ccd6f6;
--white: #e6f1ff;
--green: #57cbff;          /* Teal/cyan accent */
--green-tint: rgba(87, 203, 255, 0.1);
--pink: #f57dff;
--blue: #57cbff;

/* Typography */
--font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif;
--font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

/* Font Sizes */
--fz-xxs: 12px; --fz-xs: 13px; --fz-sm: 14px; --fz-md: 16px;
--fz-lg: 18px; --fz-xl: 20px; --fz-xxl: 22px; --fz-heading: 32px;

/* Layout */
--border-radius: 4px;
--nav-height: 100px;
--nav-scroll-height: 70px;
--tab-height: 42px;
--tab-width: 120px;

/* Animation */
--easing: cubic-bezier(0.645, 0.045, 0.355, 1);
--transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
```

**Base Layer Overrides:**
- `scroll-behavior: smooth`
- Navy background, slate text
- Custom selection colors (lightest-navy bg, lightest-slate text)
- Green dashed outline for `:focus-visible`
- All links inherit color, green on hover

**Custom Classes (`.inline-link`, `.numbered-heading`, `.outline-button`, etc.):**
- `.inline-link` — Animated underline on hover
- `.numbered-heading` — Section headings with auto-incrementing numbers (01., 02., etc.)
- `.bullet-list` — Custom bullet points with green triangles
- `.outline-button` — Green border button with tint hover
- `.project-text-panel`, `.noteworthy-card`, `.project-img` — Glow effects with drop-shadow filters on hover
- `.fadeup-enter` — Fade-up animation keyframes
- `.reveal` — Scroll reveal animation

### Fonts Currently Loaded

| Font | Weights | Source | Variable |
|------|---------|--------|----------|
| **Inter** | Default | Google Fonts via `next/font` | `--font-sans` |
| **Fira Code** | Default | Google Fonts via `next/font` | `--font-mono` |

### Color Palette Actually Used

| Token | Hex Value | Usage |
|-------|-----------|-------|
| `--navy` | `#0a192f` | Background |
| `--green` | `#57cbff` | Accent (teal/cyan, not green) |
| `--slate` | `#8892b0` | Body text |
| `--lightest-slate` | `#ccd6f6` | Headings |
| `--light-navy` | `#112240` | Cards, sections |
| `--lightest-navy` | `#233554` | Borders, dividers |
| `--green-tint` | `rgba(87, 203, 255, 0.1)` | Button hover backgrounds |

**Note:** The "green" color is actually a bright cyan/teal (`#57cbff`), not a true green.

### Dark Mode Setup

**Mode:** None — site is dark-only (navy background, light text)

**Default:** Dark mode with no toggle

### Component Library

**shadcn/ui:** Not installed

**Radix UI:** Not present

**Custom UI:** All components are hand-built with Tailwind classes

**Components in `src/components/ui/`:**
- `Icons.tsx` — Inline SVG icon components (GitHub, LinkedIn, Twitter, Instagram, Codepen, ExternalLink, Folder, Hamburger, Close, HexLogo)
- `ScrollRevealSection.tsx` — Wrapper for scroll-reveal animations

### Animation Approach

**CSS-only animations:**
- Keyframe animations (`@keyframes fadeup`)
- Transition-based animations (`.project-img`, `.noteworthy-card` glow effects)
- Custom easing function (`cubic-bezier(0.645, 0.045, 0.355, 1)`)

**Framer Motion:** Not installed

**Custom Hooks:**
- `usePrefersReducedMotion` — Disables animations for users with reduced motion preferences
- `useScrollDirection` — Tracks scroll direction for nav hide/reveal
- `useScrollReveal` — Intersection Observer for scroll-triggered animations

**Canvas Animation:**
- `StarBackground.tsx` — Custom canvas-based particle animation with mouse interaction

---

## 7. Component Inventory

| File Path | Summary | Client/Server | Config-Driven |
|-----------|---------|---------------|---------------|
| `StarBackground.tsx` | Animated canvas background with 150 interactive stars; responds to mouse movement, spawns burst particles on click | Client (`use client`) | No (hardcoded constants) |
| `layout/EmailSidebar.tsx` | Fixed right sidebar with vertical email link; pulls email from `social-links.ts` | Server | Yes (data file) |
| `layout/Footer.tsx` | Footer with social icons (mobile) and "Built by" credit | Server | Yes (data file) |
| `layout/HamburgerMenu.tsx` | Mobile menu overlay with nav links and Resume button | Client (`use client`) | No (hardcoded links) |
| `layout/HexLogo.tsx` | Hexagonal logo SVG with "G" letter | Server | No |
| `layout/Nav.tsx` | Sticky header nav with auto-hide on scroll; desktop links, Resume button, mobile hamburger | Client (`use client`) | No (hardcoded links) |
| `layout/SocialSidebar.tsx` | Fixed left sidebar with GitHub, LinkedIn icons | Server | Yes (data file) |
| `sections/About.tsx` | About section with bio text, skill list, profile photo | Server/Client | No |
| `sections/Contact.tsx` | Contact section with CTA and email button | Server | No |
| `sections/Experience.tsx` | Job history with tabbed interface; displays company, title, duties | Client (`use client`) | Yes (data file) |
| `sections/FeaturedProjects.tsx` | Featured projects with image, description, tech stack, links | Server | Yes (data file) |
| `sections/Hero.tsx` | Hero section with staggered fade-in animation for name, title, description, CTA | Client (`use client`) | No |
| `sections/NoteworthyProjects.tsx` | Grid of project cards with folder icon, title, description, tech, links | Server | Yes (data file) |
| `ui/Icons.tsx` | Inline SVG icon components (GitHub, LinkedIn, Twitter, Instagram, Codepen, ExternalLink, Folder, Hamburger, Close, HexLogo) | Server | No |
| `ui/ScrollRevealSection.tsx` | Wrapper component for scroll-triggered reveal animations using Intersection Observer | Client (`use client`) | No |

### Reusable for AI Integration Page

**Directly Reusable:**
- `ui/Icons.tsx` — All icon components
- `layout/Nav.tsx`, `layout/Footer.tsx` — If you want to keep site chrome
- `ui/ScrollRevealSection.tsx` — For scroll animations
- `.outline-button`, `.inline-link` classes — Button and link styles
- Color palette and design tokens from `globals.css`

**May Need Modification:**
- `StarBackground.tsx` — Can be reused but may need performance tuning for long sessions

**Not Reusable:**
- Section components (`Hero`, `About`, etc.) — Too homepage-specific
- `HamburgerMenu` — Hardcoded links to homepage sections

**Recommendation:** Build fresh AI-specific components (hero variants, feature cards, pricing tables, etc.) using the existing design system tokens.

---

## 8. Content and Data Sources

### `src/data/` Directory

| File | Format | Contents |
|------|--------|----------|
| `featured-projects.ts` | TypeScript | Array of 5 featured projects with `title`, `description`, `tech[]`, `github?`, `external?`, `image` fields |
| `jobs.ts` | TypeScript | Array of 6 job entries with `company`, `title`, `url`, `range`, `duties[]` fields |
| `other-projects.ts` | TypeScript | Array of 9 smaller projects with `title`, `description`, `tech[]`, `github?`, `external?` fields |
| `social-links.ts` | TypeScript | Array of 2 social links (GitHub, LinkedIn) with `name`, `url` fields; exports `email` constant |

**All data is static TypeScript exports — no dynamic fetching.**

### `public/` Directory

**Static Assets:**
- `public/images/` — 21 files including project screenshots (PNG, WebP, SVG), profile photo (JPEG), placeholder icons
- `public/resume.pdf` — PDF resume (122KB)
- `public/favicon.ico` — Site favicon

### CMS Integration

**None.** All content is hardcoded in TypeScript data files.

### Database

**None.** No Prisma schema, no database connection.

### Environment Variables Referenced

**None found.** No `process.env.*` references in the codebase.

---

## 9. SEO and Metadata

### Page Metadata Generation

**Root Layout (`src/app/layout.tsx`):**
```typescript
export const metadata: Metadata = {
  title: "Gal Moussan | Fullstack Developer & Tech Lead",
  description: "Gal Moussan is a fullstack developer and tech lead...",
  openGraph: { title, description, locale: "en_US", type: "website" },
  robots: { index: true, follow: true },
  other: { "theme-color": "#0a192f" }
}
```

**Tool Pages:** Each exports custom `metadata` with page-specific titles and descriptions:
- `/tools/cinema-query` → `"CinemaQuery | Gal Moussan"`
- `/tools/snake` → `"Snake | Gal Moussan"`

**Method:** Static `metadata` exports (Next.js 14 App Router convention)

### Open Graph Image Approach

**None present.** No `opengraph-image.tsx` files, no static OG images in `public/`.

**Fallback:** Uses default Next.js OG behavior (generates from metadata).

### Sitemap and robots.txt

**Sitemap:** Not present (no `sitemap.ts` or static `sitemap.xml`)

**robots.txt:** Not present (no static file or route handler)

**Note:** `robots: { index: true, follow: true }` is set in root layout metadata.

### Analytics Integrations

**None detected.** No Vercel Analytics, Plausible, Google Analytics, Posthog, or similar integrations found in code.

---

## 10. Build, Test, and Deploy

### Scripts in `package.json`

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Start Next.js development server on port 3000 |
| `build` | `next build` | Production build |
| `start` | `next start` | Start production server |
| `lint` | `next lint` | Run ESLint |
| `test` | `vitest run` | Run Vitest unit tests (one-time) |
| `test:watch` | `vitest` | Run Vitest in watch mode |
| `test:e2e` | `playwright test` | Run Playwright E2E tests |

### Test Setup

**Unit Tests (Vitest):**
- **Framework:** Vitest v4.0.18 with jsdom environment
- **Config:** `vitest.config.ts` — React plugin, jsdom, excludes `tests/` directory
- **Setup:** `src/test/setup.ts` imports `@testing-library/jest-dom`
- **Test Files:** None present in `src/` (unit tests not yet written)

**E2E Tests (Playwright):**
- **Framework:** Playwright v1.58.2
- **Config:** `playwright.config.ts` — Chromium only, starts dev server on port 3000
- **Test Files:** `tests/portfolio.spec.ts` — 15 tests covering homepage and archive page
- **Coverage:** Homepage sections (hero, nav, about, experience, projects, contact, footer), archive page

**Test File Count:** 1 E2E test file (`portfolio.spec.ts`)

**Coverage:** E2E coverage is good; unit test coverage is 0% (no unit tests written).

### Linting and Formatting

**ESLint:**
- **Config:** `.eslintrc.json` — Extends `next/core-web-vitals` and `next/typescript`
- **Rules:** Minimal (relies on Next.js defaults)

**Prettier:** Not configured (no `.prettierrc` or `prettier.config.js`)

**Pre-commit Hooks:** None (no Husky or lint-staged)

### CI Workflows

**None.** No `.github/workflows/` directory present.

### Deploy Config

**`vercel.json`:**
```json
{
  "rewrites": [
    { "source": "/lander", "destination": "https://portfolio-kappa-kohl-74.vercel.app/lander" },
    { "source": "/lander/:path*", "destination": "https://portfolio-kappa-kohl-74.vercel.app/lander/:path*" }
  ]
}
```

**Purpose:** Proxies `/lander` routes to external Vercel deployment.

**Deploy Platform:** Vercel (inferred from `vercel.json` and framework choice)

---

## 11. Known Constraints and Conventions

### Documentation Files

**`.claude/CLAUDE.md`** (Project conventions):
- **Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Vitest, Playwright
- **Fonts:** Inter (sans), Fira Code (mono) via `next/font`
- **Icons:** Custom inline SVG
- **Component Conventions:** One component per file, named exports, `"use client"` only when needed, typed props
- **Styling Rules:** Tailwind utilities first, CSS custom properties for tokens, no inline styles except dynamic values
- **Data Patterns:** Static data in `src/data/` as typed constants, no API calls
- **Task Tracking:** See `galsportfolio-docs/TASK_BOARD.md` (external repo)
- **Branch Convention:** `feat/TXXX-task-name`
- **Commit Convention:** `[Phase X] TXXX: Brief description`

**`README.md`** (User-facing):
- Describes project as "pixel-perfect clone of Brittany Chiang's developer portfolio"
- Lists tech stack and directory structure
- Provides npm commands

### TODO/FIXME/HACK Comments

**None found.** Codebase is clean with no TODO, FIXME, HACK, or XXX comments.

### Deprecated/Legacy/WIP Markers

**None found.** No files or directories marked as deprecated, legacy, or work-in-progress.

### Test Content Discrepancies

**Note:** E2E tests (`tests/portfolio.spec.ts`) reference "Brittany Chiang" content (original portfolio template), but actual site content uses "Gal Moussan" data. Tests will fail on current content.

**Action Required:** Update test assertions to match current site content.

---

## 12. Recommendation Notes for Adding `/ai-integration`

### Where Should the Route Live?

**Recommended Path:**
`src/app/ai-integration/page.tsx` for a simple single-page landing.

**For Nested Verticals (if needed):**
`src/app/ai-integration/[[...vertical]]/page.tsx` for optional catch-all segments (e.g., `/ai-integration/enterprise`, `/ai-integration/startup`).

**Reasoning:** App Router file conventions make this straightforward. The route will automatically inherit the root layout unless you add a nested layout.

### Layout Strategy

**Option 1: Reuse Root Layout**
Keep existing `Nav`, `Footer`, `SocialSidebar`, `EmailSidebar`, `StarBackground`.

**Option 2: Custom Nested Layout (Recommended)**
Create `src/app/ai-integration/layout.tsx` to:
- Remove or simplify nav (no anchor links to homepage sections)
- Remove sidebars (cleaner, focused landing page)
- Keep footer for consistency
- Optionally keep `StarBackground` for brand continuity

**Reasoning:** AI landing pages benefit from a distraction-free layout. A nested layout gives you full control without touching the homepage.

**Example Nested Layout:**
```typescript
// src/app/ai-integration/layout.tsx
import { StarBackground } from "@/components/StarBackground";
import { Footer } from "@/components/layout/Footer";

export default function AIIntegrationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StarBackground />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
```

### Reusable vs. Fresh Components

**Reusable:**
- Design tokens (colors, fonts, spacing) from `globals.css`
- `.outline-button`, `.inline-link` utility classes
- `ui/Icons.tsx` components
- `StarBackground.tsx` (if desired)
- `Footer.tsx` (for consistency)

**Build Fresh:**
- Hero section (AI-specific messaging)
- Feature cards/sections (product benefits, use cases)
- Pricing table (if applicable)
- CTA sections (demo requests, waitlist forms)
- Testimonials/social proof sections

**Reasoning:** Homepage sections are too portfolio-specific. AI landing pages have different content patterns (hero → features → social proof → pricing → CTA).

### Dependencies to Add

**Likely Needed:**
- **Form handling:** Consider `react-hook-form` + `zod` for lead capture forms
- **Animation (optional):** `framer-motion` if you want more sophisticated animations beyond CSS (current site uses CSS-only)
- **CMS (optional):** Sanity, Contentful, or Payload if content will be managed externally

**Not Needed:**
- shadcn/ui (unless you want to start using it now)
- State management (React hooks are sufficient)

### Naming Conflicts or Risks

**No conflicts detected.** Current routes are:
- `/` (homepage)
- `/archive` (project list)
- `/tools/cinema-query`, `/tools/snake` (embedded tools)
- `/lander` (external proxy)

**`/ai-integration` is safe and semantically clear.**

**Alternative Names (if desired):**
- `/ai` — Shorter, but less descriptive
- `/services/ai-integration` — More hierarchical
- `/solutions/ai-integration` — Enterprise-friendly

### Quirks and Gotchas

1. **Test Data Mismatch:** E2E tests reference "Brittany Chiang" (template origin), but site uses "Gal Moussan" data. Tests will fail until updated.

2. **Vercel Proxy Rewrites:** The `/lander` route is proxied to an external deployment. Ensure `/ai-integration` doesn't conflict with future proxy needs.

3. **No Environment Variables:** Current site has zero env vars. If AI landing page needs API keys (e.g., for forms, analytics), you'll need to set up `.env.local` and configure build/deploy accordingly.

4. **No CMS:** All content is hardcoded. If AI landing page content will change frequently, consider adding a headless CMS.

5. **Dark-Only Design:** Site is dark mode only (no toggle). AI landing page should match this aesthetic or introduce a toggle (requires global state or cookie persistence).

6. **Mobile Nav:** `HamburgerMenu.tsx` has hardcoded links to homepage sections (`#about`, `#jobs`, etc.). If you reuse the root layout for `/ai-integration`, the mobile nav will link to nonexistent anchors. **Solution:** Use a nested layout with custom nav.

7. **CSS Custom Properties:** All design tokens are in `globals.css` as CSS variables. New components should follow the same pattern (use `var(--green)`, not `#57cbff` directly).

8. **No Analytics:** Site currently has no analytics. Consider adding Vercel Analytics or Plausible for the AI landing page to track conversions.

9. **Resume Link:** Nav has a `/resume.pdf` button. Ensure this file exists and is accessible from all pages (currently in `public/`).

10. **Accessibility:** Site uses skip-to-content link and semantic HTML. Maintain this standard for AI page (use proper headings, ARIA labels, focus states).

---

## Summary

**galsportfolio** is a clean, production-ready Next.js 14 App Router portfolio site with:
- Tailwind CSS + CSS custom properties for styling
- Static TypeScript data exports (no CMS, no database)
- Custom inline SVG icons (no icon library)
- Minimal dependencies (React, Next.js, Tailwind, Vitest, Playwright)
- E2E test coverage (15 Playwright tests)
- Vercel deployment with proxy rewrites for external tools

**For `/ai-integration`:**
- Create `src/app/ai-integration/page.tsx` (or `[[...vertical]]/page.tsx` for nested routes)
- Add `src/app/ai-integration/layout.tsx` to simplify chrome (remove sidebars, simplify nav)
- Reuse design tokens, button/link classes, icons, footer
- Build fresh AI-specific components (hero, features, pricing, CTAs)
- Add form library if lead capture is needed
- Update E2E tests for the new route
- Consider adding analytics for conversion tracking

**No company-plan, company-execute, or company-expend files found in `~/.claude/` directory.** These files may not exist yet or may need to be created. If they exist elsewhere, please provide their location so they can be copied into this project.

---

**End of Reconnaissance Report**
