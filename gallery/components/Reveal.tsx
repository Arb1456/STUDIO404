import React, { useEffect, useRef, useState } from 'react';
import { RevealProps } from '../types';

export const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const transitionStyle = {
    transitionDuration: '800ms',
    transitionDelay: `${delay}ms`,
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'cubic-bezier(0.2, 0.65, 0.3, 0.9)',
  };

  return (
    <div
      ref={ref}
      style={transitionStyle}
      className={`transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};
