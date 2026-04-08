import type { Metadata } from 'next';
import BookingConfirmationContent from './BookingConfirmationContent';

export const metadata: Metadata = {
    title: 'Booking Confirmed | Studio 404',
    robots: { index: false, follow: false },
};

export default function BookingConfirmation() {
    return <BookingConfirmationContent />;
}
