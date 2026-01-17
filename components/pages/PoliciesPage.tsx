'use client';
import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { AccordionItem } from '@/components/ui/AccordionItem';
import { Volume2, Dog, HelpCircle, AlertTriangle } from 'lucide-react';
import { BookingType } from '@/types';

interface PoliciesPageProps {
    onBook: (type?: BookingType) => void;
}

const PoliciesPage: React.FC<PoliciesPageProps> = ({ onBook }) => {
    return (
        <div className="w-full pb-32">
            {/* Section 1: Hero */}
            <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 border-b border-charcoal/10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-8">
                        <Reveal>
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tighter mb-8 leading-[0.9]">
                                Studio<br /><span className="italic">Policies</span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-lg md:text-xl max-w-2xl leading-relaxed opacity-80">
                                Clear boundaries for unlimited creativity. Review our standards for the cyclorama, equipment, and conduct to ensure a smooth production.
                            </p>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-4 items-start lg:items-end">
                        {/* Buttons removed as requested */}
                    </div>
                </div>
            </section>

            {/* Section 2: The Core Accordions */}
            <section className="py-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <Reveal className="mb-12">
                        <div className="flex items-center gap-4">
                            <span className="w-2 h-2 bg-charcoal rounded-full"></span>
                            <h2 className="text-sm font-bold uppercase tracking-widest">Rules of the Road</h2>
                        </div>
                    </Reveal>

                    <Reveal>
                        <div className="border-t border-charcoal/20">
                            <AccordionItem
                                number="01"
                                title="The Cyclorama Wall"
                                warning="Repair Fee: $150 - $300 depending on severity"
                            >
                                <p>
                                    Our Infinity Curve is the heart of Studio 404. We maintain it pristine for every booking.
                                    Users must tape the soles of all shoes before stepping onto the white space.
                                    <br /><br />
                                    <strong>Liability:</strong> Any visible scuffs, cracks, or holes caused by equipment dragging or improper footwear will incur an automatic damage fee. Deep structural damage will be assessed by our contractor.
                                </p>
                            </AccordionItem>

                            <AccordionItem
                                number="02"
                                title="Seamless Paper Consumables"
                                warning="Cost: $5.00 per foot of soiled paper"
                            >
                                <p>
                                    We stock a variety of Savage Universal seamless backgrounds. Your rental includes the setup of stands, but the paper itself is a consumable.
                                    <br /><br />
                                    If you require a fresh pull (sweeping the paper onto the floor), you will be charged per linear foot for the portion that becomes soiled or creased. Please assist our staff in cutting the paper at the end of your session.
                                </p>
                            </AccordionItem>

                            <AccordionItem
                                number="03"
                                title="Capacity & Overtime"
                                warning="Penalty: 3x Hourly Rate for unauthorized overtime"
                            >
                                <p>
                                    <strong>Strict Capacity:</strong> Standard booking includes up to 8 individuals (talent + crew).
                                    Unplanned groups exceeding this limit will incur a <strong>$30 per person</strong> fee and require an immediate <strong>$300 security deposit</strong>.
                                    <br /><br />
                                    <strong>Time Management:</strong> Your booking window includes load-in and load-out. Entering early or leaving late disrupts our schedule. Overtime is billed at 1.5x the hourly rate if arranged in advance, or 3x the hourly rate if unannounced.
                                </p>
                            </AccordionItem>

                            <AccordionItem
                                number="04"
                                title="Restricted Materials"
                                warning="Cleaning Fee: $150 mandatory for approved usage"
                            >
                                <p>
                                    <strong>The Glitter & Grain Surcharge:</strong> Creative freedom involving loose particulate matter—specifically glitter, confetti, sand, feathers, or fake blood—requires <strong>prior written approval</strong>.
                                    <br /><br />
                                    If approved, a mandatory <strong>$150 cleaning fee</strong> is added to the invoice to cover the deep industrial vacuuming required to restore the studio for the next client. Unapproved usage will result in the cleaning fee plus a ban from future rentals.
                                </p>
                            </AccordionItem>

                            <AccordionItem
                                number="05"
                                title="Studio Access & Monitoring"
                                warning="Standard: Manager Right of Entry"
                            >
                                <p>
                                    The active Studio Manager reserves the right to be within the rented space at any point to verify that the booking is proceeding according to policy and safety standards.
                                    <br /><br />
                                    <strong>Right of Entry:</strong> Staff may enter the space without notice unless a "Closed Set" protocol has been explicitly agreed upon in writing prior to the booking start time.
                                </p>
                            </AccordionItem>

                            <AccordionItem
                                number="06"
                                title="Liability & Documentation"
                                warning="Policy: 100% Renter Responsibility"
                            >
                                <p>
                                    The individual named on the booking confirmation serves as the primary point of contact and assumes <strong>full financial liability</strong> for all damages, theft, or excessive mess caused by any member of their party.
                                    <br /><br />
                                    <strong>Evidence Protocol:</strong> To ensure transparency, the studio is photographed immediately before your arrival and after your departure. These timestamped images, alongside security camera footage, constitute the definitive record used to determine liability for any condition disputes.
                                </p>
                            </AccordionItem>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Section 3: FAQ Grid */}
            <section className="bg-charcoal/5 py-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <Reveal className="mb-16">
                        <h2 className="text-4xl font-medium tracking-tight mb-4">Frequently Asked Questions</h2>
                        <p className="opacity-60 max-w-xl">Common operational details to help you plan your production.</p>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Reveal delay={0.1}>
                            <div className="bg-cream p-8 h-full border border-charcoal/5 hover:border-charcoal/20 transition-colors">
                                <Dog className="mb-6 opacity-60" size={32} />
                                <h3 className="font-bold uppercase tracking-widest text-xs mb-4">Animal Policy</h3>
                                <p className="text-sm opacity-80 leading-relaxed mb-4">
                                    Well-behaved pets are permitted on set. We require a <strong>$50 cleaning deposit</strong> upfront.
                                </p>
                                <p className="text-xs opacity-60 font-mono border-t border-charcoal/10 pt-4">
                                    NOTE: The renter assumes 100% liability for any damage to the cyc wall or equipment caused by the animal.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="bg-cream p-8 h-full border border-charcoal/5 hover:border-charcoal/20 transition-colors">
                                <Volume2 className="mb-6 opacity-60" size={32} />
                                <h3 className="font-bold uppercase tracking-widest text-xs mb-4">Music & Volume</h3>
                                <p className="text-sm opacity-80 leading-relaxed">
                                    We have a Sonos system available for client use. However, as we share the building with other creatives, we ask that bass levels be kept respectful during business hours (9AM - 5PM).
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div className="bg-cream p-8 h-full border border-charcoal/5 hover:border-charcoal/20 transition-colors">
                                <AlertTriangle className="mb-6 opacity-60" size={32} />
                                <h3 className="font-bold uppercase tracking-widest text-xs mb-4">Security & Safety</h3>
                                <p className="text-sm opacity-80 leading-relaxed">
                                    For safety and policy enforcement, all common areas (excluding private changerooms and bathrooms) are monitored by <strong>24/7 security cameras</strong>. Footage is retained for 7 days post-shoot.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <div className="bg-cream p-8 h-full border border-charcoal/5 hover:border-charcoal/20 transition-colors flex flex-col justify-between">
                                <div>
                                    <HelpCircle className="mb-6 opacity-60" size={32} />
                                    <h3 className="font-bold uppercase tracking-widest text-xs mb-4">Studio Assistance</h3>
                                    <p className="text-sm opacity-80 leading-relaxed">
                                        A site manager is always present to help with equipment orientation and basic needs.
                                    </p>
                                </div>
                                <div className="mt-8 pt-4 border-t border-charcoal/10">
                                    <p className="text-xs opacity-60 font-mono mb-2">Need a Grip or Gaffer?</p>
                                    <a href="/contact" className="text-xs font-bold uppercase tracking-wider border-b border-charcoal pb-1 hover:opacity-50 transition-opacity">
                                        Inquire via Contact Form
                                    </a>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* New Section: Contact Form */}
            <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 border-t border-charcoal/10">
                <div className="max-w-3xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Questions about the fine print?</h2>
                            <p className="opacity-60">Send us a message and our studio manager will get back to you within 24 hours.</p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest opacity-50">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="w-full bg-transparent border-b border-charcoal/20 py-2 text-lg focus:outline-none focus:border-charcoal transition-colors rounded-none placeholder:text-charcoal/20"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest opacity-50">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="w-full bg-transparent border-b border-charcoal/20 py-2 text-lg focus:outline-none focus:border-charcoal transition-colors rounded-none placeholder:text-charcoal/20"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest opacity-50">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full bg-transparent border-b border-charcoal/20 py-2 text-lg focus:outline-none focus:border-charcoal transition-colors resize-none rounded-none placeholder:text-charcoal/20"
                                    placeholder="How can we help?"
                                ></textarea>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit">
                                    Send Message
                                </Button>
                            </div>
                        </form>
                    </Reveal>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-24 px-6 md:px-12 text-center bg-charcoal/5">
                <Reveal>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Ready to create?</h2>
                    <Button onClick={() => onBook('rental')}>
                        Lock In Your Date
                    </Button>
                </Reveal>
            </section>
        </div>
    );
};

export default PoliciesPage;
