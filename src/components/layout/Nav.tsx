'use client';

import { HexLogo } from './HexLogo';
import { HamburgerMenu } from './HamburgerMenu';
import { useScrollDirection } from '@/hooks/useScrollDirection';

const navLinks = [
  { name: 'About', url: '#about' },
  { name: 'Experience', url: '#jobs' },
  { name: 'Work', url: '#projects' },
  { name: 'Contact', url: '#contact' },
];

export function Nav() {
  const { scrollDirection, scrolledToTop } = useScrollDirection();

  return (
    <header
      className={`fixed top-0 z-50 w-full px-[25px] md:px-[50px] flex items-center justify-between backdrop-blur-[10px] transition-all duration-300 ease-custom ${
        scrolledToTop
          ? 'h-[var(--nav-height)] bg-transparent shadow-none'
          : scrollDirection === 'down'
            ? 'h-[var(--nav-scroll-height)] bg-[rgba(10,25,47,0.85)] shadow-[0_10px_30px_-10px_var(--navy-shadow)] -translate-y-full'
            : 'h-[var(--nav-scroll-height)] bg-[rgba(10,25,47,0.85)] shadow-[0_10px_30px_-10px_var(--navy-shadow)] translate-y-0'
      }`}
    >
      <nav className="flex items-center justify-between w-full max-w-[1600px] mx-auto">
        <a href="/" aria-label="home" className="text-[var(--green)]">
          <HexLogo size={42} />
        </a>

        <div className="flex items-center">
          <ol className="hidden md:flex items-center gap-[5px] list-none p-0 m-0" style={{ counterReset: 'item' }}>
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="font-mono text-[var(--fz-xs)] [counter-increment:item_1]"
              >
                <a
                  href={link.url}
                  className="p-[10px] text-[var(--lightest-slate)] hover:text-[var(--green)] transition-colors"
                >
                  <span className="text-[var(--green)] text-[var(--fz-xxs)] mr-[5px]">
                    {`0${navLinks.indexOf(link) + 1}.`}
                  </span>
                  {link.name}
                </a>
              </li>
            ))}
          </ol>
          <a
            href="/resume.pdf"
            className="outline-button ml-[15px] py-3 px-4 text-[var(--fz-xs)] hidden md:inline-block"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </div>

        <HamburgerMenu />
      </nav>
    </header>
  );
}
