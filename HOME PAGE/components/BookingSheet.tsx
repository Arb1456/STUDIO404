import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { BookingType } from '../types';

interface BookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  type: BookingType;
}

const BookingSheet: React.FC<BookingSheetProps> = ({ isOpen, onClose, type }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 h-[85vh] bg-charcoal z-[80] rounded-t-3xl overflow-hidden flex flex-col shadow-2xl border-t border-white/10"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-charcoal">
              <div>
                <h3 className="text-cream font-serif text-2xl italic">
                    {type === 'rental' ? 'Rent the Studio' : 'Book a Photoshoot'}
                </h3>
                <p className="text-cream/50 font-sans text-xs uppercase tracking-widest mt-1">
                    Via GoHighLevel Secure Booking
                </p>
              </div>
              <button 
                onClick={onClose}
                className="text-cream p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 bg-white relative w-full h-full overflow-hidden">
                {/* Simulated Loading State / Placeholder for GHL Widget */}
                <div className="absolute inset-0 flex items-center justify-center text-charcoal/40 bg-gray-100 z-0">
                    <div className="text-center p-8">
                        <p className="font-serif text-xl mb-2">Loading Booking Engine...</p>
                        <div className="w-8 h-8 border-2 border-charcoal border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                </div>
                
                {/* 
                   In a real implementation, the GHL iframe goes here.
                   Using a placeholder iframe for demo purposes.
                */}
                <iframe 
                    src="https://www.bing.com" 
                    title="Booking Widget"
                    className="w-full h-full relative z-10 opacity-95"
                />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingSheet;