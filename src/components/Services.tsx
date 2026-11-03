import {
  Code2,
  Palette,
  Globe2,
  Zap,
  Layers,
  TrendingUp,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import AmbientBackground from './AmbientBackground';
import SectionHeader from './ui/SectionHeader';
import Reveal from './Reveal';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Precision-built applications. Modern stacks. Engineered to scale without compromise.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Interfaces that feel inevitable — clear, refined, and impossible to ignore.',
  },
  {
    icon: Globe2,
    title: 'Business Websites',
    description: 'A presence that commands trust the moment someone lands on your page.',
  },
  {
    icon: Zap,
    title: 'Landing Pages',
    description: 'Single pages, singular focus — designed to convert with intent.',
  },
  {
    icon: Layers,
    title: 'Backend Systems',
    description: 'Architecture that holds under pressure. APIs built for what comes next.',
  },
  {
    icon: TrendingUp,
    title: 'Performance',
    description: 'Speed isn\'t a feature. It\'s the foundation everything else stands on.',
  },
  {
    icon: Sparkles,
    title: 'Custom Solutions',
    description: 'When off-the-shelf won\'t cut it — we build exactly what your business requires.',
  },
];

export default function Services() {
  return (
    <section id="services" className="section-shell bg-charcoal overflow-hidden">
      <AmbientBackground variant="dark" />
      <div className="section-shell-inner gap-2 md:gap-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 flex-1 min-h-0">
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start shrink-0">
            <Reveal>
              <SectionHeader
                label="Services"
                title="Capability without compromise."
                description="Strategy, design, and engineering — one team, one standard of excellence."
                theme="dark"
                align="left"
                className="!mb-0 md:!mb-10 [&_h2]:text-[2.4rem] [&_h2]:md:text-[4.2rem] [&_p]:hidden [&_p]:md:block"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-8 divide-y divide-cream/10 flex-1 min-h-0 overflow-hidden md:overflow-visible">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={index * 60}>
                  <article className="service-row group py-3.5 md:py-6 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3 md:gap-8">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 md:gap-3 mb-0 md:mb-2">
                          <Icon className="hidden md:block w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <h3 className="font-display text-lg md:text-2xl tracking-[-0.04em] text-cream transition-transform duration-300 group-hover:translate-x-1">
                            {service.title}
                          </h3>
                        </div>
                        <p className="hidden md:block text-sm text-cream/50 leading-relaxed max-w-lg">
                          {service.description}
                        </p>
                      </div>
                      <div className="hidden md:block w-0 group-hover:w-8 h-px bg-accent/60 self-center transition-all duration-500 flex-shrink-0" />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
