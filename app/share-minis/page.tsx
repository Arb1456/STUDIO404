import type { Metadata } from 'next';
import ShareMinis from './ShareMinis';

export const metadata: Metadata = {
    title: 'Share The Mini Dates | Studio 404',
    description: 'Send a friend the Studio 404 Holiday Mini dates.',
    alternates: { canonical: '/share-minis' },
    robots: { index: false, follow: true },
};

export default function ShareMinisPage() {
    return <ShareMinis />;
}
