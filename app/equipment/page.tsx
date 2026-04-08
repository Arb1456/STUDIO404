import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import EquipmentPageClient from './EquipmentPageClient';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
    title: 'Equipment & Amenities | Studio 404 — Ottawa Photography Studio',
    description: 'Professional lighting equipment, props, furniture, client lounge, kitchenette, and private change room. Everything you need for your shoot.',
    openGraph: {
        title: 'Equipment & Amenities | Studio 404',
        description: 'Professional lighting, props, furniture, and full amenities included with every booking.',
    },
    alternates: { canonical: '/equipment' },
};

const jsonLd = breadcrumbJsonLd('Equipment & Amenities', '/equipment');

export default function Equipment() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <BookingProvider>
                <EquipmentPageClient />
            </BookingProvider>
        </>
    );
}
