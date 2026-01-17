import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Mail, MapPin } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    "Studio Rental",
    "Photoshoots",
    "Studio Tour",
    "Cyclorama Wall",
    "Equipment + Amenities",
    "Gallery",
    "About Us",
    "Rates",
    "Policies + FAQ"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 bg-cream z-50 flex flex-col overflow-y-auto"
        >
          <div className="p-6 flex justify-between items-start">
            <span className="font-serif text-xl text-charcoal">Studio 404</span>
            <button onClick={onClose} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
              <X className="text-charcoal" />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-10">
            <nav className="flex flex-col gap-6 md:gap-8">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={onClose}
                  className="text-left font-serif text-3xl md:text-5xl text-charcoal hover:italic transition-all duration-300"
                >
                  {item}
                </motion.button>
              ))}
            </nav>
          </div>

          <div className="p-6 md:p-12 border-t border-charcoal/10">
            <div className="flex flex-col gap-4 text-sm text-charcoal/70">
              <span className="uppercase tracking-widest text-xs">Ottawa, ON • EST. 2024</span>
              <div className="flex gap-4 mt-2">
                <Instagram size={20} />
                <Mail size={20} />
                <MapPin size={20} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};