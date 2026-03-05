'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export const VoiceAgentBlock: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="mb-24">
                <Reveal width="100%">
                    <div className="bg-charcoal text-cream p-8 sm:p-12 rounded-none sm:rounded-lg relative overflow-hidden group">
                        {/* Ambient Background Effect */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-1000 ease-in-out pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-3 mb-6 text-cream/60">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="text-xs uppercase tracking-widest font-medium">Live Booking Agent</span>
                                </div>
                                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-6 leading-[1.1]">
                                    Speak to our <br className="hidden sm:block" />On Demand Booking Agent
                                </h2>
                                <p className="text-cream/70 text-lg leading-relaxed max-w-md">
                                    Skip the forms. Discuss your project needs, check real-time availability, and book your space instantly with our Live Booking Concierge.
                                </p>
                            </div>

                            <div className="shrink-0 pt-4 md:pt-0">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center gap-3 px-8 py-5 text-sm border-cream text-cream hover:bg-cream hover:text-charcoal"
                                >
                                    <Mic size={18} />
                                    <span>Start Conversation</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* ElevenLabs Voice Agent Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-charcoal/90 backdrop-blur-md"
                            onClick={() => setIsModalOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative bg-charcoal border border-white/10 rounded-2xl p-8 md:p-12 max-w-lg w-full shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-cream/40 hover:text-cream transition-colors p-2 rounded-full hover:bg-white/10"
                            >
                                <X size={24} />
                            </button>

                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center gap-3 mb-4 text-cream/60">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="text-xs uppercase tracking-widest font-medium">Live Now</span>
                                </div>
                                <h3 className="font-serif text-2xl md:text-3xl text-cream mb-2">
                                    Studio 404 Booking Agent
                                </h3>
                                <p className="text-cream/60 text-sm mb-6">
                                    Speak naturally to check availability and book your session.
                                </p>
                                <p className="text-cream text-base font-medium">
                                    Click the widget at the top of the screen to start a chat!
                                </p>
                            </div>


                            {/* Footer */}
                            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                                <p className="text-cream/40 text-xs">
                                    Powered by ElevenLabs • You can interrupt at any time
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default VoiceAgentBlock;
