'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import RentalPage from '@/components/pages/RentalPage';

export default function Rental() {
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
            <RentalPage onBook={handleBook} />
        </Layout>
    );
}
