'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import HomePage from '@/components/pages/HomePage';

export default function Home() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const handleBook = () => {
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
        >
            <HomePage onBook={handleBook} />
        </Layout>
    );
}
