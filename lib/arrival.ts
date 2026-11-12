/**
 * Message match for paid / offline traffic landing on /holiday-minis.
 *
 * Ads and the truck QR code link here with ?utm_source=<source>.
 * Returning a string swaps the small eyebrow line above the headline so the
 * visitor sees continuity with what brought them here. Return null to keep
 * the default eyebrow.
 *
 * Truck QR links: /minis  →  /holiday-minis?utm_source=truck&utm_medium=qr&utm_campaign=holiday-minis-2026
 *                 /truck  →  /christmas-truck?utm_source=truck&utm_medium=qr&utm_campaign=truck-initiative-2026
 * Meta ads:       append ?utm_source=meta&utm_medium=paid&utm_campaign=holiday-minis-2026
 */
export function getArrivalMessage(utmSource: string | null): string | null {
    // Decision: same eyebrow for all sources (truck, ads, organic). Kept as a hook for later.
    return null;
}
