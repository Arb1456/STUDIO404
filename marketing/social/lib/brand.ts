/**
 * Brand tokens for social graphics, read from the website so the two never drift:
 * colours from tailwind.config.js, emblems copied from components/ui/Christmas.tsx.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SOCIAL_ROOT } from './spec.ts';

const tailwind = readFileSync(join(SOCIAL_ROOT, '..', '..', 'tailwind.config.js'), 'utf8');
const colour = (name: string): string => {
    const m = tailwind.match(new RegExp(`'?${name}'?:\\s*'(#[0-9A-Fa-f]{6})'`));
    if (!m) throw new Error(`brand colour "${name}" not found in tailwind.config.js`);
    return m[1];
};

export const COLOURS = {
    cream: colour('cream'),
    charcoal: colour('charcoal'),
    evergreen: colour('evergreen'),
    gold: colour('gold'),
    /** Holly berry red from the Holly emblem (used sparingly: low-spots pill). */
    berry: '#B3262E',
};

export const FONTS_LINK =
    'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Outfit:wght@300;400;500&display=block';

const stroke = (c: string) => `fill="none" stroke="${c}" stroke-width="1.4" stroke-linecap="round"`;

export const EMBLEMS = {
    snowflake: (c: string) =>
        `<svg viewBox="0 0 24 24" ${stroke(c)}>${[0, 60, 120]
            .map((r) => `<g transform="rotate(${r} 12 12)"><path d="M12 2v20"/><path d="M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5"/></g>`)
            .join('')}</svg>`,
    star: (c: string) =>
        `<svg viewBox="0 0 24 24" fill="${c}"><path d="M12 1.5c.6 5.2 2.3 7.9 10.5 10.5-8.2 2.6-9.9 5.3-10.5 10.5-.6-5.2-2.3-7.9-10.5-10.5C9.7 9.4 11.4 6.7 12 1.5Z"/></svg>`,
    ornament: (c: string) =>
        `<svg viewBox="0 0 24 24" ${stroke(c)}><path d="M12 1.5v3"/><rect x="9.5" y="4.5" width="5" height="3" rx="0.8"/><circle cx="12" cy="15" r="7"/><path d="M5.5 13.5c2 1.3 4 1.3 6.5 0s4.5-1.3 6.5 0"/><path d="M5.5 17c2 1.3 4 1.3 6.5 0s4.5-1.3 6.5 0"/></svg>`,
    holly: () =>
        `<svg viewBox="0 0 32 32"><path d="M15 17 C12 16 10 13.5 9.5 11 L7.5 12 L7.8 9.6 L5 9.8 L6.2 7.6 L3.5 6.6 C7 4.5 12.5 5.5 15 9 C16 11.5 16 14.5 15 17Z" fill="#2F5A3F"/><path d="M17 17 C20 16 22 13.5 22.5 11 L24.5 12 L24.2 9.6 L27 9.8 L25.8 7.6 L28.5 6.6 C25 4.5 19.5 5.5 17 9 C16 11.5 16 14.5 17 17Z" fill="#3D6E4F"/><circle cx="13" cy="19.5" r="3.2" fill="#B3262E"/><circle cx="19" cy="19.5" r="3.2" fill="#C4343C"/><circle cx="16" cy="24.5" r="3.2" fill="#A11F27"/><circle cx="12" cy="18.5" r="0.9" fill="#fff" opacity="0.55"/><circle cx="18" cy="18.5" r="0.9" fill="#fff" opacity="0.55"/></svg>`,
};
