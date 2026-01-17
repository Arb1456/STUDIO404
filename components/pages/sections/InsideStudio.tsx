'use client';
import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';

const InsideStudio: React.FC = () => {
    return (
        <section className="h-screen w-full snap-start bg-cream text-charcoal flex flex-col md:flex-row relative overflow-hidden">
            {/* Text Half */}
            <div className="w-full md:w-1/2 h-[60vh] md:h-full flex flex-col justify-start md:justify-center px-6 md:px-20 order-2 md:order-1 relative z-20 bg-cream pt-6 md:pt-0">
                <div className="max-w-xl mx-auto md:mx-0">
                    <Reveal>
                        <span className="block font-sans text-xs tracking-[0.2em] uppercase mb-1 opacity-60">
                            The Space
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-2">
                            Inside <br />
                            <span className="italic">Studio 404</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="space-y-2 font-sans font-light text-sm md:text-base leading-relaxed opacity-80 mb-4 max-w-md">
                            <p>
                                Where industrial precision meets creative freedom. Our 850 sq ft facility is more than just a room—it's a canvas engineered for the modern creator.
                            </p>
                            <p>
                                Featuring a pristine 12x10x10 corner cyclorama wall and a private changing suite, every corner is curated to elevate your workflow and impress your clients.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <Link
                            href="/tour"
                            className="inline-flex items-center gap-4 group"
                        >
                            <span className="font-serif text-lg border-b border-charcoal/30 pb-1 group-hover:border-charcoal transition-colors">
                                Take the Studio Tour
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Reveal>
                </div>
            </div>

            {/* Image Half */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-full relative overflow-hidden order-1 md:order-2">
                <div className="absolute inset-0 bg-charcoal/10 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1590845947698-8924d7409b56?q=80&w=2787&auto=format&fit=crop"
                    alt="Studio Interior"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                />
            </div>
        </section>
    );
};

export default InsideStudio;
