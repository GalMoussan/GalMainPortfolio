import { SectionTitle } from './SectionTitle';
import { CARD } from './styles';

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
      <SectionTitle eyebrow="The difference" centered>
        What you&apos;ll hear from &quot;AI consultants&quot; vs. what I actually build.
      </SectionTitle>

      <div className={`${CARD} overflow-hidden`}>
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-[rgba(243,236,225,0.1)] px-6 py-3 md:px-8">
          <span className="text-[12px] tracking-[0.04em] text-[var(--linen-faint)]">system-architecture.diff</span>
          <div className="flex gap-2" aria-hidden="true">
            <div className="h-2.5 w-2.5 rounded-full border border-[rgba(243,236,225,0.3)]" />
            <div className="h-2.5 w-2.5 rounded-full border border-[rgba(243,236,225,0.3)]" />
            <div className="h-2.5 w-2.5 rounded-full border border-[rgba(243,236,225,0.3)]" />
          </div>
        </div>

        {/* Comparison rows */}
        <div className="px-6 md:px-8">
          {comparisons.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-3 border-t border-[rgba(243,236,225,0.1)] py-6 first:border-t-0 md:grid-cols-[160px_1fr_1fr] md:gap-6"
            >
              {/* Criterion */}
              <div className="eyebrow pt-[3px]">{row.criterion}</div>

              {/* Typical (minus) */}
              <div className="flex gap-3">
                <span aria-hidden="true" className="text-[15px] text-[var(--linen-faint)]">
                  −
                </span>
                <span className="text-[15px] leading-[1.55] text-[var(--linen-faint)] line-through decoration-[rgba(243,236,225,0.35)]">
                  {row.typical}
                </span>
              </div>

              {/* Real (plus) */}
              <div className="flex gap-3">
                <span aria-hidden="true" className="text-[15px] text-[var(--amber)]">
                  +
                </span>
                <span className="text-[15px] leading-[1.55] text-[var(--linen)]">{row.real}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
