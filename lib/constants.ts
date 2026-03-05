import { MenuItem, FAQItem, FeatureItem } from '@/types';

export const MENU_ITEMS: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Studio Rentals', href: '/rental' },
    { label: 'Photo Sessions', href: '/photoshoot' },
    { label: 'Studio Tour', href: '/tour' },
    { label: 'Equipment + Amenities', href: '/equipment' },
    { label: 'Community Gallery', href: '/gallery' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Rates', href: '/rates' },
    { label: 'Policies', href: '/policies' },
];

export const FAQ_ITEMS: FAQItem[] = [
    {
        question: "What does a studio rental include?",
        answer: "Every rental includes access to our 12x10x10 cyclorama wall, all lighting equipment, seamless backdrops, sets, grip gear, changing area, props, furniture, and decor."
    },
    {
        question: "What are the booking options?",
        answer: "We offer hourly bookings, half-day, and full-day rates. We also have a number of guided sessions available for those who don't have a designated photographer."
    },
    {
        question: "Can I bring my own equipment?",
        answer: "Absolutely. While we provide a comprehensive lighting grid and grip, you are welcome to bring your own cameras, additional lights, and props."
    },
    {
        question: "Is there parking available?",
        answer: "We have dedicated parking spaces as well as an open plaza lot with free public parking."
    }
];

export const FEATURES: FeatureItem[] = [
    { title: "Cyclorama Wall" },
    { title: "Professional Lighting" },
    { title: "Seamless Backdrops" },
    { title: "Seasonal & Editorial Sets" },
    { title: "Props & Furniture" },
    { title: "High Ceilings" },
    { title: "Changing Area" },
];
