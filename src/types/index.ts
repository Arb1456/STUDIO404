export type BookingType = 'rental' | 'photoshoot' | null;

export interface MenuItem {
    label: string;
    href: string;
    isExternal?: boolean;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface FeatureItem {
    title: string;
    description?: string;
    icon?: string;
}

export interface GalleryImage {
    src: string;
    alt: string;
    category?: string;
}

export interface TourStop {
    id: string;
    title: string;
    description: string;
    image: string;
}

export interface EquipmentItem {
    name: string;
    description?: string;
    category: string;
    image?: string;
}
