'use client';
// Copy rule for this page: no em dashes, and every heading in Title Case.
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import { MapPin, Camera, Share2, Phone, Mail, Instagram, Check, ArrowDown, Truck } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Holly, Snowflake, Ornament, OrnamentDivider, EmblemScatter, Snowfall } from '@/components/ui/Christmas';
import Footer from '@/components/layout/Footer';
import { TRUCK_INITIATIVE as T, STUDIO_CONTACT, HOLIDAY_ROUTES } from '@/lib/holiday';

const track = (action: string) => sendGAEvent('event', 'truck_initiative', { action });

const DONATION_MAILTO = `mailto:${STUDIO_CONTACT.email}?subject=${encodeURIComponent('Christmas Truck Donation')}&body=${encodeURIComponent(
    'Hi André,\n\nI’d like to donate to the Christmas Truck Initiative.\n\nWhat I have:\n\nI’d prefer to:  drop off in St. Laurent  /  drop off in Stittsville  /  arrange a pickup\n\nMy area (for pickup):\n',
)}`;

/** Native share sheet on phones (where QR scans land); copies the link on desktop. */
const ShareButton: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const handleShare = async () => {
        track('share');
        const url = `${window.location.origin}${HOLIDAY_ROUTES.christmasTruck}`;
        const text = 'The Studio 404 Christmas Truck is collecting warm clothing for people experiencing homelessness in Ottawa this December.';
        try {
            if (navigator.share) {
                await navigator.share({ title: 'The Christmas Truck Initiative', text, url });
            } else {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
            }
        } catch {
            // User dismissed the share sheet. Nothing to do.
        }
    };
    return (
        <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-charcoal/30 px-5 py-3 hover:bg-charcoal hover:text-cream transition-colors"
        >
            {copied ? <><Check size={14} /> Link Copied</> : <><Share2 size={14} /> Share This Page</>}
        </button>
    );
};

const ChristmasTruckPage: React.FC = () => {
    const scrollToHelp = () => {
        track('hero-how-to-help');
        document.getElementById('help')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="bg-cream text-charcoal">
            {/* ── 1. Hero ─────────────────────────────────────────── */}
            <section className="relative bg-evergreen text-cream overflow-hidden">
                {T.image && (
                    <div className="absolute inset-0">
                        <Image src={T.image} alt="" fill priority className="object-cover opacity-35" sizes="100vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-evergreen via-evergreen/70 to-evergreen/20" />
                    </div>
                )}
                <EmblemScatter />
                <Snowfall />
                <div className="relative px-6 pt-32 pb-16 md:pt-44 md:pb-28 max-w-4xl mx-auto text-center">
                    <Reveal width="100%">
                        <Holly className="w-14 h-14 mx-auto mb-4" />
                        <span className="block text-xs tracking-[0.25em] uppercase text-gold mb-5">
                            Ottawa · Warm Clothing Drive
                        </span>
                    </Reveal>
                    <Reveal delay={0.1} width="100%">
                        <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
                            The Christmas <br />
                            <span className="italic font-light">Truck Initiative</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.15} width="100%">
                        <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            You&apos;ve probably seen it on the road. This December, our very decorated truck is collecting warm
                            clothing, and we&apos;re handing it out in person to people experiencing homelessness in Ottawa.
                        </p>
                    </Reveal>
                    <Reveal delay={0.2} width="100%">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={scrollToHelp}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-cream text-evergreen px-8 py-5 text-sm uppercase tracking-widest hover:bg-white transition-colors"
                            >
                                How You Can Help <ArrowDown size={16} />
                            </button>
                            <a
                                href={DONATION_MAILTO}
                                onClick={() => track('email-hero')}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-cream/50 text-cream px-8 py-5 text-sm uppercase tracking-widest no-underline hover:bg-cream hover:text-evergreen transition-colors"
                            >
                                <Mail size={16} /> Email To Donate
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── 2. The story ────────────────────────────────────── */}
            <section className="px-6 py-20 md:py-28 max-w-5xl mx-auto">
                <Reveal width="100%">
                    <span className="block text-center text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-3">How It Started</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-center mb-14">It Began With One Ornament</h2>
                </Reveal>
                <ol className="grid md:grid-cols-4 gap-10 md:gap-6">
                    {T.story.map((step, i) => (
                        <Reveal key={step.title} delay={i * 0.08} width="100%">
                            <li className="relative text-center md:text-left">
                                <span className="font-serif italic text-5xl text-gold/80 leading-none">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="font-serif text-2xl mt-3 mb-2">{step.title}</h3>
                                <p className="text-charcoal/70 text-sm leading-relaxed">{step.text}</p>
                            </li>
                        </Reveal>
                    ))}
                </ol>
            </section>

            {/* ── 3. What we're collecting ────────────────────────── */}
            <section className="relative overflow-hidden bg-charcoal text-cream px-6 py-20 md:py-28">
                <Snowfall count={16} />
                <Snowflake className="absolute -top-6 -left-6 w-28 h-28 text-gold opacity-10 pointer-events-none" />
                <Snowflake className="absolute -bottom-8 -right-8 w-36 h-36 text-gold opacity-10 pointer-events-none" />
                <div className="relative max-w-5xl mx-auto">
                    <OrnamentDivider tone="light" className="mb-6" />
                    <Reveal width="100%">
                        <h2 className="font-serif text-4xl md:text-5xl text-center mb-4">What We&apos;re Collecting</h2>
                        <p className="text-center text-cream/70 max-w-xl mx-auto mb-12">
                            Gently used or new, clean and ready to wear.
                        </p>
                    </Reveal>
                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cream/15 border border-cream/15">
                        {T.accepted.map((item) => (
                            <li key={item} className="bg-charcoal flex items-center justify-center text-center p-6 min-h-[96px] font-serif italic text-lg">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── 4. How you can help ─────────────────────────────── */}
            <section id="help" className="scroll-mt-8 px-6 py-20 md:py-28 max-w-6xl mx-auto">
                <Reveal width="100%">
                    <span className="block text-center text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-3">Three Ways To Help</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-center mb-14">Keep Someone Warm This Winter</h2>
                </Reveal>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Donate */}
                    <Reveal width="100%">
                        <div className="h-full bg-white border border-charcoal/10 p-8 flex flex-col">
                            <MapPin size={22} className="text-evergreen mb-5" aria-hidden="true" />
                            <h3 className="font-serif text-2xl mb-3">Donate</h3>
                            <p className="text-charcoal/70 text-sm leading-relaxed mb-5">
                                Drop off at one of our two spots, or we can come pick it up. Email us and we&apos;ll set it up.
                            </p>
                            <ul className="space-y-3 mb-5">
                                {T.dropOffs.map((d) => (
                                    <li key={d.area}>
                                        <span className="block font-serif text-lg">{d.area}</span>
                                        <span className="block text-sm text-charcoal/60">{d.detail}</span>
                                    </li>
                                ))}
                                <li>
                                    <span className="flex items-center gap-2 font-serif text-lg"><Truck size={16} aria-hidden="true" /> Pickup</span>
                                    <span className="block text-sm text-charcoal/60">Contact us to arrange a pickup</span>
                                </li>
                            </ul>
                            <div className="mt-auto flex flex-col gap-3 text-sm">
                                <a
                                    href={DONATION_MAILTO}
                                    onClick={() => track('email-card')}
                                    className="inline-flex items-center justify-center gap-2 bg-evergreen text-cream px-5 py-3 text-xs uppercase tracking-widest no-underline hover:bg-evergreen/90 transition-colors"
                                >
                                    <Mail size={14} aria-hidden="true" /> Email André
                                </a>
                                <a href={STUDIO_CONTACT.phoneHref} onClick={() => track('call')} className="inline-flex items-center gap-2 no-underline text-charcoal hover:text-evergreen">
                                    <Phone size={16} aria-hidden="true" /> {STUDIO_CONTACT.phoneDisplay}
                                </a>
                            </div>
                        </div>
                    </Reveal>

                    {/* Snap & repost */}
                    <Reveal delay={0.08} width="100%">
                        <div className="h-full bg-evergreen text-cream p-8 flex flex-col relative overflow-hidden">
                            <Ornament className="absolute -top-4 -right-4 w-20 h-20 text-gold opacity-15 pointer-events-none" />
                            <Camera size={22} className="text-gold mb-5" aria-hidden="true" />
                            <h3 className="font-serif text-2xl mb-3">Spot It? Snap It.</h3>
                            <p className="text-cream/80 text-sm leading-relaxed mb-6">
                                See the truck around town? Take a photo, post it and tag us. Every repost helps more donations find their way to the truck.
                            </p>
                            <a
                                href={T.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => track('instagram')}
                                className="mt-auto inline-flex items-center gap-2 font-serif text-xl no-underline text-cream hover:text-gold"
                            >
                                <Instagram size={18} aria-hidden="true" /> @{T.instagramHandle}
                            </a>
                        </div>
                    </Reveal>

                    {/* Share */}
                    <Reveal delay={0.16} width="100%">
                        <div className="h-full bg-white border border-charcoal/10 p-8 flex flex-col">
                            <Share2 size={22} className="text-evergreen mb-5" aria-hidden="true" />
                            <h3 className="font-serif text-2xl mb-3">Spread The Word</h3>
                            <p className="text-charcoal/70 text-sm leading-relaxed mb-6">
                                Send this page to a friend, a group chat, or your office. Someone always has a spare coat in the closet.
                            </p>
                            <div className="mt-auto">
                                <ShareButton />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── 5. Email CTA ────────────────────────────────────── */}
            <section className="px-6 pb-20 md:pb-28">
                <Reveal width="100%">
                    <div className="max-w-3xl mx-auto border border-charcoal/15 bg-white/60 p-8 md:p-12 text-center">
                        <h2 className="font-serif text-3xl md:text-4xl mb-3">Have Something To Give?</h2>
                        <p className="text-charcoal/70 mb-6">
                            Email André directly and we&apos;ll figure out the easiest way to get it to the truck, whether that&apos;s a
                            drop-off or a pickup.
                        </p>
                        <a
                            href={DONATION_MAILTO}
                            onClick={() => track('email-cta')}
                            className="inline-flex items-center gap-3 font-serif text-2xl md:text-3xl no-underline text-evergreen hover:text-charcoal break-all"
                        >
                            <Mail size={24} aria-hidden="true" className="shrink-0" /> {STUDIO_CONTACT.email}
                        </a>
                    </div>
                </Reveal>
            </section>

            {/* ── 6. December outreach ────────────────────────────── */}
            <section className="px-6 pb-20 md:pb-28 max-w-3xl mx-auto text-center">
                <OrnamentDivider className="mb-6" />
                <Reveal width="100%">
                    <h2 className="font-serif text-3xl md:text-4xl mb-4">Delivered By Hand</h2>
                    <p className="text-charcoal/70 text-lg leading-relaxed">
                        Every item collected goes back out in the truck. Throughout December, we&apos;ll be driving around Ottawa and
                        handing donations out personally, straight to the people who need them.
                    </p>
                </Reveal>
            </section>

            {/* ── 7. Studio cross-link ────────────────────────────── */}
            <section className="relative overflow-hidden bg-evergreen text-cream px-6 py-16 md:py-20">
                <Snowfall count={14} />
                <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <span className="block text-xs tracking-[0.2em] uppercase text-gold mb-2">The Truck&apos;s Day Job</span>
                        <h2 className="font-serif text-3xl md:text-4xl mb-2">Christmas Photos At Studio 404</h2>
                        <p className="text-cream/75">Holiday minis and full sessions on our Christmas set in Ottawa.</p>
                    </div>
                    <Link
                        href={HOLIDAY_ROUTES.minis}
                        onClick={() => track('to-minis')}
                        className="shrink-0 inline-flex items-center justify-center border border-cream/50 px-8 py-4 text-xs uppercase tracking-widest no-underline text-cream hover:bg-cream hover:text-evergreen transition-colors"
                    >
                        See Holiday Minis
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ChristmasTruckPage;
