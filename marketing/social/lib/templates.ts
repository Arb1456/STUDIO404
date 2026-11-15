/**
 * The six social templates. Each returns a full HTML document sized to one canvas.
 * Text boxes that must not overflow carry data-fit; render.ts fails the post if they do.
 *
 * Inline text formatting: "*word*" → Playfair italic accent, "\n" → line break.
 */
import { pathToFileURL } from 'node:url';
import { isAbsolute, resolve } from 'node:path';
import { COLOURS as C, EMBLEMS, FONTS_LINK } from './brand.ts';
import type { Template } from './spec.ts';

export type Format = 'feed' | 'story';
export const SIZES: Record<Format, { w: number; h: number }> = { feed: { w: 1080, h: 1350 }, story: { w: 1080, h: 1920 } };

type Slide = Record<string, unknown>;

const PROMO: Template[] = ['mini-day', 'photo-band', 'truck'];
export const formatsFor = (t: Template): Format[] => (PROMO.includes(t) ? ['feed', 'story'] : ['feed']);

const esc = (s: unknown) =>
    String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** Escapes, then applies *accent* and line breaks. */
const rich = (s: unknown) => esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');
const str = (s: unknown) => (s == null ? '' : String(s));

/** Local paths (relative to the repo root) → file:// URLs; https stays as is. */
const imgUrl = (src: unknown) => {
    const s = str(src);
    if (!s || /^https?:\/\//.test(s)) return s;
    return pathToFileURL(isAbsolute(s) ? s : resolve(s)).href;
};

const MARK = (colour: string) =>
    `<div class="mark" style="color:${colour}">Studio 404 <span class="dot">·</span> Christmas 2026</div>`;

function page(format: Format, bg: string, body: string, extraCss = ''): string {
    const { w, h } = SIZES[format];
    return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS_LINK}" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${w}px;height:${h}px;overflow:hidden}
body{background:${bg};font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased;position:relative}
.serif{font-family:'Playfair Display',serif}
em{font-family:'Playfair Display',serif;font-style:italic;font-weight:400}
.eyebrow{font-size:26px;letter-spacing:.28em;text-transform:uppercase;font-weight:400}
.mark{position:absolute;left:0;right:0;bottom:56px;text-align:center;font-size:22px;letter-spacing:.32em;text-transform:uppercase;font-weight:400;opacity:.75}
.mark .dot{margin:0 .4em}
.emblem{position:absolute;pointer-events:none}
.emblem svg{width:100%;height:100%;display:block}
.stars{display:flex;gap:14px;justify-content:center}
.stars span{width:40px;height:40px;display:block}
.fill{position:absolute;inset:0}
.photo{position:absolute;inset:0;background-size:cover;background-position:center}
${extraCss}
</style></head><body>${body}</body></html>`;
}

const scatter = (colour: string, opacity: number) => `
  <div class="emblem" style="top:-60px;left:-60px;width:260px;height:260px;opacity:${opacity}">${EMBLEMS.snowflake(colour)}</div>
  <div class="emblem" style="bottom:-80px;right:-70px;width:320px;height:320px;opacity:${opacity}">${EMBLEMS.snowflake(colour)}</div>
  <div class="emblem" style="top:120px;right:110px;width:44px;height:44px;opacity:${opacity * 3}">${EMBLEMS.star(colour)}</div>
  <div class="emblem" style="bottom:240px;left:120px;width:32px;height:32px;opacity:${opacity * 3}">${EMBLEMS.star(colour)}</div>`;

const stars = () => `<div class="stars">${Array.from({ length: 5 }, () => `<span>${EMBLEMS.star(C.gold)}</span>`).join('')}</div>`;

// ─── 1. Testimonial ──────────────────────────────────────────────────────
function testimonial(s: Slide, f: Format): string {
    return page(f, C.evergreen, `
${scatter(C.gold, 0.12)}
<div class="wrap">
  ${stars()}
  <blockquote class="quote serif" data-fit>&ldquo;${rich(s.quote)}&rdquo;</blockquote>
  <div class="who">${esc(s.name)}${s.role ? ` <span class="sep">·</span> ${esc(s.role)}` : ''}</div>
</div>
${MARK(C.cream)}`, `
.wrap{position:absolute;left:110px;right:110px;top:150px;bottom:190px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:${C.cream}}
.quote{font-style:italic;font-weight:400;font-size:58px;line-height:1.32;margin:56px 0 52px;max-height:820px;overflow:hidden}
.who{font-size:26px;letter-spacing:.24em;text-transform:uppercase;color:${C.gold}}
.sep{margin:0 .3em;opacity:.7}`);
}

// ─── 2. Photo + caption band ─────────────────────────────────────────────
function photoBand(s: Slide, f: Format, index?: string): string {
    const story = f === 'story';
    return page(f, C.evergreen, `
<div class="photo" style="background-image:url('${imgUrl(s.image)}')"></div>
<div class="fill shade"></div>
${index ? `<div class="index">${esc(index)}</div>` : ''}
<div class="band">
  <div class="holly">${EMBLEMS.holly()}</div>
  ${s.eyebrow ? `<div class="eyebrow">${esc(s.eyebrow)}</div>` : ''}
  <h1 class="serif" data-fit>${rich(s.headline)}</h1>
  ${s.sub ? `<p class="sub" data-fit>${rich(s.sub)}</p>` : ''}
</div>
${MARK(C.cream)}`, `
.shade{background:linear-gradient(to top, ${C.evergreen} 0%, ${C.evergreen}E6 ${story ? 26 : 30}%, ${C.evergreen}00 ${story ? 55 : 62}%)}
.band{position:absolute;left:90px;right:90px;bottom:${story ? 260 : 140}px;color:${C.cream};text-align:center}
.holly{width:84px;height:84px;margin:0 auto 18px}
.eyebrow{color:${C.gold};margin-bottom:22px}
h1{font-weight:400;font-size:${story ? 104 : 92}px;line-height:1.12;max-height:${story ? 440 : 300}px;overflow:hidden}
h1 em{color:${C.cream}}
.sub{font-size:32px;line-height:1.4;font-weight:300;margin-top:22px;opacity:.9;max-height:140px;overflow:hidden}
.index{position:absolute;top:56px;right:56px;font-size:24px;letter-spacing:.2em;color:${C.cream};background:${C.evergreen}B3;padding:12px 20px;border-radius:40px}`);
}

// ─── 3. FAQ / info card ──────────────────────────────────────────────────
function faq(s: Slide, f: Format, index?: string): string {
    const list = Array.isArray(s.items) ? (s.items as unknown[]) : null;
    return page(f, C.cream, `
${scatter(C.evergreen, 0.06)}
${index ? `<div class="index">${esc(index)}</div>` : ''}
<div class="wrap">
  <div class="eyebrow">${esc(s.eyebrow ?? 'Good To Know')}</div>
  <div class="orn">${EMBLEMS.ornament(C.gold)}</div>
  <h2 class="serif" data-fit>${rich(s.question)}</h2>
  ${list
      ? `<ul class="items" data-fit>${list.map((i) => `<li><span class="b">${EMBLEMS.star(C.gold)}</span>${rich(i)}</li>`).join('')}</ul>`
      : `<p class="answer" data-fit>${rich(s.answer)}</p>`}
</div>
${MARK(C.evergreen)}`, `
.wrap{position:absolute;left:110px;right:110px;top:140px;bottom:180px;display:flex;flex-direction:column;justify-content:center;color:${C.charcoal}}
.eyebrow{color:${C.evergreen};opacity:.7}
.orn{width:56px;height:56px;margin:30px 0 26px}
h2{font-weight:400;font-size:78px;line-height:1.1;color:${C.evergreen};max-height:360px;overflow:hidden}
.answer{font-size:38px;line-height:1.5;font-weight:300;margin-top:40px;max-height:520px;overflow:hidden}
.items{list-style:none;margin-top:40px;font-size:38px;line-height:1.35;font-weight:300;max-height:620px;overflow:hidden}
.items li{display:flex;gap:22px;align-items:baseline;padding:12px 0;border-bottom:1px solid ${C.charcoal}22}
.items .b{width:22px;height:22px;flex:none;display:block;transform:translateY(2px)}
.index{position:absolute;top:56px;right:56px;font-size:24px;letter-spacing:.2em;color:${C.evergreen};border:1px solid ${C.evergreen}55;padding:12px 20px;border-radius:40px}`);
}

// ─── 4. Mini-day card ────────────────────────────────────────────────────
function miniDay(s: Slide, f: Format): string {
    const story = f === 'story';
    const sold = s.spotsLeft === 'sold-out' || s.spotsLeft === 0;
    const n = Number(s.spotsLeft);
    const low = !sold && n <= 3;
    const pill = sold ? 'Sold Out' : `${n} Spot${n === 1 ? '' : 's'} Left`;
    return page(f, C.evergreen, `
${s.image ? `<div class="photo" style="background-image:url('${imgUrl(s.image)}');opacity:.32"></div><div class="fill" style="background:linear-gradient(to top, ${C.evergreen}, ${C.evergreen}99)"></div>` : ''}
${scatter(C.gold, 0.12)}
<div class="wrap">
  <div class="holly">${EMBLEMS.holly()}</div>
  <div class="eyebrow">${esc(s.eyebrow ?? 'Holiday Minis · Mini Day')}</div>
  <h1 class="serif" data-fit>${rich(s.dateLabel)}</h1>
  <div class="hours">${esc(s.hours)}</div>
  <div class="pill ${sold ? 'sold' : low ? 'low' : ''}">${pill}</div>
  <div class="facts">$${esc(s.price ?? 125)} <span>·</span> 30 Minutes <span>·</span> Up To 5 People</div>
  <div class="cta">${sold ? 'Join the waitlist' : 'Book · Link in bio'}</div>
</div>
${MARK(C.cream)}`, `
.wrap{position:absolute;left:90px;right:90px;top:${story ? 300 : 150}px;bottom:${story ? 340 : 170}px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:${C.cream}}
.holly{width:96px;height:96px;margin-bottom:26px}
.eyebrow{color:${C.gold}}
h1{font-weight:400;font-size:${story ? 150 : 132}px;line-height:1.12;margin:30px 0 14px;max-height:${story ? 320 : 280}px;overflow:hidden}
.hours{font-size:40px;font-weight:300;opacity:.85}
.pill{margin-top:52px;padding:22px 46px;border:2px solid ${C.gold};color:${C.gold};font-size:34px;letter-spacing:.18em;text-transform:uppercase;border-radius:60px}
.pill.low{background:${C.berry};border-color:${C.berry};color:${C.cream}}
.pill.sold{border-color:${C.cream}66;color:${C.cream}AA}
.facts{margin-top:52px;font-size:30px;letter-spacing:.08em;opacity:.85}
.facts span{color:${C.gold};margin:0 .35em}
.cta{margin-top:20px;font-size:26px;letter-spacing:.26em;text-transform:uppercase;color:${C.gold}}`);
}

// ─── 5. Truck card ───────────────────────────────────────────────────────
function truck(s: Slide, f: Format): string {
    const story = f === 'story';
    const items = (Array.isArray(s.items) ? s.items : []) as unknown[];
    const drops = (Array.isArray(s.dropOffs) ? s.dropOffs : []) as unknown[];
    return page(f, C.cream, `
${s.image ? `<div class="top" style="background-image:url('${imgUrl(s.image)}')"></div>` : ''}
${scatter(C.evergreen, 0.06)}
<div class="wrap">
  <div class="eyebrow">${esc(s.eyebrow ?? 'The Christmas Truck Initiative')}</div>
  <h1 class="serif" data-fit>${rich(s.headline)}</h1>
  ${items.length ? `<ul class="items" data-fit>${items.map((i) => `<li><span class="b">${EMBLEMS.snowflake(C.evergreen)}</span>${esc(i)}</li>`).join('')}</ul>` : ''}
  ${drops.length ? `<div class="drops" data-fit><div class="dl">Drop-offs</div>${drops.map((d) => `<div>${esc(d)}</div>`).join('')}</div>` : ''}
  <div class="share">Share this so it reaches more people</div>
</div>
${MARK(C.evergreen)}`, `
.top{position:absolute;left:0;right:0;top:0;height:${story ? 640 : 420}px;background-size:cover;background-position:center}
.wrap{position:absolute;left:90px;right:90px;top:${s.image ? (story ? 700 : 470) : 140}px;bottom:150px;display:flex;flex-direction:column;justify-content:center;color:${C.charcoal}}
.eyebrow{color:${C.evergreen};opacity:.75}
h1{font-weight:400;font-size:${s.image ? 70 : 88}px;line-height:1.12;color:${C.evergreen};margin:20px 0 26px;max-height:${s.image ? 170 : 300}px;overflow:hidden}
.items{list-style:none;display:grid;grid-template-columns:1fr 1fr;column-gap:30px;font-size:30px;font-weight:400;max-height:${story ? 520 : 340}px;overflow:hidden}
.items li{display:flex;gap:14px;align-items:center;padding:12px 0;border-bottom:1px solid ${C.charcoal}1F}
.items .b{width:26px;height:26px;flex:none;display:block}
.drops{margin-top:26px;font-size:28px;line-height:1.45;font-weight:300;max-height:200px;overflow:hidden}
.drops .dl{font-size:22px;letter-spacing:.24em;text-transform:uppercase;color:${C.evergreen};font-weight:500;margin-bottom:6px}
.share{margin-top:26px;align-self:flex-start;background:${C.evergreen};color:${C.cream};font-size:24px;letter-spacing:.2em;text-transform:uppercase;padding:16px 28px;border-radius:40px}`);
}

/** One carousel slide: a photo slide if it has an image, otherwise an info slide. */
function carousel(s: Slide, f: Format): string {
    const index = s.index ? String(s.index) : undefined;
    return s.image ? photoBand(s, f, index) : faq(s, f, index);
}

export function templateHtml(t: Template, slide: Slide, format: Format): string {
    switch (t) {
        case 'testimonial': return testimonial(slide, format);
        case 'photo-band': return photoBand(slide, format);
        case 'carousel': return carousel(slide, format);
        case 'mini-day': return miniDay(slide, format);
        case 'truck': return truck(slide, format);
        case 'faq': return faq(slide, format);
    }
}
