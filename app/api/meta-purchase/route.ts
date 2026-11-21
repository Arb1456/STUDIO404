import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { buildPurchaseEvent, ledgerHas, purchaseFor } from '@/lib/meta-purchase';

/**
 * Meta Conversions API Purchase for every booking. Called by the GHL workflow
 * "Meta CAPI: Booking Purchase" (Customer Booked Appointment, all booking calendars).
 *
 * Auth: ?key= must equal RENTAL_INVOICE_SECRET (one shared webhook secret).
 * Switch: META_CAPI_MODE = off (default) | test (sends with META_CAPI_TEST_CODE, shows
 * only in Events Manager > Test events) | live.
 * Token: META_CAPI_ACCESS_TOKEN, generated from 404 PIXEL 1 > Settings > Conversions API.
 * Repeats: the contact field "Meta Purchases Sent" lists appointment IDs already sent,
 * so moving a booking (which re-fires GHL's booked trigger) never sends a second Purchase.
 */
export const runtime = 'nodejs';

const GHL = 'https://services.leadconnectorhq.com';
const PIXEL_ID = '1480030709764047'; // 404 PIXEL 1, the website pixel every ad uses
const LEDGER_FIELD_ID = 'UHNLd0ySW2lvwKvsR4TV';
const GRAPH = 'https://graph.facebook.com/v21.0';

type Mode = 'off' | 'test' | 'live';

async function ghl<T = any>(path: string, init: RequestInit & { version?: string } = {}): Promise<T> {
    const res = await fetch(`${GHL}${path}`, {
        ...init,
        headers: {
            Authorization: `Bearer ${process.env.GHL_PRIVATE_TOKEN}`,
            Version: init.version ?? '2021-07-28',
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`GHL ${init.method ?? 'GET'} ${path.split('?')[0]} -> ${res.status} ${text.slice(0, 200)}`);
    return (text ? JSON.parse(text) : {}) as T;
}

function secretOk(given: string | null): boolean {
    const want = process.env.RENTAL_INVOICE_SECRET;
    if (!want || !given) return false;
    const a = Buffer.from(given);
    const b = Buffer.from(want);
    return a.length === b.length && timingSafeEqual(a, b);
}

function readIds(body: any, url: URL) {
    const cd = body?.customData ?? body?.custom_data ?? {};
    return {
        appointmentId: cd.appointmentId || body?.appointmentId || body?.calendar?.appointmentId || url.searchParams.get('appointmentId'),
        contactId: cd.contactId || body?.contactId || body?.contact_id || url.searchParams.get('contactId'),
    };
}

export async function POST(req: Request) {
    const url = new URL(req.url);
    if (!secretOk(url.searchParams.get('key'))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

    const mode = (process.env.META_CAPI_MODE ?? 'off') as Mode;
    if (mode !== 'test' && mode !== 'live') return NextResponse.json({ skipped: 'mode off' });
    const token = process.env.META_CAPI_ACCESS_TOKEN;
    if (!token) return NextResponse.json({ error: 'META_CAPI_ACCESS_TOKEN not set' }, { status: 500 });
    const testCode = process.env.META_CAPI_TEST_CODE;
    if (mode === 'test' && !testCode) return NextResponse.json({ error: 'test mode needs META_CAPI_TEST_CODE' }, { status: 500 });

    const body = await req.json().catch(() => ({}));
    const { appointmentId, contactId } = readIds(body, url);
    if (!appointmentId || !contactId) return NextResponse.json({ error: 'missing appointmentId/contactId' }, { status: 400 });

    try {
        const { appointment: appt } = await ghl<{ appointment: any }>(`/calendars/events/appointments/${appointmentId}`, {
            version: '2021-04-15',
        });
        if (!purchaseFor(appt?.calendarId)) return NextResponse.json({ skipped: 'not a booking calendar' });
        if (appt.contactId !== contactId) return NextResponse.json({ skipped: 'contact mismatch' });
        if (['cancelled', 'invalid', 'noshow'].includes(appt.appointmentStatus))
            return NextResponse.json({ skipped: `status ${appt.appointmentStatus}` });

        const { contact } = await ghl<{ contact: any }>(`/contacts/${contactId}`);
        const ledger: string = (contact.customFields ?? []).find((f: any) => f.id === LEDGER_FIELD_ID)?.value ?? '';
        if (mode === 'live' && ledgerHas(ledger, appointmentId)) return NextResponse.json({ skipped: 'already sent' });

        const attr = contact.attributionSource ?? {};
        const online = appt.createdBy?.source === 'booking_widget';
        // Meta only accepts events up to 7 days old; a move re-fires the trigger, so send "now" if older.
        const added = Date.parse(appt.dateAdded ?? '') || Date.now();
        const bookedAt = new Date(Math.max(added, Date.now() - 6 * 86400_000)).toISOString();
        const event = buildPurchaseEvent({
            appointmentId,
            calendarId: appt.calendarId,
            bookedAt,
            online,
            contact: {
                id: contactId,
                email: contact.email,
                phone: contact.phone,
                firstName: contact.firstName,
                lastName: contact.lastName,
                ip: attr.ip,
                userAgent: attr.userAgent,
                fbclid: attr.fbclid,
            },
        });

        const res = await fetch(`${GRAPH}/${PIXEL_ID}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ data: [event], ...(mode === 'test' ? { test_event_code: testCode } : {}) }),
            cache: 'no-store',
        });
        const result = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(`Meta ${res.status} ${JSON.stringify(result).slice(0, 300)}`);

        if (mode === 'live') {
            await ghl(`/contacts/${contactId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    customFields: [{ id: LEDGER_FIELD_ID, field_value: ledger ? `${ledger},${appointmentId}` : appointmentId }],
                }),
            });
        }
        return NextResponse.json({ sent: true, mode, value: event.custom_data.value, content: event.custom_data.content_name, meta: result });
    } catch (err) {
        console.error('meta-purchase failed', err);
        return NextResponse.json({ error: String(err).slice(0, 400) }, { status: 500 });
    }
}
