'use client';
import React from 'react';

interface TourSlideProps {
    children: React.ReactNode;
    className?: string;
    bgImage?: string;
    bgOverlay?: 'dark' | 'light' | 'gradient-up' | 'gradient-down' | 'none';
    theme?: 'dark' | 'light';
}

export const TourSlide: React.FC<TourSlideProps> = ({
    children,
    className = '',
    bgImage,
    bgOverlay = 'none',
    theme = 'light'
}) => {
    const overlayStyles = {
        dark: 'bg-black/60',
        light: 'bg-white/40',
        'gradient-up': 'bg-gradient-to-t from-charcoal via-transparent to-transparent',
        'gradient-down': 'bg-gradient-to-b from-charcoal via-transparent to-transparent',
        none: ''
    };

    const themeStyles = {
        dark: 'bg-charcoal text-cream',
        light: 'bg-cream text-charcoal'
    };

    return (
        <div
            className={`
                min-w-full h-full snap-start snap-always flex-shrink-0 relative
                ${themeStyles[theme]}
                ${className}
            `}
        >
            {/* Background Image Layer */}
            {bgImage && (
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                    {bgOverlay !== 'none' && (
                        <div className={`absolute inset-0 ${overlayStyles[bgOverlay]}`} />
                    )}
                </>
            )}

            {/* Content Layer - with responsive padding for mobile */}
            <div className="relative z-10 h-full w-full flex flex-col justify-center pb-24 md:pb-20">
                {children}
            </div>
        </div>
    );
};
