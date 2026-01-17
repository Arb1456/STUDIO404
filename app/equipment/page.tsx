'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import EquipmentPage from '@/components/pages/EquipmentPage';

export default function Equipment() {
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
            <EquipmentPage onBook={handleBook} />
        </Layout>
    );
}
