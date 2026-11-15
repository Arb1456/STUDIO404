import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { renderPost, closeBrowser } from '../lib/render.ts';
import { templateHtml, formatsFor } from '../lib/templates.ts';
import type { PostSpec } from '../lib/spec.ts';

after(() => closeBrowser());

/** Reads width/height from a PNG's IHDR chunk. */
const pngSize = (path: string) => {
    const b = readFileSync(path);
    return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
};

const spec = (over: Partial<PostSpec>): PostSpec => ({
    id: 'test-post',
    date: '2026-11-20',
    time: '19:00',
    job: 'book',
    template: 'testimonial',
    slides: [{ quote: 'Andre and his team are phenomenal.', name: 'Sam K.', role: 'Holiday session' }],
    caption: 'x',
    captionGoogle: 'x',
    status: 'draft',
    ...over,
});

test('a testimonial renders one 1080x1350 feed PNG', async () => {
    const out = mkdtempSync(join(tmpdir(), 'render-'));
    const files = await renderPost(spec({}), out);
    assert.equal(files.length, 1);
    assert.match(files[0], /test-post\/1-feed\.png$/);
    assert.deepEqual(pngSize(files[0]), { w: 1080, h: 1350 });
});

test('a mini-day card renders feed 1080x1350 and story 1080x1920', async () => {
    const out = mkdtempSync(join(tmpdir(), 'render-'));
    const files = await renderPost(
        spec({ id: 'mini', template: 'mini-day', slides: [{ dateLabel: 'Sun, Nov 22', hours: '2–6 pm', spotsLeft: 6, price: 125 }] }),
        out,
    );
    assert.deepEqual(files.map((f) => f.split('/').pop()), ['1-feed.png', '1-story.png']);
    assert.deepEqual(pngSize(files[0]), { w: 1080, h: 1350 });
    assert.deepEqual(pngSize(files[1]), { w: 1080, h: 1920 });
});

test('story format only for promo templates', () => {
    assert.deepEqual(formatsFor('testimonial'), ['feed']);
    assert.deepEqual(formatsFor('faq'), ['feed']);
    assert.deepEqual(formatsFor('mini-day'), ['feed', 'story']);
    assert.deepEqual(formatsFor('photo-band'), ['feed', 'story']);
    assert.deepEqual(formatsFor('truck'), ['feed', 'story']);
});

test('a sold-out mini day says Sold Out, never 0 spots', () => {
    const html = templateHtml('mini-day', { dateLabel: 'Sun, Nov 22', hours: '2–6 pm', spotsLeft: 'sold-out', price: 125 }, 'feed');
    assert.match(html, /Sold Out/);
    assert.doesNotMatch(html, /\b0 spots/i);
});

test('text that overflows its box fails the render, naming the post', async () => {
    const out = mkdtempSync(join(tmpdir(), 'render-'));
    await assert.rejects(
        renderPost(spec({ id: 'too-long', slides: [{ quote: 'This studio was wonderful. '.repeat(60), name: 'A B.' }] }), out),
        (e: Error) => /too-long/.test(e.message) && /overflow/.test(e.message),
    );
});

test('an image whose text would show NaN, undefined or null is never produced', async () => {
    const out = mkdtempSync(join(tmpdir(), 'render-'));
    await assert.rejects(
        renderPost(spec({ id: 'nan-card', template: 'mini-day', slides: [{ dateLabel: 'Sun, Nov 22', hours: '2 to 6 pm' }] }), out),
        (e: Error) => /nan-card/.test(e.message) && /NaN/.test(e.message),
    );
    await assert.rejects(
        renderPost(spec({ id: 'undef-card', slides: [{ quote: 'Great', name: 'undefined' }] }), out),
        (e: Error) => /undef-card/.test(e.message) && /undefined/.test(e.message),
    );
});
