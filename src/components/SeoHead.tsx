import { useEffect } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import { indexToHash } from '../lib/navigation';
import { SECTION_SEO, SITE, absoluteUrl, sectionUrl } from '../lib/seo.config';
import { buildAllStructuredData } from '../lib/structured-data';

const STRUCTURED_DATA_ID = 'vante-structured-data';

function upsertMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function injectStructuredData() {
  let script = document.getElementById(STRUCTURED_DATA_ID) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = STRUCTURED_DATA_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(buildAllStructuredData());
}

export default function SeoHead() {
  const { activeSection } = useActiveSection();

  useEffect(() => {
    injectStructuredData();
  }, []);

  useEffect(() => {
    const section = SECTION_SEO[activeSection] ?? SECTION_SEO[0];
    const url = sectionUrl(section.hash);
    const image = absoluteUrl(SITE.ogImage);

    document.title = section.title;

    upsertMeta('description', section.description);
    upsertMeta('keywords', SITE.keywords.join(', '));
    upsertMeta('author', SITE.name);
    upsertMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    upsertMeta('googlebot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    upsertMeta('application-name', SITE.name);
    upsertMeta('apple-mobile-web-app-title', 'Vanté');
    upsertMeta('format-detection', 'telephone=yes');

    upsertMeta('og:title', section.title, true);
    upsertMeta('og:description', section.description, true);
    upsertMeta('og:url', url, true);
    upsertMeta('og:type', 'website', true);
    upsertMeta('og:site_name', SITE.name, true);
    upsertMeta('og:locale', SITE.locale, true);
    upsertMeta('og:image', image, true);
    upsertMeta('og:image:alt', `${SITE.name} — ${SITE.tagline}`, true);
    upsertMeta('og:image:width', '1200', true);
    upsertMeta('og:image:height', '630', true);

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', section.title);
    upsertMeta('twitter:description', section.description);
    upsertMeta('twitter:image', image);
    upsertMeta('twitter:image:alt', `${SITE.name} — ${SITE.tagline}`);

    upsertLink('canonical', url);

    const hash = indexToHash(activeSection);
    const newHash = hash ? `#${hash}` : '';
    if (window.location.hash !== newHash) {
      const base = window.location.pathname + window.location.search;
      window.history.replaceState(null, '', hash ? `${base}#${hash}` : base);
    }
  }, [activeSection]);

  return null;
}
