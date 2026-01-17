import React from 'react';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-4 uppercase tracking-widest text-xs font-medium transition-all duration-300 ease-out border";
  
  const variants = {
    primary: "bg-charcoal text-cream border-charcoal hover:bg-transparent hover:text-charcoal",
    secondary: "bg-cream text-charcoal border-charcoal hover:bg-charcoal hover:text-cream",
    outline: "bg-transparent text-charcoal border-charcoal hover:bg-charcoal hover:text-cream"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};