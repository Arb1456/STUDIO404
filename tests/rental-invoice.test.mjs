// Run: node --test tests/*.test.mjs
// Pure pricing / due-date rules for the rental auto-invoice (lib/rental-invoice.ts).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    RENTAL_CALENDAR_HOURS,
    RENTAL_BASE_PRICE,
    torontoDate,
    remainderDueDate,
    planRentalInvoice,
    parseAttendees,
    ledgerHas,
    ledgerAdd,
    scheduleNote,
    testHourCredit,
    TEST_HOUR_CREDIT_TAG,
} from '../lib/rental-invoice.ts';

test('all 10 rental calendars map to hours with a base price', () => {
    const hours = Object.values(RENTAL_CALENDAR_HOURS).sort((a, b) => a - b);
    assert.deepEqual(hours, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    assert.equal(RENTAL_BASE_PRICE[1], 70);
    assert.equal(RENTAL_BASE_PRICE[2], 120);
    assert.equal(RENTAL_BASE_PRICE[4], 225);
    assert.equal(RENTAL_BASE_PRICE[10], 450);
    // 6h+ must match the site (RentalPage, BookingHub) and the GHL calendar prices (André, Nov 22).
    assert.deepEqual([6, 7, 8, 9, 10].map((h) => RENTAL_BASE_PRICE[h]), [315, 360, 400, 430, 450]);
});

test('torontoDate uses Toronto wall-clock date, not UTC', () => {
    // 11:30 pm Toronto on Nov 18 is already Nov 19 in UTC.
    assert.equal(torontoDate(new Date('2026-11-19T04:30:00Z')), '2026-11-18');
    assert.equal(torontoDate(new Date('2026-11-19T05:30:00Z')), '2026-11-19');
});

test('remainder is due 3 days before the rental, never before today', () => {
    assert.equal(remainderDueDate('2026-11-28T15:30:00-05:00', '2026-11-18'), '2026-11-25');
    // Month boundary.
    assert.equal(remainderDueDate('2026-12-02T10:00:00-05:00', '2026-11-18'), '2026-11-29');
    // Rental 2 days away: 3-days-before is already past -> due today.
    assert.equal(remainderDueDate('2026-11-20T10:00:00-05:00', '2026-11-18'), '2026-11-18');
    // Exactly 3 days away -> due today.
    assert.equal(remainderDueDate('2026-11-21T10:00:00-05:00', '2026-11-18'), '2026-11-18');
});

test('online booking with deposit paid: remainder + HST on full base, due 3 days before', () => {
    const p = planRentalInvoice({ hours: 1, startTime: '2026-11-28T15:30:00-05:00', today: '2026-11-18', depositPaid: 21 });
    assert.equal(p.kind, 'remainder');
    assert.deepEqual(p.items.map((i) => [i.name, i.amount]), [['1h Rental – Remainder', 49], ['HST - Manual entry', 9.1]]);
    assert.equal(p.total, 58.1);
    assert.equal(p.dueDate, '2026-11-25');
    assert.equal(p.schedule, null);
});

test('online remainder uses the deposit actually paid (2h, 3h, 4h)', () => {
    const two = planRentalInvoice({ hours: 2, startTime: '2026-12-14T11:00:00-05:00', today: '2026-11-18', depositPaid: 36 });
    assert.equal(two.total, 99.6);
    const three = planRentalInvoice({ hours: 3, startTime: '2026-12-04T17:00:00-05:00', today: '2026-11-18', depositPaid: 54 });
    assert.equal(three.total, 149.4);
    const four = planRentalInvoice({ hours: 4, startTime: '2026-12-04T17:00:00-05:00', today: '2026-11-18', depositPaid: 67.5 });
    assert.equal(four.total, 186.75); // matches the existing "4h Rental Remainder" template
});

test('hand booking (no deposit): one invoice, deposit due today + remainder due 3 days before', () => {
    const p = planRentalInvoice({ hours: 1, startTime: '2026-11-28T15:30:00-05:00', today: '2026-11-18', depositPaid: 0 });
    assert.equal(p.kind, 'deposit+remainder');
    assert.deepEqual(p.items.map((i) => [i.name, i.amount]), [['1h Studio Rental', 70], ['HST - Manual entry', 9.1]]);
    assert.equal(p.total, 79.1);
    assert.deepEqual(p.schedule, [
        { value: 21, dueDate: '2026-11-18' },
        { value: 58.1, dueDate: '2026-11-25' },
    ]);
    assert.equal(p.dueDate, '2026-11-25');
});

test('hand booking schedule always sums to the invoice total (all lengths)', () => {
    for (let h = 1; h <= 10; h++) {
        const p = planRentalInvoice({ hours: h, startTime: '2027-01-30T10:00:00-05:00', today: '2026-11-18', depositPaid: 0 });
        const sum = Math.round(p.schedule.reduce((s, x) => s + x.value, 0) * 100) / 100;
        assert.equal(sum, p.total, `${h}h`);
    }
});

test('hand booking less than 3 days away: single payment, due today', () => {
    const p = planRentalInvoice({ hours: 2, startTime: '2026-11-20T11:00:00-05:00', today: '2026-11-18', depositPaid: 0 });
    assert.equal(p.kind, 'full');
    assert.equal(p.total, 135.6);
    assert.equal(p.schedule, null);
    assert.equal(p.dueDate, '2026-11-18');
});

test('unknown rental length is rejected', () => {
    assert.throws(() => planRentalInvoice({ hours: 11, startTime: '2026-11-28T15:30:00-05:00', today: '2026-11-18', depositPaid: 0 }));
});

test('ledger: whole-ID match only, append keeps earlier IDs', () => {
    assert.equal(ledgerHas('', 'abc'), false);
    assert.equal(ledgerHas(' abc def', 'abc'), true);
    assert.equal(ledgerHas('xabcx', 'abc'), false);
    assert.equal(ledgerAdd(' abc', 'def'), 'abc def');
    assert.equal(ledgerAdd('abc', 'abc'), 'abc');
});

test('two-part invoice gets a client note naming both payments; single payment gets none', () => {
    const two = planRentalInvoice({ hours: 1, startTime: '2026-11-28T15:30:00-05:00', today: '2026-11-18', depositPaid: 0 });
    assert.equal(scheduleNote(two), 'Payment schedule: the 30% deposit of $21.00 is due now to hold your booking. The balance of $58.10 is due November 25.');
    const one = planRentalInvoice({ hours: 1, startTime: '2026-11-28T15:30:00-05:00', today: '2026-11-18', depositPaid: 21 });
    assert.equal(scheduleNote(one), '');
});

test('pet coming: $25 cleaning fee line, HST covers it, no pet means no line', () => {
    const p = planRentalInvoice({ hours: 1, startTime: '2026-11-28T15:30:00-05:00', today: '2026-11-18', depositPaid: 21, pet: true });
    assert.deepEqual(p.items.map((i) => [i.name, i.amount]), [
        ['1h Rental – Remainder', 49],
        ['Pet cleaning fee', 25],
        ['HST - Manual entry', 12.35],
    ]);
    assert.equal(p.items[2].description, '13% of 95$');
    assert.equal(p.total, 86.35);

    const none = planRentalInvoice({ hours: 1, startTime: '2026-11-28T15:30:00-05:00', today: '2026-11-18', depositPaid: 21, pet: false });
    assert.equal(none.items.length, 2);
    assert.equal(none.total, 58.1);
});

test('group fee: +$10 per person over 8, taxed, and impossible head counts are ignored', () => {
    const base = { hours: 2, startTime: '2026-12-10T17:00:00Z', today: '2026-11-24', depositPaid: 36 };
    const eight = planRentalInvoice({ ...base, people: 8 });
    assert.equal(eight.items.some((i) => i.name.startsWith('Additional people')), false);
    const twelve = planRentalInvoice({ ...base, people: 12 });
    const extra = twelve.items.find((i) => i.name.startsWith('Additional people'));
    assert.equal(extra.amount, 40);
    assert.equal(twelve.items.find((i) => i.name.startsWith('HST')).amount, Math.round((120 + 40) * 0.13 * 100) / 100);
    assert.equal(twelve.total, Math.round((120 - 36 + 40 + (120 + 40) * 0.13) * 100) / 100);
    const withPet = planRentalInvoice({ ...base, people: 10, pet: true });
    assert.equal(withPet.total, Math.round((120 - 36 + 20 + 25 + (120 + 45) * 0.13) * 100) / 100);
    assert.deepEqual(parseAttendees('7057189583'), { people: null, rejected: '7057189583' });
    assert.deepEqual(parseAttendees('12'), { people: 12 });
    assert.deepEqual(parseAttendees(''), { people: null });
});

// ── Test-hour credit (André, Nov 24 2026): 1h test rental, then a full day = $350 ──
const ONE_HOUR = '3abPFtm86r4XNJBQ7IDU';
const TWO_HOUR = '0vdWae4y3Zgd6mKS6aTG';
const testHour = (startTime, extra = {}) => ({ id: 'test1', calendarId: ONE_HOUR, appointmentStatus: 'showed', startTime, ...extra });
const credit = (over = {}) =>
    testHourCredit({ hours: 8, rentalDay: '2026-12-10', appointmentId: 'full1', appointments: [testHour('2026-11-27 15:00:00')], tags: [], ...over });

test('test-hour credit: $50 on an 8h day after a 1h rental from Nov 24 on', () => {
    assert.equal(credit(), 50);
    // Test hour booked but still upcoming (confirmed) still counts.
    assert.equal(credit({ appointments: [testHour('2026-11-28 10:00:00', { appointmentStatus: 'confirmed' })] }), 50);
});

test('test-hour credit: not for other lengths, after Jan 1, or once used', () => {
    for (const hours of [1, 2, 4, 7, 9, 10]) assert.equal(credit({ hours }), 0, `${hours}h`);
    assert.equal(credit({ rentalDay: '2027-01-01' }), 0);
    assert.equal(credit({ rentalDay: '2026-12-31' }), 50);
    assert.equal(credit({ tags: ['from contact form', TEST_HOUR_CREDIT_TAG] }), 0);
    assert.equal(credit({ tags: ['Test-Hour Credit Used'] }), 0);
});

test('test-hour credit: the 1h rental must be real, on/after Nov 24, and not after the full day', () => {
    assert.equal(credit({ appointments: [] }), 0);
    // Regular 1h renter from before the offer: no credit.
    assert.equal(credit({ appointments: [testHour('2026-11-17 17:00:00')] }), 0);
    for (const appointmentStatus of ['cancelled', 'invalid', 'noshow'])
        assert.equal(credit({ appointments: [testHour('2026-11-27 15:00:00', { appointmentStatus })] }), 0, appointmentStatus);
    assert.equal(credit({ appointments: [testHour('2026-11-27 15:00:00', { deleted: true })] }), 0);
    // A 2h rental isn't the test hour.
    assert.equal(credit({ appointments: [testHour('2026-11-27 15:00:00', { calendarId: TWO_HOUR })] }), 0);
    // Same day as the full day doesn't count either.
    assert.equal(credit({ appointments: [testHour('2026-12-10 09:00:00')] }), 0);
    // 1h booked for after the full day: "test" doesn't come first.
    assert.equal(credit({ appointments: [testHour('2026-12-15 15:00:00')] }), 0);
});

test('test-hour credit on the invoice: $350 + HST on $350, deposit taken off', () => {
    // Online: 30% of $400 = $120 paid on the calendar -> remainder $230, HST 13% of 350.
    const online = planRentalInvoice({ hours: 8, startTime: '2026-12-10T10:00:00-05:00', today: '2026-12-03', depositPaid: 120, credit: 50 });
    assert.equal(online.items[0].amount, 230);
    assert.match(online.items[0].description, /\$400 less \$50 test-hour credit/);
    assert.equal(online.items.at(-1).amount, 45.5);
    assert.equal(online.total, 275.5);
    // By hand: deposit is 30% of the credited price.
    const hand = planRentalInvoice({ hours: 8, startTime: '2026-12-20T10:00:00-05:00', today: '2026-12-01', depositPaid: 0, credit: 50 });
    assert.equal(hand.items[0].amount, 350);
    assert.equal(hand.total, 395.5);
    assert.deepEqual(hand.schedule.map((s) => s.value), [105, 290.5]);
    // No credit: unchanged.
    assert.equal(planRentalInvoice({ hours: 8, startTime: '2026-12-20T10:00:00-05:00', today: '2026-12-01', depositPaid: 0 }).total, 452);
});
