import { scrollToSection, SECTION_IDS } from '../lib/navigation';
import { useActiveSection } from '../hooks/useActiveSection';

const navLinks = [
  { id: 'services' as const, label: 'Services' },
  { id: 'about' as const, label: 'About' },
  { id: 'projects' as const, label: 'Work' },
  { id: 'contact' as const, label: 'Contact' },
];

export default function Navbar() {
  const { activeSection, isDarkSection } = useActiveSection();

  const handleNav = (id: typeof SECTION_IDS[number]) => {
    scrollToSection(id);
  };

  const onDark = isDarkSection;
  const textClass = onDark ? 'text-cream' : 'text-charcoal';
  const mutedClass = onDark ? 'text-cream/50 hover:text-cream' : 'text-charcoal/50 hover:text-charcoal';

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-5 md:px-12 py-5 md:py-7 pointer-events-none">
      <div className="max-w-[90rem] mx-auto flex items-center justify-between pointer-events-auto">
        <button
          onClick={() => handleNav('hero')}
          className={`flex items-center gap-3 transition-opacity hover:opacity-60 ${textClass}`}
          aria-label="Go to home"
        >
          <img
            src="/task_01kcac84xvf3srayqjx46je6a4_1765580016_img_0.webp"
            alt="Vanté Agency"
            className={`h-8 w-8 md:h-9 md:w-9 rounded-none object-cover transition-all duration-500 ${
              onDark ? 'invert brightness-200' : ''
            }`}
          />
          <span className="font-display text-sm md:text-base font-semibold tracking-[-0.04em]">Vanté</span>
        </button>

        <div
          className={`
            hidden md:flex items-center gap-7 transition-colors duration-500
          `}
        >
          {navLinks.map((link) => {
            const sectionMap = { services: 1, about: 2, projects: 3, contact: 4 };
            const isActive = activeSection === sectionMap[link.id];
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`
                  relative py-2 text-[11px] tracking-[0.04em] transition-all duration-300 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-current after:transition-all after:duration-300
                  ${isActive
                    ? `${textClass} after:w-full`
                    : `${mutedClass} after:w-0 hover:after:w-full`
                  }
                `}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handleNav('contact')}
          className={`
            hidden md:block px-5 py-3 text-[11px] font-medium tracking-[0.02em] transition-all duration-300
            ${onDark
              ? 'bg-accent text-charcoal hover:bg-accent/80'
              : 'bg-charcoal text-cream hover:bg-charcoal/85'
            }
          `}
        >
          Start a project
        </button>
      </div>
    </nav>
  );
}
