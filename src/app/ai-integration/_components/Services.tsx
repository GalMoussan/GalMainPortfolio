import type { VerticalConfig } from '../_lib/verticals/types';

type ServicesProps = {
  config: VerticalConfig;
};

const services = [
  {
    name: 'Starter Agent',
    priceUSD: 1000,
    priceILS: 3500,
    badge: null,
    whoFor: 'I want to see what an AI agent can actually do.',
    features: [
      'One focused AI agent handling one workflow',
      'Integrates up to 2 tools you already use',
      'Deployed and running in 7 days',
      '30 days free tweaks',
    ],
  },
  {
    name: 'Business System',
    priceUSD: 3000,
    priceILS: 10500,
    badge: 'Most Popular',
    whoFor: 'I have 3 workflows that need to run themselves.',
    features: [
      'Multi-agent system with 3–5 coordinated agents',
      'Integrates up to 5 tools',
      'Custom monitoring dashboard',
      'Deployed in 2–3 weeks',
      '60 days free tweaks + 1 strategy session',
    ],
  },
  {
    name: 'Full Autonomous Operation',
    priceUSD: 6000,
    priceILS: 21000,
    badge: null,
    whoFor: 'I want my ops to run themselves while I sleep.',
    features: [
      'Fully custom multi-agent infrastructure',
      'Unlimited tool integrations',
      'Persistent knowledge base for your business',
      'Admin dashboard + audit logs',
      'Deployed in 3–4 weeks',
      '90 days free tweaks + monthly strategy calls for 3 months',
    ],
    suffix: '+',
  },
];

export function Services({ config }: ServicesProps) {
  return (
    <section id="what-i-build" className="max-w-[1200px] mx-auto py-[100px]">
      <h2 className="numbered-heading">What I build for you.</h2>
      <p className="text-[var(--slate)] text-lg mb-12 text-center">
        Three fixed-price packages. One-time payment. You own it forever.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {services.map((service, i) => (
          <div
            key={service.name}
            className="noteworthy-card bg-[var(--light-navy)] border border-[var(--lightest-navy)] rounded p-6 relative"
          >
            {/* Badge */}
            {service.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--green)] text-[var(--navy)] px-3 py-1 rounded font-mono text-xs font-semibold">
                {service.badge}
              </div>
            )}

            {/* Service name */}
            <h3 className="text-[var(--lightest-slate)] text-xl font-semibold mb-4">
              {service.name}
            </h3>

            {/* Dual currency pricing */}
            <div className="mb-6">
              <div className="text-4xl font-bold text-[var(--green)] font-mono">
                ${service.priceUSD.toLocaleString()}{service.suffix || ''}
              </div>
              <div className="text-sm text-[var(--dark-slate)] font-mono mt-1">
                ₪{service.priceILS.toLocaleString()} ILS
              </div>
            </div>

            {/* Who it's for */}
            <p className="text-[var(--light-slate)] text-sm italic mb-4 border-l-2 border-[var(--green)] pl-3">
              {service.whoFor}
            </p>

            {/* Example from config */}
            <p className="text-[var(--slate)] text-sm mb-4">
              <span className="font-semibold text-[var(--lightest-slate)]">Example: </span>
              {i === 0 ? config.serviceExamples.starter : i === 1 ? config.serviceExamples.business : config.serviceExamples.full}
            </p>

            {/* Features */}
            <ul className="bullet-list space-y-2">
              {service.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer disclaimer */}
      <p className="text-[var(--dark-slate)] text-sm text-center max-w-[800px] mx-auto">
        All packages include hosting guidance. Ongoing hosting: $30–200/month (₪100–700 ILS) paid directly to your cloud provider, not to me.
      </p>
    </section>
  );
}
