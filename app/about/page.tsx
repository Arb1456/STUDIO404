import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import AboutPageClient from './AboutPageClient';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
    title: 'About | Studio 404 — Our Story',
    description: "Studio 404 was built from the ground up to be Ottawa's most versatile creative space. Learn about our story, our space, and our mission.",
    openGraph: {
        title: 'About | Studio 404',
        description: "Ottawa's most versatile creative space — our story, our space, and our mission.",
    },
    alternates: { canonical: '/about' },
};

const jsonLd = breadcrumbJsonLd('About', '/about');

export default function About() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <BookingProvider>
                <AboutPageClient />
            </BookingProvider>
        </>
    );
}
