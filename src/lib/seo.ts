import { SITE_URL, business } from './site';
import { city } from '../data/city';

export function orgSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: business.name,
    url: SITE_URL,
    telephone: business.phoneE164,
    description: city.site.orgDescription,
  };
}
export function serviceSchema(path: string, name: string, description: string) {
  return {
    '@type': 'Service', '@id': `${SITE_URL}${path}#service`, name, serviceType: city.site.schemaServiceType, description,
    provider: { '@id': `${SITE_URL}/#organization` },
  };
}
export function pageSchema(path: string, pageName: string, description: string, crumbs: { name: string; path: string }[], service?: boolean) {
  const pageUrl = `${SITE_URL}${path}`;
  const graph: any[] = [
    orgSchema(),
    { '@type': 'WebPage', '@id': `${pageUrl}#webpage`, url: pageUrl, name: pageName, description, isPartOf: { '@type': 'WebSite', name: business.name, url: SITE_URL }, about: { '@id': `${SITE_URL}/#organization` } },
  ];
  if (service) graph.push(serviceSchema(path, pageName, description));
  if (crumbs.length) {
    graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${SITE_URL}${c.path}` })) });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
export function faqSchema(faqs: { q: string; a: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
}
