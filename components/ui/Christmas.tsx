import React from 'react';

/**
 * Christmas emblem set — one cohesive style (brand gold / evergreen / berry red)
 * so seasonal decoration reads as designed, not clip-art. All purely decorative.
 */

type EmblemProps = { className?: string };
const svgProps = { 'aria-hidden': true, focusable: 'false' } as const;

export const Snowflake: React.FC<EmblemProps> = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" {...svgProps}>
        {[0, 60, 120].map((r) => (
            <g key={r} transform={`rotate(${r} 12 12)`}>
                <path d="M12 2v20" />
                <path d="M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5" />
            </g>
        ))}
    </svg>
);

export const Star: React.FC<EmblemProps> = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" {...svgProps}>
        {/* four-point twinkle star */}
        <path d="M12 1.5c.6 5.2 2.3 7.9 10.5 10.5-8.2 2.6-9.9 5.3-10.5 10.5-.6-5.2-2.3-7.9-10.5-10.5C9.7 9.4 11.4 6.7 12 1.5Z" />
    </svg>
);

export const Ornament: React.FC<EmblemProps> = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} {...svgProps}>
        <path d="M12 1.5v3" strokeLinecap="round" />
        <rect x="9.5" y="4.5" width="5" height="3" rx="0.8" />
        <circle cx="15" cy="15" r="7" transform="translate(-3 0)" />
        <path d="M5.5 13.5c2 1.3 4 1.3 6.5 0s4.5-1.3 6.5 0" />
        <path d="M5.5 17c2 1.3 4 1.3 6.5 0s4.5-1.3 6.5 0" />
    </svg>
);

/** Full-colour holly sprig — two leaves, three berries. Chunky enough to read at icon size. */
export const Holly: React.FC<EmblemProps> = ({ className = 'w-8 h-8' }) => (
    <svg viewBox="0 0 32 32" className={className} {...svgProps}>
        <path
            d="M15 17 C12 16 10 13.5 9.5 11 L7.5 12 L7.8 9.6 L5 9.8 L6.2 7.6 L3.5 6.6 C7 4.5 12.5 5.5 15 9 C16 11.5 16 14.5 15 17Z"
            fill="#2F5A3F"
        />
        <path
            d="M17 17 C20 16 22 13.5 22.5 11 L24.5 12 L24.2 9.6 L27 9.8 L25.8 7.6 L28.5 6.6 C25 4.5 19.5 5.5 17 9 C16 11.5 16 14.5 17 17Z"
            fill="#3D6E4F"
        />
        <circle cx="13" cy="19.5" r="3.2" fill="#B3262E" />
        <circle cx="19" cy="19.5" r="3.2" fill="#C4343C" />
        <circle cx="16" cy="24.5" r="3.2" fill="#A11F27" />
        <circle cx="12" cy="18.5" r="0.9" fill="#fff" opacity="0.55" />
        <circle cx="18" cy="18.5" r="0.9" fill="#fff" opacity="0.55" />
    </svg>
);

/** "— ✦ ornament ✦ —" divider used between sections. */
export const OrnamentDivider: React.FC<{ tone?: 'light' | 'dark'; className?: string }> = ({ tone = 'dark', className = '' }) => {
    const line = tone === 'dark' ? 'bg-charcoal/20' : 'bg-cream/25';
    return (
        <div className={`flex items-center justify-center gap-4 text-gold ${className}`} aria-hidden="true">
            <span className={`h-px w-16 md:w-24 ${line}`} />
            <Star className="w-2.5 h-2.5" />
            <Ornament className="w-6 h-6" />
            <Star className="w-2.5 h-2.5" />
            <span className={`h-px w-16 md:w-24 ${line}`} />
        </div>
    );
};

/**
 * Scattered faint emblems for dark banner backgrounds.
 * Fixed positions (not random) so server and client render identically.
 */
const SCATTER: { Comp: React.FC<EmblemProps>; cls: string }[] = [
    { Comp: Snowflake, cls: 'top-[14%] right-[8%] w-16 h-16 opacity-25 hidden md:block' },
    { Comp: Snowflake, cls: 'top-[5%] right-[30%] w-9 h-9 opacity-20 md:hidden' },
    { Comp: Star, cls: 'top-[24%] right-[22%] w-4 h-4 opacity-60' },
    { Comp: Snowflake, cls: 'top-[46%] right-[14%] w-8 h-8 opacity-20' },
    { Comp: Star, cls: 'top-[10%] left-[44%] w-3 h-3 opacity-50' },
    { Comp: Ornament, cls: 'top-[30%] right-[34%] w-10 h-10 opacity-25 hidden md:block' },
    { Comp: Snowflake, cls: 'bottom-[18%] right-[6%] w-10 h-10 opacity-15 hidden md:block' },
    { Comp: Star, cls: 'bottom-[30%] right-[28%] w-3 h-3 opacity-50 hidden md:block' },
];

export const EmblemScatter: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none text-gold" aria-hidden="true">
        {SCATTER.map(({ Comp, cls }, i) => (
            <span key={i} className={`absolute ${cls}`}>
                <Comp className="w-full h-full" />
            </span>
        ))}
    </div>
);

/**
 * Gentle CSS snowfall. Transform/opacity-only animation (compositor-friendly),
 * disabled for prefers-reduced-motion in globals.css. Deterministic flake layout.
 */
export const Snowfall: React.FC<{ count?: number }> = ({ count = 28 }) => (
    <div className="snowfall absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: count }).map((_, i) => {
            const left = (i * 37) % 100;
            const size = 2 + ((i * 7) % 4);
            const duration = 9 + ((i * 13) % 9);
            const delay = -((i * 17) % 18);
            const drift = ((i * 11) % 30) - 15;
            return (
                <span
                    key={i}
                    className="snowflake"
                    style={{
                        left: `${left}%`,
                        width: size,
                        height: size,
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                        ['--drift' as string]: `${drift}px`,
                    }}
                />
            );
        })}
    </div>
);
