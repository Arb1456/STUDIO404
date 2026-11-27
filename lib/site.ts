/**
 * The site's one public address. Vercel redirects thestudio404.ca → www, so every
 * canonical, sitemap URL and JSON-LD URL must use www too (Google treats a
 * redirect and a canonical that disagree as conflicting signals).
 */
export const SITE_URL = 'https://www.thestudio404.ca';
