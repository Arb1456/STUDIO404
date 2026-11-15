/**
 * Post specs: one JSON file per post in marketing/social/posts/.
 * See docs/superpowers/specs/2026-11-15-christmas-social-design.md.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export type Template = 'testimonial' | 'photo-band' | 'carousel' | 'mini-day' | 'truck' | 'faq';
export type Job = 'book' | 'rent' | 'share' | 'mixed';

export interface PostSpec {
    /** "<date>-<slug>", same as the filename without .json */
    id: string;
    /** YYYY-MM-DD */
    date: string;
    /** HH:MM, America/Toronto */
    time: string;
    job: Job;
    template: Template;
    /** Template data. More than one only for carousels. */
    slides: Record<string, unknown>[];
    /** Instagram + Facebook caption */
    caption: string;
    /** Google Business Profile caption; required for book/rent posts */
    captionGoogle?: string;
    /** Mini date whose live spots-left count goes on the image */
    liveCountDate?: string;
    status: 'draft' | 'approved' | 'scheduled' | 'posted';
    ghl?: { postIds: Partial<Record<'social' | 'google', string>>; mediaUrls: string[] };
}

export const TEMPLATES: Template[] = ['testimonial', 'photo-band', 'carousel', 'mini-day', 'truck', 'faq'];
export const WINDOW = { start: '2026-11-16', end: '2026-12-21' };

const HERE = dirname(fileURLToPath(import.meta.url));
export const SOCIAL_ROOT = join(HERE, '..');
export const postsDir = () => process.env.SOCIAL_POSTS_DIR ?? join(SOCIAL_ROOT, 'posts');

const hashtagCount = (s: string) => (s.match(/(^|\s)#\w+/g) ?? []).length;

/** Collects every string inside the slides, for copy-rule checks. */
const slideText = (slides: PostSpec['slides']): string =>
    JSON.stringify(slides, (_k, v) => v).replace(/\\n/g, ' ');

/** Returns human-readable problems; [] means the spec is valid. */
export function validateSpec(s: PostSpec): string[] {
    const errs: string[] = [];
    if (!TEMPLATES.includes(s.template)) errs.push(`unknown template "${s.template}"`);
    if (s.slides.length > 1 && s.template !== 'carousel') errs.push('only a carousel can have more than one slide');
    if (s.slides.length === 0) errs.push('at least one slide is required');
    if (s.date < WINDOW.start || s.date > WINDOW.end) errs.push(`date ${s.date} is outside window ${WINDOW.start}..${WINDOW.end}`);
    if (!/^\d{2}:\d{2}$/.test(s.time)) errs.push(`time "${s.time}" must be HH:MM`);

    for (const [where, text] of [['caption', s.caption], ['captionGoogle', s.captionGoogle ?? ''], ['slides', slideText(s.slides)]] as const) {
        if (text.includes('—')) errs.push(`em dash in ${where} (copy rule: no em dashes)`);
    }
    if (s.caption.length > 2200) errs.push(`caption is ${s.caption.length} chars (Instagram max 2200)`);
    if (hashtagCount(s.caption) > 30) errs.push('caption has more than 30 hashtags (Instagram max 30 hashtags)');

    // Stand-in photos (e.g. last year's set) are fine in a draft but must be replaced before approval.
    if (s.status !== 'draft' && s.slides.some((sl) => sl.standIn === true)) {
        errs.push('has a stand-in photo: replace it before approving (slide marked standIn)');
    }

    if (s.template === 'mini-day') {
        for (const [i, sl] of s.slides.entries()) {
            const n = sl.spotsLeft;
            if (!(n === 'sold-out' || (Number.isInteger(n) && (n as number) >= 0))) {
                errs.push(`slide ${i + 1}: spotsLeft must be a whole number of 0 or more, or "sold-out" (got ${JSON.stringify(n)})`);
            }
            for (const k of ['dateLabel', 'hours']) if (!sl[k]) errs.push(`slide ${i + 1}: ${k} is required on a mini-day card`);
        }
    }

    if (s.job === 'book' || s.job === 'rent') {
        if (!s.captionGoogle) errs.push('captionGoogle is required for book/rent posts');
    }
    if (s.captionGoogle) {
        if (hashtagCount(s.captionGoogle) > 0) errs.push('captionGoogle has hashtags (no hashtags on Google)');
        if (s.captionGoogle.length > 1500) errs.push(`captionGoogle is ${s.captionGoogle.length} chars (Google max 1500)`);
    }
    return errs;
}

/** Adds days to a YYYY-MM-DD date (UTC arithmetic; dates only). */
export function addDays(date: string, n: number): string {
    const d = new Date(`${date}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
}

/** All specs, or only the 7 days starting at `week` (a Monday), sorted by date then id. */
export function loadSpecs(week?: string): PostSpec[] {
    const dir = postsDir();
    const specs = readdirSync(dir)
        .filter((f) => f.endsWith('.json'))
        .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')) as PostSpec);
    const inWeek = week ? specs.filter((s) => s.date >= week && s.date <= addDays(week, 6)) : specs;
    return inWeek.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}

/** Path of a spec's JSON file. */
export const specPath = (id: string) => join(postsDir(), `${id}.json`);
