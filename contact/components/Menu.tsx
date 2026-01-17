import React from 'react';
import { Menu as MenuIcon, Phone } from 'lucide-react';
import { BookingType } from '../types';

interface MenuProps {
  onBook: (type: BookingType) => void;
  onToggleMenu: () => void;
}

export const Menu: React.FC<MenuProps> = ({ onBook, onToggleMenu }) => {
  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4">
      <div className="flex items-center justify-between w-full max-w-sm bg-charcoal text-cream rounded-full px-6 py-4 shadow-2xl">
        
        {/* Left: Hamburger + Menu Label */}
        <button 
          onClick={onToggleMenu}
          className="flex items-center gap-3 hover:opacity-70 transition-opacity group"
        >
          <MenuIcon size={20} className="text-cream" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Menu</span>
        </button>

        {/* Center: Book Now */}
        <button 
          onClick={() => onBook('rental')}
          className="font-serif italic text-lg px-4 hover:opacity-70 transition-opacity"
        >
          Book Now
        </button>

        {/* Right: Phone Icon */}
        <button className="hover:opacity-70 transition-opacity">
          <Phone size={18} className="text-cream rotate-90" />
        </button>

      </div>
    </div>
  );
};