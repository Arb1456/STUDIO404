/**
 * Seamless paper colours in the studio (André, 2026-11-25).
 * Single source for the Equipment and Tour pages; the overview script also reads the names.
 */
export const SEAMLESS_PAPERS: { name: string; color: string }[] = [
    { name: 'Black', color: '#1A1A1A' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Light Gray', color: '#D1D5DB' },
    { name: 'Dark Gray', color: '#4B5563' },
    { name: 'Beige', color: '#E1C699' },
    { name: 'Pink', color: '#F9A8D4' },
    { name: 'Red', color: '#DC2626' },
    { name: 'Light Blue', color: '#93C5FD' },
    { name: 'Blue', color: '#2563EB' },
    { name: 'Dark Blue', color: '#1E3A8A' },
    { name: 'Forest Green', color: '#14532D' },
    { name: 'Chroma Key Green', color: '#22C55E' },
];

/** Backdrop request terms for rentals (André, 2026-11-25). Keep every page on this wording. */
export const BACKDROP_REQUEST_NOTICE_HOURS = 48;
export const BACKDROP_REQUEST_SHORT = `Request your backdrop color at least ${BACKDROP_REQUEST_NOTICE_HOURS} hours before your rental and we'll make our best effort to have it set up. On busy days you may need to change backdrops yourself.`;
export const BACKDROP_REQUEST_POLICY = {
    request: `Tell us which backdrop color you'd like at least ${BACKDROP_REQUEST_NOTICE_HOURS} hours before your rental, and we'll make our best effort to have it set up for you. A specific color being set up on arrival is not guaranteed.`,
    selfChange: 'Occasionally, when earlier bookings that day request several colors, you may need to change the backdrop yourself, so renters are required to know how to do so.',
    help: 'A guide to changing backdrops is coming soon, and you can always call Studio 404 staff at 343-314-4140 for assistance and guidance throughout.',
};
