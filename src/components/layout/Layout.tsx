import React from 'react';
import Navigation from './Navigation';
import BookingSheet from '@/components/booking/BookingSheet';
import { BookingType } from '@/types';

interface LayoutProps {
    children: React.ReactNode;
    onBook: (type?: BookingType) => void;
    isBookingOpen: boolean;
    onCloseBooking: () => void;
    bookingType: BookingType;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    onBook,
    isBookingOpen,
    onCloseBooking,
    bookingType
}) => {
    return (
        <div className="min-h-screen bg-cream text-charcoal font-sans selection:bg-charcoal selection:text-cream">
            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Persistent Navigation */}
            <Navigation onBook={() => onBook('rental')} />

            {/* Booking Sheet Modal */}
            <BookingSheet
                isOpen={isBookingOpen}
                onClose={onCloseBooking}
                type={bookingType}
            />
        </div>
    );
};

export default Layout;
