'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PhotoshootPage from '@/components/pages/PhotoshootPage';

export default function Photoshoot() {
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
            <PhotoshootPage onBook={handleBook} />
        </Layout>
    );
}
