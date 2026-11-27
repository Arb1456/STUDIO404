import { MetadataRoute } from 'next';

import { SITE_URL as BASE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: BASE_URL, changeFrequency: 'weekly', priority: 1 },
        { url: `${BASE_URL}/holiday-minis`, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/holiday-session`, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/christmas-truck`, changeFrequency: 'weekly', priority: 0.6 },
        { url: `${BASE_URL}/tour`, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${BASE_URL}/photoshoot`, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/rental`, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/equipment`, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/rates`, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/gallery`, changeFrequency: 'weekly', priority: 0.6 },
        { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/policies`, changeFrequency: 'monthly', priority: 0.4 },
    ];
}
