/**
 * GHL booking calendar links.
 *
 * book.thestudio404.ca is the GHL Branded Domain (Cloudflare CNAME
 * book -> brand.ludicrous.cloud, DNS only; connected in GHL Business Profile
 * Nov 26, 2026). It serves the same widget as api.leadconnectorhq.com, so if
 * the branded domain ever breaks, point BOOKING_HOST back there.
 *
 * Open these with openCalendar() (lib/attribution) after trackBookingClick(),
 * never window.open or an iframe.
 */
export const BOOKING_HOST = 'https://book.thestudio404.ca';

export function bookingUrl(slug: string): string {
    return `${BOOKING_HOST}/widget/bookings/${slug}`;
}
