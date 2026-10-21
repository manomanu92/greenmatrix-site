import { nav } from '../data/site.js';

export function GET({ site }) {
  const origin = (site ?? new URL('https://greenmatrixsolar.com')).origin;
  const today = new Date().toISOString().slice(0, 10);

  const urls = nav
    .map(({ href }) => {
      const loc = `${origin}${href === '/' ? '' : href}`;
      return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${
        href === '/' ? '1.0' : '0.8'
      }</priority></url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
}
