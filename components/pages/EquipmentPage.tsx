'use client';
import React, { useState, useRef } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { X } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Footer from '@/components/layout/Footer';

interface EquipmentPageProps {
    onBook: (duration?: number) => void;
}

// Separate component for navigation grid to use useInView hook
const NavigationGrid: React.FC<{
    gridItems: { label: string; id: string }[];
    scrollToSection: (id: string) => void;
}> = ({ gridItems, scrollToSection }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const buttonClass = "group relative w-28 h-28 md:w-40 md:h-40 rounded-full bg-charcoal text-cream border border-white/40 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out flex flex-col items-center justify-center gap-3 hover:scale-105 z-10 p-4";

    // Staggered delays: top row (0, 1, 2) then bottom row (3, 4)
    const delays = [0.2, 0.5, 0.8, 1.1, 1.4];

    return (
        <section className="py-20 px-6 max-w-5xl mx-auto" ref={ref}>
            <div className="flex flex-col items-center gap-6 md:gap-10">
                {/* Top Row: 3 Items */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-10 w-full">
                    {[0, 1, 2].map((index) => (
                        <motion.button
                            key={gridItems[index].id}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 2.2, ease: [0.12, 0.8, 0.2, 1], delay: delays[index] }}
                            onClick={() => scrollToSection(gridItems[index].id)}
                            className={buttonClass}
                        >
                            <span className="text-[10px] md:text-xs uppercase tracking-widest text-center font-medium opacity-100 transition-opacity duration-500 leading-relaxed">
                                {gridItems[index].label}
                            </span>
                        </motion.button>
                    ))}
                </div>

                {/* Bottom Row: 2 Items */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-10 w-full">
                    {[3, 4].map((index) => (
                        <motion.button
                            key={gridItems[index].id}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 2.2, ease: [0.12, 0.8, 0.2, 1], delay: delays[index] }}
                            onClick={() => scrollToSection(gridItems[index].id)}
                            className={buttonClass}
                        >
                            <span className="text-[10px] md:text-xs uppercase tracking-widest text-center font-medium opacity-100 transition-opacity duration-500 leading-relaxed">
                                {gridItems[index].label}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Separate component for paper colors grid with staggered fade animation
const PaperColorsGrid: React.FC<{
    papers: { color: string; name: string }[];
}> = ({ papers }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    // Staggered delays for 12 items in a 3-column grid (row by row, left to right)
    const getDelay = (index: number) => 0.15 + index * 0.2;

    return (
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 mb-10" ref={ref}>
            {papers.map((paper, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 2.2, ease: [0.12, 0.8, 0.2, 1], delay: getDelay(i) }}
                    className="flex flex-col items-center gap-3 text-center"
                >
                    <div className={`w-12 h-12 rounded-full border border-gray-300/50 shadow-sm ${paper.color}`}></div>
                    <span className="text-xs uppercase tracking-wide opacity-80">{paper.name}</span>
                </motion.div>
            ))}
        </div>
    );
};

const EquipmentPage: React.FC<EquipmentPageProps> = ({ onBook }) => {
    const [activeModal, setActiveModal] = useState<{ title: string, content: React.ReactNode } | null>(null);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const gridItems = [
        { label: 'Lighting Equipment', id: 'lighting' },
        { label: 'Grip Equipment', id: 'grip' },
        { label: 'Seamless Paper Backdrops', id: 'seamless' },
        { label: 'Amenities', id: 'amenities' },
        { label: 'Props, Decor, Furniture', id: 'props' },
    ];

    // Data for Lighting Modal
    const lightingData = {
        strobes: {
            title: "Strobes",
            content: (
                <div className="space-y-8">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg opacity-80 mb-8 leading-relaxed">Reliable flash systems for versatile lighting setups.</p>
                        <h3 className="text-xl font-serif mb-4 border-b border-charcoal/10 pb-2">Inventory List</h3>
                        <ul className="space-y-3 text-sm">
                            <li>3x Godox SK400ii</li>
                            <li>2x Godox MS300</li>
                            <li>1x Godox XT-16 Universal Trigger</li>
                        </ul>
                    </div>
                </div>
            )
        },
        continuous: {
            title: "Continuous",
            content: (
                <div className="space-y-8">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg opacity-80 mb-8 leading-relaxed">Flicker-free LED solutions for video and constant light photography.</p>
                        <h3 className="text-xl font-serif mb-4 border-b border-charcoal/10 pb-2">Inventory List</h3>
                        <ul className="space-y-3 text-sm">
                            <li>1x Amaran 200d</li>
                            <li>2x Godox SL100d</li>
                            <li>1x Neewer 70bi</li>
                            <li>1x Godox SL60bi</li>
                            <li>4x Neewer 660 RGB Panel</li>
                            <li>2x KinoFlo FIX-4804</li>
                        </ul>
                    </div>
                </div>
            )
        },
        modifiers: {
            title: "Modifiers",
            content: (
                <div className="space-y-8">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg opacity-80 mb-8 leading-relaxed">Shape your light with precision using our extensive collection.</p>
                        <h3 className="text-xl font-serif mb-4 border-b border-charcoal/10 pb-2">Inventory List</h3>
                        <ul className="space-y-3 text-sm">
                            <li>2x 60cm x 90cm Softboxes + Grids</li>
                            <li>2x 30cm x 160cm Strip Boxes + Grids</li>
                            <li>2x 20cm x 90cm Strip Boxes + Grids</li>
                            <li>1x 95cm Octabox + Grid</li>
                            <li>1x 55cm x 55cm Softbox + Grid</li>
                            <li>2x Optical Projector Snoots</li>
                            <li>12+ Umbrellas in Varying Sizes</li>
                        </ul>
                    </div>
                </div>
            )
        }
    };

    // Data for Grip Modal
    const gripData = {
        stands: {
            title: "Stands",
            content: (
                <div className="space-y-8">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg opacity-80 mb-8 leading-relaxed">Heavy duty support for any lighting configuration.</p>
                        <h3 className="text-xl font-serif mb-4 border-b border-charcoal/10 pb-2">Inventory List</h3>
                        <ul className="space-y-3 text-sm">
                            <li>4x 12ft C-Stands</li>
                            <li>3x 10ft Light Tripods</li>
                            <li>1x Wall Mounted Overhead Boom Arm</li>
                            <li>1x Rolling 10ft C-Stand</li>
                        </ul>
                    </div>
                </div>
            )
        },
        reflectors: {
            title: "Reflectors & Coloring",
            content: (
                <div className="space-y-8">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg opacity-80 mb-8 leading-relaxed">Control spill, bounce light, and add creative color effects.</p>
                        <h3 className="text-xl font-serif mb-4 border-b border-charcoal/10 pb-2">Inventory List</h3>
                        <ul className="space-y-3 text-sm">
                            <li>2x V-Flats (Black/White)</li>
                            <li>1x 5-in-1 Reflector Kit</li>
                            <li>Assortment of Colored Gels</li>
                            <li>Black and White Bounce Cards</li>
                            <li>1x Roll Full CTO</li>
                            <li>1x Roll Full CTB</li>
                            <li>Assorted Diffusion Materials</li>
                        </ul>
                    </div>
                </div>
            )
        },
        hardware: {
            title: "Hardware",
            content: (
                <div className="space-y-8">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg opacity-80 mb-8 leading-relaxed">Essential rigging and safety equipment.</p>
                        <h3 className="text-xl font-serif mb-4 border-b border-charcoal/10 pb-2">Inventory List</h3>
                        <ul className="space-y-3 text-sm">
                            <li>10x Sandbags (20lbs)</li>
                            <li>10x A-Clamps (Assorted)</li>
                            <li>2x Duckbill Clamps</li>
                            <li>4x Super Clamps</li>
                            <li>Mini Clamps</li>
                            <li>Tapes (Gaffing, Electrical)</li>
                            <li>Ladders</li>
                            <li>Fishing Wire</li>
                        </ul>
                    </div>
                </div>
            )
        }
    };

    // Gallery photos
    const furniturePhotos = Array.from({ length: 6 }).map((_, i) => ({
        id: i + 1,
        src: `https://picsum.photos/seed/furn_${i + 1}/400/400?grayscale`,
        alt: `Furniture Item ${i + 1}`
    }));

    const propsPhotos = Array.from({ length: 6 }).map((_, i) => ({
        id: i + 1,
        src: `https://picsum.photos/seed/prop_${i + 1}/400/400?grayscale`,
        alt: `Prop Item ${i + 1}`
    }));

    // Seamless Paper Data
    const seamlessPapers = [
        { color: "bg-white border-gray-200", name: "White" },
        { color: "bg-black", name: "Black" },
        { color: "bg-[#4B3621]", name: "Dark Brown" },
        { color: "bg-red-600", name: "Red" },
        { color: "bg-gray-400", name: "Grey" },
        { color: "bg-pink-300", name: "Pink" },
        { color: "bg-blue-900", name: "Navy Blue" },
        { color: "bg-blue-300", name: "Light Blue" },
        { color: "bg-green-900", name: "Dark Green" },
        { color: "bg-green-500", name: "Chroma Key Green" },
        { color: "bg-[#E1C699]", name: "Beige" },
        { color: "bg-gray-300", name: "Newspaper" },
    ];

    return (
        <div className="pb-32 min-h-screen">

            {/* Global Modal Overlay */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[60] bg-cream overflow-y-auto"
                    >
                        <div className="sticky top-0 right-0 p-6 flex justify-between items-center bg-cream/90 backdrop-blur-md z-10 border-b border-charcoal/10">
                            <span className="text-2xl font-serif italic">{activeModal.title}</span>
                            <button
                                onClick={() => setActiveModal(null)}
                                className="p-2 rounded-full hover:bg-charcoal/5 transition-colors"
                            >
                                <X size={32} />
                            </button>
                        </div>
                        <div className="p-6 pb-24">
                            {activeModal.content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 1. Intro Hero */}
            <section className="relative h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://picsum.photos/seed/studio_light/1920/1080?grayscale&blur=2"
                        alt="Studio Lighting Grid"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-cream/40 mix-blend-overlay"></div>
                </div>

                <div className="relative z-10 text-left px-6 max-w-7xl mx-auto w-full py-20">
                    <Reveal>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl mb-6 md:mb-8 leading-tight max-w-4xl font-serif">
                            Everything You <br /> Need to <span className="italic">Create</span>.
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-base md:text-xl max-w-md md:max-w-xl mb-8 md:mb-12 opacity-80">
                            A curated collection of professional lighting, grip, and amenities designed to remove barriers between your vision and the final image.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <Button onClick={() => scrollToSection('lighting')}>View What's Included</Button>
                    </Reveal>
                </div>
            </section>

            {/* 2. Navigation Grid */}
            <NavigationGrid gridItems={gridItems} scrollToSection={scrollToSection} />

            {/* 3. Lighting Grid */}
            <section id="lighting" className="py-24 px-6 border-t border-charcoal/10">
                <div className="max-w-7xl mx-auto">
                    <Reveal>
                        <div className="mb-16">
                            <h2 className="text-5xl md:text-6xl mb-6 font-serif">Precision <span className="italic">Lighting</span></h2>
                            <p className="text-lg opacity-80 max-w-2xl">
                                Professional strobe systems and continuous LED options.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="grid grid-cols-3 gap-2 md:gap-8">
                            <button
                                onClick={() => setActiveModal(lightingData.strobes)}
                                className="group relative w-full aspect-square bg-charcoal text-cream border border-white/40 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col items-center justify-center p-4"
                            >
                                <span className="text-[10px] md:text-lg uppercase tracking-widest text-center">Strobe Lighting</span>
                            </button>

                            <button
                                onClick={() => setActiveModal(lightingData.continuous)}
                                className="group relative w-full aspect-square bg-charcoal text-cream border border-white/40 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col items-center justify-center p-4"
                            >
                                <span className="text-[10px] md:text-lg uppercase tracking-widest text-center">Continuous Lighting</span>
                            </button>

                            <button
                                onClick={() => setActiveModal(lightingData.modifiers)}
                                className="group relative w-full aspect-square bg-charcoal text-cream border border-white/40 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col items-center justify-center p-4"
                            >
                                <span className="text-[10px] md:text-lg uppercase tracking-widest text-center">Modifiers</span>
                            </button>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 4. Grip & Support */}
            <section id="grip" className="py-24 px-6 bg-cream text-charcoal">
                <div className="max-w-7xl mx-auto">
                    <Reveal>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-charcoal/20 pb-8">
                            <h2 className="text-5xl md:text-6xl font-serif">Grip & <span className="italic">Support</span></h2>
                            <span className="text-sm tracking-widest uppercase opacity-50 mt-4 md:mt-0">Included with Rental</span>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="grid grid-cols-3 gap-2 md:gap-8">
                            <button
                                onClick={() => setActiveModal(gripData.stands)}
                                className="group relative w-full aspect-square border border-charcoal/10 bg-charcoal text-cream hover:bg-white hover:text-charcoal transition-colors duration-300 flex flex-col items-center justify-center p-4"
                            >
                                <span className="text-[10px] md:text-lg uppercase tracking-widest text-center">Stands</span>
                            </button>

                            <button
                                onClick={() => setActiveModal(gripData.reflectors)}
                                className="group relative w-full aspect-square border border-charcoal/10 bg-charcoal text-cream hover:bg-white hover:text-charcoal transition-colors duration-300 flex flex-col items-center justify-center p-4"
                            >
                                <span className="text-[10px] md:text-lg uppercase tracking-widest text-center leading-tight">Reflectors &<br />Coloring</span>
                            </button>

                            <button
                                onClick={() => setActiveModal(gripData.hardware)}
                                className="group relative w-full aspect-square border border-charcoal/10 bg-charcoal text-cream hover:bg-white hover:text-charcoal transition-colors duration-300 flex flex-col items-center justify-center p-4"
                            >
                                <span className="text-[10px] md:text-lg uppercase tracking-widest text-center">Hardware</span>
                            </button>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 5. Seamless Library */}
            <section id="seamless" className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <Reveal>
                        <div className="sticky top-24">
                            <img
                                src="https://picsum.photos/seed/paper_rolls/800/1000?grayscale"
                                alt="Seamless Paper Rolls"
                                className="w-full h-[600px] object-cover"
                            />
                        </div>
                    </Reveal>
                    <div>
                        <Reveal>
                            <h2 className="text-5xl mb-8 font-serif">The <span className="italic">Paper</span> Library</h2>
                            <p className="mb-4 opacity-80">
                                A constantly rotated selection of Savage Universal paper backgrounds. All rolls are 107 inches wide.
                            </p>
                            <p className="mb-12 text-sm italic opacity-60">
                                Immediate availability may vary unless explicitly communicated.
                            </p>
                        </Reveal>

                        <PaperColorsGrid papers={seamlessPapers} />
                    </div>
                </div>
            </section>

            {/* 6. Creative Amenities */}
            <section id="amenities" className="py-24 px-6 bg-white/50">
                <div className="max-w-7xl mx-auto">
                    <Reveal>
                        <h2 className="text-5xl text-center mb-16 font-serif">Designed for <span className="italic">Comfort</span></h2>
                    </Reveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Reveal>
                            <Accordion title="Client Lounge">
                                <div className="space-y-4 pt-4">
                                    <p className="opacity-70 leading-relaxed text-sm">
                                        Clients have plenty of options. An assortment of furniture is laid out where they can lounge, collaborate, or chill.
                                    </p>
                                    <img src="https://picsum.photos/seed/kitchen/400/300?grayscale" alt="Lounge" className="w-full h-48 object-cover" />
                                </div>
                            </Accordion>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <Accordion title="Private Change Room">
                                <div className="space-y-4 pt-4">
                                    <p className="opacity-70 leading-relaxed text-sm">
                                        There is a private change room/hair and makeup area that's well lit and spacious.
                                    </p>
                                    <img src="https://picsum.photos/seed/vanity/400/300?grayscale" alt="Styling" className="w-full h-48 object-cover" />
                                </div>
                            </Accordion>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <Accordion title="Kitchenette & Catering">
                                <div className="space-y-4 pt-4">
                                    <p className="opacity-70 leading-relaxed text-sm">
                                        We have a full kitchenette area along with a fridge stocked with water.
                                    </p>
                                    <img src="https://picsum.photos/seed/wifi/400/300?grayscale" alt="Tech" className="w-full h-48 object-cover" />
                                </div>
                            </Accordion>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 7. Props & Furniture */}
            <section id="props" className="py-24 px-6 max-w-7xl mx-auto">
                <Reveal>
                    <div className="text-center mb-16">
                        <h2 className="text-5xl mb-6 font-serif">Props & <span className="italic">Furniture</span></h2>
                        <p className="opacity-80 max-w-2xl mx-auto">
                            Curated pieces to elevate your set design without the need for external rentals.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Accordion title="Furniture Gallery">
                            <div className="pt-4 space-y-4">
                                <p className="opacity-70 leading-relaxed text-sm">
                                    We have an assortment of premium, curated furniture designed to fit with any photo shoot or project style.
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {furniturePhotos.map(item => (
                                        <div key={item.id} className="group relative aspect-square overflow-hidden bg-gray-100">
                                            <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Accordion>

                        <Accordion title="Props Gallery">
                            <div className="pt-4 space-y-4">
                                <p className="opacity-70 leading-relaxed text-sm">
                                    We have an assortment of popular props that can elevate the mood of any shoot.
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {propsPhotos.map(item => (
                                        <div key={item.id} className="group relative aspect-square overflow-hidden bg-gray-100">
                                            <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </Reveal>
            </section>

            {/* 8. Final CTA */}
            <section className="py-32 px-6 text-center border-t border-charcoal/10">
                <Reveal>
                    <h2 className="text-6xl md:text-8xl mb-12 font-serif">
                        Pro Gear. Pro Space.<br />
                        <span className="italic">Ready to Book?</span>
                    </h2>
                    <Button onClick={() => onBook()}>Book Your Time</Button>
                </Reveal>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default EquipmentPage;
