import React, { useEffect, useRef, useState } from 'react';
import { X, Mic, AudioWaveform, Loader2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

interface VoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAgentModal: React.FC<VoiceAgentModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [volume, setVolume] = useState(0);
  
  // Refs for audio processing
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    if (isOpen) {
      startSession();
    } else {
      stopSession();
    }
    return () => stopSession();
  }, [isOpen]);

  const startSession = async () => {
    try {
      setStatus('connecting');
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      inputContextRef.current = inputAudioContext;
      audioContextRef.current = outputAudioContext;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('connected');
            
            // Input Stream Setup
            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              // Calculate volume for visualizer
              let sum = 0;
              for (let i = 0; i < inputData.length; i++) {
                sum += inputData[i] * inputData[i];
              }
              setVolume(Math.sqrt(sum / inputData.length));

              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session: any) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            
            if (base64Audio) {
              const ctx = audioContextRef.current;
              if (!ctx) return;

              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                ctx,
                24000,
                1
              );

              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              const gainNode = ctx.createGain();
              gainNode.gain.value = 1.0;
              
              source.connect(gainNode);
              gainNode.connect(ctx.destination);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(source => {
                try { source.stop(); } catch (e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            setStatus('disconnected');
          },
          onerror: (err) => {
            console.error(err);
            setStatus('error');
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          systemInstruction: "You are the Booking Agent for Studio 404, a premium creative space in Ottawa. You are professional, stylish, and efficient. Help users with rental inquiries, pricing (Full day $1000, Half day $600), and availability. Keep answers concise and conversational.",
        }
      });

      sessionRef.current = sessionPromise;

    } catch (error) {
      console.error("Connection failed", error);
      setStatus('error');
    }
  };

  const stopSession = async () => {
    if (sessionRef.current) {
        // Since sessionRef.current is a promise, we should handle it, but there's no abort on the promise itself easily without the object.
        // However, we can close contexts.
        sessionRef.current.then((session: any) => {
             // There is no explicit close method on the session object in the provided snippets, 
             // but usually we close the websocket. 
             // Assuming we just rely on context closing for now as provided in 'Live API Rules' section: 
             // "When the conversation is finished, use `session.close()`"
             if(session.close) session.close();
        }).catch(() => {});
    }

    if (inputContextRef.current) {
      await inputContextRef.current.close();
      inputContextRef.current = null;
    }
    if (audioContextRef.current) {
      await audioContextRef.current.close();
      audioContextRef.current = null;
    }
    sourcesRef.current.forEach(s => {
        try { s.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
    setStatus('disconnected');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-black border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col items-center animate-[slideIn_0.3s_ease-out]">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="mb-8 mt-4">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${status === 'connected' ? 'bg-white/10' : 'bg-red-500/10'}`}>
             {status === 'connecting' ? (
                <Loader2 className="w-10 h-10 text-cream animate-spin" />
             ) : status === 'error' ? (
                <div className="text-red-400">Error</div>
             ) : (
                <div 
                    className="w-12 h-12 rounded-full bg-cream transition-transform duration-75"
                    style={{ transform: `scale(${1 + Math.min(volume * 5, 0.5)})` }}
                />
             )}
          </div>
        </div>

        <h3 className="text-cream font-serif text-2xl mb-2">
            {status === 'connecting' ? 'Connecting...' : status === 'connected' ? 'Listening...' : 'Disconnected'}
        </h3>
        <p className="text-cream/40 text-sm text-center max-w-xs mb-8">
            Speak naturally. You can interrupt at any time.
        </p>

        <div className="flex items-center gap-4">
           <button 
             onClick={onClose}
             className="px-6 py-3 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium"
           >
             End Session
           </button>
        </div>
      </div>
    </div>
  );
};

// --- Audio Helpers ---

function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
