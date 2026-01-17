export interface MenuItem {
  label: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  title: string;
  image?: string;
}

export type BookingType = 'rental' | 'photoshoot' | null;