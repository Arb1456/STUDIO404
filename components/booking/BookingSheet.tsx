'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { BookingType } from '@/types';

interface BookingSheetProps {
    isOpen: boolean;
    onClose: () => void;
    type: BookingType;
}

const BookingSheet: React.FC<BookingSheetProps> = ({ isOpen, onClose, type }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-[70]"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-x-0 bottom-0 bg-cream rounded-t-3xl z-[80] max-h-[90vh] overflow-y-auto"
                    >
                        {/* Handle */}
                        <div className="sticky top-0 bg-cream pt-4 pb-2 px-6 flex justify-between items-center border-b border-charcoal/10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-1 bg-charcoal/20 rounded-full" />
                                <h2 className="font-serif text-2xl">
                                    {type === 'photoshoot' ? 'Book a Photoshoot' : 'Book the Studio'}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-charcoal/5 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8">
                            <div className="max-w-2xl mx-auto space-y-6">
                                <p className="text-charcoal/70">
                                    Complete the form below to request your booking. We'll get back to you within 24 hours to confirm availability.
                                </p>

                                {/* Booking Form Placeholder */}
                                <form className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Name</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 bg-white border border-charcoal/20 rounded-lg focus:outline-none focus:border-charcoal transition-colors"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Email</label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-3 bg-white border border-charcoal/20 rounded-lg focus:outline-none focus:border-charcoal transition-colors"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Date</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 bg-white border border-charcoal/20 rounded-lg focus:outline-none focus:border-charcoal transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Duration</label>
                                            <select className="w-full px-4 py-3 bg-white border border-charcoal/20 rounded-lg focus:outline-none focus:border-charcoal transition-colors">
                                                <option>2 hours</option>
                                                <option>4 hours (Half Day)</option>
                                                <option>8+ hours (Full Day)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Additional Notes</label>
                                        <textarea
                                            rows={4}
                                            className="w-full px-4 py-3 bg-white border border-charcoal/20 rounded-lg focus:outline-none focus:border-charcoal transition-colors resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-charcoal text-cream rounded-full font-sans text-sm uppercase tracking-widest hover:bg-charcoal-light transition-colors"
                                    >
                                        Submit Request
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BookingSheet;
