'use client';

import PoliciesPage from '@/components/pages/PoliciesPage';
import { useBooking } from '@/components/layout/BookingProvider';

export default function PoliciesPageClient() {
    const { onBook } = useBooking();
    return <PoliciesPage onBook={onBook} />;
}
