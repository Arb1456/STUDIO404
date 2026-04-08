'use client';

import AboutPage from '@/components/pages/AboutPage';
import { useBooking } from '@/components/layout/BookingProvider';

export default function AboutPageClient() {
    const { onBook } = useBooking();
    return <AboutPage onBook={onBook} />;
}
