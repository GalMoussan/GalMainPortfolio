'use client';

import { useState, useEffect } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { Logo } from '@/components/layout/Logo';
import { openBookCall } from '../_lib/cta';

const navLinks = [
  { name: 'What I build', href: '#what-i-build' },
  { name: 'Training', href: '#training' },
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Pricing', href: '#what-i-build' }, // Same as services section
  { name: 'FAQ', href: '#faq' },
];

export function AINav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollDirection } = useScrollDirection();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollDirection === 'down' && !isOpen ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{
        backgroundColor: scrolled || isOpen ? 'rgba(10, 25, 47, 0.95)' : 'rgba(10, 25, 47, 0.3)',
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(5px)',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.7)' : 'none',
      }}
    >
      <nav className="max-w-[1600px] mx-auto px-[25px] sm:px-[50px] lg:px-[100px] h-[var(--nav-height)] flex items-center justify-between">
        {/* Logo - links back to portfolio homepage */}
        <Logo />

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[var(--light-slate)] hover:text-[var(--green)] transition-colors font-mono text-sm inline-flex items-center px-2"
              style={{ minHeight: '44px' }}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA button */}
        <button
          onClick={() => openBookCall('nav')}
          className="hidden md:block outline-button py-3 px-5"
        >
          Book free call
        </button>

        {/* Mobile menu button: a solid pill like the home page nav, visible over any section */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(215,227,238,0.38)] bg-[rgba(12,16,22,0.86)] text-[var(--lightest-slate)] shadow-[0_0_0_1px_rgba(94,231,255,0.12),0_10px_30px_rgba(6,8,12,0.35)]"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>
    </header>

    {/* Mobile menu. Rendered outside the header: the header's transform and backdrop-filter would
        make it the containing block for this fixed panel, collapsing it to the header's height. */}
    {isOpen && (
      <div className="md:hidden fixed inset-x-0 bottom-0 top-[var(--nav-height)] z-40 overflow-y-auto bg-[rgba(10,14,20,0.97)]">
        <div className="flex flex-col items-stretch gap-2 px-6 py-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 font-mono text-lg text-[var(--lightest-slate)] transition-colors hover:text-[var(--green)]"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              openBookCall('nav');
              setIsOpen(false);
            }}
            className="mt-4 rounded-full bg-[var(--green)] px-6 py-4 font-mono text-base font-semibold text-[var(--navy)]"
          >
            Book free call
          </button>
        </div>
      </div>
    )}
    </>
  );
}
