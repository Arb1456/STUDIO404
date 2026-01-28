'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, Home, Camera } from 'lucide-react';
import { sendGAEvent } from '@next/third-parties/google';

export default function BookingConfirmationPage() {
    useEffect(() => {
        // Fire conversion event when page loads
        // We use a generic 'purchase' event. You can refine this with dynamic data if passed via URL params.
        sendGAEvent('event', 'purchase', {
            transaction_id: `booking_${Date.now()}`, // Unique ID based on timestamp
            value: 100.00, // Placeholder value, can be made dynamic later
            currency: 'CAD',
            items: [
                {
                    item_name: 'Studio Booking',
                    item_category: 'Service'
                }
            ]
        });
    }, []);

    return (
        <main className="min-h-screen bg-cream flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center border border-charcoal/5 shadow-xl">
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <CheckCircle2 size={40} />
                    </div>
                </div>

                <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
                    Booking Confirmed!
                </h1>

                <p className="text-charcoal/70 mb-8 leading-relaxed max-w-md mx-auto">
                    Thank you for booking with Studio 404. You should receive a confirmation email shortly with all the details for your session.
                </p>

                <div className="bg-charcoal/5 rounded-lg p-6 mb-10 text-left">
                    <h3 className="font-serif text-lg mb-3">Next Steps:</h3>
                    <ul className="space-y-3 text-sm text-charcoal/80">
                        <li className="flex items-start gap-2">
                            <span className="font-bold">•</span>
                            <span>Check your email for the access code and entry instructions.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold">•</span>
                            <span>Review our house rules if you haven't already.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold">•</span>
                            <span>Arrive 5-10 minutes early to get settled.</span>
                        </li>
                    </ul>
                </div>

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

                    <Link
                        href="/photoshoot"
                        className="
                            flex items-center justify-center gap-2
                            px-6 py-3 rounded-full
                            bg-transparent border border-charcoal text-charcoal
                            font-sans text-sm font-medium uppercase tracking-widest
                            hover:bg-charcoal/5 transition-colors
                        "
                    >
                        <Camera size={18} />
                        <span>Book Photoshoot</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
