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
