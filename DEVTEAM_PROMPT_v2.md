# Devteam Build Prompt v2 — `/ai-integration` on galmoussan.com

> **How to use this file:** Paste the entire block below (everything between "START PROMPT" and "END PROMPT") into a fresh Claude Code session **inside your `galsportfolio` project root**. Ensure both `SPEC_v2.md` and `GALMOUSSAN_RECON.md` are present in the repo root (or somewhere the agent can read) before starting.

---

## START PROMPT

You are the lead agent for extending the existing `galsportfolio` (galmoussan.com) Next.js project to add a new `/ai-integration` landing page. Two source-of-truth documents exist in your working directory:

1. **`SPEC_v2.md`** — the full build specification. Source of truth for every design, content, and architecture decision.
2. **`GALMOUSSAN_RECON.md`** — a prior reconnaissance report on the existing codebase. Source of truth for what's already in the repo and what you must not break.

**Read both fully before writing a single line of code.** If the spec and recon ever contradict, the recon wins (because the recon describes reality; the spec describes the goal).

### Your mission

Extend the existing `galsportfolio` repo by adding a production-grade `/ai-integration` landing page, matching every requirement in `SPEC_v2.md`, without modifying any existing route, component, or behavior on galmoussan.com.

### Non-negotiable rules

1. **Do not touch any existing source file** outside the narrowly permitted additive changes listed below.

   **Permitted modifications:**
   - `package.json` — add 5 new dependencies (framer-motion, react-hook-form, zod, resend, @vercel/analytics)
   - `src/app/globals.css` — add exactly one new CSS variable: `--fz-hero: clamp(40px, 6vw, 72px);` under `:root`. Nothing else.
   - `.env.local.example` — create this file documenting required env vars

   **Everything else is NEW files only, all scoped to:**
   - `src/app/ai-integration/**` — the entire landing page and its local components/lib/content
   - `src/app/api/early-access/**` — new API route for email capture
   - `src/app/sitemap.ts` — new file (the repo has no sitemap currently)
   - `src/app/robots.ts` — new file (the repo has no robots currently)
   - `tests/ai-integration.spec.ts` — new E2E test file (do not modify existing `tests/portfolio.spec.ts`)

   Any other existing file is off-limits. If you believe you need to modify something outside this list, STOP and add the question to `OPEN_QUESTIONS.md` for Gal.

2. **Do not introduce dependencies not listed in the spec.** shadcn/ui, Radix, styled-components, emotion, clsx — none of it. The existing stack plus the 5 additions is the full allowed set.

3. **Reuse existing design tokens.** The full color palette, typography, border radius, easing, and transition tokens already exist in `globals.css` and `tailwind.config.ts`. Use them. Do not hardcode hex values. Do not introduce new color names.

4. **Reuse existing components where appropriate.** Per spec and recon:
   - `src/components/ui/Icons.tsx` — reuse all icon components
   - `src/components/layout/Footer.tsx` — reuse in the nested AI layout
   - `src/components/ui/ScrollRevealSection.tsx` — reuse for scroll reveals
   - `.outline-button`, `.inline-link`, `.numbered-heading`, `.bullet-list`, `.fadeup-enter`, `.reveal` — existing utility classes, reuse
   - `src/hooks/usePrefersReducedMotion.ts`, `useScrollDirection.ts`, `useScrollReveal.ts` — reuse

5. **Do NOT reuse** `src/components/layout/Nav.tsx`, `HamburgerMenu.tsx`, `SocialSidebar.tsx`, or `EmailSidebar.tsx` — these are homepage-specific and have hardcoded links that would break on the AI page. Build a local `AINav.tsx` inside `src/app/ai-integration/_components/` instead.

6. **Framer Motion is new to this repo.** Use selective imports (`import { motion } from "framer-motion"`) never `import * as`. Code-split the slider component with `next/dynamic` and `ssr: false` if the component is heavy and not above-the-fold.

7. **Use Next.js private folder convention (`_components/`, `_lib/`, `_content/`) to scope everything.** Leading underscore folders inside the App Router are not routed by Next.js. This keeps the AI page self-contained and invisible to the rest of the app.

8. **Follow existing conventions from `.claude/CLAUDE.md`:** one component per file, named exports, `"use client"` only when needed, typed props with TypeScript, Tailwind utilities first, CSS custom properties for tokens (no inline hex), branch name pattern `feat/TXXX-task-name`, commit prefix `[Phase X] TXXX: Brief description`.

9. **Existing tests must continue to pass.** Do not modify `tests/portfolio.spec.ts` even though the recon notes it has stale "Brittany Chiang" references from the template origin — that's a pre-existing issue. Document it in `OPEN_QUESTIONS.md`, don't fix it here.

10. **Performance budget is enforced.** Lighthouse Performance / Accessibility / SEO each ≥ 95 on mobile for both `/ai-integration` and `/ai-integration/for-ecommerce`. First-load JS for the AI page ≤ 150kb gzipped.

### Phase plan

Work in phases. Commit at each phase boundary. Emit a status update to the user between phases in the format specified at the bottom.

**Phase 0 — Orient and plan**
- Read `SPEC_v2.md` completely
- Read `GALMOUSSAN_RECON.md` completely
- Read `.claude/CLAUDE.md` for project conventions
- Read `src/app/layout.tsx`, `src/app/globals.css`, `tailwind.config.ts`, and 3–4 existing section components (`Hero.tsx`, `FeaturedProjects.tsx`, etc.) to absorb the codebase style
- Create a new branch: `feat/T001-ai-integration-foundation`
- Create `OPEN_QUESTIONS.md` at repo root to track anything blocked on Gal
- Commit (just the branch creation — no code yet): `[Phase 0] T001: Orient and create branch`

**Phase 1 — Dependencies and config**
- Install the 5 new dependencies at the exact versions specified in spec section 6.2
- Add the single new `--fz-hero` variable to `globals.css` `:root`
- Create `.env.local.example` with the 3 env vars from spec section 6.3 (documented, no values)
- Verify `.env.local` is in `.gitignore` (should already be via `.gitignore`'s `.env*` pattern)
- Run `npm run build` to confirm nothing is broken
- Commit: `[Phase 1] T001: Add dependencies and AI page config scaffolding`

**Phase 2 — Vertical config system + route skeleton**
- Create the full folder structure under `src/app/ai-integration/` per spec section 3.2
- Create `_lib/verticals/types.ts` with full `VerticalConfig` type per spec section 3.3
- Create `_lib/verticals/default.ts` with complete generic-business content (the only vertical that ships in v1)
- Create `_lib/verticals/_registry.ts` with `getVerticalConfig(slug)` helper that returns config for known slugs and calls `notFound()` for unknown slugs
- Create `_content/faqs.ts`, `_content/tools.ts`, `_content/case-studies.ts` with the full content from spec
- Create `[[...vertical]]/page.tsx` as a minimal placeholder that renders just the hero headline from the resolved config (proves routing works)
- Create `layout.tsx` for the AI page with placeholder nav/footer (full chrome in Phase 3)
- Verify `/ai-integration` renders the default vertical correctly
- Verify `/ai-integration/for-anything` returns 404 (unknown vertical → `notFound()`)
- Commit: `[Phase 2] T001: Vertical config system and route skeleton`

**Phase 3 — All section components (static, no motion yet)**
- Build every `_components/*.tsx` file per spec section 2 (AINav, Hero, BeforeAfterDemo placeholder, SocialProofStrip, ComparisonDiff, Services, Process, CaseStudies, ComingSoon, AboutGal, FAQ, FinalCTA)
- For this phase, BeforeAfterDemo is a static placeholder with visible "Before" and "After" labels but no drag, no animation — just correct layout. Slider interactivity comes in Phase 4.
- Wire every section into the main `page.tsx` in order
- Verify `/ai-integration` renders the full static page with correct copy from default vertical config
- All sections must be responsive (mobile tested at 375px)
- Dual-currency price display (USD primary, ILS secondary) must render in the Services section per spec section 5
- Run `npm run build` and confirm no type errors, no warnings
- Commit: `[Phase 3] T002: All static section layouts`

**Phase 4 — BeforeAfterDemo interactive slider**
- This is the single highest-risk component on the page. Spend disproportionate time here.
- Implement per spec section 4 in full: 3 scenario tabs, draggable handle (Framer Motion `drag="x"`), clip-path reveal, animated workflow diagram on the "after" side with flowing dots (SVG + Framer Motion), simulated counter, keyboard accessibility (arrow keys move 5%), `usePrefersReducedMotion` fallback
- Use `"use client"` directive
- Keep it self-contained — no external dependencies beyond framer-motion
- Test manually on: desktop mouse, mobile touch (physical device or Chrome DevTools touch emulation), keyboard-only
- Write unit tests per spec section 9.1 (handle bounds, scenario switching, keyboard, reduced motion fallback)
- Commit: `[Phase 4] T003: Interactive BeforeAfterDemo slider`

**Phase 5 — Motion polish**
- Hero cycling text animation
- Stats counter animated count-up on scroll (IntersectionObserver)
- Process section hoverable step details
- FAQ accordion expand/collapse animation
- Sticky AI nav transparency → solid on scroll (reuse `useScrollDirection`)
- ScrollRevealSection applied to section entrances where it feels right
- Every animation respects `prefers-reduced-motion` via the existing hook
- Commit: `[Phase 5] T004: Page motion and micro-interactions`

**Phase 6 — Conversion wiring**
- **WhatsApp is the v1 primary CTA.** All "book a call" buttons open `https://wa.me/{NEXT_PUBLIC_WHATSAPP_NUMBER}?text={urlencoded message}` with the pre-fill template: `Hi Gal, I'd like to book a free 30-min AI diagnostic for my business.`
- **Cal.com is deferred to v2.** Env var `NEXT_PUBLIC_CAL_LINK` is documented in `.env.local.example` but expected to be empty in v1. Dev team still writes the CTA logic as: *if `NEXT_PUBLIC_CAL_LINK` is set → open Cal.com modal; else → open WhatsApp.* This way v2 upgrade is a config change only.
- Email capture form in ComingSoon section — react-hook-form + zod validation
- API route `src/app/api/early-access/route.ts` — accepts POST with email, validates with zod, sends via Resend
- Client-side success/error states for the form
- Wire `@vercel/analytics` in the AI page's `layout.tsx` (NOT the root layout — scope to the AI page only)
- Event tracking via `track()` calls on: primary CTA click (WhatsApp open), scenario tab switch, FAQ open, form submit, scroll depth milestones (25/50/75/100%)
- Commit: `[Phase 6] T005: Conversion wiring (WhatsApp, email capture, analytics)`

**Phase 7 — SEO and metadata**
- `generateMetadata` function in `page.tsx` returning per-vertical metadata from config
- `opengraph-image.tsx` in `[[...vertical]]/` using Next.js `ImageResponse` API to dynamically render OG image with vertical name and headline baked in
- JSON-LD `Service` schema injected into the page body per spec section 8.3
- Create `src/app/sitemap.ts` listing all routes (existing + new AI verticals)
- Create `src/app/robots.ts` pointing to the sitemap
- Verify OG image renders by visiting `/ai-integration/opengraph-image` directly
- Commit: `[Phase 7] T006: SEO, metadata, OG images, sitemap, robots`

**Phase 8 — Performance hardening**
- Run Lighthouse on `/ai-integration`, mobile and desktop
- If Performance < 95: code-split BeforeAfterDemo with `next/dynamic`, lazy-load below-the-fold sections, verify all images use `next/image` with explicit dimensions, verify all fonts use `display: swap`
- If Accessibility < 95: run axe DevTools, fix every issue
- If SEO < 95: ensure all metadata populated, schema valid, no missing alt attributes
- Audit bundle size: `ANALYZE=true npm run build` (may require adding `@next/bundle-analyzer` dev dependency — check first if this is wanted or if manual inspection is enough)
- Commit: `[Phase 8] T007: Performance and accessibility hardening`

**Phase 9 — Tests**
- Unit tests per spec section 9.1 in `src/app/ai-integration/_components/__tests__/` — BeforeAfterDemo, FAQ, vertical config resolver
- New E2E test file `tests/ai-integration.spec.ts` per spec section 9.2 — page loads, vertical swap, scenario tab switching, slider drag, FAQ accordion, CTA modal, form validation
- Run `npm run test` and `npm run test:e2e` — all tests (existing + new) must pass
- If existing `tests/portfolio.spec.ts` fails due to known stale Brittany Chiang references, document it in `OPEN_QUESTIONS.md` — do NOT fix it in this build (out of scope)
- Commit: `[Phase 9] T008: Unit and E2E tests`

**Phase 10 — Final QA and release prep**
- Mobile test: iPhone SE (375px) and iPhone 15 Pro Max (430px) via physical device or DevTools
- Desktop test: 1280px, 1440px, 1920px
- Verify all CTAs open WhatsApp with correct pre-filled message
- Verify email capture end-to-end (submit form → check Resend dashboard)
- Verify unknown vertical URLs return 404
- Verify dual-currency price display (USD + ILS) renders correctly in Services section
- Final Lighthouse report on `/ai-integration`, attach scores to final commit message
- Update `OPEN_QUESTIONS.md` with any remaining items for Gal
- Write a short `src/app/ai-integration/README.md` documenting the page's architecture, how to add a new vertical, and how to deploy env var changes
- Commit: `[Phase 10] T009: Release prep — QA pass, final docs`

### Status update format (between every phase)

```
Phase N complete: [phase name]
Commits: [hash — short message]
Tests: [X passing, Y failing if any]
Lighthouse: [scores if measured in this phase, else "not measured"]
Open questions for Gal: [comma-separated list, or "none"]
Next phase: [name]
```

### Final deliverables

When Phase 10 is complete, emit a final summary:

```
Build complete. Ready for Gal review.
Branch: feat/T001-ai-integration-foundation
Total commits: [N]
Routes added: /ai-integration
API routes added: /api/early-access
Files modified (outside additions): package.json, src/app/globals.css, .env.local.example
Final Lighthouse scores (mobile):
  /ai-integration: Perf X / A11y Y / SEO Z
Open questions for Gal: [list from OPEN_QUESTIONS.md]
Next step for Gal:
  1. Review OPEN_QUESTIONS.md
  2. Set RESEND_API_KEY and NEXT_PUBLIC_WHATSAPP_NUMBER in Vercel env
  3. Preview deploy from this branch
  4. Merge to main after approval
```

### Rules of engagement

- **Do not invent content.** If a piece of copy requires information you don't have (e.g., real stats, Cal.com handle), write a placeholder with `TODO: @gal [what's needed]` comment and log it in `OPEN_QUESTIONS.md`. Never fabricate numbers or client names.
- **Do not add features not in the spec.** No newsletter signup, no blog, no cursor effects, no light mode toggle, no 3D effects. If something feels missing, note it in `OPEN_QUESTIONS.md` rather than building it.
- **Do not skip phases.** If a phase feels redundant, still commit a checkpoint so progress is auditable.
- **Do not run `npm install` with `--force` or similar.** If a dependency install fails, stop and report the error.
- **Do not modify `package-lock.json` manually.** Only via `npm install`.
- **Do not commit `.env.local`.** Only `.env.local.example`.
- **Commit messages follow the existing convention:** `[Phase X] TXXX: Brief description`.

Begin Phase 0 by reading `SPEC_v2.md` and `GALMOUSSAN_RECON.md` in full, then confirm understanding of the scope and rules of engagement before proceeding.

## END PROMPT
