'use client';
import React, { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight, Mail, MapPin, Instagram, ChevronDown, Phone, Check, AlertCircle } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const ContactInfoContent = () => (
    <div className="space-y-6">
        <div className="space-y-4">
            <Reveal>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight text-charcoal">
                    Let's Create <br />
                    <span className="italic text-charcoal/50">Something Real</span>
                </h2>
            </Reveal>

            <Reveal delay={0.1}>
                <p className="font-sans font-light text-charcoal/70 max-w-md leading-relaxed text-sm md:text-base">
                    Have a project in mind? We'd love to hear from you.
                    Reach out for bookings, studio tours, or general inquiries.
                </p>
            </Reveal>
        </div>

        <div className="space-y-3">
            <Reveal delay={0.2}>
                <a href="mailto:Andre@thestudio404.ca" className="flex items-center gap-4 group w-fit">
                    <div className="p-2.5 rounded-full border border-charcoal/20 group-hover:bg-charcoal group-hover:text-cream transition-colors">
                        <Mail size={16} />
                    </div>
                    <span className="font-sans text-xs tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">Andre@thestudio404.ca</span>
                </a>
            </Reveal>

            <Reveal delay={0.25}>
                <a href="tel:2504073530" className="flex items-center gap-4 group w-fit">
                    <div className="p-2.5 rounded-full border border-charcoal/20 group-hover:bg-charcoal group-hover:text-cream transition-colors">
                        <Phone size={16} />
                    </div>
                    <span className="font-sans text-xs tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">250-407-3530</span>
                </a>
            </Reveal>

            <Reveal delay={0.3}>
                <a href="https://maps.google.com/?q=2285+Saint+Laurent+Blvd+Unit+B8B+Ottawa" target="_blank" rel="noreferrer" className="flex items-center gap-4 group w-fit">
                    <div className="p-2.5 rounded-full border border-charcoal/20 group-hover:bg-charcoal group-hover:text-cream transition-colors">
                        <MapPin size={16} />
                    </div>
                    <span className="font-sans text-xs tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">2285 Saint Laurent Blvd. Unit B8B, Ottawa</span>
                </a>
            </Reveal>

            <Reveal delay={0.4}>
                <a href="https://instagram.com/studio404inc" target="_blank" rel="noreferrer" className="flex items-center gap-4 group w-fit">
                    <div className="p-2.5 rounded-full border border-charcoal/20 group-hover:bg-charcoal group-hover:text-cream transition-colors">
                        <Instagram size={16} />
                    </div>
                    <span className="font-sans text-xs tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">@studio404inc</span>
                </a>
            </Reveal>
        </div>
    </div>
);

const ContactFormContent = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    message: formState.message,
                    source: 'Homepage Contact Section',
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit form');
            }

            setSubmitStatus('success');
            setFormState({ name: '', email: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus === 'success') {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={24} className="text-green-600" />
                </div>
                <div>
                    <h3 className="font-serif text-xl text-charcoal mb-2">Message Sent!</h3>
                    <p className="text-sm text-charcoal/60">We'll get back to you within 24 hours.</p>
                </div>
                <button
                    type="button"
                    onClick={() => setSubmitStatus('idle')}
                    className="text-sm text-charcoal/60 underline hover:text-charcoal"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 w-full">
            <Reveal delay={0.2}>
                <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest opacity-60 ml-1 text-charcoal">Name</label>
                    <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-transparent border-b border-charcoal/20 py-2 px-1 focus:border-charcoal focus:outline-none transition-colors text-base text-charcoal placeholder:text-charcoal/30"
                        placeholder="Jane Doe"
                    />
                </div>
            </Reveal>

            <Reveal delay={0.3}>
                <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest opacity-60 ml-1 text-charcoal">Email</label>
                    <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-transparent border-b border-charcoal/20 py-2 px-1 focus:border-charcoal focus:outline-none transition-colors text-base text-charcoal placeholder:text-charcoal/30"
                        placeholder="jane@example.com"
                    />
                </div>
            </Reveal>

            <Reveal delay={0.4}>
                <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest opacity-60 ml-1 text-charcoal">Message</label>
                    <textarea
                        rows={2}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full bg-transparent border-b border-charcoal/20 py-2 px-1 focus:border-charcoal focus:outline-none transition-colors text-base text-charcoal resize-none placeholder:text-charcoal/30"
                        placeholder="Tell us about your project..."
                    />
                </div>
            </Reveal>

            {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
                    <AlertCircle size={16} />
                    {errorMessage}
                </div>
            )}

            <Reveal delay={0.5} repeat={true}>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-charcoal text-cream py-3 font-serif italic text-base md:text-lg hover:bg-charcoal-light transition-colors flex justify-center items-center gap-2 group mt-2 animate-button-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    {!isSubmitting && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
            </Reveal>
        </form>
    );
};

const Contact: React.FC = () => {
    return (
        <>
            {/* Mobile: Info Section */}
            <SectionWrapper id="contact-info" className="md:hidden">
                <section className="md:hidden h-screen-safe w-full snap-start bg-cream text-charcoal flex flex-col justify-center px-6 relative pb-nav-safe pt-[12vh]">
                    <ContactInfoContent />
                    <div className="absolute bottom-24 left-0 right-0 flex justify-center animate-bounce opacity-30 text-charcoal">
                        <ChevronDown />
                    </div>
                </section>
            </SectionWrapper>

            {/* Mobile: Form Section */}
            <SectionWrapper id="contact-form" className="md:hidden">
                <section className="md:hidden h-screen-safe w-full snap-start bg-cream text-charcoal flex flex-col justify-center px-6 relative pb-nav-safe pt-[12vh] border-t border-charcoal/5">
                    <Reveal>
                        <h3 className="font-serif text-3xl mb-4">Start a Conversation</h3>
                    </Reveal>
                    <div className="bg-charcoal/5 p-5 backdrop-blur-sm border border-charcoal/10 rounded-sm">
                        <ContactFormContent />
                    </div>
                </section>
            </SectionWrapper>

            {/* Desktop: Combined Section */}
            <SectionWrapper id="contact-desktop" className="hidden md:block">
                <section className="hidden md:flex h-screen-safe w-full snap-start bg-cream text-charcoal flex-col justify-center px-12 pb-nav-safe pt-[12vh] relative">
                    <div className="max-w-6xl mx-auto w-full grid grid-cols-2 gap-16 items-center">
                        <div className="order-1">
                            <ContactInfoContent />
                        </div>
                        <div className="order-2 bg-charcoal/5 p-10 backdrop-blur-sm border border-charcoal/10">
                            <ContactFormContent />
                        </div>
                    </div>
                </section>
            </SectionWrapper>
        </>
    );
};

export default Contact;
