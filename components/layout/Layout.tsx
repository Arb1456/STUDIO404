'use client';

import React from 'react';
import Navigation from './Navigation';
import VoiceWidget from './VoiceWidget';
import ParallaxBackground from './ParallaxBackground';
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
        <div className="min-h-screen text-charcoal font-sans selection:bg-charcoal selection:text-cream">
            {/* Anti-Gravity Stone Texture Background */}
            <ParallaxBackground speed={0.3} />

            {/* Main Content - floats above texture */}
            <main className="floating-content">
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
