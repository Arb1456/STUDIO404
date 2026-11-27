'use client';

import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import Navigation from './Navigation';
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
            {/* Top-Left Home button: home icon + the 404 logo (line above and below, like app/icon.png) */}
            <Link
                href="/"
                aria-label="Studio 404 home"
                className="fixed top-5 left-5 z-50 flex items-center gap-2.5 text-white select-none pl-2.5 pr-3 py-1.5 rounded-tl-xl rounded-br-xl bg-gradient-to-br from-black/80 via-black/60 to-black/30 backdrop-blur-sm hover:from-black/90 hover:via-black/75 hover:to-black/50 transition-colors duration-200"
            >
                <Home size={20} strokeWidth={2} aria-hidden="true" />
                <span
                    aria-hidden="true"
                    className="font-sans font-semibold text-[17px] leading-none tracking-[0.12em] border-y-2 border-white py-[3px] pl-[0.12em]"
                >
                    404
                </span>
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

            {/* ElevenLabs chat widget is OFF (subscription cancelled, Nov 27 2026). Possibly replaced
                later by the GHL chat agent. To restore: render <VoiceWidget /> here and re-add the
                convai-widget-embed <Script> in app/layout.tsx. */}
        </div>
    );
};

export default Layout;
