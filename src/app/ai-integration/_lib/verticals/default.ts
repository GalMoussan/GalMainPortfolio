import type { VerticalConfig } from './types';

export const defaultVertical: VerticalConfig = {
  slug: 'default',
  displayName: 'AI Integration & Development Services',

  hero: {
    preHeadline: 'AI AGENT SYSTEMS · CUSTOM DEVELOPMENT · CODING-AGENT TRAINING',
    painQuestion: 'Your team is still copy-pasting between 5 tools. In 2026.',
    headlineLine1: 'While your competitors buy Zapier workflows,',
    headlineLine2: 'you get an AI workforce.',
    subheadline: 'I build autonomous agent systems for businesses, take on custom development, and teach teams to build with Claude Code and other coding agents. The same architecture enterprise AI teams ship, at a size and price that fits you.',
    cyclingTexts: [
      'Runs 24/7',
      'Handles leads automatically',
      'Replaces 3 spreadsheets',
      'Never forgets a follow-up',
    ],
  },

  demoScenarios: [
    {
      id: 'lead-handling',
      label: 'Lead handling',
      before: {
        title: 'Manual chaos',
        bullets: [
          '47 unreplied leads in inbox',
          'Manual spreadsheet: leads_URGENT_v3.xlsx',
          'Sticky note: "reply to Sarah??"',
          'Monday 9:00 AM → Thursday 3:00 PM',
        ],
        stat: { label: 'Time per lead', value: '~15 min' },
      },
      after: {
        title: 'Autonomous pipeline',
        bullets: [
          'Intake → Classify → Score → Draft Reply → CRM Update',
          'AI reads context, scores quality, drafts personalized response',
          'Human approves only high-value leads',
        ],
        stat: { label: 'Processed today', value: '23 leads' },
        statusLabel: 'Running · Avg response: 12s',
      },
    },
    {
      id: 'customer-support',
      label: 'Customer support',
      before: {
        title: 'Ticket chaos',
        bullets: [
          '89 unresolved tickets',
          'Colored tag chaos across 3 categories',
          'Manual triage takes 2 hours daily',
        ],
        stat: { label: 'Avg resolution time', value: '~48 hours' },
      },
      after: {
        title: 'Intelligent triage',
        bullets: [
          'Ticket In → Categorize → Retrieve from KB → Draft Response → Human Approval → Send',
          'Agent searches knowledge base, drafts contextual reply',
          'Escalates complex issues automatically',
        ],
        stat: { label: 'Resolved today', value: '41' },
        statusLabel: 'Running · Escalated to human: 6',
      },
    },
    {
      id: 'data-entry',
      label: 'Data entry',
      before: {
        title: 'Manual sync hell',
        bullets: [
          'Two spreadsheets + CRM with manual arrows',
          '3 hours daily copying data between systems',
          'Last sync error: 2 days ago (still not fixed)',
        ],
        stat: { label: 'Daily time cost', value: '3 hours' },
      },
      after: {
        title: 'Automated sync',
        bullets: [
          'Watch Source → Extract → Validate → Transform → Write Target',
          'Continuous monitoring, instant updates',
          'Automatic retry on failures, every failure logged',
        ],
        stat: { label: 'Synced today', value: '1,247 records' },
        statusLabel: 'Running · Retries handled automatically',
      },
    },
  ],

  serviceExamples: {
    starter: 'An agent that reads incoming leads, scores them, and drafts personalized replies for your approval.',
    business: 'Lead pipeline agent + customer support agent + reporting agent, all sharing context, feeding your existing Monday.com.',
    full: 'Entire lead-to-cash pipeline runs autonomously. Agents handle intake, qualification, proposals, follow-ups, contract handoff. You review, approve, collect.',
  },

  caseStudySlugs: ['authorlex', 'digital-creator-ai', 'transcribe-god'],

  tools: [
    'claude',
    'openai',
    'n8n',
    'make',
    'zapier',
    'airtable',
    'monday',
    'hubspot',
    'google-workspace',
    'slack',
    'notion',
    'supabase',
  ],

  seoMeta: {
    title: 'AI Integration, Development & Coding-Agent Training | Gal Moussan',
    description: 'Autonomous AI agent systems for businesses, custom development, and hands-on training in Claude Code and other coding agents. Fixed prices, you own what I build.',
    keywords: [
      'AI integration Israel',
      'AI automation consultant',
      'AI agent developer Israel',
      'multi-agent systems',
      'Claude Code training',
      'coding agent workshop',
      'custom web development Israel',
    ],
  },
};
