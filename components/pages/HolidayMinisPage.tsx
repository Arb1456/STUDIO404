'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { trackMiniIntent, scrollToMiniBooking, openMiniCalendar } from '@/lib/holiday-tracking';
import { Clock, Camera, Users, PawPrint, Gift, ArrowRight, ArrowDown, ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Holly, Snowflake, Ornament, OrnamentDivider, Snowfall } from '@/components/ui/Christmas';
import { HolidayReviews, SetGallery, ChristmasContact, BookCalendarButton, BookingPanel } from '@/components/pages/holiday/HolidayShared';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import Footer from '@/components/layout/Footer';
import { getArrivalMessage } from '@/lib/arrival';
import { newEventId, trackLead } from '@/lib/tracking';
import {
    MINI_HERO_IMAGE,
    HOLIDAY_OFFERS,
    MINI_DAYS,
    MINI_FAQ,
    MINI_POLICY,
    MINI_ADDONS,
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

/**
 * Live open times as buttons. GHL can't open on a given date or time (URL params ignored,
 * tested Nov 26), so a tap opens the calendar and the caller says which day to tap there.
 */
const TimeChips: React.FC<{ times: string[]; dayLabel: string; cta: string; max?: number; dark?: boolean; compact?: boolean; className?: string }> = ({
    times,
    dayLabel,
    cta,
    max,
    dark = false,
    compact = false,
    className = '',
}) => {
    const shown = max ? times.slice(0, max) : times;
    const more = times.length - shown.length;
    const chip = dark
        ? 'border-cream/30 bg-cream/10 text-cream hover:bg-cream hover:text-evergreen'
        : 'border-charcoal/15 bg-white hover:border-evergreen hover:text-evergreen';
    return (
        <ul className={`flex ${compact ? "flex-nowrap gap-1.5" : "flex-wrap gap-2"} ${className}`} aria-label={`Open times on ${dayLabel}`}>
            {shown.map((t) => (
                <li key={t}>
                    <button
                        type="button"
                        onClick={() => openMiniCalendar(cta)}
                        aria-label={`Book ${dayLabel} at ${t} (opens the booking calendar)`}
                        className={`${compact ? "px-2.5 py-1.5 text-[13px]" : "px-3 py-1.5 text-sm"} whitespace-nowrap border rounded-full transition-colors ${chip}`}
                    >
                        {t}
                    </button>
                </li>
            ))}
            {more > 0 && (
                <li>
                    <button
                        type="button"
                        onClick={() => openMiniCalendar(cta)}
                        className={`${compact ? "px-1.5 py-1.5 text-[13px]" : "px-3 py-1.5 text-sm"} whitespace-nowrap rounded-full underline underline-offset-2 ${dark ? 'text-cream/80' : 'text-charcoal/60'}`}
                    >
                        +{more} more
                    </button>
                </li>
            )}
        </ul>
    );
};

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
                        {soldOut ? 'Sold out' : `${spots} time${spots === 1 ? '' : 's'} left`}
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
                                <TimeChips times={times} dayLabel={day.label} cta={`time-${day.date}`} className="mb-4" />
                            )}
                            <button
                                type="button"
                                onClick={() => openMiniCalendar(`day-${day.date}`)}
                                className="inline-flex items-center gap-2 bg-evergreen text-cream px-5 py-3 text-xs uppercase tracking-widest hover:bg-evergreen/90 transition-colors"
                            >
                                Book {day.label} <ArrowRight size={14} aria-hidden="true" />
                            </button>
                            <p className="mt-2 text-xs text-charcoal/50">Opens the booking calendar. Pick {day.label.split(', ')[1]} there to choose your time.</p>
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
            const eventId = newEventId();
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventId,
                    name: data.get('name'),
                    email: data.get('email'),
                    subject: 'Holiday Minis Waitlist',
                    // The visitor's preferred days/times lead the message so they're the first thing you read in GHL.
                    message: `Preferred days / times: ${String(data.get('availability') || '').trim() || 'Any'}\n\nPlease add me to the Holiday Minis waitlist and let me know if a spot opens.`,
                    source: 'Holiday Minis Page — Waitlist',
                }),
            });
            if (res.ok) trackLead('Holiday Minis Page — Waitlist', eventId);
            setState(res.ok ? 'done' : 'error');
        } catch {
            setState('error');
        }
    };

    if (state === 'done') {
        return <p className="font-serif text-xl">You&apos;re on the list. We&apos;ll reach out first when a time opens.</p>;
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
    // First screen shows the next two days that still have open times (from the live feed once loaded).
    const nextDays = openDays.slice(0, 2);

    return (
        <div className="bg-cream text-charcoal">
            {/* ── 1. First screen: real family, price line, next open days, Book (Nov 26) ──
                Ad visitors left in ~5 s when this was a title + scroll button, so everything
                they need to book sits above the fold on a phone. Same version for all sources. */}
            <section className="relative bg-evergreen text-cream overflow-hidden md:grid md:grid-cols-[1.1fr_1fr] md:min-h-[640px]">
                {/* Green band on top (room for the logo + chat button), fading into the photo so it sits lower. */}
                <div className="relative pt-14 md:pt-0 md:order-2">
                    <div className="relative aspect-[2.1] md:aspect-auto md:absolute md:inset-0">
                        <Image src={MINI_HERO_IMAGE.mobile} alt={MINI_HERO_IMAGE.alt} fill priority className="object-cover md:hidden" sizes="100vw" />
                        <Image src={MINI_HERO_IMAGE.desktop} alt={MINI_HERO_IMAGE.alt} fill priority className="object-cover hidden md:block" sizes="50vw" />
                        <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-evergreen to-transparent md:h-1/5" />
                        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-evergreen to-transparent md:hidden" />
                    </div>
                </div>

                <div className="relative px-5 pt-3 pb-28 md:px-12 md:py-16 md:flex md:flex-col md:justify-center md:order-1">
                    <Snowfall count={8} />
                    <span className="relative flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-gold mb-1">
                        <Holly className="w-5 h-5 shrink-0" />
                        {arrival ?? 'Ottawa · Christmas 2026'}
                    </span>
                    <h1 className="relative font-serif text-[2rem] md:text-6xl leading-none mt-1 mb-1 md:mb-3">Holiday Minis</h1>
                    <p className="relative text-sm md:text-base text-cream/85 mb-3">
                        ${mini.price} · 30 min · {mini.photoCount} edited photos · up to {MINI_POLICY.includedPeople} people
                    </p>

                    {allSoldOut ? (
                        <p className="relative text-cream/85 mb-4">Every mini day is booked. Join the waitlist and we&apos;ll reach out first if a time opens.</p>
                    ) : (
                        <div className="relative space-y-2.5 mb-4 min-h-[112px]">
                            {nextDays.map((d) => {
                                const times = live?.[d.date] ?? null;
                                const left = spotsFor(d);
                                return (
                                    <div key={d.date}>
                                        <p className="text-sm mb-1">
                                            <span className="font-serif text-lg">{d.label}</span>
                                            <span className="ml-2 text-cream/70">{left} time{left === 1 ? '' : 's'} left</span>
                                        </p>
                                        {times ? (
                                            <TimeChips times={times} dayLabel={d.label} cta={`hero-time-${d.date}`} max={3} dark compact />
                                        ) : (
                                            <p className="text-sm text-cream/60">{d.hours}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {allSoldOut ? (
                        <button
                            onClick={() => scrollToBooking()}
                            className="relative w-full md:w-auto md:self-start inline-flex items-center justify-center gap-3 bg-cream text-evergreen px-8 py-4 text-sm uppercase tracking-widest hover:bg-white transition-colors"
                        >
                            Join The Waitlist <ArrowDown size={16} aria-hidden="true" />
                        </button>
                    ) : (
                        <button
                            onClick={() => openMiniCalendar('hero')}
                            className="relative w-full md:w-auto md:self-start inline-flex items-center justify-center gap-3 bg-cream text-evergreen px-8 py-4 text-sm uppercase tracking-widest hover:bg-white transition-colors"
                        >
                            See All Times &amp; Book <ArrowRight size={16} aria-hidden="true" />
                        </button>
                    )}
                    {!allSoldOut && nextDays[0] && (
                        <p className="relative mt-2 text-xs text-cream/60">
                            Opens our booking calendar. Tap your day there to see its times. ${MINI_POLICY.deposit} deposit to book.
                        </p>
                    )}
                    <button
                        onClick={() => scrollToBooking()}
                        className="relative mt-4 self-start inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cream/80 underline underline-offset-4"
                    >
                        All {upcomingDays.length} mini days <ArrowDown size={12} aria-hidden="true" />
                    </button>
                </div>
            </section>

            {/* ── 2. Dates + booking (straight after the first screen) ──────────────────────────────── */}
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
                                : `Minis are only offered on these days. ${totalLeft} times left in all. Tap a day to see its open times.`}
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
                        <BookingPanel
                            id="mini-calendar"
                            calendarUrl={mini.calendarUrl}
                            title="Book a Holiday Mini"
                            deposit={MINI_POLICY.deposit}
                            onOpen={() => trackMiniIntent('booking-panel')}
                        />
                    )}
                    <p className="mt-6 text-xs text-charcoal/50 leading-relaxed">
                        ${mini.price} includes up to {MINI_POLICY.includedPeople} people. Additional people ${MINI_POLICY.extraPersonFee} each.
                        Pets welcome if potty trained. A ${MINI_POLICY.petFee} cleaning fee applies. Group size and pets are confirmed when you book.
                        A ${MINI_POLICY.deposit} deposit holds your spot (refundable up to {MINI_POLICY.refundWindowDays / 7} weeks before your session); the balance plus applicable HST and any extra fees are invoiced together.
                    </p>
                </div>
            </section>

            {/* ── 3. What's included ──────────────────────────────── */}
            <section className="px-6 py-14 md:py-20 max-w-5xl mx-auto">
                <Reveal width="100%">
                    <div className="text-center mb-8">
                        <span className="block text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-2">Your Holiday Mini</span>
                        <p className="font-serif text-6xl md:text-7xl text-evergreen leading-none">${mini.price}</p>
                        <p className="text-sm text-charcoal/60 mt-3">Everything included, on our Christmas set</p>
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
                {/* Optional upgrades: picked on the booking form, added to the balance invoice. */}
                <div className="mt-8 text-center">
                    <span className="block text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-3">Optional Add-Ons</span>
                    <ul className="flex flex-col sm:flex-row justify-center gap-3">
                        {MINI_ADDONS.map((a) => (
                            <li key={a.id} className="flex-1 sm:max-w-xs border border-charcoal/15 bg-white/60 rounded-xl px-5 py-4">
                                <span className="font-serif text-lg">{a.label}</span>
                                <span className="ml-2 text-evergreen font-medium">+${a.price}</span>
                                <span className="block text-xs text-charcoal/50 mt-1">{a.note}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-xs text-charcoal/50 mt-3">Choose add-ons when you book. They&apos;re added to your final invoice.</p>
                </div>
                {!allSoldOut && (
                    <BookCalendarButton
                        calendarUrl={mini.calendarUrl}
                        label="See Times & Book"
                        onOpen={() => trackMiniIntent('view-availability')}
                    />
                )}
            </section>

            {/* ── 4. The set ──────────────────────────────────────── */}
            <SetGallery
                heading="Made for the people you love"
                caption="Four snow-white trees, warm lights, a cozy couch and fluffy carpet. Families, couples and the dog all fit."
            />

            {/* ── 5. Reviews ──────────────────────────────────────── */}
            <HolidayReviews />

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
                        onClick={() => scrollToBooking()}
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
