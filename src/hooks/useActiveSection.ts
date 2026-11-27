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

    // Section tops in document coordinates, the page height and the spy line only change
    // with layout, so they're measured then, not per scroll event: getBoundingClientRect()
    // inside a scroll handler forces a layout mid-frame, which costs frames on phones.
    let tops: number[] = [];
    let scrollHeight = 0;
    let spyOffset = 130;
    const measure = () => {
      tops = elements.map((el) => el.getBoundingClientRect().top + window.scrollY);
      scrollHeight = document.documentElement.scrollHeight;
      spyOffset = window.matchMedia('(max-width: 768px)').matches ? 180 : 130;
    };

    const sectionFromScroll = () => {
      const y = window.scrollY;
      if (!window.location.hash && y < 90) return null;

      const maxScroll = scrollHeight - window.innerHeight;
      if (maxScroll < 200) return null;

      const nearBottom = window.innerHeight + y >= scrollHeight - 120;
      if (nearBottom) return ids[ids.length - 1] ?? null;

      const line = y + spyOffset;
      let current: string | null = null;
      elements.forEach((el, i) => {
        if (tops[i] <= line) current = el.id;
      });
      return current;
    };

    // Mirror of the state: per-frame updates only reach React when the section changes.
    let shown: string | null | undefined;
    const show = (id: string | null) => {
      if (id === shown) return;
      shown = id;
      setActiveId(id);
    };

    const update = () => {
      if (hashLock && Date.now() < hashLockUntil) {
        show(hashLock);
        return;
      }
      hashLock = null;
      show(sectionFromScroll());
    };

    // At most one update per frame, however many scroll events arrive.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    const onHashChange = () => {
      const id = window.location.hash.replace('#', '');
      if (ids.includes(id)) {
        hashLock = id;
        hashLockUntil = Date.now() + 1200;
        show(id);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      update();
    });
    resizeObserver.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHashChange);
    if (pathname === '/' && !window.location.hash) window.scrollTo(0, 0);
    measure();
    onHashChange();
    requestAnimationFrame(() => {
      if (pathname === '/' && !window.location.hash) window.scrollTo(0, 0);
      update();
    });

    return () => {
      resizeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [ids, pathname]);

  return activeId;
}
