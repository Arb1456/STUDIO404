'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-screen bg-charcoal flex flex-col items-center justify-center px-6 text-center">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-cream/40 mb-4">Something went wrong</p>
            <h1 className="font-serif text-4xl md:text-6xl text-cream mb-4">Unexpected Error</h1>
            <p className="font-sans text-cream/60 text-sm max-w-sm mb-10">
                We hit a snag. Try again or reach out if the problem persists.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={reset}
                    className="font-serif text-cream border border-cream/30 px-8 py-3 rounded-sm hover:bg-cream hover:text-charcoal transition-all"
                >
                    Try Again
                </button>
                <a
                    href="/"
                    className="font-serif text-cream/60 border border-cream/20 px-8 py-3 rounded-sm hover:bg-cream/10 transition-all"
                >
                    Go Home
                </a>
            </div>
        </main>
    );
}
