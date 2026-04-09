import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import HomePage from '@/components/pages/HomePage';

export const metadata: Metadata = {
    title: 'Studio 404 | Premium Photography Studio in Ottawa',
    description: 'Professional photography studio featuring a cyclorama wall, full lighting grid, props, furniture, and client amenities. Book hourly, half-day, or full-day sessions.',
    openGraph: {
        title: 'Studio 404 | Premium Photography Studio in Ottawa',
        description: 'Professional photography studio featuring a cyclorama wall, full lighting grid, props, furniture, and client amenities.',
    },
    alternates: { canonical: '/' },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://thestudio404.ca/#business',
    name: 'Studio 404',
    description: 'Professional photography studio in Ottawa featuring a cyclorama wall, full lighting grid, props, furniture, and client amenities.',
    url: 'https://thestudio404.ca',
    address: {
        '@type': 'PostalAddress',
        streetAddress: '2285 St. Laurent Blvd Unit B8b',
        addressLocality: 'Ottawa',
        addressRegion: 'ON',
        postalCode: 'K1G 4Z7',
        addressCountry: 'CA',
    },
    telephone: '+1-250-407-3530',
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '09:00',
            closes: '20:00',
        },
    ],
    sameAs: ['https://share.google/ddCdMJqZs0MyNppzl'],
    image: 'https://res.cloudinary.com/studio404/image/upload/q_auto,f_auto/studio404/tour/cyc_full',
    priceRange: '$$',
    areaServed: {
        '@type': 'City',
        name: 'Ottawa',
    },
};

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                // Safe: hardcoded build-time constants, not user input
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BookingProvider>
                <HomePage />
            </BookingProvider>
        </>
    );
}
