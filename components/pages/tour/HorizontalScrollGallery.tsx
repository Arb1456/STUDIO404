'use client';
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { GalleryImage } from './PhotoGalleryModal';

interface HorizontalScrollGalleryProps {
    images: GalleryImage[];
    onImageClick: (index: number) => void;
    theme?: 'dark' | 'light';
}

export const HorizontalScrollGallery: React.FC<HorizontalScrollGalleryProps> = ({
    images,
    onImageClick,
    theme = 'light',
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const amount = scrollRef.current.clientWidth * 0.75;
        scrollRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
    };

    const isDark = theme === 'dark';
    const borderColor = isDark ? 'border-cream/15' : 'border-charcoal/10';
    const captionColor = isDark ? 'text-cream/50' : 'text-charcoal/50';
    const overlayBg = isDark ? 'bg-black/40' : 'bg-black/30';

    return (
        <div className="relative w-full group/gallery">
            {/* Scrollable strip */}
            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => onImageClick(i)}
                        className={`
                            relative flex-shrink-0 snap-start overflow-hidden rounded-sm border ${borderColor}
                            w-[72vw] md:w-[38vw] lg:w-[28vw]
                            aspect-[4/3]
                            group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                        `}
                        aria-label={`View ${img.caption ?? img.alt}`}
                    >
                        <img
                            src={img.cloudinaryId}
                            alt={img.alt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                        {/* Hover overlay */}
                        <div className={`absolute inset-0 ${overlayBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
                            <ZoomIn size={24} className="text-white drop-shadow-md" />
                        </div>
                        {/* Caption */}
                        {img.caption && (
                            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
                                <p className="text-white/80 text-[10px] uppercase tracking-widest">{img.caption}</p>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Arrow buttons — always visible, frosted dark gray */}
            <button
                onClick={() => scroll('left')}
                className="
                    absolute left-2 top-1/2 -translate-y-[calc(50%+6px)]
                    w-10 h-10 rounded-full flex items-center justify-center
                    bg-black/55 hover:bg-black/75 backdrop-blur-md text-white
                    transition-all duration-200
                    shadow-lg border border-white/15 z-10
                "
                aria-label="Scroll left"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={() => scroll('right')}
                className="
                    absolute right-2 top-1/2 -translate-y-[calc(50%+6px)]
                    w-10 h-10 rounded-full flex items-center justify-center
                    bg-black/55 hover:bg-black/75 backdrop-blur-md text-white
                    transition-all duration-200
                    shadow-lg border border-white/15 z-10
                "
                aria-label="Scroll right"
            >
                <ChevronRight size={20} />
            </button>

            {/* Image count indicator */}
            <p className={`text-[10px] uppercase tracking-widest ${captionColor} text-right mt-1`}>
                {images.length} photos — scroll to browse
            </p>
        </div>
    );
};

export default HorizontalScrollGallery;
