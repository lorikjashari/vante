export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://vanteagency.dev';

export const SITE = {
  name: 'Vanté Agency',
  legalName: 'Vanté Agency',
  tagline: 'Built to be remembered.',
  description:
    'Vanté Agency is a digital studio from Kosovo. We design and engineer web experiences, UI/UX, and custom software for ambitious brands across Europe and worldwide.',
  email: 'contact@vanteagency.dev',
  phone: '+38344296750',
  phoneDisplay: '+383 44 296 750',
  locale: 'en_US',
  language: 'en',
  country: 'XK',
  region: 'Kosovo',
  founder: 'Lorik Jashari',
  foundingDate: '2020',
  logo: '/task_01kcac84xvf3srayqjx46je6a4_1765580016_img_0.webp',
  ogImage: '/task_01kcac84xvf3srayqjx46je6a4_1765580016_img_0.webp',
  twitterHandle: '@vanteagency',
  keywords: [
    'web development agency',
    'UI UX design Kosovo',
    'digital studio Europe',
    'custom website development',
    'landing page design',
    'web design Switzerland',
    'Vanté Agency',
    'premium web development',
    'React development agency',
    'brand website design',
  ],
  sameAs: [
    'https://www.linkedin.com/company/vante-agency',
  ],
} as const;

export const SECTION_SEO = [
  {
    id: 'hero',
    hash: '',
    title: 'Vanté Agency — Built to Be Remembered',
    description:
      'Digital studio from Kosovo. We design and engineer premium web experiences for brands that demand more than ordinary.',
  },
  {
    id: 'services',
    hash: 'services',
    title: 'Web Development & Design Services — Vanté Agency',
    description:
      'Web development, UI/UX design, landing pages, backend systems, and performance optimization — one team, one standard of excellence.',
  },
  {
    id: 'about',
    hash: 'about',
    title: 'About Vanté Agency — Born in Kosovo, Built for the World',
    description:
      'Meet the team behind Vanté Agency. A Kosovo-born digital studio trusted by brands across Europe for design, development, and craft.',
  },
  {
    id: 'projects',
    hash: 'projects',
    title: 'Portfolio & Case Studies — Vanté Agency',
    description:
      'Selected work for Apliko Dev, Rizahi, Erapropre, FAF Services, Imperium Auto Genève, 8A8, QIWO, Global Bâtiment, and EDIL IDEA.',
  },
  {
    id: 'contact',
    hash: 'contact',
    title: 'Contact Vanté Agency — Start Your Project',
    description:
      'Tell us what you\'re building. Contact Vanté Agency — we respond within 24 hours. Based in Kosovo, working worldwide.',
  },
] as const;

export const PORTFOLIO_SEO = [
  {
    name: 'Apliko Dev',
    url: 'https://aplikodv.com/',
    image: '/aplikodev.png',
    description: 'Digital product studio creating focused, high-performance web experiences.',
  },
  {
    name: 'Rizahi Sàrl',
    url: 'https://rizahisarl.ch/',
    image: '/rizahisarl.png',
    description: 'Swiss construction company with 250+ completed projects.',
  },
  {
    name: 'Erapropre Bim Sàrl',
    url: 'https://erapropre.com/',
    image: '/erapropre.png',
    description: 'Industrial ventilation and climate solutions in Geneva.',
  },
  {
    name: 'FAF Services',
    url: 'https://fafservices.ch/',
    image: '/fafservices.png',
    description: 'Professional cleaning company website in Switzerland.',
  },
  {
    name: 'IMPERIUM AUTO GENÈVE',
    url: 'https://imperiumgeneve.ch/',
    image: '/imperiumgeneve.png',
    description: 'Premium automotive digital presence in Geneva, Switzerland.',
  },
  {
    name: '8A8 Esports Café',
    url: 'https://8a8gaming.com/',
    image: '/8a8gaming.png',
    description: 'High-performance gaming center website and brand experience.',
  },
  {
    name: 'Qiwo Global Logistic',
    url: 'https://qiwogloballogistic.com/',
    image: '/qiwogloballogistic.png',
    description: 'Logistics platform engineered for global supply chains.',
  },
  {
    name: 'Global Bâtiment SA',
    url: 'https://globalbatiment.ch/',
    image: '/globalbatiment.png',
    description: 'Construction and renovation expertise in Switzerland.',
  },
  {
    name: 'EDIL IDEA SA',
    url: 'https://edilidea-sa.ch/',
    image: '/edilidea-sa.png',
    description: 'Masonry and construction company based in Geneva.',
  },
] as const;

export const FAQ_SEO = [
  {
    question: 'What services does Vanté Agency offer?',
    answer:
      'Vanté Agency offers web development, UI/UX design, business websites, landing pages, backend systems, performance optimization, and custom digital solutions for brands worldwide.',
  },
  {
    question: 'Where is Vanté Agency based?',
    answer:
      'Vanté Agency is based in Kosovo and works with clients across Europe and internationally, including Switzerland, Kosovo, and beyond.',
  },
  {
    question: 'How quickly does Vanté Agency respond to inquiries?',
    answer:
      'We respond to all project inquiries within 24 hours with clear, actionable feedback and next steps.',
  },
  {
    question: 'What types of clients does Vanté Agency work with?',
    answer:
      'We partner with ambitious brands, startups, and established businesses that need premium digital design and development — from logistics and automotive to gaming, construction, and professional services.',
  },
] as const;

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function sectionUrl(hash: string): string {
  return hash ? `${SITE_URL.replace(/\/$/, '')}/#${hash}` : SITE_URL;
}
