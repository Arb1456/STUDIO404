/** Wall-clock time in Toronto → UTC ISO string (handles EST/EDT via Intl). */
export function torontoToUtcIso(date: string, time: string): string {
    const asUtc = new Date(`${date}T${time}:00Z`);
    // What Toronto's clock reads at that UTC instant tells us the offset for that date.
    const parts = Object.fromEntries(
        new Intl.DateTimeFormat('en-CA', {
            timeZone: 'America/Toronto', hourCycle: 'h23',
            year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
        }).formatToParts(asUtc).map((p) => [p.type, p.value]),
    );
    const torontoAsUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
    const offsetMs = asUtc.getTime() - torontoAsUtc;
    return new Date(asUtc.getTime() + offsetMs).toISOString();
}
