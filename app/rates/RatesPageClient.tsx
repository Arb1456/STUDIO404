'use client';

import RatesPage from '@/components/pages/RatesPage';
import { useBooking } from '@/components/layout/BookingProvider';

export default function RatesPageClient() {
    const { onBook } = useBooking();
    return <RatesPage onBook={onBook} />;
}
