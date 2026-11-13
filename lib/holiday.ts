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
// Last year's set (Christmas 2025) until the 2026 set is photographed.
// To swap: upload the new photos to Cloudinary and change the public IDs below —
// every holiday page (hero, minis, full session, rental, tour) reads from here.
const SET_PHOTOS = {
    hero: 'HOLIDAY-SET-K1',
    couple: 'HOLIDAY-SET-KHEY',
    couplePortrait: 'HOLIDAY-SET-KT1',
    family: 'HOLIDAY-SET-CASSI',
};

export const HOLIDAY_HERO_IMAGE = {
    desktop: cloudinaryUrl(SET_PHOTOS.hero, { width: 1920 }),
    mobile: cloudinaryUrl(SET_PHOTOS.hero, { width: 828, height: 1200, crop: 'fill', gravity: 'auto' }),
    card: cloudinaryUrl(SET_PHOTOS.hero, { width: 800, height: 800, crop: 'fill', gravity: 'auto' }),
};

/** Set gallery shown on the minis + full-session pages (alt text describes the photo). */
export const HOLIDAY_SET_GALLERY = [
    { src: cloudinaryUrl(SET_PHOTOS.family, { width: 900, height: 1200, crop: 'fill', gravity: 'auto' }), alt: 'Family of five on the cream couch in front of white Christmas trees' },
    { src: cloudinaryUrl(SET_PHOTOS.couplePortrait, { width: 900, height: 1200, crop: 'fill', gravity: 'auto' }), alt: 'Couple sharing a kiss on the Christmas set, one wearing a Santa hat' },
    { src: cloudinaryUrl(SET_PHOTOS.couple, { width: 900, height: 1200, crop: 'fill', gravity: 'auto' }), alt: 'Couple in matching red plaid pyjamas on the Christmas set' },
];

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
        photoCount: 8,
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
 * Slots: 30-min session + 15-min reset = a new start every 45 min; the last session
 * ends by close. Starting spotsLeft = slot count (docs/plans/2026-11-10-holiday-mini-slot-plan.md).
 */
export const MINI_DAYS: MiniDay[] = [
    { date: '2026-11-22', label: 'Sun, Nov 22', hours: '2–6 pm', spotsLeft: 5 },
    { date: '2026-11-29', label: 'Sun, Nov 29', hours: '12–8 pm', spotsLeft: 11 },
    { date: '2026-12-05', label: 'Sat, Dec 5', hours: '12–8 pm', spotsLeft: 11 },
    { date: '2026-12-06', label: 'Sun, Dec 6', hours: '12–4 pm', spotsLeft: 5 },
    { date: '2026-12-11', label: 'Fri, Dec 11', hours: '12–8 pm', spotsLeft: 11 },
    { date: '2026-12-12', label: 'Sat, Dec 12', hours: '12–8 pm', spotsLeft: 11 },
    { date: '2026-12-13', label: 'Sun, Dec 13', hours: '12–8 pm', spotsLeft: 11 },
    { date: '2026-12-14', label: 'Mon, Dec 14', hours: '2–6 pm', spotsLeft: 5 },
    { date: '2026-12-18', label: 'Fri, Dec 18', hours: '12–8 pm', spotsLeft: 11 },
    { date: '2026-12-19', label: 'Sat, Dec 19', hours: '2:30–8 pm', spotsLeft: 7 },
    { date: '2026-12-20', label: 'Sun, Dec 20', hours: '10 am–8 pm', spotsLeft: 13 },
    { date: '2026-12-21', label: 'Mon, Dec 21', hours: '2–8 pm', spotsLeft: 8 },
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
        answer: `A $${MINI_POLICY.deposit} deposit holds your spot and is refundable up to ${MINI_POLICY.refundWindowDays / 7} weeks before your session. The remaining balance, plus any extra-person or pet fee, is sent together as one invoice.`,
    },
    {
        question: 'When will we get our photos?',
        answer: 'You choose your 4 favourite photos, and your edits are delivered within 3 days — plenty of time for holiday cards and gifts.',
    },
    {
        question: 'What should we wear?',
        answer: 'Coordinated, not matching. Pick 2–3 colours that work with a warm Christmas set — creams, deep greens, burgundy, plaid and knits all photograph beautifully. Avoid large logos and neon.',
    },
    {
        question: 'How long is the session?',
        answer: '30 minutes on our Christmas set with 1 outfit. Minis are only offered on specific days and times, and run back-to-back — please arrive 5–10 minutes early so we can start on time.',
    },
    {
        question: 'Where are you and is there parking?',
        answer: '2285 St. Laurent Blvd, Unit B8b, Ottawa. Free parking is available on site and in the plaza lot.',
    },
    {
        question: 'Want more time or more photos?',
        answer: 'Book a Full Holiday Session instead: 1.5 hours on the set with 2 outfits, 8 edited photos, and any available day, starting at $250.',
    },
];

// ─── Full Holiday Session landing page ───────────────────────────────────

export const FULL_SESSION_FAQ = [
    {
        question: 'How is this different from a Holiday Mini?',
        answer: 'Minis are 30 minutes, 1 outfit and 4 edited photos, on set mini days only. The Full Holiday Session gives you 1.5 hours on the set, 2 outfits and more looks, and 8 edited photos — on any available day.',
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
        question: 'What should we wear?',
        answer: 'Coordinated, not matching. Pick 2–3 colours that work with a warm Christmas set — creams, deep greens, burgundy, plaid and knits all photograph beautifully. With 2 outfits you can bring a cozy look and a dressier one.',
    },
    {
        question: 'Where are you and is there parking?',
        answer: '2285 St. Laurent Blvd, Unit B8b, Ottawa. Free parking is available on site and in the plaza lot.',
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
