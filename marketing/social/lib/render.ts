/**
 * Renders a post spec to PNGs with headless Chromium: out/<id>/<slide>-<format>.png.
 * Each page is written to an HTML file first and loaded via file:// so local inbox
 * photos load. Any [data-fit] box whose content overflows fails the render.
 */
import { chromium, type Browser } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { SOCIAL_ROOT, type PostSpec } from './spec.ts';
import { templateHtml, formatsFor, SIZES } from './templates.ts';

export const OUT_ROOT = join(SOCIAL_ROOT, 'out');

let browser: Promise<Browser> | null = null;
const getBrowser = () => (browser ??= chromium.launch());

export async function closeBrowser(): Promise<void> {
    if (browser) await (await browser).close();
    browser = null;
}

export async function renderPost(spec: PostSpec, outDir: string = OUT_ROOT): Promise<string[]> {
    const dir = join(outDir, spec.id);
    mkdirSync(dir, { recursive: true });
    const files: string[] = [];
    const b = await getBrowser();

    for (const [i, slide] of spec.slides.entries()) {
        // Carousels show "2 / 5" on every slide after the cover.
        const data = spec.template === 'carousel' && i > 0 ? { index: `${i + 1} / ${spec.slides.length}`, ...slide } : slide;
        for (const format of formatsFor(spec.template)) {
            const { w, h } = SIZES[format];
            const htmlPath = join(dir, `${i + 1}-${format}.html`);
            writeFileSync(htmlPath, templateHtml(spec.template, data, format));
            const page = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
            try {
                await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
                await page.evaluate(() => document.fonts.ready);
                const overflow = await page.evaluate(() =>
                    [...document.querySelectorAll<HTMLElement>('[data-fit]')]
                        // Allow ~0.35em of slack: display fonts' ascender/descender space spills past
                        // tight line-heights without any text being cut. A real overflow is a whole extra line.
                        .filter((el) => {
                            const slack = parseFloat(getComputedStyle(el).fontSize) * 0.35;
                            return el.scrollHeight > el.clientHeight + slack || el.scrollWidth > el.clientWidth + 1;
                        })
                        .map((el) => el.tagName.toLowerCase() + (el.className ? `.${el.className}` : '')),
                );
                if (overflow.length) {
                    throw new Error(`${spec.id}: text overflow in slide ${i + 1} (${format}): ${overflow.join(', ')}. Shorten the text.`);
                }
                const png = join(dir, `${i + 1}-${format}.png`);
                await page.screenshot({ path: png, type: 'png' });
                files.push(png);
            } finally {
                await page.close();
            }
        }
    }
    return files;
}
