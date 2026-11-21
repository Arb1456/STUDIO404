/**
 * Meta Conversions API Purchase for every GHL booking: pure rules (no network).
 * Used by app/api/meta-purchase/route.ts; tested by tests/meta-purchase.test.mjs.
 *
 * Rules (André, 2026-11-20):
 * - One Purchase per booking (minis, Full Holiday, photo sessions, rentals), sent to the
 *   website pixel 404 PIXEL 1 (1480030709764047), the pixel every ad optimizes on.
 * - Value = full price of what was booked (not the deposit), CAD, before HST.
 * - Event ID = GHL appointment ID so Meta drops a repeat of the same booking.
 * - Customer details are SHA-256 hashed per Meta's rules; IP / user agent / fbclid
 *   come from GHL's attribution on the contact and are only sent for online bookings.
 */
import { createHash } from 'node:crypto';
import { RENTAL_BASE_PRICE, RENTAL_CALENDAR_HOURS } from './rental-invoice.ts';
import { SESSION_CALENDARS } from './session-invoice.ts';

export interface PurchaseInfo {
    value: number;
    contentName: string;
    category: 'holiday' | 'photo session' | 'rental';
}

export function purchaseFor(calendarId: string | undefined | null): PurchaseInfo | null {
    if (!calendarId) return null;
    const hours = RENTAL_CALENDAR_HOURS[calendarId];
    if (hours) return { value: RENTAL_BASE_PRICE[hours], contentName: `${hours}h Studio Rental`, category: 'rental' };
    const s = SESSION_CALENDARS[calendarId];
    if (s) return { value: s.price, contentName: s.name, category: s.kind === 'photo' ? 'photo session' : 'holiday' };
    return null;
}

const sha = (s: string) => createHash('sha256').update(s).digest('hex');
const clean = (s: unknown) => (typeof s === 'string' ? s.trim().toLowerCase() : '');

/** Digits only, with the North American country code. */
export function normalizePhone(phone: unknown): string | null {
    const d = typeof phone === 'string' ? phone.replace(/\D/g, '') : '';
    if (!d) return null;
    return d.length === 10 ? `1${d}` : d;
}

export interface PurchaseContact {
    id: string;
    email?: string | null;
    phone?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    fbclid?: string | null;
}

export function buildPurchaseEvent(input: {
    appointmentId: string;
    calendarId: string;
    /** When the booking was made (ISO). */
    bookedAt: string;
    /** Booked by the client on the online booking page (vs. by André by hand). */
    online: boolean;
    contact: PurchaseContact;
}) {
    const info = purchaseFor(input.calendarId);
    if (!info) throw new Error(`No price for calendar ${input.calendarId}`);
    const { contact: c, online } = input;
    const eventTime = Math.floor(Date.parse(input.bookedAt) / 1000);

    const user: Record<string, unknown> = {};
    const em = clean(c.email);
    if (em) user.em = [sha(em)];
    const ph = normalizePhone(c.phone);
    if (ph) user.ph = [sha(ph)];
    const fn = clean(c.firstName);
    if (fn) user.fn = [sha(fn)];
    const ln = clean(c.lastName);
    if (ln) user.ln = [sha(ln)];
    user.external_id = [sha(c.id)];
    if (online) {
        if (c.ip) user.client_ip_address = c.ip;
        if (c.userAgent) user.client_user_agent = c.userAgent;
        if (c.fbclid) user.fbc = `fb.1.${eventTime * 1000}.${c.fbclid}`;
    }

    return {
        event_name: 'Purchase',
        event_time: eventTime,
        event_id: input.appointmentId,
        action_source: online ? 'website' : 'system_generated',
        user_data: user,
        custom_data: {
            currency: 'CAD',
            value: info.value,
            content_name: info.contentName,
            content_category: info.category,
            order_id: input.appointmentId,
        },
    };
}

/** Comma-separated appointment IDs already sent (contact field "Meta Purchases Sent"). */
export function ledgerHas(ledger: string, id: string): boolean {
    return ledger.split(',').map((s) => s.trim()).includes(id);
}
