'use client';

import React from 'react';
import Navigation from './Navigation';
import VoiceWidget from './VoiceWidget';
import BookingHub from '@/components/booking/BookingHub';

interface LayoutProps {
    children: React.ReactNode;
    onBook: () => void;
    isBookingOpen: boolean;
    onCloseBooking: () => void;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    onBook,
    isBookingOpen,
    onCloseBooking,
}) => {
    return (
        <div className="min-h-screen bg-cream text-charcoal font-sans selection:bg-charcoal selection:text-cream">
            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Persistent Navigation */}
            <Navigation onBook={onBook} />

            {/* Booking Hub Modal */}
            <BookingHub
                isOpen={isBookingOpen}
                onClose={onCloseBooking}
            />

            {/* Global ElevenLabs Voice Widget */}
            <VoiceWidget />
        </div>
    );
};

export default Layout;
