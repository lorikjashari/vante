import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const variants: Record<Variant, string> = {
  primary: 'bg-charcoal text-cream hover:bg-charcoal/85',
  secondary: 'bg-transparent text-charcoal border border-charcoal/20 hover:bg-charcoal/[0.04] hover:border-charcoal/45',
  ghost: 'bg-cream/10 text-cream hover:bg-cream/15',
  inverse: 'bg-accent text-charcoal hover:bg-accent/80',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-sm gap-2 min-w-[140px]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        group inline-flex items-center justify-center
        transition-all duration-200 active:scale-[0.97]
        disabled:opacity-50 disabled:pointer-events-none
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}
