import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import {
    SESSION_CALENDARS,
    ledgerAdd,
    ledgerHas,
    parseExtras,
    planSessionInvoice,
    sessionNote,
    torontoDate,
} from '@/lib/session-invoice';

/**
 * Session auto-invoice (Holiday Mini, Full Holiday Session, the 10 photo sessions),
 * called by the GHL workflow "Session Auto Invoice (7 days before)" (webhook action).
 * Body (custom data): { appointmentId, contactId }.
 *
 * Built next to the rental auto-invoice (app/api/rental-invoice) without touching it.
 * The invoice is created IN GHL through its API; lib/session-invoice.ts decides what's on it.
 *
 * Switch: env SESSION_INVOICE_MODE = off | draft | send (default off).
 *   off   -> do nothing
 *   draft -> create a GHL draft and text André to review + send it
 *   send  -> create and send it (photo sessions are ALWAYS drafts: the price is set after consultation)
 * Auth: ?key= must equal RENTAL_INVOICE_SECRET (one shared webhook secret).
 *
 * Undo: SESSION_INVOICE_MODE=off in Vercel, or set the GHL workflow to Draft.
 * See docs/ghl-baseline/README.md.
 */

export const dynamic = 'force-dynamic';

const GHL = 'https://services.leadconnectorhq.com';
const LOCATION_ID = 'cDtp2a3Mcml7dTHdhndk';
const ANDRE_USER_ID = '4Y0acd57977BsswSio0T';
const ALERT_CONTACT_ID = 'wJCLuu5zR30XT3Ncx25K';
/** Contact field "Session Invoices Sent". */
const LEDGER_FIELD_ID = 'boUbHwR8gTnBoUe1t1Qe';
/** Booking-form answers stored on the contact. */
const FORM_FIELDS: Record<string, 'people' | 'pet' | 'petOld' | 'addons'> = {
    diRt7iG4C3bqFRd21VKv: 'people', // How many people will be in the photos?
    '53fz0Jt5VX6lwM3zqlHt': 'pet', // Pet Coming? (radio, current)
    b2BCedUgFCqxbhmpYiA9: 'petOld', // Bringing a Pet? (checkbox, older bookings)
    '0VQtPeEuZX2SmZSlPZBQ': 'addons', // Mini Add-Ons
};
const BUSINESS_DETAILS = {
    name: 'Studio 404',
    phoneNo: '+13433144140',
    website: 'thestudio404.ca',
    logoUrl: 'https://msgsndr-private.storage.googleapis.com/locationPhotos/c159e87b-5bf5-4dee-b330-7126b4a6921c.jpg',
    address: {
        addressLine1: '2285 Saint Laurent Blvd',
        city: 'Ottawa',
        state: 'Ontario',
        countryCode: 'CA',
        postalCode: 'K1G 4Z7',
    },
};

type Mode = 'off' | 'draft' | 'send';

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

async function textAndre(message: string) {
    try {
        await ghl('/conversations/messages', {
            method: 'POST',
            version: '2021-04-15',
            body: JSON.stringify({ type: 'SMS', contactId: ALERT_CONTACT_ID, message }),
        });
    } catch (err) {
        console.error('session-invoice: alert text failed', err);
    }
}

function secretOk(given: string | null): boolean {
    const want = process.env.RENTAL_INVOICE_SECRET;
    if (!want || !given) return false;
    const a = Buffer.from(given);
    const b = Buffer.from(want);
    return a.length === b.length && timingSafeEqual(a, b);
}

/** Deposit actually paid online for this appointment (0 if booked by hand). */
async function depositPaidFor(contactId: string, appointmentId: string): Promise<number> {
    const orders = await ghl<{ data?: any[] }>(
        `/payments/orders?altId=${LOCATION_ID}&altType=location&locationId=${LOCATION_ID}&contactId=${contactId}&limit=100`,
    );
    let order = (orders.data ?? []).find((o) => o?.source?.appointmentId === appointmentId);
    if (!order) {
        // The order list can leave out `source` (seen 2026-11-19); read each order in full.
        for (const o of orders.data ?? []) {
            if (o?.source?.appointmentId || !o?._id) continue;
            const full = await ghl<any>(`/payments/orders/${o._id}?altId=${LOCATION_ID}&altType=location&locationId=${LOCATION_ID}`);
            if (full?.source?.appointmentId === appointmentId) {
                order = full;
                break;
            }
        }
    }
    if (!order) return 0;
    const tx = await ghl<{ data?: any[] }>(
        `/payments/transactions?altId=${LOCATION_ID}&altType=location&contactId=${contactId}&limit=100`,
    );
    return (tx.data ?? [])
        .filter((t) => t.entityId === order._id && t.status === 'succeeded')
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);
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

    const mode = (process.env.SESSION_INVOICE_MODE ?? 'off') as Mode;
    if (mode === 'off') return NextResponse.json({ skipped: 'mode off' });

    const body = await req.json().catch(() => ({}));
    const { appointmentId, contactId } = readIds(body, url);
    if (!appointmentId || !contactId) return NextResponse.json({ error: 'missing appointmentId/contactId' }, { status: 400 });

    let who = `appointment ${appointmentId}`;
    try {
        const { appointment: appt } = await ghl<{ appointment: any }>(`/calendars/events/appointments/${appointmentId}`, {
            version: '2021-04-15',
        });
        const offer = SESSION_CALENDARS[appt?.calendarId];
        if (!offer) return NextResponse.json({ skipped: 'not a session calendar' });
        if (appt.contactId !== contactId) return NextResponse.json({ skipped: 'contact mismatch' });
        if (['cancelled', 'invalid', 'noshow'].includes(appt.appointmentStatus))
            return NextResponse.json({ skipped: `status ${appt.appointmentStatus}` });
        if (new Date(appt.startTime).getTime() < Date.now()) return NextResponse.json({ skipped: 'session already started' });

        const { contact } = await ghl<{ contact: any }>(`/contacts/${contactId}`);
        const first = (contact.firstName || '').trim();
        const fullName = [contact.firstName, contact.lastName].filter(Boolean).join(' ').trim();
        who = `${fullName || 'a client'} (${offer.name})`;
        const fields: Record<string, unknown> = {};
        let ledger = '';
        for (const f of contact.customFields ?? []) {
            if (f.id === LEDGER_FIELD_ID) ledger = String(f.value ?? '');
            else if (FORM_FIELDS[f.id]) fields[FORM_FIELDS[f.id]] = f.value;
        }
        if (ledgerHas(ledger, appointmentId)) return NextResponse.json({ skipped: 'already invoiced' });

        const extras = parseExtras(fields);
        const depositPaid = await depositPaidFor(contactId, appointmentId);
        const today = torontoDate(new Date());
        const plan = planSessionInvoice({ offer, extras, startTime: appt.startTime, today, depositPaid });
        const name = `${plan.dayLabel} ${offer.name} – ${first || fullName || 'Client'}`;

        // Second guard against doubles: an invoice with the same name already exists for this
        // contact (also matches the holiday invoices made by hand, e.g. "Dec 6 Holiday Mini – Rose").
        const existing = await ghl<{ invoices?: any[] }>(
            `/invoices/?altId=${LOCATION_ID}&altType=location&contactId=${contactId}&limit=100&offset=0`,
        );
        if ((existing.invoices ?? []).some((i) => i.name === name && i.status !== 'void'))
            return NextResponse.json({ skipped: `an invoice named "${name}" already exists` });

        const note = sessionNote(plan);
        const created = await ghl<any>('/invoices/', {
            method: 'POST',
            body: JSON.stringify({
                altId: LOCATION_ID,
                altType: 'location',
                name,
                title: 'INVOICE',
                currency: 'CAD',
                businessDetails: BUSINESS_DETAILS,
                items: plan.items.map((i) => ({ ...i, description: i.description ? `<p>${i.description}</p>` : '', currency: 'CAD', qty: 1, taxes: [], type: 'one_time' })),
                discount: { value: 0, type: 'percentage' },
                contactDetails: { id: contactId, name: fullName, email: contact.email, phoneNo: contact.phone },
                issueDate: today,
                dueDate: plan.dueDate,
                sentTo: { email: contact.email ? [contact.email] : [], phoneNo: contact.phone ? [contact.phone] : [] },
                liveMode: true,
                termsNotes: note ? `<p>${note}</p>` : '',
                ...(plan.schedule ? { paymentSchedule: { type: 'fixed', schedules: plan.schedule } } : {}),
            }),
        });

        // Record it before sending, so a retry can never create a second invoice.
        await ghl(`/contacts/${contactId}`, {
            method: 'PUT',
            body: JSON.stringify({ customFields: [{ id: LEDGER_FIELD_ID, field_value: ledgerAdd(ledger, appointmentId) }] }),
        });

        const parts = plan.schedule
            ? plan.schedule.map((s) => `$${s.value.toFixed(2)} due ${s.dueDate}`).join(', then ')
            : `$${plan.total.toFixed(2)} due ${plan.dueDate}`;
        const sendNow = mode === 'send' && !offer.draftOnly;

        if (sendNow) {
            await ghl(`/invoices/${created._id}/send`, {
                method: 'POST',
                body: JSON.stringify({
                    altId: LOCATION_ID,
                    altType: 'location',
                    userId: ANDRE_USER_ID,
                    action: 'sms_and_email',
                    liveMode: true,
                    sentFrom: { fromName: 'Andre Beaudin', fromEmail: 'andre@thestudio404.ca' },
                }),
            });
        } else if (offer.draftOnly) {
            await textAndre(`PHOTO SESSION invoice drafted at the STARTING price (not sent): ${name}, ${parts}. Adjust to the agreed price in GHL > Payments > Invoices, then click Send.`);
        } else {
            const group = offer.includedPeople && extras.people == null ? ' Group size was not answered on the form; check it.' : '';
            await textAndre(`Session invoice READY TO REVIEW (draft, not sent): ${name}, ${parts}.${group} Open GHL > Payments > Invoices, check it and click Send.`);
        }

        return NextResponse.json({ ok: true, mode, sent: sendNow, invoiceId: created._id, invoiceNumber: created.invoiceNumber, name, kind: plan.kind, parts });
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('session-invoice failed', who, msg);
        await textAndre(`Session auto-invoice FAILED for ${who}. Nothing was sent; please invoice by hand. (${msg.slice(0, 120)})`);
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
