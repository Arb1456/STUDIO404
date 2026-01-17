import React from 'react';
import { Reveal } from './ui/Reveal';
import { FEATURES } from '../constants';
import { ArrowRight } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="h-screen w-full snap-start bg-cream text-charcoal flex flex-col justify-center items-center px-6 md:px-12 relative pb-12 pt-[12vh]">
      <div className="max-w-2xl text-center mb-6 md:mb-8">
        <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl mb-2">What's Included?</h2>
        </Reveal>
        <Reveal delay={0.1}>
            <p className="font-sans font-light text-sm md:text-base text-charcoal/80 leading-relaxed max-w-md mx-auto">
            Everything you need to create world-class content. Designed for photographers, by photographers.
            </p>
        </Reveal>
      </div>

      <div className="w-full max-w-4xl border-t border-charcoal/20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
        {FEATURES.map((feature, index) => (
          <Reveal key={index} delay={index * 0.05 + 0.2}>
            <div className="flex items-center justify-center py-3 border-b border-charcoal/20 group cursor-default hover:bg-charcoal/5 transition-colors duration-300">
              <span className="font-serif text-lg md:text-xl italic tracking-wide group-hover:scale-105 transition-transform duration-300 text-center">
                {feature.title}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.6} repeat={true}>
        <div className="mt-6 flex justify-center">
             <a 
              href="/equipment"
              className="inline-flex items-center gap-3 font-serif text-base text-charcoal/90 hover:text-charcoal transition-colors group"
            >
              <span className="border-b border-charcoal/30 pb-1 group-hover:border-charcoal transition-colors">View Full List</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
      </Reveal>
    </section>
  );
};

export default Features;