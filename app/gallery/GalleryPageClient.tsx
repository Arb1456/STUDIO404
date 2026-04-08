'use client';

import GalleryPage from '@/components/pages/GalleryPage';
import { useBooking } from '@/components/layout/BookingProvider';

export default function GalleryPageClient() {
    const { onBook } = useBooking();
    return <GalleryPage onBook={onBook} />;
}
