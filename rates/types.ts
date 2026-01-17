import { ReactNode } from 'react';

export type BookingType = 'rental' | 'photoshoot' | 'tour';

export interface RevealProps {
  children: ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  className?: string;
}

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
}

export interface PricingTier {
  duration: string;
  price: number;
  label: string;
  description: string;
  popular?: boolean;
}

export interface PackageTier {
  name: string;
  price: number;
  description: string;
}

export interface AccordionItem {
  question: string;
  answer: string;
}