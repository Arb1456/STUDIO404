import { HOLIDAY_OFFERS, MINI_DAYS } from '@/lib/holiday';
import { trackBookingClick } from '@/lib/tracking';
import { openCalendarTab } from '@/lib/attribution';

/**
 * GA4 begin_checkout + Meta InitiateCheckout for a holiday calendar opening.
 * Call only right before the calendar opens: scroll buttons must not fire it (Nov 26).
 */
function trackHolidayIntent(offer: 'mini' | 'full', cta: string) {
    const name = offer === 'mini' ? 'Holiday Mini Session' : 'Full Holiday Session';
    trackBookingClick(name, HOLIDAY_OFFERS[offer].price, { cta });
}

export const trackMiniIntent = (cta: string) => trackHolidayIntent('mini', cta);
export const trackFullSessionIntent = (cta: string) => trackHolidayIntent('full', cta);

/** Smooth-scroll to the booking section on /holiday-session. No tracking: it only scrolls. */
export function scrollToFullSessionBooking() {
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export const miniDaysSoldOut = () => MINI_DAYS.every((d) => d.spotsLeft === 0);

/** Smooth-scroll to the dates + booking section on /holiday-minis. No tracking: it only scrolls. */
export function scrollToMiniBooking() {
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Open the GHL Holiday Mini calendar in a new tab (falls back to the booking section if sold out). */
export function openMiniCalendar(cta: string) {
    if (miniDaysSoldOut()) return scrollToMiniBooking();
    trackMiniIntent(cta);
    openCalendarTab(HOLIDAY_OFFERS.mini.calendarUrl);
}
