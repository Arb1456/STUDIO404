import type { Metadata } from 'next';
import Link from 'next/link';
import BookingProvider from '@/components/layout/BookingProvider';
import Footer from '@/components/layout/Footer';
import { TEARDOWN_GROUPS, RESET_FEE } from '@/lib/teardown';
import { cloudinaryUrl } from '@/lib/cloudinary';

export const metadata: Metadata = {
    title: 'Teardown Guide | Studio 404',
    description: 'Where every piece of Studio 404 equipment goes back at the end of your rental.',
    alternates: { canonical: '/teardown' },
    robots: { index: false, follow: true },
};

export default function TeardownPage() {
    const groups = TEARDOWN_GROUPS.map((g) => ({ ...g, items: g.items.filter((i) => i.where.trim()) })).filter((g) => g.items.length);

    return (
        <BookingProvider>
            <main className="min-h-screen bg-cream text-charcoal">
                <section className="max-w-2xl mx-auto px-5 pt-24 pb-10">
                    <p className="text-xs uppercase tracking-[0.25em] text-charcoal/60 mb-3">Studio Rentals</p>
                    <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-5">Teardown Guide</h1>
                    <p className="text-lg text-charcoal/80 mb-6">
                        Please leave the studio exactly as you found it. Not sure where something goes? Tap it below.
                    </p>
                    <div className="border border-charcoal/15 bg-white/60 p-5 text-sm leading-relaxed">
                        <p className="mb-2">
                            An immediate <strong>${RESET_FEE} reset charge</strong> applies if the studio isn&apos;t reset, as it can impact the next booking.
                        </p>
                        <p className="text-charcoal/70">
                            Arrived and the studio wasn&apos;t reset? Reply to your booking text or email with photos of how the space was left, so you aren&apos;t charged for it.
                        </p>
                    </div>
                </section>

                <section className="max-w-2xl mx-auto px-5 pb-24 space-y-3">
                    {groups.map((g) => (
                        <details key={g.id} id={g.id} className="group border border-charcoal/15 bg-white/70 open:bg-white">
                            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 [&::-webkit-details-marker]:hidden">
                                <span>
                                    <span className="block font-serif text-xl">{g.title}</span>
                                    <span className="block text-sm text-charcoal/60">{g.summary}</span>
                                </span>
                                <span aria-hidden="true" className="text-2xl leading-none text-charcoal/50 transition-transform group-open:rotate-45">+</span>
                            </summary>
                            <ul className="border-t border-charcoal/10">
                                {g.items.map((i) => (
                                    <li key={i.name} className="border-b last:border-b-0 border-charcoal/10">
                                        <details className="group/item">
                                            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-3.5 text-[15px] [&::-webkit-details-marker]:hidden">
                                                {i.name}
                                                <span aria-hidden="true" className="text-charcoal/40 transition-transform group-open/item:rotate-90">›</span>
                                            </summary>
                                            <div className="px-5 pb-4 text-[15px]">
                                                <p className="text-charcoal/80"><strong className="text-charcoal">Goes:</strong> {i.where}</p>
                                                {i.photo && (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={cloudinaryUrl(i.photo, { width: 800, crop: 'fit' })} alt={`Where the ${i.name} go`} loading="lazy" className="mt-3 w-full border border-charcoal/10" />
                                                )}
                                            </div>
                                        </details>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    ))}

                    <p className="pt-6 text-sm text-charcoal/60">
                        Full rental rules are on the <Link href="/policies" className="underline">Policies page</Link>. Questions during your rental? Text 343-314-4140.
                    </p>
                </section>
            </main>
            <Footer />
        </BookingProvider>
    );
}
