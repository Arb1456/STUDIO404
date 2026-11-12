import { sendGAEvent } from '@next/third-parties/google';
import { HOLIDAY_OFFERS, MINI_DAYS } from '@/lib/holiday';

type FbqWindow = Window & { fbq?: (...args: unknown[]) => void };

/** Fires GA4 begin_checkout + Meta InitiateCheckout for a holiday booking intent. */
function trackHolidayIntent(offer: 'mini' | 'full', cta: string) {
    const name = offer === 'mini' ? 'Holiday Mini Session' : 'Full Holiday Session';
    const { price } = HOLIDAY_OFFERS[offer];
    sendGAEvent('event', 'begin_checkout', {
        items: [{ item_name: name, price }],
        cta,
    });
    (window as FbqWindow).fbq?.('track', 'InitiateCheckout', {
        content_name: name,
        value: price,
        currency: 'CAD',
    });
}

export const trackMiniIntent = (cta: string) => trackHolidayIntent('mini', cta);
export const trackFullSessionIntent = (cta: string) => trackHolidayIntent('full', cta);

/** Smooth-scroll to the booking section on /holiday-session. */
export function scrollToFullSessionBooking(cta: string) {
    trackFullSessionIntent(cta);
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
