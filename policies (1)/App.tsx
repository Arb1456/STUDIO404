import React, { useState } from 'react';
import Policies from './pages/Policies';
import { Menu, X } from 'lucide-react';
import { Reveal } from './components/Reveal';

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock Navigation Handler
  const handleNavigate = (page: string) => {
    console.log(`Navigating to ${page}`);
  };

  // Global Booking Logic
  const handleBook = (type: string) => {
    console.log(`Opening Booking Sheet for: ${type}`);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-cream text-charcoal font-sans selection:bg-charcoal selection:text-cream">
      
      {/* Mock Header/Nav Area (Visual only per constraints) */}
      <nav className="fixed top-0 left-0 w-full p-6 z-40 flex justify-between items-center mix-blend-difference text-cream pointer-events-none">
        <div className="uppercase font-bold tracking-widest text-sm pointer-events-auto">Studio 404</div>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest pointer-events-auto">
          <span className="cursor-pointer hover:opacity-50">Rental</span>
          <span className="cursor-pointer hover:opacity-50">Equipment</span>
          <span className="cursor-pointer underline decoration-1 underline-offset-4">Policies</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="w-full">
        <Policies onBook={handleBook} onNavigate={handleNavigate} />
      </main>

      {/* Floating Menu Button (Sticky Bottom) */}
      <div className="fixed bottom-6 left-0 w-full flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
             <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-charcoal text-cream px-6 py-3 rounded-full uppercase text-xs font-bold tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
              >
                {isMenuOpen ? <X size={14} /> : <Menu size={14} />}
                {isMenuOpen ? 'Close' : 'Menu'}
              </button>
        </div>
      </div>

      {/* Mock Booking Sheet Overlay */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream p-8 max-w-md w-full rounded shadow-xl relative">
            <button 
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 text-charcoal hover:opacity-50"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Booking Sheet</h2>
            <p className="mb-6 text-sm opacity-80">This is a mock of the global booking sheet.</p>
            <div className="space-y-4">
              <div className="p-4 border border-charcoal/20">
                <p className="font-bold">Rental Selection</p>
                <p className="text-sm">Studio 404 Main Stage</p>
              </div>
              <button className="w-full bg-charcoal text-cream py-3 uppercase text-xs font-bold tracking-widest">
                Confirm Availability
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;