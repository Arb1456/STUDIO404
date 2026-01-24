import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import ViewportHeightFix from '@/components/layout/ViewportHeightFix';
import { SpeedInsights } from '@vercel/speed-insights/next';

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Studio 404 | Premium Creative Space in Ottawa',
    description: 'Professional photography studio with cyclorama wall, lighting equipment, and full amenities. Book hourly, half-day, or full-day sessions.',
    keywords: 'photography studio, Ottawa, cyclorama, studio rental, photoshoot',
    openGraph: {
        title: 'Studio 404 | Premium Creative Space',
        description: 'Professional photography studio in Ottawa',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
            <head>
                <Script
                    src="https://unpkg.com/@elevenlabs/convai-widget-embed"
                    strategy="afterInteractive"
                    async
                />
            </head>
            <body className="bg-cream text-charcoal font-sans antialiased">
                <ViewportHeightFix />
                {children}
                <SpeedInsights />
            </body>
        </html>
    );
}
