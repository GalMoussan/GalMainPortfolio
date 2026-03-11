'use client';

import { useState, useEffect } from 'react';
import { IconHamburger, IconClose } from '@/components/ui/Icons';

const navLinks = [
  { name: 'About', url: '#about' },
  { name: 'Experience', url: '#jobs' },
  { name: 'Work', url: '#projects' },
  { name: 'Contact', url: '#contact' },
];

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="relative z-50 p-[15px] bg-transparent border-none text-[var(--green)] cursor-pointer"
        aria-label="Menu"
      >
        <IconHamburger size={24} />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[rgba(10,25,47,0.9)] z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 right-0 w-[min(75vw,400px)] bg-[var(--light-navy)] z-50 flex flex-col items-center justify-center transition-transform duration-300 ease-custom ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-[25px] right-[25px] p-[15px] bg-transparent border-none text-[var(--green)] cursor-pointer"
          aria-label="Close menu"
        >
          <IconClose size={24} />
        </button>

        <nav className="flex flex-col items-center gap-[30px]">
          <ol className="list-none p-0 m-0 flex flex-col items-center gap-[20px]" style={{ counterReset: 'item' }}>
            {navLinks.map((link, i) => (
              <li key={link.name} className="font-mono text-center">
                <a
                  href={link.url}
                  onClick={() => setIsOpen(false)}
                  className="block text-[var(--lightest-slate)] hover:text-[var(--green)] transition-colors text-[var(--fz-lg)] p-[10px]"
                >
                  <span className="block text-[var(--green)] text-[var(--fz-sm)] mb-[5px]">
                    {`0${i + 1}.`}
                  </span>
                  {link.name}
                </a>
              </li>
            ))}
          </ol>
          <a
            href="/resume.pdf"
            className="outline-button py-[18px] px-[50px] text-[var(--fz-sm)]"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </nav>
      </aside>
    </div>
  );
}
