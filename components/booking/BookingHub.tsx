'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';

// ============================================
// RENTAL CALENDAR URLs - Replace [SLUG_X] with your GHL slugs
// ============================================
export const RENTAL_CALENDARS: Record<number, { url: string; price: number }> = {
    1: { url: 'https://api.leadconnectorhq.com/widget/bookings/studio-rental-1-hour', price: 70 },
    2: { url: 'https://api.leadconnectorhq.com/widget/bookings/studio-rental-2-hour', price: 120 },
    3: { url: 'https://api.leadconnectorhq.com/widget/bookings/studio-rental-3-hour', price: 180 },
    4: { url: 'https://api.leadconnectorhq.com/widget/bookings/studio-rental-4-hour', price: 225 },
    5: { url: 'https://api.leadconnectorhq.com/widget/bookings/studio-rental-5-hour', price: 270 },
    6: { url: 'https://api.leadconnectorhq.com/widget/bookings/studio-rental-6-hour', price: 315 },
    7: { url: 'https://api.leadconnectorhq.com/widget/bookings/studio-rental-7-hour', price: 360 },
    8: { url: 'https://api.leadconnectorhq.com/widget/bookings/studio-rental-8-hour', price: 400 },
    9: { url: 'https://api.leadconnectorhq.com/widget/bookings/studio-rental-9-hour', price: 430 },
    10: { url: 'https://api.leadconnectorhq.com/widget/bookings/studio-rental-10-hour', price: 450 },
};

interface BookingHubProps {
    isOpen: boolean;
    onClose: () => void;
    initialDuration?: number;
}

const BookingHub: React.FC<BookingHubProps> = ({ isOpen, onClose, initialDuration = 2 }) => {
    const [selectedDuration, setSelectedDuration] = useState(initialDuration);
    const [isLoading, setIsLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Set initial duration and loading state when modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedDuration(initialDuration);
            setIsLoading(true);
            document.body.style.overflow = 'hidden';

            // Track booking intent
            sendGAEvent('event', 'begin_checkout', {
                items: [{ item_name: `${initialDuration} Hour Studio Rental` }]
            });
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen, initialDuration]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const handleDurationSelect = (hours: number) => {
        if (hours !== selectedDuration) {
            setIsLoading(true);
            setSelectedDuration(hours);
        }
    };

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    const currentCalendar = RENTAL_CALENDARS[selectedDuration];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex flex-col"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Studio Booking"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-charcoal/90 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="relative z-10 flex flex-col h-full max-h-screen bg-cream"
                    >
                        {/* Header */}
                        <div className="flex-shrink-0 border-b border-charcoal/10">
                            {/* Title Bar */}
                            <div className="flex items-center justify-between px-4 md:px-8 py-4">
                                <div>
                                    <h2 className="font-serif text-2xl md:text-3xl">Book the Studio</h2>
                                    <p className="text-xs text-charcoal/50 uppercase tracking-widest mt-1">
                                        Select your duration below
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-3 hover:bg-charcoal/5 rounded-full transition-colors"
                                    aria-label="Close booking modal"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Duration Selector */}
                            <div className="px-4 md:px-8 pb-4">
                                <p className="text-xs font-medium uppercase tracking-widest text-charcoal/60 mb-3">
                                    Select Duration
                                </p>
                                <div
                                    ref={scrollContainerRef}
                                    className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
                                    style={{
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',
                                    }}
                                >
                                    {Object.entries(RENTAL_CALENDARS).map(([hours, data]) => {
                                        const hourNum = parseInt(hours);
                                        const isActive = selectedDuration === hourNum;
                                        return (
                                            <button
                                                key={hours}
                                                onClick={() => handleDurationSelect(hourNum)}
                                                className={`
                                                    flex-shrink-0 px-4 py-3 rounded-full text-sm font-medium
                                                    transition-all duration-300 whitespace-nowrap
                                                    ${isActive
                                                        ? 'bg-charcoal text-cream shadow-lg scale-105'
                                                        : 'bg-charcoal/5 text-charcoal hover:bg-charcoal/10'
                                                    }
                                                `}
                                            >
                                                <span className="font-serif">{hourNum}</span>
                                                <span className="ml-1">{hourNum === 1 ? 'Hour' : 'Hours'}</span>
                                                <span className="ml-2 opacity-60">${data.price}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Iframe Container */}
                        <div className="flex-1 relative overflow-y-auto">
                            {/* Loading Spinner */}
                            <AnimatePresence>
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center bg-cream z-10"
                                    >
                                        <Loader2 size={40} className="animate-spin text-charcoal/30" />
                                        <p className="mt-4 text-sm text-charcoal/50 uppercase tracking-widest">
                                            Loading Calendar...
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* GHL Iframe */}
                            <iframe
                                key={selectedDuration}
                                src={currentCalendar.url}
                                onLoad={handleIframeLoad}
                                className="w-full"
                                style={{
                                    border: 'none',
                                    minHeight: '600px',
                                    height: 'calc(100% + 100px)',
                                    paddingBottom: '80px',
                                }}
                                allow="payment"
                                title={`Book ${selectedDuration} Hour${selectedDuration > 1 ? 's' : ''} Studio Rental`}
                            />
                        </div>

                        {/* Footer CTA */}
                        <div className="flex-shrink-0 border-t border-charcoal/10 bg-white/50 backdrop-blur-sm">
                            <div className="px-4 md:px-8 py-4">
                                <Link
                                    href="/photoshoot"
                                    onClick={onClose}
                                    className="
                                        flex items-center justify-center gap-3 w-full
                                        bg-charcoal text-cream py-4 px-6 rounded-full
                                        font-sans text-sm uppercase tracking-widest
                                        hover:bg-charcoal/90 transition-colors
                                        group
                                    "
                                >
                                    <Camera size={18} className="group-hover:scale-110 transition-transform" />
                                    <span>Looking for a Photo Shoot? Book a Session Here</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BookingHub;
