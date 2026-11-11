import { sendGAEvent } from '@next/third-parties/google';
import { HOLIDAY_OFFERS, MINI_DAYS } from '@/lib/holiday';

type FbqWindow = Window & { fbq?: (...args: unknown[]) => void };

/** Fires GA4 begin_checkout + Meta InitiateCheckout for a Holiday Mini booking intent. */
export function trackMiniIntent(cta: string) {
    const { price } = HOLIDAY_OFFERS.mini;
    sendGAEvent('event', 'begin_checkout', {
        items: [{ item_name: 'Holiday Mini Session', price }],
        cta,
    });
    (window as FbqWindow).fbq?.('track', 'InitiateCheckout', {
        content_name: 'Holiday Mini Session',
        value: price,
        currency: 'CAD',
    });
}

export const miniDaysSoldOut = () => MINI_DAYS.every((d) => d.spotsLeft === 0);

/** Smooth-scroll to the dates + booking section on /holiday-minis. */
export function scrollToMiniBooking(cta: string) {
    trackMiniIntent(cta);
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Open the GHL Holiday Mini calendar in a new tab (falls back to the booking section if sold out). */
export function openMiniCalendar(cta: string) {
    if (miniDaysSoldOut()) return scrollToMiniBooking(`${cta}-waitlist`);
    trackMiniIntent(cta);
    window.open(HOLIDAY_OFFERS.mini.calendarUrl, '_blank', 'noopener,noreferrer');
}
