import React from 'react';

export interface BookingProps {
  onBook: (type?: string) => void;
}

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  width?: "fit-content" | "100%";
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}