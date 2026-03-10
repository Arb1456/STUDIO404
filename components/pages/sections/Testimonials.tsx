'use client';
import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';

interface Review {
    text: string;
    author: string;
    role: string;
}

// 3 confirmed reviews. Add up to 10 total — the marquee duplicates them automatically.
const REVIEWS: Review[] = [
    {
        text: "I'd give 6 stars if I could. I'm a photographer and I was extremely happy with this studio, and the experience of working with the staff. The space is great, with lots of equipment and options at your disposal, and the price is amazing for what you're getting. But more significant to me: Andre is absolutely the best studio owner I've ever worked with.",
        author: "Verified Photographer",
        role: "Google Review",
    },
    {
        text: "At first, I wasn't really comfortable getting my pictures taken since I've never been that type of guy. But when I got my photos from Andre, he completely captured what I wanted from the shoot. He was super understanding and easy to work with. For anyone who's camera-shy, I definitely recommend Studio 404.",
        author: "Satisfied Client",
        role: "Google Review",
    },
    {
        text: "We rented Studio 404 for a TV production and could not have been more pleased with our experience. Andre and Andy were extremely professional, responsive and accommodating from beginning to end. Their space is also super versatile and fit our needs beautifully. Thanks for the great experience!",
        author: "Production Company",
        role: "Google Review",
    },
    // ---- ADD MORE REVIEWS BELOW ----
    // { text: "...", author: "Name", role: "Google Review" },
    // Up to 10 total. The ticker loops automatically.
];

// Duplicate the array so the CSS marquee has a seamless loop:
// The animation translates X by -50%, so we need 2 copies in the DOM.
const TICKER_ITEMS = [...REVIEWS, ...REVIEWS];

const StarRating = () => (
    <div className="flex gap-0.5 mb-4" aria-label="5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
        ))}
    </div>
);

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <div className="flex-shrink-0 w-80 md:w-96 bg-charcoal-light/60 border border-cream/10 rounded-sm p-6 mx-3 flex flex-col">
        <StarRating />
        <p className="font-serif italic text-cream/80 text-sm leading-relaxed line-clamp-4 flex-1">
            "{review.text}"
        </p>
        <div className="mt-4 pt-4 border-t border-cream/10">
            <p className="text-xs font-bold tracking-widest uppercase text-cream">{review.author}</p>
            <p className="text-[10px] text-cream/40 uppercase tracking-widest mt-0.5">{review.role}</p>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
    return (
        <section className="h-screen-safe w-full snap-start bg-charcoal flex flex-col items-center justify-center pb-nav-safe overflow-hidden">
            {/* Header */}
            <div className="px-6 text-center mb-10 md:mb-12">
                <Reveal>
                    <p className="text-xs uppercase tracking-[0.3em] text-cream/40 mb-3">Client Reviews</p>
                </Reveal>
                <Reveal delay={0.1}>
                    <h2 className="font-serif text-3xl md:text-5xl text-cream">
                        Here&apos;s what our clients <span className="italic text-cream/60">have to say</span>
                    </h2>
                </Reveal>
            </div>

            {/* Ticker */}
            <div className="w-full overflow-hidden">
                <div className="flex animate-marquee">
                    {TICKER_ITEMS.map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </div>
            </div>

            {/* CTA */}
            <Reveal delay={0.2}>
                <a
                    href="https://g.page/r/CVxRplCBj3hvEBM/review"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 md:mt-12 group flex items-center gap-2 text-xs uppercase tracking-widest text-cream/50 hover:text-cream transition-colors border-b border-cream/20 hover:border-cream/50 pb-0.5"
                >
                    <span>Read All Our Reviews</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
            </Reveal>
        </section>
    );
};

export default Testimonials;
