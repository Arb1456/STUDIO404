import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-charcoal text-cream hover:bg-black border border-charcoal",
    secondary: "bg-cream text-charcoal border border-charcoal hover:bg-[#E8E4DC]",
    outline: "bg-transparent text-charcoal border border-charcoal hover:bg-charcoal hover:text-cream"
  };

  const widthClass = fullWidth ? "w-full" : "w-auto";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};