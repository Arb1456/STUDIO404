import React from 'react';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  type = 'button',
  icon
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 ease-out border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-charcoal";
  
  const variants = {
    primary: "bg-charcoal text-cream border-charcoal hover:bg-transparent hover:text-charcoal",
    outline: "bg-transparent text-charcoal border-charcoal hover:bg-charcoal hover:text-cream",
    ghost: "bg-transparent text-charcoal border-transparent hover:bg-gray-100/10 underline-offset-4 hover:underline px-0 py-2"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="font-sans font-medium">{children}</span>
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};