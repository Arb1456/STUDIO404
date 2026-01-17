import React, { useState } from 'react';
import { Menu as MenuIcon, Phone, X, ArrowRight, Instagram, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookingProps } from '../../types';

export const Menu: React.FC<BookingProps> = ({ onBook }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: 'Studio Rental', href: '#' },
    { label: 'Photoshoots', href: '#' },
    { label: 'Studio Tour', href: '#' },
    { label: 'Cyclorama Wall', href: '#' },
    { label: 'Equipment + Amenities', href: '#' },
    { label: 'Gallery', href: '#' },
    { label: 'About Us', italic: true },
    { label: 'Rates', href: '#' },
    { label: 'Policies + FAQ', href: '#' },
  ];

  return (
    <>
      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center bg-charcoal text-cream rounded-full px-1 py-1 shadow-2xl w-full max-w-sm sm:max-w-md backdrop-blur-sm bg-opacity-95">
          
          <button 
            onClick={toggleMenu}
            className="flex items-center gap-2 px-6 py-4 rounded-full hover:bg-white/10 transition-colors"
          >
            <MenuIcon size={18} />
            <span className="text-xs uppercase tracking-widest font-medium">Menu</span>
          </button>

          <button 
            onClick={() => onBook('rental')}
            className="flex-1 text-center font-serif italic text-lg hover:text-white/80 transition-colors"
          >
            Book Now
          </button>

          <button className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-colors">
            <Phone size={18} />
          </button>
        </div>
      </div>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-cream text-charcoal flex flex-col overflow-y-auto"
          >
            <div className="p-6 flex justify-between items-center border-b border-charcoal/5">
              <span className="font-serif text-lg">Studio 404</span>
              <button onClick={toggleMenu} className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 px-6 py-12 flex flex-col items-start gap-6 max-w-2xl mx-auto w-full">
              {menuItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={toggleMenu}
                  className={`text-3xl sm:text-4xl hover:opacity-60 transition-opacity ${item.italic ? 'font-serif italic' : 'font-serif'}`}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="p-6 bg-beige/30 mt-auto">
              <div className="max-w-2xl mx-auto w-full space-y-4">
                 <div className="flex items-center gap-4 text-xs tracking-widest uppercase opacity-60 mb-4">
                   <span>Ottawa, ON</span>
                   <span>•</span>
                   <span>EST. 2024</span>
                 </div>
                 
                 <div className="space-y-3 font-light text-sm">
                    <a href="#" className="flex items-center gap-3 hover:underline">
                      <Mail size={16} /> hello@studio404.com
                    </a>
                    <a href="#" className="flex items-center gap-3 hover:underline">
                      <MapPin size={16} /> 404 Creative Blvd, Ottawa
                    </a>
                    <a href="#" className="flex items-center gap-3 hover:underline">
                      <Instagram size={16} /> @studio.404
                    </a>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};