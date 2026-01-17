'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import TourPage from '@/components/pages/TourPage';

export default function Tour() {
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
            <TourPage onBook={handleBook} />
        </Layout>
    );
}
