/**
 * Ad attribution that survives the GHL booking calendar opening in a new tab.
 *
 * On landing we store the visit's utm_* / fbclid / gclid (30 days, last non-empty
 * campaign wins). Every calendar link then gets them appended, so GHL records the
 * real source on the contact instead of "Direct traffic".
 * The calendar must keep opening in a new tab (André, Nov 26: Stripe Link and
 * Apple Pay break inside an iframe), so this is how the source carries over.
 */

const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'] as const;
const STORAGE_KEY = 's404_attribution';
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

type Attribution = Partial<Record<(typeof KEYS)[number], string>>;

/** Call once per page load. Only overwrites what's stored when the URL carries campaign params. */
export function captureAttribution() {
    if (typeof window === 'undefined') return;
    try {
        const params = new URLSearchParams(window.location.search);
        const found: Attribution = {};
        for (const k of KEYS) {
            const v = params.get(k);
            if (v) found[k] = v.slice(0, 200);
        }
        if (Object.keys(found).length === 0) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ at: Date.now(), params: found }));
    } catch {
        // Private mode / storage blocked: attribution just isn't carried over.
    }
}

function storedAttribution(): Attribution {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        const { at, params } = JSON.parse(raw) as { at: number; params: Attribution };
        if (Date.now() - at > TTL_MS) {
            localStorage.removeItem(STORAGE_KEY);
            return {};
        }
        return params ?? {};
    } catch {
        return {};
    }
}

/** Append the stored campaign params to a booking calendar URL (params already on the URL win). */
export function withAttribution(url: string): string {
    if (typeof window === 'undefined') return url;
    const stored = storedAttribution();
    if (Object.keys(stored).length === 0) return url;
    try {
        const u = new URL(url);
        for (const [k, v] of Object.entries(stored)) {
            if (v && !u.searchParams.has(k)) u.searchParams.set(k, v);
        }
        return u.toString();
    } catch {
        return url;
    }
}

/** Open a GHL booking calendar in its own tab, carrying the visit's ad attribution. */
export function openCalendarTab(url: string) {
    window.open(withAttribution(url), '_blank', 'noopener,noreferrer');
}
