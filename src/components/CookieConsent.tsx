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
      className="fixed bottom-0 left-0 right-0 bg-[var(--lightest-navy)] border-t-2 border-[var(--green)] p-[20px] md:p-[30px] z-40"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-[20px]">
        <div className="flex-1">
          <p className="text-[var(--lightest-slate)] text-[var(--fz-md)] leading-[1.5] mb-[10px]">
            <strong>This site uses cookies</strong>
          </p>
          <p className="text-[var(--slate)] text-[var(--fz-sm)] leading-[1.5]">
            We use essential cookies for site functionality and privacy-friendly analytics (Vercel
            Analytics) to understand how visitors use the site. Analytics only load if you accept. See
            our{' '}
            <Link href="/cookie-policy" className="text-[var(--green)] hover:underline">
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-[var(--green)] hover:underline">
              Privacy Policy
            </Link>{' '}
            for details.
          </p>
        </div>

        <div className="flex gap-[12px]">
          <button
            onClick={handleDecline}
            className="px-[24px] py-[12px] border border-[var(--green)] text-[var(--green)] font-mono text-[var(--fz-sm)] hover:bg-[var(--green-tint)] transition-colors duration-200 whitespace-nowrap"
            aria-label="Decline cookies"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-[24px] py-[12px] bg-[var(--green)] text-[var(--navy)] font-mono text-[var(--fz-sm)] hover:bg-[var(--blue)] transition-colors duration-200 whitespace-nowrap font-semibold"
            aria-label="Accept cookies"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
