/** Live Holiday Mini spots from the website (which reads GHL). Same numbers visitors see. */

export const AVAILABILITY_URL = 'https://www.thestudio404.ca/api/holiday-availability';

export async function getSpotsLeft(date: string, fetchImpl: typeof fetch = fetch): Promise<number | 'sold-out'> {
    let res: Response;
    try {
        res = await fetchImpl(AVAILABILITY_URL, { headers: { 'cache-control': 'no-cache' } });
    } catch (e) {
        throw new Error(`availability unavailable (${(e as Error).message})`);
    }
    if (!res.ok) throw new Error(`availability unavailable (HTTP ${res.status})`);
    const body = (await res.json()) as { days?: Record<string, string[]> };
    const slots = body.days?.[date];
    if (!Array.isArray(slots)) throw new Error(`${date} is not a mini day in the availability feed`);
    return slots.length === 0 ? 'sold-out' : slots.length;
}

/** Today's date in Toronto, YYYY-MM-DD. */
export const torontoToday = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Toronto' });
