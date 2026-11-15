/**
 * npm run social:schedule -- 2026-11-16
 * Uploads and schedules every APPROVED post that week in GHL (drafts are never sent).
 * Safe to re-run: already-scheduled posts are updated, not duplicated.
 */
import { ghlFromEnv } from '../lib/ghl.ts';
import { scheduleWeek } from '../lib/schedule.ts';
import { closeBrowser } from '../lib/render.ts';

const week = process.argv[2];
if (!/^\d{4}-\d{2}-\d{2}$/.test(week ?? '')) {
    console.error('Usage: npm run social:schedule -- <monday YYYY-MM-DD>');
    process.exit(1);
}
try {
    const { scheduled } = await scheduleWeek({ week, ghl: ghlFromEnv(), log: console.log });
    console.log(`Done: ${scheduled.length} post(s) scheduled for the week of ${week}.`);
} catch (e) {
    console.error(`✗ ${(e as Error).message}`);
    process.exitCode = 1;
} finally {
    await closeBrowser();
}
