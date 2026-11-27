'use client';

import { useState, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
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

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Extract numeric value and suffix
  const match = value.match(/^(\d+)(.*)$/);
  const targetNumber = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const isNumeric = match !== null;

  useEffect(() => {
    if (!ref.current || !isNumeric || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);

          if (prefersReducedMotion) {
            setCount(targetNumber);
            return;
          }

          // Animate count-up
          const duration = 1500;
          const steps = 30;
          const increment = targetNumber / steps;
          const interval = duration / steps;

          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
              setCount(targetNumber);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, interval);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isNumeric, hasAnimated, targetNumber, prefersReducedMotion]);

  return (
    <div ref={ref} className="border-t border-[rgba(243,236,225,0.1)] pt-4">
      <div className="display text-[clamp(36px,3.4vw,48px)] leading-none text-[var(--amber)]">
        {isNumeric ? `${count}${suffix}` : value}
      </div>
      <div className="mt-2 text-[13px] leading-[1.45] text-[var(--linen-faint)]">{label}</div>
    </div>
  );
}

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
    <section id="proof" className="border-y border-[rgba(243,236,225,0.1)] py-14">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left 60% - Tool logos marquee */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Technologies I work with</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="text-[15px] text-[rgba(94,231,255,0.78)]"
                >
                  {toolNames[tool]}
                </span>
              ))}
            </div>
          </div>

          {/* Right 40% - Stats */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {stats.map((stat, i) => (
                <AnimatedStat key={i} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
