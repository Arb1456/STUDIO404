'use client';

import TourPage from '@/components/pages/TourPage';
import { useBooking } from '@/components/layout/BookingProvider';

export default function TourPageClient() {
    const { onBook } = useBooking();
    return <TourPage onBook={onBook} />;
}
