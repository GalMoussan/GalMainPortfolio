'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { track } from '@vercel/analytics';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { DemoScenario } from '../_lib/verticals/types';

type BeforeAfterDemoProps = {
  scenarios: DemoScenario[];
};

export function BeforeAfterDemo({ scenarios }: BeforeAfterDemoProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Motion value for slider position (0-100%)
  const sliderPosition = useMotionValue(40);
  const clipPath = useTransform(
    sliderPosition,
    (pos) => `inset(0 ${100 - pos}% 0 0)`
  );

  const activeScenario = scenarios[activeIndex];

  // First-mount nudge animation
  useEffect(() => {
    if (prefersReducedMotion || hasInteracted) return;

    const nudge = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      sliderPosition.set(30);
      await new Promise((resolve) => setTimeout(resolve, 300));
      sliderPosition.set(40);
    };

    nudge();
  }, [sliderPosition, prefersReducedMotion, hasInteracted]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const current = sliderPosition.get();
      sliderPosition.set(Math.max(0, current - 5));
      setHasInteracted(true);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const current = sliderPosition.get();
      sliderPosition.set(Math.min(100, current + 5));
      setHasInteracted(true);
    }
  };

  // Handle pointer-based dragging
  const handlePointerMove = (e: PointerEvent) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (relativeX / containerRect.width) * 100));

    sliderPosition.set(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setHasInteracted(true);
    e.currentTarget.setPointerCapture(e.pointerId);

    const onMove = (event: PointerEvent) => handlePointerMove(event);
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    // Set initial position
    handlePointerMove(e.nativeEvent);
  };

  return (
    <div className="rounded-[22px] border border-[rgba(243,236,225,0.08)] bg-[rgba(36,38,51,0.72)] overflow-hidden">
      {/* Top strip */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[rgba(243,236,225,0.1)]">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--linen-faint)]">
          Illustrative example
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--amber)] animate-pulse" />
        </div>
      </div>

      {/* Scenario tabs */}
      <div className="flex border-b border-[rgba(243,236,225,0.1)]">
        {scenarios.map((scenario, i) => (
          <button
            key={scenario.id}
            onClick={() => {
              setActiveIndex(i);
              track('scenario_tab_switch', { scenario: scenario.id });
            }}
            className={`-mb-px min-h-[44px] min-w-0 flex-1 border-b-2 px-3 py-3 font-sans text-[13px] leading-[1.3] transition-colors duration-200 ease-custom ${
              i === activeIndex
                ? 'border-[var(--amber)] text-[var(--linen)]'
                : 'border-transparent text-[var(--linen-faint)] hover:text-[var(--linen)]'
            }`}
          >
            {scenario.label}
          </button>
        ))}
      </div>

      {/* Main content area with slider */}
      <div
        ref={containerRef}
        className="relative h-[380px] md:h-[450px] overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScenario.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {/* Before side - always visible, full width */}
            <BeforeSide scenario={activeScenario} />

            {/* After side - clipped by slider position */}
            <motion.div
              style={{ clipPath }}
              className="absolute inset-0 pointer-events-none"
            >
              <AfterSide
                scenario={activeScenario}
                prefersReducedMotion={prefersReducedMotion}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Draggable handle */}
        <motion.div
          onPointerDown={handlePointerDown}
          style={{
            left: useTransform(sliderPosition, (pos) => `${pos}%`),
          }}
          className="absolute top-0 bottom-0 z-20 cursor-ew-resize touch-none"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={sliderPosition.get()}
          aria-label="Adjust comparison slider"
        >
          {/* Handle bar */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-[var(--linen)]" />
          {/* Handle circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[var(--linen)] flex items-center justify-center shadow-[0_0_0_5px_var(--amber-tint),0_10px_30px_rgba(6,8,12,0.45)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c1b20" strokeWidth="1.75">
              <path d="M15 18l-6-6 6-6" />
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Bottom hint */}
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: hasInteracted ? 0 : 1 }}
          className="px-6 py-3 border-t border-[rgba(243,236,225,0.1)] text-center"
        >
          <p className="text-[12px] tracking-[0.04em] text-[var(--linen-faint)]">
            ← Drag to compare →
          </p>
        </motion.div>
      )}
    </div>
  );
}

function BeforeSide({ scenario }: { scenario: DemoScenario }) {
  return (
    <div className="h-full px-6 pb-6 pt-12 md:px-8 md:pb-8 bg-[#16171f] relative">
      {/* Copy overlay */}
      <div className="absolute top-4 left-6 md:left-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--linen-faint)]">
          Manual · Slow · Errors
        </p>
      </div>

      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="display text-[20px] leading-[1.2] text-[var(--linen-dim)] mb-4">
            {scenario.before.title}
          </div>
          <ul className="space-y-3">
            {scenario.before.bullets.map((bullet, i) => (
              <li key={i} className="text-[13px] leading-[1.5] text-[var(--linen-faint)] flex items-start gap-2.5">
                <span aria-hidden="true" className="text-[var(--linen-faint)]">✗</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {scenario.before.stat && (
          <div className="mt-4 pt-4 border-t border-[rgba(243,236,225,0.1)]">
            <p className="text-[12px] text-[var(--linen-faint)] mb-1">
              {scenario.before.stat.label}
            </p>
            <p className="display text-[30px] leading-none text-[var(--linen-faint)]">
              {scenario.before.stat.value}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function AfterSide({
  scenario,
  prefersReducedMotion,
}: {
  scenario: DemoScenario;
  prefersReducedMotion: boolean;
}) {
  const [counter, setCounter] = useState(0);

  // Animated counter
  useEffect(() => {
    if (prefersReducedMotion) {
      // Show final value immediately
      const match = scenario.after.stat?.value.match(/\d+/);
      if (match) setCounter(parseInt(match[0]));
      return;
    }

    setCounter(0);
    const match = scenario.after.stat?.value.match(/\d+/);
    if (!match) return;

    const target = parseInt(match[0]);
    const duration = 2000; // 2 seconds
    const steps = 30;
    const increment = target / steps;
    const interval = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCounter(target);
        clearInterval(timer);
      } else {
        setCounter(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [scenario.id, scenario.after.stat?.value, prefersReducedMotion]);

  return (
    <div className="h-full px-6 pb-6 pt-12 md:px-8 md:pb-8 bg-[#1e2029] relative">
      {/* Copy overlay: the technical side keeps a terminal voice */}
      <div className="absolute top-4 right-6 md:right-8">
        <p className="text-[11px] font-mono text-[var(--green)]">
          Autonomous · 24/7 · Logged
        </p>
      </div>

      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="display text-[20px] leading-[1.2] text-[var(--linen)] mb-4">
            {scenario.after.title}
          </div>

          {/* Workflow diagram */}
          <WorkflowDiagram
            steps={scenario.after.bullets}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        <div className="space-y-3">
          {scenario.after.stat && (
            <div className="pt-4 border-t border-[rgba(243,236,225,0.1)]">
              <p className="text-[12px] text-[var(--linen-faint)] mb-1">
                {scenario.after.stat.label}
              </p>
              <p className="display text-[30px] leading-none text-[var(--amber)]">
                {scenario.after.stat.value.replace(/\d+/, String(counter))}
              </p>
            </div>
          )}

          {scenario.after.statusLabel && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
              <p className="text-[11px] font-mono text-[var(--green)]">
                {scenario.after.statusLabel}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WorkflowDiagram({
  steps,
  prefersReducedMotion,
}: {
  steps: string[];
  prefersReducedMotion: boolean;
}) {
  // Extract step names from bullets (e.g., "Intake → Classify → Score" becomes ["Intake", "Classify", "Score"])
  const stepNames = steps[0]
    ?.split('→')
    .map((s) => s.trim())
    .filter(Boolean) || [];

  if (stepNames.length === 0) return null;

  return (
    <div className="space-y-3">
      {stepNames.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          {/* Node */}
          <div className="flex-shrink-0 px-3 py-1.5 rounded-full bg-[rgba(12,16,22,0.6)] border border-[rgba(94,231,255,0.35)]">
            <span className="text-[11px] text-[var(--green)] font-mono">{step}</span>
          </div>

          {/* Arrow with animated dot */}
          {i < stepNames.length - 1 && (
            <div className="flex-shrink-0 relative">
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                <path
                  d="M0 6h20M16 2l4 4-4 4"
                  stroke="var(--green)"
                  strokeOpacity="0.3"
                  strokeWidth="1.5"
                />
              </svg>
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--green)]"
                  animate={{
                    x: [0, 20, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'linear',
                  }}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
