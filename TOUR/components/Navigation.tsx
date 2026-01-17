import React from 'react';
import { Menu, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  onBook: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onBook }) => {
  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="bg-charcoal text-cream px-6 py-3 rounded-full flex items-center gap-12 shadow-2xl pointer-events-auto cursor-pointer group"
      >
        <div className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <Menu size={18} />
          <span className="text-xs uppercase tracking-widest">Menu</span>
        </div>

        <button 
          onClick={onBook}
          className="font-serif italic text-lg hover:scale-105 transition-transform"
        >
          Book Now
        </button>

        <a href="tel:+15550000000" className="hover:opacity-70 transition-opacity">
          <Phone size={18} />
        </a>
      </motion.div>
    </div>
  );
};