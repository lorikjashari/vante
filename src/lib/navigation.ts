const SECTION_IDS = ['hero', 'services', 'about', 'projects', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

const SECTION_INDEX: Record<SectionId, number> = {
  hero: 0,
  services: 1,
  about: 2,
  projects: 3,
  contact: 4,
};

const HASH_TO_INDEX: Record<string, number> = {
  '': 0,
  services: 1,
  about: 2,
  projects: 3,
  work: 3,
  contact: 4,
};

export function getScrollContainer(): HTMLElement | null {
  return document.querySelector('.horizontal-scroll-container');
}

export function getSectionWidth(container: HTMLElement = getScrollContainer()!): number {
  return container?.clientWidth ?? window.innerWidth;
}

export function getSectionScrollLeft(index: number, container?: HTMLElement | null): number {
  const el = container ?? getScrollContainer();
  if (!el) return 0;
  return index * getSectionWidth(el);
}

export function getActiveSectionFromScroll(container: HTMLElement): number {
  const width = getSectionWidth(container);
  if (width <= 0) return 0;
  const index = Math.round(container.scrollLeft / width);
  const sections = container.querySelectorAll('.horizontal-section');
  return Math.max(0, Math.min(index, sections.length - 1));
}

export function scrollToIndex(index: number, behavior: ScrollBehavior = 'smooth') {
  const container = getScrollContainer();
  if (!container) return;

  const sections = container.querySelectorAll('.horizontal-section');
  const clamped = Math.max(0, Math.min(index, sections.length - 1));

  container.scrollTo({
    left: getSectionScrollLeft(clamped, container),
    behavior,
  });
}

export function scrollToSection(id: SectionId, behavior: ScrollBehavior = 'smooth') {
  if (SECTION_INDEX[id] === undefined) return;
  scrollToIndex(SECTION_INDEX[id], behavior);
}

export function scrollToHash(hash: string, behavior: ScrollBehavior = 'auto') {
  const key = hash.replace(/^#/, '').toLowerCase();
  const index = HASH_TO_INDEX[key];
  if (index !== undefined) {
    scrollToIndex(index, behavior);
  }
}

export function indexToHash(index: number): string {
  const map: Record<number, string> = {
    0: '',
    1: 'services',
    2: 'about',
    3: 'projects',
    4: 'contact',
  };
  return map[index] ?? '';
}

export { SECTION_IDS };
