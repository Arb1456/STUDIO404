import React from 'react';

export enum Page {
  HOME = 'HOME',
  EQUIPMENT = 'EQUIPMENT',
  GALLERY = 'GALLERY',
  BOOKING = 'BOOKING'
}

export interface NavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onBook: (type: 'rental' | 'photoshoot') => void;
}

export interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  children: React.ReactNode;
}