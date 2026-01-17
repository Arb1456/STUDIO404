import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavProps, Page } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingMenu: React.FC<NavProps> = ({ currentPage, onNavigate, onBook }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#F2EFE9] z-50 flex flex-col justify-center items-center p-8"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full border border-[#262626]/20 hover:bg-[#262626] hover:text-[#F2EFE9] transition-colors"
            >
              <X size={24} />
            </button>

            <div className="space-y-6 text-center">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-8">Studio 404</p>
              
              {[
                { label: 'Home', value: Page.HOME },
                { label: 'Equipment & Amenities', value: Page.EQUIPMENT },
                { label: 'Gallery', value: Page.GALLERY },
              ].map((item) => (
                <div key={item.value} className="overflow-hidden">
                  <button 
                    onClick={() => {
                      onNavigate(item.value);
                      setIsMenuOpen(false);
                    }}
                    className="text-4xl md:text-5xl font-serif text-[#262626] hover:italic transition-all"
                  >
                    {item.label}
                  </button>
                </div>
              ))}
              
               <div className="pt-8">
                  <button 
                    onClick={() => {
                        onBook('rental');
                        setIsMenuOpen(false);
                    }}
                    className="bg-[#262626] text-[#F2EFE9] px-8 py-4 uppercase tracking-widest text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    Book Now
                  </button>
               </div>
            </div>

            <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-50">
               <p className="text-sm">Ottawa, ON • Est. 2024</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Header Menu Button */}
      <div className="fixed top-6 right-6 z-40">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group border border-[#262626]/5"
        >
          <Menu size={20} className="text-[#262626]" />
        </button>
      </div>
    </>
  );
};