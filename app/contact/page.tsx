'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ContactPage from '@/components/pages/ContactPage';
import { BookingType } from '@/types';

export default function Contact() {
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
            <ContactPage onBook={handleBook} />
        </Layout>
    );
}
