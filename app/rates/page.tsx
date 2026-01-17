'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import RatesPage from '@/components/pages/RatesPage';

export default function Rates() {
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
            <RatesPage onBook={handleBook} />
        </Layout>
    );
}
