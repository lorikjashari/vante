import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  theme?: 'light' | 'dark';
  hover?: boolean;
  className?: string;
}

export default function Card({
  children,
  theme = 'light',
  hover = true,
  className = '',
}: CardProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={`
        rounded-2xl border backdrop-blur-sm
        ${isDark
          ? 'bg-cream/[0.04] border-cream/10'
          : 'bg-charcoal/[0.03] border-charcoal/8'
        }
        ${hover ? 'transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift group' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
