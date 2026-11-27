'use client';

import { trainingOffers } from '../_content/training';
import { WHATSAPP_MESSAGES, openWhatsApp } from '../_lib/cta';
import { SectionTitle } from './SectionTitle';
import { CARD, DASH_ITEM } from './styles';

export function Training() {
  return (
    <section id="training" className="max-w-[1200px] mx-auto py-[100px]">
      <SectionTitle eyebrow="Training" className="mb-6">
        Learn to build with coding agents.
      </SectionTitle>
      <p className="text-[17px] leading-[1.65] text-[var(--linen-dim)] mb-14 max-w-[800px]">
        Most people use Claude Code like a smarter autocomplete. I teach the workflow that actually ships: a spec before
        code, agents with clear roles, a reviewer on every change, and a quality gate before anything merges. Claude
        Code, Codex, Cursor or whichever agent your team uses.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {trainingOffers.map((offer, i) => (
          <div key={offer.name} className={`${CARD} flex flex-col p-7`}>
            <div className="mb-4 flex items-baseline gap-3">
              <span className="display text-[16px] italic text-[var(--amber)]">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display m-0 text-[24px] leading-[1.15]">{offer.name}</h3>
            </div>
            <p className="display italic text-[18px] leading-[1.4] text-[var(--linen)] mb-5">{offer.whoFor}</p>
            <ul className="m-0 mb-6 list-none space-y-2.5 p-0">
              {offer.points.map((point) => (
                <li key={point} className={DASH_ITEM}>
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-auto border-t border-[rgba(243,236,225,0.1)] pt-4 text-[14px] text-[var(--linen-faint)]">
              Price: <span className="text-[var(--linen)]">{offer.price}</span>
            </p>
          </div>
        ))}
      </div>

      <p className="text-[14px] leading-[1.6] text-[var(--linen-faint)] text-center max-w-[800px] mx-auto mb-8">
        Not a developer? I also run intro sessions for business owners on what coding agents can and can&apos;t do for
        your business.
      </p>

      <div className="text-center">
        <button onClick={() => openWhatsApp(WHATSAPP_MESSAGES.training, 'training')} className="btn-primary">
          Ask about training →
        </button>
      </div>
    </section>
  );
}
