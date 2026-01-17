/// <reference types="vite/client" />

// Augment React JSX to include the ElevenLabs custom element
declare namespace JSX {
    interface IntrinsicElements {
        'elevenlabs-convai': React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                'agent-id': string;
            },
            HTMLElement
        >;
    }
}
