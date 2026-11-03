import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  dark?: boolean;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  dark?: boolean;
}

export function Input({ label, id, dark = false, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className={`block text-[10px] tracking-[0.12em] uppercase ${dark ? 'text-cream/40' : 'text-charcoal/50'}`}
      >
        {label}
      </label>
      <input
        id={id}
        className={`
          w-full px-0 py-3 text-sm border-0 border-b focus:outline-none transition-all duration-300
          ${dark
            ? 'bg-transparent border-cream/20 text-cream placeholder:text-cream/25 focus:border-accent'
            : 'bg-transparent border-charcoal/15 text-charcoal placeholder:text-charcoal/30 focus:border-charcoal/50'
          }
          ${className}
        `}
        {...props}
      />
    </div>
  );
}

export function Textarea({ label, id, dark = false, className = '', ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className={`block text-[10px] tracking-[0.12em] uppercase ${dark ? 'text-cream/40' : 'text-charcoal/50'}`}
      >
        {label}
      </label>
      <textarea
        id={id}
        className={`
          w-full px-0 py-3 text-sm border-0 border-b focus:outline-none transition-all duration-300 resize-none
          ${dark
            ? 'bg-transparent border-cream/20 text-cream placeholder:text-cream/25 focus:border-accent'
            : 'bg-transparent border-charcoal/15 text-charcoal placeholder:text-charcoal/30 focus:border-charcoal/50'
          }
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
