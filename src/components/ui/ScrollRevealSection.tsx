'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ScrollRevealSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function ScrollRevealSection({ id, className, children }: ScrollRevealSectionProps) {
  const ref = useScrollReveal();

  return (
    <section id={id} className={className} ref={ref}>
      {children}
    </section>
  );
}
