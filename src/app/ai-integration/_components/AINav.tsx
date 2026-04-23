'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { HexLogo } from '@/components/layout/HexLogo';

const navLinks = [
  { name: 'What I build', href: '#what-i-build' },
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

  const handleCTAClick = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972500000000'; // TODO: @gal - provide real WhatsApp number
    const message = encodeURIComponent("Hi Gal, I'd like to book a free 30-min AI diagnostic for my business.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{
        backgroundColor: scrolled ? 'rgba(10, 25, 47, 0.95)' : 'rgba(10, 25, 47, 0.3)',
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(5px)',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.7)' : 'none',
      }}
    >
      <nav className="max-w-[1600px] mx-auto px-[25px] sm:px-[50px] lg:px-[100px] h-[var(--nav-height)] flex items-center justify-between">
        {/* Logo - links back to portfolio homepage */}
        <Link href="/" aria-label="Back to homepage">
          <HexLogo />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[var(--light-slate)] hover:text-[var(--green)] transition-colors font-mono text-sm"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA button */}
        <button
          onClick={handleCTAClick}
          className="hidden md:block outline-button py-3 px-5"
        >
          Book free call
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-[var(--green)]"
          aria-label="Toggle menu"
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[var(--nav-height)] bg-[var(--light-navy)] z-40">
          <div className="flex flex-col items-center py-12 gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[var(--lightest-slate)] hover:text-[var(--green)] transition-colors font-mono text-lg"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                handleCTAClick();
                setIsOpen(false);
              }}
              className="outline-button py-4 px-6 text-base mt-4"
            >
              Book free call
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
