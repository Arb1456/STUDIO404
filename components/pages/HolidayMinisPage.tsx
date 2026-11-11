'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { trackMiniIntent, scrollToMiniBooking } from '@/lib/holiday-tracking';
import { Clock, Camera, Users, PawPrint, Gift, Star, ExternalLink, ArrowDown, Phone, Mail } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Holly, Snowflake, Ornament, OrnamentDivider, EmblemScatter, Snowfall } from '@/components/ui/Christmas';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import Footer from '@/components/layout/Footer';
import { cloudinaryUrl } from '@/lib/cloudinary';
import { getArrivalMessage } from '@/lib/arrival';
import {
    HOLIDAY_HERO_IMAGE,
    HOLIDAY_OFFERS,
    MINI_DAYS,
    MINI_FAQ,
    MINI_POLICY,
    STUDIO_CONTACT,
    type MiniDay,
} from '@/lib/holiday';

// Tracking + CTA actions shared with the bottom nav bar — see lib/holiday-tracking.ts
const scrollToBooking = scrollToMiniBooking;

// ─── Examples (existing session photos until the Christmas set is shot) ───
const EXAMPLES = {
    families: [1, 2, 3].map((i) => cloudinaryUrl(`FAMILY-SESSION-0${i}`, { width: 700 })),
    couples: [1, 2, 3].map((i) => cloudinaryUrl(`COUPLE-SESSION-0${i}`, { width: 700 })),
};

const REVIEWS = [
    {
        text: 'I called just days before Christmas and André had a cancellation we were able to fit into! The pictures are unreal — he had lots of great ideas and even made my dad smile, which is hard.',
        author: 'Cassandra Bennett',
        role: 'Mini Christmas Session',
    },
    {
        text: 'The pictures are unreal — my whole family is so happy, we\'ve never had anything like it. Andre genuinely made everyone laugh and feel at ease.',
        author: 'Happy Family',
        role: 'Family Session',
    },
    {
        text: 'Andre reached out before our session to get all the details and even researched reference photos. During the shoot he was calm, patient, and incredibly professional. The whole experience felt personal and thoughtful.',
        author: 'Happy Couple',
        role: 'Couples Session',
    },
];

// ─── Sub-components ──────────────────────────────────────────────────────

const DayChip: React.FC<{ day: MiniDay }> = ({ day }) => {
    const soldOut = day.spotsLeft === 0;
    const low = !soldOut && day.spotsLeft <= 3;
    return (
        <li className={`flex items-center justify-between px-4 py-3 border-b border-charcoal/15 ${soldOut ? 'opacity-50' : ''}`}>
            <span className={soldOut ? 'line-through' : ''}>
                <span className="font-serif text-lg">{day.label}</span>
                <span className="ml-2 text-sm text-charcoal/50">{day.hours}</span>
            </span>
            <span className={`text-xs uppercase tracking-widest ${low ? 'text-red-800 font-medium' : 'text-charcoal/60'}`}>
                {soldOut ? 'Sold out' : `${day.spotsLeft} spot${day.spotsLeft === 1 ? '' : 's'} left`}
            </span>
        </li>
    );
};

const WaitlistForm: React.FC = () => {
    const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setState('sending');
        const data = new FormData(e.currentTarget);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.get('name'),
                    email: data.get('email'),
                    subject: 'Holiday Minis Waitlist',
                    message: 'Please add me to the Holiday Minis waitlist / notify me when new dates open.',
                    source: 'Holiday Minis Page — Waitlist',
                }),
            });
            setState(res.ok ? 'done' : 'error');
        } catch {
            setState('error');
        }
    };

    if (state === 'done') {
        return <p className="font-serif text-xl">You&apos;re on the list — we&apos;ll reach out first when spots open.</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <label className="sr-only" htmlFor="wl-name">Name</label>
            <input id="wl-name" name="name" required placeholder="Your name" className="flex-1 bg-transparent border-b border-charcoal/30 p-3 outline-none focus:border-charcoal" />
            <label className="sr-only" htmlFor="wl-email">Email</label>
            <input id="wl-email" name="email" type="email" required placeholder="Email" className="flex-1 bg-transparent border-b border-charcoal/30 p-3 outline-none focus:border-charcoal" />
            <button disabled={state === 'sending'} className="px-6 py-3 border border-charcoal text-xs uppercase tracking-widest hover:bg-charcoal hover:text-cream transition-colors">
                {state === 'sending' ? 'Sending…' : 'Join waitlist'}
            </button>
            {state === 'error' && <p className="text-sm text-red-800 sm:self-center">Something went wrong — please call us.</p>}
        </form>
    );
};

const ChristmasInquiryForm: React.FC = () => {
    const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setState('sending');
        const data = new FormData(e.currentTarget);
        const phone = data.get('phone');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.get('name'),
                    email: data.get('email'),
                    subject: 'Christmas at Studio 404 — Inquiry',
                    message: `${data.get('message')}${phone ? `\n\nPhone: ${phone}` : ''}`,
                    source: 'Holiday Minis Page — Christmas at Studio 404',
                }),
            });
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

// ─── Page ────────────────────────────────────────────────────────────────

const HolidayMinisPage: React.FC = () => {
    const mini = HOLIDAY_OFFERS.mini;
    const full = HOLIDAY_OFFERS.full;
    const [audience, setAudience] = useState<'families' | 'couples'>('families');
    const [arrival, setArrival] = useState<string | null>(null);

    // Read utm_source client-side (avoids a Suspense boundary for useSearchParams on a static page)
    useEffect(() => {
        const source = new URLSearchParams(window.location.search).get('utm_source');
        setArrival(getArrivalMessage(source));
    }, []);

    const openDays = MINI_DAYS.filter((d) => d.spotsLeft > 0);
    const totalLeft = openDays.reduce((sum, d) => sum + d.spotsLeft, 0);
    const allSoldOut = openDays.length === 0;

    return (
        <div className="bg-cream text-charcoal">
            {/* ── 1. Hero ─────────────────────────────────────────── */}
            <section className="relative bg-evergreen text-cream overflow-hidden">
                <div className="absolute inset-0">
                    <div className="block md:hidden absolute inset-0">
                        <Image src={HOLIDAY_HERO_IMAGE.mobile} alt="" fill priority className="object-cover opacity-30" sizes="100vw" />
                    </div>
                    <div className="hidden md:block absolute inset-0">
                        <Image src={HOLIDAY_HERO_IMAGE.desktop} alt="" fill priority className="object-cover opacity-30" sizes="100vw" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-evergreen via-evergreen/70 to-evergreen/30" />
                    <EmblemScatter />
                    <Snowfall />
                </div>

                {/* Centered on mobile, left-aligned from md up. Offer details live in the next section. */}
                <div className="relative px-6 pt-28 pb-12 md:pt-44 md:pb-24 max-w-5xl mx-auto text-center md:text-left">
                    <Reveal width="100%">
                        <span className="inline-flex flex-col md:flex-row items-center gap-2 md:gap-3 text-xs tracking-[0.25em] uppercase text-gold mb-5">
                            <Holly className="w-10 h-10 md:w-8 md:h-8 md:-my-2 shrink-0" />
                            {arrival ?? 'Ottawa · Christmas 2026 · Limited Dates'}
                        </span>
                    </Reveal>
                    <Reveal delay={0.1} width="100%">
                        <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8">
                            Holiday Minis <br />
                            <span className="italic font-light">in Ottawa</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2} width="100%">
                        <div className="flex flex-col items-center md:items-start gap-5">
                            {/* Hero scrolls to dates + booking; the bottom nav bar opens the calendar directly. */}
                            <button
                                onClick={() => scrollToBooking(allSoldOut ? 'hero-waitlist' : 'hero')}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-cream text-evergreen px-8 py-5 text-sm uppercase tracking-widest hover:bg-white transition-colors"
                            >
                                {allSoldOut ? 'Join The Waitlist' : 'Pick Your Time Slot'} <ArrowDown size={16} />
                            </button>
                            <span className="flex items-center gap-2 text-sm text-cream/80">
                                <span className="flex gap-0.5" aria-hidden="true">
                                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="text-gold fill-gold" />)}
                                </span>
                                Over 100 five-star reviews
                            </span>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── 2. What's included ──────────────────────────────── */}
            <section className="px-6 py-14 md:py-20 max-w-5xl mx-auto">
                <Reveal width="100%">
                    <div className="text-center mb-8">
                        <span className="block text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-2">Your Holiday Mini</span>
                        <p className="font-serif text-6xl md:text-7xl text-evergreen leading-none">${mini.price}</p>
                        <p className="text-sm text-charcoal/60 mt-3">Everything included — on our Christmas set</p>
                        <p className="text-xs text-charcoal/50 mt-1">${MINI_POLICY.deposit} deposit to book · refundable up to {MINI_POLICY.refundWindowDays / 7} weeks before</p>
                    </div>
                </Reveal>
                <ul className="grid grid-cols-2 md:grid-cols-5 border-t border-charcoal/20">
                    {[
                        { icon: Clock, label: `${mini.durationLabel} Session`, note: mini.outfitLabel },
                        { icon: Camera, label: mini.photoLabel },
                        { icon: Users, label: `Up to ${MINI_POLICY.includedPeople} People`, note: 'More costs extra' },
                        { icon: PawPrint, label: 'Kids & Pets Welcome' },
                        { icon: Gift, label: MINI_POLICY.deliveryLabel, note: 'In time for cards & gifts' },
                    ].map(({ icon: Icon, label, note }, i) => (
                        // 5 items in a 2-col mobile grid: let the last one span both columns so it sits centered
                        <li key={label} className={`flex flex-col items-center gap-3 py-6 px-2 border-b border-charcoal/20 text-center ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                            <Icon size={20} className="text-evergreen" aria-hidden="true" />
                            <span className="font-serif italic text-lg leading-snug">
                                {label}
                                {note && <span className="block font-sans not-italic text-xs text-charcoal/50 mt-1">{note}</span>}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* ── 3. Families / Couples examples ──────────────────── */}
            <section className="px-6 pb-20 md:pb-28 max-w-6xl mx-auto">
                <OrnamentDivider className="mb-6" />
                <Reveal>
                    <h2 className="font-serif text-4xl md:text-5xl text-center mb-8">Made for the people you love</h2>
                </Reveal>
                <div role="tablist" aria-label="Example sessions" className="flex justify-center gap-8 mb-10">
                    {(['families', 'couples'] as const).map((key) => (
                        <button
                            key={key}
                            role="tab"
                            aria-selected={audience === key}
                            onClick={() => setAudience(key)}
                            className={`font-serif italic text-2xl pb-1 border-b transition-colors capitalize ${audience === key ? 'border-charcoal text-charcoal' : 'border-transparent text-charcoal/40 hover:text-charcoal/70'}`}
                        >
                            {key}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-1 md:gap-2">
                    {EXAMPLES[audience].map((src, i) => (
                        <div key={src} className="aspect-[3/4] overflow-hidden bg-charcoal/5">
                            <img
                                src={src}
                                alt={`${audience === 'families' ? 'Family' : 'Couple'} session example ${i + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 4. Reviews ──────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-charcoal text-cream px-6 py-20 md:py-28">
                <Snowfall count={16} />
                <Snowflake className="absolute -top-6 -left-6 w-28 h-28 text-gold opacity-10 pointer-events-none" />
                <Snowflake className="absolute -bottom-8 -right-8 w-36 h-36 text-gold opacity-10 pointer-events-none" />
                <OrnamentDivider tone="light" className="relative mb-12" />
                {/* Mobile: horizontal swipe carousel (scroll-snap). md+: side-by-side grid. */}
                <div
                    className="relative -mx-6 px-6 scroll-px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar md:mx-auto md:px-0 md:max-w-5xl md:grid md:grid-cols-3 md:gap-10 md:overflow-visible"
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

            {/* ── 5. Dates + booking ──────────────────────────────── */}
            <section id="book" className="scroll-mt-8 px-6 py-20 md:py-28 max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-12">
                <div>
                    <Reveal>
                        <span className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-3">
                            <Snowflake className="w-4 h-4 text-gold" /> Mini session days
                        </span>
                        <h2 className="font-serif text-4xl mb-3">Pick your day</h2>
                        <p className="text-charcoal/70 mb-8">
                            {allSoldOut
                                ? 'All mini days are booked. Join the waitlist and we’ll reach out first if spots open.'
                                : `Minis are only offered on these specific days and times — ${totalLeft} spots left.`}
                        </p>
                    </Reveal>
                    <ul className="border-t border-charcoal/15 mb-10">
                        {MINI_DAYS.map((d) => <DayChip key={d.label} day={d} />)}
                    </ul>
                    <div className="bg-white/60 border border-charcoal/10 rounded-xl p-6">
                        <p className="font-serif text-xl mb-1">Day sold out?</p>
                        <p className="text-sm text-charcoal/60 mb-4">Get first dibs on cancellations and new dates.</p>
                        <WaitlistForm />
                    </div>
                </div>

                <div>
                    {!allSoldOut && (
                        <>
                            <div className="bg-white border border-charcoal/10 rounded-2xl overflow-hidden">
                                <iframe
                                    src={mini.calendarUrl}
                                    title="Book a Holiday Mini Session"
                                    loading="lazy"
                                    className="w-full h-[760px] border-0"
                                />
                                {/* No GHL form_embed.js: it hides iframes whose src isn't a calendar-ID
                                    embed URL (ours are slug URLs). Plain iframe + fixed height instead. */}
                            </div>
                            <a
                                href={mini.calendarUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackMiniIntent('calendar-new-tab')}
                                className="mt-4 inline-flex items-center gap-2 text-sm text-charcoal/60 underline underline-offset-4 hover:text-charcoal"
                            >
                                Calendar not loading? Open it in a new tab <ExternalLink size={14} />
                            </a>
                        </>
                    )}
                    <p className="mt-6 text-xs text-charcoal/50 leading-relaxed">
                        ${mini.price} includes up to {MINI_POLICY.includedPeople} people. Additional people ${MINI_POLICY.extraPersonFee} each.
                        Pets welcome if potty trained — ${MINI_POLICY.petFee} cleaning fee applies. Group size and pets are confirmed when you book.
                        A ${MINI_POLICY.deposit} deposit holds your spot (refundable up to {MINI_POLICY.refundWindowDays / 7} weeks before your session); the balance and any extra fees are invoiced together.
                    </p>
                </div>
            </section>

            {/* ── 6. Upgrade ──────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-evergreen text-cream px-6 py-16 md:py-20">
                <Snowfall count={14} />
                <Ornament className="absolute top-6 right-[38%] w-12 h-12 text-gold opacity-20 pointer-events-none hidden md:block" />
                <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <span className="block text-xs tracking-[0.2em] uppercase text-gold mb-2">Want more time?</span>
                        <h2 className="font-serif text-3xl md:text-4xl mb-2">Full Holiday Session</h2>
                        <p className="text-cream/75">
                            {full.durationLabel} on the Christmas set · {full.photoCount} edited photos · from ${full.price}. Any available day.
                        </p>
                    </div>
                    <Link href="/photoshoot" className="shrink-0 inline-flex items-center justify-center border border-cream/50 px-8 py-4 text-xs uppercase tracking-widest no-underline text-cream hover:bg-cream hover:text-evergreen transition-colors">
                        See Holiday Sessions
                    </Link>
                </div>
            </section>

            {/* ── 7. Christmas at Studio 404 — call / email / inquiry ── */}
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
                    <ChristmasInquiryForm />
                </Reveal>
            </section>

            {/* ── 8. FAQ ──────────────────────────────────────────── */}
            <section className="px-6 py-20 md:py-28">
                <OrnamentDivider className="mb-6" />
                <Reveal>
                    <h2 className="font-serif text-4xl md:text-5xl text-center mb-12">Good to know</h2>
                </Reveal>
                <FAQAccordion items={MINI_FAQ} />
                <div className="text-center mt-14">
                    <button
                        onClick={() => scrollToBooking('faq')}
                        className="inline-flex items-center gap-3 bg-evergreen text-cream px-8 py-5 text-sm uppercase tracking-widest hover:bg-evergreen/90 transition-colors"
                    >
                        Book Your Holiday Mini · ${mini.price}
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HolidayMinisPage;
