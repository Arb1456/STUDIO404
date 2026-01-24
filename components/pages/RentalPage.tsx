'use client';
import React, { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import {
    Box,
    Lightbulb,
    Car,
    ArrowRight,
    Calendar as CalendarIcon,
    Star,
    ChevronLeft,
    ChevronRight,
    Quote,
    Sofa,
    Shirt
} from 'lucide-react';

interface RentalPageProps {
    onBook: (duration?: number) => void;
}

const RentalPage: React.FC<RentalPageProps> = ({ onBook }) => {
    const [activeReview, setActiveReview] = useState(0);

    const durationOptions = [
        { hours: 1, price: 70 },
        { hours: 2, price: 120 },
        { hours: 3, price: 180 },
        { hours: 4, price: 225 },
        { hours: 5, price: 270 },
        { hours: 6, price: 315 },
        { hours: 7, price: 360 },
        { hours: 8, price: 400 },
        { hours: 9, price: 430 },
        { hours: 10, price: 450 },
    ];

    const reviews = [
        {
            text: "I'd give 6 stars if I could. I'm a photographer and I was extremely happy with this studio, and the experience of working with the staff. The space is great, with lots of equipment and options at your disposal, and the price is amazing for what you're getting. But more significant to me: Andre is absolutely the best studio owner I've ever worked with.",
            author: "Verified Photographer",
            role: "Google Review"
        },
        {
            text: "At first, I wasn't really comfortable getting my pictures taken since I've never been that type of guy. But when I got my photos from Andre, he completely captured what I wanted from the shoot. He was super understanding and easy to work with. For anyone who's camera-shy, I definitely recommend Studio 404.",
            author: "Satisfied Client",
            role: "Google Review"
        },
        {
            text: "We rented Studio 404 for a TV production and could not have been more pleased with our experience. Andre and Andy were extremely professional, responsive and accommodating from beginning to end. Their space is also super versatile and fit our needs beautifully. Thanks for the great experience!",
            author: "Production Company",
            role: "Google Review"
        }
    ];

    const nextReview = () => {
        setActiveReview((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    return (
        <div className="w-full flex flex-col items-center">

            {/* S1: Hero Intro */}
            <section className="w-full min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 pb-12 relative overflow-hidden">
                {/* Background Graphic Element - Soft Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] bg-[#f9f2d5] rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <Reveal delay={0.1}>
                        <p className="text-xs font-bold tracking-[0.2em] uppercase text-charcoal/60 mb-6">
                            Ottawa's Premier Production Space
                        </p>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 text-charcoal leading-[0.9]">
                            Studio <br /> <span className="italic font-light">Rental</span>
                        </h1>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <p className="text-lg md:text-xl text-charcoal/80 max-w-xl mx-auto mb-12 font-light leading-relaxed">
                            A blank canvas for your vision. Designed for photographers, filmmakers, and creators who need a professional space without the noise.
                        </p>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button onClick={() => onBook()}>
                                Book Studio
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* S2: Duration Cards */}
            <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-white/50">
                <div className="max-w-7xl mx-auto">
                    <Reveal>
                        <h2 className="font-serif text-4xl mb-12 text-center md:text-left">Select Your Duration</h2>
                    </Reveal>

                    {/* Hourly Circles */}
                    <Reveal delay={0.1}>
                        <div className="mb-20">
                            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-8">
                                {durationOptions.map((opt) => (
                                    <button
                                        key={opt.hours}
                                        onClick={() => onBook(opt.hours)}
                                        className="group flex flex-col items-center gap-3"
                                    >
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-charcoal/20 bg-cream group-hover:bg-charcoal group-hover:border-charcoal transition-all duration-300 flex flex-col items-center justify-center shadow-sm">
                                            <span className="font-serif text-xl md:text-2xl group-hover:text-cream transition-colors leading-none mb-0.5">
                                                {opt.hours}
                                            </span>
                                            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-charcoal/50 group-hover:text-cream/70 transition-colors leading-none">
                                                {opt.hours === 1 ? 'Hour' : 'Hours'}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-charcoal/80 group-hover:text-charcoal transition-colors">
                                            ${opt.price}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-charcoal/10">
                        {[
                            { title: "1 Hour", price: "$70", desc: "Perfect for headshots or quick product updates.", hours: 1 },
                            { title: "2 Hours", price: "$120", desc: "Our most popular option for standard sessions.", hours: 2 },
                            { title: "Half Day", price: "$225", desc: "4 hours. Ideal for editorial or small brand shoots.", hours: 4 },
                            { title: "Full Day", price: "$400", desc: "8 hours. Full access for large scale productions.", hours: 8 },
                        ].map((card, i) => (
                            <Reveal key={i} delay={0.1 * i} className="h-full">
                                <div className="flex flex-col justify-between h-full p-8 border border-charcoal/10 bg-cream hover:bg-white hover:border-charcoal/30 transition-all duration-300 group">
                                    <div>
                                        <h3 className="font-serif text-2xl mb-2 group-hover:italic transition-all">{card.title}</h3>
                                        <div className="text-3xl font-light mb-4">{card.price}</div>
                                        <p className="text-sm text-charcoal/60 mb-8 leading-relaxed">{card.desc}</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full text-xs py-3"
                                        onClick={() => onBook(card.hours)}
                                    >
                                        Book This Option
                                    </Button>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* S3: All-Inclusive List */}
            <section className="w-full px-6 md:px-12 lg:px-24 py-24" id="tour">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <Reveal>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6">Everything You Need</h2>
                        <p className="text-charcoal/70">Walk in and start creating. We've handled the technical details.</p>
                    </Reveal>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                    {[
                        { icon: <Box size={24} />, title: "12x10x10 CycWall", desc: "Seamless white infinity curve" },
                        { icon: <Lightbulb size={24} />, title: "Pro Lighting", desc: "Professional strobes and constants included" },
                        { icon: <Box size={24} />, title: "Premium 9-foot Seamless Backdrops", desc: "Assorted paper colors" },
                        { icon: <Sofa size={24} />, title: "Furniture", desc: "A curated collection of premium furniture" },
                        { icon: <Shirt size={24} />, title: "Change Room", desc: "Large, well-lit, spacious change room" },
                        { icon: <Car size={24} />, title: "Parking", desc: "Free spots on-site" },
                        { icon: <Box size={24} />, title: "Props", desc: "Stools, chairs, handheld props, and decor" },
                    ].map((item, i) => (
                        <Reveal key={i} delay={0.05 * i}>
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-charcoal mb-2">
                                    {item.icon}
                                </div>
                                <h3 className="font-serif text-lg">{item.title}</h3>
                                <p className="text-xs text-charcoal/60 uppercase tracking-wide">{item.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* S4: Testimonials */}
            <section className="w-full px-6 md:px-12 py-32 bg-charcoal text-cream text-center relative overflow-hidden">
                <div className="absolute top-12 left-12 text-white/5">
                    <Quote size={120} />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <Reveal>
                        <div className="flex items-center justify-center gap-2 mb-8 text-[#FFD700]">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} fill="currentColor" size={20} />)}
                        </div>

                        <div className="min-h-[200px] flex items-center justify-center">
                            <h2 className="font-serif text-2xl md:text-4xl leading-relaxed italic">
                                "{reviews[activeReview].text}"
                            </h2>
                        </div>

                        <div className="mt-8 flex flex-col items-center gap-2">
                            <p className="font-bold tracking-widest uppercase text-sm">{reviews[activeReview].author}</p>
                            <p className="text-xs text-white/50">{reviews[activeReview].role}</p>
                        </div>

                        <div className="flex items-center justify-center gap-6 mt-12">
                            <button onClick={prevReview} className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                                <ChevronLeft size={20} />
                            </button>
                            <div className="flex gap-2">
                                {reviews.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${i === activeReview ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                                    />
                                ))}
                            </div>
                            <button onClick={nextReview} className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                            <a
                                href="https://g.page/r/CVxRplCBj3hvEBM/review"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/50 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-0.5"
                            >
                                Verified Google Reviews →
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* S5: Studio Rules */}
            <section className="w-full px-6 md:px-12 lg:px-24 py-24 flex flex-col md:flex-row gap-16 items-center max-w-7xl mx-auto">
                <div className="w-full md:w-1/2">
                    <Reveal>
                        <div className="relative aspect-[4/5] bg-gray-200 overflow-hidden">
                            <img src="https://picsum.photos/seed/studio99/800/1000" alt="Studio Rules" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700" />
                        </div>
                    </Reveal>
                </div>
                <div className="w-full md:w-1/2 space-y-8">
                    <Reveal>
                        <h2 className="font-serif text-4xl mb-6">House Rules</h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <ul className="space-y-6">
                            {[
                                "Please bring clean indoor shoes for the cyclorama wall.",
                                "Setup and teardown time is included in your booking window.",
                                "Leave the space as you found it to avoid cleaning fees.",
                                "No glitter or confetti without prior approval."
                            ].map((rule, i) => (
                                <li key={i} className="flex items-start gap-4 text-charcoal/80">
                                    <span className="mt-1 text-charcoal block min-w-[10px]">•</span>
                                    <span>{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <Link href="/policies">
                            <Button variant="text">
                                View Full Policies <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* S6: Step-by-Step */}
            <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-cream/20">
                <div className="max-w-4xl mx-auto">
                    <Reveal>
                        <h2 className="font-serif text-4xl text-center mb-16">How It Works</h2>
                    </Reveal>

                    <div className="space-y-12 relative before:absolute before:left-[19px] md:before:left-1/2 before:top-0 before:h-full before:w-[1px] before:bg-charcoal/10">
                        {[
                            { title: "Check Availability", desc: "Use the calendar below to find your slot." },
                            { title: "Select Duration", desc: "Choose the time block that fits your project." },
                            { title: "Receive Confirmation Email", desc: "Your booking details will be inside." },
                            { title: "Create", desc: "The space is yours. Equipment and amenities are at your disposal." }
                        ].map((step, i) => (
                            <Reveal key={i} delay={0.1 * i} width="100%">
                                <div className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className={`hidden md:block md:w-1/2 ${i % 2 !== 0 ? 'pl-16 text-left' : 'pr-16 text-right'}`}>
                                        <h3 className="font-serif text-2xl">{step.title}</h3>
                                        <p className="text-sm text-charcoal/60 mt-2">{step.desc}</p>
                                    </div>

                                    <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-charcoal text-cream flex items-center justify-center font-serif italic border-4 border-cream">
                                        {i + 1}
                                    </div>

                                    <div className={`md:hidden pl-4`}>
                                        <h3 className="font-serif text-xl">{step.title}</h3>
                                        <p className="text-sm text-charcoal/60 mt-1">{step.desc}</p>
                                    </div>

                                    <div className="hidden md:block md:w-1/2"></div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* S7: Calendar Zone */}
            <section className="w-full px-4 md:px-12 py-24 bg-white" id="calendar">
                <Reveal width="100%">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-10 text-center">
                            <h2 className="font-serif text-4xl mb-4">Ready to Book?</h2>
                            <p className="text-charcoal/60">Click below to see live availability and book your session.</p>
                        </div>

                        {/* CTA Card */}
                        <div
                            onClick={() => onBook()}
                            className="w-full h-[300px] bg-cream border border-charcoal/10 rounded-lg flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-charcoal/30 transition-all"
                        >
                            <CalendarIcon size={64} className="text-charcoal/20 mb-6 group-hover:text-charcoal/40 transition-colors" />
                            <p className="font-serif text-2xl text-charcoal/60 group-hover:text-charcoal transition-colors">View Calendar & Book</p>
                            <p className="text-xs text-charcoal/40 uppercase tracking-widest mt-2">Click to open booking</p>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* S8: Final Reassurance */}
            <section className="w-full px-6 md:px-12 py-32 bg-charcoal text-cream text-center mb-12">
                <Reveal>
                    <h2 className="font-serif text-4xl md:text-6xl mb-8">Still exploring?</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button className="bg-cream text-charcoal hover:bg-white border-none" onClick={() => onBook()}>
                            Book Studio
                        </Button>
                        <Link href="/tour">
                            <Button
                                variant="outline"
                                className="text-cream border-cream hover:bg-cream hover:text-charcoal"
                            >
                                Tour The Studio
                            </Button>
                        </Link>
                    </div>
                </Reveal>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default RentalPage;
