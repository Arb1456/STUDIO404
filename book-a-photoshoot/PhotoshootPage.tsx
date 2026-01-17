import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Camera, Star, ArrowDown } from 'lucide-react';
import { Reveal } from './components/Reveal';
import { Button } from './components/Button';
import { SessionType, BookingContextProps } from './types';

// Mock Data
const SESSIONS: SessionType[] = [
  { 
    id: 'portrait', 
    title: 'Portrait', 
    price: 225, 
    description: 'Capture your essence with professional lighting and direction.', 
    image: 'https://picsum.photos/seed/portrait/800/800',
    duration: '1-2+ Hours',
    photoCount: 8,
  },
  { 
    id: 'family', 
    title: 'Family', 
    price: 250, 
    description: 'Timeless memories for the whole family in our spacious studio.', 
    image: 'https://picsum.photos/seed/family/800/800',
    duration: '1.5-3 Hours',
    photoCount: 8,
  },
  { 
    id: 'couple', 
    title: 'Couple', 
    price: 250, 
    description: 'Intimate and creative sessions for you and your partner.', 
    image: 'https://picsum.photos/seed/couple/800/800',
    duration: '1.5-3 Hours',
    photoCount: 8,
  },
  { 
    id: 'birthday', 
    title: 'Birthday', 
    price: 275, 
    description: 'Celebrate another year with a fun, styled photoshoot.', 
    image: 'https://picsum.photos/seed/birthday/800/800',
    duration: '1-2.5 Hours',
    photoCount: 8,
  },
  { 
    id: 'headshots', 
    title: 'Headshots', 
    price: 150, 
    description: 'Professional branding and corporate headshots.', 
    image: 'https://picsum.photos/seed/headshots/800/800',
    duration: '1-2.5 Hours',
    photoCount: 8,
  },
  { 
    id: 'maternity', 
    title: 'Maternity', 
    price: 250, 
    description: 'Documenting the beauty of motherhood.', 
    image: 'https://picsum.photos/seed/maternity/800/800',
    duration: '1.5-3.5 Hours',
    photoCount: 8,
  },
  { 
    id: 'group', 
    title: 'Group', 
    price: 325, 
    description: 'Large group sessions for bands, teams, or friends.', 
    image: 'https://picsum.photos/seed/group/800/800',
    duration: '1.5-3.5 Hours',
    photoCount: 8,
  },
  { 
    id: 'newborn', 
    title: 'Newborn', 
    price: 250, 
    description: 'Safe, warm, and gentle sessions for the newest additions.', 
    image: 'https://picsum.photos/seed/newborn/800/800',
    duration: '1.5-3.5 Hours',
    photoCount: 8,
  },
  { 
    id: 'boudoir', 
    title: 'Boudoir', 
    price: 300, 
    description: 'Empowering and intimate sessions in a comfortable, private setting.', 
    image: 'https://picsum.photos/seed/boudoir/800/800',
    duration: '1.5-3+ Hours',
    photoCount: 8,
  },
  { 
    id: 'product', 
    title: 'Product', 
    price: 275, 
    description: 'High-quality commercial imagery to showcase your brand\'s products.', 
    image: 'https://picsum.photos/seed/product/800/800',
    duration: '1.5-2.5 Hours',
    photoCount: 8,
  },
];

// Extended catalog images for horizontal scroll
const CATALOG_IMAGES = [
  'https://picsum.photos/seed/art1/600/800',
  'https://picsum.photos/seed/art2/600/800',
  'https://picsum.photos/seed/art3/600/800',
  'https://picsum.photos/seed/art4/600/800',
  'https://picsum.photos/seed/art5/600/800',
  'https://picsum.photos/seed/art6/600/800',
];

const PROCESS_STEPS = [
  {
    title: "Booking & Planning",
    description: "Book your session online. We'll help you create a mood board and select the perfect outfits."
  },
  {
    title: "The Session",
    description: "Arrive at the studio for your shoot. Enjoy guided posing and professional lighting direction."
  },
  {
    title: "Selection",
    description: "Receive a digital proofing album to review all shots and make your final selections."
  },
  {
    title: "Retouching",
    description: "Your selected photos are meticulously edited, retouched, and reviewed for quality."
  },
  {
    title: "Delivery",
    description: "Receive your final, polished images via a private digital album, ready to download."
  }
];

interface PhotoshootPageProps extends BookingContextProps {}

// Helper component for the scroll-focus effect
const FocusGridItem: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Opacity logic: 
  // 0% - 20% scroll: Fade in from 0.3
  // 45% - 55% scroll (Center): Full Opacity 1.0
  // 80% - 100% scroll: Fade out to 0.3
  const opacity = useTransform(scrollYProgress, [0.1, 0.45, 0.55, 0.9], [0.3, 1, 1, 0.3]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity: isMobile ? opacity : 1 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

const PhotoshootPage: React.FC<PhotoshootPageProps> = ({ onBook }) => {
  const [selectedSession, setSelectedSession] = useState<SessionType | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const handleSessionClick = (session: SessionType) => {
    setSelectedSession(session);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleBack = () => {
    setSelectedSession(null);
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 md:pt-48 md:pb-32 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <Reveal>
            <h5 className="text-xs font-bold tracking-widest uppercase mb-4 text-charcoal/60">
              Studio 404 Services
            </h5>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-charcoal leading-[0.9] mb-8">
              Book a <span className="italic">Photoshoot</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-charcoal/80 max-w-xl mb-10 leading-relaxed">
              Professional photography, guided every step of the way by our in-house photographer. 
              No experience required. We provide the space, the gear, and the vision.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="rounded-full"
                onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
              >
                View Photoshoot Options
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full"
                onClick={() => onBook('contact')}
              >
                Discuss Your Project
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Content Area - Swaps between Grid and Detail */}
      <div className="px-4 md:px-8 max-w-[1920px] mx-auto min-h-[80vh]">
        <AnimatePresence mode="wait">
          {!selectedSession ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-24 lg:gap-32 pb-24"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
                {SESSIONS.map((session, index) => (
                  <FocusGridItem 
                    key={session.id} 
                    className="w-full"
                    onClick={() => handleSessionClick(session)}
                  >
                    <Reveal delay={index * 0.05} width="100%">
                      <div className="group relative aspect-square overflow-hidden cursor-pointer bg-charcoal/5">
                        <img 
                          src={session.image} 
                          alt={session.title}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                        
                        <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end">
                          <h3 className="text-cream font-serif text-xl md:text-4xl italic opacity-90 group-hover:translate-x-2 transition-transform duration-500">
                            {session.title}
                          </h3>
                          <p className="hidden md:block text-cream/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                            View Catalog &rarr;
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </FocusGridItem>
                ))}
              </div>

              {/* Process Section */}
              <section className="px-6 max-w-7xl mx-auto w-full">
                <Reveal>
                  <h2 className="font-serif text-4xl md:text-5xl mb-12 md:mb-16 text-center">
                    The <span className="italic text-charcoal/60">Process</span>
                  </h2>
                </Reveal>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative">
                  {PROCESS_STEPS.map((step, i) => (
                    <Reveal key={i} delay={0.2 + (i * 0.1)} className="h-full" width="100%">
                      <div className="flex flex-col items-center text-center relative h-full group">
                        
                        {/* Number Circle */}
                        <div className="w-12 h-12 rounded-full bg-charcoal text-cream flex items-center justify-center font-serif text-xl italic mb-6 shadow-lg ring-4 ring-cream z-10">
                          {i + 1}
                        </div>

                        {/* Arrows connecting steps */}
                        {i < PROCESS_STEPS.length - 1 && (
                          <>
                            {/* Desktop Arrow: Points Right */}
                            <div className="hidden md:flex absolute top-4 -right-1/2 w-full justify-center items-center z-0 text-charcoal/20">
                              <ArrowRight size={24} strokeWidth={1} />
                            </div>
                            
                            {/* Mobile Arrow: Points Down */}
                            <div className="md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 text-charcoal/20">
                               <ArrowDown size={24} strokeWidth={1} />
                            </div>
                          </>
                        )}

                        <h3 className="uppercase tracking-widest font-bold text-xs mb-3 text-charcoal min-h-[20px]">{step.title}</h3>
                        <p className="text-sm text-charcoal/70 leading-relaxed max-w-[200px]">{step.description}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>

              {/* Contact Form Section */}
              <section className="px-6 max-w-4xl mx-auto w-full pt-12 md:pt-24">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-charcoal/5">
                  <Reveal>
                    <div className="text-center mb-10">
                      <h2 className="font-serif text-3xl md:text-4xl mb-4">Have Questions?</h2>
                      <p className="text-charcoal/60">Send us a message and we'll help you plan your perfect session.</p>
                    </div>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-charcoal/50">Full Name</label>
                          <input type="text" className="w-full bg-cream border-b border-charcoal/10 p-3 focus:border-charcoal outline-none transition-colors" placeholder="Jane Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-charcoal/50">Email Address</label>
                          <input type="email" className="w-full bg-cream border-b border-charcoal/10 p-3 focus:border-charcoal outline-none transition-colors" placeholder="jane@example.com" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-charcoal/50">Message</label>
                        <textarea className="w-full bg-cream border-b border-charcoal/10 p-3 h-32 focus:border-charcoal outline-none transition-colors resize-none" placeholder="Tell us about what you have in mind..." />
                      </div>

                      <div className="flex justify-center pt-4">
                        <Button className="min-w-[200px]">Send Message</Button>
                      </div>
                    </form>
                  </Reveal>
                </div>
              </section>

            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              ref={detailRef}
              className="max-w-7xl mx-auto"
            >
              {/* Detail Navigation */}
              <div className="mb-12 flex items-center gap-4">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-60 transition-opacity"
                >
                  <ArrowLeft size={16} /> Back to Options
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                
                {/* Left Column: Info & Booking */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <Reveal>
                    <h2 className="font-serif text-5xl md:text-6xl mb-6">
                      {selectedSession.title} <span className="italic block text-4xl md:text-5xl mt-2 text-charcoal/60">Session</span>
                    </h2>
                  </Reveal>
                  
                  <Reveal delay={0.1}>
                    <p className="text-lg leading-relaxed text-charcoal/80 mb-8 border-l-2 border-charcoal/20 pl-6">
                      {selectedSession.description} Included in this basic package is a {selectedSession.duration} guided session with our senior photographer and {selectedSession.photoCount} professionally retouched high-resolution images.
                    </p>
                  </Reveal>

                  <Reveal delay={0.2}>
                    <div className="space-y-4 mb-10">
                      {[
                        `${selectedSession.duration} Studio Session`,
                        "Professional Lighting Setup",
                        `${selectedSession.photoCount} Retouched Images`,
                        "Online Private Gallery"
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-charcoal text-cream flex items-center justify-center">
                             <Check size={12} />
                          </div>
                          <span className="text-sm font-medium text-charcoal">{feature}</span>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-charcoal/10 space-y-2">
                        <p className="text-xs text-charcoal/60 italic">
                          Note: The photographer will contact you for more details regarding your shoot to determine your needs.
                        </p>
                         <p className="text-xs text-charcoal/60 italic">
                          Additional creative direction, more edited photos, additional outfit changes, and use of complex posing and sets will increase the final price.
                        </p>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={0.3}>
                    <div className="p-6 bg-white border border-charcoal/5 rounded-lg mb-8 shadow-sm">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-cream rounded-full">
                          <Camera size={24} />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest font-bold">Starting At</p>
                          <p className="font-serif text-3xl">${selectedSession.price}<span className="text-sm font-sans font-normal text-charcoal/50">+</span></p>
                        </div>
                      </div>
                      <Button fullWidth onClick={() => onBook('photoshoot')}>
                        Book {selectedSession.title} Session
                      </Button>
                      <p className="text-xs text-center mt-3 text-charcoal/50">
                        Secure your spot with a $50 deposit.
                      </p>
                    </div>
                  </Reveal>
                  
                  {/* Embedded GHL Calendar Placeholder */}
                  <Reveal delay={0.4}>
                     <div className="border border-dashed border-charcoal/30 p-8 rounded-lg bg-charcoal/5 text-center">
                        <p className="font-serif italic text-xl mb-2">Live Availability</p>
                        <p className="text-sm opacity-60 mb-4">Select a date above to check specific times.</p>
                        <div className="h-64 bg-white/50 w-full rounded flex items-center justify-center">
                            <span className="text-charcoal/40 font-medium">[ GHL Calendar Widget Integration ]</span>
                        </div>
                     </div>
                  </Reveal>
                </div>

                {/* Right Column: Horizontal Scroll Catalog */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                   <Reveal delay={0.1} width="100%">
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-serif text-2xl italic">Session Portfolio</h3>
                            <span className="text-xs uppercase tracking-widest text-charcoal/50">Scroll to view</span>
                        </div>
                        
                        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory -mr-4 md:-mr-0 pr-4 md:pr-0">
                           {CATALOG_IMAGES.map((img, i) => (
                             <div key={i} className="shrink-0 w-[280px] md:w-[350px] aspect-[3/4] snap-center bg-gray-200 overflow-hidden">
                                <img src={`${img}?${i}`} alt={`Portfolio ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                             </div>
                           ))}
                           <div className="shrink-0 w-[280px] md:w-[350px] aspect-[3/4] snap-center bg-charcoal text-cream p-8 flex flex-col justify-between">
                             <Star className="w-8 h-8" />
                             <p className="font-serif text-2xl italic">
                               "The most professional studio experience I've ever had. The lighting was impeccable."
                             </p>
                             <p className="text-xs uppercase tracking-widest opacity-60">— Sarah J., Model</p>
                           </div>
                        </div>
                      </div>
                   </Reveal>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PhotoshootPage;