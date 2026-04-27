import type { ToolSlug } from '../_lib/verticals/types';

export type ToolInfo = {
  slug: ToolSlug;
  name: string;
  // SVG logo will be inline in the component - this is just metadata
};

export const tools: Record<ToolSlug, ToolInfo> = {
  claude: { slug: 'claude', name: 'Claude' },
  openai: { slug: 'openai', name: 'OpenAI' },
  n8n: { slug: 'n8n', name: 'n8n' },
  make: { slug: 'make', name: 'Make' },
  zapier: { slug: 'zapier', name: 'Zapier' },
  airtable: { slug: 'airtable', name: 'Airtable' },
  monday: { slug: 'monday', name: 'Monday.com' },
  hubspot: { slug: 'hubspot', name: 'HubSpot' },
  'google-workspace': { slug: 'google-workspace', name: 'Google Workspace' },
  slack: { slug: 'slack', name: 'Slack' },
  notion: { slug: 'notion', name: 'Notion' },
  supabase: { slug: 'supabase', name: 'Supabase' },
};
