import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { BookingType } from '@/types';

// Helper for background images
const bgImage = (url: string) => ({
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

// Section Wrapper for Scroll Snap with Zoom/Fade Animation
const SnapSection: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 });

    return (
        <section ref={ref} id={id} className="snap-start h-screen w-full relative overflow-hidden bg-black">
            <motion.div
                className={`h-full w-full flex flex-col justify-center ${className}`}
                initial={{ scale: 0.92, opacity: 0.6, filter: "brightness(0.7)" }}
                animate={isInView ? { scale: 1, opacity: 1, filter: "brightness(1)" } : { scale: 0.92, opacity: 0.6, filter: "brightness(0.7)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </section>
    );
};

interface TourPageProps {
    onBook: (type?: BookingType) => void;
}

const TourPage: React.FC<TourPageProps> = ({ onBook }) => {
    const handleScrollToTour = () => {
        const nextSection = document.getElementById('cyc-wall');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">

            {/* 1. Intro Hero */}
            <SnapSection className="items-center bg-cream">
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
                        <Button
                            onClick={handleScrollToTour}
                            className="rounded-full shadow-[0_0_30px_rgba(38,38,38,0.2)] hover:shadow-[0_0_40px_rgba(38,38,38,0.3)] transition-all duration-500 px-10 py-5"
                        >
                            Watch the Full Tour
                        </Button>
                    </Reveal>
                </div>
            </SnapSection>

            {/* 2. The Cyc Wall */}
            <SnapSection id="cyc-wall" className="bg-charcoal text-cream">
                <div className="absolute inset-0 opacity-40" style={bgImage('https://picsum.photos/1920/1080?random=2')} />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto px-6 items-end pb-24 md:pb-0 md:items-center h-full">
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
                        <Reveal delay={0.4}>
                            <Button variant="ghost" className="text-cream border-cream/50 hover:border-cream hover:text-cream px-0">
                                Learn More
                            </Button>
                        </Reveal>
                    </div>
                </div>
            </SnapSection>

            {/* 3. Backdrops */}
            <SnapSection className="bg-cream relative">
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
                        <Reveal delay={0.3}>
                            <Button variant="ghost" className="flex items-center gap-2 group">
                                View Full Selection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Reveal>
                    </div>
                </div>
            </SnapSection>

            {/* 4. Lighting Grid */}
            <SnapSection className="bg-[#1a1a1a] text-cream">
                <div className="absolute inset-0 opacity-60 mix-blend-overlay" style={bgImage('https://picsum.photos/1920/1080?random=4')} />
                <div className="relative z-10 text-center max-w-3xl px-6 mx-auto">
                    <Reveal>
                        <h2 className="font-serif text-5xl md:text-7xl mb-8">Pro Lighting Grid</h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-lg md:text-xl font-light text-gray-300 mb-10 leading-relaxed">
                            We have high-end professional strobes, various constant lighting modifiers, along with full rigging, grip, and gaffing coverage.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <Button variant="outline" className="border-cream text-cream hover:bg-cream hover:text-charcoal">
                            See Included Gear
                        </Button>
                    </Reveal>
                </div>
            </SnapSection>

            {/* 5. Current Sets */}
            <SnapSection className="bg-[#F5F5F0]">
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
                        <Reveal delay={0.3}>
                            <Button onClick={() => onBook('photoshoot')}>Explore Client Work</Button>
                        </Reveal>
                    </div>
                </div>
            </SnapSection>

            {/* 6. Props Gallery */}
            <SnapSection className="bg-cream flex items-center justify-center p-6 md:p-12">
                <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 content-center max-w-7xl mx-auto">
                    <div className="col-span-2 md:col-span-2 flex flex-col justify-center p-4">
                        <Reveal>
                            <h2 className="font-serif text-5xl mb-4">Props <span className="italic">&</span><br />Furniture</h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-charcoal/70 max-w-sm">
                                A minimalist grid of designer furniture, textural stools, podiums, and vintage accents included with every booking.
                            </p>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <Button variant="ghost" className="mt-6 flex items-center gap-2 group self-start">
                                View more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Reveal>
                    </div>

                    {[71, 72, 73, 74].map((id, index) => (
                        <motion.div
                            key={id}
                            className="aspect-square bg-gray-100 overflow-hidden relative group"
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                        >
                            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={bgImage(`https://picsum.photos/500/500?random=${id}`)} />
                        </motion.div>
                    ))}
                </div>
            </SnapSection>

            {/* 7. Kitchenette */}
            <SnapSection className="bg-cream">
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
            </SnapSection>

            {/* 8. Changeroom */}
            <SnapSection className="bg-charcoal text-cream">
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
            </SnapSection>

            {/* 9. Final CTA */}
            <SnapSection className="bg-charcoal text-cream text-center">
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
                            onClick={() => onBook('rental')}
                            className="bg-cream text-charcoal border-cream hover:bg-transparent hover:text-cream px-12 py-5 text-lg"
                        >
                            Book Your Time
                        </Button>
                    </Reveal>
                </div>
            </SnapSection>

        </div>
    );
};

export default TourPage;
