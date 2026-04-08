'use client';

import RentalPage from '@/components/pages/RentalPage';
import { useBooking } from '@/components/layout/BookingProvider';

export default function RentalPageClient() {
    const { onBook } = useBooking();
    return <RentalPage onBook={onBook} />;
}
