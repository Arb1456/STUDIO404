import React, { useState } from 'react';
import { StudioRentalPage } from './pages/StudioRentalPage';
import { Layout } from './components/layout/Layout';
import { BookingSheet } from './components/BookingSheet';

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<string>('rental');

  const handleBook = (type: string = 'rental') => {
    setBookingType(type);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="antialiased text-charcoal bg-cream min-h-screen font-sans selection:bg-charcoal selection:text-cream">
      <Layout onBook={handleBook}>
        <StudioRentalPage onBook={handleBook} />
      </Layout>

      <BookingSheet 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
        initialType={bookingType}
      />
    </div>
  );
};

export default App;