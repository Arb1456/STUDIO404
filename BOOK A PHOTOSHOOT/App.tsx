import React, { useState } from 'react';
import PhotoshootPage from './PhotoshootPage';
import { FloatingMenu } from './components/FloatingMenu';
import { MenuOverlay } from './components/MenuOverlay';
import { BookingSheet } from './components/BookingSheet';
import { BookingType } from './types';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<BookingType | null>(null);

  const handleBook = (type: BookingType) => {
    setBookingType(type);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal font-sans selection:bg-charcoal selection:text-cream">
      {/* 
        This is the "Shell". Ideally, a router would switch the content here.
        For this task, we directly render the PhotoshootPage as the main content.
      */}
      <main>
        <PhotoshootPage onBook={handleBook} />
      </main>

      {/* Global Persistent Elements */}
      <FloatingMenu 
        onMenuClick={() => setIsMenuOpen(true)} 
        onBookClick={() => handleBook('rental')}
      />

      {/* Global Overlays */}
      <MenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
      
      <BookingSheet 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        type={bookingType}
      />
    </div>
  );
};

export default App;