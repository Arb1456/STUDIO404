import React from 'react';
import { Menu as MenuIcon, Phone } from 'lucide-react';
import { BookingHandler } from '../types';

interface MenuProps {
  onBook: BookingHandler;
}

export const Menu: React.FC<MenuProps> = ({ onBook }) => {
  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="flex items-center justify-between bg-charcoal text-cream px-6 py-3 rounded-full shadow-2xl w-full max-w-md pointer-events-auto">
        
        {/* Left: Menu Trigger */}
        <button className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase hover:text-gray-300 transition-colors">
          <MenuIcon size={18} />
          <span>Menu</span>
        </button>

        {/* Center: Book Now CTA */}
        <button 
          onClick={() => onBook('rental')}
          className="text-lg font-serif italic hover:text-gray-300 transition-colors"
        >
          Book Now
        </button>

        {/* Right: Phone/Contact */}
        <a href="tel:+16135550199" className="hover:text-gray-300 transition-colors">
          <Phone size={18} />
        </a>
      </div>
    </div>
  );
};