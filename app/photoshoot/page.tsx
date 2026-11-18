import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import TrackViewContent from '@/components/layout/TrackViewContent';
import PhotoshootPage from '@/components/pages/PhotoshootPage';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
    title: 'Book a Photoshoot | Studio 404 — Ottawa Photography Studio',
    description: 'Book a professional photoshoot at Studio 404. Portrait, family, couple, headshot, maternity, newborn, boudoir, and product sessions available.',
    openGraph: {
        title: 'Book a Photoshoot | Studio 404',
        description: 'Portrait, family, couple, headshot, maternity, newborn, boudoir, and product sessions.',
    },
    alternates: { canonical: '/photoshoot' },
};

const jsonLd = breadcrumbJsonLd('Book a Photoshoot', '/photoshoot');

export default function Photoshoot() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <TrackViewContent name="Photo Sessions" category="Photoshoot" />
            <BookingProvider>
                <PhotoshootPage />
            </BookingProvider>
        </>
    );
}
