'use client';

import React from 'react';

const VoiceWidget: React.FC = () => {
    return (
        <>
            {/* ElevenLabs Widget - positioned via CSS override */}
            {/* @ts-expect-error - ElevenLabs custom element loaded at runtime */}
            <elevenlabs-convai agent-id="agent_5801kf1z46zkfp9rcgrp96kpyeja"></elevenlabs-convai>

            {/* CSS Override for ElevenLabs widget position */}
            <style jsx global>{`
                /* Override ElevenLabs widget position to top-right */
                elevenlabs-convai,
                .elevenlabs-convai,
                [class*="ElevenLabsConvai"] {
                    position: fixed !important;
                    top: 24px !important;
                    right: 24px !important;
                    bottom: auto !important;
                    left: auto !important;
                    z-index: 9999 !important;
                }
                
                @media (min-width: 768px) {
                    elevenlabs-convai,
                    .elevenlabs-convai,
                    [class*="ElevenLabsConvai"] {
                        top: 32px !important;
                        right: 32px !important;
                    }
                }
            `}</style>
        </>
    );
};

export default VoiceWidget;
