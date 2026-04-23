# AI Integration Landing Page

Fixed-price AI automation services landing page with vertical variation architecture.

## Architecture

### Directory Structure

```
src/app/ai-integration/
├── [[...vertical]]/           # Catch-all route for vertical variations
│   └── page.tsx               # Main page component with generateMetadata
├── layout.tsx                 # AI page layout (AINav, Footer, Analytics, ScrollDepthTracker)
├── opengraph-image.tsx        # Dynamic OG image generator (1200x630)
├── _components/               # UI components
│   ├── Hero.tsx               # Above-fold hero with BeforeAfterDemo
│   ├── BeforeAfterDemo.tsx    # Interactive slider comparison
│   ├── SocialProofStrip.tsx   # Tools + animated stats
│   ├── Services.tsx           # 3-tier pricing cards (dual currency)
│   ├── Process.tsx            # 4-step timeline with hover details
│   ├── FAQ.tsx                # Accordion with analytics tracking
│   ├── ComingSoon.tsx         # Email capture form (react-hook-form + zod)
│   ├── AINav.tsx              # Sticky nav with scroll effects
│   ├── FinalCTA.tsx           # Bottom conversion CTA
│   └── __tests__/             # Unit tests (Vitest)
├── _lib/verticals/            # Vertical configuration system
│   ├── types.ts               # TypeScript definitions
│   ├── _registry.ts           # Config resolver (getVerticalConfig)
│   ├── default.ts             # Default vertical content
│   └── __tests__/             # Registry unit tests
└── _content/                  # Shared content
    ├── faqs.ts                # Base FAQ entries
    └── case-studies.ts        # Portfolio case studies

src/app/api/early-access/
└── route.ts                   # Email capture API (Resend)

tests/
└── ai-integration.spec.ts     # E2E tests (Playwright)
```

### Key Features

1. **Vertical Variation System**: Content variations for different industries (v2)
2. **Interactive Demo**: Before/after slider with Framer Motion
3. **Dual Currency**: USD + ILS pricing (3.5x rate)
4. **Analytics**: Vercel Analytics with custom event tracking
5. **SEO**: generateMetadata, JSON-LD, OG images, sitemap, robots.txt
6. **Accessibility**: ARIA labels, keyboard navigation, prefers-reduced-motion
7. **Performance**: Fonts with display:swap, optimized build

## Adding a New Vertical

### 1. Create Vertical Config

Create `src/app/ai-integration/_lib/verticals/real-estate.ts`:

```typescript
import type { VerticalConfig } from './types';

export const realEstateVertical: VerticalConfig = {
  slug: 'real-estate',
  displayName: 'AI for Real Estate',
  hero: {
    preHeadline: 'AUTONOMOUS AI FOR REAL ESTATE',
    painQuestion: 'Still manually following up with 100 leads?',
    headlineLine1: 'While your competitors hire SDRs,',
    headlineLine2: 'you deploy an AI sales team.',
    subheadline: 'I build autonomous agent systems that qualify leads, schedule showings, and nurture prospects 24/7.',
    cyclingTexts: [
      'Runs 24/7',
      'Never misses a lead',
      'Schedules 40+ showings/week',
      'Speaks your brand voice',
    ],
  },
  demoScenarios: [
    // ... 3 before/after scenarios specific to real estate
  ],
  serviceExamples: {
    starter: 'An agent that reads MLS inquiries, scores lead quality, and drafts personalized follow-ups.',
    business: 'Lead pipeline + showing scheduler + CRM sync, all autonomous.',
    full: 'Full lead-to-contract pipeline with AI nurturing and property matching.',
  },
  caseStudySlugs: ['authorlex'], // Reuse or add real-estate-specific cases
  tools: ['claude', 'openai', 'zapier', 'hubspot', 'calendly'],
  seoMeta: {
    title: 'AI Integration for Real Estate | Autonomous Lead Management',
    description: 'Autonomous AI systems for real estate teams. Never miss a lead, automate showings, close more deals.',
    keywords: [
      'AI real estate automation',
      'real estate CRM automation',
      'AI lead qualification real estate',
    ],
  },
  faqAdditional: [
    {
      category: 'Real Estate Specific',
      question: 'Can it integrate with my MLS?',
      answer: 'Yes. I build custom connectors to pull listings, sync updates, and trigger workflows based on new inventory or price changes.',
    },
  ],
};
```

### 2. Register in Registry

Edit `src/app/ai-integration/_lib/verticals/_registry.ts`:

```typescript
import { realEstateVertical } from './real-estate';

const verticals: Record<string, VerticalConfig> = {
  default: defaultVertical,
  'real-estate': realEstateVertical, // Add here
};
```

### 3. Update Sitemap

Edit `src/app/sitemap.ts`:

```typescript
{
  url: `${baseUrl}/ai-integration/for-real-estate`,
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 0.9,
},
```

### 4. Deploy

Vertical will be accessible at `/ai-integration/for-real-estate`

## Deploying Environment Variables

Set these in Vercel project settings (or `.env.local` for dev):

```bash
# Required for email capture (Phase 6)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Required for WhatsApp CTAs (Phase 6)
NEXT_PUBLIC_WHATSAPP_NUMBER=972501234567  # No + sign

# Optional for Cal.com (v2)
NEXT_PUBLIC_CAL_LINK=https://cal.com/galmoussan/30min
```

### Resend Setup

1. Create account at [resend.com](https://resend.com)
2. Verify your sending domain (e.g., `galmoussan.com`)
3. Get API key from dashboard
4. Update `src/app/api/early-access/route.ts` with your verified `from` address

### WhatsApp Number Format

- International format without `+` sign
- Example: `972501234567` (not `+972-50-123-4567`)
- Used in `https://wa.me/{number}?text={message}`

## Manual Testing Checklist

Before deploying to production:

- [ ] **Mobile (375px, 430px)**:
  - [ ] Hamburger menu opens/closes
  - [ ] All CTAs reachable
  - [ ] Forms usable
  - [ ] No horizontal scroll
- [ ] **Desktop (1280px, 1440px, 1920px)**:
  - [ ] All sections visible
  - [ ] Slider drag works
  - [ ] Hover states work
- [ ] **CTAs**:
  - [ ] Hero CTA opens WhatsApp with correct message
  - [ ] Nav CTA opens WhatsApp
  - [ ] Final CTA opens WhatsApp
  - [ ] Mobile menu CTA opens WhatsApp
- [ ] **Email Capture**:
  - [ ] Invalid email shows validation error
  - [ ] Valid email shows success message
  - [ ] Email received in Resend dashboard
  - [ ] Confirmation email sent to user
- [ ] **404 Handling**:
  - [ ] `/ai-integration/for-unknown` returns 404
  - [ ] `/ai-integration` loads default vertical
- [ ] **Dual Currency**:
  - [ ] All 3 pricing cards show USD
  - [ ] All 3 pricing cards show ILS
  - [ ] Rates are correct (3.5x)
- [ ] **Lighthouse (Desktop + Mobile)**:
  - [ ] Performance ≥95
  - [ ] Accessibility ≥95
  - [ ] SEO ≥95
  - [ ] Best Practices ≥95

## Known Issues

See `OPEN_QUESTIONS.md` for blockers and pending Gal input.

## Performance Budget

- First Load JS: 159 kB (target: 150 kB)
- Exceedance due to:
  - +16kb @vercel/analytics
  - +8kb react-hook-form + zod
  - ~40kb Framer Motion

Trade-offs accepted for conversion tracking, form validation, and UX polish.

## Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run test         # Unit tests
npm run test:e2e     # E2E tests (requires dev server)
npm run lint         # ESLint
```

## Troubleshooting

**Build fails with Resend error:**
- Ensure `RESEND_API_KEY` is not required at build time
- API route initializes Resend client lazily (inside POST handler)

**OG image not rendering:**
- Check `/ai-integration/opengraph-image` directly
- Verify vertical config exists in registry
- OG image uses Edge Runtime (no Node.js APIs)

**E2E tests fail:**
- Ensure dev server is running (`npm run dev`)
- Check Playwright browsers installed (`npx playwright install`)
- Review test output for specific failures

**Analytics not tracking:**
- Verify `<Analytics />` is in `ai-integration/layout.tsx`
- Check Vercel dashboard for events
- `track()` calls require deployment (not localhost)

## Future Enhancements (v2)

- Cal.com modal integration (already wired, env var gated)
- Additional vertical variations (real-estate, clinics, ecommerce)
- A/B testing for headline variations
- Animated workflow diagram tool (Coming Soon feature)
- Testimonial carousel
- Video demos per scenario
