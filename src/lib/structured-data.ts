import {
  FAQ_SEO,
  PORTFOLIO_SEO,
  SITE,
  SITE_URL,
  absoluteUrl,
  sectionUrl,
} from './seo.config';

function orgId() {
  return `${SITE_URL.replace(/\/$/, '')}/#organization`;
}

function websiteId() {
  return `${SITE_URL.replace(/\/$/, '')}/#website`;
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': orgId(),
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.description,
    url: SITE_URL,
    logo: absoluteUrl(SITE.logo),
    image: absoluteUrl(SITE.ogImage),
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: SITE.foundingDate,
    founder: {
      '@type': 'Person',
      name: SITE.founder,
      jobTitle: 'Founder',
      worksFor: { '@id': orgId() },
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: SITE.country,
      addressRegion: SITE.region,
    },
    areaServed: [
      { '@type': 'Country', name: 'Kosovo' },
      { '@type': 'Country', name: 'Switzerland' },
      { '@type': 'Place', name: 'Europe' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    serviceType: [
      'Web Development',
      'UI/UX Design',
      'Landing Page Design',
      'Backend Development',
      'Performance Optimization',
      'Custom Software Development',
    ],
    sameAs: SITE.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: SITE.email,
      telephone: SITE.phone,
      availableLanguage: ['English', 'Albanian'],
      areaServed: 'Worldwide',
    },
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId(),
    name: SITE.name,
    alternateName: 'Vanté',
    url: SITE_URL,
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: { '@id': orgId() },
    potentialAction: {
      '@type': 'ContactAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: sectionUrl('contact'),
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      name: 'Contact Vanté Agency',
    },
  };
}

export function buildWebPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL.replace(/\/$/, '')}/#webpage`,
    url: SITE_URL,
    name: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    isPartOf: { '@id': websiteId() },
    about: { '@id': orgId() },
    inLanguage: SITE.language,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(SITE.ogImage),
    },
    hasPart: [
      { '@type': 'WebPageElement', name: 'Services', url: sectionUrl('services') },
      { '@type': 'WebPageElement', name: 'About', url: sectionUrl('about') },
      { '@type': 'WebPageElement', name: 'Work', url: sectionUrl('projects') },
      { '@type': 'WebPageElement', name: 'Contact', url: sectionUrl('contact') },
    ],
  };
}

export function buildPortfolioSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vanté Agency Portfolio',
    description: 'Selected web development and design projects by Vanté Agency.',
    numberOfItems: PORTFOLIO_SEO.length,
    itemListElement: PORTFOLIO_SEO.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.name,
        description: project.description,
        url: project.url,
        image: absoluteUrl(project.image),
        creator: { '@id': orgId() },
      },
    })),
  };
}

export function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_SEO.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: sectionUrl('services') },
      { '@type': 'ListItem', position: 3, name: 'About', item: sectionUrl('about') },
      { '@type': 'ListItem', position: 4, name: 'Work', item: sectionUrl('projects') },
      { '@type': 'ListItem', position: 5, name: 'Contact', item: sectionUrl('contact') },
    ],
  };
}

export function buildAllStructuredData() {
  return [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildWebPageSchema(),
    buildPortfolioSchema(),
    buildFaqSchema(),
    buildBreadcrumbSchema(),
  ];
}
