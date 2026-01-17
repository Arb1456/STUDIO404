/**
 * Cloudinary image URL utility
 * 
 * Generates optimized image URLs using Cloudinary's URL-based transformations.
 * This approach doesn't require the Cloudinary SDK - just configure your cloud name.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';

interface CloudinaryOptions {
    width?: number;
    height?: number;
    quality?: 'auto' | 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best' | number;
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
    crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb';
    gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
    aspectRatio?: string;
}

/**
 * Generate an optimized Cloudinary URL
 * 
 * @param publicId - The public ID of the image in Cloudinary (e.g., 'studio/hero-image')
 * @param options - Transformation options
 * @returns Optimized image URL
 * 
 * @example
 * // Basic usage
 * cloudinaryUrl('studio/hero-background')
 * 
 * @example
 * // With transformations
 * cloudinaryUrl('studio/gallery/photo-1', { 
 *   width: 800, 
 *   height: 600, 
 *   crop: 'fill',
 *   quality: 'auto'
 * })
 */
export function cloudinaryUrl(publicId: string, options: CloudinaryOptions = {}): string {
    const transforms: string[] = [];

    // Add transformations in the order Cloudinary expects
    if (options.width) transforms.push(`w_${options.width}`);
    if (options.height) transforms.push(`h_${options.height}`);
    if (options.crop) transforms.push(`c_${options.crop}`);
    if (options.gravity) transforms.push(`g_${options.gravity}`);
    if (options.aspectRatio) transforms.push(`ar_${options.aspectRatio}`);

    // Quality - default to auto for best compression
    transforms.push(`q_${options.quality || 'auto'}`);

    // Format - default to auto for best format support (WebP, AVIF)
    transforms.push(`f_${options.format || 'auto'}`);

    const transformString = transforms.join(',');

    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/${publicId}`;
}

/**
 * Generate a responsive image srcset for different viewport widths
 * 
 * @param publicId - The public ID of the image
 * @param widths - Array of widths to generate
 * @param options - Base transformation options
 * @returns srcset string for use in img tag
 */
export function cloudinarySrcSet(
    publicId: string,
    widths: number[] = [400, 800, 1200, 1600, 2000],
    options: Omit<CloudinaryOptions, 'width'> = {}
): string {
    return widths
        .map(w => `${cloudinaryUrl(publicId, { ...options, width: w })} ${w}w`)
        .join(', ');
}

/**
 * Helper to get placeholder/blur URL for progressive loading
 */
export function cloudinaryPlaceholder(publicId: string): string {
    return cloudinaryUrl(publicId, {
        width: 50,
        quality: 'auto:low',
        format: 'auto'
    });
}

export default {
    url: cloudinaryUrl,
    srcSet: cloudinarySrcSet,
    placeholder: cloudinaryPlaceholder
};
