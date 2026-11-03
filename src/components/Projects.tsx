import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import AmbientBackground from './AmbientBackground';
import SectionHeader from './ui/SectionHeader';
import Badge from './ui/Badge';
import Reveal from './Reveal';

const projects = [
  {
    name: 'Apliko Dev',
    description: 'A digital product studio creating focused, high-performance web experiences.',
    url: 'https://aplikodv.com/',
    image: '/aplikodev.png',
    tags: ['Development', 'UI/UX'],
  },
  {
    name: 'Rizahi Sàrl',
    description: '250+ projects. 15 years of craft. A construction brand that carries its weight online.',
    url: 'https://rizahisarl.ch/',
    image: '/rizahisarl.png',
    tags: ['Development', 'Branding'],
  },
  {
    name: 'Erapropre Bim Sàrl',
    description: 'Industrial ventilation and climate solutions in Geneva — expertise, presented with clarity.',
    url: 'https://erapropre.com/',
    image: '/erapropre.png',
    tags: ['Development', 'Services'],
  },
  {
    name: 'FAF Services',
    description: 'Swiss cleaning excellence, translated into a digital presence as precise as their work.',
    url: 'https://fafservices.ch/',
    image: '/fafservices.png',
    tags: ['Development', 'Business'],
  },
  {
    name: 'IMPERIUM AUTO GENÈVE',
    description: 'Geneva\'s premium automotive presence — curated, confident, unmistakably luxury.',
    url: 'https://imperiumgeneve.ch/',
    image: '/imperiumgeneve.png',
    tags: ['Development', 'Automotive'],
  },
  {
    name: '8A8 Esports Café',
    description: 'A high-performance gaming destination — RTX-powered, esports-ready, built for the competitive edge.',
    url: 'https://8a8gaming.com/',
    image: '/8a8gaming.png',
    tags: ['Development', 'Gaming'],
  },
  {
    name: 'QIWO Global Logistic',
    description: 'A logistics platform engineered for global supply chains — fast, clear, built to move.',
    url: 'https://qiwogloballogistic.com/',
    image: '/qiwogloballogistic.png',
    tags: ['Development', 'Logistics'],
  },
  {
    name: 'Global Bâtiment SA',
    description: 'Construction and renovation expertise presented through a confident Swiss digital presence.',
    url: 'https://globalbatiment.ch/',
    image: '/globalbatiment.png',
    tags: ['Development', 'Construction'],
  },
  {
    name: 'EDIL IDEA SA',
    description: 'Geneva masonry and construction delivered with a clear, premium digital identity.',
    url: 'https://edilidea-sa.ch/',
    image: '/edilidea-sa.png',
    tags: ['Development', 'Construction'],
  },
];

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const selectProject = useCallback((index: number) => {
    setDirection(index >= current ? 'next' : 'prev');
    setCurrent(index);
  }, [current]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDirection('next');
      setCurrent((value) => (value + 1) % projects.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  const project = projects[current];

  return (
    <section id="projects" className="section-shell section-shell--projects bg-charcoal">
      <AmbientBackground variant="dark" />
      <div className="section-shell-inner gap-4 md:gap-6">
        <Reveal className="shrink-0">
          <div className="flex items-end justify-between gap-6">
            <SectionHeader
              label="Work"
              title="Proof, not promises."
              description="A living index of digital work for brands across Europe, Kosovo, and beyond."
              theme="dark"
              align="left"
              className="!mb-0 [&_h2]:text-[2.4rem] [&_h2]:md:text-[4rem] [&_h2]:mb-2 [&_p]:hidden [&_p]:md:block [&_p]:text-xs [&_p]:md:text-sm"
            />
            <span className="hidden md:block pb-1 text-[10px] tracking-[0.12em] text-cream/35">
              {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8 flex-1 min-h-0">
          <Reveal delay={90} className="lg:col-span-7 min-h-0 order-2 lg:order-1">
            <div className="h-full min-h-0 overflow-y-auto scrollbar-hide border-t border-cream/15">
              {projects.map((item, index) => {
                const active = current === index;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => selectProject(index)}
                    className={`group w-full text-left flex items-center gap-3 md:gap-5 py-3.5 md:py-4 border-b border-cream/10 transition-colors duration-300 ${
                      active ? 'text-cream' : 'text-cream/40 hover:text-cream/80'
                    }`}
                    aria-label={`View ${item.name}`}
                    aria-current={active ? 'true' : undefined}
                  >
                    <span className={`w-5 text-[10px] md:text-xs transition-colors ${active ? 'text-accent' : 'text-cream/25'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-lg md:text-2xl tracking-[-0.05em] flex-1">
                      {item.name}
                    </span>
                    <ArrowUpRight className={`w-4 h-4 transition-all duration-300 ${
                      active ? 'text-accent opacity-100' : 'opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'
                    }`} />
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={160} className="lg:col-span-5 min-h-0 order-1 lg:order-2">
            <article
              key={current}
              className={`h-full min-h-0 flex flex-col project-slide-${direction}`}
            >
              <div className="relative flex-1 min-h-0 overflow-hidden border border-cream/15 bg-cream/[0.03]">
                <img
                  src={project.image}
                  alt={`${project.name} — web design project by Vanté Agency`}
                  loading={current === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-contain p-3 md:p-5"
                />
                <div className="absolute left-3 top-3 md:left-5 md:top-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
                  <span className="text-[9px] tracking-[0.12em] text-cream/55">Selected work</span>
                </div>
              </div>

              <div className="pt-4 md:pt-5 flex items-start justify-between gap-5">
                <div className="min-w-0">
                  <p className="text-[11px] md:text-sm text-cream/55 leading-relaxed max-w-md mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
                  </div>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs md:text-sm text-cream hover:text-accent transition-colors group/link"
                >
                  Visit
                  <MoveUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
