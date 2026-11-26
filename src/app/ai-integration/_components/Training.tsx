'use client';

import { trainingOffers } from '../_content/training';
import { WHATSAPP_MESSAGES, openWhatsApp } from '../_lib/cta';

export function Training() {
  return (
    <section id="training" className="max-w-[1200px] mx-auto py-[100px]">
      <h2 className="numbered-heading">Learn to build with coding agents.</h2>
      <p className="text-[var(--slate)] text-lg mb-12 max-w-[800px]">
        Most people use Claude Code like a smarter autocomplete. I teach the workflow that actually ships: a spec before
        code, agents with clear roles, a reviewer on every change, and a quality gate before anything merges. Claude
        Code, Codex, Cursor or whichever agent your team uses.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {trainingOffers.map((offer) => (
          <div
            key={offer.name}
            className="noteworthy-card bg-[var(--light-navy)] border border-[var(--lightest-navy)] rounded p-6"
          >
            <h3 className="text-[var(--lightest-slate)] text-xl font-semibold mb-4">{offer.name}</h3>
            <p className="text-[var(--light-slate)] text-sm italic mb-4 border-l-2 border-[var(--green)] pl-3">
              {offer.whoFor}
            </p>
            <ul className="bullet-list space-y-2 mb-6">
              {offer.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="text-sm text-[var(--slate)] font-mono">Price: {offer.price}</p>
          </div>
        ))}
      </div>

      <p className="text-[var(--slate)] text-sm text-center max-w-[800px] mx-auto mb-8">
        Not a developer? I also run intro sessions for business owners on what coding agents can and can&apos;t do for
        your business.
      </p>

      <div className="text-center">
        <button
          onClick={() => openWhatsApp(WHATSAPP_MESSAGES.training, 'training')}
          className="outline-button px-6 py-3"
        >
          Ask about training →
        </button>
      </div>
    </section>
  );
}
