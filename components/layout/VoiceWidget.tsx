'use client';

import React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'elevenlabs-convai': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    'agent-id': string;
                    'avatar-orb-color-1'?: string;
                    'avatar-orb-color-2'?: string;
                },
                HTMLElement
            >;
        }
    }
}

const VoiceWidget: React.FC = () => {
    return (
        <>
            {/* ElevenLabs Widget - positioned via CSS override */}
            <elevenlabs-convai
                agent-id="agent_5801kf1z46zkfp9rcgrp96kpyeja"
                avatar-orb-color-1="#1a1a1a"
                avatar-orb-color-2="#333333"
            />

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

                /* Mobile: Force widget to stay collapsed as a small button */
                @media (max-width: 767px) {
                    elevenlabs-convai,
                    .elevenlabs-convai,
                    [class*="ElevenLabsConvai"] {
                        top: 12px !important;
                        right: 12px !important;
                        max-width: 44px !important;
                        max-height: 44px !important;
                        width: 44px !important;
                        height: 44px !important;
                        overflow: hidden !important;
                        transform: scale(0.8) !important;
                        transform-origin: top right !important;
                    }

                    /* Target the widget's internal container/iframe */
                    elevenlabs-convai *,
                    .elevenlabs-convai *,
                    [class*="ElevenLabsConvai"] * {
                        max-width: 100% !important;
                    }

                    /* When widget is expanded (has conversation open), allow full size */
                    elevenlabs-convai[data-expanded="true"],
                    elevenlabs-convai:has(iframe[style*="width: 100"]),
                    .elevenlabs-convai.expanded {
                        max-width: 100vw !important;
                        max-height: 100vh !important;
                        top: 0 !important;
                        right: 0 !important;
                        width: 100% !important;
                        height: 100% !important;
                    }
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
