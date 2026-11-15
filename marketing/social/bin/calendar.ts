/** npm run social:calendar  → rewrites marketing/social/calendar.md from the specs. */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadSpecs, SOCIAL_ROOT } from '../lib/spec.ts';
import { buildCalendar } from '../lib/calendar.ts';

const path = join(SOCIAL_ROOT, 'calendar.md');
const specs = loadSpecs();
writeFileSync(path, buildCalendar(specs));
console.log(`✓ calendar.md: ${specs.length} post(s)`);
