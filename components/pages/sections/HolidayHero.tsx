'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';
import { Holly, EmblemScatter, Snowfall } from '@/components/ui/Christmas';
import { HOLIDAY_HERO_IMAGE, HOLIDAY_OFFERS, HOLIDAY_ROUTES } from '@/lib/holiday';

const CHOICES = [
    { label: 'Book Your Holiday Mini Session', href: HOLIDAY_ROUTES.minis, primary: true },
    { label: 'Book A Photo Session', href: '/photoshoot', primary: false },
    { label: 'Rent The Studio', href: '/rental', primary: false },
];

/**
 * Seasonal hero — temporarily replaces <Hero /> while isHolidaySeason() is true.
 * Centerpiece is Holiday Minis; photo sessions and studio rental are secondary exits.
 */
const HolidayHero: React.FC = () => {
    const mini = HOLIDAY_OFFERS.mini;

    return (
        <section className="relative h-screen-safe w-full snap-start overflow-hidden bg-evergreen text-cream flex flex-col justify-end pb-nav-safe">
            {/* Background — placeholder until Christmas set photos exist */}
            <div className="absolute inset-0 z-0">
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

            <div className="relative z-10 px-6 md:px-12 max-w-5xl">
                <Reveal>
                    <span className="inline-flex items-center gap-3 text-xs font-sans tracking-[0.25em] uppercase mb-5 text-gold">
                        <Holly className="w-8 h-8 -my-2" />
                        Christmas 2026 · Limited Dates
                    </span>
                </Reveal>

                <Reveal delay={0.1}>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6">
                        Holiday <br />
                        <span className="italic font-light">Mini Sessions</span>
                    </h1>
                </Reveal>

                <Reveal delay={0.15}>
                    <p className="font-sans text-base md:text-lg text-cream/80 mb-10 max-w-xl">
                        {mini.durationLabel} on our Christmas set · {mini.photoLabel} ·{' '}
                        <span className="text-cream font-medium">${mini.price}</span>
                    </p>
                </Reveal>

                {/* Three segregated rows — mirrors the "What's Included?" list styling */}
                <nav aria-label="Booking options" className="w-full max-w-xl border-t border-cream/25">
                    {CHOICES.map((choice, index) => (
                        <Reveal key={choice.href} delay={index * 0.05 + 0.2} width="100%">
                            <Link
                                href={choice.href}
                                className={`group flex items-center justify-between gap-4 px-4 py-4 md:py-5 border-b border-cream/25 no-underline text-cream transition-colors duration-300 hover:bg-cream/10 ${choice.primary ? 'bg-cream/10' : ''}`}
                            >
                                <span className={`font-serif italic tracking-wide transition-transform duration-300 group-hover:translate-x-1 ${choice.primary ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl text-cream/85'}`}>
                                    {choice.label}
                                </span>
                                <ArrowRight
                                    size={choice.primary ? 20 : 16}
                                    className={`shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${choice.primary ? 'text-gold' : 'text-cream/50'}`}
                                    aria-hidden="true"
                                />
                            </Link>
                        </Reveal>
                    ))}
                </nav>
            </div>
        </section>
    );
};

export default HolidayHero;
