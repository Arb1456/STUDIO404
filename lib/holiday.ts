import { cloudinaryUrl } from '@/lib/cloudinary';

/**
 * Holiday 2026 season config — single source of truth.
 *
 * Everything seasonal (hero swap, holiday session cards, booking links)
 * reads from here. To end the season, flip HOLIDAY_SEASON_ENABLED or
 * adjust isHolidaySeason() — no component edits required.
 */

/** Manual master switch for the holiday experience. */
export const HOLIDAY_SEASON_ENABLED = true;

/**
 * Decides whether the holiday hero + holiday sessions are shown.
 * Manual switch by decision: set HOLIDAY_SEASON_ENABLED = false and redeploy
 * to restore the standard hero and session list after the season.
 */
export function isHolidaySeason(): boolean {
    return HOLIDAY_SEASON_ENABLED;
}

// ─── Christmas set imagery ─────────────────────────────────────────────
// 2026 set photos (shot Nov 2026, source: ~/Desktop/STU CHRISTMAS /NEW SET PHOTOS).
// Every holiday page (hero, minis, full session, rental, tour) reads from here.
// Never use HOLIDAY-SET-K1 / HOLIDAY-SET-KT1: those are photos of André, not clients.
const SET_PHOTOS = {
    /** Set2026-6: full set, landscape, couch centred. */
    wide: 'HOLIDAY-SET-2026-WIDE',
    /** Set2026-10: full set, 4:5, already fades to black at the bottom (good under text). */
    fade: 'HOLIDAY-SET-2026-FADE',
};

export const HOLIDAY_HERO_IMAGE = {
    // Hero boxes are ~2.4:1, so pre-crop to that shape anchored low: keeps the couch, drops the top drape.
    desktop: cloudinaryUrl(SET_PHOTOS.wide, { width: 1920, aspectRatio: '2.4', crop: 'fill', gravity: 'south' }),
    mobile: cloudinaryUrl(SET_PHOTOS.fade, { width: 828, height: 1200, crop: 'fill', gravity: 'center' }),
    card: cloudinaryUrl(SET_PHOTOS.wide, { width: 800, height: 800, crop: 'fill', gravity: 'center' }),
};

/**
 * Photo carousel on the minis + full-session pages.
 * '2026-set' = this year's set, empty (no clients yet).
 * '2025-client' = real client sessions on LAST year's set, shown as "what to expect".
 * `ratio` is the photo's real shape (width/height) so nothing is cropped.
 * Alt text describes the photo only; never put client names here.
 */
export type HolidayPhotoEra = '2026-set' | '2025-client';
export interface HolidayCarouselPhoto {
    id: string;
    era: HolidayPhotoEra;
    ratio: string;
    alt: string;
}

const CAROUSEL_PHOTOS: HolidayCarouselPhoto[] = [
    { id: 'HOLIDAY-SET-2026-WIDE', era: '2026-set', ratio: '3/2', alt: 'The 2026 Christmas set: cream couch with red velvet pillows between flocked white trees and a wreath' },
    { id: 'HOLIDAY-2025-AMV-8', era: '2025-client', ratio: '5/4', alt: 'Family of six in matching red plaid pyjamas on the couch' },
    { id: 'HOLIDAY-SET-KHEY', era: '2025-client', ratio: '5/4', alt: 'Couple in matching red plaid pyjamas on the Christmas set' },
    { id: 'HOLIDAY-SET-2026-SIDE', era: '2026-set', ratio: '2/3', alt: 'Side view of the 2026 set: couch, garland and the wreath on the black diamond' },
    { id: 'HOLIDAY-2025-FAUSTIN-10', era: '2025-client', ratio: '3/2', alt: 'Parents and baby in matching Santa hats and Fair Isle pyjamas' },
    { id: 'HOLIDAY-SET-CASSI', era: '2025-client', ratio: '3/2', alt: 'Family of five on the cream couch in front of white Christmas trees' },
    { id: 'HOLIDAY-SET-2026-PRESENTS', era: '2026-set', ratio: '3/2', alt: 'Wrapped presents in gold and red under the glowing white trees on the 2026 set' },
    { id: 'HOLIDAY-2025-FAUSTIN-9', era: '2025-client', ratio: '2/3', alt: 'Baby in a Santa hat sitting in a tiny armchair beside a teddy bear' },
    { id: 'HOLIDAY-2025-ISAAC-11', era: '2025-client', ratio: '5/4', alt: 'Large family of twelve holding gifts and teddy bears on the couch' },
    { id: 'HOLIDAY-SET-2026-WREATH', era: '2026-set', ratio: '2/3', alt: 'Red-bowed wreath on the black diamond backdrop of the 2026 set' },
    { id: 'HOLIDAY-2025-KHEY-2', era: '2025-client', ratio: '3/2', alt: 'Couple in red plaid pyjamas cuddling a teddy bear on the couch' },
    { id: 'HOLIDAY-2025-AMV-7', era: '2025-client', ratio: '3/2', alt: 'Four kids in plaid pyjamas and festive headbands on the fluffy carpet' },
    { id: 'HOLIDAY-SET-2026-ORNAMENTS', era: '2026-set', ratio: '2/3', alt: 'Close-up of red glitter ornaments on a flocked tree' },
    { id: 'HOLIDAY-2025-FAUSTIN-2', era: '2025-client', ratio: '2/3', alt: 'Parents in white shirts holding their baby on the couch' },
    { id: 'HOLIDAY-2025-CASSI-V2', era: '2025-client', ratio: '3/2', alt: 'Three siblings relaxing on the carpet among wrapped presents' },
    { id: 'HOLIDAY-SET-2026-BOW', era: '2026-set', ratio: '2/3', alt: 'Red velvet bow and ornament garland on a white tree' },
    { id: 'HOLIDAY-2025-FAUSTIN-6', era: '2025-client', ratio: '3/2', alt: 'Baby sitting on the fluffy carpet between two big teddy bears' },
    { id: 'HOLIDAY-SET-2026-GIFT', era: '2026-set', ratio: '2/3', alt: 'Gold-wrapped gift tied with a red velvet bow' },
];

/** Slide height is fixed in CSS; 920px tall covers 2x screens at the md height (460px). */
export const HOLIDAY_SET_CAROUSEL = CAROUSEL_PHOTOS.map((p) => ({
    ...p,
    src: cloudinaryUrl(p.id, { height: 920, crop: 'fit' }),
}));

// Offers — pricing/packages to be fine-tuned later.
// TODO: replace calendar URLs with the real GHL calendars once created.
export const HOLIDAY_OFFERS = {
    mini: {
        id: 'holiday-mini',
        title: 'Holiday Mini',
        price: 125,
        durationLabel: '30 Minutes',
        photoCount: 4,
        photoLabel: '4 Photo Selections + Edits',
        outfitLabel: '1 Outfit',
        description: 'A quick, festive session on our Christmas set — offered on specific mini-session days and times only.',
        calendarUrl: 'https://api.leadconnectorhq.com/widget/bookings/404holiday-mini-session',
        /** GHL calendar ID, used server-side for live availability. */
        calendarId: 'qMWxfnMOJQ1KA6zGsHCB',
    },
    full: {
        id: 'holiday',
        title: 'Full Holiday',
        /** Grid card label — spelled out so it isn't confused with the minis. */
        cardTitle: 'Full Holiday Session',
        price: 250,
        durationLabel: '1.5 Hours',
        photoCount: 12,
        outfitLabel: '2 Outfits',
        description: 'A full holiday photoshoot on our Christmas set with 2 outfits and time for more looks.',
        calendarUrl: 'https://api.leadconnectorhq.com/widget/bookings/404holiday-session',
        /** GHL calendar ID, used server-side for live availability. */
        calendarId: 'b4CiROJpNQTGDtossKxl',
    },
} as const;

// ─── Holiday Minis landing page content ────────────────────────────────

export const MINI_POLICY = {
    includedPeople: 5,
    extraPersonFee: 15,
    petFee: 25,
    /** Edits turnaround after the session. */
    deliveryLabel: 'Edits delivered within 3 days',
    /** Charged by GHL at booking; the balance (+ any surcharges) is invoiced afterwards. */
    deposit: 50,
    /** Deposit is refundable up to this many days before the booked time. */
    refundWindowDays: 14,
};

/** Full Holiday Session terms (mirrors the GHL Holiday Form footer). */
export const FULL_SESSION_POLICY = {
    includedPeople: 6,
    extraPersonFee: 15,
    petFee: 25,
    deposit: 75,
    refundWindowDays: 7,
};

/** Holiday balance invoices are due this many days before the session (both offers). */
export const HOLIDAY_BALANCE_DUE_DAYS = 3;

/**
 * Optional mini upgrades. Picked on the GHL booking form (Holiday Mini only) and
 * added to the balance invoice by hand. Keep labels in sync with that form question.
 */
export const MINI_ADDONS = [
    { id: 'extra-edits', label: '4 More Edited Photos', note: '8 edits total', price: 40 },
    { id: 'proof-album', label: 'Full Proof Album', note: 'Every photo from your session', price: 35 },
] as const;

export const STUDIO_CONTACT = {
    phoneDisplay: '343-314-4140',
    phoneHref: 'tel:+13433144140',
    email: 'andre@thestudio404.ca',
};

export interface MiniDay {
    /** Display label, e.g. "Sat, Dec 6" */
    label: string;
    /** Mini-session hours that day, e.g. "12–8 pm" */
    hours: string;
    /** ISO date (America/Toronto), matched against GHL's live free slots. */
    date: string;
    /**
     * Fallback only: the page shows live counts from GHL (/api/holiday-availability).
     * This number is used if that request fails, and by the bottom-bar sold-out check.
     * 0 = sold out → waitlist.
     */
    spotsLeft: number;
}

/**
 * Dedicated mini-session days. Spot counts on the page come live from GHL; spotsLeft is the fallback.
 * Slots: 30-min blocks back-to-back (20-min shoot + 5 min hello/goodbye each side),
 * so 2 starts per hour; the last session ends by close. Starting spotsLeft = slot count (docs/plans/2026-11-10-holiday-mini-slot-plan.md).
 */
export const MINI_DAYS: MiniDay[] = [
    { date: '2026-11-22', label: 'Sun, Nov 22', hours: '2–6 pm', spotsLeft: 8 },
    { date: '2026-11-29', label: 'Sun, Nov 29', hours: '12–8 pm', spotsLeft: 16 },
    { date: '2026-12-05', label: 'Sat, Dec 5', hours: '12–8 pm', spotsLeft: 16 },
    { date: '2026-12-06', label: 'Sun, Dec 6', hours: '12–4 pm', spotsLeft: 8 },
    { date: '2026-12-11', label: 'Fri, Dec 11', hours: '12–8 pm', spotsLeft: 16 },
    { date: '2026-12-12', label: 'Sat, Dec 12', hours: '12–8 pm', spotsLeft: 16 },
    { date: '2026-12-13', label: 'Sun, Dec 13', hours: '12–8 pm', spotsLeft: 16 },
    { date: '2026-12-14', label: 'Mon, Dec 14', hours: '2–6 pm', spotsLeft: 8 },
    { date: '2026-12-18', label: 'Fri, Dec 18', hours: '12–8 pm', spotsLeft: 16 },
    { date: '2026-12-19', label: 'Sat, Dec 19', hours: '2:30–8 pm', spotsLeft: 11 },
    { date: '2026-12-20', label: 'Sun, Dec 20', hours: '10 am–8 pm', spotsLeft: 20 },
    { date: '2026-12-21', label: 'Mon, Dec 21', hours: '2–8 pm', spotsLeft: 12 },
];

export const MINI_FAQ = [
    {
        question: 'Who can come?',
        answer: `Your mini includes up to ${MINI_POLICY.includedPeople} people — kids absolutely welcome. Bigger group? Add more people when you book.`,
    },
    {
        question: 'Can we bring our pet?',
        answer: 'Yes! Pets are welcome as long as they are potty trained. A small cleaning fee applies (see booking details).',
    },
    {
        question: 'How does payment work?',
        answer: `A $${MINI_POLICY.deposit} deposit holds your spot and is refundable up to ${MINI_POLICY.refundWindowDays / 7} weeks before your session. The remaining balance plus applicable HST, and any extra-person or pet fee, is sent together as one invoice.`,
    },
    {
        question: 'When will we get our photos?',
        answer: 'You choose your 4 favourite photos, and your edits are delivered within 3 days — plenty of time for holiday cards and gifts.',
    },
    {
        question: 'How long is the session?',
        answer: '30 minutes on our Christmas set with 1 outfit. Minis are only offered on specific days and times, and run back-to-back — please arrive 5–10 minutes early so we can start on time.',
    },
    {
        question: 'Where are you and is there parking?',
        answer: '2285 St. Laurent Blvd, Unit B8b, Ottawa. Park for free in lot C.',
    },
    {
        question: 'Want more photos?',
        answer: 'Add 4 more edited photos (+$40) or the full proof album with every photo from your session (+$35) when you book. Add-ons go on your final invoice. Want more time and a second outfit? The Full Holiday Session is 1.5 hours with 2 outfits and 12 edited photos, starting at $250.',
    },
];

// ─── Full Holiday Session landing page ───────────────────────────────────

export const FULL_SESSION_FAQ = [
    {
        question: 'How is this different from a Holiday Mini?',
        answer: 'Minis are 30 minutes, 1 outfit and 4 edited photos, on set mini days only. The Full Holiday Session gives you 1.5 hours on the set, 2 outfits and more looks, and 12 edited photos — on any available day.',
    },
    {
        question: 'Which days can we book?',
        answer: 'Any open time in the calendar. Mini-session hours are reserved for minis, so if a time you want isn’t showing, call or email us and we’ll find something that works.',
    },
    {
        question: 'Can we bring the whole family — and the dog?',
        answer: 'Yes. Kids, grandparents and potty-trained pets are all welcome. Let us know your group size and any pets when you book so we can plan poses and set-up.',
    },
    {
        question: 'Where are you and is there parking?',
        answer: '2285 St. Laurent Blvd, Unit B8b, Ottawa. Park for free in lot C.',
    },
];

// ─── The Christmas Truck Initiative ─────────────────────────────────────

export const TRUCK_INITIATIVE = {
    /** Drop-off spots. Stittsville address is shared by email, so it isn't public. */
    dropOffs: [
        { area: 'St. Laurent', detail: 'Studio 404, 2285 St. Laurent Blvd, Unit B8b' },
        { area: 'Stittsville', detail: 'Email us for the drop-off address' },
    ],
    /** When the outreach runs. */
    outreachLabel: 'December 2026',
    instagramHandle: 'studio404inc',
    instagramUrl: 'https://instagram.com/studio404inc',
    /** Swap for a real photo of the decorated truck once one is shot (Cloudinary URL). null = emblem-only hero. */
    image: null as string | null,
    // Truck page copy rule: no em dashes, headings in Title Case.
    story: [
        { title: 'One Ornament', text: 'It started with a single Christmas ornament hung on the truck’s antenna, just for fun.' },
        { title: 'Then A Few More', text: 'It kept being fun. A few more decorations, a trend we couldn’t resist, and a little extra holiday marketing for our Christmas sessions.' },
        { title: 'People Noticed', text: 'Eventually the truck was decorated so much that people were waving, honking and taking pictures everywhere we drove.' },
        { title: 'So We Made It Count', text: 'With that much attention, we realized the truck could make a real difference. This season it’s collecting warm clothing for people experiencing homelessness.' },
    ],
    accepted: ['Jackets & Coats', 'Blankets', 'Boots', 'Gloves & Mittens', 'Toques & Scarves', 'Warm Socks', 'Sweaters & Hoodies', 'Anything That Keeps Someone Warm'],
};

// ─── Christmas set (rental + tour) ──────────────────────────────────────
export const CHRISTMAS_SET = {
    image: HOLIDAY_HERO_IMAGE.desktop,
    blurb: 'A fully styled Christmas set — four snow-white trees glowing with warm lights, a cozy cream couch on fluffy carpet, wrapped presents and holiday décor — ready to shoot the moment you walk in.',
    /** Full-day rental pitch for photographers running their own minis. */
    fullDay: { hours: 8, price: 400 },
};

export const HOLIDAY_ROUTES = {
    minis: '/holiday-minis',
    fullSession: '/holiday-session',
    christmasTruck: '/christmas-truck',
} as const;
