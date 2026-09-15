'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useActiveSection(ids: readonly string[]) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== '/') {
      setActiveId(null);
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      setActiveId(null);
      return;
    }

    let hashLock: string | null = null;
    let hashLockUntil = 0;

    const spyOffset = () => (window.matchMedia('(max-width: 768px)').matches ? 180 : 130);

    const sectionFromScroll = () => {
      if (window.scrollY < 90 && !window.location.hash) return null;

      const doc = document.documentElement;
      const nearBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 120;
      if (nearBottom) return ids[ids.length - 1] ?? null;

      const line = spyOffset();
      let current: string | null = null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) {
          current = el.id;
        }
      }
      return current;
    };

    const update = () => {
      if (hashLock && Date.now() < hashLockUntil) {
        setActiveId(hashLock);
        return;
      }
      hashLock = null;
      setActiveId(sectionFromScroll());
    };

    const onHashChange = () => {
      const id = window.location.hash.replace('#', '');
      if (ids.includes(id)) {
        hashLock = id;
        hashLockUntil = Date.now() + 1200;
        setActiveId(id);
      }
    };

    const observer = new IntersectionObserver(update, {
      rootMargin: '-15% 0px -65% 0px',
      threshold: [0, 0.15, 0.35, 0.6, 1],
    });

    elements.forEach((el) => observer.observe(el));
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [ids, pathname]);

  return activeId;
}
