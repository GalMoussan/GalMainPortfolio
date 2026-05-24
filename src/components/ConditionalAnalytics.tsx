'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

const CONSENT_KEY = 'cookie-consent';

export function ConditionalAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    setHasConsent(consent === 'accepted');
  }, []);

  // Only render Analytics if user has given consent AND in Vercel environment
  if (!hasConsent || !process.env.NEXT_PUBLIC_VERCEL_ENV) {
    return null;
  }

  return <Analytics />;
}
