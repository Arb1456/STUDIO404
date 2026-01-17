import { FAQItem, FeatureItem, MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  { label: 'Studio Rental', href: '#availability' },
  { label: 'Photoshoots', href: '#availability' },
  { label: 'Studio Tour', href: '#home' },
  { label: 'Cyclorama Wall', href: '#cyc' },
  { label: 'Equipment + Amenities', href: '#cyc' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About Us', href: '#home' },
  { label: 'Rates', href: '#availability' },
  { label: 'Policies + FAQ', href: '#faq' },
  { label: 'Videography', href: '#contact' },
  { label: 'Contact', href: '#contact' },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What does a studio rental include?",
    answer: "Every rental includes access to our 12x10x10 cyclorama wall, all lighting equipment, seamless backdrops, sets, grip gear, changing area, props, furniture, and decor."
  },
  {
    question: "What are the booking options?",
    answer: "We offer hourly bookings (2-hour minimum), half-day (4 hours), and full-day (8+ hours) rates. Memberships are available for frequent creators."
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