'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function ScrollLinkedFigure() {
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    if (prefersReducedMotion) {
      frame.style.transform = 'none';
      return;
    }

    if (window.matchMedia('(max-width: 767px)').matches) {
      frame.style.transform = 'none';
      return;
    }

    const update = () => {
      const rect = frame.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const progress = 1 - Math.min(1, Math.max(0, (rect.top + rect.height * 0.5) / viewH));
      const yaw = (progress - 0.5) * 16;
      const lift = (0.5 - progress) * 12;
      frame.style.transform = `perspective(1000px) rotateY(${yaw.toFixed(2)}deg) translate3d(0, ${lift.toFixed(1)}px, 0)`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative mx-auto w-full max-w-[250px] md:max-w-[300px] md:sticky md:top-[120px] md:self-start">
      <div
        ref={frameRef}
        className="relative group block w-full aspect-square origin-center will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute top-[12px] left-[12px] w-full h-full rounded-[20px] border border-[rgba(110,216,255,0.45)] pointer-events-none transition-[top,left,box-shadow] duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:top-[8px] group-hover:left-[8px] group-hover:shadow-[0_0_28px_rgba(110,216,255,0.28)]" />
        <div className="relative rounded-[20px] overflow-hidden w-full h-full border border-[rgba(110,216,255,0.28)]">
          <div className="absolute inset-0 bg-[var(--green)] mix-blend-multiply z-10 opacity-20 transition-opacity duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:opacity-0" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/profile.jpeg"
            alt="Headshot"
            width={300}
            height={300}
            className="relative rounded-[20px] w-full h-full object-cover filter grayscale contrast-[1] brightness-90 transition-[filter] duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:grayscale-0 group-hover:brightness-100"
          />
        </div>
      </div>
    </div>
  );
}
