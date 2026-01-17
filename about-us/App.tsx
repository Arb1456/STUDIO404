import React, { useState } from 'react';
import AboutPage from './pages/AboutPage';
import { Menu } from './components/Menu';
import { BookingType } from './types';
import { X } from 'lucide-react';

export default function App() {
  const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false);
  const [bookingType, setBookingType] = useState<BookingType | null>(null);

  const handleBook = (type: BookingType) => {
    setBookingType(type);
    setIsBookingSheetOpen(true);
  };

  return (
    <div className="relative">
      {/* 
        AboutPage functions as the "Guts". 
        Navigation is handled at this App level to satisfy architectural constraints.
      */}
      <AboutPage onBook={handleBook} />
      
      {/* Global Menu Component (Fixed Bottom) */}
      <Menu onBook={handleBook} />

      {/* Mock Booking Sheet Overlay */}
      {isBookingSheetOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-cream w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
            <div className="p-6 flex justify-between items-center border-b border-charcoal/10">
              <h3 className="font-serif text-2xl text-charcoal">
                {bookingType === 'rental' ? 'Rent the Studio' : 
                 bookingType === 'tour' ? 'Book a Tour' : 'Book a Session'}
              </h3>
              <button 
                onClick={() => setIsBookingSheetOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={24} className="text-charcoal" />
              </button>
            </div>
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-charcoal text-cream rounded-full flex items-center justify-center mx-auto text-2xl font-serif italic">
                404
              </div>
              <p className="text-charcoal/70">
                This is a mock booking sheet triggered by the <span className="font-mono text-xs bg-charcoal/10 px-1 py-0.5 rounded">onBook('{bookingType}')</span> event.
              </p>
              <div className="pt-4">
                <button 
                  onClick={() => setIsBookingSheetOpen(false)}
                  className="w-full bg-charcoal text-cream py-4 rounded-lg font-medium hover:bg-black transition-colors"
                >
                  Continue to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
