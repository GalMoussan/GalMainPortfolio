# `/ai-integration` Landing Page — Build Spec v2

**Repo:** `galsportfolio` (galmoussan.com)
**Owner:** Gal Moussan
**Route:** `src/app/ai-integration/[[...vertical]]/page.tsx` (catch-all for vertical variants)
**Layout:** `src/app/ai-integration/layout.tsx` (nested, replaces portfolio chrome with a focused one)
**Goal:** Ship a vertical-adaptable AI integration sales page that converts established SMBs (10+ employees) into free discovery calls, without touching a single existing route or component on galmoussan.com.
**Core positioning:** *"Most AI consultants build you Zapier workflows. I build you autonomous agent systems — the same architecture enterprise AI teams ship, engineered for businesses your size."*

> **This spec is aligned with `GALMOUSSAN_RECON.md` dated 2026-04-22.** It assumes Next.js 14.2.35, App Router, TypeScript strict, Tailwind 3.4, Inter + Fira Code via `next/font`, a navy/teal design system driven by CSS custom properties, and no existing form/animation libraries. New dependencies introduced by this spec are listed explicitly in section 6.

---

## 1. Strategic foundation (unchanged from v1 — restated for the dev team)

### 1.1 Primary ICP (v1 default vertical)

**The "ongoing business, 10+ employees" operator.**
- Owner, COO, or ops lead at a profitable business past survival mode
- Team of 10–50 people doing repetitive work tools should handle
- Has tried Zapier, Monday, or hired a VA — felt the ceiling
- Watching ChatGPT explode, anxious they're falling behind
- No in-house tech team capable of building agent systems
- Comfortable with $3k–$10k investments when ROI is clear

### 1.2 Positioning lock

> **Autonomous agent systems, built by one person, at SMB prices.**

Copy rules:
- Never say "chatbot" unqualified. Say "AI agent" or "autonomous agent."
- Never say "automation" alone. Say "agentic automation" or "AI-powered workflow."
- Compare against Zapier/Make consultants explicitly.
- Lean on builder-not-consultant. Agencies ship decks. Gal ships systems.

### 1.3 Unfair advantages (surface throughout)

- Multi-agent orchestration experience (`project-factory`, `multi-agent-company`)
- Shipped production AI: AuthorLex, Digital Creator AI Agent platform, reelSearch, CinemaQuery
- Ships with bleeding-edge models within days of release
- Fullstack + tech lead, 5+ years — can architect *and* build

### 1.4 Primary conversion goal

**One goal:** book a free 30-minute discovery call. Every CTA on the page routes there. No competing secondary conversions.

**v1 booking mechanism: WhatsApp only.** All primary CTAs open a WhatsApp chat with a pre-filled message:
`Hi Gal, I'd like to book a free 30-min AI diagnostic for my business.`

This matches Achiya's approach and is culturally native for the Israeli SMB market. Conversion friction is lower than a calendar tool for this audience — prospects already live in WhatsApp.

**v2:** Gal will set up Cal.com and the primary CTA will shift to opening a Cal.com modal, with WhatsApp becoming the fallback. The `NEXT_PUBLIC_CAL_LINK` env var is still documented in v1 so the switch is a config change, not a code change.

---

## 2. Page architecture (12 sections, fixed order)

Narrative arc depends on this order. Do not reshuffle.

### Section 0 — Top nav (sticky, minimal, AI-page-specific)

Lives in `src/app/ai-integration/layout.tsx`, **not** the existing `Nav.tsx`. It shares visual language (backdrop blur, navy bg on scroll) but has different links.

- **Left:** HexLogo reused from `src/components/ui/Icons.tsx`, clicks to `/` (back to portfolio)
- **Center (desktop):** 4 anchor links — "What I build", "How it works", "Pricing", "FAQ" — smooth-scroll to matching section IDs on the AI page
- **Right:** Primary CTA button — "Book free call" — opens Cal.com modal
- **Mobile:** hamburger opens a sheet with the same 4 links + CTA. Do NOT reuse the existing `HamburgerMenu.tsx` — it has hardcoded homepage anchors (#about, #jobs, etc.) that don't exist on the AI page. Build a small `AINav.tsx` mobile menu local to this route.
- **Behavior:** Transparent at top of page, navy with backdrop blur on scroll. Use the existing `useScrollDirection` hook for auto-hide/reveal behavior if desired.

### Section 1 — Hero

**Section ID:** `#hero` (for anchor scroll)

Desktop layout: 55% copy column left, 45% interactive demo right. Mobile: copy on top, demo below.

**Copy column (left):**

- Pre-headline badge (mono font, 13px, teal tint border, teal text):
  `AUTONOMOUS AI AGENT SYSTEMS · BUILT FOR SMBs`
- Pain question above headline (text-xl, `--light-slate`):
  `Your team is still copy-pasting between 5 tools. In 2026.`
- Main headline (`--fz-heading` scaled up ~2.5×, responsive, weight 700):
  Line 1 (white): `While your competitors buy Zapier workflows,`
  Line 2 (teal `--green`): `you get an AI workforce.`
- Subheadline (text-lg, `--slate`):
  `I build autonomous agent systems for businesses with 10+ employees — the same architecture enterprise AI teams ship, engineered for your size and budget.`
- Rotating cycling text (mono, teal):
  `Runs 24/7 · Handles leads automatically · Replaces 3 spreadsheets · Never forgets a follow-up`
  Items rotate every 2.5s with fade transition. Respects `usePrefersReducedMotion` (static first item if true).
- Trust micro-badges (inline, small text, muted):
  `Free 30-min diagnostic · Fixed prices · Built in 2–4 weeks · You own it forever`
- Primary CTA button — reuse `.outline-button` class but upsize, fill with teal bg for hierarchy. Text: `Book free 30-min diagnostic →`
- Secondary inline link below: `Or see how it works ↓` using `.inline-link` class, anchors to `#how-it-works`

**Interactive column (right):** The before/after slider. Full spec in section 4.

### Section 2 — Social proof strip

**Section ID:** `#proof`

Thin full-width band, `--light-navy` bg.

- Left 60%: auto-scrolling marquee of tool logos — Claude, OpenAI, n8n, Make, Zapier, Airtable, Monday, HubSpot, Google Workspace, Slack, Notion, Supabase. Render as monochrome SVGs (white at ~80% opacity). Pause on hover.
- Right 40%: 4 stat tiles with animated count-up on scroll.

**Stat tiles (v1 final — honest, defensible, no fabricated client counts):**

1. `12+` — `AI tools in my stack`
2. `4+` — `Agent frameworks shipped`
3. `5+` — `Years full-stack engineering`
4. `24/7` — `Systems running, not sleeping`

These are all facts Gal can defend today without any client numbers. They communicate technical depth and modernity without pretending to volume Gal hasn't yet achieved. When Gal ships paying clients, the strip gets updated with real project counts, hours saved, etc.

### Section 3 — "How is this different from Zapier?" comparison

**Section ID:** `#vs-zapier`

**Goal:** kill the "isn't this just automation?" objection in 45 seconds.

Headline: `What you'll hear from "AI consultants" vs. what I actually build.`

Three-column table, but stylized as the **git-diff aesthetic** (borrowed from Achiya — we're doing it better). Wrap in a bordered panel styled like a code file:

- Top bar: `system-architecture.diff` filename label in Fira Code, small close/minimize dots on the right
- Inside: side-by-side columns with `-` and `+` gutter markers in red and teal

| Criterion | `- Typical "AI consultant"` | `+ A real agent system` |
|---|---|---|
| Tool | Zapier / Make template | Custom autonomous agent |
| Decision-making | Rigid if/then rules | Context-aware reasoning |
| Edge cases | Breaks, needs manual fix | Adapts and self-corrects |
| Limits | Capped by Zapier's logic | Capped by what LLMs can do |
| Example | "Form submitted → Slack message" | "Read lead, score it, draft reply in your voice, schedule follow-up, log reasoning" |

Styling: `-` rows faded with strikethrough hint, `+` rows teal-accented and prominent.

### Section 4 — Expanded demo (optional, scenario deep-dive)

**Section ID:** `#demo-detail`

Lower on the page, a larger version of the same slider with the 3 scenario tabs more prominent and an explanatory paragraph next to each scenario. Uses the same `BeforeAfterDemo` component, different layout wrapper.

### Section 5 — What I build for you (services)

**Section ID:** `#what-i-build`

Section heading: `What I build for you.`
Sub: `Three fixed-price packages. One-time payment. You own it forever.`

**Currency display:** Each card shows the USD price prominently and ILS converted price as a smaller secondary line beneath it, in mono font with muted color. Example treatment:
```
$3,000
₪10,500 ILS
```
Rationale: USD anchors Gal as internationally-serious while ILS keeps the shekel-native audience comfortable. No currency toggle — both shown always. Conversion rate is locked to 3.5 ILS/USD rounded to marketing-friendly numbers (not live FX). Update periodically if rate shifts materially.

**Layout:** 3 service cards, horizontal desktop, stacked mobile. Hover state: subtle teal glow (reuse `.noteworthy-card` pattern from existing design system).

**Card 1 — Starter Agent** — `$1,000` / `₪3,500 ILS` one-time
- Who it's for: *"I want to see what an AI agent can actually do."*
- What you get:
  - One focused AI agent handling one workflow
  - Integrates up to 2 tools you already use
  - Deployed and running in 7 days
  - 30 days free tweaks
- Example: *"An agent that reads incoming leads, scores them, and drafts personalized replies for your approval."*

**Card 2 — Business System** — `$3,000` / `₪10,500 ILS` one-time — **Most Popular** badge
- Who it's for: *"I have 3 workflows that need to run themselves."*
- What you get:
  - Multi-agent system with 3–5 coordinated agents
  - Integrates up to 5 tools
  - Custom monitoring dashboard
  - Deployed in 2–3 weeks
  - 60 days free tweaks + 1 strategy session
- Example: *"Lead pipeline agent + customer support agent + reporting agent, all sharing context, feeding your existing Monday.com."*

**Card 3 — Full Autonomous Operation** — `$6,000+` / `₪21,000+ ILS` one-time
- Who it's for: *"I want my ops to run themselves while I sleep."*
- What you get:
  - Fully custom multi-agent infrastructure
  - Unlimited tool integrations
  - Persistent knowledge base for your business
  - Admin dashboard + audit logs
  - Deployed in 3–4 weeks
  - 90 days free tweaks + monthly strategy calls for 3 months
- Example: *"Entire lead-to-cash pipeline runs autonomously. Agents handle intake, qualification, proposals, follow-ups, contract handoff. You review, approve, collect."*

Footer line below all 3 cards (muted, small):
*"All packages include hosting guidance. Ongoing hosting: $30–200/month (₪100–700 ILS) paid directly to your cloud provider, not to me."*

**Structured data update:** JSON-LD Service schema in spec section 8.3 still lists prices in USD only (it's the canonical offer currency). The dual-display is a UI concern, not a schema concern.

### Section 6 — How I work (process)

**Section ID:** `#how-it-works`

Heading: `How I work.`

4-step horizontal timeline, desktop only. On mobile, stacked vertical cards with connecting lines.

Each step: numbered node (01–04 in Fira Code, teal), step title, short description. Make each step expandable on hover (desktop) or tap (mobile) to reveal a detail panel with more info.

- **01 · Diagnostic** — *Free, 30 min.* We talk. I map your workflows, identify the highest-leverage automation, and tell you honestly if AI even makes sense for your business. Some businesses I turn away.
- **02 · Architecture** — *Included in package.* I design the agent system. You see exactly what will be built, which tools it touches, where AI reasoning lives, where human approval stays in the loop.
- **03 · Build** — *1–4 weeks.* I ship. You get progress updates every 48 hours with a working link you can actually test. No month-long black boxes.
- **04 · Launch & iterate** — *30–90 days included.* We go live. I watch the system run with you and tune it as real data hits it. The first 30–90 days of adjustments are included, not billed hourly.

### Section 7 — Real workflows I've built (mini case studies)

**Section ID:** `#case-studies`

3 cards showing real past projects. For v1, draws from Gal's portfolio:

1. **AuthorLex** — Multi-agent book-writing engine. 4 AI agents coordinate to transform unstructured reflections into publishable how-to books. Stack: Next.js, Prisma, pgvector, custom agent framework.
2. **Digital Creator AI Agent platform** — 5-agent pipeline (TrendScout → ContentStrategist → ScriptWriter → VisualDirector → QualityGate) running autonomous social media content for SMB clients. Stack: BullMQ, Claude, HeyGen, FAL.ai.
3. **reelSearch** — AI-powered Instagram reel organizer. Whisper + Claude vision + pgvector semantic search. Personal pile of saved reels → searchable knowledge base.

Each card: project name (weight 700), one-line problem statement, one-sentence "how the agents solved it," tech stack strip at bottom (small Fira Code chips), "View case study →" link using `.inline-link` (stub target for v1 — links to `#case-studies` or `/ai-integration#case-studies` for now).

**Important:** These are Gal's real projects. Copy should treat them authentically, not as agency deliverables. This is the builder angle in action.

### Section 8 — "Coming soon" — the workflow diagnostic tool

**Section ID:** `#coming-soon`

Single wide panel, `--light-navy` bg with teal border accent.

- Heading: `Coming soon: Paste your workflow, I'll show you where the agents go.`
- Sub: `I'm building an interactive tool that takes any business workflow you describe and generates a visual agent system architecture in 30 seconds. Want early access?`
- Email input (react-hook-form + zod validated) + "Get early access" button
- Small line below: `I'll also notify you when I publish new case studies.`

Form POSTs to `/api/early-access` which calls Resend API (env var `RESEND_API_KEY`). Success state: form collapses, shows `✓ You're on the list.` Failure state: inline error, form stays.

### Section 9 — About Gal

**Section ID:** `#about-gal`

Left 40%: Gal's existing profile photo (reuse asset from `public/images/`). Right 60%: copy.

Heading: `Why a one-person shop beats a 50-person agency for this.`

3 short paragraphs:

1. **Builder, not consultant.** *"I'm Gal. Fullstack dev, 5+ years, tech lead on production systems. I don't subcontract. The person selling you the system is the person building it."*
2. **Modern AI stack, daily.** *"I run autonomous Claude Code agent pipelines every day. I ship with the newest models the week they drop. While enterprise agencies are still learning what MCP is, I've been building multi-agent systems in production for over a year."*
3. **Honest about fit.** *"I'll tell you when AI isn't the answer. Some processes need a better spreadsheet, not an agent. I'd rather refund you in the diagnostic than build something that doesn't work."*

Small trust row: `Tel Aviv · Available in Hebrew & English · Works across time zones`

### Section 10 — FAQ

**Section ID:** `#faq`

Heading: `Questions you're probably asking.`

Custom accordion (hand-built, no shadcn — stay consistent with existing codebase conventions). Grouped under 4 categories with category headers:

**Is this right for my business?**
- How do I know if my workflow is a good AI agent candidate?
- My business is only 5 people. Is this for me? *(honest answer: maybe not, let's talk)*
- My business is 200+ people. Is this for me? *(honest answer: probably — we'd scope accordingly)*

**How does it actually work?**
- What's the difference between an AI agent and a Zapier automation?
- Do the agents replace my employees? *(no — they amplify them)*
- What happens if the AI makes a mistake?
- Can I see the AI's reasoning, or is it a black box?

**The build process**
- How long does it actually take?
- What do you need from me to start?
- What if I don't like what you build?
- Do I own the code?

**Money & risk**
- Why is it a one-time price and not a subscription?
- What are ongoing costs? *(honest breakdown of LLM API costs, hosting)*
- What if I want to stop paying for LLM API later?
- Do you offer refunds?

Full FAQ answers are defined in `src/app/ai-integration/_content/faqs.ts` (see section 3).

### Section 11 — Final CTA band

**Section ID:** `#final-cta`

Full-width, `--green-tint` bg with teal top/bottom borders. Centered content.

- Headline: `Stop competing with companies that have AI. Start being one.`
- Sub: `30 minutes. Free. I'll tell you honestly what's possible.`
- Button: `Message me on WhatsApp →` (prominent, teal fill, dark text, WhatsApp icon prefix)
- Below button (muted, small): `Usually replies within a few hours.`

All primary CTAs throughout the page open WhatsApp with a pre-filled message using `NEXT_PUBLIC_WHATSAPP_NUMBER`. Pre-fill template: `Hi Gal, I'd like to book a free 30-min AI diagnostic for my business.`

### Section 12 — Footer

Reuse the existing `Footer.tsx` component from `src/components/layout/Footer.tsx`. Consistency with the rest of the site.

---

## 3. Vertical variations system (architecture)

### 3.1 URL structure

```
/ai-integration                     → default (10+ employee business, generic) [v1]
/ai-integration/for-ecommerce       → ecommerce variant [v2]
/ai-integration/for-clinics         → future
/ai-integration/for-law-firms       → future
/ai-integration/for-agencies        → future
```

**v1 ships the default vertical only.** The `[[...vertical]]/` catch-all route and vertical config system are still built in v1 so future verticals drop in as new config files with zero architectural work. Gal will add specific verticals (ecommerce first) once concrete client experience exists to position them authentically.

### 3.2 Implementation

**One single page component, driven by vertical config.** Not N duplicated pages.

```
src/app/ai-integration/
├── [[...vertical]]/
│   └── page.tsx                    # single catch-all route
├── layout.tsx                      # nested layout (AI-page-specific chrome)
├── _components/                    # page-local components (leading underscore prevents route)
│   ├── AINav.tsx
│   ├── Hero.tsx
│   ├── BeforeAfterDemo.tsx         # the slider
│   ├── SocialProofStrip.tsx
│   ├── ComparisonDiff.tsx
│   ├── Services.tsx
│   ├── Process.tsx
│   ├── CaseStudies.tsx
│   ├── ComingSoon.tsx
│   ├── AboutGal.tsx
│   ├── FAQ.tsx
│   └── FinalCTA.tsx
├── _lib/
│   ├── verticals/
│   │   ├── types.ts
│   │   ├── default.ts              # v1 (the only vertical that ships)
│   │   └── _registry.ts
│   └── analytics.ts
└── _content/
    ├── faqs.ts                     # FAQ entries (base + vertical overrides)
    ├── tools.ts                    # tool logo data
    └── case-studies.ts             # case study entries
```

**Why page-local folders with leading underscore?** The recon confirmed the repo uses `src/app/` for App Router routes with no nested private folders currently. Next.js treats folders starting with `_` as private (non-route), so `_components/`, `_lib/`, and `_content/` stay co-located with the AI page without polluting the global `src/components/` directory. This keeps the AI page self-contained and non-invasive to the existing codebase.

### 3.3 VerticalConfig type

```ts
// src/app/ai-integration/_lib/verticals/types.ts
export type VerticalConfig = {
  slug: string;                     // "ecommerce" or "default"
  displayName: string;               // "E-commerce"
  hero: {
    preHeadline: string;             // pre-headline badge text
    painQuestion: string;
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
    cyclingTexts: string[];
  };
  demoScenarios: DemoScenario[];    // 3 before/after scenarios specific to vertical
  serviceExamples: {
    starter: string;
    business: string;
    full: string;
  };
  caseStudySlugs: string[];         // which case studies to show (from _content/case-studies.ts)
  testimonial?: Testimonial;
  faqAdditional?: FAQEntry[];       // vertical-specific FAQs merged with base set
  tools: ToolSlug[];                // tool logos to highlight
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export type DemoScenario = {
  id: string;
  label: string;                    // "Lead handling"
  before: DemoSceneSpec;
  after: DemoSceneSpec;
};

export type DemoSceneSpec = {
  title: string;
  bullets: string[];
  stat?: { label: string; value: string };
  statusLabel?: string;              // "Running · 0 errors"
};
```

### 3.4 What swaps per vertical

Hero copy (all 5 fields), demo scenarios (all 3), service example lines, case studies shown, additional FAQs, featured tool logos, full SEO metadata.

### 3.5 What stays identical

Page layout, pricing ($1k / $3k / $6k — fixed globally), process section, About Gal section, base FAQs, final CTA, footer.

### 3.6 v1 ships with 1 config

- `default.ts` — generic 10+ employee business

The `ecommerce.ts` file is **not built in v1**. The vertical config system, catch-all route, `_registry.ts` resolver, and types are all still shipped in v1 so that adding new verticals later is a content-only change. Ecommerce becomes the first v2 addition once Gal has a real Shopify client.

### 3.7 Route resolution logic

```ts
// src/app/ai-integration/[[...vertical]]/page.tsx
import { getVerticalConfig } from "../_lib/verticals/_registry";

export default function AIIntegrationPage({
  params,
}: {
  params: { vertical?: string[] };
}) {
  const slug = params.vertical?.[0]?.replace(/^for-/, "") ?? "default";
  const config = getVerticalConfig(slug);
  // render page with config
}
```

URL `/ai-integration/for-ecommerce` → slug `ecommerce` → loads `ecommerce.ts` config. URL `/ai-integration` → slug `default` → loads `default.ts`. Unknown slug → 404 via `notFound()`.

---

## 4. `BeforeAfterDemo` component — full spec

This is the page's signature interactive element. It must feel like magic.

### 4.1 Visual layout

- Container: rounded card (border-radius 4px per existing system), `--light-navy` bg with `--lightest-navy` border, ~520px tall desktop / ~380px mobile, fills hero right column
- Top strip: `LIVE DEMO · Watch a real workflow transform` mono text on left, pulsing green dot indicator on right
- Scenario tabs (just below top strip): 3 tabs — `Lead handling` | `Customer support` | `Data entry`. Active tab: teal underline, white text. Inactive: slate text.
- Main slider area: full-width before/after with vertical draggable handle
- Bottom strip: subtle animated hint "← Drag to compare →" on first mount, fades after first interaction

### 4.2 Behavior

Default handle position: ~40% from left (reveals more "after" than "before" — outcome is the hero).

Interaction:
- Drag handle left/right (mouse or touch)
- Keyboard: focus handle, arrow keys move 5% per press
- First-mount nudge: handle auto-animates 50% → 30% → 40% once on mount to signal interactivity

### 4.3 "After" side is animated

Not a static image. The "after" side must visibly *run*:

- Stylized agent workflow diagram as inline SVG with nodes (rounded rectangles) connected by arrows
- Animated dots continuously flowing through the arrows (like a live pipeline)
- Counter ticking up (simulated): `Processed today: X` (use `useEffect` with `setInterval` to increment slowly, reset on scenario change)
- Status indicator: green pulse + `Running · 0 errors`

Respect `usePrefersReducedMotion` — if true, show a static version of the "after" state with no dot flow, counter shows a fixed final number.

### 4.4 "Before" side is static but dramatic

- Stylized depiction of manual chaos
- Timestamp contrast: `Monday 9:00 AM → Thursday 3:00 PM`
- Visual clutter: overlapping notes, red error states, "47 unread" badge, handwritten-style arrows
- Idle figure icon (abstract, not cheesy)
- Subtle muted palette (`--dark-slate` tones)

### 4.5 Three scenarios (default vertical)

**Scenario A — Lead handling**
- Before: Inbox with 47 unreplied leads, manual spreadsheet `leads_URGENT_v3.xlsx`, sticky "reply to Sarah??"
- After: Workflow nodes — Intake → Classify → Score → Draft Reply → CRM Update. Stat: `Processed today: 23 leads · Avg response: 12s`

**Scenario B — Customer support**
- Before: Ticket queue with 89 unresolved, colored tag chaos
- After: Workflow — Ticket In → Categorize → Retrieve from KB → Draft Response → Human Approval → Send. Stat: `Resolved today: 41 · Escalated to human: 6`

**Scenario C — Data entry**
- Before: Two spreadsheets + CRM with manual arrows, timestamp `3 hours daily`
- After: Workflow — Watch Source → Extract → Validate → Transform → Write Target. Stat: `Synced today: 1,247 records · Last error: never`

(Ecommerce vertical config replaces these with Shopify-specific scenarios — e.g., "Order ops," "Refund handling," "Inventory sync.")

### 4.6 Technical implementation

- Client component (`"use client"` at top)
- Built in `src/app/ai-integration/_components/BeforeAfterDemo.tsx`
- Drag: Framer Motion's `drag="x"` with `dragConstraints` bounded to container, `dragElastic: 0`
- Reveal: `clip-path: inset(0 {100-X}% 0 0)` on the "after" layer, driven by drag position state
- Scenario crossfade: Framer Motion `AnimatePresence` with `mode="wait"`
- Keyboard: focusable handle with `tabIndex={0}`, `onKeyDown` listener for ArrowLeft/ArrowRight
- Both before and after are rendered simultaneously (not conditionally) — the clip-path just hides/reveals. This preserves accessibility (screen readers can read both) and keeps performance smooth.

### 4.7 Copy overlays

- Before side top-left (fades in as revealed): `Manual · Slow · Errors` — small, muted red tint
- After side top-right (fades in as revealed): `Autonomous · 24/7 · 0 errors` — small, teal

---

## 5. Design system (reuse existing tokens, add minimal extensions)

**Rule: Reuse existing CSS custom properties wherever possible.** Do not introduce a new color palette. The AI page lives inside galmoussan.com and must feel native.

### 5.1 Colors — reuse from `src/app/globals.css`

| Role on AI page | Existing CSS var | Value |
|---|---|---|
| Page background | `--navy` | `#0a192f` |
| Card/section background | `--light-navy` | `#112240` |
| Border, dividers | `--lightest-navy` | `#233554` |
| Body text | `--slate` | `#8892b0` |
| Secondary text | `--light-slate` | `#a8b2d1` |
| Headings, strong text | `--lightest-slate` | `#ccd6f6` |
| Pure white (rare) | `--white` | `#e6f1ff` |
| Primary accent (CTAs, teal) | `--green` | `#57cbff` (despite the name, it's teal) |
| Accent wash (backgrounds, hover) | `--green-tint` | `rgba(87, 203, 255, 0.1)` |

**No new color tokens.** If something absolutely requires a new color (e.g., a "danger red" for the comparison table's `-` gutter), define it in a local CSS module scoped to the AI page, not in `globals.css`.

### 5.2 Typography — reuse existing

- Body: `var(--font-sans)` (Inter, currently loaded in root layout)
- Mono: `var(--font-mono)` (Fira Code, currently loaded in root layout)
- Sizes: existing tokens `--fz-xxs` through `--fz-heading` (32px)

**One extension needed:** The AI page hero needs a larger headline than existing tokens support. Add ONE new size:
```css
/* Add to globals.css :root, or scope to AI page in its own CSS */
--fz-hero: clamp(40px, 6vw, 72px);
```

Scope this to `globals.css` since it's a semantic addition and may be useful elsewhere later. Document the addition in commit message.

### 5.3 Spacing — reuse existing Tailwind 8px grid

No changes. Use Tailwind spacing utilities (`p-4`, `mt-8`, etc.) throughout.

### 5.4 Motion rules

The existing site is CSS-only animation. The AI page introduces Framer Motion **scoped to `src/app/ai-integration/**` only**. Existing site animations untouched.

- Default Framer Motion easing: `[0.645, 0.045, 0.355, 1]` (match existing `--easing` from globals.css)
- Default duration: 400ms for meaningful motion, 200ms for micro-interactions
- Respect `prefers-reduced-motion` — the existing `usePrefersReducedMotion` hook must be used in every animated component to disable auto-playing animations

### 5.5 Reuse the existing utility classes

From `globals.css`, directly reuse on the AI page:
- `.outline-button` — for secondary CTAs
- `.inline-link` — for all inline anchor links
- `.numbered-heading` — for section headings (gives you the "01. Section Name" look that matches the portfolio's aesthetic)
- `.bullet-list` — for feature bullet lists in service cards
- `.fadeup-enter`, `.reveal` — for scroll-triggered reveals (can also use `ScrollRevealSection.tsx` component)

### 5.6 Things we explicitly will NOT do

- No emoji in UI (per existing site conventions — CLAUDE.md compliance)
- No stock photography of "diverse people smiling at laptops"
- No AI-brain-circuit imagery, no robot-hand-touching-human-hand
- No 3D blobs, glass-morphism, cursor-followers, parallax scroll
- No light mode toggle (site is dark-only, AI page stays dark-only)
- No new fonts beyond Inter + Fira Code

---

## 6. Tech stack (additions to existing)

### 6.1 Already present, reuse as-is

- Next.js 14.2.35 App Router
- TypeScript strict
- Tailwind CSS 3.4
- React 18
- `next/font` with Inter + Fira Code
- Custom inline SVG icons (`ui/Icons.tsx`)
- Existing hooks: `usePrefersReducedMotion`, `useScrollDirection`, `useScrollReveal`
- Vitest + Playwright for testing
- ESLint with `next/core-web-vitals`
- Vercel deploy with existing `vercel.json`

### 6.2 New dependencies to install

Only what is strictly required. Justify each.

| Package | Version | Why | Scope |
|---|---|---|---|
| `framer-motion` | `^11.0.0` | Drag/clip-path interactivity for the slider, scenario crossfades, scroll-triggered reveals. No pure-CSS equivalent exists for the slider spec. | AI page only (don't adopt globally) |
| `react-hook-form` | `^7.52.0` | Email capture form in "Coming soon" section. Lightweight (~25kb) and industry standard. | AI page only |
| `zod` | `^3.23.0` | Runtime validation for form submissions + API route. Pairs naturally with react-hook-form. | AI page + API route |
| `resend` | `^4.0.0` | Email backend for "early access" capture. Already the standard in the Next.js ecosystem. | API route only |
| `@vercel/analytics` | `^1.3.0` | Conversion tracking on AI page. Minimal footprint, no privacy concerns. | AI page only (wrap in nested layout, not root) |

**Total new bundle impact:** ~60kb gzipped, scoped to the AI page via dynamic imports where possible. Framer Motion is the heaviest — use selective imports (`import { motion } from "framer-motion"` NOT `import * as fm`) and code-split the slider component.

### 6.3 Environment variables (new)

```
RESEND_API_KEY=re_xxx                        # For email capture (required)
NEXT_PUBLIC_WHATSAPP_NUMBER=972xxxxxxxxx     # Primary CTA destination (required, no + sign)
NEXT_PUBLIC_CAL_LINK=gal-moussan/30min       # Optional — empty in v1, populated in v2
```

**v1 behavior:** If `NEXT_PUBLIC_CAL_LINK` is unset or empty, all "book a call" CTAs route directly to WhatsApp. When Gal populates this in v2, the primary CTA will open a Cal.com modal and WhatsApp becomes the fallback link.

Add `.env.local.example` to repo root documenting these. `.env.local` is already excluded by the repo's existing `.gitignore`.

### 6.4 Repo structure — additions only

```
src/app/ai-integration/              # NEW (all work scoped here)
├── [[...vertical]]/
│   └── page.tsx
├── layout.tsx
├── _components/                     # (leading underscore = private, Next.js convention)
├── _lib/
└── _content/

src/app/api/early-access/            # NEW (API route for form capture)
└── route.ts

public/images/ai/                    # NEW (AI-page-specific imagery only if needed)

.env.local.example                   # NEW
```

**Zero modifications** to existing files outside:
- `package.json` (add 5 deps)
- `globals.css` (add 1 new font size variable, `--fz-hero`)
- `.gitignore` (verify only, no changes needed)

### 6.5 Performance budget (non-negotiable)

- Lighthouse Performance ≥ 95 on mobile for `/ai-integration`
- LCP ≤ 2.0s on 4G simulation
- CLS ≤ 0.05
- First-load JS for `/ai-integration` ≤ 150kb gzipped (allows for Framer Motion + form libs, budgets 30kb over existing pages)
- All images: Next.js `<Image>` with explicit `width`/`height`, proper `sizes`
- Fonts: reuse existing `next/font` setup, no additional font loading

---

## 7. Accessibility requirements

Match or exceed existing site standards.

- WCAG 2.1 AA compliance
- Skip-to-content link in the AI page's nested layout (match root layout pattern)
- All interactive elements keyboard-accessible (slider handle, scenario tabs, accordion, CTA buttons, form)
- Focus rings: reuse existing `:focus-visible` dashed green outline
- Color contrast ≥ 4.5:1 for all body text against `--navy`
- Heading hierarchy: single H1 per page (hero headline), logical H2/H3 descent
- All images with meaningful alt text; decorative SVGs marked `aria-hidden="true"`
- `prefers-reduced-motion` respected via existing `usePrefersReducedMotion` hook in every animated component
- Form has proper labels, error messages are `aria-live="polite"`
- Slider: focusable handle with `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`

---

## 8. SEO requirements

### 8.1 Per-vertical dynamic metadata

The AI page uses `generateMetadata` (static per vertical) — NOT the existing static `metadata` export pattern from other pages, because metadata varies per vertical.

```ts
// src/app/ai-integration/[[...vertical]]/page.tsx
import type { Metadata } from "next";
import { getVerticalConfig } from "../_lib/verticals/_registry";

export async function generateMetadata({
  params,
}: {
  params: { vertical?: string[] };
}): Promise<Metadata> {
  const slug = params.vertical?.[0]?.replace(/^for-/, "") ?? "default";
  const config = getVerticalConfig(slug);
  return {
    title: config.seoMeta.title,
    description: config.seoMeta.description,
    keywords: config.seoMeta.keywords,
    openGraph: {
      title: config.seoMeta.title,
      description: config.seoMeta.description,
      type: "website",
    },
  };
}
```

### 8.2 OG image

Generate dynamically via `src/app/ai-integration/[[...vertical]]/opengraph-image.tsx` using Next.js `ImageResponse`. Bakes the vertical name and primary headline into the image. Must use existing fonts (Inter loaded via local font file if needed for ImageResponse — add `public/fonts/Inter-Bold.ttf` if required).

### 8.3 Structured data

Add JSON-LD `Service` schema in the page body:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Integration Services",
  "provider": { "@type": "Person", "name": "Gal Moussan" },
  "areaServed": "IL",
  "offers": [
    { "@type": "Offer", "name": "Starter Agent", "price": "1000", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Business System", "price": "3000", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Full Autonomous Operation", "price": "6000", "priceCurrency": "USD" }
  ]
}
```

### 8.4 Sitemap

Repo currently has no sitemap. **This build adds one** — `src/app/sitemap.ts` that generates entries for:
- All existing routes (`/`, `/archive`, `/tools/cinema-query`, `/tools/snake`)
- All AI vertical routes (`/ai-integration`, `/ai-integration/for-ecommerce`)

Also add `src/app/robots.ts` pointing to the sitemap.

### 8.5 Target keywords (v1)

- Default vertical: "AI integration Israel", "AI automation consultant Tel Aviv", "autonomous AI systems SMB", "AI agent developer Israel"
- Ecommerce vertical: "AI agents for Shopify", "ecommerce AI automation Israel", "AI customer support Shopify"

### 8.6 Hebrew version

**Deferred to v2.** v1 is English-only. When Hebrew ships, `hreflang` tags added at that time.

---

## 9. Testing requirements

### 9.1 Unit tests (Vitest)

Write unit tests in `src/app/ai-integration/_components/__tests__/` for:
- `BeforeAfterDemo.tsx` — handle bounds, scenario switching, keyboard controls, `prefers-reduced-motion` fallback
- `FAQ.tsx` — accordion open/close behavior, keyboard accessibility
- Vertical config resolver (`_registry.ts` `getVerticalConfig`) — known slugs, unknown slug returns default-or-404 as specified

Minimum: 10 unit tests covering the slider and config resolver. These are the fragile pieces.

### 9.2 E2E tests (Playwright)

Add `tests/ai-integration.spec.ts` covering:
- `/ai-integration` loads, hero renders, CTA button visible
- `/ai-integration/for-random` returns 404 (unknown vertical slug)
- Clicking each scenario tab changes the slider content
- Dragging the slider updates the clip-path reveal
- FAQ accordion opens on click
- Primary CTA opens WhatsApp link with correct pre-filled message
- Email form shows validation error on invalid email, success state on valid submission (mock API)

Do NOT modify the existing `tests/portfolio.spec.ts`. The recon noted that test has stale "Brittany Chiang" references — that's an existing issue, not this build's responsibility. Flag it in `OPEN_QUESTIONS.md`.

### 9.3 Lighthouse

Automated Lighthouse runs in CI (add a GitHub Action if none exists, or document manual run). Block deploy if Performance, Accessibility, or SEO scores drop below 95.

---

## 10. Copywriting rules (non-negotiable)

1. **No corporate speak.** "Leverage synergies" dies.
2. **Short sentences.** Max 20 words average. Punchy.
3. **Specific > vague.** "Saves 15 hours/week" beats "saves time."
4. **Honest > hyped.** "Some businesses I turn away" is more persuasive than "perfect for everyone."
5. **Show, don't claim.** "See this workflow run" beats "we build amazing workflows."
6. **One idea per section.** Don't cram.
7. **Comparative, not self-referential.** "Unlike Zapier consultants" beats "we are the best."
8. **Second person ("you") > first person ("we/I").** Exception: About Gal section is first-person.
9. **No exclamation marks.** Ever.
10. **Action verbs on every CTA.** "Book", "See", "Get", "Start". Never "Click here" or "Learn more."

---

## 11. Launch criteria (must all be true to ship)

- [ ] `/ai-integration` renders correctly with default vertical content
- [ ] Unknown vertical URLs (e.g., `/ai-integration/for-random`) return 404
- [ ] Before/after slider works on mouse, touch, keyboard
- [ ] All primary CTAs open WhatsApp with pre-filled message
- [ ] Email capture form posts to `/api/early-access` and Resend confirms delivery
- [ ] Lighthouse Performance ≥ 95, Accessibility ≥ 95, SEO ≥ 95 on mobile
- [ ] OG image renders correctly when URL shared
- [ ] Sitemap includes `/ai-integration`
- [ ] All existing E2E tests still pass (no regressions on homepage/archive)
- [ ] New E2E tests for AI page pass
- [ ] Mobile tested: iPhone SE (375px) and iPhone 15 Pro Max (430px)
- [ ] Desktop tested: 1280px, 1440px, 1920px
- [ ] Dark mode is the only mode (no light toggle introduced)
- [ ] Dual currency (USD + ILS) renders correctly in Services section
- [ ] Zero modifications to files outside `src/app/ai-integration/`, `src/app/api/early-access/`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/globals.css` (single additive change), `package.json`, `.env.local.example`
- [ ] Gal has reviewed and approved all copy
- [ ] Gal has provided WhatsApp number for `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [ ] Gal has Resend account set up with `RESEND_API_KEY`

---

## 12. Locked answers (Gal's final decisions)

The following decisions are locked and reflected throughout this spec:

| # | Question | Decision |
|---|---|---|
| 1 | Booking mechanism | **WhatsApp-only in v1.** Cal.com added in v2. Env var `NEXT_PUBLIC_CAL_LINK` documented but empty in v1. |
| 2 | WhatsApp scope | WhatsApp CTAs + WhatsApp automations are both in-scope as services. |
| 3 | Case study permissions | Open canvas. All 3 featured case studies (AuthorLex, Digital Creator AI Agent, reelSearch) are Gal's own products, no client permissions needed. |
| 4 | Social proof stats | **Tool-category approach**, not fabricated project counts. Final 4 tiles locked in spec section 2 (Social proof strip). |
| 5 | Ecommerce vertical | **Deferred to v2.** v1 ships default vertical only. Architecture still supports verticals so adding them later is a config-file change. |
| 6 | Currency | **Dual display: USD primary + ILS secondary** on every price. Locked conversion at 3.5 ILS/USD with marketing-friendly rounding. |
| 7 | Gal photo | Reuse existing photo from `public/images/`. |
| 8 | Hebrew version | Deferred to v2. v1 English-only. |
| 9 | Profile copy | Approved as drafted in section 2 (About Gal). |

## 13. Still needed from Gal before or during build

1. **WhatsApp number** in international format without `+` (e.g., `972501234567`) — needed for `NEXT_PUBLIC_WHATSAPP_NUMBER`. If Gal doesn't provide before Phase 6, dev team uses placeholder `972500000000` with a `TODO: @gal` comment and flags in `OPEN_QUESTIONS.md`.
2. **Resend API key** — Gal creates Resend account, verifies sending domain, provides `RESEND_API_KEY` for the email capture form. Not needed until Phase 6.
3. **Final copy review** — Gal reviews every piece of rendered copy once Phase 3 (all static sections) is complete. Spec has drafts; Gal refines tone and any specific claims.

## 13. Out of scope for v1 (explicitly deferred)

- Hebrew/RTL version (v2)
- Real case study detail pages linked from `/ai-integration/#case-studies` (stub links only in v1)
- Interactive workflow diagnostic tool (v3 — replaces the slider when shipped)
- Blog / content marketing under `/ai-integration/blog` (future)
- Client dashboard for existing clients (future)
- Retainer pricing options (positioning is fixed-price only for v1)
- Newsletter signup (only the "early access" email capture exists; no general newsletter)

---

**End of spec v2.**
