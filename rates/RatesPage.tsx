import React from 'react';
import { ArrowRight, Check, Calendar, Clock, Lock, Sparkles, Wifi, Car, Zap, Camera, Aperture, Armchair, Layers } from 'lucide-react';
import { Reveal } from './components/Reveal';
import { Button } from './components/Button';
import { Accordion } from './components/Accordion';
import { PricingTier, PackageTier, BookingType } from './types';

interface RatesPageProps {
  onBook: (type: BookingType) => void;
  onNavigate: (path: string) => void;
}

const RatesPage: React.FC<RatesPageProps> = ({ onBook, onNavigate }) => {
  
  const rentalRates: PricingTier[] = [
    {
      duration: "1 Hour",
      price: 70,
      label: "The Quick Rental",
      description: "Perfect for headshots, quick product updates, or casting calls.",
    },
    {
      duration: "2 Hours",
      price: 120,
      label: "Standard Rental",
      description: "Our most popular option. Ideal for portraits and content creation.",
      popular: true,
    },
    {
      duration: "Half Day",
      price: 225,
      label: "4 Hour Block",
      description: "Ample time for editorial work, small brand shoots, or lookbooks.",
    },
    {
      duration: "Full Day",
      price: 400,
      label: "8 Hour Access",
      description: "Full access for large scale productions, commercial campaigns, and teams.",
    },
  ];

  const photoPackages: PackageTier[] = [
    { name: "Portrait", price: 225, description: "Professional lighting and direction for individuals." },
    { name: "Family", price: 250, description: "Timeless captures for your loved ones." },
    { name: "Newborn", price: 250, description: "Gentle, patient sessions for the newest arrivals." },
    { name: "Birthday Session", price: 275, description: "Celebrate your milestone with a fun, styled commemorative shoot." },
  ];

  const inclusions = [
    { icon: <Zap size={20} />, text: "Professional Lighting Equipment" },
    { icon: <Sparkles size={20} />, text: "12' x 10' x 10' Cyclorama Wall" },
    { icon: <Layers size={20} />, text: "Seamless Paper Backdrops" },
    { icon: <Armchair size={20} />, text: "Studio Props & Furniture" },
    { icon: <Wifi size={20} />, text: "High-Speed Fiber Internet" },
    { icon: <Car size={20} />, text: "Dedicated Client Parking" },
    { icon: <Lock size={20} />, text: "Private Changing Area" },
  ];

  const faqs = [
    {
      question: "What happens if I go over my booked time?",
      answer: "We understand creative flow. If there isn't a booking immediately following yours, you can extend your session at the standard hourly rate. However, to respect all creators, unapproved overages are billed at 3x the hourly rate."
    },
    {
      question: "Is lighting equipment included in the rental?",
      answer: "Absolutely. We believe in transparency. Your rental includes full access to our strobe and constant lighting, grip gear, C-stands, reflectors, modifiers, etc."
    },
    {
      question: "Do you require a deposit?",
      answer: "To secure your slot on our calendar, we require full payment at the time of booking. Cancellations made 48 hours in advance are eligible for a full refund or rescheduling credit."
    },
    {
      question: "Can I host an event here?",
      answer: "Yes. The studio transforms beautifully for workshops, intimate launches, and networking events. Please contact us directly for event-specific pricing and capacity details."
    }
  ];

  return (
    <div className="min-h-screen bg-cream text-charcoal pt-24 pb-32">
      
      {/* S1: Hero Section */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto text-center">
        <Reveal width="100%" className="flex flex-col items-center">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight">
            Studio Rental Rates
          </h1>
          <p className="font-sans text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Clear, all-inclusive pricing designed to support creators of all levels. 
            No hidden fees, just pure creative space.
          </p>
          <Button onClick={() => onNavigate('/tour')} variant="outline">
            View Studio Tour
          </Button>
        </Reveal>
      </section>

      {/* S2: Pricing Cards */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rentalRates.map((tier, idx) => (
            <Reveal key={idx} delay={idx * 0.1} className="h-full">
              <div className={`relative h-full flex flex-col p-8 border ${tier.popular ? 'border-charcoal bg-white/50' : 'border-charcoal/20'} transition-all hover:border-charcoal duration-300`}>
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-charcoal text-cream text-xs font-sans uppercase tracking-widest px-3 py-1">
                    Popular
                  </div>
                )}
                <div className="mb-4">
                  <span className="font-serif text-3xl md:text-4xl block mb-1">${tier.price}</span>
                  <span className="text-sm uppercase tracking-widest text-charcoal/60">{tier.duration}</span>
                </div>
                <h3 className="font-serif text-xl mb-3">{tier.label}</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed mb-8 flex-grow">
                  {tier.description}
                </p>
                <Button onClick={() => onBook('rental')} variant="primary" className="w-full">
                  Book This Rate
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* S2.5: Photography Packages (In-House Services) */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
        <Reveal width="100%">
          <div className="border-t border-charcoal/10 pt-16">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
              <h2 className="font-serif text-3xl md:text-4xl mb-4 md:mb-0">In-House Photography</h2>
              <p className="text-charcoal/60 max-w-md text-sm md:text-base">
                Prefer to have us behind the lens? Packages include studio rental, photographer, and basic editing.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {photoPackages.map((pkg, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="group cursor-default">
                    <div className="flex justify-between items-baseline border-b border-charcoal/20 pb-4 mb-3 group-hover:border-charcoal transition-colors">
                      <h4 className="font-serif text-xl">{pkg.name}</h4>
                      <span className="font-sans text-lg opacity-60">From ${pkg.price}</span>
                    </div>
                    <p className="text-sm text-charcoal/70 mb-4">{pkg.description}</p>
                    <button 
                      onClick={() => onBook('photoshoot')}
                      className="text-xs uppercase tracking-widest border-b border-transparent hover:border-charcoal transition-all pb-0.5"
                    >
                      Inquire Now
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* S3: Inclusions Block */}
      <section className="bg-charcoal text-cream px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <Reveal width="100%">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-1">
                <h2 className="font-serif text-4xl mb-6">Included in<br/>Every Rental</h2>
                <p className="text-cream/70 font-sans leading-relaxed">
                  We don't believe in nickel-and-diming creators. When you book Studio 404, you get the tools you need to execute your vision.
                </p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4 border-b border-cream/10 pb-4">
                    <span className="text-cream/60">{item.icon}</span>
                    <span className="font-sans text-lg tracking-wide">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* S4: Add-ons */}
      <section className="px-6 md:px-12 py-24 max-w-6xl mx-auto text-center">
        <Reveal width="100%">
          <h2 className="font-serif text-3xl md:text-4xl mb-12">Optional Add-Ons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/40 p-8 border border-charcoal/10 flex flex-col">
              <div className="mb-4 text-charcoal/50">
                <Clock size={32} />
              </div>
              <h3 className="font-serif text-xl mb-2">After Hours Access</h3>
              <p className="text-sm text-charcoal/70 mb-4 flex-grow">Bookings before 9am or after 8pm require a specialized staff member.</p>
              <div className="flex justify-between items-center font-medium pt-4 border-t border-charcoal/10">
                <span>+$50 / hr</span>
                <Check size={16} className="opacity-50" />
              </div>
            </div>

            <div className="bg-white/40 p-8 border border-charcoal/10 flex flex-col">
              <div className="mb-4 text-charcoal/50">
                <Camera size={32} />
              </div>
              <h3 className="font-serif text-xl mb-2">Canon R5 Body</h3>
              <p className="text-sm text-charcoal/70 mb-4 flex-grow">High-resolution mirrorless body. Note: SD cards are not provided.</p>
              <div className="flex justify-between items-center font-medium pt-4 border-t border-charcoal/10">
                <span>+$35 / hr</span>
                <Check size={16} className="opacity-50" />
              </div>
            </div>

            <div className="bg-white/40 p-8 border border-charcoal/10 flex flex-col">
              <div className="mb-4 text-charcoal/50">
                <Aperture size={32} />
              </div>
              <h3 className="font-serif text-xl mb-2">Premium Lenses</h3>
              <div className="text-sm text-charcoal/70 mb-4 flex-grow">
                <ul className="list-disc list-inside space-y-1">
                  <li>14mm f2.8</li>
                  <li>35mm f1.4</li>
                  <li>50mm f1.4</li>
                  <li>24-105 f4L</li>
                </ul>
              </div>
              <div className="flex justify-between items-center font-medium pt-4 border-t border-charcoal/10">
                <span>+$15 / hr / lens</span>
                <Check size={16} className="opacity-50" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* S5: Philosophy */}
      <section className="px-6 md:px-12 py-16 max-w-3xl mx-auto text-center">
        <Reveal width="100%">
          <div className="border-y border-charcoal/10 py-12">
            <h3 className="font-serif text-2xl mb-4 italic">"The Hidden Fee Free Zone"</h3>
            <p className="font-sans text-charcoal/80 leading-relaxed">
              We've rented studios where the final bill looks nothing like the booking price. 
              At Studio 404, the rate you see is the rate you pay. 
              Lighting, grip, and amenities are standard, not upgrades.
            </p>
          </div>
        </Reveal>
      </section>

      {/* S6: Price FAQ */}
      <section className="px-6 md:px-12 py-20 max-w-4xl mx-auto">
        <Reveal width="100%" className="text-center mb-12">
          <h2 className="font-serif text-4xl">Common Questions</h2>
        </Reveal>
        <Accordion items={faqs} />
      </section>

      {/* S7: Booking Calendar */}
      <section className="px-6 md:px-12 py-20 max-w-6xl mx-auto">
        <Reveal width="100%">
          <div className="bg-white p-8 md:p-12 border border-charcoal/20 text-center">
            <h2 className="font-serif text-3xl mb-8">Live Availability</h2>
            {/* GoHighLevel Widget Container Placeholder */}
            <div className="w-full h-[600px] bg-charcoal/5 flex flex-col items-center justify-center border border-dashed border-charcoal/30">
               <Calendar size={48} className="text-charcoal/20 mb-4" />
               <p className="text-charcoal/50 font-sans uppercase tracking-widest text-sm">Booking Widget Loads Here</p>
               <p className="text-charcoal/40 text-xs mt-2">(Integrated via GoHighLevel)</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* S8: Final CTA */}
      <section className="px-6 md:px-12 py-24 text-center bg-charcoal text-cream">
        <Reveal width="100%" className="flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-6xl mb-6">Still Deciding?</h2>
          <p className="max-w-xl mx-auto text-cream/70 mb-10 text-lg">
            See how other creatives have utilized the space or take a virtual walk-through before you commit.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
             <Button onClick={() => onNavigate('/tour')} variant="outline" className="border-cream text-cream hover:bg-cream hover:text-charcoal">
               View Studio Tour
             </Button>
             <Button onClick={() => onNavigate('/gallery')} variant="primary" className="bg-cream text-charcoal border-cream hover:bg-transparent hover:text-cream">
               Explore Client Work
             </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default RatesPage;