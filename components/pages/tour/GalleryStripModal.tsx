'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GalleryImage } from './PhotoGalleryModal';
import { HorizontalScrollGallery } from './HorizontalScrollGallery';

interface GalleryStripModalProps {
    images: GalleryImage[];
    title?: string;
    onImageClick: (index: number) => void;
    onClose: () => void;
}

export const GalleryStripModal: React.FC<GalleryStripModalProps> = ({
    images,
    title,
    onImageClick,
    onClose,
}) => {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-5xl px-4 md:px-8 pb-8 pt-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    {title && (
                        <p className="text-white/50 text-xs uppercase tracking-widest">{title}</p>
                    )}
                    <button
                        onClick={onClose}
                        className="ml-auto w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        aria-label="Close gallery"
                    >
                        <X size={18} className="text-white" />
                    </button>
                </div>

                <HorizontalScrollGallery
                    images={images}
                    onImageClick={onImageClick}
                    theme="dark"
                />
            </motion.div>
        </motion.div>
    );
};

export default GalleryStripModal;
