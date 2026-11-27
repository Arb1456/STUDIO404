import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import HomePage from '@/components/pages/HomePage';
import { FAQ_ITEMS } from '@/lib/constants';
import { SITE_URL } from '@/lib/site';
import { cloudinaryUrl } from '@/lib/cloudinary';
import { HOLIDAY_OFFERS, HOLIDAY_OG_IMAGES, isHolidaySeason } from '@/lib/holiday';

// Christmas wording while the holiday season is on (lib/holiday.ts switch); it goes back to the
// year-round studio wording when HOLIDAY_SEASON_ENABLED is set to false. "Studio Rental" stays
// in the holiday title so the year-round rental searches keep matching.
const holiday = isHolidaySeason();
const title = holiday
    ? 'Christmas Mini Sessions & Studio Rental in Ottawa | Studio 404'
    : 'Studio 404 | Premium Photography Studio in Ottawa';
const description = holiday
    ? `Christmas mini sessions in Ottawa on our 2026 set: 30 minutes, ${HOLIDAY_OFFERS.mini.photoCount} edited photos, $${HOLIDAY_OFFERS.mini.price}, edits within 3 days. Plus photo studio rental with a cyc wall, lighting and props.`
    : 'Professional photography studio featuring a cyclorama wall, full lighting grid, props, furniture, and client amenities. Book hourly, half-day, or full-day sessions.';

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
        url: SITE_URL,
        siteName: 'Studio 404',
        type: 'website',
        locale: 'en_CA',
        images: holiday
            ? [HOLIDAY_OG_IMAGES.set]
            : [{ url: cloudinaryUrl('The_Cyc_Wall_aohgwv', { width: 1200, height: 630, crop: 'fill', gravity: 'auto' }), width: 1200, height: 630, alt: 'Studio 404 photography studio in Ottawa' }],
    },
    alternates: { canonical: '/' },
};

/** Site name for Google results ("Studio 404" alone collides with the HTTP 404 error). */
const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Studio 404',
    alternateName: ['Studio 404 Ottawa', 'thestudio404.ca'],
    url: `${SITE_URL}/`,
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Studio 404',
    description: 'Professional photography studio in Ottawa featuring a cyclorama wall, full lighting grid, props, furniture, and client amenities.',
    url: SITE_URL,
    address: {
        '@type': 'PostalAddress',
        streetAddress: '2285 St. Laurent Blvd Unit B8b',
        addressLocality: 'Ottawa',
        addressRegion: 'ON',
        postalCode: 'K1G 4Z7',
        addressCountry: 'CA',
    },
    telephone: '+1-343-314-4140',
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '09:00',
            closes: '20:00',
        },
    ],
    sameAs: [
        'https://share.google/ddCdMJqZs0MyNppzl',
        'https://instagram.com/studio404inc',
    ],
    image: 'https://res.cloudinary.com/studio404/image/upload/q_auto,f_auto/studio404/tour/cyc_full',
    priceRange: '$$',
    areaServed: {
        '@type': 'City',
        name: 'Ottawa',
    },
};

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
        },
    })),
};

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                // Safe: hardcoded build-time constants, not user input
                dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteJsonLd, jsonLd]) }}
            />
            {/* Safe: FAQ content is from hardcoded constants, not user input */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <BookingProvider>
                <HomePage />
            </BookingProvider>
        </>
    );
}
