'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import AboutPage from '@/components/pages/AboutPage';
import { BookingType } from '@/types';

export default function About() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [bookingType, setBookingType] = useState<BookingType>(null);

    const handleBook = (type: BookingType = 'rental') => {
        setBookingType(type);
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
            bookingType={bookingType}
        >
            <AboutPage onBook={handleBook} />
        </Layout>
    );
}
