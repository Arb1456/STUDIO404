'use client';
import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryImage {
    cloudinaryId: string; // Pass a real Cloudinary URL or placeholder
    alt: string;
    caption?: string;
}

interface PhotoGalleryModalProps {
    images: GalleryImage[];
    currentIndex: number;
    onIndexChange: (index: number) => void;
    onClose: () => void;
    title?: string;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
    images,
    currentIndex,
    onIndexChange,
    onClose,
    title,
}) => {
    const total = images.length;

    const prev = useCallback(() => {
        onIndexChange((currentIndex - 1 + total) % total);
    }, [currentIndex, total, onIndexChange]);

    const next = useCallback(() => {
        onIndexChange((currentIndex + 1) % total);
    }, [currentIndex, total, onIndexChange]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [prev, next, onClose]);

    const current = images[currentIndex];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase z-10">
                {currentIndex + 1} / {total}
            </div>

            {/* Title */}
            {title && (
                <div className="absolute top-5 left-6 text-white/50 text-xs tracking-widest uppercase z-10">
                    {title}
                </div>
            )}

            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10"
                aria-label="Close gallery"
            >
                <X size={20} className="text-white" />
            </button>

            {/* Image */}
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-5xl max-h-[80vh] w-full px-16 flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={current.cloudinaryId}
                    alt={current.alt}
                    className="max-h-[75vh] w-auto max-w-full object-contain rounded-sm"
                />
                {current.caption && (
                    <p className="mt-4 text-white/50 text-xs tracking-widest uppercase text-center">
                        {current.caption}
                    </p>
                )}
            </motion.div>

            {/* Prev arrow */}
            <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10"
                aria-label="Previous image"
            >
                <ChevronLeft size={22} className="text-white" />
            </button>

            {/* Next arrow */}
            <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors z-10"
                aria-label="Next image"
            >
                <ChevronRight size={22} className="text-white" />
            </button>
        </motion.div>
    );
};

export default PhotoGalleryModal;
