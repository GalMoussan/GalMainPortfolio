'use client';

import { WHATSAPP_MESSAGES, openWhatsApp } from '../_lib/cta';
import { SectionTitle } from './SectionTitle';
import { CARD } from './styles';

const stack = ['TypeScript', 'React', 'Next.js', 'Node.js', 'Prisma', 'PostgreSQL'];

export function Development() {
  return (
    <section id="development" className="max-w-[1000px] mx-auto py-[100px]">
      <SectionTitle eyebrow="Development">Need something built?</SectionTitle>

      <div className={`${CARD} p-7 md:p-10`}>
        <p className="text-[18px] leading-[1.65] text-[var(--linen-dim)] mb-7">
          Websites, web apps, internal tools, integrations, games. I take on development projects of any size. You get
          a fixed quote after a free call, progress you can test every 48 hours, and code you own.
        </p>

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-3">
          <span className="eyebrow mr-2">Stack:</span>
          {stack.map((tech, i) => (
            <span key={tech} className="text-[14px] text-[rgba(94,231,255,0.78)]">
              {tech}
              {i < stack.length - 1 && (
                <span aria-hidden="true" className="ml-2 text-[var(--amber)]">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
        <p className="text-[14px] text-[var(--linen-faint)] mb-9">Full Hebrew / RTL support when you need it.</p>

        <button onClick={() => openWhatsApp(WHATSAPP_MESSAGES.development, 'development')} className="btn-primary">
          Get a quote →
        </button>
      </div>
    </section>
  );
}
