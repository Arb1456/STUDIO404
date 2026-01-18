'use client';

import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'elevenlabs-convai': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    'agent-id': string;
                },
                HTMLElement
            >;
        }
    }
}

const VoiceWidget: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <>
            {/* Hide/Show Toggle Button */}
            <button
                onClick={() => setIsVisible(!isVisible)}
                className={`
                    fixed top-4 z-[60]
                    w-10 h-10 rounded-full
                    bg-charcoal text-cream
                    flex items-center justify-center
                    shadow-lg hover:bg-charcoal/90
                    transition-all duration-300
                    left-1/2 ${isVisible ? 'translate-x-2' : '-translate-x-1/2'}
                `}
                aria-label={isVisible ? 'Hide voice assistant' : 'Show voice assistant'}
            >
                {isVisible ? <X size={18} /> : <MessageCircle size={18} />}
            </button>

            {/* ElevenLabs Widget */}
            {isVisible && (
                <elevenlabs-convai agent-id="agent_5801kf1z46zkfp9rcgrp96kpyeja" />
            )}
        </>
    );
};

export default VoiceWidget;
