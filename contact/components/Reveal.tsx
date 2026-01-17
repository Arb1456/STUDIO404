import React, { useEffect, useRef, useState } from 'react';
import { RevealProps } from '../types';

export const Reveal: React.FC<RevealProps> = ({ children, width = "fit-content", className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${width === "100%" ? "w-full" : "w-fit"} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.8s cubic-bezier(0.2, 0.65, 0.3, 0.9) ${delay}s, transform 0.8s cubic-bezier(0.2, 0.65, 0.3, 0.9) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};