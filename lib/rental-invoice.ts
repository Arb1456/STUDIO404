/**
 * Rental auto-invoice: pure pricing and due-date rules (no network, no imports).
 * Used by app/api/rental-invoice/route.ts; tested by tests/rental-invoice.test.mjs.
 *
 * Rules (André, 2026-11-18):
 * - Online booking: client paid a 30% deposit. Invoice = remainder + HST (13% of the
 *   full base), due 3 days before the rental.
 * - Booked by hand (no deposit): one invoice right away, split into the 30% deposit
 *   due today and the remainder + HST due 3 days before. Under 3 days away: one
 *   payment due today.
 */

/** GHL "Studio Rental - N Hour" calendar id -> hours. */
export const RENTAL_CALENDAR_HOURS: Record<string, number> = {
    '3abPFtm86r4XNJBQ7IDU': 1,
    '0vdWae4y3Zgd6mKS6aTG': 2,
    VC0lwVNVE6j2aD1WSVyd: 3,
    qKI04XfXWVqM0bXCDBsp: 4,
    KsTEqQWVdmhEraqFD2SL: 5,
    Iki58Nn230JKZoT9sP7G: 6,
    pWJZvp02gbH77jGM5agK: 7,
    ltPHoFWeeJkh0ehNSNZL: 8,
    ci9PthBBWYKs3dQXRDrU: 9,
    NnLJQCqdQeBb9sJSzK1u: 10,
};

/** Base price (before HST) by hours, matching the GHL calendars and invoice templates. */
export const RENTAL_BASE_PRICE: Record<number, number> = {
    1: 70, 2: 120, 3: 180, 4: 225, 5: 270, 6: 315, 7: 360, 8: 400, 9: 430, 10: 450,
};

export const DEPOSIT_RATE = 0.3;
/** Cleaning fee when a pet comes to a rental (policies page, André 2026-11-20). */
export const PET_FEE = 25;
/** Standard group (policies §03: up to 8 people, talent + crew). Each extra person is GROUP_EXTRA_FEE (André 2026-11-24). */
export const GROUP_INCLUDED = 8;
export const GROUP_EXTRA_FEE = 10;
/** A head count above this can't be real (e.g. a phone number typed in): ignored and flagged. */
export const RENTAL_MAX_PEOPLE = 40;

/** "Number of Attendees" answer -> head count, or null if blank or impossible. */
export function parseAttendees(v: unknown): { people: number | null; rejected?: string } {
    const n = v === '' || v == null ? NaN : Number(v);
    if (!Number.isFinite(n) || n <= 0) return { people: null };
    if (n > RENTAL_MAX_PEOPLE) return { people: null, rejected: String(v) };
    return { people: Math.round(n) };
}
export const HST_RATE = 0.13;
/** Remainder is due this many days before the rental. */
export const DUE_DAYS_BEFORE = 3;

const TZ = 'America/Toronto';

const round2 = (n: number) => Math.round(n * 100) / 100;

/** 'YYYY-MM-DD' of an instant, in Toronto. */
export function torontoDate(d: Date): string {
    return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}

/** Calendar-date arithmetic on 'YYYY-MM-DD' (no time zone involved). */
function addDays(ymd: string, days: number): string {
    const [y, m, d] = ymd.split('-').map(Number);
    const t = new Date(Date.UTC(y, m - 1, d + days));
    return t.toISOString().slice(0, 10);
}

/** Rental date minus 3 days; if that has already passed (or is today), today. */
export function remainderDueDate(startTime: string, today: string): string {
    const rentalDay = torontoDate(new Date(startTime));
    const due = addDays(rentalDay, -DUE_DAYS_BEFORE);
    return due > today ? due : today;
}

export interface InvoiceItem {
    name: string;
    description: string;
    amount: number;
}

export interface RentalInvoicePlan {
    kind: 'remainder' | 'deposit+remainder' | 'full';
    items: InvoiceItem[];
    total: number;
    /** Final due date of the invoice. */
    dueDate: string;
    /** Two-part payment schedule, or null for a single payment. */
    schedule: { value: number; dueDate: string }[] | null;
}

export function planRentalInvoice(input: {
    hours: number;
    startTime: string;
    today: string;
    depositPaid: number;
    /** Client answered "Pet Coming? Yes" on the booking form. */
    pet?: boolean;
    /** "Number of Attendees" from the booking form (online bookings only). */
    people?: number | null;
}): RentalInvoicePlan {
    const { hours, startTime, today, depositPaid, pet = false, people = null } = input;
    const base = RENTAL_BASE_PRICE[hours];
    if (!base) throw new Error(`No price for a ${hours}h rental`);

    const extraPeople = people ? Math.max(0, people - GROUP_INCLUDED) : 0;
    const petItems: InvoiceItem[] = [
        ...(extraPeople > 0
            ? [{ name: `Additional people (${extraPeople} × $${GROUP_EXTRA_FEE})`, description: `${people} people, ${GROUP_INCLUDED} included`, amount: extraPeople * GROUP_EXTRA_FEE }]
            : []),
        ...(pet ? [{ name: 'Pet cleaning fee', description: '', amount: PET_FEE }] : []),
    ];
    const extrasTotal = petItems.reduce((sum, i) => sum + i.amount, 0);
    const taxable = base + extrasTotal;
    const hst = round2(taxable * HST_RATE);
    const hstItem: InvoiceItem = { name: 'HST - Manual entry', description: `13% of ${taxable}$`, amount: hst };
    const rentalDay = torontoDate(new Date(startTime));
    const label = new Date(`${rentalDay}T12:00:00Z`).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', timeZone: 'UTC' });
    const dueDate = remainderDueDate(startTime, today);

    if (depositPaid > 0) {
        const remainder = round2(base - depositPaid);
        return {
            kind: 'remainder',
            items: [{ name: `${hours}h Rental – Remainder`, description: `${label} rental (deposit already paid)`, amount: remainder }, ...petItems, hstItem],
            total: round2(remainder + extrasTotal + hst),
            dueDate,
            schedule: null,
        };
    }

    const items = [{ name: `${hours}h Studio Rental`, description: `${label} rental`, amount: base }, ...petItems, hstItem];
    const total = round2(taxable + hst);
    if (dueDate <= today) {
        return { kind: 'full', items, total, dueDate: today, schedule: null };
    }
    const deposit = round2(base * DEPOSIT_RATE);
    return {
        kind: 'deposit+remainder',
        items,
        total,
        dueDate,
        schedule: [
            { value: deposit, dueDate: today },
            { value: round2(total - deposit), dueDate },
        ],
    };
}

/** Client-facing note for a two-part invoice (GHL's own text/email only shows the final due date). */
export function scheduleNote(plan: RentalInvoicePlan): string {
    if (!plan.schedule) return '';
    const [dep, rest] = plan.schedule;
    const day = (ymd: string) =>
        new Date(`${ymd}T12:00:00Z`).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', timeZone: 'UTC' });
    return `Payment schedule: the 30% deposit of $${dep.value.toFixed(2)} is due now to hold your booking. The balance of $${rest.value.toFixed(2)} is due ${day(rest.dueDate)}.`;
}

/** "Rental Invoices Sent" contact field: space-separated appointment IDs. */
export function ledgerHas(ledger: string, id: string): boolean {
    return ledger.split(/\s+/).includes(id);
}

export function ledgerAdd(ledger: string, id: string): string {
    const ids = ledger.split(/\s+/).filter(Boolean);
    if (!ids.includes(id)) ids.push(id);
    return ids.join(' ');
}
