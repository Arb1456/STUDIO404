'use client';

import React from 'react';

const VoiceWidget: React.FC = () => {
    return (
        <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50">
            {/* @ts-expect-error - ElevenLabs custom element loaded at runtime */}
            <elevenlabs-convai agent-id="agent_5801kf1z46zkfp9rcgrp96kpyeja"></elevenlabs-convai>
        </div>
    );
};

export default VoiceWidget;
