import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const VoiceWidget: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-50"
            >
                {/* Close Button - Top Right of Screen */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setIsVisible(false)}
                    className="fixed top-6 right-6 md:top-8 md:right-8 bg-charcoal/10 text-charcoal p-2 rounded-full backdrop-blur-md border border-charcoal/10 hover:bg-charcoal hover:text-cream transition-all duration-300 shadow-sm group z-[100]"
                    aria-label="Close Voice Assistant"
                >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </motion.button>

                {/* Widget Container - Bottom Right */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="fixed bottom-24 right-4 md:right-8 z-50"
                >
                    {/* @ts-expect-error - ElevenLabs custom element loaded at runtime */}
                    <elevenlabs-convai agent-id="agent_5801kf1z46zkfp9rcgrp96kpyeja"></elevenlabs-convai>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default VoiceWidget;
