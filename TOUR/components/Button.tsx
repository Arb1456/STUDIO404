import React from 'react';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300 ease-out font-sans font-medium";
  
  const variants = {
    primary: "bg-charcoal text-cream hover:bg-opacity-90 border border-charcoal",
    outline: "bg-transparent text-charcoal border border-charcoal hover:bg-charcoal hover:text-cream",
    ghost: "bg-transparent text-charcoal border-b border-charcoal/30 hover:border-charcoal pb-1 px-0 py-0",
  };

  const widthStyles = fullWidth ? "w-full flex justify-center" : "inline-block";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};