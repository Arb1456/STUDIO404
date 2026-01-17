import React, { useState } from 'react';
import { Page } from './types';
import { FloatingMenu } from './components/FloatingMenu';
import HomePage from './pages/HomePage';
import EquipmentPage from './pages/EquipmentPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.EQUIPMENT); // Default to Equipment for this demo

  const handleNavigate = (page: Page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  const handleBook = (type: 'rental' | 'photoshoot') => {
    console.log(`Booking initiated for: ${type}`);
    alert(`Booking Modal for ${type} would open here.`);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <HomePage onBook={handleBook} />;
      case Page.EQUIPMENT:
        return <EquipmentPage onBook={handleBook} />;
      default:
        return <HomePage onBook={handleBook} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EFE9] text-[#262626] relative selection:bg-[#262626] selection:text-[#F2EFE9]">
      
      {/* Main Content Area */}
      <main className="w-full">
        {renderPage()}
      </main>

      {/* Persistent Navigation */}
      <FloatingMenu 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        onBook={handleBook} 
      />
    </div>
  );
};

export default App;