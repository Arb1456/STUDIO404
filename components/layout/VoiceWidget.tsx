'use client';

import React from 'react';

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
    return <elevenlabs-convai agent-id="agent_5801kf1z46zkfp9rcgrp96kpyeja" />;
};

export default VoiceWidget;
