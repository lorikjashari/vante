interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  theme?: 'light' | 'dark';
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  theme = 'light',
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const isDark = theme === 'dark';
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <header data-section={label} className={`max-w-2xl mb-8 md:mb-10 ${alignClass} ${className}`}>
      <h2
        className={`
          section-title mb-4 md:mb-6
          ${isDark ? 'text-cream' : 'text-charcoal'}
        `}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`
            text-sm md:text-base leading-relaxed max-w-[42ch]
            ${isDark ? 'text-cream/45' : 'text-charcoal/50'}
          `}
        >
          {description}
        </p>
      )}
    </header>
  );
}
