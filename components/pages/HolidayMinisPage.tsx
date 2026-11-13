'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { trackMiniIntent, scrollToMiniBooking } from '@/lib/holiday-tracking';
import { Clock, Camera, Users, PawPrint, Gift, Star, ExternalLink, ArrowDown, ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Holly, Snowflake, Ornament, OrnamentDivider, EmblemScatter, Snowfall } from '@/components/ui/Christmas';
import { HolidayReviews, SetGallery, ChristmasContact, AvailabilityDropdown } from '@/components/pages/holiday/HolidayShared';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import Footer from '@/components/layout/Footer';
import { getArrivalMessage } from '@/lib/arrival';
import {
    HOLIDAY_HERO_IMAGE,
    HOLIDAY_OFFERS,
    MINI_DAYS,
    MINI_FAQ,
    MINI_POLICY,
    HOLIDAY_ROUTES,
    type MiniDay,
} from '@/lib/holiday';

// Tracking + CTA actions shared with the bottom nav bar — see lib/holiday-tracking.ts
const scrollToBooking = scrollToMiniBooking;

// ─── Sub-components ──────────────────────────────────────────────────────

/** Live open times per ISO date from /api/holiday-availability; null until loaded (or if it fails). */
type LiveSlots = Record<string, string[]> | null;

/** Today's date in Toronto as YYYY-MM-DD, so finished mini days drop off the list. */
const torontoToday = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Toronto' });

/** Scroll to the main booking calendar in section 5. */
const scrollToCalendar = () =>
    document.getElementById('mini-calendar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const DayChip: React.FC<{ day: MiniDay; times: string[] | null; spots: number }> = ({ day, times, spots }) => {
    const [open, setOpen] = useState(false);
    const soldOut = spots === 0;
    const low = !soldOut && spots <= 3;
    return (
        <li className="border-b border-charcoal/15">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-white/60 transition-colors ${soldOut ? 'opacity-50' : ''}`}
            >
                <span className={soldOut ? 'line-through' : ''}>
                    <span className="font-serif text-lg">{day.label}</span>
                    <span className="ml-2 text-sm text-charcoal/50">{day.hours}</span>
                </span>
                <span className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs uppercase tracking-widest ${low ? 'text-red-800 font-medium' : 'text-charcoal/60'}`}>
                        {soldOut ? 'Sold out' : `${spots} spot${spots === 1 ? '' : 's'} left`}
                    </span>
                    <ChevronDown size={14} className={`text-charcoal/40 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                </span>
            </button>
            {open && (
                <div className="px-4 pb-4">
                    {soldOut ? (
                        <p className="text-sm text-charcoal/60">This day is full. Join the waitlist below and we&apos;ll reach out if a spot opens.</p>
                    ) : (
                        <>
                            {times && (
                                <ul className="flex flex-wrap gap-2 mb-4" aria-label={`Open times on ${day.label}`}>
                                    {times.map((t) => (
                                        <li key={t} className="px-3 py-1.5 text-sm bg-white border border-charcoal/15 rounded-full">{t}</li>
                                    ))}
                                </ul>
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    trackMiniIntent(`day-${day.date}`);
                                    scrollToCalendar();
                                }}
                                className="inline-flex items-center gap-2 bg-evergreen text-cream px-5 py-3 text-xs uppercase tracking-widest hover:bg-evergreen/90 transition-colors"
                            >
                                Book {day.label}
                            </button>
                            <p className="mt-2 text-xs text-charcoal/50">Pick {day.label.split(', ')[1]} in the calendar to choose your time.</p>
                        </>
                    )}
                </div>
            )}
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
                    // The visitor's preferred days/times lead the message so they're the first thing you read in GHL.
                    message: `Preferred days / times: ${String(data.get('availability') || '').trim() || 'Any'}\n\nPlease add me to the Holiday Minis waitlist and let me know if a spot opens.`,
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
                <label className="sr-only" htmlFor="wl-name">Name</label>
                <input id="wl-name" name="name" required placeholder="Your name" className="flex-1 min-w-0 bg-transparent border-b border-charcoal/30 p-3 outline-none focus:border-charcoal" />
                <label className="sr-only" htmlFor="wl-email">Email</label>
                <input id="wl-email" name="email" type="email" required placeholder="Email" className="flex-1 min-w-0 bg-transparent border-b border-charcoal/30 p-3 outline-none focus:border-charcoal" />
            </div>
            <label className="sr-only" htmlFor="wl-availability">Days and times that work for you</label>
            <textarea
                id="wl-availability"
                name="availability"
                rows={2}
                placeholder="Which days and times work for you? (e.g. any weekend afternoon, Dec 19 after 4 pm)"
                className="bg-transparent border-b border-charcoal/30 p-3 outline-none focus:border-charcoal resize-none"
            />
            <button disabled={state === 'sending'} className="self-start px-6 py-3 border border-charcoal text-xs uppercase tracking-widest hover:bg-charcoal hover:text-cream transition-colors">
                {state === 'sending' ? 'Sending…' : 'Join waitlist'}
            </button>
            {state === 'error' && <p className="text-sm text-red-800">Something went wrong. Please call us.</p>}
        </form>
    );
};

// ─── Page ────────────────────────────────────────────────────────────────

const HolidayMinisPage: React.FC = () => {
    const mini = HOLIDAY_OFFERS.mini;
    const full = HOLIDAY_OFFERS.full;
        const [arrival, setArrival] = useState<string | null>(null);

    // Read utm_source client-side (avoids a Suspense boundary for useSearchParams on a static page)
    useEffect(() => {
        const source = new URLSearchParams(window.location.search).get('utm_source');
        setArrival(getArrivalMessage(source));
    }, []);

    // Live open times from GHL. On failure, stays null and the hand-entered spotsLeft numbers are shown.
    const [live, setLive] = useState<LiveSlots>(null);
    const [today, setToday] = useState<string | null>(null);
    useEffect(() => {
        setToday(torontoToday());
        fetch('/api/holiday-availability')
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => data?.days && setLive(data.days))
            .catch(() => {});
    }, []);

    const spotsFor = (d: MiniDay) => (live ? (live[d.date]?.length ?? 0) : d.spotsLeft);
    // Finished days drop off the list (today is set client-side so the static build doesn't freeze it).
    const upcomingDays = today ? MINI_DAYS.filter((d) => d.date >= today) : MINI_DAYS;
    const openDays = upcomingDays.filter((d) => spotsFor(d) > 0);
    const totalLeft = openDays.reduce((sum, d) => sum + spotsFor(d), 0);
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
                {!allSoldOut && (
                    <AvailabilityDropdown
                        calendarUrl={mini.calendarUrl}
                        title="Book a Holiday Mini Session"
                        onOpen={() => trackMiniIntent('view-availability')}
                    />
                )}
            </section>

            {/* ── 3. The set ──────────────────────────────────────── */}
            <SetGallery
                heading="Made for the people you love"
                caption="Four snow-white trees, warm lights, a cozy couch and fluffy carpet — families, couples and the dog all fit."
            />

            {/* ── 4. Reviews ──────────────────────────────────────── */}
            <HolidayReviews />

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
                                : `Minis are only offered on these specific days and times — ${totalLeft} spots left. Tap a day to see its open times.`}
                        </p>
                    </Reveal>
                    <ul className="border-t border-charcoal/15 mb-10">
                        {upcomingDays.map((d) => (
                            <DayChip key={d.date} day={d} times={live ? live[d.date] ?? [] : null} spots={spotsFor(d)} />
                        ))}
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
                            <div id="mini-calendar" className="scroll-mt-8 bg-white border border-charcoal/10 rounded-2xl overflow-hidden">
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
                        A ${MINI_POLICY.deposit} deposit holds your spot (refundable up to {MINI_POLICY.refundWindowDays / 7} weeks before your session); the balance plus applicable HST and any extra fees are invoiced together.
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
                    <Link href={HOLIDAY_ROUTES.fullSession} className="shrink-0 inline-flex items-center justify-center border border-cream/50 px-8 py-4 text-xs uppercase tracking-widest no-underline text-cream hover:bg-cream hover:text-evergreen transition-colors">
                        See the Full Session
                    </Link>
                </div>
            </section>

            {/* ── 7. Christmas at Studio 404 — call / email / inquiry ── */}
            <ChristmasContact source="Holiday Minis Page — Christmas at Studio 404" />

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
