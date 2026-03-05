'use client';
import React, { useState } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface AccordionItemProps {
    number: string;
    title: string;
    children: React.ReactNode;
    warning?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ number, title, children, warning }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-charcoal/20 group">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-8 flex items-start justify-between text-left hover:bg-charcoal/5 transition-colors duration-300 px-2"
            >
                <div className="flex items-baseline gap-6 md:gap-12">
                    <span className="text-xs font-mono opacity-50">{number}</span>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight">{title}</h3>
                </div>
                <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} className="opacity-60" />
                </div>
            </button>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mb-8' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="pl-12 md:pl-20 pr-4 md:pr-12 grid gap-6">
                    <div className="text-sm leading-relaxed opacity-80 max-w-2xl">
                        {children}
                    </div>

                    {warning && (
                        <div className="flex items-start gap-3 p-4 bg-charcoal/5 border border-charcoal/10 max-w-xl">
                            <AlertCircle size={16} className="mt-0.5 shrink-0" />
                            <p className="text-xs font-mono uppercase tracking-wide">{warning}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;
