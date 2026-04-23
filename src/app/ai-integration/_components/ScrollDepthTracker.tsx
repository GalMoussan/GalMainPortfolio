'use client';

import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';

export function ScrollDepthTracker() {
  const milestones = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track at 25%, 50%, 75%, 100% milestones
      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPercentage >= milestone && !milestones.current.has(milestone)) {
          milestones.current.add(milestone);
          track('scroll_depth', { depth: `${milestone}%` });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
