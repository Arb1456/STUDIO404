import { NextResponse } from 'next/server';
import { HOLIDAY_OFFERS, MINI_DAYS } from '@/lib/holiday';

/**
 * Live Holiday Mini availability from GHL, for the clickable day list on /holiday-minis.
 * Returns { days: { 'YYYY-MM-DD': ['2:00 pm', ...] } }. Only open (unbooked, future) slots.
 *
 * Fixed to the mini calendar on purpose: the token stays server-side and this route
 * can't be used to read any other calendar. GHL caps one request at 31 days; the
 * mini season (first to last MINI_DAYS date) fits in one.
 */

/** Re-fetch from GHL at most once a minute (ISR); every visitor in between gets the cached copy. */
export const revalidate = 60;

const TZ = 'America/Toronto';

/** Midnight / end-of-day in Toronto as epoch ms. -05:00 is correct for all of Nov 22 – Dec 21 (EST). */
const torontoMs = (isoDate: string, time: string) => new Date(`${isoDate}T${time}-05:00`).getTime();

/** "2026-11-22T14:45:00-05:00" → "2:45 pm" (reads the wall-clock time GHL already localized). */
function formatSlot(iso: string): string {
    const [h, m] = iso.slice(11, 16).split(':').map(Number);
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${String(m).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`;
}

type GhlFreeSlots = Record<string, { slots?: string[] } | string>;

export async function GET() {
    const token = process.env.GHL_PRIVATE_TOKEN;
    if (!token) return NextResponse.json({ error: 'Availability unavailable' }, { status: 503 });

    const first = MINI_DAYS[0].date;
    const last = MINI_DAYS[MINI_DAYS.length - 1].date;
    const url =
        `https://services.leadconnectorhq.com/calendars/${HOLIDAY_OFFERS.mini.calendarId}/free-slots` +
        `?startDate=${torontoMs(first, '00:00:00')}&endDate=${torontoMs(last, '23:59:59')}&timezone=${TZ}`;

    try {
        const res = await fetch(url, {
            headers: { Authorization: `Bearer ${token}`, Version: '2021-04-15' },
            // Cache for a minute: fresh enough that a just-booked slot drops off quickly,
            // without calling GHL on every page view.
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error(`GHL ${res.status}`);
        const data: GhlFreeSlots = await res.json();

        const days: Record<string, string[]> = {};
        for (const { date } of MINI_DAYS) {
            const entry = data[date];
            days[date] = typeof entry === 'object' && entry.slots ? entry.slots.map(formatSlot) : [];
        }

        return NextResponse.json(
            { days },
            { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
        );
    } catch (err) {
        console.error('holiday-availability:', err);
        // The page falls back to the hand-entered spotsLeft numbers.
        return NextResponse.json({ error: 'Availability unavailable' }, { status: 502 });
    }
}
