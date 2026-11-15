import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildCalendar } from '../lib/calendar.ts';
import type { PostSpec } from '../lib/spec.ts';

const s = (date: string, headline: string, status: PostSpec['status'], template: PostSpec['template'] = 'photo-band'): PostSpec => ({
    id: `${date}-x`, date, time: '19:00', job: 'book', template,
    slides: [{ headline }], caption: 'x', captionGoogle: 'x', status,
});

test('calendar rows are sorted by date with day names, template, headline and status', () => {
    const md = buildCalendar([s('2026-11-18', 'Holiday Minis\n*Are Open*', 'draft'), s('2026-11-16', 'Studio 404 Is Back', 'approved')]);
    const rows = md.split('\n').filter((l) => l.startsWith('| 2026'));
    assert.equal(rows.length, 2);
    assert.match(rows[0], /^\| 2026-11-16 \| Mon \| book \| photo-band \| Studio 404 Is Back \| approved \|$/);
    assert.match(rows[1], /^\| 2026-11-18 \| Wed \| book \| photo-band \| Holiday Minis Are Open \| draft \|$/);
});

test('a clipped quote drops trailing punctuation before the ellipsis', () => {
    const t = s('2026-11-20', '', 'draft', 'testimonial');
    t.slides = [{ quote: 'Andre and his team are phenomenal. They were great.', name: 'Sam K.' }];
    assert.match(buildCalendar([t]), /“Andre and his team are phenomenal…”/);
});

test('headline falls back to quote, question or date label', () => {
    const t = s('2026-11-20', '', 'draft', 'testimonial');
    t.slides = [{ quote: 'Andre and his team are phenomenal and kind and fast', name: 'Sam K.' }];
    assert.match(buildCalendar([t]), /\| “Andre and his team are phenomenal…” \(Sam K\.\) \|/);
});
