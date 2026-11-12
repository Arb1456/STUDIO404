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

// Placeholder imagery until the Christmas set is photographed.
// Swap these two URLs for the real set photos when they exist.
export const HOLIDAY_HERO_IMAGE = {
    desktop: 'https://res.cloudinary.com/du5ixrlhz/image/upload/w_1920,q_auto,f_auto/v1768672405/V1_vayy91.jpg',
    mobile: 'https://res.cloudinary.com/du5ixrlhz/image/upload/w_828,q_auto,f_auto/v1768672533/V1-2_m8ltsl.jpg',
    card: 'https://res.cloudinary.com/du5ixrlhz/image/upload/w_800,h_800,c_fill,q_auto,f_auto/v1768672405/V1_vayy91.jpg',
};

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
    },
    full: {
        id: 'holiday',
        title: 'Full Holiday',
        /** Grid card label — spelled out so it isn't confused with the minis. */
        cardTitle: 'Full Holiday Session',
        price: 250,
        durationLabel: '1.5 Hours',
        photoCount: 8,
        description: 'A full holiday photoshoot on our Christmas set with time for outfit changes and more looks.',
        calendarUrl: 'https://api.leadconnectorhq.com/widget/bookings/404holiday-session',
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
    /** Hand-updated as bookings come in. 0 = sold out → waitlist. */
    spotsLeft: number;
}

/**
 * Dedicated mini-session days. Hand-edited — GHL doesn't push availability to the site.
 * Slots: 30-min session + 15-min reset = a new start every 45 min; the last session
 * ends by close. Starting spotsLeft = slot count (docs/plans/2026-11-10-holiday-mini-slot-plan.md).
 */
export const MINI_DAYS: MiniDay[] = [
    { label: 'Sun, Nov 22', hours: '2–6 pm', spotsLeft: 5 },
    { label: 'Sun, Nov 29', hours: '12–8 pm', spotsLeft: 11 },
    { label: 'Sat, Dec 5', hours: '12–8 pm', spotsLeft: 11 },
    { label: 'Sun, Dec 6', hours: '12–4 pm', spotsLeft: 5 },
    { label: 'Fri, Dec 11', hours: '12–8 pm', spotsLeft: 11 },
    { label: 'Sat, Dec 12', hours: '12–8 pm', spotsLeft: 11 },
    { label: 'Sun, Dec 13', hours: '12–8 pm', spotsLeft: 11 },
    { label: 'Mon, Dec 14', hours: '2–6 pm', spotsLeft: 5 },
    { label: 'Fri, Dec 18', hours: '12–8 pm', spotsLeft: 11 },
    { label: 'Sat, Dec 19', hours: '2:30–8 pm', spotsLeft: 7 },
    { label: 'Sun, Dec 20', hours: '10 am–8 pm', spotsLeft: 13 },
    { label: 'Mon, Dec 21', hours: '2–8 pm', spotsLeft: 8 },
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
        answer: 'Book a Full Holiday Session instead: 1.5 hours on the set with 8 edited photos, starting at $250.',
    },
];

// ─── Christmas set (rental + tour) ──────────────────────────────────────
export const CHRISTMAS_SET = {
    /** Placeholder until the set is photographed — swap for the real set photo. */
    image: HOLIDAY_HERO_IMAGE.desktop,
    blurb: 'A fully styled Christmas set — tree, lights, and cozy holiday décor — ready to shoot the moment you walk in.',
    /** Full-day rental pitch for photographers running their own minis. */
    fullDay: { hours: 8, price: 400 },
};

export const HOLIDAY_ROUTES = {
    minis: '/holiday-minis',
    christmasTruck: '/christmas-truck',
} as const;
