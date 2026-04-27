// Type definitions for vertical configuration system

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

export type Testimonial = {
  quote: string;
  author: string;
  title: string;
  company: string;
};

export type FAQEntry = {
  category: string;
  question: string;
  answer: string;
};

export type ToolSlug =
  | 'claude'
  | 'openai'
  | 'n8n'
  | 'make'
  | 'zapier'
  | 'airtable'
  | 'monday'
  | 'hubspot'
  | 'google-workspace'
  | 'slack'
  | 'notion'
  | 'supabase';
