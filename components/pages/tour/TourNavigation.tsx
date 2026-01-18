'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTour } from './TourContainer';
import { Button } from '@/components/ui/Button';

export const TourNavigation: React.FC = () => {
    const {
        currentSection,
        currentSlide,
        isLastSlide,
        isFirstSlide,
        isLastSection,
        hasMultipleSlides,
        scrollToNextSection,
        scrollToNextSlide,
        scrollToPrevSlide,
        getSectionSlideCount
    } = useTour();

    const slideCount = getSectionSlideCount(currentSection);

    return (
        <div className="fixed bottom-[120px] md:bottom-12 left-0 right-0 z-40 px-4 md:px-6 pointer-events-none">
            <div className="max-w-7xl mx-auto flex justify-between items-end">

                {/* Left Side: Slide Progress (only when multiple slides) */}
                <AnimatePresence mode="wait">
                    {hasMultipleSlides && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="pointer-events-auto bg-charcoal/80 backdrop-blur-md rounded-full px-4 py-3 shadow-lg"
                        >
                            {/* Dot indicators */}
                            <div className="flex gap-2 mb-2">
                                {Array.from({ length: slideCount }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="h-2 rounded-full bg-cream transition-all duration-300"
                                        animate={{
                                            width: i === currentSlide ? 24 : 8,
                                            opacity: i === currentSlide ? 1 : 0.4
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Back button (when not on first slide) */}
                            <AnimatePresence mode="wait">
                                {!isFirstSlide && (
                                    <motion.button
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        onClick={scrollToPrevSlide}
                                        className="flex items-center gap-2 text-cream/90 hover:text-cream text-xs uppercase tracking-widest transition-colors"
                                    >
                                        <ChevronLeft size={14} />
                                        <span>Back</span>
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Spacer when no left content */}
                {!hasMultipleSlides && <div />}

                {/* Right Side: Navigation Buttons */}
                <div className="flex flex-col items-end gap-2 md:gap-3 pointer-events-auto">

                    {/* Learn More Button (when more slides available) */}
                    <AnimatePresence mode="wait">
                        {hasMultipleSlides && !isLastSlide && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                                key="learn-more"
                            >
                                <Button
                                    onClick={scrollToNextSlide}
                                    variant="outline"
                                    className="border-cream bg-charcoal/80 backdrop-blur-md text-cream hover:bg-cream hover:text-charcoal flex items-center gap-2 text-sm shadow-lg"
                                >
                                    Learn More
                                    <ChevronRight size={16} />
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Next Section Button */}
                    <AnimatePresence mode="wait">
                        {!isLastSection && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3, delay: 0.05 }}
                                key="next-section"
                            >
                                <Button
                                    onClick={scrollToNextSection}
                                    className={`flex items-center gap-2 text-sm shadow-lg ${hasMultipleSlides && !isLastSlide
                                        ? 'bg-charcoal/60 backdrop-blur-md border border-cream/40 text-cream/90 hover:bg-charcoal/80 hover:border-cream hover:text-cream'
                                        : 'bg-charcoal text-cream hover:bg-charcoal/90 shadow-xl'
                                        }`}
                                >
                                    Next Section
                                    <ChevronDown size={16} />
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
