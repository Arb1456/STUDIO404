export interface BookingContextType {
  isBookingOpen: boolean;
  openBooking: (type: 'rental' | 'photoshoot' | 'general') => void;
  closeBooking: () => void;
}

export interface SectionProps {
  id?: string;
  className?: string;
  onBook: (type: 'rental' | 'photoshoot') => void;
}

export interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}