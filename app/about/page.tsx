'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import AboutPage from '@/components/pages/AboutPage';

export default function About() {
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
            <AboutPage onBook={handleBook} />
        </Layout>
    );
}
