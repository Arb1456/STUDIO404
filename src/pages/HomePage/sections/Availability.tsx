import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Availability: React.FC = () => {
    return (
        <section className="h-screen w-full snap-start bg-cream flex flex-col justify-center px-6 md:px-12 py-24 relative overflow-hidden">
            <div className="absolute top-12 left-6 md:left-12">
                <Reveal>
                    <h2 className="font-serif text-4xl text-charcoal">Availability</h2>
                </Reveal>
            </div>

            <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-6 h-full pt-20 pb-24 md:pb-0 max-h-[800px] m-auto w-full">

                {/* Card A: Rental - Slides from Left */}
                <motion.div
                    className="h-full"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                    <Link
                        to="/rental"
                        className="group block relative w-full h-full bg-charcoal-light overflow-hidden cursor-pointer shadow-xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop"
                            alt="Studio Rental"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute bottom-0 left-0 w-full p-8 text-cream">
                            <h3 className="font-serif text-3xl italic mb-4">Studio Rental</h3>
                            <div className="w-full h-[1px] bg-cream/30 mb-4" />
                            <div className="flex justify-between items-center">
                                <span className="font-sans text-xs tracking-widest uppercase">View Calendar</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Card B: Photoshoots - Slides from Right */}
                <motion.div
                    className="h-full"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                    <Link
                        to="/photoshoot"
                        className="group block relative w-full h-full bg-charcoal-light overflow-hidden cursor-pointer shadow-xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2670&auto=format&fit=crop"
                            alt="Creative Photoshoots"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute bottom-0 left-0 w-full p-8 text-cream">
                            <h3 className="font-serif text-3xl italic mb-4">Creative Photoshoots</h3>
                            <div className="w-full h-[1px] bg-cream/30 mb-4" />
                            <div className="flex justify-between items-center">
                                <span className="font-sans text-xs tracking-widest uppercase">Book Session</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Availability;
