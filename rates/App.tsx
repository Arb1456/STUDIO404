import React, { useState, useEffect } from 'react';
import RatesPage from './RatesPage';
import { BookingType } from './types';
import { Button } from './components/Button';
import { X, Menu } from 'lucide-react';
import { Reveal } from './components/Reveal';

// Mock components for other pages to ensure App compiles
const HomePage = () => <div className="pt-32 px-12 text-center font-serif text-4xl">Home Page Placeholder</div>;
const TourPage = () => <div className="pt-32 px-12 text-center font-serif text-4xl">Tour Page Placeholder</div>;
const GalleryPage = () => <div className="pt-32 px-12 text-center font-serif text-4xl">Gallery Page Placeholder</div>;

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<BookingType>('rental');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simple router logic since we can't use React Router DOM in this environment
  const navigate = (path: string) => {
    setCurrentPath(path);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleBook = (type: BookingType) => {
    setBookingType(type);
    setIsBookingOpen(true);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/': return <HomePage />;
      case '/rates': return <RatesPage onBook={handleBook} onNavigate={navigate} />;
      case '/tour': return <TourPage />;
      case '/gallery': return <GalleryPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-cream font-sans text-charcoal selection:bg-charcoal selection:text-cream">
      
      {/* Global Header (Mock) */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-cream pointer-events-none">
        <div className="pointer-events-auto cursor-pointer font-serif text-2xl font-bold tracking-tight" onClick={() => navigate('/')}>
          STUDIO 404
        </div>
        {/* Only showing menu button for desktop visual, actual menu would be complex */}
      </header>

      {/* Main Content Area */}
      <main>
        {renderPage()}
      </main>

      {/* Global Menu Button (Bottom) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-charcoal text-cream rounded-full px-6 py-3 flex items-center gap-4 shadow-2xl cursor-pointer hover:scale-105 transition-transform">
           <Menu size={20} onClick={() => setIsMenuOpen(!isMenuOpen)} />
           <span className="font-serif italic pr-4 border-r border-cream/20" onClick={() => handleBook('rental')}>Book Now</span>
           <span onClick={() => setIsMenuOpen(!isMenuOpen)}>Menu</span>
        </div>
      </div>

      {/* Mock Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-charcoal text-cream z-50 flex flex-col justify-center items-center p-8">
           <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 p-2">
             <X size={32} />
           </button>
           <nav className="flex flex-col gap-8 text-center font-serif text-3xl md:text-5xl">
             <button onClick={() => navigate('/')} className="hover:italic hover:opacity-70 transition-all">Home</button>
             <button onClick={() => navigate('/rates')} className="hover:italic hover:opacity-70 transition-all">Rates</button>
             <button onClick={() => navigate('/tour')} className="hover:italic hover:opacity-70 transition-all">Tour</button>
             <button onClick={() => navigate('/gallery')} className="hover:italic hover:opacity-70 transition-all">Gallery</button>
           </nav>
        </div>
      )}

      {/* Global Booking Sheet (Overlay) */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-cream h-full shadow-2xl p-8 overflow-y-auto animate-slide-in">
             <div className="flex justify-between items-center mb-12">
               <h2 className="font-serif text-3xl">Book {bookingType === 'rental' ? 'Studio' : 'Session'}</h2>
               <button onClick={() => setIsBookingOpen(false)} className="p-2 hover:bg-charcoal/5 rounded-full">
                 <X size={24} />
               </button>
             </div>
             
             <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Full Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-charcoal/30 py-2 focus:outline-none focus:border-charcoal transition-colors" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Email</label>
                  <input type="email" className="w-full bg-transparent border-b border-charcoal/30 py-2 focus:outline-none focus:border-charcoal transition-colors" placeholder="jane@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Date</label>
                  <input type="date" className="w-full bg-transparent border-b border-charcoal/30 py-2 focus:outline-none focus:border-charcoal transition-colors" />
                </div>
                
                <div className="pt-8">
                  <Button className="w-full" onClick={() => alert("Integration with Booking Provider...")}>
                    Continue to Payment
                  </Button>
                </div>
             </form>
          </div>
        </div>
      )}

      {/* Add keyframes for slide-in animation */}
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;