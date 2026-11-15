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
    /** Uploads the new images and swaps ONLY the images into the scheduled GHL posts. */
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
        if (s.liveCountDate === o.today) {
            // Mid-day the feed only lists the remaining times, so the count would look lower than intended.
            messages.push(`${s.id}: skipped, ${s.liveCountDate} is today. Refresh runs the evening before.`);
            continue;
        }
        try {
            const spots = await getSpotsLeft(s.liveCountDate!, o.fetchImpl);
            if (spots === 'sold-out') {
                // The approved caption invites people to book; a Sold Out card would contradict it.
                messages.push(`${s.id}: ${s.liveCountDate} is sold out. Left unchanged: the caption needs André's re-approval (e.g. switch to a waitlist message).`);
                return { ok: false, messages };
            }
            counts.set(s.id, spots);
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
