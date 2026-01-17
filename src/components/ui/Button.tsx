import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'outline' | 'text' | 'ghost';
    fullWidth?: boolean;
    className?: string;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    icon,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-xs font-medium tracking-widest uppercase transition-all duration-300 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variants: Record<string, string> = {
        primary: "bg-charcoal text-cream hover:bg-opacity-90 active:scale-[0.98]",
        outline: "border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream active:scale-[0.98]",
        text: "text-charcoal hover:opacity-70 underline-offset-4 hover:underline p-0",
        ghost: "text-charcoal hover:opacity-70 border-b border-transparent hover:border-charcoal p-0"
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
            {...props}
        >
            {children}
            {icon && <span className="ml-2">{icon}</span>}
        </button>
    );
};

export default Button;
