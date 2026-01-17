import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const GALLERY_IMAGES = [
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2459&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2787&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502989642968-feaca5123146?q=80&w=2670&auto=format&fit=crop"
];

const CAROUSEL_IMAGES = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES];

const Gallery: React.FC = () => {
    return (
        <section className="h-screen w-full snap-start bg-cream flex flex-col justify-center py-24 overflow-hidden relative">
            <div className="px-6 md:px-12 mb-10 text-center md:text-left">
                <Reveal>
                    <h2 className="font-serif text-4xl text-charcoal mb-2">Shot in Our Space</h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="font-sans text-xs uppercase tracking-widest text-charcoal/60">Curated Community Works</p>
                </Reveal>
            </div>

            {/* Infinite Carousel */}
            <div className="w-full overflow-hidden mb-12">
                <motion.div
                    className="flex gap-6 w-max"
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 90,
                        ease: "linear",
                        repeat: Infinity
                    }}
                >
                    {CAROUSEL_IMAGES.map((src, index) => (
                        <div
                            key={index}
                            className="w-[280px] md:w-[350px] aspect-[3/4] flex-shrink-0 overflow-hidden relative bg-charcoal/5"
                        >
                            <img
                                src={src}
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                alt={`Gallery work ${index}`}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="px-6 md:px-12 flex justify-center md:justify-start">
                <Reveal delay={0.2}>
                    <a
                        href="/gallery"
                        className="inline-flex items-center gap-3 font-serif text-xl text-charcoal hover:text-charcoal-light transition-colors group"
                    >
                        <span className="border-b border-charcoal/20 pb-1 group-hover:border-charcoal transition-colors">View Full Client Gallery</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </Reveal>
            </div>
        </section>
    );
};

export default Gallery;
