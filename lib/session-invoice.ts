/**
 * Session auto-invoice: pure pricing and due-date rules (no network, no imports).
 * Used by app/api/session-invoice/route.ts; tested by tests/session-invoice.test.mjs.
 * Self-contained on purpose: the rental auto-invoice (lib/rental-invoice.ts) stays untouched.
 *
 * Rules (André, 2026-11-18/19):
 * - Invoiced 7 days before the session (GHL workflow wait), due 3 days before.
 * - Deposit paid online: invoice = balance + extras + HST (13% of full price + extras).
 * - Booked by hand (no deposit): full price in two parts (the calendar deposit due today,
 *   the rest 3 days before); under 3 days away, one payment due today.
 * - Holiday Mini: 5 people included, +$15/person, +$25 pet, optional add-ons ($40 / $35).
 * - Full Holiday Session: 6 people included, +$15/person, +$25 pet, same add-ons (André, Nov 27).
 * - Photo sessions: "starting at" prices, final price set after consultation, so the
 *   invoice is ALWAYS a draft at the starting price for André to adjust and send.
 */

export type SessionKind = 'mini' | 'holiday' | 'photo';

export interface SessionOffer {
    kind: SessionKind;
    /** Name used on the invoice, e.g. "Holiday Mini", "Portrait Session". */
    name: string;
    price: number;
    deposit: number;
    /** Group size included in the price (holiday offers only). */
    includedPeople: number | null;
    extraPersonFee: number;
    petFee: number;
    /** Never sent automatically; André reviews it first. */
    draftOnly: boolean;
}

const mini: SessionOffer = { kind: 'mini', name: 'Holiday Mini', price: 125, deposit: 50, includedPeople: 5, extraPersonFee: 15, petFee: 25, draftOnly: false };
const holiday: SessionOffer = { kind: 'holiday', name: 'Full Holiday Session', price: 250, deposit: 75, includedPeople: 6, extraPersonFee: 15, petFee: 25, draftOnly: false };
const photo = (name: string, price: number): SessionOffer => ({ kind: 'photo', name, price, deposit: 50, includedPeople: null, extraPersonFee: 0, petFee: 0, draftOnly: true });

/** GHL calendar id -> offer. Prices match the site (PhotoshootPage, lib/holiday.ts). */
export const SESSION_CALENDARS: Record<string, SessionOffer> = {
    qMWxfnMOJQ1KA6zGsHCB: mini,
    b4CiROJpNQTGDtossKxl: holiday,
    KvztVUwlUSYo3EIOqSuR: photo('Portrait Session', 225),
    qAl3TeqeHSmbM3Sisf1P: photo('Family Session', 250),
    '919dkHA4q01rbGZ9Ykd0': photo('Couple Session', 250),
    m7sfjF4uitPwOiwgP6PU: photo('Birthday Session', 275),
    b2ZsgRNDYp1fcqodoPZu: photo('Headshots', 150),
    GSWUXn108tS992TUjrrl: photo('Maternity Session', 250),
    lcgpfiqtvp8m4FeoA2uX: photo('Group Session', 325),
    t0I0yxtvrHnTfBUDDT70: photo('Newborn Session', 250),
    Sy7MiF1EHCKW8avOJsoN: photo('Boudoir Session', 300),
    aImgtWNXqNxYWZS1rUtj: photo('Product Session', 275),
};

/** Holiday add-ons (minis + Full Holiday), matched on the start of the booking-form checkbox label. */
export const HOLIDAY_ADDON_PRICES: { match: string; name: string; price: number }[] = [
    { match: '4 More Edited Photos', name: 'Add-on: 4 More Edited Photos', price: 40 },
    { match: 'Full Proof Album', name: 'Add-on: Full Proof Album', price: 35 },
];

export type FormFieldKey = 'people' | 'pet' | 'petOld' | 'addons' | 'lateAddons';

/** GHL contact fields shared by every session type. */
const SHARED_FIELDS: Record<string, FormFieldKey> = {
    diRt7iG4C3bqFRd21VKv: 'people', // How many people will be in the photos?
    '53fz0Jt5VX6lwM3zqlHt': 'pet', // Pet Coming? (radio, current)
    b2BCedUgFCqxbhmpYiA9: 'petOld', // Bringing a Pet? (checkbox, older bookings)
};

/**
 * Add-on fields, separate per offer. GHL stores form answers on the contact, so a client who
 * books a mini and later a Full Holiday must not have the mini add-ons billed again.
 */
const ADDON_FIELDS: Partial<Record<SessionKind, Record<string, FormFieldKey>>> = {
    mini: {
        '0VQtPeEuZX2SmZSlPZBQ': 'addons', // Mini Add-Ons (Holiday Mini Form)
        SBRcfng8zpzBlRtbr0M8: 'lateAddons', // Mini Late Add-Ons (mini day-after form)
    },
    holiday: {
        NNn7tQ79uFoB8wfC06NX: 'addons', // Full Holiday Add-Ons (Holiday Form)
        oZ7azVtdIMvXoqClEAAC: 'lateAddons', // Full Holiday Late Add-Ons (Full Holiday day-after form)
    },
};

/** Contact field id -> answer key, for one session type. */
export function formFieldsFor(kind: SessionKind): Record<string, FormFieldKey> {
    return { ...SHARED_FIELDS, ...(ADDON_FIELDS[kind] ?? {}) };
}

export const HST_RATE = 0.13;
export const DUE_DAYS_BEFORE = 3;
const TZ = 'America/Toronto';
const round2 = (n: number) => Math.round(n * 100) / 100;

export function torontoDate(d: Date): string {
    return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}

function addDays(ymd: string, days: number): string {
    const [y, m, d] = ymd.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

const dayLabel = (ymd: string, month: 'short' | 'long') =>
    new Date(`${ymd}T12:00:00Z`).toLocaleDateString('en-CA', { month, day: 'numeric', timeZone: 'UTC' });

/** Most people a real group can be. Bigger answers (e.g. a phone number typed in the box) are treated as unanswered. */
export const MAX_PEOPLE = 25;

/** A session invoice above this is never sent automatically; André gets it as a draft to check. */
export const MAX_AUTO_SEND_TOTAL = 600;

export interface SessionExtras {
    /** People in the photos, or null if the form wasn't answered (or the answer can't be a head count). */
    people: number | null;
    pet: boolean;
    /** Raw add-on checkbox labels from the booking form. */
    addons: string[];
    /** Set when the head-count answer was rejected as implausible; holds what the client typed. */
    peopleRejected?: string;
}

/**
 * Raw contact field values -> extras. Keys: people (how_many_people_will_be_in_the_photos),
 * pet (pet_coming radio, current), petOld (bringing_a_pet checkbox, older bookings), addons (booking form),
 * lateAddons (day-after form; own field so it can't overwrite the booking answers). See formFieldsFor.
 */
export function parseExtras(raw: { people?: unknown; pet?: unknown; petOld?: unknown; addons?: unknown; lateAddons?: unknown }): SessionExtras {
    const n = raw.people === '' || raw.people == null ? NaN : Number(raw.people);
    const yes = (v: unknown) => (Array.isArray(v) ? v : [v]).some((x) => String(x).trim().toLowerCase() === 'yes');
    const pet = raw.pet != null && raw.pet !== '' ? yes(raw.pet) : yes(raw.petOld);
    const list = (v: unknown) => (Array.isArray(v) ? v : v ? [v] : []).map(String).filter(Boolean);
    const addons = [...new Set([...list(raw.addons), ...list(raw.lateAddons)])];
    if (Number.isFinite(n) && n > MAX_PEOPLE) return { people: null, pet, addons, peopleRejected: String(raw.people) };
    return { people: Number.isFinite(n) && n > 0 ? Math.round(n) : null, pet, addons };
}

/** Why an invoice must stay a draft for André to check, or null if it looks normal. */
export function reviewReason(extras: SessionExtras, plan: SessionInvoicePlan): string | null {
    if (extras.peopleRejected) return `The group-size answer was "${extras.peopleRejected}", which can't be a head count, so no extra-people fee was added. Ask the client how many people are coming.`;
    if (plan.total > MAX_AUTO_SEND_TOTAL) return `The total is $${plan.total.toFixed(2)}, which is unusually high.`;
    return null;
}

export interface InvoiceItem {
    name: string;
    description: string;
    amount: number;
}

export interface SessionInvoicePlan {
    kind: 'remainder' | 'deposit+remainder' | 'full';
    items: InvoiceItem[];
    total: number;
    dueDate: string;
    schedule: { value: number; dueDate: string }[] | null;
    /** e.g. "Dec 6" */
    dayLabel: string;
}

export function planSessionInvoice(input: {
    offer: SessionOffer;
    extras: SessionExtras;
    startTime: string;
    today: string;
    depositPaid: number;
}): SessionInvoicePlan {
    const { offer, extras, startTime, today, depositPaid } = input;
    const sessionDay = torontoDate(new Date(startTime));
    const label = dayLabel(sessionDay, 'short');
    const due = addDays(sessionDay, -DUE_DAYS_BEFORE);
    const dueDate = due > today ? due : today;

    const extraItems: InvoiceItem[] = [];
    if (offer.kind !== 'photo') {
        const extraPeople = offer.includedPeople && extras.people ? Math.max(0, extras.people - offer.includedPeople) : 0;
        if (extraPeople > 0)
            extraItems.push({ name: `Additional people (${extraPeople} × $${offer.extraPersonFee})`, description: `${extras.people} people, ${offer.includedPeople} included`, amount: extraPeople * offer.extraPersonFee });
        if (extras.pet) extraItems.push({ name: 'Pet cleaning fee', description: '', amount: offer.petFee });
    }
    if (offer.kind !== 'photo') {
        for (const a of HOLIDAY_ADDON_PRICES)
            if (extras.addons.some((x) => x.trim().startsWith(a.match))) extraItems.push({ name: a.name, description: '', amount: a.price });
    }

    const taxable = round2(offer.price + extraItems.reduce((s, i) => s + i.amount, 0));
    const hst: InvoiceItem = { name: 'HST - Manual entry', description: `13% of ${taxable}$`, amount: round2(taxable * HST_RATE) };

    if (depositPaid > 0) {
        const balance = round2(offer.price - depositPaid);
        const word = offer.kind === 'photo' ? 'Remainder' : 'Balance';
        const items = [{ name: `${offer.name} – ${word}`, description: `${label} session (deposit already paid)`, amount: balance }, ...extraItems, hst];
        return { kind: 'remainder', items, total: round2(items.reduce((s, i) => s + i.amount, 0)), dueDate, schedule: null, dayLabel: label };
    }

    const first = offer.kind === 'mini' ? `${offer.name} Session` : offer.name;
    const items = [{ name: first, description: `${label} session`, amount: offer.price }, ...extraItems, hst];
    const total = round2(items.reduce((s, i) => s + i.amount, 0));
    if (dueDate <= today) return { kind: 'full', items, total, dueDate: today, schedule: null, dayLabel: label };
    return {
        kind: 'deposit+remainder',
        items,
        total,
        dueDate,
        schedule: [
            { value: offer.deposit, dueDate: today },
            { value: round2(total - offer.deposit), dueDate },
        ],
        dayLabel: label,
    };
}

/** Client-facing note for a two-part invoice (GHL's own text/email only shows the final due date). */
export function sessionNote(plan: SessionInvoicePlan): string {
    if (!plan.schedule) return '';
    const [dep, rest] = plan.schedule;
    return `Payment schedule: the deposit of $${dep.value.toFixed(2)} is due now to hold your session. The balance of $${rest.value.toFixed(2)} is due ${dayLabel(rest.dueDate, 'long')}.`;
}

/** "Session Invoices Sent" contact field: space-separated appointment IDs. */
export function ledgerHas(ledger: string, id: string): boolean {
    return ledger.split(/\s+/).includes(id);
}

export function ledgerAdd(ledger: string, id: string): string {
    const ids = ledger.split(/\s+/).filter(Boolean);
    if (!ids.includes(id)) ids.push(id);
    return ids.join(' ');
}
