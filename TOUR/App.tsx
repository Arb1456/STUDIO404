import React, { useState } from 'react';
import { StudioTour } from './components/StudioTour';
import { BookingSheet } from './components/BookingSheet';
import { Navigation } from './components/Navigation';

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  return (
    <div className="bg-cream text-charcoal min-h-screen">
      {/* 
        In a real routing scenario, we would use a Router here.
        Since the request focuses on the Studio Tour page within a "full website" context,
        We render the Tour as the primary view.
      */}
      
      <main>
        <StudioTour onBook={handleOpenBooking} />
      </main>

      <Navigation onBook={handleOpenBooking} />
      
      <BookingSheet 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
      />
    </div>
  );
};

export default App;