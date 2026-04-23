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

## Known Pre-Existing Issues (Not in Scope)

**Stale E2E tests:**
- `tests/portfolio.spec.ts` has "Brittany Chiang" references from original template
- Tests will fail against current "Gal Moussan" content
- **Out of scope** for this build — flagged but not fixing

---

## Questions Raised During Build

_(Will be populated as build progresses)_
