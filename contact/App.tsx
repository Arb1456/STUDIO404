import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ContactPage from './ContactPage';
import { Menu } from './components/Menu';
import { BookingSheet } from './components/BookingSheet';
import { BookingType } from './types';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Global booking handler
  const handleBook = (type: BookingType) => {
    console.log(`Opening booking sheet for: ${type}`);
    setIsBookingOpen(true);
    setIsMenuOpen(false); // Close menu if it was open (simulated)
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Toggle full screen menu");
    // In a full implementation, this would toggle a FullScreenMenu component overlay
  };

  return (
    <Router>
      <div className="min-h-screen bg-cream text-charcoal font-sans selection:bg-charcoal selection:text-cream">
        
        {/* Main Content Area */}
        <Routes>
          {/* For this demo, we redirect root to contact to show the specific task, 
              but typically Home would be separate. */}
          <Route path="/" element={<Navigate to="/contact" replace />} />
          <Route 
            path="/contact" 
            element={<ContactPage onBook={handleBook} />} 
          />
        </Routes>

        {/* Global Floating Elements */}
        <Menu onBook={handleBook} onToggleMenu={handleToggleMenu} />
        <BookingSheet isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      </div>
    </Router>
  );
}

export default App;