import React, { useState } from 'react';
import GalleryPage from './components/GalleryPage';
import { BookingType } from './types';
import { Menu, Phone, X } from 'lucide-react';

const App: React.FC = () => {
  const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false);
  const [bookingType, setBookingType] = useState<BookingType>('rental');

  const handleBook = (type: BookingType) => {
    setBookingType(type);
    setIsBookingSheetOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#F2EFE9] font-sans selection:bg-[#262626] selection:text-[#F2EFE9]">
      
      {/* 
        This is the main routing outlet. 
        In a real app, this would be <Outlet /> or <Switch>.
        Here we render the requested GalleryPage directly.
      */}
      <main>
        <GalleryPage onBook={handleBook} />
      </main>

      {/* Global Persistent Floating Menu (As requested in prompt to match images) */}
      <div className="fixed bottom-8 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-[#262626] text-[#F2EFE9] rounded-full px-6 py-3 flex items-center gap-8 md:gap-12 shadow-2xl transform transition-transform hover:scale-[1.02] cursor-pointer group">
          
          {/* Menu Trigger */}
          <div className="flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
            <Menu size={20} strokeWidth={1.5} />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">Menu</span>
          </div>

          {/* Center Brand / CTA */}
          <div className="font-serif italic text-lg md:text-xl pr-1">
            Book Now
          </div>

          {/* Phone Action */}
          <div className="flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
            <Phone size={18} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Mock Booking Sheet Overlay */}
      {isBookingSheetOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsBookingSheetOpen(false)}
          />
          <div className="relative w-full max-w-md h-full bg-[#F2EFE9] shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right duration-500">
            <button 
              onClick={() => setIsBookingSheetOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <X size={24} className="text-[#262626]" />
            </button>
            
            <h2 className="font-serif text-4xl text-[#262626] mb-2 mt-12">
              {bookingType === 'rental' ? 'Studio Rental' : 'Creative Session'}
            </h2>
            <p className="text-[#262626]/60 mb-8">Let's get you on the calendar.</p>
            
            {/* Mock Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#262626]/50 mb-2">Name</label>
                <input type="text" className="w-full bg-transparent border-b border-[#262626]/20 py-2 focus:outline-none focus:border-[#262626]" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#262626]/50 mb-2">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-[#262626]/20 py-2 focus:outline-none focus:border-[#262626]" placeholder="jane@example.com" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#262626]/50 mb-2">Date Preference</label>
                <input type="date" className="w-full bg-transparent border-b border-[#262626]/20 py-2 focus:outline-none focus:border-[#262626]" />
              </div>
              
              <button className="w-full bg-[#262626] text-[#F2EFE9] py-4 uppercase tracking-widest text-xs font-bold mt-8 hover:opacity-90 transition-opacity">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
