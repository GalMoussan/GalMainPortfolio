'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'cookie-consent';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setShowBanner(false);
    // Reload to load analytics
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      // Compact card in the site's style: under the header on phones (the hero copy and nav
      // capsule own the bottom), bottom-right on larger screens (hero copy is bottom-left).
      className="fixed inset-x-3 top-[76px] z-40 rounded-[18px] border border-white/10 bg-[rgba(36,38,51,0.94)] p-4 shadow-[0_18px_50px_rgba(12,13,18,0.45)] md:inset-x-auto md:bottom-6 md:right-[100px] md:top-auto md:w-[340px]"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <p className="m-0 text-[13px] leading-[1.55] text-[var(--linen-dim)]">
        This site uses cookies. Privacy-friendly analytics (Vercel Analytics) load only if you accept.{' '}
        <Link href="/cookie-policy" className="prose-link">
          Cookie Policy
        </Link>{' '}
        ·{' '}
        <Link href="/privacy-policy" className="prose-link">
          Privacy Policy
        </Link>
      </p>

      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={handleDecline}
          className="rounded-full border border-[rgba(243,236,225,0.3)] px-4 py-1.5 font-sans text-[12px] font-medium text-[var(--linen-dim)] transition-colors duration-200 hover:border-[rgba(243,236,225,0.6)] hover:text-[var(--linen)]"
          aria-label="Decline cookies"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="rounded-full bg-[var(--amber)] px-4 py-1.5 font-sans text-[12px] font-semibold text-[#1c1b20] transition-shadow duration-300 hover:shadow-[0_0_0_4px_var(--amber-tint)]"
          aria-label="Accept cookies"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
