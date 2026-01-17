import React, { ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
}

export interface InquiryTemplate {
  id: string;
  title: string;
  description: string;
  subject: string;
}

export type BookingType = 'rental' | 'photoshoot' | 'tour';