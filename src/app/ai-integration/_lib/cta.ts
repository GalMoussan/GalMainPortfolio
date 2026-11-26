import { track } from '@vercel/analytics';

/** International format without the `+`, as used by https://wa.me/<number>. */
export const WHATSAPP_NUMBER = '972558859702';

export const WHATSAPP_MESSAGES = {
  bookCall: "Hi Gal, I'd like to book a free 30-min call about my business.",
  training: "Hi Gal, I'd like to hear about coding-agent training for my team.",
  development: "Hi Gal, I have a development project I'd like a quote for.",
} as const;

export function openWhatsApp(message: string, source: string) {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  track('cta_click', { source, method: 'whatsapp' });
}

/** "Book free call" CTAs: Cal.com when NEXT_PUBLIC_CAL_LINK is set, WhatsApp otherwise. */
export function openBookCall(source: string) {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;
  if (calLink) {
    window.open(calLink, '_blank');
    track('cta_click', { source, method: 'cal.com' });
    return;
  }
  openWhatsApp(WHATSAPP_MESSAGES.bookCall, source);
}
