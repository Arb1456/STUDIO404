import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import RentalPageClient from './RentalPageClient';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
    title: 'Rent the Space | Studio 404 — Ottawa Studio Rental',
    description: 'Rent Studio 404 for your next creative project. Flexible hourly, half-day, and full-day rates with full equipment and amenities included.',
    openGraph: {
        title: 'Rent the Space | Studio 404',
        description: 'Flexible hourly, half-day, and full-day rates with full equipment and amenities included.',
    },
    alternates: { canonical: '/rental' },
};

const jsonLd = breadcrumbJsonLd('Rent the Space', '/rental');

export default function Rental() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <BookingProvider>
                <RentalPageClient />
            </BookingProvider>
        </>
    );
}
