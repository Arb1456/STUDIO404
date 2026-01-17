import React from 'react';
import { Menu as MenuIcon, Phone } from 'lucide-react';

interface FloatingMenuProps {
  onMenuClick: () => void;
  onBookClick: () => void;
}

export const FloatingMenu: React.FC<FloatingMenuProps> = ({ onMenuClick, onBookClick }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md">
      <div className="bg-charcoal text-cream rounded-full px-6 py-4 flex items-center justify-between shadow-2xl">
        <button 
          onClick={onMenuClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity text-xs tracking-widest uppercase"
        >
          <MenuIcon size={18} />
          <span>Menu</span>
        </button>

        <button 
          onClick={onBookClick}
          className="font-serif italic text-lg hover:opacity-80 transition-opacity"
        >
          Book Now
        </button>

        <a 
          href="tel:+15555555555"
          className="hover:opacity-80 transition-opacity"
        >
          <Phone size={18} />
        </a>
      </div>
    </div>
  );
};