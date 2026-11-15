import type { Metadata } from 'next';
import Link from 'next/link';
import { Holly, Snowfall } from '@/components/ui/Christmas';
import { HOLIDAY_ROUTES, STUDIO_CONTACT } from '@/lib/holiday';

/**
 * Instagram bio link page. One link in the bio, four destinations, each tagged so GA4
 * credits Instagram. Kept out of the sitemap and search results on purpose.
 */
export const metadata: Metadata = {
    title: 'Studio 404 | Links',
    description: 'Holiday Minis, Full Holiday Sessions, studio rental and the Christmas Truck Initiative.',
    robots: { index: false, follow: true },
};

const UTM = 'utm_source=instagram&utm_medium=social&utm_campaign=christmas-2026';

const LINKS = [
    { label: 'Book A Holiday Mini', note: '30 minutes on the Christmas set · $125', href: HOLIDAY_ROUTES.minis, primary: true },
    { label: 'Full Holiday Session', note: '1.5 hours · 12 edited photos', href: HOLIDAY_ROUTES.fullSession },
    { label: 'Rent The Studio', note: 'Cyclorama, lighting and the Christmas set', href: '/rental' },
    { label: 'Christmas Truck Initiative', note: 'Help us collect warm clothing', href: '/christmas-truck' },
];

export default function LinksPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-evergreen text-cream px-6 py-16">
            <Snowfall count={16} />
            <div className="relative mx-auto max-w-md text-center">
                <Holly className="mx-auto w-12 h-12 mb-4" />
                <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">Ottawa · Christmas 2026</p>
                <h1 className="font-serif text-4xl mb-10">
                    Studio <span className="italic font-light">404</span>
                </h1>
                <ul className="space-y-4">
                    {LINKS.map((l) => (
                        <li key={l.href}>
                            <Link
                                href={`${l.href}?${UTM}`}
                                className={`block rounded-xl px-6 py-5 no-underline transition-colors ${
                                    l.primary
                                        ? 'bg-cream text-evergreen hover:bg-white'
                                        : 'border border-cream/40 text-cream hover:bg-cream hover:text-evergreen'
                                }`}
                            >
                                <span className="block text-sm uppercase tracking-widest">{l.label}</span>
                                <span className={`block text-xs mt-1 ${l.primary ? 'text-evergreen/70' : 'opacity-70'}`}>{l.note}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <p className="mt-10 text-sm text-cream/70">
                    <a href={STUDIO_CONTACT.phoneHref} className="text-cream/80 no-underline">{STUDIO_CONTACT.phoneDisplay}</a>
                    <span className="mx-2 text-gold">·</span>
                    <a href={`mailto:${STUDIO_CONTACT.email}`} className="text-cream/80 no-underline">{STUDIO_CONTACT.email}</a>
                </p>
            </div>
        </main>
    );
}
