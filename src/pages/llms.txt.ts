import { city } from '../data/city';
import { serviceLinks, guideLinks, hoodLinks } from '../lib/site';
export function GET() {
  const o = city.site.origin;
  const list = (a: { href: string; label: string }[]) => a.map((l) => `- [${l.label}](${o}${l.href})`).join('\n');
  const body = `# ${city.site.brand}\n\n> ${city.site.llmsSummary}\n\n## Services\n\n${list(serviceLinks)}\n\n## Guides\n\n${list(guideLinks)}\n\n## Neighborhoods\n\n${list(hoodLinks)}\n\n## Site\n\n- [Home](${o}/)\n- [Request Service](${o}/contact/)\n- [Sitemap](${o}/sitemap.xml)\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
