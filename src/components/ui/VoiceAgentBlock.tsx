import React from 'react';
import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

interface VoiceAgentBlockProps {
    onStart: () => void;
}

export const VoiceAgentBlock: React.FC<VoiceAgentBlockProps> = ({ onStart }) => {
    return (
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
                                onClick={onStart}
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
    );
};

export default VoiceAgentBlock;
