import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import ContactPageClient from './ContactPageClient';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
    title: 'Contact | Studio 404 — Get in Touch',
    description: 'Questions about Studio 404? Reach out to book a session, schedule a tour, or learn more about our Ottawa photography studio.',
    openGraph: {
        title: 'Contact | Studio 404',
        description: 'Book a session, schedule a tour, or learn more about our Ottawa photography studio.',
    },
    alternates: { canonical: '/contact' },
};

const jsonLd = breadcrumbJsonLd('Contact', '/contact');

export default function Contact() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <BookingProvider>
                <ContactPageClient />
            </BookingProvider>
        </>
    );
}
