import { getImageProps } from 'next/image';

/**
 * One hero image that swaps photo by screen size (<picture>), instead of two next/image
 * elements with `priority`. Two priority images = two high-priority preloads, so phones
 * downloaded the desktop hero too (PageSpeed, Nov 27). Fills its positioned parent.
 */
export function ArtDirectedImage({
    mobile,
    desktop,
    alt,
    className = 'object-cover',
    mobileSizes = '100vw',
    desktopSizes = '100vw',
}: {
    mobile: string;
    desktop: string;
    alt: string;
    className?: string;
    mobileSizes?: string;
    desktopSizes?: string;
}) {
    const {
        props: { srcSet: desktopSrcSet },
    } = getImageProps({ alt, src: desktop, fill: true, sizes: desktopSizes });
    const { props: mobileProps } = getImageProps({ alt, src: mobile, fill: true, sizes: mobileSizes, priority: true });

    return (
        <picture>
            {/* md breakpoint (768px), same as the md:hidden / md:block pair this replaces */}
            <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes={desktopSizes} />
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img {...mobileProps} className={className} />
        </picture>
    );
}
