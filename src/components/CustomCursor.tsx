import { useEffect, useRef, useState } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';

const LERP_DOT = 0.28;
const LERP_RING = 0.14;
const LERP_HOVER = 0.18;
const LERP_PRESS = 0.24;
const LERP_THEME = 0.12;
const LERP_VEL = 0.32;
const LERP_DEFORM = 0.2;

const CHARCOAL = { r: 16, g: 17, b: 17 };
const CREAM = { r: 244, g: 241, b: 232 };

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const mixColor = (themeAmount: number, alpha: number) => {
  const r = Math.round(lerp(CHARCOAL.r, CREAM.r, themeAmount));
  const g = Math.round(lerp(CHARCOAL.g, CREAM.g, themeAmount));
  const b = Math.round(lerp(CHARCOAL.b, CREAM.b, themeAmount));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/** Organic pear / avocado border-radius from motion direction */
function organicBorderRadius(deform: number, angleDeg: number): string {
  if (deform < 0.04) return '50%';

  const rad = (angleDeg * Math.PI) / 180;
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  const d = deform * 26;

  const tl = clamp(50 + (-c + s) * d * 0.42, 30, 70);
  const tr = clamp(50 + (c + s) * d * 0.42, 30, 70);
  const br = clamp(50 + (c - s) * d * 0.58, 26, 74);
  const bl = clamp(50 + (-c - s) * d * 0.58, 26, 74);

  const tlY = clamp(50 + s * d * 0.48, 32, 68);
  const trY = clamp(50 + s * d * 0.38, 32, 68);
  const brY = clamp(50 - s * d * 0.52, 28, 72);
  const blY = clamp(50 - s * d * 0.52, 28, 72);

  return `${tl}% ${tr}% ${br}% ${bl}% / ${tlY}% ${trY}% ${brY}% ${blY}%`;
}

function buildDeformedTransform(
  x: number,
  y: number,
  angleDeg: number,
  deform: number,
  visScale: number,
  pressScale: number,
  deformStrength = 1
) {
  const d = deform * deformStrength;
  const stretch = 1 + d * 0.68;
  const squash = 1 - d * 0.36;
  const scale = visScale * pressScale;

  return [
    `translate3d(${x}px, ${y}px, 0)`,
    'translate(-50%, -50%)',
    `rotate(${angleDeg}deg)`,
    `scale(${stretch * scale}, ${squash * scale})`,
    `rotate(${-angleDeg}deg)`,
  ].join(' ');
}

function isDarkAtPoint(x: number, y: number, fallback: boolean): boolean {
  const el = document.elementFromPoint(x, y);
  if (!el) return fallback;
  if (el.closest('nav')) return fallback;

  let node: Element | null = el;
  while (node && node !== document.documentElement) {
    if (node instanceof HTMLElement) {
      if (node.classList.contains('bg-charcoal')) return true;
      if (node.classList.contains('bg-cream')) return false;
    }
    node = node.parentElement;
  }

  const section = el.closest('.horizontal-section')?.querySelector('section') as HTMLElement | null;
  if (section?.classList.contains('bg-charcoal')) return true;
  if (section?.classList.contains('bg-cream')) return false;

  return fallback;
}

function getInteractiveTarget(x: number, y: number): { x: number; y: number; active: boolean } {
  const el = document.elementFromPoint(x, y)?.closest(INTERACTIVE);
  if (!(el instanceof HTMLElement)) return { x, y, active: false };

  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const pull = el.dataset.cursorMagnetic === 'strong' ? 0.32 : 0.22;

  return {
    x: lerp(x, cx, pull),
    y: lerp(y, cy, pull),
    active: true,
  };
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  const raw = useRef({ x: -100, y: -100 });
  const prevRaw = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const deform = useRef(0);

  const dot = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  const hover = useRef(0);
  const press = useRef(0);
  const theme = useRef(0);
  const visible = useRef(0);

  const hoverTarget = useRef(0);
  const pressTarget = useRef(0);
  const themeTarget = useRef(0);
  const ringTarget = useRef({ x: -100, y: -100 });

  const visibleRef = useRef(false);
  const { isDarkSection } = useActiveSection();
  const fallbackDarkRef = useRef(isDarkSection);
  fallbackDarkRef.current = isDarkSection;

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduced) return;

    setEnabled(true);
    document.body.classList.add('custom-cursor');

    const syncFromPoint = (x: number, y: number) => {
      themeTarget.current = isDarkAtPoint(x, y, fallbackDarkRef.current) ? 1 : 0;
      const interactive = getInteractiveTarget(x, y);
      hoverTarget.current = interactive.active ? 1 : 0;
      ringTarget.current = interactive.active
        ? { x: interactive.x, y: interactive.y }
        : { x, y };
    };

    const onMove = (e: MouseEvent) => {
      raw.current = { x: e.clientX, y: e.clientY };
      syncFromPoint(e.clientX, e.clientY);
      if (!visibleRef.current) visibleRef.current = true;
    };

    const onDown = () => { pressTarget.current = 1; };
    const onUp = () => { pressTarget.current = 0; };
    const onLeave = () => { visibleRef.current = false; };
    const onEnter = () => { visibleRef.current = true; };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    let frame: number;
    const tick = () => {
      const dx = raw.current.x - prevRaw.current.x;
      const dy = raw.current.y - prevRaw.current.y;
      prevRaw.current = { ...raw.current };

      velocity.current.x = lerp(velocity.current.x, dx, LERP_VEL);
      velocity.current.y = lerp(velocity.current.y, dy, LERP_VEL);
      velocity.current.x = lerp(velocity.current.x, 0, 0.06);
      velocity.current.y = lerp(velocity.current.y, 0, 0.06);

      hover.current = lerp(hover.current, hoverTarget.current, LERP_HOVER);
      press.current = lerp(press.current, pressTarget.current, LERP_PRESS);
      theme.current = lerp(theme.current, themeTarget.current, LERP_THEME);
      visible.current = lerp(visible.current, visibleRef.current ? 1 : 0, 0.18);

      const speed = Math.hypot(velocity.current.x, velocity.current.y);
      const angleDeg = (Math.atan2(velocity.current.y, velocity.current.x) * 180) / Math.PI;
      const deformTarget = clamp(speed / 16, 0, 1) * (1 - hover.current * 0.55);
      deform.current = lerp(deform.current, deformTarget, LERP_DEFORM);

      const ringX = lerp(raw.current.x, ringTarget.current.x, hover.current * 0.8);
      const ringY = lerp(raw.current.y, ringTarget.current.y, hover.current * 0.8);

      dot.current.x = lerp(dot.current.x, raw.current.x, LERP_DOT);
      dot.current.y = lerp(dot.current.y, raw.current.y, LERP_DOT);
      ring.current.x = lerp(ring.current.x, ringX, LERP_RING);
      ring.current.y = lerp(ring.current.y, ringY, LERP_RING);

      const t = theme.current;
      const h = hover.current;
      const p = press.current;
      const v = visible.current;
      const d = deform.current;

      const pressScale = lerp(1, 0.86, p);
      const visScale = lerp(0.9, 1, v);
      const radius = organicBorderRadius(d, angleDeg);

      const ringSize = lerp(34, 58, h) * pressScale;
      const ringBorder = lerp(1, 1.5, h);
      const ringBorderAlpha = lerp(0.42, 0.78, h);

      const dotSize = lerp(5, 7, h) * lerp(1, 0.75, p);
      const dotAlpha = lerp(1, 0.35, h) * v;

      const haloSize = lerp(34, 72, h) * pressScale * (1 + d * 0.15);
      const haloAlpha = h * 0.07 * v;

      const ringTransform = buildDeformedTransform(
        ring.current.x,
        ring.current.y,
        angleDeg,
        d,
        visScale,
        pressScale,
        1
      );
      const haloTransform = buildDeformedTransform(
        ring.current.x,
        ring.current.y,
        angleDeg,
        d,
        visScale,
        pressScale,
        1.25
      );
      const dotTransform = buildDeformedTransform(
        dot.current.x,
        dot.current.y,
        angleDeg,
        d,
        visScale,
        lerp(1, 0.75, p),
        0.35
      );

      if (ringRef.current) {
        ringRef.current.style.transform = ringTransform;
        ringRef.current.style.width = `${ringSize}px`;
        ringRef.current.style.height = `${ringSize}px`;
        ringRef.current.style.borderRadius = radius;
        ringRef.current.style.backgroundColor = 'transparent';
        ringRef.current.style.borderColor = mixColor(t, ringBorderAlpha);
        ringRef.current.style.borderWidth = `${ringBorder}px`;
        ringRef.current.style.opacity = `${v}`;
      }

      if (haloRef.current) {
        haloRef.current.style.transform = haloTransform;
        haloRef.current.style.width = `${haloSize}px`;
        haloRef.current.style.height = `${haloSize}px`;
        haloRef.current.style.borderRadius = organicBorderRadius(d * 1.15, angleDeg);
        haloRef.current.style.backgroundColor = mixColor(t, haloAlpha);
        haloRef.current.style.opacity = `${Math.max(h * v, d * v * 0.35)}`;
        haloRef.current.style.filter = `blur(${lerp(10, 16, d)}px)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = dotTransform;
        dotRef.current.style.width = `${dotSize}px`;
        dotRef.current.style.height = `${dotSize}px`;
        dotRef.current.style.borderRadius = organicBorderRadius(d * 0.5, angleDeg);
        dotRef.current.style.backgroundColor = mixColor(t, 1);
        dotRef.current.style.opacity = `${dotAlpha}`;
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove('custom-cursor');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const container = document.querySelector('.horizontal-scroll-container');
    if (!container) return;

    const syncFromPointOnScroll = () => {
      const { x, y } = raw.current;
      themeTarget.current = isDarkAtPoint(x, y, fallbackDarkRef.current) ? 1 : 0;
      const interactive = getInteractiveTarget(x, y);
      hoverTarget.current = interactive.active ? 1 : 0;
      ringTarget.current = interactive.active ? { x: interactive.x, y: interactive.y } : { x, y };
    };

    container.addEventListener('scroll', syncFromPointOnScroll, { passive: true });
    return () => container.removeEventListener('scroll', syncFromPointOnScroll);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      <div ref={haloRef} className="custom-cursor-halo" />
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
