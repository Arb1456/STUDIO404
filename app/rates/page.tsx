import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import RatesPageClient from './RatesPageClient';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
    title: 'Rates & Pricing | Studio 404 — Ottawa Studio Rental',
    description: 'Transparent pricing for Studio 404. Hourly, half-day, and full-day rates with all equipment and amenities included.',
    openGraph: {
        title: 'Rates & Pricing | Studio 404',
        description: 'Transparent pricing with all equipment and amenities included.',
    },
    alternates: { canonical: '/rates' },
};

const jsonLd = breadcrumbJsonLd('Rates & Pricing', '/rates');

export default function Rates() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <BookingProvider>
                <RatesPageClient />
            </BookingProvider>
        </>
    );
}
