'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import GalleryPage from '@/components/pages/GalleryPage';

export default function Gallery() {
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
            <GalleryPage onBook={handleBook} />
        </Layout>
    );
}
