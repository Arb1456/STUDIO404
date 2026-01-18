'use client';

import React from 'react';
import Navigation from './Navigation';
import VoiceWidget from './VoiceWidget';
import Footer from './Footer';
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
            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <Footer />

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
