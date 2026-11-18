import { sendGAEvent } from '@next/third-parties/google';

/**
 * Site-wide browser tracking for GA4 + Meta Pixel.
 *
 * Division of labour (see Meta CAPI decision, Nov 2026):
 *  - Website pixel: PageView, ViewContent, InitiateCheckout, Lead.
 *  - GHL (server-side CAPI): Purchase. Never fire a browser Purchase,
 *    bookings and deposits happen in GHL and would count twice.
 * Holiday booking buttons use lib/holiday-tracking.ts (same events, holiday item names).
 */

type TrackingWindow = Window & { fbq?: (...args: unknown[]) => void; dataLayer?: unknown[] };

/**
 * Both tags load with strategy="afterInteractive", so on a direct landing a page's
 * first effect can run before they exist and the event would be silently dropped.
 * Wait up to ~6 s for the tag, then give up quietly (ad blockers, no pixel ID).
 */
function whenReady(isReady: (w: TrackingWindow) => boolean, run: () => void, tries = 30) {
    if (typeof window === 'undefined') return;
    if (isReady(window as TrackingWindow)) return run();
    if (tries <= 0) return;
    setTimeout(() => whenReady(isReady, run, tries - 1), 200);
}

const fbq = (...args: unknown[]) =>
    whenReady((w) => typeof w.fbq === 'function', () => (window as TrackingWindow).fbq!(...args));

const ga = (event: string, params: Record<string, unknown>) =>
    whenReady((w) => Array.isArray(w.dataLayer), () => sendGAEvent('event', event, params));

/**
 * One ID per form submission. Sent to Meta as eventID AND to GHL (via /api/contact),
 * so a future server-side CAPI Lead from GHL can reuse it and Meta de-duplicates.
 */
export function newEventId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Fire after a contact/inquiry/waitlist form is accepted by /api/contact. */
export function trackLead(source: string, eventId: string) {
    ga('generate_lead', { lead_source: source });
    fbq('track', 'Lead', { content_name: source }, { eventID: eventId });
}

/**
 * Fire when a visitor clicks through to a GHL booking calendar.
 * Pass sendGA: false where the caller already sends its own GA4 checkout event.
 */
export function trackBookingClick(name: string, value: number, { sendGA = true }: { sendGA?: boolean } = {}) {
    if (sendGA) ga('begin_checkout', { currency: 'CAD', value, items: [{ item_name: name, price: value }] });
    fbq('track', 'InitiateCheckout', { content_name: name, value, currency: 'CAD' });
}

/** Fire once when a service page is viewed. */
export function trackViewContent(name: string, category: string) {
    ga('view_item', { items: [{ item_name: name, item_category: category }] });
    fbq('track', 'ViewContent', { content_name: name, content_category: category });
}
