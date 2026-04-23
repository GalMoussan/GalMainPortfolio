'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { track } from '@vercel/analytics';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { baseFaqs } from '../_content/faqs';
import type { FAQEntry } from '../_lib/verticals/types';

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
      <h2 className="numbered-heading">Questions you&apos;re probably asking.</h2>

      <div className="space-y-8">
        {groupedFaqs.map((group) => (
          <div key={group.category}>
            {/* Category heading */}
            <h3 className="text-[var(--green)] font-semibold mb-4 text-lg">
              {group.category}
            </h3>

            {/* Questions in this category */}
            <div className="space-y-3">
              {group.questions.map((faq) => {
                const currentIndex = globalIndex++;
                const isOpen = openIndex === currentIndex;

                return (
                  <div
                    key={currentIndex}
                    className="border border-[var(--lightest-navy)] rounded overflow-hidden"
                  >
                    {/* Question button */}
                    <button
                      onClick={() => toggleFAQ(currentIndex, faq.question)}
                      className="w-full text-left px-6 py-4 bg-[var(--light-navy)] hover:bg-[var(--lightest-navy)] transition-colors flex justify-between items-center gap-4"
                    >
                      <span className="text-[var(--lightest-slate)] font-medium">
                        {faq.question}
                      </span>
                      <span className="text-[var(--green)] text-xl flex-shrink-0">
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
                          <div className="px-6 py-4 bg-[var(--navy)] border-t border-[var(--lightest-navy)]">
                            <p className="text-[var(--slate)]">{faq.answer}</p>
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
