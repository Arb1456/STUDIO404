'use client';
import React, { useState } from 'react';
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
                            aria-expanded={openIndex === index}
                            className="w-full flex justify-between items-center py-6 text-left group"
                        >
                            <span className="font-serif text-xl md:text-2xl text-charcoal group-hover:opacity-70 transition-opacity">
                                {item.question}
                            </span>
                            <span className="text-charcoal ml-4">
                                {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                            </span>
                        </button>
                        {/* Answers always stay in the HTML (closed ones collapse to 0 height) so Google and
                            AI answers can read them and they match the FAQPage structured data. */}
                        <div
                            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                                openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                        >
                            <div className="overflow-hidden" aria-hidden={openIndex !== index}>
                                <div className="pb-8 pr-8 font-sans text-charcoal/80 leading-relaxed">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            ))}
        </div>
    );
};

export default FAQAccordion;
