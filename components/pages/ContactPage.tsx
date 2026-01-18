'use client';
import React, { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { VoiceAgentBlock } from '@/components/ui/VoiceAgentBlock';
import { MapPin, Instagram, Mail, ArrowRight } from 'lucide-react';
import Footer from '@/components/layout/Footer';

interface ContactPageProps {
    onBook: (duration?: number) => void;
}

interface InquiryTemplate {
    id: string;
    title: string;
    description: string;
    subject: string;
}

const INQUIRY_TEMPLATES: InquiryTemplate[] = [
    {
        id: 'rental',
        title: 'Rental Inquiry',
        description: 'For self-serve creators needing space.',
        subject: 'Studio Rental Inquiry'
    },
    {
        id: 'photoshoot',
        title: 'Photo Shoot',
        description: 'Full service photography packages.',
        subject: 'Photo Shoot Service Inquiry'
    },
    {
        id: 'production',
        title: 'Mid-Sized Production',
        description: 'Commercial teams & large crews.',
        subject: 'Production Space Request'
    },
    {
        id: 'pricing',
        title: 'Pricing & Availability',
        description: 'General logistical questions.',
        subject: 'Pricing and Availability'
    }
];

const ContactPage: React.FC<ContactPageProps> = ({ onBook: _onBook }) => {
    const [subject, setSubject] = useState('');
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        details: ''
    });

    const handleTemplateClick = (templateSubject: string) => {
        setSubject(templateSubject);
        const formElement = document.getElementById('contact-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Message sent for ${subject || 'General Inquiry'}! We'll respond shortly.`);
        setFormState({ name: '', email: '', details: '' });
        setSubject('');
    };

    return (
        <div className="w-full min-h-screen pb-32 pt-24 sm:pt-32 px-4 sm:px-8 max-w-7xl mx-auto">

            {/* S1: Hero */}
            <section className="mb-24 sm:mb-32">
                <Reveal width="100%">
                    <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-charcoal mb-8 leading-[0.9]">
                        Start a <br />
                        <span className="italic">Conversation</span>
                    </h1>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="text-charcoal/70 text-lg sm:text-xl max-w-md leading-relaxed">
                        From quick rentals to full-scale productions, we're here to help you create without limits.
                    </p>
                </Reveal>
            </section>

            {/* Voice Agent CTA Block */}
            <VoiceAgentBlock />

            {/* S2: Inquiry Templates */}
            <section className="mb-24 sm:mb-32">
                <Reveal className="mb-8">
                    <h2 className="text-xs font-sans uppercase tracking-widest text-charcoal/50">Select an inquiry type</h2>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {INQUIRY_TEMPLATES.map((template, index) => (
                        <Reveal key={template.id} delay={index * 0.1} width="100%">
                            <button
                                onClick={() => handleTemplateClick(template.subject)}
                                className={`w-full text-left p-6 h-full border transition-all duration-300 group
                  ${subject === template.subject
                                        ? 'bg-charcoal text-cream border-charcoal'
                                        : 'bg-transparent text-charcoal border-charcoal/20 hover:border-charcoal'
                                    }`}
                            >
                                <div className="h-32 flex flex-col justify-between">
                                    <h3 className={`font-serif text-2xl ${subject === template.subject ? 'text-cream' : 'text-charcoal'}`}>
                                        {template.title}
                                    </h3>
                                    <div className="flex justify-between items-end">
                                        <p className={`text-xs max-w-[80%] leading-relaxed opacity-80 ${subject === template.subject ? 'text-cream' : 'text-charcoal'}`}>
                                            {template.description}
                                        </p>
                                        <ArrowRight size={16} className={`transform transition-transform duration-300 ${subject === template.subject ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
                                    </div>
                                </div>
                            </button>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* S3: The Professional Form */}
            <section id="contact-form" className="mb-24 max-w-3xl mx-auto">
                <Reveal width="100%">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-xs uppercase tracking-widest text-charcoal/60">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-transparent border-b border-charcoal/20 py-4 text-charcoal focus:outline-none focus:border-charcoal transition-colors rounded-none"
                                    placeholder="Your full name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs uppercase tracking-widest text-charcoal/60">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full bg-transparent border-b border-charcoal/20 py-4 text-charcoal focus:outline-none focus:border-charcoal transition-colors rounded-none"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-xs uppercase tracking-widest text-charcoal/60">Category</label>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full bg-transparent border-b border-charcoal/20 py-4 text-charcoal focus:outline-none focus:border-charcoal transition-colors rounded-none"
                                placeholder="Select a template above or type here"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="details" className="text-xs uppercase tracking-widest text-charcoal/60">Project Details</label>
                            <textarea
                                id="details"
                                required
                                rows={4}
                                value={formState.details}
                                onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                                className="w-full bg-transparent border-b border-charcoal/20 py-4 text-charcoal focus:outline-none focus:border-charcoal transition-colors rounded-none resize-none"
                                placeholder="Tell us about your project timeline, goals, and requirements..."
                            />
                        </div>

                        <div className="pt-8">
                            <Button type="submit" className="w-full sm:w-auto">
                                Send Message
                            </Button>
                        </div>
                    </form>
                </Reveal>
            </section>

            {/* S4: Direct Channels */}
            <section className="mb-24 border-t border-charcoal/10 pt-12">
                <Reveal width="100%">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <a href="https://maps.google.com/?q=2285+Saint+Laurent+Boulevard,+Unit+B8B,+Ottawa,+Ontario" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                            <div className="p-3 border border-charcoal/10 rounded-full group-hover:bg-charcoal group-hover:text-cream transition-colors">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-charcoal/50 mb-1">Visit</p>
                                <p className="font-serif">2285 Saint Laurent Boulevard, Unit B8B, Ottawa, Ontario</p>
                            </div>
                        </a>

                        <a href="https://instagram.com/studio404inc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                            <div className="p-3 border border-charcoal/10 rounded-full group-hover:bg-charcoal group-hover:text-cream transition-colors">
                                <Instagram size={20} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-charcoal/50 mb-1">Follow</p>
                                <p className="font-serif">@studio404inc</p>
                            </div>
                        </a>

                        <a href="mailto:andre@thestudio404.ca" className="flex items-center gap-4 group">
                            <div className="p-3 border border-charcoal/10 rounded-full group-hover:bg-charcoal group-hover:text-cream transition-colors">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-charcoal/50 mb-1">Email</p>
                                <p className="font-serif">andre@thestudio404.ca</p>
                            </div>
                        </a>
                    </div>
                </Reveal>
            </section>

            {/* S5: Final Reassurance */}
            <section className="text-center pb-12">
                <Reveal width="100%">
                    <p className="font-serif italic text-2xl text-charcoal/60">
                        "We typically respond to all inquiries within 24 hours."
                    </p>
                </Reveal>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ContactPage;
