import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateSpec, loadSpecs, type PostSpec } from '../lib/spec.ts';

const base = (over: Partial<PostSpec> = {}): PostSpec => ({
    id: '2026-11-18-minis-open',
    date: '2026-11-18',
    time: '19:00',
    job: 'book',
    template: 'photo-band',
    slides: [{ image: 'x.jpg', headline: 'Holiday Minis Are Open' }],
    caption: 'Holiday Minis are open. Link in bio.\n#ottawaphotographer',
    captionGoogle: 'Holiday Minis are open. Book on our site.',
    status: 'draft',
    ...over,
});

const has = (errs: string[], needle: string) => assert.ok(errs.some((e) => e.includes(needle)), `expected "${needle}" in ${JSON.stringify(errs)}`);

test('a valid spec has no errors', () => {
    assert.deepEqual(validateSpec(base()), []);
});

test('an em dash in the caption is rejected', () => {
    has(validateSpec(base({ caption: 'Minis are open — book now' })), 'em dash');
});

test('an em dash in slide text is rejected', () => {
    has(validateSpec(base({ slides: [{ headline: 'Open — Now' }] })), 'em dash');
});

test('dates outside Nov 16 – Dec 21 are rejected', () => {
    has(validateSpec(base({ date: '2026-11-15' })), 'outside window');
    has(validateSpec(base({ date: '2026-12-22' })), 'outside window');
});

test('book/rent posts need a Google caption without hashtags', () => {
    has(validateSpec(base({ captionGoogle: undefined })), 'captionGoogle');
    has(validateSpec(base({ captionGoogle: 'Book now #ottawa' })), 'no hashtags on Google');
});

test('Google caption over 1500 chars is rejected', () => {
    has(validateSpec(base({ captionGoogle: 'a'.repeat(1501) })), '1500');
});

test('max 30 hashtags and 2200 chars on Instagram', () => {
    const tags = Array.from({ length: 31 }, (_, i) => `#t${i}`).join(' ');
    has(validateSpec(base({ caption: tags })), 'max 30 hashtags');
    has(validateSpec(base({ caption: 'a'.repeat(2201) })), '2200');
});

test('unknown template and multi-slide non-carousel are rejected', () => {
    has(validateSpec(base({ template: 'poster' as PostSpec['template'] })), 'template');
    has(validateSpec(base({ slides: [{}, {}] })), 'carousel');
});

test('loadSpecs returns only the given week, sorted by date', () => {
    const dir = mkdtempSync(join(tmpdir(), 'posts-'));
    for (const d of ['2026-11-23', '2026-11-19', '2026-11-16', '2026-11-22']) {
        writeFileSync(join(dir, `${d}-x.json`), JSON.stringify(base({ id: `${d}-x`, date: d })));
    }
    process.env.SOCIAL_POSTS_DIR = dir;
    assert.deepEqual(loadSpecs('2026-11-16').map((s) => s.date), ['2026-11-16', '2026-11-19', '2026-11-22']);
    assert.equal(loadSpecs().length, 4);
    delete process.env.SOCIAL_POSTS_DIR;
});
