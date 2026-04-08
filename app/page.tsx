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
    // TODO: Uncomment and fill with real business data for local SEO
    // address: {
    //     '@type': 'PostalAddress',
    //     streetAddress: '...',
    //     addressLocality: 'Ottawa',
    //     addressRegion: 'ON',
    //     postalCode: '...',
    //     addressCountry: 'CA',
    // },
    // telephone: '+1-613-...',
    // openingHoursSpecification: [
    //     { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '08:00', closes: '22:00' },
    // ],
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
