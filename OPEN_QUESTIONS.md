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

_(Will be populated as build progresses)_
