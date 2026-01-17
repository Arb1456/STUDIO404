import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id, className = "" }) => {
  return (
    <div 
        id={id} 
        className={`relative w-full h-screen snap-start overflow-hidden ${className}`}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
};