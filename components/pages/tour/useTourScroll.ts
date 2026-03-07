'use client';
import { useState, useEffect, useCallback, useRef, RefObject } from 'react';

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

    // Refs to access latest state inside event handlers without re-binding
    const currentSectionRef = useRef(currentSection);
    const currentSlideRef = useRef(currentSlide);
    const horizontalRefsRef = useRef(horizontalRefs);
    useEffect(() => { currentSectionRef.current = currentSection; }, [currentSection]);
    useEffect(() => { currentSlideRef.current = currentSlide; }, [currentSlide]);
    useEffect(() => { horizontalRefsRef.current = horizontalRefs; }, [horizontalRefs]);

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

    // Wheel handler — drives section and slide navigation on desktop
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let isScrolling = false;
        let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (isScrolling) return;

            const absDeltaX = Math.abs(e.deltaX);
            const absDeltaY = Math.abs(e.deltaY);

            isScrolling = true;
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => { isScrolling = false; }, 900);

            if (absDeltaX > absDeltaY) {
                // Horizontal → navigate slides
                const section = currentSectionRef.current;
                const sectionId = sectionConfig[section]?.id;
                const hContainer = horizontalRefsRef.current.get(sectionId);
                if (hContainer) {
                    const maxSlides = sectionConfig[section]?.slides || 1;
                    const direction = e.deltaX > 0 ? 1 : -1;
                    const nextSlide = Math.max(0, Math.min(maxSlides - 1, currentSlideRef.current + direction));
                    hContainer.scrollTo({ left: nextSlide * hContainer.clientWidth, behavior: 'smooth' });
                }
            } else {
                // Vertical → navigate sections
                const direction = e.deltaY > 0 ? 1 : -1;
                const nextSection = Math.max(0, Math.min(sectionConfig.length - 1, currentSectionRef.current + direction));
                if (nextSection !== currentSectionRef.current) {
                    const targetId = sectionConfig[nextSection]?.id;
                    const target = document.getElementById(targetId);
                    if (target) container.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
                }
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            container.removeEventListener('wheel', handleWheel);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, [containerRef, sectionConfig]);

    // Programmatic scroll to section (vertical)
    const scrollToSection = useCallback((index: number) => {
        const targetId = sectionConfig[index]?.id;
        const target = document.getElementById(targetId);
        const container = containerRef.current;

        if (target && container) {
            container.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
        }
    }, [containerRef, sectionConfig]);

    // Programmatic scroll to slide (horizontal)
    const scrollToSlide = useCallback((index: number) => {
        const sectionId = sectionConfig[currentSection]?.id;
        const horizontalContainer = horizontalRefs.get(sectionId);

        if (horizontalContainer) {
            horizontalContainer.scrollTo({
                left: index * horizontalContainer.clientWidth,
                behavior: 'smooth'
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
