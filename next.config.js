/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
    async redirects() {
        return [
            // === Shopify → Next.js migration redirects (301) ===
            // Old Shopify pages used /pages/ prefix; new site uses clean routes.

            // Homepage
            { source: '/pages/home', destination: '/', permanent: true },

            // Tour / Studio
            { source: '/pages/the-studio', destination: '/tour', permanent: true },
            { source: '/pages/studio-tour', destination: '/tour', permanent: true },
            { source: '/pages/cyclorama-wall', destination: '/tour', permanent: true },

            // Rental
            { source: '/pages/studio-rental', destination: '/rental', permanent: true },
            { source: '/pages/videography', destination: '/rental', permanent: true },
            { source: '/pages/book-now-diverter', destination: '/rental', permanent: true },
            { source: '/pages/book-now-new', destination: '/rental', permanent: true },

            // Photoshoot
            { source: '/pages/photoshoots', destination: '/photoshoot', permanent: true },
            { source: '/pages/photoshoot-booking', destination: '/photoshoot', permanent: true },

            // Equipment
            { source: '/pages/camera-equipment-rental', destination: '/equipment', permanent: true },
            { source: '/pages/equipment-amenities', destination: '/equipment', permanent: true },

            // Rates / Packages
            { source: '/pages/rates', destination: '/rates', permanent: true },
            { source: '/pages/booking-packages', destination: '/rates', permanent: true },
            { source: '/pages/blank-canvas-package', destination: '/rates', permanent: true },

            // Gallery
            { source: '/pages/client-gallery', destination: '/gallery', permanent: true },

            // About
            { source: '/pages/about-us', destination: '/about', permanent: true },

            // Contact
            { source: '/pages/contact', destination: '/contact', permanent: true },
            { source: '/pages/contact-us', destination: '/contact', permanent: true },
            { source: '/pages/request-for-quote', destination: '/contact', permanent: true },
            { source: '/pages/quotes-history', destination: '/contact', permanent: true },

            // Policies
            { source: '/pages/policies', destination: '/policies', permanent: true },
            { source: '/pages/policies-and-faq', destination: '/policies', permanent: true },

            // === Shopify product URLs (booking/session pages) ===
            { source: '/products/blank-canvas-package', destination: '/rates', permanent: true },
            { source: '/products/family-session', destination: '/photoshoot', permanent: true },
            { source: '/products/portrait-session', destination: '/photoshoot', permanent: true },
            { source: '/products/pet-session', destination: '/photoshoot', permanent: true },
            { source: '/products/couples-session', destination: '/photoshoot', permanent: true },
            { source: '/products/newborn-baby-session', destination: '/photoshoot', permanent: true },
            { source: '/products/christmas-mini-session', destination: '/photoshoot', permanent: true },
            { source: '/products/studio-viewing', destination: '/tour', permanent: true },
            { source: '/products/deposit', destination: '/rates', permanent: true },

            // === Shopify collection URLs ===
            { source: '/collections/frontpage', destination: '/', permanent: true },
            { source: '/collections/photo-sessions', destination: '/photoshoot', permanent: true },

            // === Shopify blog URLs ===
            { source: '/blogs/news', destination: '/', permanent: true },
            { source: '/blogs/news/:slug', destination: '/', permanent: true },
        ];
    },
};

module.exports = nextConfig;
