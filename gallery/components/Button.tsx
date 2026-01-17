import React from 'react';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "uppercase tracking-widest text-xs font-semibold py-4 px-8 transition-all duration-300 ease-out border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#262626]";
  
  const variants = {
    primary: "bg-[#262626] text-[#F2EFE9] border-[#262626] hover:bg-opacity-90",
    secondary: "bg-[#F2EFE9] text-[#262626] border-[#262626] hover:bg-[#E5E2DC]",
    outline: "bg-transparent text-[#262626] border-[#262626] hover:bg-[#262626] hover:text-[#F2EFE9]",
    ghost: "bg-transparent text-[#262626] border-transparent hover:bg-black/5"
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
