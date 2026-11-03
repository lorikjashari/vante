interface AmbientBackgroundProps {
  variant?: 'light' | 'dark';
}

export default function AmbientBackground({ variant = 'light' }: AmbientBackgroundProps) {
  const isDark = variant === 'dark';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className={`ambient-orb ambient-orb-1 ${isDark ? 'ambient-orb-dark' : 'ambient-orb-light'}`} />
      <div className={`ambient-orb ambient-orb-2 ${isDark ? 'ambient-orb-dark-alt' : 'ambient-orb-light-alt'}`} />
      <div className={`ambient-vignette ${isDark ? 'ambient-vignette-dark' : ''}`} />
      <div className="ambient-grid" />
      <div className="ambient-noise" />
    </div>
  );
}
