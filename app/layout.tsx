import type { Metadata, Viewport } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import ViewportHeightFix from '@/components/layout/ViewportHeightFix';
import LenisProvider from '@/components/layout/LenisProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';

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

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL('https://thestudio404.ca'),
    title: {
        default: 'Studio 404 | Premium Photography Studio in Ottawa',
        template: '%s',
    },
    description: 'Professional photography studio with cyclorama wall, lighting equipment, and full amenities. Book hourly, half-day, or full-day sessions.',
    keywords: 'photography studio, Ottawa, cyclorama, studio rental, photoshoot, creative space',
    openGraph: {
        title: 'Studio 404 | Premium Creative Space',
        description: 'Professional photography studio in Ottawa',
        type: 'website',
        siteName: 'Studio 404',
        locale: 'en_CA',
        url: 'https://thestudio404.ca',
        images: [
            {
                url: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'}/image/upload/c_fill,w_1200,h_630,g_auto,q_auto,f_auto/The_Cyc_Wall_aohgwv`,
                width: 1200,
                height: 630,
                alt: 'Studio 404 — Premium Photography Studio in Ottawa',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
    },
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
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
                <LenisProvider />
                {children}
                <SpeedInsights />
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
                {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
                    <>
                        <Script id="meta-pixel" strategy="afterInteractive">
                            {`
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                                fbq('track', 'PageView');
                            `}
                        </Script>
                        <noscript>
                            <img
                                height="1"
                                width="1"
                                style={{ display: 'none' }}
                                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
                                alt=""
                            />
                        </noscript>
                    </>
                )}
            </body>
        </html>
    );
}
