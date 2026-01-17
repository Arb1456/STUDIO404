import React from 'react';
import { NavProps } from '../types';
import { Reveal } from '../components/Reveal';
import { Button } from '../components/Button';

const HomePage: React.FC<Pick<NavProps, 'onBook'>> = ({ onBook }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
         <div className="absolute inset-0 z-0">
             {/* Abstract light leak background similar to screenshot 1 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F2EFE9] via-[#F2EFE9]/50 to-[#D2B48C]/20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-100 rounded-full blur-[100px] opacity-40"></div>
        </div>

      <div className="relative z-10 text-center max-w-4xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] mb-6 opacity-60">Ottawa's Premier Production Space</p>
          <h1 className="text-7xl md:text-9xl mb-8">
            Create <br/> <span className="italic-serif">Without Limits</span>
          </h1>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <Button variant="primary" onClick={() => onBook('rental')}>Rent The Studio</Button>
            <Button variant="outline" onClick={() => onBook('photoshoot')}>Book A Photoshoot</Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default HomePage;