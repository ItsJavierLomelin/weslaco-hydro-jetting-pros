import { ACTIVE_CITY } from '../../city.config.mjs';

export type Block = { h: string; ps: string[] };
export type Faq = { q: string; a: string };
export type PageContent = { h1: string; intro: string; lead: string[]; sections: Block[]; faqs: Faq[]; title: string; desc: string };
export type IndexPage = { title: string; desc: string; h1: string; intro: string };
export type Neighborhood = {
  slug: string; name: string; h1: string; title: string; description: string; intro: string; hero: string;
  body: { h: string; ps?: string[]; bullets?: string[]; subs?: { h: string; ps: string[]; bullets?: string[] }[] }[];
  steps: [string, string][]; mapIntro: string; mapLabel: string; mapSrc: string;
  faqs: Faq[]; cta: string; ctaP: string;
};
export type CityData = {
  site: {
    city: string; region: string; regionName: string; country: string; niche: string; brand: string;
    origin: string; phoneDisplay: string; phoneHref: string; ga4MeasurementId: string; airchattyTrackingId: string;
    businessDescription: string; orgDescription: string; llmsSummary: string; schemaServiceType: string;
  };
  ui: {
    heroEyebrow: string; statusStrip: string; formBandTitle: string; formBandText: string;
    calloutTitle: string; calloutText: string; successNiche: string;
  };
  home: PageContent & {
    steps: { t: string; d: string }[]; bandText: string; dispatchTitle: string; dispatchText: string;
    faqHeading: string; footerLinksHtml: string;
  };
  services: { slug: string; name: string; shortName: string; note: string }[];
  guides: { slug: string; name: string }[];
  indexPages: { services: IndexPage; guides: IndexPage; neighborhoods: IndexPage; contact: IndexPage };
  pages: Record<string, PageContent>;
  neighborhoods: Neighborhood[];
};

const cities = import.meta.glob<CityData>('./cities/*.json', { eager: true, import: 'default' });
const active = cities[`./cities/${ACTIVE_CITY}.json`];
if (!active) throw new Error(`No city data file for ACTIVE_CITY="${ACTIVE_CITY}" in city.config.mjs`);

export const city = active;
export const C = city.pages;
export const services = city.services.map((s) => ({ ...s, blurb: C[s.slug].lead[0] ?? C[s.slug].intro }));
export const guides = city.guides.map((g) => ({ ...g, blurb: C[g.slug].intro }));
export const neighborhoods = city.neighborhoods;
