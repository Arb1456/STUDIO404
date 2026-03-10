'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from './Navigation';
import VoiceWidget from './VoiceWidget';
import BookingHub from '@/components/booking/BookingHub';

interface LayoutProps {
    children: React.ReactNode;
    onBook: (duration?: number) => void;
    isBookingOpen: boolean;
    onCloseBooking: () => void;
    bookingDuration?: number;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    onBook,
    isBookingOpen,
    onCloseBooking,
    bookingDuration,
}) => {
    return (
        <div className="min-h-screen bg-cream text-charcoal font-sans selection:bg-charcoal selection:text-cream">
            {/* Top-Left Logo */}
            <Link
                href="/"
                className="fixed top-5 left-5 z-50 font-serif italic text-lg text-charcoal hover:opacity-60 transition-opacity duration-200 select-none"
            >
                Studio 404
            </Link>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Persistent Navigation */}
            <Navigation onBook={() => onBook()} />

            {/* Booking Hub Modal */}
            <BookingHub
                isOpen={isBookingOpen}
                onClose={onCloseBooking}
                initialDuration={bookingDuration}
            />

            {/* Global ElevenLabs Voice Widget */}
            <VoiceWidget />
        </div>
    );
};

export default Layout;
