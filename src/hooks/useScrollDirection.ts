'use client';

import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [scrolledToTop, setScrolledToTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const SCROLL_THRESHOLD = 80;
    // Mirrors of the state, so scroll events (dozens per second) only reach React on real changes.
    let atTop: boolean | null = null;
    let direction: ScrollDirection = null;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const nowAtTop = scrollY < SCROLL_THRESHOLD;
      if (nowAtTop !== atTop) {
        atTop = nowAtTop;
        setScrolledToTop(nowAtTop);
      }

      if (Math.abs(scrollY - lastScrollY) < 10) return;

      const next = scrollY > lastScrollY ? 'down' : 'up';
      if (next !== direction) {
        direction = next;
        setScrollDirection(next);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    if (window.location.pathname === '/' && !window.location.hash) {
      window.scrollTo(0, 0);
    }
    updateScrollDirection();
    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, []);

  return { scrollDirection, scrolledToTop };
}
