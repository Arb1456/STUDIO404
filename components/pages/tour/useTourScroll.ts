'use client';
import { useState, useEffect, useCallback, RefObject } from 'react';
import { animate } from 'framer-motion';

export interface SectionConfig {
    id: string;
    slides: number;
}

export const useTourScroll = (
    containerRef: RefObject<HTMLDivElement | null>,
    sectionConfig: SectionConfig[]
) => {
    const [currentSection, setCurrentSection] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [horizontalRefs, setHorizontalRefs] = useState<Map<string, HTMLElement>>(new Map());

    // Collect horizontal scroll container refs on mount
    useEffect(() => {
        if (!containerRef.current) return;

        const collectRefs = () => {
            const sections = containerRef.current?.querySelectorAll('[data-section-id]');
            const newRefs = new Map<string, HTMLElement>();

            sections?.forEach((section) => {
                const id = section.getAttribute('data-section-id');
                if (id) {
                    newRefs.set(id, section as HTMLElement);
                }
            });

            setHorizontalRefs(newRefs);
        };

        // Small delay to ensure DOM is ready
        const timer = setTimeout(collectRefs, 100);
        return () => clearTimeout(timer);
    }, [containerRef]);

    // Detect current section via Intersection Observer
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        const index = sectionConfig.findIndex(
                            s => s.id === entry.target.id
                        );
                        if (index !== -1 && index !== currentSection) {
                            setCurrentSection(index);
                            setCurrentSlide(0); // Reset slide on section change
                        }
                    }
                });
            },
            { threshold: 0.5, root: containerRef.current }
        );

        sectionConfig.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [containerRef, sectionConfig, currentSection]);

    // Detect current horizontal slide via scroll event
    useEffect(() => {
        const sectionId = sectionConfig[currentSection]?.id;
        const horizontalContainer = horizontalRefs.get(sectionId);

        if (!horizontalContainer) return;

        const handleScroll = () => {
            const scrollLeft = horizontalContainer.scrollLeft;
            const slideWidth = horizontalContainer.clientWidth;
            const newSlide = Math.round(scrollLeft / slideWidth);
            if (newSlide !== currentSlide) {
                setCurrentSlide(newSlide);
            }
        };

        horizontalContainer.addEventListener('scroll', handleScroll, { passive: true });
        return () => horizontalContainer.removeEventListener('scroll', handleScroll);
    }, [currentSection, currentSlide, horizontalRefs, sectionConfig]);

    // Programmatic scroll to section (vertical) with smooth animation
    const scrollToSection = useCallback((index: number) => {
        const targetId = sectionConfig[index]?.id;
        const target = document.getElementById(targetId);
        const container = containerRef.current;

        if (target && container) {
            // Temporarily disable snap to allow smooth animation
            container.style.scrollSnapType = 'none';

            const targetY = target.offsetTop;

            animate(container.scrollTop, targetY, {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                onUpdate: (v) => {
                    if (container) {
                        container.scrollTop = v;
                    }
                },
                onComplete: () => {
                    // Re-enable snap after animation
                    if (container) {
                        container.style.scrollSnapType = 'y mandatory';
                    }
                }
            });
        }
    }, [containerRef, sectionConfig]);

    // Programmatic scroll to slide (horizontal) with smooth animation
    const scrollToSlide = useCallback((index: number) => {
        const sectionId = sectionConfig[currentSection]?.id;
        const horizontalContainer = horizontalRefs.get(sectionId);

        if (horizontalContainer) {
            // Temporarily disable snap to allow smooth animation
            horizontalContainer.style.scrollSnapType = 'none';

            const targetX = index * horizontalContainer.clientWidth;

            animate(horizontalContainer.scrollLeft, targetX, {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                onUpdate: (v) => {
                    horizontalContainer.scrollLeft = v;
                },
                onComplete: () => {
                    // Re-enable snap after animation
                    horizontalContainer.style.scrollSnapType = 'x mandatory';
                }
            });
        }
    }, [currentSection, horizontalRefs, sectionConfig]);

    const scrollToNextSection = useCallback(() => {
        if (currentSection < sectionConfig.length - 1) {
            scrollToSection(currentSection + 1);
        }
    }, [currentSection, sectionConfig.length, scrollToSection]);

    const scrollToPrevSection = useCallback(() => {
        if (currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    }, [currentSection, scrollToSection]);

    const scrollToNextSlide = useCallback(() => {
        const maxSlides = sectionConfig[currentSection]?.slides || 1;
        if (currentSlide < maxSlides - 1) {
            scrollToSlide(currentSlide + 1);
        }
    }, [currentSection, currentSlide, sectionConfig, scrollToSlide]);

    const scrollToPrevSlide = useCallback(() => {
        if (currentSlide > 0) {
            scrollToSlide(currentSlide - 1);
        }
    }, [currentSlide, scrollToSlide]);

    const getSectionSlideCount = useCallback((sectionIndex: number) => {
        return sectionConfig[sectionIndex]?.slides || 1;
    }, [sectionConfig]);

    const isLastSlide = currentSlide >= (sectionConfig[currentSection]?.slides || 1) - 1;
    const isFirstSlide = currentSlide === 0;
    const isLastSection = currentSection === sectionConfig.length - 1;
    const isFirstSection = currentSection === 0;
    const hasMultipleSlides = (sectionConfig[currentSection]?.slides || 1) > 1;

    return {
        currentSection,
        currentSlide,
        totalSections: sectionConfig.length,
        scrollToSection,
        scrollToSlide,
        scrollToNextSection,
        scrollToPrevSection,
        scrollToNextSlide,
        scrollToPrevSlide,
        getSectionSlideCount,
        isLastSlide,
        isFirstSlide,
        isLastSection,
        isFirstSection,
        hasMultipleSlides
    };
};
