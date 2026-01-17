export interface SessionType {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  duration: string;
  photoCount: number;
}

export type BookingType = 'rental' | 'photoshoot' | 'tour' | 'contact';

export interface BookingContextProps {
  onBook: (type: BookingType) => void;
}