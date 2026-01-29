'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, ExternalLink, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';

// ============================================
// RENTAL CALENDAR URLs
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
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Set initial duration when modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedDuration(initialDuration);
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
        setSelectedDuration(hours);
    };

    const handleContinueToBooking = () => {
        const calendar = RENTAL_CALENDARS[selectedDuration];
        // Track the booking click
        sendGAEvent('event', 'select_item', {
            items: [{ item_name: `${selectedDuration} Hour Studio Rental`, price: calendar.price }]
        });
        // Open in new tab
        window.open(calendar.url, '_blank', 'noopener,noreferrer');
    };

    const currentCalendar = RENTAL_CALENDARS[selectedDuration];
    const deposit = Math.round(currentCalendar.price * 0.3);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
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
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="relative z-10 bg-cream rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="border-b border-charcoal/10 px-6 py-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-serif text-2xl md:text-3xl">Book the Studio</h2>
                                    <p className="text-sm text-charcoal/60 mt-1">
                                        Select your duration and continue to booking
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-charcoal/5 rounded-full transition-colors"
                                    aria-label="Close booking modal"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Duration Selector */}
                        <div className="px-6 py-5 border-b border-charcoal/10">
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

                        {/* Selected Summary */}
                        <div className="px-6 py-6 bg-charcoal/[0.02]">
                            <div className="bg-white rounded-xl p-5 border border-charcoal/10">
                                <h3 className="font-serif text-xl mb-4">
                                    {selectedDuration} Hour{selectedDuration > 1 ? 's' : ''} Studio Rental
                                </h3>

                                <div className="space-y-3 mb-5">
                                    <div className="flex items-center gap-3 text-charcoal/70">
                                        <Clock size={18} />
                                        <span>{selectedDuration} hour{selectedDuration > 1 ? 's' : ''} of studio access</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-charcoal/70">
                                        <DollarSign size={18} />
                                        <span>Total: <strong className="text-charcoal">${currentCalendar.price} CAD</strong></span>
                                    </div>
                                </div>

                                <div className="bg-cream/50 rounded-lg p-3 mb-5">
                                    <p className="text-sm text-charcoal/70">
                                        <strong className="text-charcoal">30% deposit required:</strong> ${deposit} CAD
                                    </p>
                                    <p className="text-xs text-charcoal/50 mt-1">
                                        Remaining balance due before your session
                                    </p>
                                </div>

                                <button
                                    onClick={handleContinueToBooking}
                                    className="
                                        w-full flex items-center justify-center gap-3
                                        bg-charcoal text-cream py-4 px-6 rounded-full
                                        font-sans text-sm uppercase tracking-widest
                                        hover:bg-charcoal/90 transition-colors
                                        group
                                    "
                                >
                                    <span>Continue to Booking</span>
                                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-xs text-center text-charcoal/40 mt-3">
                                    Opens booking calendar in a new tab
                                </p>
                            </div>
                        </div>

                        {/* Footer CTA */}
                        <div className="border-t border-charcoal/10 px-6 py-4">
                            <Link
                                href="/photoshoot"
                                onClick={onClose}
                                className="
                                    flex items-center justify-center gap-2 w-full
                                    text-charcoal/70 py-2
                                    font-sans text-sm
                                    hover:text-charcoal transition-colors
                                    group
                                "
                            >
                                <Camera size={16} className="group-hover:scale-110 transition-transform" />
                                <span>Looking for a Photo Shoot? Book a Session Here</span>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BookingHub;
