'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ContactPage from '@/components/pages/ContactPage';

export default function Contact() {
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
            <ContactPage onBook={handleBook} />
        </Layout>
    );
}
