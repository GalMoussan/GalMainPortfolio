'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { KineticHeading } from '@/components/ui/KineticHeading';
import type { VerticalConfig } from '../_lib/verticals/types';
import { openBookCall } from '../_lib/cta';
import { BeforeAfterDemo } from './BeforeAfterDemo';

type HeroProps = {
  config: VerticalConfig;
};

export function Hero({ config }: HeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [cyclingIndex, setCyclingIndex] = useState(0);

  // Cycle through texts every 2.5 seconds
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCyclingIndex((prev) => (prev + 1) % config.hero.cyclingTexts.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [config.hero.cyclingTexts.length, prefersReducedMotion]);

  return (
    <section id="hero" className="min-h-screen flex items-center py-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 w-full items-center">
        {/* Copy column - left on desktop, top on mobile */}
        <div className="md:col-span-7 min-w-0">
          {/* Pre-headline label */}
          <p className="eyebrow mb-6 leading-[1.8]">{config.hero.preHeadline}</p>

          {/* Pain question */}
          <p className="display italic text-[clamp(19px,1.8vw,24px)] leading-[1.35] text-[var(--linen-dim)] mb-5">
            {config.hero.painQuestion}
          </p>

          {/* Main headline */}
          <KineticHeading
            as="h1"
            tracking={-0.03}
            className="display m-0 mb-7 text-[clamp(40px,5.5vw,80px)] leading-[1] tracking-[-0.03em]"
          >
            {`${config.hero.headlineLine1} ${config.hero.headlineLine2}`}
          </KineticHeading>

          {/* Subheadline */}
          <p className="text-[17px] leading-[1.65] text-[var(--linen-dim)] mb-6 max-w-[600px]">
            {config.hero.subheadline}
          </p>

          {/* Cycling text with fade animation */}
          <div className="h-[28px] mb-6 relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={cyclingIndex}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="display italic text-[20px] leading-[28px] text-[var(--amber)] absolute"
              >
                {config.hero.cyclingTexts[cyclingIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Trust micro-badges */}
          <p className="text-[14px] text-[var(--linen-faint)] mb-9">
            Free 30-min call · Fixed prices · Built in 2–4 weeks · You own it forever
          </p>

          {/* Primary CTA */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
            <button onClick={() => openBookCall('hero')} className="btn-primary">
              Book free 30-min call →
            </button>
            <a href="#how-it-works" className="btn-link">
              Or see how it works ↓
            </a>
          </div>
        </div>

        {/* Demo column - right on desktop, bottom on mobile */}
        <div className="md:col-span-5 min-w-0">
          <BeforeAfterDemo scenarios={config.demoScenarios} />
        </div>
      </div>
    </section>
  );
}
