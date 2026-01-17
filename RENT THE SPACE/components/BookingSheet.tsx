import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: string;
}

export const BookingSheet: React.FC<BookingSheetProps> = ({ isOpen, onClose, initialType }) => {
  // Construct a mock GHL URL based on the selected type to demonstrate pre-selection logic
  // In a real scenario, this might map specific duration IDs to GHL calendar IDs
  const calendarUrl = `https://api.gohighlevel.com/widget/booking/calendar_id?duration=${encodeURIComponent(initialType)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] bg-cream z-[80] shadow-2xl flex flex-col border-l border-charcoal/10"
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-charcoal/10 flex justify-between items-center bg-white/50 backdrop-blur z-10">
              <div>
                <h2 className="font-serif text-xl md:text-2xl text-charcoal">Book Your Session</h2>
                <p className="text-xs md:text-sm text-charcoal/60 mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Live Availability: <span className="font-semibold capitalize">{initialType.replace('-', ' ')}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                 <button 
                    onClick={() => window.open(calendarUrl, '_blank')}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors hidden sm:block"
                    title="Open in new tab"
                 >
                    <ExternalLink size={20} className="text-charcoal/60" />
                 </button>
                 <button 
                    onClick={onClose} 
                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                 >
                    <X size={24} />
                 </button>
              </div>
            </div>

            {/* Calendar Iframe Container */}
            <div className="flex-1 w-full bg-white relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center text-charcoal/20 z-0">
                  <div className="text-center animate-pulse">
                      <p className="font-serif italic text-lg mb-2">Loading Calendar...</p>
                      <p className="text-xs uppercase tracking-widest">Secure Connection</p>
                  </div>
               </div>
               
               {/* 
                 NOTE: Replace 'src' below with your actual GoHighLevel Calendar Embed URL. 
                 You can also dynamically change the src based on 'initialType' prop if you have different calendars for different durations.
               */}
               <iframe 
                 src="https://link.gohighlevel.com/widget/booking/YOUR_CALENDAR_ID" 
                 style={{ width: '100%', height: '100%', border: 'none' }} 
                 className="relative z-10 w-full h-full"
                 title="Booking Calendar"
                 id="ghl-booking-calendar"
               />
            </div>
            
            <div className="p-4 bg-charcoal/5 text-center text-[10px] text-charcoal/40 uppercase tracking-widest border-t border-charcoal/5">
                Powered by Studio 404 Booking System
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};