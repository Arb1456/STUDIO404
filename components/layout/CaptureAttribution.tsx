'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';

/** Stores the landing visit's utm_* / fbclid / gclid so booking calendar links can carry them (lib/attribution.ts). */
export default function CaptureAttribution() {
    useEffect(() => {
        captureAttribution();
    }, []);
    return null;
}
