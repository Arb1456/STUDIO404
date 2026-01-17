import React from 'react';
import { Menu } from './Menu';
import { BookingProps } from '../../types';

interface LayoutProps extends BookingProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, onBook }) => {
  return (
    <div className="relative min-h-screen pb-32">
        {/* Helper Badge (Top Right) mimicking screenshot functionality */}
        <div className="fixed top-6 right-6 z-40 hidden md:flex items-center gap-2">
            <div className="bg-white/90 backdrop-blur rounded-full px-3 py-1.5 shadow-sm text-[10px] text-gray-500 uppercase tracking-wide border border-gray-100">
                Ottawa's Premier Space
            </div>
            <button className="bg-white rounded-full p-2 shadow-sm hover:scale-105 transition-transform">
                <div className="w-5 h-5 bg-gradient-to-tr from-red-500 to-black rounded-full"></div>
            </button>
        </div>

        <main className="w-full">
            {children}
        </main>
        
        <Menu onBook={onBook} />
    </div>
  );
};