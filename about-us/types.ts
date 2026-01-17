import React from 'react';

export type BookingType = 'rental' | 'photoshoot' | 'tour';

export interface BookingHandler {
  (type: BookingType): void;
}

export interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
}