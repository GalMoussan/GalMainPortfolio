'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { VerticalConfig } from '../_lib/verticals/types';
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

  const handlePrimaryCTA = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972500000000'; // TODO: @gal
    const message = encodeURIComponent("Hi Gal, I'd like to book a free 30-min AI diagnostic for my business.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="hero" className="min-h-screen flex items-center py-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-center">
        {/* Copy column - left on desktop, top on mobile */}
        <div className="md:col-span-7">
          {/* Pre-headline badge */}
          <div className="inline-block mb-6 px-4 py-2 border border-[var(--green)] rounded bg-[var(--green-tint)]">
            <p className="font-mono text-[13px] text-[var(--green)] tracking-wide">
              {config.hero.preHeadline}
            </p>
          </div>

          {/* Pain question */}
          <p className="text-xl text-[var(--light-slate)] mb-4">
            {config.hero.painQuestion}
          </p>

          {/* Main headline */}
          <h1 className="text-[var(--fz-hero)] font-bold leading-tight mb-6">
            <span className="text-[var(--white)]">{config.hero.headlineLine1}</span>
            <br />
            <span className="text-[var(--green)]">{config.hero.headlineLine2}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-[var(--slate)] mb-6 max-w-[600px]">
            {config.hero.subheadline}
          </p>

          {/* Cycling text with fade animation */}
          <div className="h-[20px] mb-6 relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={cyclingIndex}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-[var(--green)] text-sm absolute"
              >
                {config.hero.cyclingTexts[cyclingIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Trust micro-badges */}
          <p className="text-sm text-[var(--dark-slate)] mb-8">
            Free 30-min diagnostic · Fixed prices · Built in 2–4 weeks · You own it forever
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <button
              onClick={handlePrimaryCTA}
              className="bg-[var(--green)] text-[var(--navy)] px-8 py-4 rounded font-mono text-sm font-semibold hover:bg-[var(--green)] hover:opacity-90 transition-opacity"
            >
              Book free 30-min diagnostic →
            </button>
            <a
              href="#how-it-works"
              className="inline-link text-[var(--green)] py-4"
            >
              Or see how it works ↓
            </a>
          </div>
        </div>

        {/* Demo column - right on desktop, bottom on mobile */}
        <div className="md:col-span-5">
          <BeforeAfterDemo scenarios={config.demoScenarios} />
        </div>
      </div>
    </section>
  );
}
