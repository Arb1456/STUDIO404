'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import HomePage from '@/components/pages/HomePage';

export default function Home() {
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
        <Layout
            onBook={handleBook}
            isBookingOpen={isBookingOpen}
            onCloseBooking={handleCloseBooking}
            bookingDuration={bookingDuration}
        >
            <HomePage />
        </Layout>
    );
}
