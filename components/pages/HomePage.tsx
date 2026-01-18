'use client';
import React from 'react';
import Link from 'next/link';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import Hero from './sections/Hero';
import Availability from './sections/Availability';
import InsideStudio from './sections/InsideStudio';
import Features from './sections/Features';
import Gallery from './sections/Gallery';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from '@/components/layout/Footer';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
    return (
        <div className="relative w-full h-screen-safe overflow-hidden">
            {/* Main Scroll Container */}
            <main className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar relative z-10">
                <SectionWrapper id="home">
                    <Hero />
                </SectionWrapper>
                <SectionWrapper id="availability">
                    <Availability />
                </SectionWrapper>
                <SectionWrapper id="inside">
                    <InsideStudio />
                </SectionWrapper>
                <SectionWrapper id="cyc">
                    <Features />
                </SectionWrapper>
                <SectionWrapper id="gallery">
                    <Gallery />
                </SectionWrapper>
                <SectionWrapper id="faq">
                    <FAQ />
                </SectionWrapper>

                {/* Contact handles its own SectionWrappers internally due to multi-section mobile layout */}
                <div id="contact">
                    <Contact />
                </div>

                {/* Tour CTA Section */}
                <SectionWrapper id="tour-cta">
                    <section className="h-screen-safe w-full snap-start bg-charcoal flex flex-col items-center justify-center px-6 text-center pb-nav-safe">
                        <Reveal>
                            <h2 className="font-serif text-4xl md:text-6xl text-cream mb-6">
                                Ready to tour the studio?
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="text-cream/60 text-lg mb-10 max-w-xl">
                                Take a virtual walkthrough and see what awaits you.
                            </p>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <Link
                                href="/tour"
                                className="group flex items-center gap-3 bg-cream text-charcoal px-8 py-4 text-sm uppercase tracking-widest hover:bg-white transition-colors"
                            >
                                <span>Take the Tour</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Reveal>
                    </section>
                </SectionWrapper>

                {/* Footer Section */}
                <div className="snap-start">
                    <Footer />
                </div>
            </main>
        </div>
    );
};

export default HomePage;
