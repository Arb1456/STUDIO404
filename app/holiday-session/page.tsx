import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import TrackViewContent from '@/components/layout/TrackViewContent';
import HolidaySessionPage from '@/components/pages/HolidaySessionPage';
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/structured-data';
import { FULL_SESSION_FAQ, HOLIDAY_OFFERS, HOLIDAY_OG_IMAGES } from '@/lib/holiday';

export const metadata: Metadata = {
    title: 'Christmas Photoshoot in Ottawa | Full Holiday Session — Studio 404',
    description: '1.5-hour Christmas photoshoot on our holiday set in Ottawa. Outfit changes, 12 edited photos, any available day — from $250.',
    openGraph: {
        title: 'Christmas Photoshoot in Ottawa | Full Holiday Session | Studio 404',
        description: `1.5 hours on our Christmas set, outfit changes, ${HOLIDAY_OFFERS.full.photoCount} edited photos. From $${HOLIDAY_OFFERS.full.price}.`,
        url: '/holiday-session',
        siteName: 'Studio 404',
        type: 'website',
        locale: 'en_CA',
        images: [HOLIDAY_OG_IMAGES.set],
    },
    alternates: { canonical: '/holiday-session' },
};

const jsonLd = [
    breadcrumbJsonLd('Full Holiday Session', '/holiday-session'),
    serviceJsonLd({
        name: 'Full Holiday Session',
        description: '1.5-hour Christmas photoshoot on our holiday set in Ottawa, 2 outfits, 12 edited photos, any available day.',
        path: '/holiday-session',
        price: HOLIDAY_OFFERS.full.price,
        priceType: 'from',
    }),
    faqJsonLd(FULL_SESSION_FAQ),
];

export default function HolidaySession() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <TrackViewContent name="Full Holiday Session" category="Holiday" />
            <BookingProvider>
                <HolidaySessionPage />
            </BookingProvider>
        </>
    );
}
