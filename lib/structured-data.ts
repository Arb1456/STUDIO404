const BASE_URL = 'https://thestudio404.ca';

export function breadcrumbJsonLd(pageName: string, pagePath: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: pageName, item: `${BASE_URL}${pagePath}` },
        ],
    };
}

/**
 * FAQPage from the same Q&A list the page renders (Google requires the
 * structured answers to match the visible ones, so never pass different text).
 */
export function faqJsonLd(items: ReadonlyArray<{ question: string; answer: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
    };
}

/** A priced photo service offered at the studio (Ottawa), e.g. the holiday sessions. */
export function serviceJsonLd(s: {
    name: string;
    description: string;
    path: string;
    price: number;
    /** 'from' = starting price (extra people, add-ons can raise it). */
    priceType: 'fixed' | 'from';
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: s.name,
        serviceType: 'Christmas photography',
        description: s.description,
        url: `${BASE_URL}${s.path}`,
        areaServed: { '@type': 'City', name: 'Ottawa' },
        provider: {
            '@type': 'LocalBusiness',
            name: 'Studio 404',
            url: BASE_URL,
            telephone: '+1-343-314-4140',
            address: {
                '@type': 'PostalAddress',
                streetAddress: '2285 St. Laurent Blvd, Unit B8b',
                addressLocality: 'Ottawa',
                addressRegion: 'ON',
                postalCode: 'K1G 4Z7',
                addressCountry: 'CA',
            },
        },
        offers: {
            '@type': 'Offer',
            priceCurrency: 'CAD',
            ...(s.priceType === 'fixed'
                ? { price: s.price }
                : { priceSpecification: { '@type': 'PriceSpecification', minPrice: s.price, priceCurrency: 'CAD' } }),
            url: `${BASE_URL}${s.path}`,
            availability: 'https://schema.org/InStock',
        },
    };
}
