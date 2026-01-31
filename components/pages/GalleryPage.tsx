'use client';
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';

interface GalleryItem {
    id: number;
    category: string;
    src: string;
    aspectRatio: number;
    title: string;
    client: string;
}

// Placeholder colors for the gallery - sophisticated muted tones
const PLACEHOLDER_COLORS = [
    '#8B7355', // Warm taupe
    '#6B8E7D', // Sage green
    '#9B8B7A', // Warm gray
    '#7D8B98', // Steel blue
    '#A39178', // Sand
    '#8E9B8B', // Olive mist
    '#9A8A9B', // Dusty mauve
    '#7B8C8B', // Teal gray
    '#B5A18C', // Camel
    '#8A9A8D', // Eucalyptus
    '#9E8E7E', // Driftwood
    '#7E8C9A', // Slate blue
    '#A8998A', // Mushroom
    '#8B9B8E', // Moss
    '#988B9A', // Lavender gray
];

// Generate 45 items for pagination demo
const GALLERY_ITEMS: GalleryItem[] = Array.from({ length: 45 }).map((_, i) => {
    const types = ['Portrait', 'Branding', 'Editorial', 'Product'];
    const type = types[i % types.length];
    const aspect = i % 3 === 0 ? 1200 : (i % 2 === 0 ? 800 : 1000);

    return {
        id: i + 1,
        category: type,
        src: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length],
        aspectRatio: aspect / 800,
        title: [
            'The Modernist', 'Aesop Concept', 'Vogue September', 'Ceramic Series', 'Noir Etude',
            'Coffee Culture', 'Urban Flow', 'Tech Minimal', 'Golden Hour', 'Fall Collection'
        ][i % 10],
        client: [
            'Sarah Jenkins', 'Aesop', 'Condé Nast', 'Clay & Co', 'Private Client',
            'Little Victories', 'Hypebeast', 'Nothing', 'Model Mgmt', 'Zara'
        ][i % 10]
    };
});

interface GalleryPageProps {
    onBook: (duration?: number) => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ onBook }) => {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(20);

    const itemsRef = useRef<Map<number, HTMLDivElement>>(new Map());

    const displayedItems = GALLERY_ITEMS.slice(0, visibleCount);
    const hasMore = visibleCount < GALLERY_ITEMS.length;

    const handleViewMore = () => {
        setVisibleCount(prev => prev + 20);
    };

    // Scroll & Resize Logic
    useEffect(() => {
        const updateVisuals = () => {
            if (window.innerWidth < 768) {
                const centerY = window.innerHeight / 2;
                const range = window.innerHeight * 0.35;

                itemsRef.current.forEach((el) => {
                    if (!el) return;
                    const rect = el.getBoundingClientRect();
                    const elCenter = rect.top + rect.height / 2;
                    const dist = Math.abs(centerY - elCenter);
                    const gray = Math.min(1, Math.max(0, dist / range));
                    el.style.filter = `grayscale(${gray})`;
                });
            } else {
                itemsRef.current.forEach((el) => {
                    if (el && el.style.filter) el.style.filter = '';
                });
            }
        };

        const handleScroll = () => requestAnimationFrame(updateVisuals);

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateVisuals);
        updateVisuals();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateVisuals);
        };
    }, [visibleCount]);

    // Lightbox Navigation
    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev === 0 ? displayedItems.length - 1 : (prev as number) - 1));
        }
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev === displayedItems.length - 1 ? 0 : (prev as number) + 1));
        }
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev === 0 ? displayedItems.length - 1 : (prev as number) - 1));
            if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev === displayedItems.length - 1 ? 0 : (prev as number) + 1));
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, displayedItems.length]);

    return (
        <div className="w-full min-h-screen bg-cream text-charcoal pb-32 relative overflow-hidden">

            {/* S1: Intro Section */}
            <section className="relative z-10 pt-32 pb-8 px-6 md:px-12 lg:px-24">
                <Reveal>
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter">
                            Community Gallery
                        </h1>
                    </div>
                </Reveal>
            </section>

            {/* Description Section */}
            <section className="relative z-10 pb-12 px-6 md:px-12 lg:px-24">
                <Reveal delay={0.1}>
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="font-sans text-base md:text-lg text-charcoal/80 leading-relaxed">
                            The Studio 404 Community Gallery is a living testament to the unlimited potential of our creative community, built to prove that editorial-grade results are within reach for every creator who steps into our space. By showcasing real work captured within our creator-oriented environment, we provide a visual roadmap of what is possible when professional lighting and our signature cyclorama, backdrops and props meet a unique vision.
                        </p>
                        <p className="font-sans text-base md:text-lg text-charcoal/80 leading-relaxed mt-4">
                            If a specific aesthetic in this collection resonates with you, we encourage you to reach out directly to the credited photographer to book your session—they are masters of this environment and the ideal partners to help you create without limits.
                        </p>
                    </div>
                </Reveal>
            </section>

            {/* Subheading */}
            <section className="relative z-20 px-6 md:px-12 lg:px-24 mb-8 py-4 bg-gradient-to-b from-cream via-cream/95 to-transparent sticky top-0 transition-all text-center">
                <Reveal delay={0.2}>
                    <div className="border-b border-charcoal/10 pb-4">
                        <span className="text-xs md:text-sm uppercase tracking-widest text-charcoal/60">
                            Photos from our community
                        </span>
                    </div>
                </Reveal>
            </section>

            {/* Main Grid */}
            <section className="relative z-10 px-2 md:px-12 lg:px-24 min-h-[60vh]">
                <div className="columns-3 md:columns-4 lg:columns-5 gap-2 md:gap-4 space-y-2 md:space-y-4 mx-auto max-w-[1920px]">
                    {displayedItems.map((item, index) => (
                        <Reveal key={item.id} delay={(index % 6) * 0.05}>
                            <div
                                ref={(el) => {
                                    if (el) itemsRef.current.set(index, el);
                                    else itemsRef.current.delete(index);
                                }}
                                className="break-inside-avoid relative group cursor-pointer overflow-hidden bg-charcoal/5"
                                onClick={() => setLightboxIndex(index)}
                            >
                                <div
                                    className="w-full flex items-center justify-center p-4 transition-transform duration-700 ease-out group-hover:scale-105"
                                    style={{
                                        backgroundColor: item.src,
                                        aspectRatio: `1 / ${item.aspectRatio}`,
                                        minHeight: '120px'
                                    }}
                                >
                                    <span className="text-white/90 text-[10px] md:text-xs font-medium uppercase tracking-wider text-center leading-relaxed drop-shadow-sm">
                                        Community image<br />coming soon
                                    </span>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {displayedItems.length === 0 && (
                    <div className="text-center py-20 opacity-50 uppercase tracking-widest">
                        No works found.
                    </div>
                )}

                {/* View More Button */}
                {hasMore && (
                    <div className="flex justify-center mt-12 mb-8">
                        <Reveal>
                            <Button variant="outline" onClick={handleViewMore} className="flex items-center gap-2">
                                View More <ArrowDown size={14} />
                            </Button>
                        </Reveal>
                    </div>
                )}
            </section>

            {/* Submission CTA */}
            <section className="relative z-10 py-16 px-6 md:px-12 lg:px-24">
                <Reveal>
                    <div className="max-w-3xl mx-auto text-center border-t border-b border-charcoal/10 py-12 space-y-6">
                        <h3 className="font-serif text-3xl md:text-4xl text-charcoal">
                            Want to be featured on our community's gallery?
                        </h3>
                        <p className="font-sans text-base md:text-lg text-charcoal/70 font-light max-w-xl mx-auto">
                            Come shoot at Studio 404 and submit any work to{' '}
                            <a href="mailto:andre@studio404.ca" className="text-charcoal border-b border-charcoal/30 hover:border-charcoal transition-all">
                                andre@studio404.ca
                            </a>.
                        </p>
                    </div>
                </Reveal>
            </section>

            {/* Social Proof */}
            <section className="relative z-10 py-24 px-6 md:px-12 text-center mt-12">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-charcoal/20" />
                <Reveal>
                    <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-charcoal leading-snug max-w-5xl mx-auto italic">
                        "Created by photographers, brands, and families across Ottawa."
                    </p>
                </Reveal>
            </section>

            {/* Final CTA */}
            <section className="relative z-10 py-20 px-6 bg-charcoal/5 backdrop-blur-sm">
                <Reveal>
                    <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center space-y-10">
                        <h2 className="font-serif text-5xl md:text-6xl text-charcoal">
                            Inspired to Create?
                        </h2>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-auto">
                            <Button onClick={() => onBook()} className="w-full md:w-auto">
                                Rent the Studio
                            </Button>
                            <Link href="/photoshoot" className="w-full md:w-auto">
                                <Button variant="outline" className="w-full">
                                    Book a Photoshoot
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* Lightbox Modal */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-cream/95 backdrop-blur-xl flex items-center justify-center"
                    onClick={() => setLightboxIndex(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-charcoal/50 hover:text-charcoal transition-colors p-2 z-50"
                        onClick={() => setLightboxIndex(null)}
                    >
                        <X size={32} strokeWidth={1} />
                    </button>

                    <button
                        className="absolute left-2 md:left-8 text-charcoal/30 hover:text-charcoal transition-colors p-4 z-50"
                        onClick={handlePrev}
                    >
                        <ChevronLeft size={48} strokeWidth={0.5} />
                    </button>

                    <button
                        className="absolute right-2 md:right-8 text-charcoal/30 hover:text-charcoal transition-colors p-4 z-50"
                        onClick={handleNext}
                    >
                        <ChevronRight size={48} strokeWidth={0.5} />
                    </button>

                    <div className="relative max-w-[95vw] max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        <div
                            className="w-full max-w-lg flex items-center justify-center rounded-lg shadow-2xl"
                            style={{
                                backgroundColor: displayedItems[lightboxIndex].src,
                                aspectRatio: `1 / ${displayedItems[lightboxIndex].aspectRatio}`,
                                minHeight: '300px'
                            }}
                        >
                            <span className="text-white/90 text-lg md:text-xl font-medium uppercase tracking-wider text-center leading-relaxed drop-shadow-md">
                                Community image<br />coming soon
                            </span>
                        </div>
                        <div className="mt-6 text-center">
                            <p className="font-serif text-2xl md:text-3xl italic text-charcoal mb-1">
                                {displayedItems[lightboxIndex].title}
                            </p>
                            <p className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/60">
                                Client: {displayedItems[lightboxIndex].client}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default GalleryPage;
