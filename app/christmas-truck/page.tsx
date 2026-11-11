import type { Metadata } from 'next';
import Link from 'next/link';
import BookingProvider from '@/components/layout/BookingProvider';
import Footer from '@/components/layout/Footer';
import { Holly, EmblemScatter, Snowfall } from '@/components/ui/Christmas';

// PLACEHOLDER — full page to be designed later.
export const metadata: Metadata = {
    title: 'The Christmas Truck Initiative | Studio 404',
    description: 'The Christmas Truck Initiative by Studio 404 — details coming soon.',
    alternates: { canonical: '/christmas-truck' },
    robots: { index: false },
};

export default function ChristmasTruck() {
    return (
        <BookingProvider>
            <div className="bg-evergreen text-cream min-h-screen flex flex-col">
                <section className="relative overflow-hidden flex-1 flex flex-col items-center justify-center text-center px-6 pt-36 pb-24">
                    <EmblemScatter />
                    <Snowfall />
                    <Holly className="relative w-14 h-14 mb-4" />
                    <span className="relative block text-xs tracking-[0.25em] uppercase text-gold mb-4">Coming Soon</span>
                    <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
                        The Christmas <span className="italic font-light">Truck Initiative</span>
                    </h1>
                    <p className="text-cream/70 text-lg max-w-xl mb-10">
                        Details on our holiday initiative are on the way. Check back soon.
                    </p>
                    <Link href="/holiday-minis" className="bg-cream text-evergreen px-8 py-4 text-sm uppercase tracking-widest no-underline hover:bg-white transition-colors">
                        Book a holiday mini
                    </Link>
                </section>
                <Footer />
            </div>
        </BookingProvider>
    );
}
