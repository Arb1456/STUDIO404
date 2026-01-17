'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { FAQ_ITEMS } from '@/lib/constants';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="h-screen w-full snap-start bg-cream flex flex-col justify-center items-center px-6 md:px-12 pb-24 pt-[12vh]">
            <div className="max-w-xl mx-auto w-full">
                <Reveal>
                    <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-8 text-center">Common Questions</h2>
                </Reveal>

                <div className="space-y-1">
                    {FAQ_ITEMS.map((item, index) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <div className="border-b border-charcoal/10 pb-1">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center py-3 text-left focus:outline-none group"
                                >
                                    <span className="font-serif text-lg text-charcoal group-hover:text-charcoal-light transition-colors">
                                        {item.question}
                                    </span>
                                    <span className="text-charcoal/60">
                                        {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="font-sans font-light text-sm text-charcoal/70 pb-4 pr-4 leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.5}>
                    <div className="mt-8 flex justify-center text-center">
                        <button
                            className="px-6 py-3 border border-charcoal/30 text-charcoal font-sans text-xs uppercase tracking-widest hover:bg-charcoal hover:text-cream transition-all duration-300"
                        >
                            View all FAQs
                        </button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default FAQ;
