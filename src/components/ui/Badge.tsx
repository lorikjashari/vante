interface BadgeProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}

export default function Badge({ children, theme = 'dark' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 md:px-3 py-1 text-[9px] md:text-xs font-medium tracking-wide
        ${theme === 'dark'
          ? 'bg-cream/10 text-cream/90 border border-cream/15'
          : 'bg-charcoal/8 text-charcoal/80 border border-charcoal/10'
        }
      `}
    >
      {children}
    </span>
  );
}
