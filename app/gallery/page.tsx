import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import GalleryPageClient from './GalleryPageClient';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
    title: 'Gallery | Studio 404 — Ottawa Photography Studio',
    description: 'Browse work created at Studio 404. Portraits, branding, editorial, and product photography from our Ottawa studio.',
    openGraph: {
        title: 'Gallery | Studio 404',
        description: 'Portraits, branding, editorial, and product photography from our Ottawa studio.',
    },
    alternates: { canonical: '/gallery' },
};

const jsonLd = breadcrumbJsonLd('Gallery', '/gallery');

export default function Gallery() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <BookingProvider>
                <GalleryPageClient />
            </BookingProvider>
        </>
    );
}
