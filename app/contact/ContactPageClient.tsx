'use client';

import ContactPage from '@/components/pages/ContactPage';
import { useBooking } from '@/components/layout/BookingProvider';

export default function ContactPageClient() {
    const { onBook } = useBooking();
    return <ContactPage onBook={onBook} />;
}
