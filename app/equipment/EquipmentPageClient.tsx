'use client';

import EquipmentPage from '@/components/pages/EquipmentPage';
import { useBooking } from '@/components/layout/BookingProvider';

export default function EquipmentPageClient() {
    const { onBook } = useBooking();
    return <EquipmentPage onBook={onBook} />;
}
