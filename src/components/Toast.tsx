import { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] animate-slide-down"
      role="alert"
    >
      <div
        className={`
          flex items-center gap-3 px-5 py-4 rounded-2xl shadow-lift backdrop-blur-xl
          min-w-[280px] max-w-md border
          ${type === 'success'
            ? 'bg-charcoal/95 text-cream border-cream/15'
            : 'bg-red-600/95 text-white border-red-400/30'
          }
        `}
      >
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 flex-shrink-0 text-accent" />
        ) : (
          <XCircle className="w-5 h-5 flex-shrink-0" />
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
