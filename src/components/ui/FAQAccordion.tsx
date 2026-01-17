import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-4">
            {items.map((item, index) => (
                <Reveal key={index} width="100%" delay={index * 0.1}>
                    <div className="border-b border-charcoal/20">
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex justify-between items-center py-6 text-left group"
                        >
                            <span className="font-serif text-xl md:text-2xl text-charcoal group-hover:opacity-70 transition-opacity">
                                {item.question}
                            </span>
                            <span className="text-charcoal ml-4">
                                {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                            </span>
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-8 pr-8 font-sans text-charcoal/80 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Reveal>
            ))}
        </div>
    );
};

export default FAQAccordion;
