'use client';

import { useEffect, useState } from 'react';
import { ScrollDepthTracker } from '@/app/ai-integration/_components/ScrollDepthTracker';

const CONSENT_KEY = 'cookie-consent';

export function ConditionalScrollTracker() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    setHasConsent(consent === 'accepted');
  }, []);

  // Only render ScrollDepthTracker if user has given consent
  if (!hasConsent) {
    return null;
  }

  return <ScrollDepthTracker />;
}
