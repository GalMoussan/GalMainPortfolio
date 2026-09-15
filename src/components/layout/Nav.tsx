'use client';

import { HexLogo } from './HexLogo';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollDirection } from '@/hooks/useScrollDirection';

const navLinks = [
  { name: 'About', url: '#about', id: 'about' },
  { name: 'Experience', url: '#jobs', id: 'jobs' },
  { name: 'Work', url: '#projects', id: 'projects' },
  { name: 'Contact', url: '#contact', id: 'contact' },
] as const;

const SECTION_IDS = navLinks.map((link) => link.id);

export function Nav() {
  const { scrolledToTop } = useScrollDirection();
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <header
      className={`fixed top-0 z-50 w-full px-[16px] sm:px-[25px] md:px-[50px] transition-all duration-300 ease-custom ${
        scrolledToTop
          ? 'py-3 md:py-4 bg-transparent'
          : 'py-2 md:py-3 bg-[rgba(10,25,47,0.28)] backdrop-blur-md'
      }`}
    >
      <nav
        aria-label="Primary"
        className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 md:gap-4 w-full max-w-[1600px] mx-auto"
      >
        <div className="flex items-center justify-between md:justify-start md:flex-none">
          <a
            href="/"
            aria-label="home"
            className="text-[var(--green)] inline-flex drop-shadow-[0_0_12px_rgba(110,216,255,0.35)] focus-visible:rounded-full"
          >
            <HexLogo size={50} />
          </a>

          <a
            href="/resume.pdf"
            className="outline-button py-2.5 px-5 md:hidden"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </div>

        <ul className="nav-capsule order-last md:order-none md:absolute md:left-1/2 md:-translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.name}>
                <a
                  href={link.url}
                  aria-current={isActive ? 'true' : undefined}
                  className={`nav-capsule-link${isActive ? ' is-active' : ''}`}
                >
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="/resume.pdf"
          className="outline-button hidden md:inline-flex items-center py-2.5 px-5 flex-none"
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
