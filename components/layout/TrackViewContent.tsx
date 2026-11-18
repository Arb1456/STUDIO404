'use client';

import { useEffect } from 'react';
import { trackViewContent } from '@/lib/tracking';

/** Drop into a server page to send one ViewContent / view_item when the page loads. */
export default function TrackViewContent({ name, category }: { name: string; category: string }) {
    useEffect(() => {
        trackViewContent(name, category);
    }, [name, category]);
    return null;
}
