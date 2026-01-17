import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight, Mail, MapPin, Instagram, ChevronDown, Phone } from 'lucide-react';
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

const ContactFormContent = () => (
    <form className="space-y-3 w-full">
        <Reveal delay={0.2}>
            <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest opacity-60 ml-1 text-charcoal">Name</label>
                <input
                    type="text"
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
                    className="w-full bg-transparent border-b border-charcoal/20 py-2 px-1 focus:border-charcoal focus:outline-none transition-colors text-base text-charcoal resize-none placeholder:text-charcoal/30"
                    placeholder="Tell us about your project..."
                />
            </div>
        </Reveal>

        <Reveal delay={0.5} repeat={true}>
            <button type="button" className="w-full bg-charcoal text-cream py-3 font-serif italic text-base md:text-lg hover:bg-charcoal-light transition-colors flex justify-center items-center gap-2 group mt-2 animate-button-glow">
                <span>Send Message</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </Reveal>
    </form>
);

const Contact: React.FC = () => {
    return (
        <>
            {/* Mobile: Info Section */}
            <SectionWrapper id="contact-info" className="md:hidden">
                <section className="md:hidden h-screen w-full snap-start bg-cream text-charcoal flex flex-col justify-center px-6 relative pb-12 pt-[12vh]">
                    <ContactInfoContent />
                    <div className="absolute bottom-24 left-0 right-0 flex justify-center animate-bounce opacity-30 text-charcoal">
                        <ChevronDown />
                    </div>
                </section>
            </SectionWrapper>

            {/* Mobile: Form Section */}
            <SectionWrapper id="contact-form" className="md:hidden">
                <section className="md:hidden h-screen w-full snap-start bg-cream text-charcoal flex flex-col justify-center px-6 relative pb-24 pt-[12vh] border-t border-charcoal/5">
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
                <section className="hidden md:flex h-screen w-full snap-start bg-cream text-charcoal flex-col justify-center px-12 pb-12 pt-[12vh] relative">
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
