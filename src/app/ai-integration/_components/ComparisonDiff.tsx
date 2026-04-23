export function ComparisonDiff() {
  const comparisons = [
    {
      criterion: 'Tool',
      typical: 'Zapier / Make template',
      real: 'Custom autonomous agent',
    },
    {
      criterion: 'Decision-making',
      typical: 'Rigid if/then rules',
      real: 'Context-aware reasoning',
    },
    {
      criterion: 'Edge cases',
      typical: 'Breaks, needs manual fix',
      real: 'Adapts and self-corrects',
    },
    {
      criterion: 'Limits',
      typical: "Capped by Zapier's logic",
      real: 'Capped by what LLMs can do',
    },
    {
      criterion: 'Example',
      typical: '"Form submitted → Slack message"',
      real: '"Read lead, score it, draft reply in your voice, schedule follow-up, log reasoning"',
    },
  ];

  return (
    <section id="vs-zapier" className="max-w-[1000px] mx-auto py-[100px]">
      <h2 className="text-[var(--fz-heading)] font-semibold text-[var(--lightest-slate)] mb-12 text-center">
        What you&apos;ll hear from &quot;AI consultants&quot; vs. what I actually build.
      </h2>

      {/* Git-diff styled panel */}
      <div className="border border-[var(--lightest-navy)] rounded bg-[var(--light-navy)] overflow-hidden">
        {/* File header bar */}
        <div className="bg-[var(--lightest-navy)] px-4 py-2 flex items-center justify-between">
          <span className="font-mono text-[var(--light-slate)] text-xs">
            system-architecture.diff
          </span>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--dark-slate)]" />
            <div className="w-3 h-3 rounded-full bg-[var(--dark-slate)]" />
            <div className="w-3 h-3 rounded-full bg-[var(--dark-slate)]" />
          </div>
        </div>

        {/* Comparison rows */}
        <div className="p-6">
          {comparisons.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 last:mb-0"
            >
              {/* Criterion */}
              <div className="font-mono text-xs text-[var(--green)] font-semibold">
                {row.criterion}
              </div>

              {/* Typical (minus) */}
              <div className="flex gap-2">
                <span className="text-red-400 font-mono text-sm">-</span>
                <span className="text-[var(--dark-slate)] text-sm line-through opacity-70">
                  {row.typical}
                </span>
              </div>

              {/* Real (plus) */}
              <div className="flex gap-2">
                <span className="text-[var(--green)] font-mono text-sm">+</span>
                <span className="text-[var(--lightest-slate)] text-sm font-medium">
                  {row.real}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
