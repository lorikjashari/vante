/**
 * Minimal hero background — cream base, soft brand-toned depth, no clutter.
 */
export default function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-bg-base" />
      <div className="hero-bg-glow hero-bg-glow-a" />
      <div className="hero-bg-glow hero-bg-glow-b" />
      <div className="hero-bg-noise" />
    </div>
  );
}
