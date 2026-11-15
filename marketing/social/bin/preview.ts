/**
 * npm run social:preview -- 2026-11-16
 * Renders the week, then writes out/preview-<monday>.html and .png: one row per post with
 * every image, the Instagram/Facebook caption and the Google caption. This is what André approves.
 */
import { writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { loadSpecs, validateSpec } from '../lib/spec.ts';
import { renderPost, closeBrowser, OUT_ROOT } from '../lib/render.ts';
import { dayName, headlineOf } from '../lib/calendar.ts';
import { COLOURS as C, FONTS_LINK } from '../lib/brand.ts';

const monday = process.argv[2];
if (!/^\d{4}-\d{2}-\d{2}$/.test(monday ?? '')) {
    console.error('Usage: npm run social:preview -- <monday YYYY-MM-DD>');
    process.exit(1);
}
const specs = loadSpecs(monday);
if (!specs.length) {
    console.error(`No posts for the week of ${monday}.`);
    process.exit(1);
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rows: string[] = [];
let failed = false;

for (const spec of specs) {
    const problems = validateSpec(spec);
    let images: string[] = [];
    try {
        images = (await renderPost(spec)).filter((f) => f.endsWith('-feed.png'));
    } catch (e) {
        failed = true;
        problems.push((e as Error).message);
    }
    rows.push(`
<section>
  <header><b>${dayName(spec.date)} ${spec.date.slice(5)}</b> · ${spec.time} · ${spec.job} · ${spec.template} · <span class="st ${spec.status}">${spec.status}</span></header>
  <h2>${esc(headlineOf(spec))}</h2>
  ${problems.length ? `<div class="err">${problems.map(esc).join('<br>')}</div>` : ''}
  <div class="body">
    <div class="imgs">${images.map((f) => `<img src="${relative(OUT_ROOT, f)}">`).join('')}</div>
    <div class="caps">
      <div class="lbl">Instagram + Facebook</div><pre>${esc(spec.caption)}</pre>
      ${spec.captionGoogle ? `<div class="lbl">Google</div><pre>${esc(spec.captionGoogle)}</pre>` : '<div class="lbl muted">Not posted to Google</div>'}
    </div>
  </div>
</section>`);
}
await closeBrowser();

const html = `<!doctype html><html><head><meta charset="utf-8"><link href="${FONTS_LINK}" rel="stylesheet"><style>
body{margin:0;padding:40px;background:${C.cream};font-family:Outfit,sans-serif;color:${C.charcoal};width:1400px}
h1{font-family:'Playfair Display',serif;font-weight:400;color:${C.evergreen};margin:0 0 30px}
section{background:#fff;border-radius:16px;padding:24px 28px;margin-bottom:24px}
header{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#777}
h2{font-family:'Playfair Display',serif;font-weight:400;font-size:26px;margin:6px 0 14px;color:${C.evergreen}}
.body{display:flex;gap:28px}
.imgs{display:flex;gap:10px;flex-wrap:wrap;max-width:760px}
.imgs img{width:240px;height:300px;object-fit:cover;border-radius:6px;border:1px solid #0001}
.caps{flex:1;min-width:0}
pre{white-space:pre-wrap;font-family:Outfit,sans-serif;font-size:15px;line-height:1.5;margin:4px 0 14px}
.lbl{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:${C.gold};font-weight:500}
.muted{color:#aaa}
.err{background:#fde8e8;color:#8a1c1c;padding:10px 14px;border-radius:8px;margin-bottom:12px;font-size:14px}
.st.approved,.st.scheduled{color:#2f7a45}
</style></head><body><h1>Week of ${monday}: ${specs.length} posts</h1>${rows.join('')}</body></html>`;

const htmlPath = join(OUT_ROOT, `preview-${monday}.html`);
writeFileSync(htmlPath, html);
const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1480, height: 900 } });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const pngPath = join(OUT_ROOT, `preview-${monday}.png`);
await page.screenshot({ path: pngPath, fullPage: true });
await b.close();
console.log(`✓ ${htmlPath}\n✓ ${pngPath}`);
process.exit(failed ? 1 : 0);
