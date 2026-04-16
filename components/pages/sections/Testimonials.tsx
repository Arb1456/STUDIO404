'use client';
import React, { useState, useEffect } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight, X } from 'lucide-react';

interface Review {
    text: string;
    author: string;
    role: string;
}

const REVIEWS: Review[] = [
    {
        text: "We got our photos done on the weekend, I called just days before Christmas and André had a cancellation we were able to fit into! The pictures are unreal 😍 my family and I are so happy, we've never had anything like it. This has been an incredible experience. We had so much fun with the photographer, it was quick and easy, he had lots of great ideas and even made my dad smile which is hard 😂 I would 100000% go here again and again!! It was only $150 for a mini Christmas photoshoot and I was very happy with that.",
        author: "Cassandra Bennett",
        role: "Family Photoshoot",
    },
    {
        text: "We had an amazing family photoshoot experience at this studio, and André truly made it unforgettable. From the moment we arrived, he was professional, patient, and incredibly welcoming. He knew exactly how to make everyone—especially the kids—feel comfortable and relaxed, which really shows in the final photos.\n\nAndré has a great eye for detail and captured beautiful, natural moments that we will treasure forever. The studio atmosphere was warm and well organized, and the whole session felt easy and enjoyable.\n\nIf you're looking for a talented photographer who genuinely cares about delivering high-quality work and a great experience, I highly recommend André. We couldn't be happier with our photos and will definitely be back!",
        author: "Mukwiza Bienfait",
        role: "Family Photoshoot",
    },
    {
        text: "I reached out to Studio 404 for a large family photoshoot, and they responded quickly with all the information and options we needed. The booking process was seamless, and the coordination leading up to the shoot was smooth and stress-free.\n\nWe had the pleasure of working with André as our photographer, and he was absolutely amazing. He came prepared with planned poses, which was incredibly helpful, especially when we needed guidance or inspiration during the session. He was kind, patient, and knew exactly how to communicate with and guide every age group in our family, making everyone feel comfortable and at ease.\n\nThe photos were delivered very promptly, and André was open and responsive to revisions when needed.\n\nI would highly recommend Studio 404 and André for any photoshoot needs!",
        author: "Byicaza Isaac",
        role: "Large Family Photoshoot",
    },
    {
        text: "I had my birthday photoshoot at 404 Studio and it was such a great experience! The owner was extremely friendly and welcoming. He even offered flower petals for my shoot and kindly gave me an extra 10 minutes, which I really appreciated. The studio itself is a very nice, clean, and comfortable space. Overall, amazing service and great vibes. I highly recommend 404 Studio for anyone looking for a professional and friendly photoshoot experience!",
        author: "Annie Ishimwe",
        role: "Birthday Photoshoot",
    },
    {
        text: "We rented Studio 404 for a TV production and could not have been more pleased with our experience. Andre and Andy were extremely professional, responsive and accommodating from beginning to end. Their space is also super versatile and fit our needs beautifully. Thanks for the great experience ✌️",
        author: "Cassandre M",
        role: "TV Production",
    },
    {
        text: "I'd give 6 stars if I could. I'm a photographer and I was extremely happy with this studio, and the experience of working with the staff. The space is great, with lots of equipment and options at your disposal, and the price is amazing for what you're getting. But more significant to me: Andre is absolutely the best studio owner I've ever worked with. I arrived straight from the airport, in a bad mood, and chatting with him immediately lifted my spirits a bit. He even observed that a piece of my equipment was damaged, and he did a quick little repair on it for me. All throughout the day, he was accommodating, kind, and just an absolutely fantastic guy to work with. It was a tough shoot day where quite a bit went wrong for me, and Studio 404 did everything in their power to make sure I was comfortable and happy. I wouldn't even think of finding another studio the next time I'm working in Ottawa. Studio 404 is the place. Shoutout to Andre the homie.",
        author: "Ramy Arida",
        role: "Professional Photography Rental",
    },
    {
        text: "We booked a photoshoot with Andre to recreate a family photo, and the whole experience was wonderful. He reached out before the appointment to get details and even researched reference photos to understand our cultural attire. During the session, he was calm, patient, and very professional, which made the process smooth and enjoyable. Overall, we had a great experience and would highly recommend him!",
        author: "Haaruni Venkatesh",
        role: "Family Photoshoot",
    },
    {
        text: "At first, I wasn't really comfortable getting my pictures taken since I've never been that type of guy. But when I got my photos from Andre, he completely captured what I wanted from the shoot. He was super understanding and easy to work with. For anyone who's camera-shy, I definitely recommend Studio 404 amazing photos and awesome customer service!",
        author: "Gavriele Tibayan",
        role: "Portrait Session",
    },
    {
        text: "I had a great experience at this studio for my photoshoot. The space was clean, professional, and well set up. The owner was very welcoming and provided excellent service from start to finish. Everything went smoothly, and I felt comfortable the entire time. I would definitely recommend this studio to anyone looking for a reliable and professional place for a photoshoot.",
        author: "Nziza Kenny",
        role: "Studio Photoshoot",
    },
    {
        text: "Stop searching and book this studio now—it's the place you've been looking for! From start to finish, my experience was nothing short of amazing. The owners are beyond welcoming, super helpful, and truly care about making your shoot a success. The space is spotless, stylish, and has an incredible vibe that sets the perfect tone for creativity. And let's talk value—it's priced perfectly for what you get! Don't miss out on this gem. I'm already planning my next booking—don't wait to secure your spot!",
        author: "Medley Marmontel",
        role: "Creative Studio Rental",
    },
];

// Duplicate for seamless CSS marquee loop (-50% translate needs 2 copies)
const TICKER_ITEMS = [...REVIEWS, ...REVIEWS];

const REVIEWS_URL = 'https://www.google.com/maps/place/Studio+404/@45.3479994,-75.7564316,17z/data=!4m8!3m7!1s0x4cce05b77b63e6df:0x6f786e8f50a65c14!8m2!3d45.3479994!4d-75.7538567!9m1!1b1';

const StarRating = () => (
    <div className="flex gap-0.5 mb-4" aria-label="5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
        ))}
    </div>
);

const ReviewCard: React.FC<{ review: Review; onClick: () => void }> = ({ review, onClick }) => (
    <button
        onClick={onClick}
        className="flex-shrink-0 w-80 md:w-96 bg-charcoal-light/60 border border-cream/10 rounded-sm p-6 mx-3 flex flex-col text-left hover:border-cream/30 hover:bg-charcoal-light/80 transition-colors cursor-pointer"
    >
        <StarRating />
        <p className="font-serif italic text-cream/80 text-sm leading-relaxed line-clamp-4 flex-1">
            &ldquo;{review.text}&rdquo;
        </p>
        <div className="mt-4 pt-4 border-t border-cream/10 flex items-end justify-between">
            <div>
                <p className="text-xs font-bold tracking-widest uppercase text-cream">{review.author}</p>
                <p className="text-[10px] text-cream/40 uppercase tracking-widest mt-0.5">{review.role}</p>
            </div>
            <span className="text-[10px] text-cream/30 uppercase tracking-widest">Read more</span>
        </div>
    </button>
);

const ReviewModal: React.FC<{ review: Review; onClose: () => void }> = ({ review, onClose }) => {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Card */}
            <div
                className="relative bg-charcoal border border-cream/20 rounded-sm p-8 max-w-lg w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-cream/40 hover:text-cream transition-colors"
                    aria-label="Close"
                >
                    <X size={18} />
                </button>

                <StarRating />

                <div className="font-serif italic text-cream/90 text-base leading-relaxed mb-6 space-y-3">
                    {review.text.split('\n\n').map((para, i) => (
                        <p key={i}>{i === 0 ? <>&ldquo;{para}</> : para}{i === review.text.split('\n\n').length - 1 ? <>&rdquo;</> : null}</p>
                    ))}
                </div>

                <div className="pt-4 border-t border-cream/10">
                    <p className="text-xs font-bold tracking-widest uppercase text-cream">{review.author}</p>
                    <p className="text-[10px] text-cream/40 uppercase tracking-widest mt-0.5">{review.role}</p>
                </div>
            </div>
        </div>
    );
};

const Testimonials: React.FC = () => {
    const [activeReview, setActiveReview] = useState<Review | null>(null);

    return (
        <section className="h-screen-safe w-full snap-start bg-charcoal flex flex-col items-center justify-center pt-20 pb-nav-safe overflow-hidden">
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

            {/* Five-star callout */}
            <Reveal delay={0.2}>
                <div className="flex items-center gap-2 mb-8 md:mb-10">
                    <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-xs uppercase tracking-widest text-cream/50">Over 100 five-star reviews</span>
                </div>
            </Reveal>

            {/* Ticker */}
            <div className="w-full overflow-hidden">
                <div className="flex w-max animate-marquee">
                    {TICKER_ITEMS.map((review, i) => (
                        <ReviewCard key={i} review={review} onClick={() => setActiveReview(review)} />
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="w-full flex justify-center mt-10 md:mt-12">
                <Reveal delay={0.2}>
                    <a
                        href={REVIEWS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-xs uppercase tracking-widest text-cream/50 hover:text-cream transition-colors border-b border-cream/20 hover:border-cream/50 pb-0.5"
                    >
                        <span>Read All Our Reviews</span>
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </a>
                </Reveal>
            </div>

            {/* Modal */}
            {activeReview && (
                <ReviewModal review={activeReview} onClose={() => setActiveReview(null)} />
            )}
        </section>
    );
};

export default Testimonials;
