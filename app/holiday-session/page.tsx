import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import HolidaySessionPage from '@/components/pages/HolidaySessionPage';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
    title: 'Christmas Photoshoot in Ottawa | Full Holiday Session — Studio 404',
    description: '1.5-hour Christmas photoshoot on our holiday set in Ottawa. Outfit changes, 8 edited photos, any available day — from $250.',
    openGraph: {
        title: 'Full Holiday Session | Studio 404',
        description: '1.5 hours on our Christmas set, outfit changes, 8 edited photos. From $250.',
    },
    alternates: { canonical: '/holiday-session' },
};

const jsonLd = breadcrumbJsonLd('Full Holiday Session', '/holiday-session');

export default function HolidaySession() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <BookingProvider>
                <HolidaySessionPage />
            </BookingProvider>
        </>
    );
}
