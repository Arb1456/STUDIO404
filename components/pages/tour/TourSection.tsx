'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TourSectionProps {
    id: string;
    children: React.ReactNode;
    className?: string;
    singleSlide?: boolean;
}

export const TourSection: React.FC<TourSectionProps> = ({
    id,
    children,
    className = '',
    singleSlide = false
}) => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { amount: 0.5 });

    if (singleSlide) {
        // Single slide sections don't need horizontal scroll
        return (
            <section
                ref={sectionRef}
                id={id}
                className="snap-start h-screen-safe w-full relative overflow-hidden bg-black"
            >
                <motion.div
                    className={`h-full w-full flex flex-col justify-center items-center px-4 md:px-6 ${className}`}
                    initial={{ scale: 0.92, opacity: 0.6, filter: "brightness(0.7)" }}
                    animate={isInView
                        ? { scale: 1, opacity: 1, filter: "brightness(1)" }
                        : { scale: 0.92, opacity: 0.6, filter: "brightness(0.7)" }
                    }
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    {children}
                </motion.div>
            </section>
        );
    }

    // Multi-slide sections with horizontal scroll
    return (
        <section
            ref={sectionRef}
            id={id}
            className="snap-start h-screen-safe w-full relative overflow-hidden bg-black"
        >
            <motion.div
                initial={{ scale: 0.92, opacity: 0.6, filter: "brightness(0.7)" }}
                animate={isInView
                    ? { scale: 1, opacity: 1, filter: "brightness(1)" }
                    : { scale: 0.92, opacity: 0.6, filter: "brightness(0.7)" }
                }
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full w-full"
            >
                {/* Horizontal scroll container - use w-screen for proper viewport sizing */}
                <div
                    data-section-id={id}
                    className={`h-full w-screen flex overflow-x-scroll snap-x snap-mandatory no-scrollbar overscroll-contain ${className}`}
                >
                    {children}
                </div>
            </motion.div>
        </section>
    );
};
