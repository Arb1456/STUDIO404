'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { MENU_ITEMS } from '@/lib/constants';

interface NavigationProps {
    onBook: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onBook }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const pathname = usePathname();

    // Scroll tracking refs (supports both window and scroll-snap containers)
    const lastScrollY = useRef(0);
    const scrollDownDistance = useRef(0);
    const SCROLL_THRESHOLD = 150; // pixels of downward scroll before hiding
    const scrollContainerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        // Reset scroll tracking on page change
        lastScrollY.current = 0;
        scrollDownDistance.current = 0;
        setIsNavVisible(true);

        // Find scroll snap container (used on homepage, tour page, etc.)
        // Look for elements with snap-y and overflow-y-scroll classes
        const findScrollContainer = (): HTMLElement | null => {
            // Check for TourContainer's scroll element
            const tourContainer = document.querySelector('.snap-y.snap-mandatory.overflow-y-scroll');
            if (tourContainer) return tourContainer as HTMLElement;

            // Check for HomePage's main scroll container
            const mainScroller = document.querySelector('main.snap-y.snap-mandatory');
            if (mainScroller) return mainScroller as HTMLElement;

            return null;
        };

        // Small delay to let the page render
        const initTimer = setTimeout(() => {
            scrollContainerRef.current = findScrollContainer();
        }, 100);

        const createScrollHandler = (getScrollTop: () => number) => {
            return () => {
                const currentScrollY = getScrollTop();
                const scrollDelta = currentScrollY - lastScrollY.current;

                if (scrollDelta > 0) {
                    // Scrolling down
                    scrollDownDistance.current += scrollDelta;
                    if (scrollDownDistance.current > SCROLL_THRESHOLD) {
                        setIsNavVisible(false);
                    }
                } else if (scrollDelta < 0) {
                    // Scrolling up - immediately show nav
                    scrollDownDistance.current = 0;
                    setIsNavVisible(true);
                }

                lastScrollY.current = currentScrollY;
            };
        };

        // Handler for window scroll (regular pages)
        const windowScrollHandler = createScrollHandler(() => window.scrollY);

        // Handler for container scroll (scroll-snap pages)
        const containerScrollHandler = createScrollHandler(() =>
            scrollContainerRef.current?.scrollTop ?? 0
        );

        // Attach window scroll listener
        window.addEventListener('scroll', windowScrollHandler, { passive: true });

        // Attach container scroll listener after finding it
        const containerTimer = setTimeout(() => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.addEventListener('scroll', containerScrollHandler, { passive: true });
            }
        }, 150);

        return () => {
            clearTimeout(initTimer);
            clearTimeout(containerTimer);
            window.removeEventListener('scroll', windowScrollHandler);
            if (scrollContainerRef.current) {
                scrollContainerRef.current.removeEventListener('scroll', containerScrollHandler);
            }
        };
    }, [pathname]); // Re-run when route changes

    // When menu is open, always show the nav bar
    useEffect(() => {
        if (isMenuOpen) {
            setIsNavVisible(true);
        }
    }, [isMenuOpen]);

    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    const isActiveRoute = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname === href;
    };

    return (
        <>
            {/* Thumb-Zone Navigation Bar */}
            <div
                className={`fixed bottom-6 left-0 right-0 z-50 px-4 md:px-0 flex justify-center transition-opacity duration-300 ${isNavVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="bg-charcoal text-cream rounded-full px-1 py-1 flex items-center shadow-2xl pointer-events-auto min-w-[320px] max-w-sm w-full justify-between backdrop-blur-sm border border-white/10">

                    {/* Menu Trigger */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="flex items-center gap-2 px-6 py-4 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Menu size={18} />
                        <span className="font-sans text-xs tracking-widest uppercase">Menu</span>
                    </button>

                    {/* Center Book CTA */}
                    <button
                        onClick={onBook}
                        className="font-serif italic text-lg px-2 hover:text-white/80 transition-colors"
                    >
                        Book Now
                    </button>

                    {/* Contact Action */}
                    <Link
                        href="/contact"
                        onClick={handleNavClick}
                        className="px-6 py-4 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Phone size={18} />
                    </Link>
                </div>
            </div>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[60] bg-cream text-charcoal flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-8 border-b border-charcoal/10">
                            <span className="font-serif text-xl font-bold">Studio 404</span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 hover:bg-black/5 rounded-full transition-colors border border-charcoal/10"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Links List */}
                        <div className="flex-1 overflow-y-auto py-8 px-8 flex flex-col gap-6">
                            {MENU_ITEMS.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={handleNavClick}
                                        className={`font-serif text-3xl md:text-4xl text-charcoal hover:italic hover:pl-4 transition-all duration-300 block ${isActiveRoute(item.href) ? 'italic pl-4' : ''
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer Info */}
                        <div className="p-8 border-t border-charcoal/10">
                            <p className="font-sans text-xs text-charcoal/50 uppercase tracking-widest">
                                Ottawa, ON • Est. 2024
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
