import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import TrackViewContent from '@/components/layout/TrackViewContent';
import HolidayMinisPage from '@/components/pages/HolidayMinisPage';
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/structured-data';
import { HOLIDAY_OFFERS, MINI_FAQ } from '@/lib/holiday';

export const metadata: Metadata = {
    title: 'Christmas Mini Sessions in Ottawa | Holiday Minis $125 — Studio 404',
    description: 'Christmas photos in Ottawa: 30-minute holiday mini sessions on our Christmas set, 4 edited photos for $125. Limited dates in Nov and Dec — book your time slot.',
    openGraph: {
        title: 'Holiday Mini Sessions | Studio 404',
        description: '30 minutes on our Christmas set, 4 edited photos, $125. Limited dates.',
    },
    alternates: { canonical: '/holiday-minis' },
};

const jsonLd = [
    breadcrumbJsonLd('Holiday Minis', '/holiday-minis'),
    serviceJsonLd({
        name: 'Holiday Mini Session',
        description: '30 minutes on our Christmas set in Ottawa, 1 outfit, 4 edited photos, up to 5 people. Offered on set mini days in November and December.',
        path: '/holiday-minis',
        price: HOLIDAY_OFFERS.mini.price,
        priceType: 'fixed',
    }),
    faqJsonLd(MINI_FAQ),
];

export default function HolidayMinis() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <TrackViewContent name="Holiday Mini Session" category="Holiday" />
            <BookingProvider>
                <HolidayMinisPage />
            </BookingProvider>
        </>
    );
}
