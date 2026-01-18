'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import {
    TourContainer,
    TourSection,
    TourSlide,
    TourNavigation,
    SectionConfig
} from './tour';

// Helper for background images
const bgImage = (url: string) => ({
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

// Section configuration - defines slides per section
const SECTION_CONFIG: SectionConfig[] = [
    { id: 'intro', slides: 1 },
    { id: 'cyc-wall', slides: 2 },
    { id: 'backdrops', slides: 2 },
    { id: 'lighting', slides: 2 },
    { id: 'current-sets', slides: 2 },
    { id: 'props', slides: 2 },
    { id: 'kitchenette', slides: 1 },
    { id: 'changeroom', slides: 1 },
    { id: 'cta', slides: 1 },
];

interface TourPageProps {
    onBook: (duration?: number) => void;
}

const TourPage: React.FC<TourPageProps> = ({ onBook }) => {
    return (
        <TourContainer sectionConfig={SECTION_CONFIG}>

            {/* 1. Intro Hero (single slide) */}
            <TourSection id="intro" singleSlide className="items-center bg-cream">
                <div className="absolute inset-0 opacity-10" style={bgImage('https://picsum.photos/1920/1080?random=1')} />
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <Reveal>
                        <p className="text-xs uppercase tracking-[0.3em] mb-6 text-charcoal/60">The Tour</p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <h1 className="font-serif text-6xl md:text-8xl mb-8 leading-[0.9]">
                            Welcome to <br /><span className="italic">Studio 404.</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <p className="font-sans font-light text-lg md:text-xl max-w-lg mx-auto mb-10 text-charcoal/80 leading-relaxed">
                            A space designed for creators, by creators. Explore the architecture of light and shadow.
                        </p>
                    </Reveal>
                    <Reveal delay={0.6}>
                        <p className="text-sm text-charcoal/50 uppercase tracking-widest">
                            Scroll to begin
                        </p>
                    </Reveal>
                </div>
            </TourSection>

            {/* 2. The Cyc Wall (2 slides) */}
            <TourSection id="cyc-wall">
                {/* Slide 1: Overview */}
                <TourSlide theme="dark" bgImage="https://picsum.photos/1920/1080?random=2" bgOverlay="gradient-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto px-6 items-end pb-24 md:pb-0 md:items-center h-full">
                        <div className="md:col-start-1">
                            <Reveal>
                                <h2 className="font-serif text-5xl md:text-7xl mb-6">The Cyc Wall</h2>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <div className="w-24 h-[1px] bg-cream/50 mb-6"></div>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <p className="font-sans font-light text-lg opacity-90 max-w-md mb-8">
                                    Our 12 ft x 10 ft x 10 ft corner cyclorama wall offers an infinite horizon for your productions. Pristine white, perfectly curved.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </TourSlide>

                {/* Slide 2: Dimensions & Specs */}
                <TourSlide theme="dark" bgImage="https://picsum.photos/1920/1080?random=20" bgOverlay="dark">
                    <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
                        <Reveal>
                            <p className="text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6 text-cream/60">Specifications</p>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h3 className="font-serif text-3xl md:text-6xl mb-8 md:mb-12">Built for Scale</h3>
                        </Reveal>
                        <div className="grid grid-cols-3 gap-4 md:gap-16 mb-8 md:mb-12">
                            <Reveal delay={0.2}>
                                <div>
                                    <p className="font-serif text-3xl md:text-7xl mb-1 md:mb-2">12</p>
                                    <p className="text-[10px] md:text-sm uppercase tracking-wider md:tracking-widest text-cream/60">Feet Wide</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <div>
                                    <p className="font-serif text-3xl md:text-7xl mb-1 md:mb-2">10</p>
                                    <p className="text-[10px] md:text-sm uppercase tracking-wider md:tracking-widest text-cream/60">Feet Deep</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <div>
                                    <p className="font-serif text-3xl md:text-7xl mb-1 md:mb-2">10</p>
                                    <p className="text-[10px] md:text-sm uppercase tracking-wider md:tracking-widest text-cream/60">Feet Tall</p>
                                </div>
                            </Reveal>
                        </div>
                        <Reveal delay={0.5}>
                            <p className="text-cream/70 max-w-lg mx-auto text-sm md:text-base">
                                Seamless curved corners eliminate harsh shadows, creating the perfect infinity backdrop for photography and video production.
                            </p>
                        </Reveal>
                    </div>
                </TourSlide>
            </TourSection>

            {/* 3. Backdrops (2 slides) */}
            <TourSection id="backdrops">
                {/* Slide 1: Overview */}
                <TourSlide theme="light" className="relative">
                    <div className="absolute inset-0 md:hidden block">
                        <div className="absolute inset-0" style={bgImage('https://picsum.photos/1000/1200?random=3')} />
                        <div className="absolute inset-0 bg-cream/80" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full relative z-10">
                        <div className="hidden md:block h-full w-full bg-gray-200 relative order-2 md:order-1">
                            <div className="absolute inset-0" style={bgImage('https://picsum.photos/1000/1200?random=3')} />
                        </div>

                        <div className="h-full w-full flex flex-col justify-center items-center text-center px-8 md:px-24 order-1 md:order-2">
                            <Reveal>
                                <span className="text-xs font-bold tracking-widest uppercase text-charcoal/60 mb-4 block">Equipment</span>
                            </Reveal>
                            <Reveal delay={0.1}>
                                <h2 className="font-serif text-5xl md:text-6xl mb-6 text-charcoal">Seamless <br /><span className="italic text-charcoal/50">Backdrops</span></h2>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <p className="font-sans text-charcoal/70 mb-8 leading-relaxed max-w-sm">
                                    Collection of 9-foot-wide seamless backdrops available for use with our integrated cyclorama wall pulley system.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </TourSlide>

                {/* Slide 2: Color Selection */}
                <TourSlide theme="light">
                    <div className="max-w-5xl mx-auto px-4 md:px-6">
                        <Reveal>
                            <p className="text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] mb-3 md:mb-4 text-charcoal/60 text-center">Available Colors</p>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h3 className="font-serif text-2xl md:text-5xl mb-6 md:mb-12 text-center">Choose Your Canvas</h3>
                        </Reveal>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-6">
                            {[
                                { name: 'Super White', color: '#FFFFFF' },
                                { name: 'Thunder Gray', color: '#4A4A4A' },
                                { name: 'Black', color: '#1A1A1A' },
                                { name: 'Coral', color: '#FF6B6B' },
                                { name: 'Ocean Blue', color: '#4A90A4' },
                                { name: 'Sage', color: '#9CAF88' },
                            ].map((backdrop, i) => (
                                <Reveal key={backdrop.name} delay={0.1 + i * 0.05}>
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-12 h-12 md:w-20 md:h-20 rounded-full mb-2 md:mb-3 shadow-lg border border-charcoal/10"
                                            style={{ backgroundColor: backdrop.color }}
                                        />
                                        <p className="text-[10px] md:text-xs text-charcoal/70 text-center leading-tight">{backdrop.name}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                        <Reveal delay={0.5}>
                            <p className="text-center text-charcoal/50 text-xs md:text-sm mt-6 md:mt-8">
                                Additional colors available upon request
                            </p>
                        </Reveal>
                    </div>
                </TourSlide>
            </TourSection>

            {/* 4. Lighting Grid (2 slides) */}
            <TourSection id="lighting">
                {/* Slide 1: Overview */}
                <TourSlide theme="dark" bgImage="https://picsum.photos/1920/1080?random=4" bgOverlay="dark">
                    <div className="text-center max-w-3xl px-6 mx-auto">
                        <Reveal>
                            <h2 className="font-serif text-5xl md:text-7xl mb-8">Pro Lighting Grid</h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-lg md:text-xl font-light text-gray-300 mb-10 leading-relaxed">
                                We have high-end professional strobes, various constant lighting modifiers, along with full rigging, grip, and gaffing coverage.
                            </p>
                        </Reveal>
                    </div>
                </TourSlide>

                {/* Slide 2: Equipment Details */}
                <TourSlide theme="dark" className="bg-[#1a1a1a]">
                    <div className="max-w-4xl mx-auto w-full">
                        <Reveal>
                            <p className="text-xs uppercase tracking-[0.2em] mb-2 md:mb-4 text-cream/60 text-center">Included Equipment</p>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h3 className="font-serif text-2xl md:text-5xl mb-6 md:mb-12 text-center text-cream">Professional Grade</h3>
                        </Reveal>
                        <div className="grid grid-cols-3 gap-4 md:gap-8">
                            <Reveal delay={0.2}>
                                <div className="text-center">
                                    <div className="w-10 h-10 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 rounded-full bg-cream/10 flex items-center justify-center">
                                        <span className="text-lg md:text-2xl">💡</span>
                                    </div>
                                    <h4 className="font-serif text-sm md:text-xl mb-1 md:mb-2 text-cream">Strobes</h4>
                                    <p className="text-cream/60 text-[10px] md:text-sm hidden md:block">Profoto & Godox professional flash units with modifiers</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <div className="text-center">
                                    <div className="w-10 h-10 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 rounded-full bg-cream/10 flex items-center justify-center">
                                        <span className="text-lg md:text-2xl">🎬</span>
                                    </div>
                                    <h4 className="font-serif text-sm md:text-xl mb-1 md:mb-2 text-cream">Continuous</h4>
                                    <p className="text-cream/60 text-[10px] md:text-sm hidden md:block">LED panels and tungsten options for video production</p>
                                </div>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <div className="text-center">
                                    <div className="w-10 h-10 md:w-16 md:h-16 mx-auto mb-2 md:mb-4 rounded-full bg-cream/10 flex items-center justify-center">
                                        <span className="text-lg md:text-2xl">🔧</span>
                                    </div>
                                    <h4 className="font-serif text-sm md:text-xl mb-1 md:mb-2 text-cream">Grip</h4>
                                    <p className="text-cream/60 text-[10px] md:text-sm hidden md:block">C-stands, booms, flags, and diffusion materials</p>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </TourSlide>
            </TourSection>

            {/* 5. Current Sets (2 slides) */}
            <TourSection id="current-sets">
                {/* Slide 1: Overview */}
                <TourSlide theme="light" className="bg-[#F5F5F0]">
                    <div className="absolute top-0 right-0 w-full md:w-2/3 h-full opacity-20 md:opacity-100">
                        <div className="w-full h-full" style={bgImage('https://picsum.photos/1200/1000?random=5')} />
                    </div>
                    <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
                        <div className="max-w-lg bg-cream/90 md:bg-transparent p-8 md:p-0 backdrop-blur-md md:backdrop-blur-none rounded-sm">
                            <Reveal>
                                <h2 className="font-serif text-5xl mb-6 text-charcoal">Current <br />Sets</h2>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <p className="font-sans text-charcoal/80 mb-8">
                                    Curated editorial environments that change throughout the year. From cozy autumn nooks to brutalist summer minimalism.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </TourSlide>

                {/* Slide 2: Set Gallery */}
                <TourSlide theme="light" className="bg-[#F5F5F0]">
                    <div className="max-w-6xl mx-auto px-6">
                        <Reveal>
                            <p className="text-xs uppercase tracking-[0.3em] mb-4 text-charcoal/60 text-center">This Season</p>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h3 className="font-serif text-2xl md:text-5xl mb-4 md:mb-10 text-center text-charcoal">Winter Collection</h3>
                        </Reveal>
                        <div className="grid grid-cols-3 gap-2 md:gap-4">
                            {[51, 52, 53, 54, 55, 56].map((id, index) => (
                                <motion.div
                                    key={id}
                                    className="aspect-square md:aspect-[4/3] bg-gray-100 overflow-hidden relative group"
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.8, delay: 0.1 + (index * 0.05), ease: "easeOut" }}
                                >
                                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={bgImage(`https://picsum.photos/600/450?random=${id}`)} />
                                </motion.div>
                            ))}
                        </div>
                        <Reveal delay={0.5}>
                            <div className="text-center mt-8">
                                <Link href="/photoshoot">
                                    <Button>Explore Client Work</Button>
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </TourSlide>
            </TourSection>

            {/* 6. Props Gallery (2 slides) */}
            <TourSection id="props">
                {/* Slide 1: Overview */}
                <TourSlide theme="light" className="bg-cream">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <Reveal>
                            <h2 className="font-serif text-5xl md:text-6xl mb-6">Props <span className="italic">&</span> Furniture</h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-charcoal/70 max-w-lg mx-auto mb-8">
                                A minimalist grid of designer furniture, textural stools, podiums, and vintage accents included with every booking.
                            </p>
                        </Reveal>
                    </div>
                </TourSlide>

                {/* Slide 2: Full Grid - smaller on mobile */}
                <TourSlide theme="light" className="bg-cream">
                    <div className="w-full grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 content-center max-w-5xl mx-auto px-4 md:px-6">
                        {[71, 72, 73, 74, 75, 76].slice(0, 6).map((id, index) => (
                            <motion.div
                                key={id}
                                className="aspect-square bg-gray-100 overflow-hidden relative group"
                                initial={{ opacity: 0, filter: "blur(10px)" }}
                                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: 0.1 + (index * 0.05), ease: "easeOut" }}
                            >
                                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={bgImage(`https://picsum.photos/500/500?random=${id}`)} />
                            </motion.div>
                        ))}
                    </div>
                </TourSlide>
            </TourSection>

            {/* 7. Kitchenette (single slide) */}
            <TourSection id="kitchenette" singleSlide className="bg-cream">
                <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                        <div className="absolute inset-0" style={bgImage('https://picsum.photos/1000/1200?random=8')} />
                    </div>
                    <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 pb-32 md:p-8 bg-cream">
                        <div className="max-w-md">
                            <Reveal>
                                <h2 className="font-serif text-4xl mb-6">Kitchenette & Amenities</h2>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <ul className="space-y-4 font-sans text-charcoal/80">
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-charcoal rounded-full" /> Fridge stocked with water</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-charcoal rounded-full" /> Large Kitchen Sink</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-charcoal rounded-full" /> Clean and Accessible Washroom</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-charcoal rounded-full" /> Client Lounge</li>
                                </ul>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </TourSection>

            {/* 8. Changeroom (single slide) */}
            <TourSection id="changeroom" singleSlide className="bg-charcoal text-cream">
                <div className="relative container mx-auto px-6 h-full flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <div className="aspect-[4/5] bg-gray-800 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-80" style={bgImage('https://picsum.photos/800/1000?random=9')} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-left">
                        <Reveal>
                            <h2 className="font-serif text-4xl md:text-5xl mb-6">Private Change Room</h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Spacious and well-lit, perfect for wardrobe changes, makeup prep, or client comfort.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </TourSection>

            {/* 9. Final CTA (single slide) */}
            <TourSection id="cta" singleSlide className="bg-charcoal text-cream text-center">
                <div className="absolute inset-0 opacity-20 mix-blend-soft-light" style={bgImage('https://picsum.photos/1920/1080?random=11')} />
                <div className="relative z-10 px-6">
                    <Reveal>
                        <h2 className="font-serif text-6xl md:text-9xl mb-8 leading-none">
                            Ready to <br /><span className="italic text-cream/80">Create?</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className="font-sans text-xl mb-12 text-cream/60 tracking-wide">
                            STUDIO 404 • OTTAWA, ON
                        </p>
                    </Reveal>
                    <Reveal delay={0.5}>
                        <Button
                            onClick={() => onBook()}
                            className="bg-cream text-charcoal border-cream hover:bg-transparent hover:text-cream px-12 py-5 text-lg"
                        >
                            Book Your Time
                        </Button>
                    </Reveal>
                </div>
            </TourSection>

            {/* Floating Navigation */}
            <TourNavigation />

        </TourContainer>
    );
};

export default TourPage;
