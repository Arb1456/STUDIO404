// Run: node --test tests/*.test.mjs
// Pure rules for the Meta Conversions API Purchase sent on each booking (lib/meta-purchase.ts).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { purchaseFor, buildPurchaseEvent, normalizePhone } from '../lib/meta-purchase.ts';

const sha = (s) => createHash('sha256').update(s).digest('hex');

test('full price for every booking calendar: minis, holiday, photo sessions, every rental length', () => {
    assert.deepEqual(purchaseFor('qMWxfnMOJQ1KA6zGsHCB'), { value: 125, contentName: 'Holiday Mini', category: 'holiday' });
    assert.deepEqual(purchaseFor('b4CiROJpNQTGDtossKxl'), { value: 250, contentName: 'Full Holiday Session', category: 'holiday' });
    assert.deepEqual(purchaseFor('GSWUXn108tS992TUjrrl'), { value: 250, contentName: 'Maternity Session', category: 'photo session' });
    assert.deepEqual(purchaseFor('3abPFtm86r4XNJBQ7IDU'), { value: 70, contentName: '1h Studio Rental', category: 'rental' });
    assert.deepEqual(purchaseFor('NnLJQCqdQeBb9sJSzK1u'), { value: 450, contentName: '10h Studio Rental', category: 'rental' });
});

test('non-booking calendars (personal calendars) send nothing', () => {
    assert.equal(purchaseFor('ySO3muqLM7xNirXFhZ8l'), null);
    assert.equal(purchaseFor(undefined), null);
});

test('phone normalized to digits with country code', () => {
    assert.equal(normalizePhone('+1 (613) 808-3340'), '16138083340');
    assert.equal(normalizePhone('613-808-3340'), '16138083340');
    assert.equal(normalizePhone(''), null);
});

test('event: Purchase, CAD full price, appointment id as event id, hashed customer details', () => {
    const e = buildPurchaseEvent({
        appointmentId: 'appt1',
        calendarId: 'qMWxfnMOJQ1KA6zGsHCB',
        bookedAt: '2026-11-20T15:00:00Z',
        online: true,
        contact: {
            id: 'c1', email: ' Rose@Example.com ', phone: '+16138083340', firstName: 'Rose', lastName: 'Smith',
            ip: '1.2.3.4', userAgent: 'UA', fbclid: 'abc',
        },
    });
    assert.equal(e.event_name, 'Purchase');
    assert.equal(e.event_id, 'appt1');
    assert.equal(e.event_time, Math.floor(Date.parse('2026-11-20T15:00:00Z') / 1000));
    assert.equal(e.action_source, 'website');
    assert.deepEqual(e.custom_data, { currency: 'CAD', value: 125, content_name: 'Holiday Mini', content_category: 'holiday', order_id: 'appt1' });
    assert.deepEqual(e.user_data.em, [sha('rose@example.com')]);
    assert.deepEqual(e.user_data.ph, [sha('16138083340')]);
    assert.deepEqual(e.user_data.fn, [sha('rose')]);
    assert.deepEqual(e.user_data.ln, [sha('smith')]);
    assert.deepEqual(e.user_data.external_id, [sha('c1')]);
    assert.equal(e.user_data.client_ip_address, '1.2.3.4');
    assert.equal(e.user_data.client_user_agent, 'UA');
    assert.equal(e.user_data.fbc, `fb.1.${e.event_time * 1000}.abc`);
});

test('hand booking: system_generated, no browser details, missing fields left out', () => {
    const e = buildPurchaseEvent({
        appointmentId: 'appt2', calendarId: '0vdWae4y3Zgd6mKS6aTG', bookedAt: '2026-11-20T15:00:00Z', online: false,
        contact: { id: 'c2', email: 'a@b.ca', phone: null, firstName: '', lastName: null, ip: '9.9.9.9', userAgent: 'UA' },
    });
    assert.equal(e.action_source, 'system_generated');
    assert.equal(e.custom_data.value, 120);
    assert.deepEqual(Object.keys(e.user_data).sort(), ['em', 'external_id']);
});

test('unknown calendar throws', () => {
    assert.throws(() => buildPurchaseEvent({ appointmentId: 'x', calendarId: 'nope', bookedAt: '2026-11-20T15:00:00Z', online: true, contact: { id: 'c' } }));
});
