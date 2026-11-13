'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Camera, Shirt, CalendarDays, Users, Star, ExternalLink, ArrowDown, Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Holly, Snowflake, Ornament, OrnamentDivider, EmblemScatter, Snowfall } from '@/components/ui/Christmas';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import Footer from '@/components/layout/Footer';
import { HolidayReviews, SetGallery, ChristmasContact, AvailabilityDropdown } from '@/components/pages/holiday/HolidayShared';
import { trackFullSessionIntent, scrollToFullSessionBooking } from '@/lib/holiday-tracking';
import { HOLIDAY_HERO_IMAGE, HOLIDAY_OFFERS, HOLIDAY_ROUTES, FULL_SESSION_FAQ, CHRISTMAS_SET } from '@/lib/holiday';

const HolidaySessionPage: React.FC = () => {
    const full = HOLIDAY_OFFERS.full;
    const mini = HOLIDAY_OFFERS.mini;

    // Side-by-side comparison — the main question visitors arrive with.
    const compare = [
        { label: 'Time on set', full: full.durationLabel, mini: mini.durationLabel },
        { label: 'Edited photos', full: `${full.photoCount}`, mini: `${mini.photoCount}` },
        { label: 'Outfits', full: '2', mini: '1' },
        { label: 'Days', full: 'Any available day', mini: 'Mini days only' },
        { label: 'Price', full: `From $${full.price}`, mini: `$${mini.price}` },
    ];

    return (
        <div className="bg-cream text-charcoal">
            {/* ── 1. Hero ─────────────────────────────────────────── */}
            <section className="relative bg-evergreen text-cream overflow-hidden">
                <div className="absolute inset-0">
                    <div className="block md:hidden absolute inset-0">
                        <Image src={HOLIDAY_HERO_IMAGE.mobile} alt="" fill priority className="object-cover opacity-35" sizes="100vw" />
                    </div>
                    <div className="hidden md:block absolute inset-0">
                        <Image src={HOLIDAY_HERO_IMAGE.desktop} alt="" fill priority className="object-cover opacity-35" sizes="100vw" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-evergreen via-evergreen/70 to-evergreen/20" />
                    <EmblemScatter />
                    <Snowfall />
                </div>

                <div className="relative px-6 pt-28 pb-12 md:pt-44 md:pb-24 max-w-5xl mx-auto text-center md:text-left">
                    <Reveal width="100%">
                        <span className="inline-flex flex-col md:flex-row items-center gap-2 md:gap-3 text-xs tracking-[0.25em] uppercase text-gold mb-5">
                            <Holly className="w-10 h-10 md:w-8 md:h-8 md:-my-2 shrink-0" />
                            Ottawa · Christmas 2026
                        </span>
                    </Reveal>
                    <Reveal delay={0.1} width="100%">
                        <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
                            The Full Holiday <br />
                            <span className="italic font-light">Session</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.15} width="100%">
                        <p className="text-cream/80 text-lg max-w-xl mx-auto md:mx-0 mb-8">
                            {full.durationLabel} on our Christmas set with {full.outfitLabel.toLowerCase()}, every grouping you want, and no rush.
                        </p>
                    </Reveal>
                    <Reveal delay={0.2} width="100%">
                        <div className="flex flex-col items-center md:items-start gap-5">
                            <button
                                onClick={() => scrollToFullSessionBooking('hero')}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-cream text-evergreen px-8 py-5 text-sm uppercase tracking-widest hover:bg-white transition-colors"
                            >
                                Book Your Session <ArrowDown size={16} />
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
                        <span className="block text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-2">Full Holiday Session</span>
                        <p className="font-serif text-6xl md:text-7xl text-evergreen leading-none">
                            <span className="text-2xl md:text-3xl align-top mr-1 text-charcoal/50">from</span>${full.price}
                        </p>
                        <p className="text-sm text-charcoal/60 mt-3">On our Christmas set, on the day that suits you</p>
                    </div>
                </Reveal>
                <ul className="grid grid-cols-2 md:grid-cols-5 border-t border-charcoal/20">
                    {[
                        { icon: Clock, label: `${full.durationLabel} Session`, note: 'Unhurried, room to play' },
                        { icon: Camera, label: `${full.photoCount} Edited Photos`, note: 'You pick your favourites' },
                        { icon: Shirt, label: full.outfitLabel, note: 'Cozy and dressy' },
                        { icon: Users, label: 'Families, Couples & Pets', note: 'Potty-trained pets welcome' },
                        { icon: CalendarDays, label: 'Any Available Day', note: 'Not just mini days' },
                    ].map(({ icon: Icon, label, note }, i) => (
                        <li key={label} className={`flex flex-col items-center gap-3 py-6 px-2 border-b border-charcoal/20 text-center ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                            <Icon size={20} className="text-evergreen" aria-hidden="true" />
                            <span className="font-serif italic text-lg leading-snug">
                                {label}
                                <span className="block font-sans not-italic text-xs text-charcoal/50 mt-1">{note}</span>
                            </span>
                        </li>
                    ))}
                </ul>
                <AvailabilityDropdown
                    calendarUrl={full.calendarUrl}
                    title="Book a Full Holiday Session"
                    onOpen={() => trackFullSessionIntent('view-availability')}
                />
            </section>

            {/* ── 3. The set ──────────────────────────────────────── */}
            <SetGallery heading="Your Christmas set" caption={CHRISTMAS_SET.blurb} />

            {/* ── 4. Full vs Mini ─────────────────────────────────── */}
            <section className="px-6 pb-20 md:pb-28 max-w-3xl mx-auto">
                <Reveal width="100%">
                    <h2 className="font-serif text-4xl md:text-5xl text-center mb-10">Full session or mini?</h2>
                </Reveal>
                <div className="border border-charcoal/15 bg-white/60">
                    <div className="grid grid-cols-[1.1fr_1fr_1fr] text-xs uppercase tracking-widest border-b border-charcoal/15">
                        <span className="p-4" />
                        <span className="p-4 bg-evergreen text-cream text-center">Full Session</span>
                        <span className="p-4 text-center text-charcoal/60">Holiday Mini</span>
                    </div>
                    {compare.map((row) => (
                        <div key={row.label} className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-charcoal/10 last:border-b-0 text-sm">
                            <span className="p-4 text-charcoal/60">{row.label}</span>
                            <span className="p-4 text-center font-serif text-lg bg-evergreen/5">{row.full}</span>
                            <span className="p-4 text-center text-charcoal/70">{row.mini}</span>
                        </div>
                    ))}
                </div>
                <p className="text-center text-sm text-charcoal/60 mt-6">
                    Just want a few quick photos for the cards?{' '}
                    <Link href={HOLIDAY_ROUTES.minis} className="underline underline-offset-4 hover:text-charcoal">See the Holiday Minis</Link>
                </p>
            </section>

            {/* ── Mid-page CTA ────────────────────────────────────── */}
            <section className="px-6 pb-20 md:pb-28 text-center">
                <Reveal width="100%">
                    <p className="font-serif italic text-2xl md:text-3xl mb-6">Ready for your Christmas photos?</p>
                    <button
                        onClick={() => scrollToFullSessionBooking('mid-page')}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-evergreen text-cream px-8 py-5 text-sm uppercase tracking-widest hover:bg-evergreen/90 transition-colors"
                    >
                        Book Your Full Holiday Session <ArrowDown size={16} />
                    </button>
                </Reveal>
            </section>

            {/* ── 5. Reviews ──────────────────────────────────────── */}
            <HolidayReviews />

            {/* ── 6. Booking ──────────────────────────────────────── */}
            <section id="book" className="scroll-mt-8 px-6 py-20 md:py-28 max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-12">
                <div>
                    <Reveal>
                        <span className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-3">
                            <Snowflake className="w-4 h-4 text-gold" /> Book your session
                        </span>
                        <h2 className="font-serif text-4xl mb-3">Pick your day</h2>
                        <p className="text-charcoal/70 mb-8">
                            Choose any open time in the calendar. Mini-session hours are reserved for minis — if the time you want isn&apos;t
                            showing, call or email and we&apos;ll make it work.
                        </p>
                    </Reveal>
                    <ul className="space-y-3 text-sm">
                        {[
                            `${full.durationLabel} on the Christmas set`,
                            `${full.photoCount} edited photos of your choice`,
                            `${full.outfitLabel} and multiple groupings`,
                            'Kids and potty-trained pets welcome',
                            'Free parking on site',
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-3">
                                <Check size={16} className="text-evergreen mt-0.5 shrink-0" aria-hidden="true" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div className="bg-white border border-charcoal/10 rounded-2xl overflow-hidden">
                        <iframe
                            src={full.calendarUrl}
                            title="Book a Full Holiday Session"
                            loading="lazy"
                            className="w-full h-[760px] border-0"
                        />
                        {/* Plain iframe, no GHL form_embed.js — see HolidayMinisPage for why. */}
                    </div>
                    <a
                        href={full.calendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackFullSessionIntent('calendar-new-tab')}
                        className="mt-4 inline-flex items-center gap-2 text-sm text-charcoal/60 underline underline-offset-4 hover:text-charcoal"
                    >
                        Calendar not loading? Open it in a new tab <ExternalLink size={14} />
                    </a>
                </div>
            </section>

            {/* ── 7. Minis cross-sell ─────────────────────────────── */}
            <section className="relative overflow-hidden bg-evergreen text-cream px-6 py-16 md:py-20">
                <Snowfall count={14} />
                <Ornament className="absolute top-6 right-[38%] w-12 h-12 text-gold opacity-20 pointer-events-none hidden md:block" />
                <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <span className="block text-xs tracking-[0.2em] uppercase text-gold mb-2">Short on time?</span>
                        <h2 className="font-serif text-3xl md:text-4xl mb-2">Holiday Minis</h2>
                        <p className="text-cream/75">
                            {mini.durationLabel} · {mini.photoCount} edited photos · ${mini.price}. Limited dates.
                        </p>
                    </div>
                    <Link href={HOLIDAY_ROUTES.minis} className="shrink-0 inline-flex items-center justify-center border border-cream/50 px-8 py-4 text-xs uppercase tracking-widest no-underline text-cream hover:bg-cream hover:text-evergreen transition-colors">
                        See Mini Dates
                    </Link>
                </div>
            </section>

            {/* ── 8. Christmas at Studio 404 ──────────────────────── */}
            <ChristmasContact source="Full Holiday Session Page — Christmas at Studio 404" />

            {/* ── 9. FAQ ──────────────────────────────────────────── */}
            <section className="px-6 py-20 md:py-28">
                <OrnamentDivider className="mb-6" />
                <Reveal>
                    <h2 className="font-serif text-4xl md:text-5xl text-center mb-12">Good to know</h2>
                </Reveal>
                <FAQAccordion items={FULL_SESSION_FAQ} />
            </section>

            {/* ── 10. Closing CTA ─────────────────────────────────── */}
            <section className="relative overflow-hidden bg-evergreen text-cream px-6 py-20 md:py-24 text-center">
                <EmblemScatter />
                <Snowfall count={18} />
                <div className="relative max-w-2xl mx-auto">
                    <Holly className="w-12 h-12 mx-auto mb-4" />
                    <h2 className="font-serif text-4xl md:text-5xl mb-4">Book your Full Holiday Session</h2>
                    <p className="text-cream/75 mb-8">
                        {full.durationLabel} · {full.outfitLabel} · {full.photoCount} edited photos · from ${full.price}
                    </p>
                    <button
                        onClick={() => scrollToFullSessionBooking('closing-cta')}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-cream text-evergreen px-10 py-5 text-sm uppercase tracking-widest hover:bg-white transition-colors"
                    >
                        Pick Your Day
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HolidaySessionPage;
