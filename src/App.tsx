import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import VoiceWidget from '@/components/layout/VoiceWidget';
import HomePage from '@/pages/HomePage';
import TourPage from '@/pages/TourPage';
import PhotoshootPage from '@/pages/PhotoshootPage';
import RentalPage from '@/pages/RentalPage';
import EquipmentPage from '@/pages/EquipmentPage';
import { BookingType } from '@/types';

const App: React.FC = () => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [bookingType, setBookingType] = useState<BookingType>(null);

    const handleBook = (type: BookingType = 'rental') => {
        setBookingType(type);
        setIsBookingOpen(true);
    };

    const handleCloseBooking = () => {
        setIsBookingOpen(false);
    };

    return (
        <>
            <Layout
                onBook={handleBook}
                isBookingOpen={isBookingOpen}
                onCloseBooking={handleCloseBooking}
                bookingType={bookingType}
            >
                <Routes>
                    <Route path="/" element={<HomePage onBook={handleBook} />} />
                    <Route path="/tour" element={<TourPage onBook={handleBook} />} />
                    <Route path="/photoshoot" element={<PhotoshootPage onBook={handleBook} />} />
                    <Route path="/rental" element={<RentalPage onBook={handleBook} />} />
                    <Route path="/equipment" element={<EquipmentPage onBook={handleBook} />} />
                </Routes>
            </Layout>

            {/* Global ElevenLabs Voice Widget */}
            <VoiceWidget />
        </>
    );
};

export default App;
