import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { getSpotsLeft } from '../lib/availability.ts';
import { refreshCounts } from '../lib/refresh.ts';
import type { PostSpec } from '../lib/spec.ts';

const fakeFetch = (status: number, body: unknown): typeof fetch =>
    (async () => new Response(JSON.stringify(body), { status })) as typeof fetch;

test('open slots count as spots left', async () => {
    assert.equal(await getSpotsLeft('2026-12-19', fakeFetch(200, { days: { '2026-12-19': ['2:30 pm', '3:15 pm'] } })), 2);
});

test('a day with no open slots is sold out', async () => {
    assert.equal(await getSpotsLeft('2026-12-19', fakeFetch(200, { days: { '2026-12-19': [] } })), 'sold-out');
});

test('an API error rejects with "availability unavailable"', async () => {
    await assert.rejects(getSpotsLeft('2026-12-19', fakeFetch(503, { error: 'x' })), /availability unavailable/);
});

test('a date that is not a mini day rejects', async () => {
    await assert.rejects(getSpotsLeft('2026-12-01', fakeFetch(200, { days: { '2026-12-19': [] } })), /not a mini day/);
});

// ─── refresh ─────────────────────────────────────────────────────────────

const setup = (liveCountDate: string) => {
    const dir = mkdtempSync(join(tmpdir(), 'refresh-'));
    const spec: PostSpec = {
        id: '2026-11-21-first-mini', date: '2026-11-21', time: '19:00', job: 'book', template: 'mini-day',
        slides: [{ dateLabel: 'Sun, Nov 22', hours: '2–6 pm', spotsLeft: 9, price: 125 }],
        caption: 'x', captionGoogle: 'x', liveCountDate, status: 'scheduled',
        ghl: { postIds: { social: 'p1' }, mediaUrls: ['old'] },
    };
    const file = join(dir, `${spec.id}.json`);
    writeFileSync(file, JSON.stringify(spec));
    process.env.SOCIAL_POSTS_DIR = dir;
    return { file, before: readFileSync(file, 'utf8') };
};

test('refresh writes the live count, re-renders and publishes the new image', async () => {
    const { file } = setup('2026-11-22');
    const published: string[] = [];
    const res = await refreshCounts({
        date: '2026-11-21', today: '2026-11-20',
        fetchImpl: fakeFetch(200, { days: { '2026-11-22': ['2:00 pm', '2:30 pm', '3:00 pm'] } }),
        render: async () => ['/tmp/a.png'],
        publish: async (s) => { published.push(s.id); },
    });
    assert.equal(res.ok, true);
    assert.equal(JSON.parse(readFileSync(file, 'utf8')).slides[0].spotsLeft, 3);
    assert.deepEqual(published, ['2026-11-21-first-mini']);
});

test('if the API is down, nothing is changed or published', async () => {
    const { file, before } = setup('2026-11-22');
    let rendered = false, published = false;
    const res = await refreshCounts({
        date: '2026-11-21', today: '2026-11-20', fetchImpl: fakeFetch(503, {}),
        render: async () => { rendered = true; return []; },
        publish: async () => { published = true; },
    });
    assert.equal(res.ok, false);
    assert.match(res.messages.join(' '), /availability unavailable/);
    assert.equal(readFileSync(file, 'utf8'), before);
    assert.equal(rendered, false);
    assert.equal(published, false);
});

test('a live-count date already past is skipped with a message', async () => {
    const { file, before } = setup('2026-11-22');
    const res = await refreshCounts({
        date: '2026-11-21', today: '2026-11-23', fetchImpl: fakeFetch(200, { days: {} }),
        render: async () => [], publish: async () => {},
    });
    assert.equal(res.ok, true);
    assert.match(res.messages.join(' '), /past date/);
    assert.equal(readFileSync(file, 'utf8'), before);
});

test('a day that sold out is not published: the caption needs re-approval', async () => {
    const { file, before } = setup('2026-11-22');
    let published = false;
    const res = await refreshCounts({
        date: '2026-11-21', today: '2026-11-20', fetchImpl: fakeFetch(200, { days: { '2026-11-22': [] } }),
        render: async () => [], publish: async () => { published = true; },
    });
    assert.equal(res.ok, false);
    assert.match(res.messages.join(' '), /sold out/i);
    assert.equal(published, false);
    assert.equal(readFileSync(file, 'utf8'), before);
});

test('a mini day happening today is not refreshed', async () => {
    const { file, before } = setup('2026-11-22');
    const res = await refreshCounts({
        date: '2026-11-22', today: '2026-11-22', fetchImpl: fakeFetch(200, { days: { '2026-11-22': ['5:00 pm'] } }),
        render: async () => [], publish: async () => { throw new Error('should not publish'); },
    });
    assert.match(res.messages.join(' '), /today|No scheduled/);
    assert.equal(readFileSync(file, 'utf8'), before);
});

test('same-day: a post dated the day before but refreshed on the mini day itself is skipped', async () => {
    const { file, before } = setup('2026-11-22');
    const res = await refreshCounts({
        date: '2026-11-21', today: '2026-11-22', fetchImpl: fakeFetch(200, { days: { '2026-11-22': ['5:00 pm'] } }),
        render: async () => [], publish: async () => { throw new Error('should not publish'); },
    });
    assert.match(res.messages.join(' '), /today/);
    assert.equal(readFileSync(file, 'utf8'), before);
});
