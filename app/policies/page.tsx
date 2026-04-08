import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import PoliciesPageClient from './PoliciesPageClient';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
    title: 'Policies | Studio 404 — Booking & Studio Guidelines',
    description: 'Studio 404 booking policies, cancellation terms, house rules, and studio guidelines for your session.',
    openGraph: {
        title: 'Policies | Studio 404',
        description: 'Booking policies, cancellation terms, house rules, and studio guidelines.',
    },
    alternates: { canonical: '/policies' },
};

const jsonLd = breadcrumbJsonLd('Policies', '/policies');

export default function Policies() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <BookingProvider>
                <PoliciesPageClient />
            </BookingProvider>
        </>
    );
}
