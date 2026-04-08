import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import TourPageClient from './TourPageClient';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
    title: 'Studio Tour | Studio 404 — Premium Creative Space in Ottawa',
    description: 'Take a virtual tour of Studio 404. Explore our cyclorama wall, professional lighting grid, props, furniture, and studio amenities.',
    openGraph: {
        title: 'Studio Tour | Studio 404',
        description: 'Explore our cyclorama wall, professional lighting, props, furniture, and full studio amenities.',
    },
    alternates: { canonical: '/tour' },
};

const jsonLd = breadcrumbJsonLd('Studio Tour', '/tour');

export default function Tour() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <BookingProvider>
                <TourPageClient />
            </BookingProvider>
        </>
    );
}
