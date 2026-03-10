#!/usr/bin/env node
/**
 * Upload a single image file to Cloudinary.
 *
 * Usage:
 *   node scripts/upload-to-cloudinary.mjs <file-path> <folder> [public-id-override]
 *
 * Arguments:
 *   file-path           Absolute or relative path to the image file
 *   folder              Cloudinary folder: "studio404/equipment" | "" for root
 *   public-id-override  (optional) Override the derived public_id (e.g. "PORTRAIT-SESSION-01")
 *
 * Output (JSON):
 *   { "publicId": "studio404/equipment/strobe_01", "url": "https://res.cloudinary.com/..." }
 *
 * Requires .env.local with:
 *   CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 */

import { v2 as cloudinary } from 'cloudinary';
import { readFileSync, existsSync } from 'fs';
import { resolve, basename, extname } from 'path';

// Load .env.local manually (Next.js doesn't load it for standalone scripts)
function loadEnv() {
    const envPath = new URL('../.env.local', import.meta.url).pathname;
    if (!existsSync(envPath)) {
        console.error('ERROR: .env.local not found. Create it with CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
        process.exit(1);
    }
    const lines = readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const [key, ...rest] = trimmed.split('=');
        if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
    }
}

loadEnv();

const [,, filePath, folder, publicIdOverride] = process.argv;

if (!filePath) {
    console.error('Usage: node scripts/upload-to-cloudinary.mjs <file-path> <folder> [public-id-override]');
    console.error('Example: node scripts/upload-to-cloudinary.mjs ~/Desktop/strobe.jpg studio404/equipment "Strobes"');
    process.exit(1);
}

const absPath = resolve(filePath);
if (!existsSync(absPath)) {
    console.error(`ERROR: File not found: ${absPath}`);
    process.exit(1);
}

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Derive a clean public_id from the filename (no extension)
const name = basename(absPath, extname(absPath))
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_-]/g, '');

const publicId = publicIdOverride
    ? publicIdOverride
    : (folder ? `${folder}/${name}` : name);

try {
    const result = await cloudinary.uploader.upload(absPath, {
        public_id: publicId,
        overwrite: false,
        resource_type: 'image',
    });

    const output = {
        publicId: result.public_id,
        url: result.secure_url,
        caption: name,
    };

    console.log(JSON.stringify(output, null, 2));
} catch (err) {
    console.error('Upload failed:', err.message);
    process.exit(1);
}
