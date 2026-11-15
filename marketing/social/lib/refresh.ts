/**
 * Refreshes the "spots left" number on scheduled count posts (the evening before they go out).
 * Standing approval from André: only the number may change without re-approval.
 *
 * Safety order: every count is fetched first; if any fetch fails, nothing is written,
 * rendered or published, so the approved post stays exactly as it was.
 */
import { writeFileSync } from 'node:fs';
import { loadSpecs, specPath, type PostSpec } from './spec.ts';
import { getSpotsLeft } from './availability.ts';
import { renderPost } from './render.ts';

export interface RefreshOptions {
    /** Post date to refresh (YYYY-MM-DD). */
    date: string;
    /** Today in Toronto; live-count dates before this are skipped. */
    today: string;
    fetchImpl?: typeof fetch;
    render?: (spec: PostSpec) => Promise<string[]>;
    /** Uploads the new images and swaps them into the scheduled GHL post. */
    publish: (spec: PostSpec, files: string[]) => Promise<void>;
}

export async function refreshCounts(o: RefreshOptions): Promise<{ ok: boolean; messages: string[] }> {
    const messages: string[] = [];
    const targets = loadSpecs().filter((s) => s.date === o.date && s.liveCountDate && s.status === 'scheduled');
    if (!targets.length) return { ok: true, messages: [`No scheduled count posts on ${o.date}.`] };

    const counts = new Map<string, number | 'sold-out'>();
    for (const s of targets) {
        if (s.liveCountDate! < o.today) {
            messages.push(`${s.id}: skipped, ${s.liveCountDate} is a past date.`);
            continue;
        }
        try {
            counts.set(s.id, await getSpotsLeft(s.liveCountDate!, o.fetchImpl));
        } catch (e) {
            messages.push(`${s.id}: ${(e as Error).message}. Left unchanged.`);
            return { ok: false, messages };
        }
    }

    for (const s of targets.filter((t) => counts.has(t.id))) {
        const spots = counts.get(s.id)!;
        const updated: PostSpec = { ...s, slides: s.slides.map((sl, i) => (i === 0 ? { ...sl, spotsLeft: spots } : sl)) };
        const files = await (o.render ?? renderPost)(updated);
        await o.publish(updated, files);
        writeFileSync(specPath(s.id), JSON.stringify(updated, null, 2) + '\n');
        messages.push(`${s.id}: now shows ${spots === 'sold-out' ? 'Sold Out' : `${spots} spots left`}.`);
    }
    return { ok: true, messages };
}
