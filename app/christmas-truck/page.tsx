import type { Metadata } from 'next';
import BookingProvider from '@/components/layout/BookingProvider';
import ChristmasTruckPage from '@/components/pages/ChristmasTruckPage';
import { breadcrumbJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
    title: 'The Christmas Truck Initiative | Studio 404 Ottawa Warm Clothing Drive',
    description: 'The Studio 404 Christmas Truck is collecting jackets, blankets, boots, gloves and toques, and handing them out in person to people experiencing homelessness in Ottawa this December. Drop off in St. Laurent or Stittsville, or arrange a pickup.',
    openGraph: {
        title: 'The Christmas Truck Initiative | Studio 404',
        description: 'Donate warm clothing, snap the truck, spread the word. Hand-delivered in Ottawa this December.',
    },
    alternates: { canonical: '/christmas-truck' },
};

const jsonLd = breadcrumbJsonLd('The Christmas Truck Initiative', '/christmas-truck');

export default function ChristmasTruck() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <BookingProvider>
                <ChristmasTruckPage />
            </BookingProvider>
        </>
    );
}
