'use client';

import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [scrolledToTop, setScrolledToTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const SCROLL_THRESHOLD = 50;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      setScrolledToTop(scrollY < SCROLL_THRESHOLD);

      if (Math.abs(scrollY - lastScrollY) < 10) return;

      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, []);

  return { scrollDirection, scrolledToTop };
}
