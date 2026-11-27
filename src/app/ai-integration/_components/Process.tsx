'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle';

const steps = [
  {
    number: '01',
    title: 'Diagnostic',
    subtitle: 'Free, 30 min.',
    description: 'We talk. I map your workflows, find the highest-leverage place to start, and tell you honestly whether AI even makes sense for your business. Some businesses I turn away.',
    detail: "No sales pitch. If AI is overkill for your use case, I'll tell you.",
  },
  {
    number: '02',
    title: 'Architecture',
    subtitle: 'Included in package.',
    description: 'I design the agent system. You see exactly what will be built, which tools it touches, where AI reasoning lives, where human approval stays in the loop.',
    detail: 'Full system diagram + agent orchestration flow before any code is written.',
  },
  {
    number: '03',
    title: 'Build',
    subtitle: '1–4 weeks.',
    description: 'I ship. You get progress updates every 48 hours with a working link you can actually test. No month-long black boxes.',
    detail: 'Staging environment access from day 1. You see it working, not wireframes.',
  },
  {
    number: '04',
    title: 'Launch & iterate',
    subtitle: '30–90 days included.',
    description: 'We go live. I watch the system run with you and tune it as real data hits it. The first 30–90 days of adjustments are included, not billed hourly.',
    detail: 'Monitoring dashboard + Slack alerts. You know immediately if something breaks.',
  },
];

export function Process() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <section id="how-it-works" className="max-w-[1000px] mx-auto py-[100px]">
      <SectionTitle eyebrow="How it works">How I work.</SectionTitle>

      {/* Desktop: horizontal timeline, Mobile: vertical stack */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            className="relative p-5 rounded-[20px] border transition-colors cursor-default"
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ y: -4 }}
            style={{
              backgroundColor: hoveredIndex === i ? 'rgba(36, 38, 51, 0.72)' : 'transparent',
              borderColor: hoveredIndex === i ? 'rgba(243, 236, 225, 0.08)' : 'transparent',
            }}
          >
            {/* Step number, with a hairline running on to the next step */}
            <div className="mb-5 flex items-center gap-4">
              <span className="display text-[40px] italic leading-none text-[var(--amber)]">{step.number}</span>
              <span aria-hidden="true" className="h-px flex-1 bg-[rgba(243,236,225,0.1)]" />
            </div>

            {/* Title */}
            <h3 className="display m-0 mb-1.5 text-[24px] leading-[1.15]">
              {step.title}
            </h3>

            {/* Subtitle */}
            <p className="text-[13px] text-[var(--amber)] mb-3">
              {step.subtitle}
            </p>

            {/* Description */}
            <p className="text-[14px] leading-[1.6] text-[var(--linen-dim)] mb-3">
              {step.description}
            </p>

            {/* Hoverable detail - appears on hover */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: hoveredIndex === i ? 1 : 0,
                height: hoveredIndex === i ? 'auto' : 0,
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="text-[13px] leading-[1.55] text-[var(--linen)] border-l border-[var(--amber)] pl-3 mt-2">
                {step.detail}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
