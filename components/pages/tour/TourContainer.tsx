'use client';
import React, { useRef, createContext, useContext } from 'react';
import { useTourScroll, SectionConfig } from './useTourScroll';

interface TourContextType {
    containerRef: React.RefObject<HTMLDivElement | null>;
    currentSection: number;
    currentSlide: number;
    totalSections: number;
    scrollToSection: (index: number) => void;
    scrollToSlide: (index: number) => void;
    scrollToNextSection: () => void;
    scrollToPrevSection: () => void;
    scrollToNextSlide: () => void;
    scrollToPrevSlide: () => void;
    getSectionSlideCount: (sectionIndex: number) => number;
    isLastSlide: boolean;
    isFirstSlide: boolean;
    isLastSection: boolean;
    isFirstSection: boolean;
    hasMultipleSlides: boolean;
}

const TourContext = createContext<TourContextType | null>(null);

export const useTour = () => {
    const ctx = useContext(TourContext);
    if (!ctx) throw new Error('useTour must be used within TourContainer');
    return ctx;
};

interface TourContainerProps {
    children: React.ReactNode;
    sectionConfig: SectionConfig[];
}

export const TourContainer: React.FC<TourContainerProps> = ({
    children,
    sectionConfig
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollState = useTourScroll(containerRef, sectionConfig);

    return (
        <TourContext.Provider value={{ containerRef, ...scrollState }}>
            <div
                ref={containerRef}
                className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar overscroll-contain"
            >
                {children}
            </div>
        </TourContext.Provider>
    );
};
