'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ParallaxBackgroundProps {
    /** Parallax speed multiplier (0 = static, 1 = moves with scroll) */
    speed?: number;
    /** Optional scroll container ref - if not provided, uses window */
    scrollContainerRef?: React.RefObject<HTMLElement>;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
    speed = 0.3,
}) => {
    const parallaxRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        // Find the main scroll container (snap-y element)
        const scrollContainer = document.querySelector('.snap-y.snap-mandatory');

        const handleScroll = () => {
            if (scrollContainer) {
                setScrollY(scrollContainer.scrollTop);
            } else {
                setScrollY(window.scrollY);
            }
        };

        // Listen to both the scroll container and window
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        }
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Calculate parallax offset
    const parallaxOffset = scrollY * speed;

    return (
        <>
            {/* Stone Texture Layer with Parallax */}
            <div
                ref={parallaxRef}
                className="stone-texture-parallax"
                style={{
                    transform: `translateY(${parallaxOffset}px) scale(1.1)`,
                }}
                aria-hidden="true"
            />

            {/* Subtle depth overlay */}
            <div className="stone-texture-overlay" aria-hidden="true" />
        </>
    );
};

export default ParallaxBackground;
