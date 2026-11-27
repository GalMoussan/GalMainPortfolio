import type { VerticalConfig } from '../_lib/verticals/types';
import { SectionTitle } from './SectionTitle';
import { CARD, DASH_ITEM } from './styles';

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
      <SectionTitle eyebrow="Services & pricing" centered className="mb-5">
        What I build for you.
      </SectionTitle>
      <p className="text-[17px] leading-[1.6] text-[var(--linen-dim)] mb-14 text-center">
        Three fixed-price packages. One-time payment. You own it forever.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {services.map((service, i) => (
          <div
            key={service.name}
            className={`${CARD} relative p-7 ${service.badge ? '!border-[rgba(244,165,65,0.45)]' : ''}`}
          >
            {/* Badge */}
            {service.badge && (
              <div className="absolute -top-3 left-7 rounded-full bg-[var(--amber)] px-3 py-1.5 text-[10.5px] font-semibold uppercase leading-none tracking-[0.18em] text-[#1c1b20]">
                {service.badge}
              </div>
            )}

            {/* Service name */}
            <div className="mb-5 flex items-baseline gap-3">
              <span className="display text-[16px] italic text-[var(--amber)]">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display m-0 text-[24px] leading-[1.15]">{service.name}</h3>
            </div>

            {/* Dual currency pricing */}
            <div className="mb-6 border-b border-[rgba(243,236,225,0.1)] pb-6">
              <div className="display text-[clamp(40px,3.6vw,52px)] leading-none tracking-[-0.03em]">
                ${service.priceUSD.toLocaleString()}{service.suffix || ''}
              </div>
              <div className="mt-2 text-[13px] text-[var(--linen-faint)]">
                ₪{service.priceILS.toLocaleString()} ILS
              </div>
            </div>

            {/* Who it's for */}
            <p className="display italic text-[18px] leading-[1.4] text-[var(--linen)] mb-4">
              {service.whoFor}
            </p>

            {/* Example from config */}
            <p className="text-[14px] leading-[1.6] text-[var(--linen-dim)] mb-5">
              <span className="font-medium text-[var(--amber)]">Example: </span>
              {i === 0 ? config.serviceExamples.starter : i === 1 ? config.serviceExamples.business : config.serviceExamples.full}
            </p>

            {/* Features */}
            <ul className="m-0 list-none space-y-2.5 p-0">
              {service.features.map((feature) => (
                <li key={feature} className={DASH_ITEM}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer disclaimer */}
      <p className="text-[14px] leading-[1.6] text-[var(--linen-faint)] text-center max-w-[800px] mx-auto">
        All packages include hosting guidance. Ongoing hosting: $30–200/month (₪100–700 ILS) paid directly to your cloud provider, not to me.
      </p>
    </section>
  );
}
