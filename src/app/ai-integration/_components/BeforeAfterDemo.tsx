'use client';

import type { DemoScenario } from '../_lib/verticals/types';

type BeforeAfterDemoProps = {
  scenarios: DemoScenario[];
};

export function BeforeAfterDemo({ scenarios }: BeforeAfterDemoProps) {
  // Phase 3: Static placeholder - interactive slider in Phase 4
  const activeScenario = scenarios[0]; // Show first scenario only

  return (
    <div className="bg-[var(--light-navy)] border border-[var(--lightest-navy)] rounded overflow-hidden">
      {/* Top strip */}
      <div className="flex items-center justify-between px-6 py-3 bg-[var(--lightest-navy)] border-b border-[var(--navy)]">
        <span className="font-mono text-xs text-[var(--light-slate)]">
          LIVE DEMO · Watch a real workflow transform
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
        </div>
      </div>

      {/* Scenario tabs - static for Phase 3 */}
      <div className="flex border-b border-[var(--lightest-navy)]">
        {scenarios.map((scenario, i) => (
          <button
            key={scenario.id}
            className={`flex-1 py-3 px-4 font-mono text-xs transition-colors ${
              i === 0
                ? 'text-[var(--lightest-slate)] border-b-2 border-[var(--green)]'
                : 'text-[var(--slate)]'
            }`}
          >
            {scenario.label}
          </button>
        ))}
      </div>

      {/* Main content area - split view */}
      <div className="grid grid-cols-2 divide-x divide-[var(--lightest-navy)] min-h-[350px]">
        {/* Before side */}
        <div className="p-6">
          <h4 className="text-[var(--light-slate)] font-semibold mb-3 text-sm">
            {activeScenario.before.title}
          </h4>
          <ul className="space-y-2">
            {activeScenario.before.bullets.map((bullet, i) => (
              <li key={i} className="text-xs text-[var(--dark-slate)]">
                • {bullet}
              </li>
            ))}
          </ul>
          {activeScenario.before.stat && (
            <div className="mt-4 pt-4 border-t border-[var(--lightest-navy)]">
              <p className="text-xs text-[var(--dark-slate)]">
                {activeScenario.before.stat.label}
              </p>
              <p className="text-lg font-bold text-[var(--slate)] font-mono">
                {activeScenario.before.stat.value}
              </p>
            </div>
          )}
        </div>

        {/* After side */}
        <div className="p-6 bg-[var(--navy)]">
          <h4 className="text-[var(--green)] font-semibold mb-3 text-sm">
            {activeScenario.after.title}
          </h4>
          <ul className="space-y-2">
            {activeScenario.after.bullets.map((bullet, i) => (
              <li key={i} className="text-xs text-[var(--light-slate)]">
                • {bullet}
              </li>
            ))}
          </ul>
          {activeScenario.after.stat && (
            <div className="mt-4 pt-4 border-t border-[var(--green)] border-opacity-30">
              <p className="text-xs text-[var(--slate)]">
                {activeScenario.after.stat.label}
              </p>
              <p className="text-lg font-bold text-[var(--green)] font-mono">
                {activeScenario.after.stat.value}
              </p>
            </div>
          )}
          {activeScenario.after.statusLabel && (
            <div className="mt-3">
              <p className="text-xs font-mono text-[var(--green)]">
                {activeScenario.after.statusLabel}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom hint */}
      <div className="px-6 py-3 bg-[var(--lightest-navy)] border-t border-[var(--navy)] text-center">
        <p className="text-xs text-[var(--dark-slate)] font-mono">
          Phase 4: Interactive slider will replace this static view
        </p>
      </div>
    </div>
  );
}
