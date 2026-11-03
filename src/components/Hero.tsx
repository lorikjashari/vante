import { ChevronRight } from 'lucide-react';
import HeroBackground from './HeroBackground';
import Button from './ui/Button';
import { scrollToSection } from '../lib/navigation';

export default function Hero() {
  return (
    <section id="hero" className="section-shell bg-cream overflow-hidden">
      <HeroBackground />

      <div className="section-shell-inner relative z-10 flex flex-col items-center justify-center min-h-[calc(100dvh-6rem)] text-center">
        <h1 className="headline-display text-charcoal max-w-5xl mb-7 md:mb-9 animate-fade-in-up text-balance">
          Digital work
          <br />
          with a pulse.
        </h1>

        <p className="text-base md:text-lg text-charcoal/60 max-w-[34rem] leading-relaxed mb-10 md:mb-12 animate-fade-in-up-delay-1">
          Vanté is a digital studio from Kosovo. We shape brands, interfaces, and products that move at the speed of ambition.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-16 md:mb-20 animate-fade-in-up-delay-2">
          <Button size="lg" onClick={() => scrollToSection('contact')}>
            Begin a project
          </Button>
          <Button variant="secondary" size="lg" onClick={() => scrollToSection('projects')}>
            Explore work
          </Button>
        </div>

        <div className="flex items-center gap-3 text-[11px] tracking-[0.03em] text-charcoal/45 animate-fade-in-up-delay-3">
          <span className="w-8 h-px bg-accent-dark" />
          <span>Independent studio · Europe & worldwide</span>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2 text-charcoal/25 z-10">
        <span className="text-[9px] tracking-[0.25em] writing-mode-vertical">SCROLL</span>
        <ChevronRight className="w-4 h-4 animate-nudge-x" />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex xl:hidden items-center gap-2 text-charcoal/25 z-10">
        <span className="text-[9px] tracking-[0.2em]">SWIPE</span>
        <ChevronRight className="w-3.5 h-3.5 rotate-180 animate-nudge-x-reverse" />
      </div>
    </section>
  );
}
