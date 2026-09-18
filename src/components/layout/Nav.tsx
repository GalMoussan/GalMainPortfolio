'use client';

import type { MouseEvent } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollDirection } from '@/hooks/useScrollDirection';

const navLinks = [
  { name: 'About', url: '#about', id: 'about' },
  { name: 'Experience', url: '#jobs', id: 'jobs' },
  { name: 'Work', url: '#projects', id: 'projects' },
  { name: 'Contact', url: '#contact', id: 'contact' },
] as const;

const SECTION_IDS = navLinks.map((link) => link.id);

function scrollToHash(event: MouseEvent<HTMLAnchorElement>, url: string) {
  const id = url.startsWith('#') ? url.slice(1) : '';
  const target = id ? document.getElementById(id) : null;
  if (!target) return;
  event.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  window.history.pushState(null, '', url);
}

export function Nav() {
  const pathname = usePathname();
  const { scrolledToTop } = useScrollDirection();
  const activeId = useActiveSection(SECTION_IDS);
  const docked = pathname !== '/' || !scrolledToTop;

  return (
    <header className={`site-chrome${docked ? ' is-docked' : ''}`}>
      <div className="site-chrome-ends">
        <Logo />
        <a
          href="/resume.pdf"
          className="outline-button py-2.5 px-5"
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>
      </div>

      <nav aria-label="Primary">
        <ul className="nav-capsule">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.name}>
                <a
                  href={link.url}
                  onClick={(event) => scrollToHash(event, link.url)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`nav-capsule-link${isActive ? ' is-active' : ''}`}
                >
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
