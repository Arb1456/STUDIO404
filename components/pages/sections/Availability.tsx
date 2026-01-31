'use client';
import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cloudinaryUrl } from '@/lib/cloudinary';

const Availability: React.FC = () => {
    return (
        <section className="h-screen-safe w-full snap-start bg-cream flex flex-col px-6 md:px-12 py-10 md:py-20 overflow-hidden">
            {/* Title Section - in normal flow */}
            <div className="text-center mb-4 md:mb-10 flex-shrink-0">
                <Reveal>
                    <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-2 md:mb-4">Availability</h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="text-charcoal/70 text-xs md:text-base leading-relaxed max-w-2xl mx-auto">
                        Rent the space and create without constraints, or let us guide you through an unforgettable photo session, custom tailored to you. The choice is yours.
                    </p>
                </Reveal>
            </div>

            {/* Cards Grid - takes remaining space */}
            <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4 md:gap-6 flex-1 min-h-0 pb-20 md:pb-0">

                {/* Card A: Rental - Slides from Left */}
                <motion.div
                    className="h-full min-h-0"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <Link
                        href="/rental"
                        className="group block relative w-full h-full bg-charcoal-light overflow-hidden cursor-pointer shadow-xl"
                    >
                        <img
                            src={cloudinaryUrl('RENTAL-BUTTON_xou09n')}
                            alt="Studio Rental"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-cream">
                            <h3 className="font-serif text-2xl md:text-3xl italic mb-3 md:mb-4">Studio Rental</h3>
                            <div className="w-full h-[1px] bg-cream/30 mb-3 md:mb-4" />
                            <div className="flex justify-between items-center">
                                <span className="font-sans text-xs tracking-widest uppercase">View Calendar</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Card B: Photoshoots - Slides from Right */}
                <motion.div
                    className="h-full min-h-0"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                >
                    <Link
                        href="/photoshoot"
                        className="group block relative w-full h-full bg-charcoal-light overflow-hidden cursor-pointer shadow-xl"
                    >
                        {/* Placeholder background */}
                        <div className="absolute inset-0 w-full h-full bg-charcoal/80 flex items-center justify-center">
                            <span className="text-cream/40 font-serif text-2xl md:text-3xl italic">Placeholder</span>
                        </div>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-cream">
                            <h3 className="font-serif text-2xl md:text-3xl italic mb-3 md:mb-4">Creative Photoshoots</h3>
                            <div className="w-full h-[1px] bg-cream/30 mb-3 md:mb-4" />
                            <div className="flex justify-between items-center">
                                <span className="font-sans text-xs tracking-widest uppercase">Book Session</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Availability;
