'use client';
/**
 * Sections shared by the holiday landing pages (/holiday-minis, /holiday-session).
 * Content lives in lib/holiday.ts; these components only lay it out.
 */
import React, { useRef, useState } from 'react';
import { Star, Phone, Mail, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Holly, Snowflake, OrnamentDivider, Snowfall } from '@/components/ui/Christmas';
import { HOLIDAY_SET_CAROUSEL, STUDIO_CONTACT, type HolidayPhotoEra } from '@/lib/holiday';
import { newEventId, trackLead } from '@/lib/tracking';

// ─── Reviews ─────────────────────────────────────────────────────────────

// Real Google reviews, names removed. The first three are Christmas sessions;
// the rest are family shoots from last December.
const REVIEWS = [
    {
        text: 'I called just days before Christmas and André had a cancellation we were able to fit into! The pictures are unreal. My family and I are so happy, we\'ve never had anything like it. He had lots of great ideas and even made my dad smile, which is hard.',
        author: 'A family who booked days before Christmas',
        role: 'Christmas Mini Session',
    },
    {
        text: 'I went for a Christmas photoshoot with my baby niece and the place was lovely. Their customer service was amazing, especially André. He was super nice and friendly. Highly recommend!',
        author: 'An aunt with her baby niece',
        role: 'Christmas Photoshoot',
    },
    {
        text: 'Andre and his team are phenomenal. They provided a great experience getting a photoshoot for me and my girlfriend in time for the holidays!',
        author: 'A couple shooting before the holidays',
        role: 'Holiday Couples Session',
    },
    {
        text: 'I have been doing photoshoots with the family in Ottawa for years. This was hands down the best photoshoot experience I have had. The photographer had my youngest daughter smiling the whole time!',
        author: 'A dad who has done family photos for years',
        role: 'Family Session',
    },
    {
        text: 'Did a wonderful job with our family photoshoot. Patient with the kids and able to keep a toddler interested and smiling. Thank you!',
        author: 'Parents with a toddler',
        role: 'Family Session',
    },
    {
        text: 'Very good quality family photos and Andre is very professional and calm, especially with little kids. Would highly recommend!',
        author: 'A family with little kids',
        role: 'Family Session',
    },
];

export const HolidayReviews: React.FC = () => (
    <section className="relative overflow-hidden bg-charcoal text-cream px-6 py-20 md:py-28">
        <Snowfall count={16} />
        <Snowflake className="absolute -top-6 -left-6 w-28 h-28 text-gold opacity-10 pointer-events-none" />
        <Snowflake className="absolute -bottom-8 -right-8 w-36 h-36 text-gold opacity-10 pointer-events-none" />
        <OrnamentDivider tone="light" className="relative mb-12" />
        {/* Mobile: horizontal swipe carousel (scroll-snap). md+: side-by-side grid. */}
        <div
            className="relative -mx-6 px-6 scroll-px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar md:mx-auto md:px-0 md:max-w-5xl md:grid md:grid-cols-3 md:gap-x-10 md:gap-y-14 md:overflow-visible"
            aria-label="Client reviews"
        >
            {REVIEWS.map((r) => (
                <div key={r.author} className="shrink-0 w-[85%] sm:w-[60%] md:w-auto snap-start">
                    <figure className="h-full border border-cream/15 md:border-0 p-6 md:p-0">
                        <div className="flex gap-0.5 mb-5" aria-label="5 out of 5 stars">
                            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="text-gold fill-gold" />)}
                        </div>
                        <blockquote className="font-serif italic text-lg md:text-xl leading-relaxed mb-5">&ldquo;{r.text}&rdquo;</blockquote>
                        <figcaption className="text-xs uppercase tracking-widest text-cream/60">— {r.author} · {r.role}</figcaption>
                    </figure>
                </div>
            ))}
        </div>
        <p className="relative md:hidden text-center text-[10px] uppercase tracking-[0.25em] text-cream/40 mt-6" aria-hidden="true">
            Swipe for more →
        </p>
    </section>
);

// ─── Christmas set gallery ───────────────────────────────────────────────

const ERA_LABEL: Record<HolidayPhotoEra, string> = {
    '2026-set': 'New 2026 set',
    '2026-client': '2026 mini session',
    '2025-client': 'Christmas 2025 client',
};

/**
 * Swipeable carousel mixing this year's set with real client photos
 * from this year's minis and last year's set. Fixed height, natural widths, so no photo is cropped.
 */
export const SetGallery: React.FC<{ heading: string; caption?: string }> = ({ heading, caption }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: 1 | -1) => {
        const el = trackRef.current;
        if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
    };

    return (
        <section className="pb-20 md:pb-28">
            <div className="px-6 max-w-6xl mx-auto">
                <OrnamentDivider className="mb-6" />
                <Reveal width="100%">
                    <h2 className="font-serif text-4xl md:text-5xl text-center mb-3">{heading}</h2>
                    {caption && <p className="text-center text-charcoal/60 max-w-xl mx-auto mb-4">{caption}</p>}
                    <p className="text-center text-sm text-charcoal/70 max-w-xl mx-auto mb-10">
                        Our set is brand new for 2026, and the first minis are in. Photos labelled{' '}
                        <span className="italic">Christmas 2025 client</span> were taken on last year&apos;s set.
                    </p>
                </Reveal>
            </div>
            <div className="relative max-w-7xl mx-auto">
                <div
                    ref={trackRef}
                    className="flex gap-2 md:gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 scroll-px-6"
                    aria-label="Christmas set and client photos"
                    tabIndex={0}
                >
                    {HOLIDAY_SET_CAROUSEL.map((photo) => (
                        <figure
                            key={photo.id}
                            className="relative shrink-0 snap-start h-[340px] md:h-[460px] overflow-hidden bg-charcoal/5"
                            style={{ aspectRatio: photo.ratio }}
                        >
                            <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full h-full object-cover" />
                            <figcaption
                                className={`absolute left-2 top-2 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${
                                    photo.era !== '2025-client' ? 'bg-evergreen text-cream' : 'bg-cream/90 text-charcoal'
                                }`}
                            >
                                {ERA_LABEL[photo.era]}
                            </figcaption>
                        </figure>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => scroll(-1)}
                    aria-label="Previous photos"
                    className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-cream/90 text-charcoal shadow hover:bg-cream"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    type="button"
                    onClick={() => scroll(1)}
                    aria-label="Next photos"
                    className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-cream/90 text-charcoal shadow hover:bg-cream"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
            <p className="md:hidden text-center text-[10px] uppercase tracking-[0.25em] text-charcoal/40 mt-5" aria-hidden="true">
                Swipe for more →
            </p>
        </section>
    );
};

// ─── Christmas at Studio 404 — call / email / inquiry ────────────────────

const ChristmasInquiryForm: React.FC<{ source: string }> = ({ source }) => {
    const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setState('sending');
        const data = new FormData(e.currentTarget);
        const phone = data.get('phone');
        try {
            const eventId = newEventId();
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.get('name'),
                    email: data.get('email'),
                    subject: 'Christmas at Studio 404 — Inquiry',
                    message: `${data.get('message')}${phone ? `\n\nPhone: ${phone}` : ''}`,
                    source,
                    eventId,
                }),
            });
            if (res.ok) trackLead(source, eventId);
            setState(res.ok ? 'done' : 'error');
        } catch {
            setState('error');
        }
    };

    if (state === 'done') {
        return <p className="font-serif text-2xl">Thanks — we&apos;ll be in touch shortly.</p>;
    }

    const field = 'w-full bg-transparent border-b border-charcoal/25 p-3 outline-none focus:border-charcoal';
    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="ci-name" className="text-xs uppercase tracking-widest text-charcoal/50">Name</label>
                    <input id="ci-name" name="name" required className={field} />
                </div>
                <div>
                    <label htmlFor="ci-phone" className="text-xs uppercase tracking-widest text-charcoal/50">Phone</label>
                    <input id="ci-phone" name="phone" type="tel" className={field} />
                </div>
            </div>
            <div>
                <label htmlFor="ci-email" className="text-xs uppercase tracking-widest text-charcoal/50">Email</label>
                <input id="ci-email" name="email" type="email" required className={field} />
            </div>
            <div>
                <label htmlFor="ci-message" className="text-xs uppercase tracking-widest text-charcoal/50">How can we help?</label>
                <textarea id="ci-message" name="message" required rows={4} className={`${field} resize-none`} />
            </div>
            <button disabled={state === 'sending'} className="px-8 py-4 bg-evergreen text-cream text-xs uppercase tracking-widest hover:bg-evergreen/90 transition-colors">
                {state === 'sending' ? 'Sending…' : 'Send Inquiry'}
            </button>
            {state === 'error' && <p className="text-sm text-red-800">Something went wrong — please call or email us.</p>}
        </form>
    );
};

/** `source` tags the inquiry in GHL so you can tell which page it came from. */
export const ChristmasContact: React.FC<{ source: string }> = ({ source }) => (
    <section id="christmas-at-studio-404" className="scroll-mt-8 px-6 py-20 md:py-28 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 border-b border-charcoal/10">
        <Reveal>
            <div>
                <span className="block text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-3">Questions or something custom?</span>
                <h2 className="font-serif text-4xl md:text-5xl mb-5">
                    Christmas at <span className="italic">Studio 404</span>
                    <Holly className="inline-block w-10 h-10 md:w-12 md:h-12 ml-2 -mt-2 align-middle" />
                </h2>
                <p className="text-charcoal/70 mb-8 max-w-md">
                    Big family, special request, or not sure which session fits? Call, email, or send us a note and we&apos;ll help you plan it.
                </p>
                <div className="flex flex-col gap-4">
                    <a href={STUDIO_CONTACT.phoneHref} className="inline-flex items-center gap-3 font-serif text-2xl no-underline text-charcoal hover:text-evergreen">
                        <Phone size={20} aria-hidden="true" /> {STUDIO_CONTACT.phoneDisplay}
                    </a>
                    <a href={`mailto:${STUDIO_CONTACT.email}?subject=Christmas%20at%20Studio%20404`} className="inline-flex items-center gap-3 font-serif text-2xl no-underline text-charcoal hover:text-evergreen">
                        <Mail size={20} aria-hidden="true" /> {STUDIO_CONTACT.email}
                    </a>
                </div>
            </div>
        </Reveal>
        <Reveal delay={0.1}>
            <ChristmasInquiryForm source={source} />
        </Reveal>
    </section>
);

// ─── View Availability dropdown ─────────────────────────────────────────

/**
 * "View Availability" button that expands the GHL booking calendar in place, so
 * visitors can book right after reading what's included. The iframe only mounts
 * once opened, so visitors who never tap it don't load the GHL widget twice.
 */
/** Open a GHL booking calendar in its own tab.
 *  Not embedded: inside an iframe, Stripe Link's saved-card code prompt hangs the
 *  payment step and Apple Pay is unavailable (tested Nov 15, 2026). */
export const openBookingCalendar = (calendarUrl: string) =>
    window.open(calendarUrl, '_blank', 'noopener,noreferrer');

/** Centered "book now" button used under the offer details. */
export const BookCalendarButton: React.FC<{
    calendarUrl: string;
    label: string;
    /** Fired before the calendar opens (booking-intent tracking). */
    onOpen: () => void;
}> = ({ calendarUrl, label, onOpen }) => (
    <div className="mt-10 text-center">
        <button
            onClick={() => {
                onOpen();
                openBookingCalendar(calendarUrl);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-evergreen text-cream px-8 py-5 text-sm uppercase tracking-widest hover:bg-evergreen/90 transition-colors"
        >
            {label} <ExternalLink size={16} aria-hidden="true" />
        </button>
        <p className="mt-3 text-xs text-charcoal/50">Opens our secure booking calendar in a new tab</p>
    </div>
);

/** Booking card that replaces the embedded calendar: what happens next + one big button. */
export const BookingPanel: React.FC<{
    calendarUrl: string;
    title: string;
    deposit: number;
    onOpen: () => void;
    id?: string;
}> = ({ calendarUrl, title, deposit, onOpen, id }) => (
    <div id={id} className="scroll-mt-8 bg-white border border-charcoal/10 rounded-2xl overflow-hidden">
        <div className="relative bg-evergreen text-cream px-8 py-7 overflow-hidden">
            <Snowfall count={8} />
            <span className="relative flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold mb-2">
                <Snowflake className="w-4 h-4" /> Secure booking
            </span>
            <p className="relative font-serif text-3xl">{title}</p>
        </div>
        <div className="px-8 py-8">
            <ol className="space-y-5 mb-8">
                {[
                    ['Pick your time', 'See every open time and choose the one that works.'],
                    ['Add your details', 'Group size, pets and any add-ons.'],
                    [`Pay your $${deposit} deposit`, 'Apple Pay, Google Pay, PayPal or card. The remaining balance is invoiced later.'],
                ].map(([head, body], i) => (
                    <li key={head} className="flex gap-4">
                        <span className="shrink-0 w-8 h-8 rounded-full bg-cream text-evergreen font-serif text-lg flex items-center justify-center">{i + 1}</span>
                        <span>
                            <span className="block font-serif text-lg leading-snug">{head}</span>
                            <span className="block text-sm text-charcoal/60">{body}</span>
                        </span>
                    </li>
                ))}
            </ol>
            <button
                onClick={() => {
                    onOpen();
                    openBookingCalendar(calendarUrl);
                }}
                className="w-full inline-flex items-center justify-center gap-3 bg-evergreen text-cream px-8 py-5 text-sm uppercase tracking-widest hover:bg-evergreen/90 transition-colors"
            >
                Open Booking Calendar <ExternalLink size={16} aria-hidden="true" />
            </button>
            <p className="mt-3 text-center text-xs text-charcoal/50">Opens in a new tab. Your confirmation shows there once you&apos;re booked.</p>
        </div>
    </div>
);
