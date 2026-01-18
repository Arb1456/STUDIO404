'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ContactPage from '@/components/pages/ContactPage';

export default function Contact() {
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
            <ContactPage onBook={handleBook} />
        </Layout>
    );
}
