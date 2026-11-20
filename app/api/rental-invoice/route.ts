import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import {
    RENTAL_CALENDAR_HOURS,
    ledgerAdd,
    ledgerHas,
    planRentalInvoice,
    scheduleNote,
    torontoDate,
    type RentalInvoicePlan,
} from '@/lib/rental-invoice';

/**
 * Rental auto-invoice, called by two GHL workflows (webhook action):
 *   - "Rental Auto Invoice: Online (7 days before)"  -> ?path=online
 *   - "Rental Auto Invoice: By hand (right away)"     -> ?path=hand
 * Body (custom data): { appointmentId, contactId }.
 *
 * The invoice is created and sent IN GHL through its API, the same as one made by hand.
 * This route only works out what goes on it (lib/rental-invoice.ts) and when it's due.
 *
 * Switch: env RENTAL_INVOICE_MODE = off | draft | send (default off).
 *   off   -> do nothing (kill switch; GHL keeps working as before)
 *   draft -> create the invoice as a GHL draft and text André to review + send it
 *   send  -> create and send it to the client by email + text
 *
 * Undo: set RENTAL_INVOICE_MODE=off in Vercel, or set both GHL workflows to Draft.
 * See docs/ghl-baseline/README.md.
 */

export const dynamic = 'force-dynamic';

const GHL = 'https://services.leadconnectorhq.com';
const LOCATION_ID = 'cDtp2a3Mcml7dTHdhndk';
const ANDRE_USER_ID = '4Y0acd57977BsswSio0T';
/** André's own contact (613 number): gets the review / failure texts. */
const ALERT_CONTACT_ID = 'wJCLuu5zR30XT3Ncx25K';
/** Contact field "Rental Invoices Sent" (appointment IDs already invoiced). */
const LEDGER_FIELD_ID = '1XRNhPKAYlS5bSXqfEWF';
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
        console.error('rental-invoice: alert text failed', err);
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

    const mode = (process.env.RENTAL_INVOICE_MODE ?? 'off') as Mode;
    if (mode === 'off') return NextResponse.json({ skipped: 'mode off' });

    const path = url.searchParams.get('path');
    if (path !== 'online' && path !== 'hand') return NextResponse.json({ error: 'path must be online or hand' }, { status: 400 });

    const body = await req.json().catch(() => ({}));
    const { appointmentId, contactId } = readIds(body, url);
    if (!appointmentId || !contactId) return NextResponse.json({ error: 'missing appointmentId/contactId' }, { status: 400 });

    let who = `appointment ${appointmentId}`;
    try {
        const { appointment: appt } = await ghl<{ appointment: any }>(`/calendars/events/appointments/${appointmentId}`, {
            version: '2021-04-15',
        });
        const hours = RENTAL_CALENDAR_HOURS[appt?.calendarId];
        if (!hours) return NextResponse.json({ skipped: 'not a rental calendar' });
        if (appt.contactId !== contactId) return NextResponse.json({ skipped: 'contact mismatch' });
        if (['cancelled', 'invalid', 'noshow'].includes(appt.appointmentStatus))
            return NextResponse.json({ skipped: `status ${appt.appointmentStatus}` });
        if (new Date(appt.startTime).getTime() < Date.now()) return NextResponse.json({ skipped: 'rental already started' });

        const { contact } = await ghl<{ contact: any }>(`/contacts/${contactId}`);
        const first = (contact.firstName || '').trim();
        const fullName = [contact.firstName, contact.lastName].filter(Boolean).join(' ').trim();
        who = `${fullName || 'a client'} (${hours}h rental)`;
        const ledger: string = (contact.customFields ?? []).find((f: any) => f.id === LEDGER_FIELD_ID)?.value ?? '';
        if (ledgerHas(ledger, appointmentId)) return NextResponse.json({ skipped: 'already invoiced' });

        const depositPaid = await depositPaidFor(contactId, appointmentId);
        if (path === 'hand' && depositPaid > 0)
            return NextResponse.json({ skipped: 'online booking (deposit paid); the online workflow invoices it' });
        if (path === 'online' && depositPaid === 0) {
            // Hand bookings also pass through the online workflow (it listens to every
            // confirmed rental so moves re-time it). The hand workflow invoices those.
            // Only a booking made on the online booking page without a deposit is odd.
            if (appt.createdBy?.source === 'booking_widget') {
                await textAndre(`Rental auto-invoice: ${who} booked online on ${torontoDate(new Date(appt.startTime))} but no deposit was found. Nothing was sent. Please check and invoice by hand.`);
            }
            return NextResponse.json({ skipped: 'online path, no deposit (hand booking or unpaid)' });
        }

        const today = torontoDate(new Date());
        const plan: RentalInvoicePlan = planRentalInvoice({ hours, startTime: appt.startTime, today, depositPaid });
        const dayLabel = plan.items[0].description.split(' rental')[0];
        const name = `${dayLabel} ${hours}h Rental – ${first || fullName || 'Client'}`;

        // Second guard against doubles: an invoice with the same name already exists for this contact.
        const existing = await ghl<{ invoices?: any[] }>(
            `/invoices/?altId=${LOCATION_ID}&altType=location&contactId=${contactId}&limit=100&offset=0`,
        );
        if ((existing.invoices ?? []).some((i) => i.name === name && i.status !== 'void'))
            return NextResponse.json({ skipped: `an invoice named "${name}" already exists` });

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
                termsNotes: scheduleNote(plan) ? `<p>${scheduleNote(plan)}</p>` : '',
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

        if (mode === 'send') {
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
        } else {
            await textAndre(`Rental invoice READY TO REVIEW (draft, not sent): ${name}, ${parts}. Open GHL > Payments > Invoices, check it and click Send.`);
        }

        return NextResponse.json({ ok: true, mode, invoiceId: created._id, invoiceNumber: created.invoiceNumber, name, kind: plan.kind, parts });
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('rental-invoice failed', who, msg);
        await textAndre(`Rental auto-invoice FAILED for ${who}. Nothing was sent; please invoice by hand. (${msg.slice(0, 120)})`);
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
