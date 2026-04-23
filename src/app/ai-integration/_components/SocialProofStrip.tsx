'use client';

import type { ToolSlug } from '../_lib/verticals/types';

type SocialProofStripProps = {
  tools: ToolSlug[];
};

const stats = [
  { value: '12+', label: 'AI tools in my stack' },
  { value: '4+', label: 'Agent frameworks shipped' },
  { value: '5+', label: 'Years full-stack engineering' },
  { value: '24/7', label: 'Systems running, not sleeping' },
];

export function SocialProofStrip({ tools }: SocialProofStripProps) {
  // For Phase 3, just display tool names. Logo SVGs will be added as inline elements later
  const toolNames: Record<ToolSlug, string> = {
    claude: 'Claude',
    openai: 'OpenAI',
    n8n: 'n8n',
    make: 'Make',
    zapier: 'Zapier',
    airtable: 'Airtable',
    monday: 'Monday',
    hubspot: 'HubSpot',
    'google-workspace': 'Google',
    slack: 'Slack',
    notion: 'Notion',
    supabase: 'Supabase',
  };

  return (
    <section id="proof" className="bg-[var(--light-navy)] py-12">
      <div className="max-w-[1400px] mx-auto px-[25px] sm:px-[50px] lg:px-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 60% - Tool logos marquee */}
          <div className="lg:col-span-7">
            <p className="text-[var(--dark-slate)] text-xs font-mono mb-4 uppercase tracking-wide">
              Technologies I work with
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="text-[var(--slate)] opacity-80 hover:opacity-100 hover:text-[var(--green)] transition-all font-mono text-sm"
                >
                  {toolNames[tool]}
                </span>
              ))}
            </div>
          </div>

          {/* Right 40% - Stats */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-[var(--green)] font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--slate)] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
