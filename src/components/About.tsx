import { ArrowUpRight, Target, Eye, Award } from 'lucide-react';
import AmbientBackground from './AmbientBackground';
import SectionHeader from './ui/SectionHeader';
import Reveal from './Reveal';

const pillars = [
  {
    icon: Target,
    title: 'Mission',
    description: 'Elevate brands through digital work that creates lasting impact.',
  },
  {
    icon: Eye,
    title: 'Vision',
    description: 'To set the standard for what a digital studio can deliver.',
  },
  {
    icon: Award,
    title: 'Values',
    description: 'Precision, integrity, and an obsession with getting it right.',
  },
];

const process = [
  { title: 'Find the signal', description: 'We get close to the problem before we draw the solution.' },
  { title: 'Shape the system', description: 'We turn the strongest idea into a clear, flexible experience.' },
  { title: 'Ship with care', description: 'We build the details that make the work hold up in the real world.' },
];

export default function About() {
  return (
    <section id="about" className="section-shell bg-cream overflow-hidden">
      <AmbientBackground variant="light" />
      <div className="section-shell-inner gap-2 md:gap-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start flex-1 min-h-0">
          <div className="lg:col-span-5 shrink-0">
            <Reveal>
              <SectionHeader
                label="About"
                title="Born in Kosovo. Built for the world."
                align="left"
                className="!mb-0 md:!mb-10 [&_h2]:text-[2.6rem] [&_h2]:md:text-[4.2rem]"
              />
            </Reveal>

            <Reveal delay={120}>
              <blockquote className="hidden md:block mt-8 md:mt-12 max-w-md">
                <p className="font-display text-2xl md:text-4xl leading-[0.98] tracking-[-0.06em] text-charcoal/80">
                  “Design isn't decoration. It's the difference between being seen — and being remembered.”
                </p>
                <footer className="mt-5 text-xs tracking-[0.08em] text-charcoal/40">
                  Lorik Jashari, Founder
                </footer>
              </blockquote>
            </Reveal>
          </div>

          <div className="lg:col-span-7 flex-1 min-h-0 overflow-hidden md:overflow-visible">
            <Reveal delay={80}>
              <div className="border-t border-charcoal/15 pt-5 md:pt-8 mb-6 md:mb-10 transition-colors duration-500 hover:border-charcoal/40">
                <div className="flex gap-3 md:gap-8 items-start">
                  <img
                    src="/profile.png"
                    alt="Lorik Jashari"
                    className="w-20 h-20 md:w-36 md:h-36 rounded-none object-cover flex-shrink-0 grayscale"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] tracking-[0.08em] text-charcoal/45 mb-2">Founder / Creative director</p>
                    <h3 className="font-display text-xl md:text-3xl tracking-[-0.05em] text-charcoal mb-2 md:mb-4">Lorik Jashari</h3>
                    <p className="text-sm md:text-base text-charcoal/60 leading-relaxed max-w-xl">
                      Vanté exists for one reason: to build digital work that earns attention —
                      and keeps it. For brands across Europe that refuse to look ordinary.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <Reveal key={pillar.title} delay={160 + index * 80}>
                    <div className="pt-4 md:pt-5 border-t border-charcoal/15 hover:border-charcoal/50 transition-colors duration-300 h-full">
                      <Icon className="w-4 h-4 text-accent-dark mb-3" strokeWidth={1.5} />
                      <h4 className="font-display text-sm md:text-base tracking-[-0.03em] text-charcoal mb-1.5">{pillar.title}</h4>
                      <p className="hidden md:block text-xs text-charcoal/50 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={300}>
              <div className="mt-8 md:mt-14 border-t border-charcoal/15">
                <div className="flex items-center justify-between py-4">
                  <h3 className="font-display text-xl md:text-2xl tracking-[-0.05em] text-charcoal">How we work</h3>
                  <ArrowUpRight className="w-4 h-4 text-accent-dark" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                  {process.map((step, index) => (
                    <div key={step.title} className="border-t border-charcoal/10 pt-3">
                      <span className="text-[10px] text-charcoal/35">0{index + 1}</span>
                      <h4 className="font-display text-sm md:text-base tracking-[-0.03em] text-charcoal mt-3 mb-1.5">{step.title}</h4>
                      <p className="text-xs text-charcoal/50 leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
