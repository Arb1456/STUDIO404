'use client';

import { useEffect } from 'react';

/**
 * Fixes viewport height on mobile Safari by setting a CSS variable
 * to the actual inner height of the window.
 * Uses visualViewport API for more accurate measurements on iOS.
 */
export default function ViewportHeightFix() {
    useEffect(() => {
        const setVh = () => {
            // Use visualViewport if available (more accurate on iOS)
            // Subtract extra space for the nav bar (80px)
            const height = window.visualViewport?.height ?? window.innerHeight;
            const vh = (height - 80) * 0.01; // Subtract nav bar height
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        // Set immediately
        setVh();

        // Use visualViewport resize event if available
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', setVh);
            window.visualViewport.addEventListener('scroll', setVh);
        }

        // Fallback to window events
        window.addEventListener('resize', setVh);
        window.addEventListener('orientationchange', setVh);

        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', setVh);
                window.visualViewport.removeEventListener('scroll', setVh);
            }
            window.removeEventListener('resize', setVh);
            window.removeEventListener('orientationchange', setVh);
        };
    }, []);

    return null;
}
