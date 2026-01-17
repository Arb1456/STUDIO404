import React from 'react';
import { ButtonProps } from '../types';
import { ArrowRight } from 'lucide-react';

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "uppercase tracking-widest text-xs font-medium py-4 px-8 transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-[#262626] text-[#F2EFE9] hover:bg-opacity-90",
    outline: "border border-[#262626] text-[#262626] hover:bg-[#262626] hover:text-[#F2EFE9]",
    text: "text-[#262626] border-b border-[#262626] px-0 py-1 hover:opacity-70"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {variant === 'text' && <ArrowRight size={14} />}
    </button>
  );
};