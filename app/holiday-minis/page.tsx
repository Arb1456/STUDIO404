import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import HolidayMinisPage from '@/components/pages/HolidayMinisPage';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
    title: 'Holiday Mini Sessions | Studio 404 — Ottawa Christmas Photos',
    description: '30-minute holiday mini sessions on our Christmas set in Ottawa. 4 edited photos for $125. Limited dates — book your time slot.',
    openGraph: {
        title: 'Holiday Mini Sessions | Studio 404',
        description: '30 minutes on our Christmas set, 4 edited photos, $125. Limited dates.',
    },
    alternates: { canonical: '/holiday-minis' },
};

const jsonLd = breadcrumbJsonLd('Holiday Minis', '/holiday-minis');

export default function HolidayMinis() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <BookingProvider>
                <HolidayMinisPage />
            </BookingProvider>
        </>
    );
}
