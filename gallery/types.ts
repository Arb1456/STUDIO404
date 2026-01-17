import React from 'react';

export type BookingType = 'rental' | 'photoshoot';

export interface GalleryPageProps {
  onBook: (type: BookingType) => void;
}

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
}