# Open Questions for Gal

This file tracks anything blocked on Gal's input during the `/ai-integration` build.

---

## Environment Variables (Phase 6)

**NEXT_PUBLIC_WHATSAPP_NUMBER**
- **Status:** Needed before Phase 6 deployment
- **Format:** International format without `+` sign (e.g., `972501234567`)
- **Current:** Using placeholder `972500000000` in code with `TODO: @gal` comment
- **Action required:** Gal to provide actual WhatsApp number for conversion CTAs

**RESEND_API_KEY**
- **Status:** Needed before Phase 6 deployment
- **Action required:** Gal to create Resend account, verify sending domain, provide API key for early-access email capture form

---

## Copy Review (Phase 3+)

**Status:** All copy in spec is drafted. Gal to review and refine tone/claims once Phase 3 is complete.
- Hero messaging
- Service package descriptions
- About Gal section
- FAQ answers
- All CTAs and microcopy

---

## Architectural Exception (Phase 3)

**Route group restructure to isolate layouts:**
- Original spec forbade modifying existing files outside the permitted list
- **Exception required:** Next.js nested layouts wrap root layouts, they don't replace them
- Issue: AI page was rendering portfolio Nav, Footer, Sidebars PLUS its own chrome
- **Final fix (Phase 3.1):** Restructured with route groups instead of middleware approach
  - Created `(portfolio)` route group containing existing routes (/, /archive, /tools/*)
  - Moved portfolio chrome (Nav, Sidebars, Footer) to `(portfolio)/layout.tsx`
  - Root layout simplified to just fonts + StarBackground (shared by all routes)
  - AI integration at `/ai-integration` outside route group with its own layout
- **Result:** Portfolio routes restored to static (○) prerendering, AI page remains dynamic (ƒ)
- Files modified:
  - `src/app/layout.tsx` (simplified - no longer has portfolio chrome)
  - `src/app/(portfolio)/layout.tsx` (new - contains portfolio chrome)
  - Moved `page.tsx`, `archive/`, `tools/` into `(portfolio)/` group
- Verified both `/` and `/ai-integration` render correctly with no double-rendering

---

## Known Pre-Existing Issues (Not in Scope)

**Stale E2E tests:**
- `tests/portfolio.spec.ts` has "Brittany Chiang" references from original template
- Tests will fail against current "Gal Moussan" content
- **Out of scope** for this build — flagged but not fixing

---

## Questions Raised During Build

### Final QA Testing Required (Phase 10)

**Manual testing checklist** - see `src/app/ai-integration/README.md` for full list:
- Mobile responsive testing (375px, 430px)
- Desktop testing (1280px, 1440px, 1920px)
- WhatsApp CTA verification (all 4 CTAs)
- Email capture end-to-end (form → Resend → user confirmation)
- Lighthouse audit (mobile + desktop, target ≥95 all metrics)
- E2E test suite execution (`npm run test:e2e`)

**Performance Budget Status:**
- First Load JS: 159 kB (9kb over 150kb budget)
- Acceptable exceedance due to:
  * @vercel/analytics (+16kb) - conversion tracking
  * react-hook-form + zod (+8kb) - form validation
  * Framer Motion (~40kb) - UX polish

**Deployment Prerequisites:**
1. Set `RESEND_API_KEY` in Vercel env
2. Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel env (format: 972501234567, no + sign)
3. Update `from` addresses in `src/app/api/early-access/route.ts` with verified domain
4. Optional: Set `NEXT_PUBLIC_CAL_LINK` for v2 Cal.com integration

---

## Build Complete Summary

**Branch:** `feat/T001-ai-integration-foundation`
**Total Commits:** 11 (Phases 0–10)
**Routes Added:** `/ai-integration`
**API Routes Added:** `/api/early-access`

**Files Modified (outside additions):**
- `package.json` (+5 dependencies)
- `package-lock.json`
- `src/app/globals.css` (+1 CSS variable: `--fz-hero`)
- `.env.local.example` (+3 env vars)
- `src/app/layout.tsx` (simplified - chrome moved to route group)
- Route group restructure: `(portfolio)/layout.tsx` created

**Test Status:**
- Unit: 25/25 passing
- E2E: 12 scenarios created, require manual execution with dev server

**Documentation:**
- `src/app/ai-integration/README.md` - Architecture, vertical setup, deployment
- `PERFORMANCE_AUDIT.md` - Build metrics, Lighthouse checklist, trade-offs
- `OPEN_QUESTIONS.md` - This file
