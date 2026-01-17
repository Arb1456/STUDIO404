import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50";
  
  const variants = {
    primary: "bg-charcoal text-cream hover:bg-charcoal/80 hover:scale-[1.02]",
    outline: "border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream"
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : 'w-auto'} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};