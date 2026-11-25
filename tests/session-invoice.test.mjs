import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    SESSION_CALENDARS,
    parseExtras,
    reviewReason,
    MAX_PEOPLE,
    planSessionInvoice,
    sessionNote,
} from '../lib/session-invoice.ts';

const MINI = SESSION_CALENDARS.qMWxfnMOJQ1KA6zGsHCB;
const FULL = SESSION_CALENDARS.b4CiROJpNQTGDtossKxl;
const PORTRAIT = SESSION_CALENDARS.KvztVUwlUSYo3EIOqSuR;
const TODAY = '2026-11-19';
const noExtras = { people: null, pet: false, addons: [] };
const pick = (plan) => plan.items.map((i) => [i.name, i.amount]);

test('calendar map covers mini, full holiday and the 10 photo sessions', () => {
    const kinds = Object.values(SESSION_CALENDARS).map((o) => o.kind);
    assert.equal(kinds.filter((k) => k === 'mini').length, 1);
    assert.equal(kinds.filter((k) => k === 'holiday').length, 1);
    assert.equal(kinds.filter((k) => k === 'photo').length, 10);
    assert.equal(SESSION_CALENDARS['3abPFtm86r4XNJBQ7IDU'], undefined); // rental calendar
});

test('mini, deposit paid, 2 people: matches #717 (Sidney) = $91.25', () => {
    const p = planSessionInvoice({ offer: MINI, extras: { people: 2, pet: false, addons: [] }, startTime: '2026-12-06T14:00:00-05:00', today: TODAY, depositPaid: 50 });
    assert.equal(p.kind, 'remainder');
    assert.deepEqual(pick(p), [['Holiday Mini – Balance', 75], ['HST - Manual entry', 16.25]]);
    assert.equal(p.total, 91.25);
    assert.equal(p.dueDate, '2026-12-03');
    assert.equal(p.schedule, null);
});

test('mini, 6 people + 4 more edits: matches #710 (Stephanie) = $153.40', () => {
    const p = planSessionInvoice({ offer: MINI, extras: { people: 6, pet: false, addons: ['4 More Edited Photos (+$40)'] }, startTime: '2026-12-06T16:00:00-05:00', today: TODAY, depositPaid: 50 });
    assert.deepEqual(pick(p), [
        ['Holiday Mini – Balance', 75],
        ['Additional people (1 × $15)', 15],
        ['Add-on: 4 More Edited Photos', 40],
        ['HST - Manual entry', 23.4],
    ]);
    assert.equal(p.total, 153.4);
});

test('mini, proof album: matches #716 (Rose) = $130.80', () => {
    const p = planSessionInvoice({ offer: MINI, extras: { people: 4, pet: false, addons: ['Full Proof Album, every photo from your session (+$35)'] }, startTime: '2026-12-06T12:30:00-05:00', today: TODAY, depositPaid: 50 });
    assert.deepEqual(pick(p), [['Holiday Mini – Balance', 75], ['Add-on: Full Proof Album', 35], ['HST - Manual entry', 20.8]]);
    assert.equal(p.total, 130.8);
});

test('full holiday, 8 people + pet: 175 + 30 + 25 + 13% of 305', () => {
    const p = planSessionInvoice({ offer: FULL, extras: { people: 8, pet: true, addons: [] }, startTime: '2026-12-12T13:00:00-05:00', today: TODAY, depositPaid: 75 });
    assert.deepEqual(pick(p), [
        ['Full Holiday Session – Balance', 175],
        ['Additional people (2 × $15)', 30],
        ['Pet cleaning fee', 25],
        ['HST - Manual entry', 39.65],
    ]);
    assert.equal(p.total, 269.65);
    assert.equal(p.items.at(-1).description, '13% of 305$');
});

test('full holiday ignores mini add-ons; 6 people are included', () => {
    const p = planSessionInvoice({ offer: FULL, extras: { people: 6, pet: false, addons: ['Full Proof Album (+$35)'] }, startTime: '2026-12-12T13:00:00-05:00', today: TODAY, depositPaid: 75 });
    assert.deepEqual(pick(p), [['Full Holiday Session – Balance', 175], ['HST - Manual entry', 32.5]]);
});

test('portrait, deposit paid: matches #677 = $204.25, and is draft-only', () => {
    const p = planSessionInvoice({ offer: PORTRAIT, extras: { people: 3, pet: true, addons: [] }, startTime: '2026-12-10T15:00:00-05:00', today: TODAY, depositPaid: 50 });
    assert.deepEqual(pick(p), [['Portrait Session – Remainder', 175], ['HST - Manual entry', 29.25]]);
    assert.equal(p.total, 204.25);
    assert.equal(PORTRAIT.draftOnly, true);
    assert.equal(MINI.draftOnly, false);
});

test('booked by hand (no deposit), mini 3 weeks out: two parts, deposit today', () => {
    const p = planSessionInvoice({ offer: MINI, extras: { people: 2, pet: false, addons: [] }, startTime: '2026-12-10T14:00:00-05:00', today: TODAY, depositPaid: 0 });
    assert.equal(p.kind, 'deposit+remainder');
    assert.deepEqual(pick(p), [['Holiday Mini Session', 125], ['HST - Manual entry', 16.25]]);
    assert.deepEqual(p.schedule, [
        { value: 50, dueDate: TODAY },
        { value: 91.25, dueDate: '2026-12-07' },
    ]);
    assert.match(sessionNote(p), /deposit of \$50\.00 is due now.*balance of \$91\.25 is due December 7/);
});

test('booked by hand under 3 days away: one payment due today', () => {
    const p = planSessionInvoice({ offer: FULL, extras: noExtras, startTime: '2026-11-21T13:00:00-05:00', today: TODAY, depositPaid: 0 });
    assert.equal(p.kind, 'full');
    assert.equal(p.dueDate, TODAY);
    assert.equal(p.total, 282.5);
    assert.equal(p.schedule, null);
    assert.equal(sessionNote(p), '');
});

test('schedule parts always add up to the total', () => {
    for (const offer of Object.values(SESSION_CALENDARS)) {
        const p = planSessionInvoice({ offer, extras: { people: 9, pet: true, addons: ['4 More Edited Photos (+$40)'] }, startTime: '2027-01-20T13:00:00-05:00', today: TODAY, depositPaid: 0 });
        const sum = Math.round(p.schedule.reduce((s, x) => s + x.value, 0) * 100) / 100;
        assert.equal(sum, p.total, offer.name);
    }
});

test('parseExtras reads the GHL contact field shapes (new + old pet field)', () => {
    assert.deepEqual(parseExtras({ people: 6, pet: 'No', addons: ['4 More Edited Photos (+$40)'] }), { people: 6, pet: false, addons: ['4 More Edited Photos (+$40)'] });
    assert.deepEqual(parseExtras({ people: '7', petOld: ['Yes'] }), { people: 7, pet: true, addons: [] });
    assert.deepEqual(parseExtras({ pet: 'Yes', petOld: ['No'] }), { people: null, pet: true, addons: [] });
    assert.deepEqual(parseExtras({ people: '', addons: 'Full Proof Album (+$35)' }), { people: null, pet: false, addons: ['Full Proof Album (+$35)'] });
});

test('a phone number in the head-count box is rejected, not billed', () => {
    const extras = parseExtras({ people: '7057189583', pet: 'Yes' });
    assert.equal(extras.people, null);
    assert.equal(extras.peopleRejected, '7057189583');
    const offer = SESSION_CALENDARS[Object.keys(SESSION_CALENDARS).find((k) => SESSION_CALENDARS[k].kind === 'mini')];
    const plan = planSessionInvoice({ offer, extras, startTime: '2026-11-30T00:30:00Z', today: '2026-11-23', depositPaid: 50 });
    assert.ok(plan.total < 200, `total was ${plan.total}`);
    assert.match(reviewReason(extras, plan), /can't be a head count/);
    assert.equal(parseExtras({ people: MAX_PEOPLE }).people, MAX_PEOPLE);
});

test('normal invoices need no review; very large totals do', () => {
    const offer = SESSION_CALENDARS[Object.keys(SESSION_CALENDARS).find((k) => SESSION_CALENDARS[k].kind === 'mini')];
    const ok = planSessionInvoice({ offer, extras: parseExtras({ people: 6 }), startTime: '2026-11-30T00:30:00Z', today: '2026-11-23', depositPaid: 50 });
    assert.equal(reviewReason(parseExtras({ people: 6 }), ok), null);
    const big = { ...ok, total: 5000 };
    assert.match(reviewReason(parseExtras({ people: 6 }), big), /unusually high/);
});

test('late add-ons (day-after form) join the booking-form add-ons and a repeat is charged once', () => {
    const edits = '4 More Edited Photos (+$40)';
    const album = 'Full Proof Album, every photo from your session (+$35)';
    const both = parseExtras({ people: 3, pet: 'No', addons: [edits], lateAddons: [edits, album] });
    assert.deepEqual(both.addons, [edits, album]);
    const p = planSessionInvoice({ offer: MINI, extras: both, startTime: '2026-12-06T14:00:00-05:00', today: TODAY, depositPaid: 50 });
    assert.deepEqual(pick(p).slice(1, 3), [['Add-on: 4 More Edited Photos', 40], ['Add-on: Full Proof Album', 35]]);
    assert.equal(p.total, 176); // 75 + 40 + 35 + 13% of 200
    assert.deepEqual(parseExtras({ people: 3, lateAddons: album }).addons, [album]);
});

test('booking-form add-ons stay on the invoice when the day-after form is blank or never filled', () => {
    const edits = '4 More Edited Photos (+$40)';
    for (const late of [undefined, null, '', []]) {
        const extras = parseExtras({ people: 3, pet: 'No', addons: [edits], lateAddons: late });
        const p = planSessionInvoice({ offer: MINI, extras, startTime: '2026-12-06T14:00:00-05:00', today: TODAY, depositPaid: 50 });
        assert.deepEqual(pick(p).filter(([n]) => n.startsWith('Add-on')), [['Add-on: 4 More Edited Photos', 40]]);
    }
});
