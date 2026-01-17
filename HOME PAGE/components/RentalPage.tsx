import React, { useState } from 'react';
import { Reveal } from './ui/Reveal';
import BookingSheet from './BookingSheet';
import { BookingType } from '../types';

const RentalPage: React.FC = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [bookingType, setBookingType] = useState<BookingType>(null);

  const handleOpenSheet = (type: BookingType) => {
    setBookingType(type);
    setIsSheetOpen(true);
  };

  return (
    <div className="h-screen w-full bg-cream text-charcoal flex flex-col items-center justify-center gap-8 relative overflow-hidden">
        {/* Background Texture/Gradient for subtle depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

      <Reveal repeat={true}>
        <button 
          onClick={() => handleOpenSheet('photoshoot')}
          className="bg-charcoal text-cream px-12 py-6 font-serif text-3xl italic tracking-wide hover:bg-charcoal/90 hover:scale-105 transition-all duration-300 min-w-[320px] shadow-xl animate-button-glow"
        >
          Book Now
        </button>
      </Reveal>

      <Reveal delay={0.1} repeat={true}>
        <button 
          onClick={() => handleOpenSheet('rental')}
          className="border border-charcoal text-charcoal px-12 py-6 font-sans text-xs uppercase tracking-[0.25em] hover:bg-charcoal hover:text-cream transition-all duration-300 min-w-[320px] animate-button-glow"
        >
          Rent the Studio
        </button>
      </Reveal>

      <BookingSheet 
        isOpen={isSheetOpen} 
        onClose={() => setIsSheetOpen(false)} 
        type={bookingType}
      />
    </div>
  );
};

export default RentalPage;