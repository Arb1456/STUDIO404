import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-charcoal flex flex-col items-center justify-center px-6 text-center">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-cream/40 mb-4">Error</p>
            <h1 className="font-serif text-[12rem] leading-none text-cream/10 select-none">404</h1>
            <h2 className="font-serif text-3xl md:text-5xl text-cream -mt-8 mb-4">You found the studio.</h2>
            <p className="font-sans text-cream/60 text-sm max-w-sm mb-10">
                This page doesn&apos;t exist — but our space does. Let&apos;s get you somewhere real.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 font-serif text-cream border border-cream/30 px-8 py-3 rounded-sm hover:bg-cream hover:text-charcoal transition-all"
            >
                Back to Studio 404
            </Link>
        </main>
    );
}
