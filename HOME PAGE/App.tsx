import React, { useState } from 'react';
import Hero from './components/Hero';
import Availability from './components/Availability';
import InsideStudio from './components/InsideStudio';
import Features from './components/Features';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import BookingSheet from './components/BookingSheet';
import VoiceWidget from './components/VoiceWidget';
import { SectionWrapper } from './components/ui/SectionWrapper';
import { BookingType } from './types';

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<BookingType>(null);

  const handleBook = (type: BookingType) => {
    setBookingType(type);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-cream">
      {/* Main Scroll Container */}
      <main className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar relative z-10">
        <SectionWrapper id="home">
            <Hero />
        </SectionWrapper>
        <SectionWrapper id="availability">
             <Availability />
        </SectionWrapper>
        <SectionWrapper id="inside">
            <InsideStudio />
        </SectionWrapper>
        <SectionWrapper id="cyc">
            <Features />
        </SectionWrapper>
        <SectionWrapper id="gallery">
             <Gallery />
        </SectionWrapper>
        <SectionWrapper id="faq">
             <FAQ />
        </SectionWrapper>
        {/* Contact handles its own SectionWrappers internally due to multi-section mobile layout */}
        <div id="contact">
            <Contact />
        </div>
      </main>

      {/* Fixed Navigation & Overlays */}
      <Navigation onBook={() => handleBook('rental')} />
      <VoiceWidget />
      
      <BookingSheet 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        type={bookingType}
      />
    </div>
  );
};

export default App;