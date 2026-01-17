import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingSheet: React.FC<BookingSheetProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-cream z-[70] p-8 md:p-12 overflow-y-auto shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-start mb-12">
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
                Availability
              </h2>
              <button 
                onClick={onClose}
                className="p-2 bg-black/5 rounded-full hover:bg-black/10 transition-colors"
              >
                <X size={24} className="text-charcoal" />
              </button>
            </div>

            <div className="space-y-8">
              <div className="group cursor-pointer relative overflow-hidden h-64 w-full bg-gray-200">
                <img 
                  src="https://picsum.photos/800/600?random=99" 
                  alt="Studio Rental" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-3xl text-white mb-2">Studio Rental</h3>
                  <div className="flex justify-between items-center text-white/90 border-t border-white/30 pt-4">
                    <span className="text-xs uppercase tracking-widest">View Calendar</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer relative overflow-hidden h-64 w-full bg-gray-200">
                <img 
                  src="https://picsum.photos/800/600?random=98" 
                  alt="Creative Photoshoots" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-3xl text-white mb-2">Creative Photoshoots</h3>
                  <div className="flex justify-between items-center text-white/90 border-t border-white/30 pt-4">
                    <span className="text-xs uppercase tracking-widest">Book Session</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-12 text-center">
                <p className="font-serif italic text-charcoal/60">Studio 404 &mdash; Ottawa, ON</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};