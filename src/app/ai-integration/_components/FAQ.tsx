'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { track } from '@vercel/analytics';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { baseFaqs } from '../_content/faqs';
import type { FAQEntry } from '../_lib/verticals/types';
import { SectionTitle } from './SectionTitle';

type FAQProps = {
  additionalFaqs?: FAQEntry[];
};

export function FAQ({ additionalFaqs = [] }: FAQProps) {
  const allFaqs = [...baseFaqs, ...additionalFaqs];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Group FAQs by category
  const categories = Array.from(new Set(allFaqs.map((faq) => faq.category)));
  const groupedFaqs = categories.map((category) => ({
    category,
    questions: allFaqs.filter((faq) => faq.category === category),
  }));

  const toggleFAQ = (index: number, question: string) => {
    const isOpening = openIndex !== index;
    setOpenIndex(openIndex === index ? null : index);

    if (isOpening) {
      track('faq_open', { question });
    }
  };

  let globalIndex = 0;

  return (
    <section id="faq" className="max-w-[900px] mx-auto py-[100px]">
      <SectionTitle eyebrow="FAQ">Questions you&apos;re probably asking.</SectionTitle>

      <div className="space-y-12">
        {groupedFaqs.map((group) => (
          <div key={group.category}>
            {/* Category heading */}
            <h3 className="eyebrow m-0 mb-3">
              {group.category}
            </h3>

            {/* Questions in this category */}
            <div className="border-b border-[rgba(243,236,225,0.1)]">
              {group.questions.map((faq) => {
                const currentIndex = globalIndex++;
                const isOpen = openIndex === currentIndex;

                return (
                  <div
                    key={currentIndex}
                    className="border-t border-[rgba(243,236,225,0.1)]"
                  >
                    {/* Question button */}
                    <button
                      onClick={() => toggleFAQ(currentIndex, faq.question)}
                      className="group w-full text-left py-5 flex justify-between items-center gap-6"
                      style={{ minHeight: '44px' }}
                    >
                      <span className="text-[17px] leading-[1.45] text-[var(--linen)] transition-colors group-hover:text-[var(--amber)]">
                        {faq.question}
                      </span>
                      <span className="display text-[26px] leading-none text-[var(--amber)] flex-shrink-0">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {/* Answer with accordion animation */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 pr-10">
                            <p className="text-[15px] leading-[1.7] text-[var(--linen-dim)]">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
