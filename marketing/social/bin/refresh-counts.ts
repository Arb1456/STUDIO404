/**
 * npm run social:refresh [-- YYYY-MM-DD]   (default: tomorrow, Toronto)
 * Run the evening before: updates the live "spots left" number on that day's scheduled
 * count posts and swaps the new image into GHL. If the website's availability feed is
 * down, nothing changes and this exits 1.
 */
import { refreshCounts } from '../lib/refresh.ts';
import { torontoToday } from '../lib/availability.ts';
import { addDays } from '../lib/spec.ts';
import { ghlFromEnv } from '../lib/ghl.ts';
import { publishSpec } from '../lib/schedule.ts';
import { closeBrowser } from '../lib/render.ts';

const today = torontoToday();
const date = process.argv[2] ?? addDays(today, 1);
const ghl = ghlFromEnv();
const accounts = await ghl.listAccounts();

try {
    const res = await refreshCounts({
        date,
        today,
        publish: async (spec, files) => {
            await publishSpec(spec, files, ghl, accounts);
        },
    });
    res.messages.forEach((m) => console.log(m));
    process.exitCode = res.ok ? 0 : 1;
} finally {
    await closeBrowser();
}
