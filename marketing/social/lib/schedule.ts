/**
 * Schedules approved posts for one week in GHL.
 *   IG + Facebook → one post ("social") with `caption`
 *   Google        → a separate post with `captionGoogle`, only for book/rent posts
 * Only feed images are posted; story-size images are for Stories and ads.
 *
 * Approval guarantees:
 *   - Only `approved` specs are sent. `scheduled` ones are left alone until André re-approves
 *     an edit (status back to `approved`), which then updates the GHL posts in place.
 *   - A `draft` that still has GHL post ids stops the run: un-approving must not leave it live.
 *   - Every spec is validated before anything is sent.
 *   - Posts whose time has already passed are skipped.
 *   - GHL ids are saved after every create, so a failure halfway never causes a duplicate.
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
    /** Defaults to the current time; injectable for tests. */
    now?: Date;
}

type Accounts = Awaited<ReturnType<Ghl['listAccounts']>>;

const save = (spec: PostSpec) => writeFileSync(specPath(spec.id), JSON.stringify(spec, null, 2) + '\n');

async function uploadFeeds(files: string[], ghl: Ghl): Promise<string[]> {
    const urls: string[] = [];
    for (const f of files.filter((f) => f.endsWith('-feed.png'))) urls.push(await ghl.uploadMedia(f));
    return urls;
}

/**
 * Uploads a spec's feed images and creates or updates its GHL posts. `onProgress` is called
 * with the spec after each create, so ids survive a later failure.
 */
export async function publishSpec(spec: PostSpec, files: string[], ghl: Ghl, accounts: Accounts, onProgress: (s: PostSpec) => void = () => {}): Promise<PostSpec> {
    const ids = (p: string) => accounts.filter((a) => a.platform === p).map((a) => a.id);
    const mediaUrls = await uploadFeeds(files, ghl);
    const scheduleIso = torontoToUtcIso(spec.date, spec.time);

    const targets: ['social' | 'google', string[], string][] = [['social', [...ids('instagram'), ...ids('facebook')], spec.caption]];
    if ((spec.job === 'book' || spec.job === 'rent') && spec.captionGoogle) targets.push(['google', ids('google'), spec.captionGoogle]);

    let current: PostSpec = { ...spec, ghl: { postIds: { ...(spec.ghl?.postIds ?? {}) }, mediaUrls } };
    for (const [key, accountIds, summary] of targets) {
        const existing = current.ghl!.postIds[key];
        if (existing) {
            await ghl.updatePost(existing, { accountIds, summary, mediaUrls, scheduleIso });
        } else {
            const id = await ghl.createPost({ accountIds, summary, mediaUrls, scheduleIso });
            current = { ...current, ghl: { ...current.ghl!, postIds: { ...current.ghl!.postIds, [key]: id } } };
            onProgress(current);
        }
    }
    return { ...current, status: 'scheduled' };
}

/**
 * Count refresh (standing approval: only the number may change). Uploads the new images and
 * swaps them into the existing GHL posts; caption and time are not sent.
 */
export async function swapMedia(spec: PostSpec, files: string[], ghl: Ghl): Promise<PostSpec> {
    const postIds = Object.values(spec.ghl?.postIds ?? {}).filter(Boolean) as string[];
    if (!postIds.length) throw new Error(`${spec.id} has no GHL posts to update`);
    const mediaUrls = await uploadFeeds(files, ghl);
    for (const id of postIds) await ghl.updatePost(id, { mediaUrls });
    return { ...spec, ghl: { postIds: spec.ghl!.postIds, mediaUrls } };
}

export async function scheduleWeek(o: ScheduleOptions): Promise<{ scheduled: string[]; skipped: string[] }> {
    const log = o.log ?? (() => {});
    const now = (o.now ?? new Date()).getTime();
    const week = loadSpecs(o.week);

    // Checks that must pass before anything is sent.
    const problems: string[] = [];
    for (const s of week) {
        if (s.status === 'draft' && Object.values(s.ghl?.postIds ?? {}).some(Boolean)) {
            problems.push(`${s.id} is a draft but still scheduled in GHL (ids ${Object.values(s.ghl!.postIds).join(', ')}). Delete it in GHL or re-approve it.`);
        }
        if (s.status === 'approved') problems.push(...validateSpec(s).map((e) => `${s.id}: ${e}`));
    }
    if (problems.length) throw new Error(`Nothing sent:\n  ${problems.join('\n  ')}`);

    const accounts = await o.ghl.listAccounts();
    const scheduled: string[] = [];
    const skipped: string[] = [];

    for (const spec of week) {
        if (spec.status !== 'approved') {
            skipped.push(spec.id);
            log(`· ${spec.id} is ${spec.status}, not sent`);
            continue;
        }
        if (new Date(torontoToUtcIso(spec.date, spec.time)).getTime() <= now) {
            skipped.push(spec.id);
            log(`· ${spec.id} time has passed, not sent`);
            continue;
        }
        const files = await (o.render ?? renderPost)(spec);
        const updated = await publishSpec(spec, files, o.ghl, accounts, save);
        save(updated);
        scheduled.push(spec.id);
        log(`✓ ${spec.id} → ${spec.date} ${spec.time} (${Object.keys(updated.ghl!.postIds).join(' + ')})`);
    }
    return { scheduled, skipped };
}
