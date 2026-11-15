/**
 * Render posts to PNG.
 *   npm run social:render -- 2026-11-18-minis-open      one post by id
 *   npm run social:render -- --week 2026-11-16          every post that week
 *   npm run social:render -- path/to/spec.json          a spec file anywhere
 */
import { readFileSync } from 'node:fs';
import { loadSpecs, specPath, validateSpec, type PostSpec } from '../lib/spec.ts';
import { renderPost, closeBrowser } from '../lib/render.ts';

const args = process.argv.slice(2);
const specs: PostSpec[] =
    args[0] === '--week'
        ? loadSpecs(args[1])
        : args.map((a) => JSON.parse(readFileSync(a.endsWith('.json') ? a : specPath(a), 'utf8')) as PostSpec);

if (!specs.length) {
    console.error('Nothing to render. Pass post ids, spec paths, or --week <monday>.');
    process.exit(1);
}

let failed = false;
for (const spec of specs) {
    const errs = validateSpec(spec);
    if (errs.length) console.warn(`! ${spec.id}: ${errs.join('; ')}`);
    try {
        const files = await renderPost(spec);
        console.log(`✓ ${spec.id}: ${files.length} image(s)`);
    } catch (e) {
        failed = true;
        console.error(`✗ ${(e as Error).message}`);
    }
}
await closeBrowser();
process.exit(failed ? 1 : 0);
