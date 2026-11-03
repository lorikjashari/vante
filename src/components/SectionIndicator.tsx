import { scrollToIndex } from '../lib/navigation';
import { useActiveSection } from '../hooks/useActiveSection';

const sections = [
  { num: '01', label: 'Home' },
  { num: '02', label: 'Services' },
  { num: '03', label: 'About' },
  { num: '04', label: 'Work' },
  { num: '05', label: 'Contact' },
];

export default function SectionIndicator() {
  const { activeSection, isDarkSection } = useActiveSection();

  const lineColor = (active: boolean) =>
    active
      ? isDarkSection ? '#D7FF54' : '#101111'
      : isDarkSection ? 'rgba(244,241,232,0.2)' : 'rgba(16,17,17,0.15)';

  const dotColor = (active: boolean) =>
    active
      ? isDarkSection ? '#D7FF54' : '#101111'
      : isDarkSection ? 'rgba(244,241,232,0.35)' : 'rgba(16,17,17,0.2)';

  return (
    <>
      {/* Desktop — side rail */}
      <div className="fixed left-5 md:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        {sections.map(({ num }, index) => (
          <button
            key={num}
            onClick={() => scrollToIndex(index)}
            className="group flex items-center gap-3"
            aria-label={`Go to section ${num}`}
            aria-current={activeSection === index ? 'true' : undefined}
          >
            <div
              className={`
                h-px transition-all duration-500 ease-out-expo
                ${activeSection === index ? 'w-6' : 'w-3 group-hover:w-5'}
              `}
              style={{ backgroundColor: lineColor(activeSection === index) }}
            />
            <span
              className={`
                text-[9px] tracking-[0.15em] transition-opacity duration-300
                ${activeSection === index ? 'opacity-60' : 'opacity-0 group-hover:opacity-40'}
                ${isDarkSection ? 'text-cream' : 'text-charcoal'}
              `}
            >
              {num}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile — bottom dots (replaces hamburger menu) */}
      <div
        className="fixed inset-x-0 bottom-0 z-[100] md:hidden pointer-events-none"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div
          className={`
            mx-auto w-fit flex items-center gap-1 px-2 py-2 rounded-full border backdrop-blur-xl pointer-events-auto
            ${isDarkSection ? 'bg-charcoal/75 border-cream/10' : 'bg-cream/85 border-charcoal/10'}
          `}
        >
          {sections.map(({ label }, index) => (
            <button
              key={label}
              onClick={() => scrollToIndex(index)}
              className="p-1.5"
              aria-label={`Go to ${label}`}
              aria-current={activeSection === index ? 'true' : undefined}
            >
              <span
                className="block rounded-full transition-all duration-300 ease-out-expo"
                style={{
                  width: activeSection === index ? '1.25rem' : '0.375rem',
                  height: '0.375rem',
                  backgroundColor: dotColor(activeSection === index),
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
