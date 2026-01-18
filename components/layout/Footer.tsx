'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { label: 'Contact', href: '/contact' },
        { label: 'About Us', href: '/about' },
        { label: 'Rates', href: '/rates' },
        { label: 'Policies', href: '/policies' },
    ];

    return (
        <footer className="bg-charcoal text-cream py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="font-serif text-2xl mb-4">Studio 404</h3>
                        <p className="text-cream/60 text-sm leading-relaxed">
                            Ottawa's premier creative space for photographers, filmmakers, and content creators.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-cream/40 mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-cream/70 hover:text-cream transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-cream/40 mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="mailto:andre@thestudio404.ca"
                                    className="flex items-center gap-3 text-cream/70 hover:text-cream transition-colors text-sm"
                                >
                                    <Mail size={16} className="text-cream/40" />
                                    andre@thestudio404.ca
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+12504073530"
                                    className="flex items-center gap-3 text-cream/70 hover:text-cream transition-colors text-sm"
                                >
                                    <Phone size={16} className="text-cream/40" />
                                    250-407-3530
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://maps.google.com/?q=2285+St+Laurent+Boulevard+Unit+B8B+Ottawa+Ontario+K1G+4Z7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 text-cream/70 hover:text-cream transition-colors text-sm"
                                >
                                    <MapPin size={16} className="text-cream/40 mt-0.5 flex-shrink-0" />
                                    <span>
                                        2285 St Laurent Boulevard<br />
                                        Unit B8B, Ottawa, ON<br />
                                        K1G 4Z7
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-cream/40 mb-4">Follow Us</h4>
                        <a
                            href="https://instagram.com/studio404inc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-cream/70 hover:text-cream transition-colors text-sm"
                        >
                            <Instagram size={20} />
                            @studio404inc
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-cream/10 pt-8">
                    {/* Tagline & Copyright */}
                    <div className="text-center">
                        <p className="font-serif text-xl italic text-cream/80 mb-4">
                            Create Without Limits
                        </p>
                        <p className="text-xs text-cream/40 uppercase tracking-widest">
                            © {currentYear} Studio 404. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
