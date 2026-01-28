'use client';
import React, { useState } from 'react';
import { ArrowRight, X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { cloudinaryUrl } from '@/lib/cloudinary';
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
    { id: 'cyc-wall', slides: 3 },  // Updated: 3 slides (overview, specs, video showcase)
    { id: 'backdrops', slides: 3 },  // Updated: 3 slides (overview, colors, pulley system)
    { id: 'lighting', slides: 2 },
    // { id: 'current-sets', slides: 2 },  // Hidden for now - will bring back later
    { id: 'props', slides: 3 },  // Updated: 3 slides (overview, props gallery, furniture gallery)
    { id: 'kitchenette', slides: 1 },
    { id: 'changeroom', slides: 1 },
    { id: 'cta', slides: 1 },
];

// Equipment data for Pro Lighting modals - synced with EquipmentPage
const EQUIPMENT_DATA = {
    strobes: {
        title: 'Strobes & Modifiers',
        items: [
            '3x Godox SK400ii',
            '2x Godox MS300',
            '1x Godox XT-16 Universal Trigger',
            '2x 60cm x 90cm Softboxes + Grids',
            '2x 30cm x 160cm Strip Boxes + Grids',
            '2x 20cm x 90cm Strip Boxes + Grids',
            '1x 95cm Octabox + Grid',
            '1x 55cm x 55cm Softbox + Grid',
            '2x Optical Projector Snoots',
            '12+ Umbrellas in Varying Sizes'
        ]
    },
    continuous: {
        title: 'Continuous Lighting',
        items: [
            '1x Amaran 200d',
            '2x Godox SL100d',
            '1x Neewer 70bi',
            '1x Godox SL60bi',
            '4x Neewer 660 RGB Panel',
            '2x KinoFlo FIX-4804'
        ]
    },
    grip: {
        title: 'Grip & Support',
        items: [
            '4x 12ft C-Stands',
            '3x 10ft Light Tripods',
            '1x Wall Mounted Overhead Boom Arm',
            '1x Rolling 10ft C-Stand',
            '2x V-Flats (Black/White)',
            '1x 5-in-1 Reflector Kit',
            'Assortment of Colored Gels',
            '10x Sandbags (20lbs)',
            '10x A-Clamps (Assorted)',
            '4x Super Clamps',
            'Tapes (Gaffing, Electrical)'
        ]
    }
};

interface TourPageProps {
    onBook: (duration?: number) => void;
}

type EquipmentCategory = 'strobes' | 'continuous' | 'grip' | null;

const TourPage: React.FC<TourPageProps> = ({ onBook }) => {
    const [activeEquipment, setActiveEquipment] = useState<EquipmentCategory>(null);
    const [expandedImage, setExpandedImage] = useState<string | null>(null);
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
                <TourSlide theme="dark" bgImage={cloudinaryUrl('The_Cyc_Wall_aohgwv')} bgOverlay="gradient-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto px-6 items-center h-full">
                        <div className="md:col-start-1">
                            <Reveal>
                                <h2 className="font-serif text-5xl md:text-7xl mb-6 text-black">The Cyc Wall</h2>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <div className="w-24 h-[1px] bg-black/50 mb-6"></div>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <p className="font-sans font-light text-lg max-w-md mb-8 text-black">
                                    Our 12 ft x 10 ft x 10 ft corner cyclorama wall offers an infinite horizon for your productions. Pristine white, perfectly curved.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </TourSlide>

                {/* Slide 2: Dimensions & Specs */}
                <TourSlide theme="dark" bgImage={cloudinaryUrl('12x10x10_xa9g45')} bgOverlay="dark">
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

                {/* Slide 3: Video Showcase */}
                <TourSlide theme="dark" bgOverlay="dark" className="bg-[#0a0a0a]">
                    <div className="max-w-5xl mx-auto px-4 md:px-6 text-center flex flex-col justify-center items-center h-full pb-32 md:pb-0">
                        <Reveal>
                            <p className="text-xs uppercase tracking-[0.3em] mb-4 text-cream/60">See It In Action</p>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h3 className="font-serif text-3xl md:text-5xl mb-4 md:mb-6 text-cream">The Cyc Wall Experience</h3>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-cream/70 max-w-lg mx-auto mb-6 md:mb-8 text-sm md:text-base">
                                Watch how our cyclorama wall transforms any shoot into a professional production with seamless backgrounds and infinite possibilities.
                            </p>
                        </Reveal>

                        {/* YouTube Video Placeholder */}
                        <Reveal delay={0.3}>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 bg-cream/10 hover:bg-cream/20 border border-cream/30 rounded-lg transition-all group mb-6 md:mb-10"
                            >
                                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-cream/20 flex items-center justify-center group-hover:bg-cream/30 transition-colors">
                                    <Play size={20} className="text-cream ml-1" />
                                </div>
                                <span className="text-cream font-serif text-base md:text-xl">Watch Video Tour</span>
                            </a>
                        </Reveal>

                        {/* Use Cases & Features */}
                        <Reveal delay={0.4}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                                {[
                                    { label: 'Portraits', icon: '📸' },
                                    { label: 'Product Shots', icon: '🛍️' },
                                    { label: 'Video Production', icon: '🎬' },
                                    { label: 'Fashion', icon: '👗' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-cream/5 border border-cream/10 rounded-lg p-3 md:p-6">
                                        <span className="text-xl md:text-3xl mb-2 block">{item.icon}</span>
                                        <p className="text-cream/80 text-[10px] md:text-sm uppercase tracking-wider">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </TourSlide>
            </TourSection>

            {/* 3. Backdrops (2 slides) */}
            <TourSection id="backdrops">
                {/* Slide 1: Overview */}
                <TourSlide theme="light" className="relative">
                    <div className="absolute inset-0 md:hidden block">
                        <div className="absolute inset-0" style={bgImage(cloudinaryUrl('Seamless_Backdrops_oug1lx'))} />
                        <div className="absolute inset-0 bg-cream/80" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full relative z-10">
                        <div className="hidden md:block h-full w-full bg-gray-200 relative order-2 md:order-1">
                            <div className="absolute inset-0" style={bgImage(cloudinaryUrl('Seamless_Backdrops_oug1lx'))} />
                        </div>

                        <div className="h-full w-full flex flex-col justify-center items-center text-center px-8 md:px-12 order-1 md:order-2">
                            <div className="flex flex-col items-center">
                                <Reveal>
                                    <span className="text-xs font-bold tracking-widest uppercase text-charcoal/60 mb-4 block">Equipment</span>
                                </Reveal>
                                <Reveal delay={0.1}>
                                    <h2 className="font-serif text-5xl md:text-6xl mb-6 text-charcoal">Seamless <br /><span className="italic text-charcoal/50">Backdrops</span></h2>
                                </Reveal>
                                <Reveal delay={0.2}>
                                    <p className="font-sans text-charcoal/70 mb-8 leading-relaxed max-w-sm mx-auto">
                                        Collection of 9-foot-wide seamless backdrops available for use with our integrated cyclorama wall pulley system.
                                    </p>
                                </Reveal>
                            </div>
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
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-6">
                            {[
                                { name: 'White', color: '#FFFFFF' },
                                { name: 'Black', color: '#1A1A1A' },
                                { name: 'Dark Brown', color: '#4B3621' },
                                { name: 'Red', color: '#DC2626' },
                                { name: 'Grey', color: '#9CA3AF' },
                                { name: 'Pink', color: '#F9A8D4' },
                                { name: 'Navy Blue', color: '#1E3A8A' },
                                { name: 'Light Blue', color: '#93C5FD' },
                                { name: 'Dark Green', color: '#14532D' },
                                { name: 'Chroma Green', color: '#22C55E' },
                                { name: 'Beige', color: '#E1C699' },
                                { name: 'Newspaper', color: '#D1D5DB' },
                            ].map((backdrop, i) => (
                                <Reveal key={backdrop.name} delay={0.05 + i * 0.03}>
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-10 h-10 md:w-16 md:h-16 rounded-full mb-2 shadow-lg border border-charcoal/10"
                                            style={{ backgroundColor: backdrop.color }}
                                        />
                                        <p className="text-[9px] md:text-xs text-charcoal/70 text-center leading-tight">{backdrop.name}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                        <Reveal delay={0.5}>
                            <p className="text-center text-charcoal/50 text-xs md:text-sm mt-4 md:mt-8">
                                Availability may vary • Additional colors upon request
                            </p>
                        </Reveal>
                    </div>
                </TourSlide>

                {/* Slide 3: Pulley System */}
                <TourSlide theme="dark" bgImage={cloudinaryUrl('The_Pulley_System_zlxcxa')} bgOverlay="dark">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <Reveal>
                            <p className="text-xs uppercase tracking-[0.3em] mb-4 text-cream/60">How It Works</p>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h3 className="font-serif text-3xl md:text-5xl mb-6 text-cream">The Pulley System</h3>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-cream/80 max-w-lg mx-auto mb-8 text-sm md:text-base">
                                Our integrated pulley system allows quick backdrop changes without ladders or hassle. Simply pull to swap colors in seconds.
                            </p>
                        </Reveal>

                        {/* YouTube Video Placeholder */}
                        <Reveal delay={0.3}>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-4 px-8 py-4 bg-cream/10 hover:bg-cream/20 border border-cream/30 rounded-lg transition-all group"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-cream/20 flex items-center justify-center group-hover:bg-cream/30 transition-colors">
                                    <Play size={24} className="text-cream ml-1" />
                                </div>
                                <span className="text-cream font-serif text-lg md:text-xl">Watch Demo Video</span>
                            </a>
                        </Reveal>
                    </div>
                </TourSlide>
            </TourSection>

            {/* 4. Lighting Grid (2 slides) */}
            <TourSection id="lighting">
                {/* Slide 1: Overview */}
                <TourSlide theme="dark" bgImage={cloudinaryUrl('Pro_Lighting_Grid_q90xds')} bgOverlay="dark">
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

                {/* Slide 2: Equipment Details - Clickable Categories */}
                <TourSlide theme="dark" className="bg-[#1a1a1a]">
                    <div className="max-w-4xl mx-auto w-full">
                        <Reveal>
                            <p className="text-xs uppercase tracking-[0.2em] mb-2 md:mb-4 text-cream/60 text-center">Tap to View Equipment</p>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h3 className="font-serif text-2xl md:text-5xl mb-6 md:mb-12 text-center text-cream">Professional Grade</h3>
                        </Reveal>
                        <div className="grid grid-cols-3 gap-4 md:gap-8">
                            {/* Strobes Button */}
                            <Reveal delay={0.2}>
                                <button
                                    onClick={() => setActiveEquipment('strobes')}
                                    className="text-center w-full group cursor-pointer"
                                >
                                    <div className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-2 md:mb-4 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition-all group-hover:scale-110 border border-cream/20 group-hover:border-cream/40">
                                        <span className="text-3xl md:text-4xl">💡</span>
                                    </div>
                                    <h4 className="font-serif text-base md:text-xl mb-1 md:mb-2 text-cream group-hover:text-white transition-colors">Strobes</h4>
                                    <p className="text-cream/60 text-[10px] md:text-sm hidden md:block">Tap to see full list</p>
                                </button>
                            </Reveal>

                            {/* Continuous Button */}
                            <Reveal delay={0.3}>
                                <button
                                    onClick={() => setActiveEquipment('continuous')}
                                    className="text-center w-full group cursor-pointer"
                                >
                                    <div className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-2 md:mb-4 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition-all group-hover:scale-110 border border-cream/20 group-hover:border-cream/40">
                                        <span className="text-3xl md:text-4xl">🎬</span>
                                    </div>
                                    <h4 className="font-serif text-base md:text-xl mb-1 md:mb-2 text-cream group-hover:text-white transition-colors">Continuous</h4>
                                    <p className="text-cream/60 text-[10px] md:text-sm hidden md:block">Tap to see full list</p>
                                </button>
                            </Reveal>

                            {/* Grip Button */}
                            <Reveal delay={0.4}>
                                <button
                                    onClick={() => setActiveEquipment('grip')}
                                    className="text-center w-full group cursor-pointer"
                                >
                                    <div className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-2 md:mb-4 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition-all group-hover:scale-110 border border-cream/20 group-hover:border-cream/40">
                                        <span className="text-3xl md:text-4xl">🔧</span>
                                    </div>
                                    <h4 className="font-serif text-base md:text-xl mb-1 md:mb-2 text-cream group-hover:text-white transition-colors">Grip</h4>
                                    <p className="text-cream/60 text-[10px] md:text-sm hidden md:block">Tap to see full list</p>
                                </button>
                            </Reveal>
                        </div>
                    </div>
                </TourSlide>
            </TourSection>

            {/* 5. Current Sets - HIDDEN FOR NOW
            <TourSection id="current-sets">
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
            */}

            {/* 6. Props Gallery (3 slides) */}
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

                {/* Slide 2: Props Gallery */}
                <TourSlide theme="light" className="bg-cream">
                    <div className="max-w-5xl mx-auto px-4 md:px-6 w-full">
                        <Reveal>
                            <h3 className="font-serif text-3xl md:text-5xl mb-6 md:mb-8 text-center">Props <span className="italic text-charcoal/50">Collection</span></h3>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <div className="aspect-video md:aspect-[21/9] bg-charcoal/5 border-2 border-dashed border-charcoal/20 rounded-xl flex flex-col items-center justify-center">
                                <p className="font-serif text-4xl md:text-6xl italic text-charcoal/30 mb-4">Coming Soon</p>
                                <p className="text-sm md:text-base text-charcoal/50 uppercase tracking-widest">Props Collection Photos</p>
                            </div>
                        </Reveal>
                    </div>
                </TourSlide>

                {/* Slide 3: Furniture Gallery */}
                <TourSlide theme="dark" className="bg-charcoal">
                    <div className="max-w-5xl mx-auto px-4 md:px-6 w-full">
                        <Reveal>
                            <h3 className="font-serif text-3xl md:text-5xl mb-6 md:mb-8 text-center text-cream">Furniture <span className="italic text-cream/50">Selection</span></h3>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <div className="aspect-video md:aspect-[21/9] bg-cream/5 border-2 border-dashed border-cream/20 rounded-xl flex flex-col items-center justify-center">
                                <p className="font-serif text-4xl md:text-6xl italic text-cream/30 mb-4">Coming Soon</p>
                                <p className="text-sm md:text-base text-cream/50 uppercase tracking-widest">Furniture Selection Photos</p>
                            </div>
                        </Reveal>
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
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-charcoal rounded-full" /> Kitchenette with large sink and plenty of storage</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-charcoal rounded-full" /> Plenty of places for clients to lounge</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-charcoal rounded-full" /> Clean and accessible washroom</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-charcoal rounded-full" /> Large fridge stocked with water</li>
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
                            variant="outline"
                            className="border-cream text-cream hover:bg-cream hover:text-charcoal px-12 py-5 text-lg"
                        >
                            Book Your Time
                        </Button>
                    </Reveal>
                </div>
            </TourSection>

            {/* Floating Navigation */}
            <TourNavigation />

            {/* Equipment Modal */}
            <AnimatePresence>
                {activeEquipment && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm"
                        onClick={() => setActiveEquipment(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-cream rounded-lg p-6 md:p-8 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setActiveEquipment(null)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-charcoal/10 hover:bg-charcoal/20 flex items-center justify-center transition-colors"
                            >
                                <X size={18} className="text-charcoal" />
                            </button>

                            {/* Modal Content */}
                            <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-6">
                                {EQUIPMENT_DATA[activeEquipment].title}
                            </h3>
                            <ul className="space-y-3">
                                {EQUIPMENT_DATA[activeEquipment].items.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-3 text-charcoal/80"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-charcoal/40 flex-shrink-0" />
                                        <span className="text-sm md:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setActiveEquipment(null)}
                                className="mt-8 w-full py-3 bg-charcoal text-cream rounded-lg hover:bg-charcoal/90 transition-colors font-medium"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Expanded Image Modal */}
            <AnimatePresence>
                {expandedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
                        onClick={() => setExpandedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative max-w-4xl max-h-[85vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={expandedImage}
                                alt="Expanded view"
                                className="w-full h-full object-contain rounded-lg"
                            />
                            <button
                                onClick={() => setExpandedImage(null)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors backdrop-blur-sm"
                            >
                                <X size={24} className="text-white" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </TourContainer>
    );
};

export default TourPage;
