import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Studio 404',
        short_name: 'Studio 404',
        description: 'Premium photography studio in Ottawa featuring a cyclorama wall, professional lighting, and full amenities.',
        start_url: '/',
        display: 'standalone',
        background_color: '#F5F0EB',
        theme_color: '#2C2C2C',
    };
}
