'use client';
import React from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import Hero from './sections/Hero';
import Availability from './sections/Availability';
import InsideStudio from './sections/InsideStudio';
import Features from './sections/Features';
import Gallery from './sections/Gallery';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import { BookingType } from '@/types';

interface HomePageProps {
    onBook: (type?: BookingType) => void;
}

const HomePage: React.FC<HomePageProps> = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
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
            </main>
        </div>
    );
};

export default HomePage;
