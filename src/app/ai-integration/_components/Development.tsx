'use client';

import { WHATSAPP_MESSAGES, openWhatsApp } from '../_lib/cta';

const stack = ['TypeScript', 'React', 'Next.js', 'Node.js', 'Prisma', 'PostgreSQL'];

export function Development() {
  return (
    <section id="development" className="max-w-[1000px] mx-auto py-[100px]">
      <h2 className="numbered-heading">Need something built?</h2>

      <div className="noteworthy-card bg-[var(--light-navy)] border border-[var(--lightest-navy)] rounded p-6 md:p-8">
        <p className="text-[var(--slate)] text-lg mb-6">
          Websites, web apps, internal tools, integrations, games. I take on development projects of any size. You get
          a fixed quote after a free call, progress you can test every 48 hours, and code you own.
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-sm text-[var(--light-slate)] font-semibold mr-1">Stack:</span>
          {stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs text-[var(--light-slate)] bg-[var(--lightest-navy)] px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="text-[var(--slate)] text-sm mb-8">Full Hebrew / RTL support when you need it.</p>

        <button
          onClick={() => openWhatsApp(WHATSAPP_MESSAGES.development, 'development')}
          className="outline-button px-6 py-3"
        >
          Get a quote →
        </button>
      </div>
    </section>
  );
}
