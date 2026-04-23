'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Diagnostic',
    subtitle: 'Free, 30 min.',
    description: 'We talk. I map your workflows, identify the highest-leverage automation, and tell you honestly if AI even makes sense for your business. Some businesses I turn away.',
    detail: 'No sales pitch. If AI is overkill for your use case, I&apos;ll tell you.',
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
      <h2 className="numbered-heading">How I work.</h2>

      {/* Desktop: horizontal timeline, Mobile: vertical stack */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            className="relative p-4 rounded-lg transition-colors cursor-default"
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ y: -4 }}
            style={{
              backgroundColor: hoveredIndex === i ? 'var(--lightest-navy)' : 'transparent',
            }}
          >
            {/* Connector line - desktop only */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 left-full w-full h-[2px] bg-[var(--lightest-navy)]" />
            )}

            {/* Step number */}
            <motion.div
              className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--light-navy)] border-2 mb-4 z-10"
              style={{
                borderColor: hoveredIndex === i ? 'var(--green)' : 'var(--lightest-navy)',
              }}
            >
              <span
                className="font-mono font-bold"
                style={{
                  color: hoveredIndex === i ? 'var(--green)' : 'var(--slate)',
                }}
              >
                {step.number}
              </span>
            </motion.div>

            {/* Title */}
            <h3 className="text-[var(--lightest-slate)] text-xl font-semibold mb-1">
              {step.title}
            </h3>

            {/* Subtitle */}
            <p className="text-[var(--green)] font-mono text-xs mb-3">
              {step.subtitle}
            </p>

            {/* Description */}
            <p className="text-[var(--slate)] text-sm mb-3">
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
              <p className="text-[var(--green)] text-xs font-mono border-l-2 border-[var(--green)] pl-3 mt-2">
                {step.detail}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
