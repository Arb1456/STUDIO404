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
    ledgerHas,
    ledgerAdd,
    scheduleNote,
} from '../lib/rental-invoice.ts';

test('all 10 rental calendars map to hours with a base price', () => {
    const hours = Object.values(RENTAL_CALENDAR_HOURS).sort((a, b) => a - b);
    assert.deepEqual(hours, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    assert.equal(RENTAL_BASE_PRICE[1], 70);
    assert.equal(RENTAL_BASE_PRICE[2], 120);
    assert.equal(RENTAL_BASE_PRICE[4], 225);
    assert.equal(RENTAL_BASE_PRICE[10], 500);
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
