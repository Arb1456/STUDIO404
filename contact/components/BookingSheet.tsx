import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface BookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingSheet: React.FC<BookingSheetProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className="relative w-full max-w-md h-full bg-cream flex flex-col p-8 sm:p-12 shadow-xl animate-[slideIn_0.5s_ease-out]">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-serif text-3xl text-charcoal">Select Service</h2>
          <button onClick={onClose} className="p-2 hover:bg-charcoal/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-6 flex-grow">
          <div className="space-y-2">
            <h3 className="font-sans text-xs tracking-widest uppercase text-charcoal/60">Studio Rental</h3>
            <Button className="w-full justify-between flex" onClick={onClose}>
              Book Full Day
            </Button>
            <Button variant="outline" className="w-full justify-between flex" onClick={onClose}>
              Book Half Day
            </Button>
          </div>

          <div className="space-y-2 mt-8">
            <h3 className="font-sans text-xs tracking-widest uppercase text-charcoal/60">Creative Services</h3>
            <Button variant="secondary" className="w-full" onClick={onClose}>
              Request Photographer
            </Button>
          </div>
        </div>

        <div className="text-center mt-auto">
          <p className="font-serif italic text-charcoal/60">Studio 404 • Ottawa</p>
        </div>
      </div>
    </div>
  );
};