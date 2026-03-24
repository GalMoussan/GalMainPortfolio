'use client';

import { useState, useEffect } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsMounted(true);
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  const items = [
    <p key="1" className="mb-[30px] ml-[4px] font-mono text-[var(--green)] text-[16px]">
      Hi, my name is
    </p>,
    <h2 key="2" className="text-[clamp(32px,8vw,80px)] font-semibold text-[var(--lightest-slate)] leading-[1.1] m-0">
      Gal Moussan.
    </h2>,
    <h3 key="3" className="text-[clamp(32px,8vw,80px)] font-semibold text-[var(--slate)] leading-[1.1] mt-[10px]">
      I build things for the web.
    </h3>,
    <p key="4" className="mt-5 max-w-[540px] text-[var(--slate)] text-[20px]">
      I&apos;m a fullstack developer and tech lead with a background in military leadership,
      specializing in building CRM systems and web applications. Currently, I&apos;m leading
      development at{' '}
      <a href="https://www.lagoonads.com/" className="inline-link" target="_blank" rel="noreferrer">
        Lagoonads
      </a>
      .
    </p>,
    <div key="5" className="mt-[50px]">
      <a
        href="mailto:galmoussan@gmail.com"
        className="outline-button inline-block py-5 px-7 leading-[1]"
      >
        Get In Touch
      </a>
    </div>,
  ];

  return (
    <section className="flex flex-col justify-center min-h-screen max-w-[1000px] mx-auto py-0 px-0 pt-[100px] md:pt-0">
      <div>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? 'none' : 'translateY(20px)',
              transition: `opacity 0.3s var(--easing) ${i * 100}ms, transform 0.3s var(--easing) ${i * 100}ms`,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
