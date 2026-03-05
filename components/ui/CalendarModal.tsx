'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
    calendarUrl: string;
    title?: string;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
    isOpen,
    onClose,
    calendarUrl,
    title = 'Book Your Session'
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative bg-cream rounded-lg w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-charcoal/10">
                            <h2 className="font-serif text-xl">{title}</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-charcoal/5 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Iframe Container */}
                        <div className="flex-1 overflow-hidden">
                            <iframe
                                src={calendarUrl}
                                scrolling="yes"
                                className="w-full h-full min-h-[600px] md:min-h-[700px]"
                                style={{ border: 'none', height: '75vh' }}
                                allow="payment"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CalendarModal;
