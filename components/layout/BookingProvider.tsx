'use client';

import { createContext, useContext, useState } from 'react';
import Layout from '@/components/layout/Layout';

interface BookingContextType {
    onBook: (duration?: number) => void;
}

const BookingContext = createContext<BookingContextType>({ onBook: () => {} });

export const useBooking = () => useContext(BookingContext);

export default function BookingProvider({ children }: { children: React.ReactNode }) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [bookingDuration, setBookingDuration] = useState(2);

    const handleBook = (duration?: number) => {
        setBookingDuration(duration ?? 2);
        setIsBookingOpen(true);
    };

    const handleCloseBooking = () => {
        setIsBookingOpen(false);
    };

    return (
        <BookingContext.Provider value={{ onBook: handleBook }}>
            <Layout
                onBook={handleBook}
                isBookingOpen={isBookingOpen}
                onCloseBooking={handleCloseBooking}
                bookingDuration={bookingDuration}
            >
                {children}
            </Layout>
        </BookingContext.Provider>
    );
}
