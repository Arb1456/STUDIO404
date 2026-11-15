/**
 * Schedules approved posts for one week in GHL. Idempotent: specs that already carry
 * GHL post ids are updated, never re-created. Draft posts are never sent.
 *   IG + Facebook → one post ("social") with `caption`
 *   Google        → a separate post with `captionGoogle`, only for book/rent posts
 * Only feed images are posted; story-size images are for Stories and ads.
 */
import { writeFileSync } from 'node:fs';
import { loadSpecs, specPath, validateSpec, type PostSpec } from './spec.ts';
import { torontoToUtcIso } from './time.ts';
import { renderPost } from './render.ts';
import type { Ghl } from './ghl.ts';

export interface ScheduleOptions {
    week: string;
    ghl: Ghl;
    render?: (spec: PostSpec) => Promise<string[]>;
    log?: (msg: string) => void;
}

/** Uploads a spec's feed images and creates or updates its GHL posts. Returns the updated spec. */
export async function publishSpec(spec: PostSpec, files: string[], ghl: Ghl, accounts: Awaited<ReturnType<Ghl['listAccounts']>>): Promise<PostSpec> {
    const ids = (p: string) => accounts.filter((a) => a.platform === p).map((a) => a.id);
    const social = [...ids('instagram'), ...ids('facebook')];
    const google = ids('google');

    const mediaUrls: string[] = [];
    for (const f of files.filter((f) => f.endsWith('-feed.png'))) mediaUrls.push(await ghl.uploadMedia(f));

    const scheduleIso = torontoToUtcIso(spec.date, spec.time);
    const postIds = { ...(spec.ghl?.postIds ?? {}) };
    const targets: ['social' | 'google', string[], string][] = [['social', social, spec.caption]];
    if ((spec.job === 'book' || spec.job === 'rent') && spec.captionGoogle) targets.push(['google', google, spec.captionGoogle]);

    for (const [key, accountIds, summary] of targets) {
        const existing = postIds[key];
        if (existing) await ghl.updatePost(existing, { accountIds, summary, mediaUrls, scheduleIso });
        else postIds[key] = await ghl.createPost({ accountIds, summary, mediaUrls, scheduleIso });
    }
    return { ...spec, status: 'scheduled', ghl: { postIds, mediaUrls } };
}

export async function scheduleWeek(o: ScheduleOptions): Promise<{ scheduled: string[]; skipped: string[] }> {
    const log = o.log ?? (() => {});
    const specs = loadSpecs(o.week).filter((s) => s.status === 'approved' || s.status === 'scheduled');
    const skipped = loadSpecs(o.week).filter((s) => s.status === 'draft').map((s) => s.id);
    const accounts = await o.ghl.listAccounts();
    const scheduled: string[] = [];

    for (const spec of specs) {
        const errs = validateSpec(spec);
        if (errs.length) throw new Error(`${spec.id} is invalid, not scheduling: ${errs.join('; ')}`);
        const files = await (o.render ?? renderPost)(spec);
        const updated = await publishSpec(spec, files, o.ghl, accounts);
        writeFileSync(specPath(spec.id), JSON.stringify(updated, null, 2) + '\n');
        scheduled.push(spec.id);
        log(`✓ ${spec.id} → ${spec.date} ${spec.time} (${Object.keys(updated.ghl!.postIds).join(' + ')})`);
    }
    for (const id of skipped) log(`· ${id} is a draft, not sent`);
    return { scheduled, skipped };
}
