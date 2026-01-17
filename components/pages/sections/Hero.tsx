'use client';
import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

const Hero: React.FC = () => {
    return (
        <section className="relative h-screen w-full snap-start overflow-hidden bg-cream text-charcoal flex flex-col justify-end pb-32 md:pb-24">
            {/* Video Background Simulation */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1590845947698-8924d7409b56?q=80&w=2787&auto=format&fit=crop"
                    alt="Studio Background"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/20 to-transparent" />
            </div>

            <div className="relative z-10 px-6 md:px-12 max-w-4xl">
                <Reveal>
                    <span className="block text-xs font-sans tracking-[0.2em] uppercase mb-4 opacity-80 text-charcoal">
                        Ottawa's Premier Production Space
                    </span>
                </Reveal>

                <Reveal delay={0.1}>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 text-charcoal">
                        Create <br />
                        <span className="italic font-light">Without Limits</span>
                    </h1>
                </Reveal>

                <Reveal delay={0.2} repeat={true}>
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <Link
                            href="/rental"
                            className="bg-charcoal text-cream px-8 py-4 font-sans text-sm uppercase tracking-widest border border-charcoal hover:bg-transparent hover:text-charcoal transition-all duration-300 min-w-[200px] inline-flex justify-center items-center cursor-pointer animate-button-glow no-underline"
                        >
                            Rent the Studio
                        </Link>
                        <Link
                            href="/photoshoot"
                            className="bg-transparent text-charcoal px-8 py-4 font-sans text-sm uppercase tracking-widest border border-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300 min-w-[200px] inline-flex justify-center items-center cursor-pointer animate-button-glow no-underline"
                        >
                            Book a Photoshoot
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Hero;
