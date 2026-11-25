'use client';

import { useEffect, useState } from 'react';

const URL_TO_SHARE = 'https://www.thestudio404.ca/holiday-minis?utm_source=referral&utm_medium=share&utm_campaign=mini-referral-2026';
const TEXT = 'Studio 404 is doing Christmas mini sessions in Ottawa. Here are the dates:';
const DATA = { title: 'Holiday Minis at Studio 404', text: TEXT, url: URL_TO_SHARE };
const BODY = encodeURIComponent(`${TEXT} ${URL_TO_SHARE}`);

/** Landing page for the "Share The Mini Dates" email button. Opens the phone's share sheet. */
export default function ShareMinis() {
    const [canShare, setCanShare] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (typeof navigator.share !== 'function') return;
        setCanShare(true);
        // Most browsers only allow this after a tap; where it's allowed, the sheet opens right away.
        navigator.share(DATA).catch(() => {});
    }, []);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(URL_TO_SHARE);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            window.prompt('Copy this link:', URL_TO_SHARE);
        }
    };

    const secondary = 'block w-full border border-charcoal/25 py-4 text-center text-sm uppercase tracking-[0.15em] hover:bg-charcoal/5';

    return (
        <main className="min-h-screen bg-cream text-charcoal flex items-center">
            <section className="w-full max-w-md mx-auto px-6 py-16 text-center">
                <p className="text-xs uppercase tracking-[0.25em] text-charcoal/60 mb-3">Studio 404</p>
                <h1 className="font-serif text-4xl leading-tight mb-4">Share The Mini Dates</h1>
                <p className="text-lg text-charcoal/80 mb-8">
                    For every friend who books a Holiday Mini and comes in for it, we&apos;ll e-transfer you $25. Have them mention your name.
                </p>
                <div className="space-y-3">
                    {canShare && (
                        <button type="button" onClick={() => navigator.share(DATA).catch(() => {})} className="block w-full bg-charcoal text-cream py-5 text-base uppercase tracking-[0.15em]">
                            Share With A Friend
                        </button>
                    )}
                    <button type="button" onClick={copy} className={secondary} aria-live="polite">{copied ? 'Link Copied' : 'Copy Link'}</button>
                    {!canShare && (
                        <>
                            <a href={`sms:?&body=${BODY}`} className={secondary}>Text It</a>
                            <a href={`mailto:?subject=${encodeURIComponent(DATA.title)}&body=${BODY}`} className={secondary}>Email It</a>
                        </>
                    )}
                </div>
                <a href="/holiday-minis" className="inline-block mt-8 text-sm underline underline-offset-4">See the mini dates</a>
                <p className="mt-8 text-xs text-charcoal/60">For friends new to Studio 404. Sent after their session is done and paid. Minis run until December 21.</p>
            </section>
        </main>
    );
}
