const steps = [
  {
    number: '01',
    title: 'Diagnostic',
    subtitle: 'Free, 30 min.',
    description: 'We talk. I map your workflows, identify the highest-leverage automation, and tell you honestly if AI even makes sense for your business. Some businesses I turn away.',
  },
  {
    number: '02',
    title: 'Architecture',
    subtitle: 'Included in package.',
    description: 'I design the agent system. You see exactly what will be built, which tools it touches, where AI reasoning lives, where human approval stays in the loop.',
  },
  {
    number: '03',
    title: 'Build',
    subtitle: '1–4 weeks.',
    description: 'I ship. You get progress updates every 48 hours with a working link you can actually test. No month-long black boxes.',
  },
  {
    number: '04',
    title: 'Launch & iterate',
    subtitle: '30–90 days included.',
    description: 'We go live. I watch the system run with you and tune it as real data hits it. The first 30–90 days of adjustments are included, not billed hourly.',
  },
];

export function Process() {
  return (
    <section id="how-it-works" className="max-w-[1000px] mx-auto py-[100px]">
      <h2 className="numbered-heading">How I work.</h2>

      {/* Desktop: horizontal timeline, Mobile: vertical stack */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <div key={step.number} className="relative">
            {/* Connector line - desktop only */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-6 left-full w-full h-[2px] bg-[var(--lightest-navy)]" />
            )}

            {/* Step number */}
            <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--light-navy)] border-2 border-[var(--green)] mb-4 z-10">
              <span className="font-mono text-[var(--green)] font-bold">
                {step.number}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-[var(--lightest-slate)] text-xl font-semibold mb-1">
              {step.title}
            </h3>

            {/* Subtitle */}
            <p className="text-[var(--green)] font-mono text-xs mb-3">
              {step.subtitle}
            </p>

            {/* Description */}
            <p className="text-[var(--slate)] text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
