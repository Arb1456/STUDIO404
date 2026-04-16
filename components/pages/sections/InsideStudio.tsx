'use client';
import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';
import { cloudinaryUrl } from '@/lib/cloudinary';

const InsideStudio: React.FC = () => {
    return (
        <section className="h-screen-safe w-full snap-start scroll-mt-[100px] md:scroll-mt-0 relative overflow-hidden pb-nav-safe md:pb-0">
            {/* Full-width background image */}
            <div className="absolute inset-0" style={{
                backgroundImage: `url(${cloudinaryUrl('The_Cyc_Wall_aohgwv')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }} />

            {/* Content */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto px-6 items-center h-full">
                <div className="md:col-start-1">
                    {/* Frosted glass bubble */}
                    <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-lg border border-white/50">
                        <Reveal>
                            <span className="block font-sans text-xs tracking-[0.2em] uppercase mb-3 text-black/60">
                                The Space
                            </span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-4 text-black">
                                Inside <br />
                                <span className="italic">Studio 404</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <div className="w-24 h-[1px] bg-black/50 mb-4" />
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="space-y-2 font-sans font-light text-sm md:text-base leading-relaxed text-black/80 mb-6 max-w-md">
                                <p>
                                    We built this space from the ground up with one thing in mind — giving photographers and creators everything they need, nothing they don't.
                                </p>
                                <p>
                                    850 square feet, a 12×10×10 corner cyc wall, professional lighting, a private change room, and a client lounge. Show up, plug in, and shoot.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <Link
                                href="/tour"
                                className="inline-flex items-center gap-4 group"
                            >
                                <span className="font-serif text-lg border-b border-black/30 pb-1 group-hover:border-black transition-colors text-black">
                                    Take the Studio Tour
                                </span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-black" />
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InsideStudio;
