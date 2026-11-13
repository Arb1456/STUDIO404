'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Home, Camera, MapPin } from 'lucide-react';
import { sendGAEvent } from '@next/third-parties/google';
import { HOLIDAY_OFFERS, MINI_POLICY } from '@/lib/holiday';

/**
 * One confirmation page, three variants, picked by the GHL redirect URL:
 *   /booking-confirmation                    → studio rental (default, unchanged)
 *   /booking-confirmation?type=session          → photo sessions
 *   /booking-confirmation?type=holiday-session  → Full Holiday Session (session copy, its own deposit value)
 *   /booking-confirmation?type=holiday-mini     → Holiday Mini
 * Unknown or missing ?type falls back to rental so existing rental calendars keep working.
 */
type ConfirmationType = 'rental' | 'session' | 'holiday-session' | 'holiday-mini';

/** Deposit the GHL "Full Holiday Session" calendar charges at booking. Keep in sync with GHL → Payments. */
const FULL_HOLIDAY_DEPOSIT = 75;

interface Variant {
    heading: string;
    intro: string;
    steps: string[];
    secondary: { href: string; label: string; icon: React.ElementType };
    /** GA4 purchase event payload */
    ga: { value: number; itemName: string };
}

const miniBalance = HOLIDAY_OFFERS.mini.price - MINI_POLICY.deposit;

const SESSION_VARIANT: Variant = {
    heading: 'Your Session Is Booked!',
    intro: "Thank you for booking a photoshoot with Studio 404. Your deposit is received, and you'll get a confirmation email and text shortly with your date, time and address.",
    steps: [
        'Check your email for your session details.',
        'Plan your outfits: coordinated, not matching. Avoid large logos and neon.',
        'Arrive 5–10 minutes early. We’re at 2285 St. Laurent Blvd, Unit B8b, with free parking on site.',
    ],
    secondary: { href: '/tour', label: 'Tour the Studio', icon: MapPin },
    ga: { value: 50.0, itemName: 'Photo Session Deposit' },
};

const VARIANTS: Record<ConfirmationType, Variant> = {
    rental: {
        heading: 'Booking Confirmed!',
        intro: 'Thank you for booking with Studio 404. You should receive a confirmation email shortly with all the details for your session.',
        steps: [
            'Check your email for the access code and entry instructions.',
            "Review our house rules if you haven't already.",
            'Arrive 5-10 minutes early to get settled.',
        ],
        secondary: { href: '/photoshoot', label: 'Book Photoshoot', icon: Camera },
        ga: { value: 100.0, itemName: 'Studio Booking' },
    },
    session: SESSION_VARIANT,
    'holiday-session': {
        ...SESSION_VARIANT,
        ga: { value: FULL_HOLIDAY_DEPOSIT, itemName: 'Full Holiday Session Deposit' },
    },
    'holiday-mini': {
        heading: 'Your Holiday Mini Is Booked!',
        intro: `Thank you for booking a Holiday Mini with Studio 404. Your $${MINI_POLICY.deposit} deposit holds your spot, and you'll get a confirmation email and text shortly.`,
        steps: [
            `We'll send one invoice for the $${miniBalance} balance plus applicable HST, and any extra-person or pet fee.`,
            `Your deposit is refundable if you cancel or reschedule at least ${MINI_POLICY.refundWindowDays / 7} weeks before your session.`,
            'Minis run back to back, so please arrive 5–10 minutes early. We’re at 2285 St. Laurent Blvd, Unit B8b, with free parking on site.',
            `You'll choose your 4 favourites, and edits are delivered within 3 days.`,
        ],
        secondary: { href: '/holiday-minis', label: 'What to Wear', icon: Camera },
        ga: { value: MINI_POLICY.deposit, itemName: 'Holiday Mini Deposit' },
    },
};

function parseType(raw: string | null): ConfirmationType {
    return raw === 'session' || raw === 'holiday-session' || raw === 'holiday-mini' ? raw : 'rental';
}

export default function BookingConfirmationContent() {
    // Resolved client-side (static page; avoids a Suspense boundary for useSearchParams).
    // null until read, so a session visitor never sees the rental steps flash first.
    const [type, setType] = useState<ConfirmationType | null>(null);

    useEffect(() => {
        const resolved = parseType(new URLSearchParams(window.location.search).get('type'));
        setType(resolved);

        const { value, itemName } = VARIANTS[resolved].ga;
        sendGAEvent('event', 'purchase', {
            transaction_id: `booking_${Date.now()}`, // Unique ID based on timestamp
            value,
            currency: 'CAD',
            items: [{ item_name: itemName, item_category: 'Service' }],
        });
    }, []);

    const v = type ? VARIANTS[type] : null;
    const SecondaryIcon = v?.secondary.icon;

    return (
        <main className="min-h-screen bg-cream flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center border border-charcoal/5 shadow-xl">
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <CheckCircle2 size={40} />
                    </div>
                </div>

                <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
                    {v?.heading ?? 'Booking Confirmed!'}
                </h1>

                {v && (
                    <>
                        <p className="text-charcoal/70 mb-8 leading-relaxed max-w-md mx-auto">{v.intro}</p>

                        <div className="bg-charcoal/5 rounded-lg p-6 mb-10 text-left">
                            <h3 className="font-serif text-lg mb-3">Next Steps:</h3>
                            <ul className="space-y-3 text-sm text-charcoal/80">
                                {v.steps.map((step) => (
                                    <li key={step} className="flex items-start gap-2">
                                        <span className="font-bold">•</span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="
                            flex items-center justify-center gap-2
                            px-6 py-3 rounded-full
                            bg-charcoal text-cream
                            font-sans text-sm font-medium uppercase tracking-widest
                            hover:bg-charcoal/90 transition-colors
                        "
                    >
                        <Home size={18} />
                        <span>Return Home</span>
                    </Link>

                    {v && SecondaryIcon && (
                        <Link
                            href={v.secondary.href}
                            className="
                                flex items-center justify-center gap-2
                                px-6 py-3 rounded-full
                                bg-transparent border border-charcoal text-charcoal
                                font-sans text-sm font-medium uppercase tracking-widest
                                hover:bg-charcoal/5 transition-colors
                            "
                        >
                            <SecondaryIcon size={18} />
                            <span>{v.secondary.label}</span>
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
}
