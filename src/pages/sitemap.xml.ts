import { SITE_URL, serviceLinks, guideLinks, hoodLinks } from '../lib/site';
// Privacy and Terms are intentionally left out of the sitemap.
const paths = ['/', '/services/', ...serviceLinks.map((l) => l.href), '/guides/', ...guideLinks.map((l) => l.href), '/neighborhood/', ...hoodLinks.map((l) => l.href), '/contact/'];
export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}

