import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { BookingType } from '../types';

interface BookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  type: BookingType | null;
}

export const BookingSheet: React.FC<BookingSheetProps> = ({ isOpen, onClose, type }) => {
  const getTitle = () => {
    switch(type) {
      case 'photoshoot': return 'Book a Session';
      case 'rental': return 'Book the Studio';
      case 'contact': return 'Discuss Your Project';
      case 'tour': return 'Book a Tour';
      default: return 'Book Now';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-cream z-[51] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-charcoal/10">
              <h2 className="font-serif text-2xl italic">
                {getTitle()}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <X />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {type === 'contact' ? (
                // Contact Form View
                <div className="space-y-6">
                   <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center gap-3 text-charcoal/60 mb-6">
                        <MessageSquare size={20} />
                        <span className="text-sm uppercase tracking-wide">Tell us about your needs</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Full Name</label>
                          <input type="text" className="w-full bg-cream border border-charcoal/10 p-3 outline-none focus:border-charcoal transition-colors" placeholder="Jane Doe" />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Email Address</label>
                          <input type="email" className="w-full bg-cream border border-charcoal/10 p-3 outline-none focus:border-charcoal transition-colors" placeholder="jane@example.com" />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Phone Number</label>
                          <input type="tel" className="w-full bg-cream border border-charcoal/10 p-3 outline-none focus:border-charcoal transition-colors" placeholder="(555) 123-4567" />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-2">Project Details</label>
                          <textarea className="w-full bg-cream border border-charcoal/10 p-3 h-32 outline-none focus:border-charcoal transition-colors resize-none" placeholder="I'm looking to book a commercial shoot for..." />
                        </div>
                      </div>
                   </div>
                   
                   <p className="text-xs text-charcoal/60 leading-relaxed px-2">
                     Our team typically responds within 2 hours during business days. We can help clarify specific requirements before you book.
                   </p>
                </div>
              ) : (
                // Standard Booking View
                <>
                  <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <div className="flex items-center gap-3 text-charcoal/60 mb-4">
                      <Calendar size={20} />
                      <span className="text-sm uppercase tracking-wide">Select a Date</span>
                    </div>
                    {/* Mock Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
                      {['S','M','T','W','T','F','S'].map(d => <span key={d} className="font-bold text-xs">{d}</span>)}
                      {Array.from({length: 31}).map((_, i) => (
                        <button key={i} className={`p-2 rounded hover:bg-charcoal hover:text-white transition-colors ${i === 14 ? 'bg-charcoal text-white' : ''}`}>
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-3 mt-6">
                      {['09:00 AM', '11:00 AM', '02:00 PM'].map(time => (
                        <button key={time} className="w-full py-3 border border-charcoal/20 hover:border-charcoal hover:bg-charcoal hover:text-cream transition-all uppercase text-xs tracking-widest">
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg">Booking Details</h3>
                    <p className="text-charcoal/70 text-sm leading-relaxed">
                      You are booking a {type} slot. A 50% deposit is required to secure your reservation. 
                      Cancellation policy applies within 48 hours of the scheduled time.
                    </p>
                    <div className="flex items-center justify-between py-4 border-t border-b border-charcoal/10">
                      <span>Total</span>
                      <span className="font-serif text-xl">$150.00</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t border-charcoal/10 bg-white/50">
              <button className="w-full bg-charcoal text-cream py-4 flex items-center justify-between px-6 hover:opacity-90 transition-opacity">
                <span className="uppercase tracking-widest text-xs font-medium">
                  {type === 'contact' ? 'Request Call' : 'Confirm Booking'}
                </span>
                {type === 'contact' ? <Phone size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};