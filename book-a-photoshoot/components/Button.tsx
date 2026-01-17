import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300 uppercase border border-charcoal";
  
  const variants = {
    primary: "bg-charcoal text-cream hover:bg-transparent hover:text-charcoal",
    outline: "bg-transparent text-charcoal hover:bg-charcoal hover:text-cream",
    ghost: "border-transparent hover:opacity-70",
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};