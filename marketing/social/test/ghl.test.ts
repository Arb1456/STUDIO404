import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { torontoToUtcIso } from '../lib/time.ts';
import { makeGhl } from '../lib/ghl.ts';
import { scheduleWeek, swapMedia } from '../lib/schedule.ts';
import type { PostSpec } from '../lib/spec.ts';

test('19:00 Toronto on Nov 16 is midnight UTC on Nov 17', () => {
    assert.equal(torontoToUtcIso('2026-11-16', '19:00'), '2026-11-17T00:00:00.000Z');
    assert.equal(torontoToUtcIso('2026-12-21', '09:30'), '2026-12-21T14:30:00.000Z');
});

/** Records every request and answers like GHL. */
const recorder = () => {
    const calls: { method: string; url: string; headers: Record<string, string>; body: any }[] = [];
    let n = 0;
    const fetchImpl = (async (url: string, init: RequestInit = {}) => {
        const body = typeof init.body === 'string' ? JSON.parse(init.body) : init.body;
        calls.push({ method: init.method ?? 'GET', url: String(url), headers: init.headers as Record<string, string>, body });
        if (String(url).endsWith('/accounts')) {
            return Response.json({ results: { accounts: [
                { id: 'ig1', platform: 'instagram', name: 'studio404inc' },
                { id: 'fb1', platform: 'facebook', name: 'Studio 404' },
                { id: 'g1', platform: 'google', name: 'Studio 404' },
            ] } });
        }
        if (String(url).endsWith('/medias/upload-file')) return Response.json({ fileId: `f${++n}`, url: `https://cdn/x${n}.png` });
        if (init.method === 'POST') return Response.json({ results: { post: { _id: `post${++n}` } } });
        return Response.json({ success: true });
    }) as typeof fetch;
    return { calls, ghl: makeGhl({ token: 't', locationId: 'loc', userId: 'u1', fetchImpl }) };
};

test('createPost sends the 2021-07-28 version, scheduled status, userId and png media', async () => {
    const { calls, ghl } = recorder();
    const id = await ghl.createPost({ accountIds: ['ig1'], summary: 'Hi', mediaUrls: ['https://cdn/a.png'], scheduleIso: '2026-11-17T00:00:00.000Z' });
    assert.match(id, /^post/);
    const c = calls[0];
    assert.equal(c.method, 'POST');
    assert.equal(c.url, 'https://services.leadconnectorhq.com/social-media-posting/loc/posts');
    assert.equal(c.headers.Version, '2021-07-28');
    assert.equal(c.body.status, 'scheduled');
    assert.equal(c.body.userId, 'u1');
    assert.equal(c.body.scheduleDate, '2026-11-17T00:00:00.000Z');
    assert.deepEqual(c.body.media, [{ url: 'https://cdn/a.png', type: 'image/png' }]);
});

const spec = (over: Partial<PostSpec>): PostSpec => ({
    id: '2026-11-18-minis-open', date: '2026-11-18', time: '19:00', job: 'book', template: 'photo-band',
    slides: [{ image: 'x.jpg', headline: 'Open' }], caption: 'IG caption', captionGoogle: 'Google caption',
    status: 'approved', ...over,
});

const posts = (...specs: PostSpec[]) => {
    const dir = mkdtempSync(join(tmpdir(), 'sched-'));
    for (const s of specs) writeFileSync(join(dir, `${s.id}.json`), JSON.stringify(s));
    process.env.SOCIAL_POSTS_DIR = dir;
    return dir;
};
const NOW = new Date('2026-11-15T12:00:00Z');
const fakeRender = async () => ['/tmp/1-feed.png', '/tmp/1-story.png'];

test('scheduling creates once, writes ids back, and re-runs only update', async () => {
    const dir = posts(spec({}), spec({ id: '2026-11-19-draft', date: '2026-11-19', status: 'draft' }));
    const { calls, ghl } = recorder();
    const upload = async () => 'https://cdn/feed.png';

    await scheduleWeek({ week: '2026-11-16', ghl: { ...ghl, uploadMedia: upload }, render: fakeRender, now: NOW });
    const creates = calls.filter((c) => c.method === 'POST' && c.url.endsWith('/posts'));
    assert.equal(creates.length, 2, 'one IG+FB post and one Google post');
    assert.deepEqual(creates[0].body.accountIds, ['ig1', 'fb1']);
    assert.equal(creates[0].body.summary, 'IG caption');
    assert.deepEqual(creates[1].body.accountIds, ['g1']);
    assert.equal(creates[1].body.summary, 'Google caption');

    const saved = JSON.parse(readFileSync(join(dir, '2026-11-18-minis-open.json'), 'utf8')) as PostSpec;
    assert.equal(saved.status, 'scheduled');
    assert.ok(saved.ghl?.postIds.social && saved.ghl?.postIds.google);
    assert.equal(JSON.parse(readFileSync(join(dir, '2026-11-19-draft.json'), 'utf8')).status, 'draft');

    // Re-run without re-approval: already-scheduled posts are left alone (no silent re-push).
    calls.length = 0;
    await scheduleWeek({ week: '2026-11-16', ghl: { ...ghl, uploadMedia: upload }, render: fakeRender, now: NOW });
    assert.equal(calls.filter((c) => c.method === 'POST' && c.url.endsWith('/posts')).length, 0, 'no duplicate posts');
    assert.equal(calls.filter((c) => c.method === 'PUT').length, 0, 'scheduled posts are not re-pushed');

    // Re-approved after an edit: updated in place, never re-created.
    writeFileSync(join(dir, '2026-11-18-minis-open.json'), JSON.stringify({ ...saved, status: 'approved', caption: 'Edited' }));
    calls.length = 0;
    await scheduleWeek({ week: '2026-11-16', ghl: { ...ghl, uploadMedia: upload }, render: fakeRender, now: NOW });
    assert.equal(calls.filter((c) => c.method === 'POST' && c.url.endsWith('/posts')).length, 0);
    assert.equal(calls.filter((c) => c.method === 'PUT').length, 2);
});

test('if Google fails after IG/FB was created, the IG/FB id is saved so a re-run does not duplicate it', async () => {
    const dir = posts(spec({}));
    const { calls, ghl } = recorder();
    let failGoogle = true;
    const flaky = { ...ghl, uploadMedia: async () => 'https://cdn/f.png',
        createPost: async (p: Parameters<typeof ghl.createPost>[0]) => {
            if (p.accountIds.includes('g1') && failGoogle) throw new Error('GHL 500');
            return ghl.createPost(p);
        } };
    await assert.rejects(scheduleWeek({ week: '2026-11-16', ghl: flaky, render: fakeRender }), /GHL 500/);
    const partial = JSON.parse(readFileSync(join(dir, '2026-11-18-minis-open.json'), 'utf8')) as PostSpec;
    assert.ok(partial.ghl?.postIds.social, 'social id persisted');
    assert.equal(partial.status, 'approved', 'not marked scheduled until every platform is done');

    failGoogle = false;
    calls.length = 0;
    await scheduleWeek({ week: '2026-11-16', ghl: flaky, render: fakeRender, now: NOW });
    const creates = calls.filter((c) => c.method === 'POST' && c.url.endsWith('/posts'));
    assert.equal(creates.length, 1, 'only Google is created on the re-run');
    assert.deepEqual(creates[0].body.accountIds, ['g1']);
});

test('a draft that still has GHL posts stops the run before anything is sent', async () => {
    posts(spec({ id: '2026-11-17-ok', date: '2026-11-17' }), spec({ status: 'draft', ghl: { postIds: { social: 'p9' }, mediaUrls: [] } }));
    const { calls, ghl } = recorder();
    await assert.rejects(scheduleWeek({ week: '2026-11-16', ghl, render: fakeRender }), /2026-11-18-minis-open.*still scheduled in GHL/);
    assert.equal(calls.filter((c) => c.method !== 'GET').length, 0);
});

test('an invalid spec stops the run before anything is sent', async () => {
    posts(spec({ id: '2026-11-17-ok', date: '2026-11-17' }), spec({ caption: 'bad — dash' }));
    const { calls, ghl } = recorder();
    await assert.rejects(scheduleWeek({ week: '2026-11-16', ghl, render: fakeRender }), /em dash/);
    assert.equal(calls.filter((c) => c.method !== 'GET').length, 0);
});

test('approved posts whose time has passed are skipped, not re-sent', async () => {
    posts(spec({ ghl: { postIds: { social: 'p1', google: 'p2' }, mediaUrls: [] } }));
    const { calls, ghl } = recorder();
    const res = await scheduleWeek({ week: '2026-11-16', ghl, render: fakeRender, now: new Date('2026-11-19T12:00:00Z') });
    assert.deepEqual(res.scheduled, []);
    assert.equal(calls.filter((c) => c.method !== 'GET').length, 0);
});

test('swapMedia replaces only the images on existing posts', async () => {
    const { calls, ghl } = recorder();
    await swapMedia(spec({ ghl: { postIds: { social: 'p1', google: 'p2' }, mediaUrls: [] } }), ['/tmp/1-feed.png', '/tmp/1-story.png'], { ...ghl, uploadMedia: async () => 'https://cdn/new.png' });
    const puts = calls.filter((c) => c.method === 'PUT');
    assert.equal(puts.length, 2);
    for (const p of puts) {
        assert.deepEqual(p.body.media, [{ url: 'https://cdn/new.png', type: 'image/png' }]);
        assert.equal(p.body.summary, undefined, 'caption untouched');
        assert.equal(p.body.scheduleDate, undefined, 'time untouched');
    }
});

test('share posts are not sent to Google, and only feed images are uploaded', async () => {
    posts(spec({ job: 'share', captionGoogle: undefined }));
    const { calls, ghl } = recorder();
    const uploaded: string[] = [];
    await scheduleWeek({ week: '2026-11-16', ghl: { ...ghl, uploadMedia: async (p) => { uploaded.push(p); return 'https://cdn/u.png'; } }, render: fakeRender, now: NOW });
    const creates = calls.filter((c) => c.method === 'POST' && c.url.endsWith('/posts'));
    assert.equal(creates.length, 1);
    assert.deepEqual(creates[0].body.accountIds, ['ig1', 'fb1']);
    assert.deepEqual(uploaded, ['/tmp/1-feed.png']);
});
