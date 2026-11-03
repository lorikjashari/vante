import { useEffect, useRef, useState, ReactNode } from 'react';
import {
  getActiveSectionFromScroll,
  scrollToHash,
  scrollToIndex,
} from '../lib/navigation';

interface HorizontalScrollProps {
  children: ReactNode;
}

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [progressBarColor, setProgressBarColor] = useState('#1A1B1A');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* Scroll to hash on load + when user uses back/forward */
  useEffect(() => {
    const applyHash = () => {
      const container = containerRef.current;
      if (!container) return;
      scrollToHash(window.location.hash, 'auto');
    };

    const raf = requestAnimationFrame(() => {
      applyHash();
      requestAnimationFrame(applyHash);
    });

    window.addEventListener('hashchange', applyHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('hashchange', applyHash);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScrollProgress = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? (container.scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);

      const currentSection = getActiveSectionFromScroll(container);
      setProgressBarColor(currentSection === 1 || currentSection === 3 ? '#C4A962' : '#1A1B1A');
    };

    container.addEventListener('scroll', handleScrollProgress, { passive: true });
    window.addEventListener('resize', handleScrollProgress);
    handleScrollProgress();

    return () => {
      container.removeEventListener('scroll', handleScrollProgress);
      window.removeEventListener('resize', handleScrollProgress);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const currentSection = getActiveSectionFromScroll(container);
      const sections = container.querySelectorAll('.horizontal-section');

      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        e.preventDefault();
        isScrollingRef.current = true;
        scrollToIndex(currentSection + 1);
        window.setTimeout(() => { isScrollingRef.current = false; }, 850);
      } else if (e.deltaY < 0 && currentSection > 0) {
        e.preventDefault();
        isScrollingRef.current = true;
        scrollToIndex(currentSection - 1);
        window.setTimeout(() => { isScrollingRef.current = false; }, 850);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isMobile]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-charcoal/5">
        <div
          className="h-full transition-all duration-500 ease-out-expo"
          style={{ width: `${scrollProgress}%`, backgroundColor: progressBarColor }}
        />
      </div>
      <div ref={containerRef} className="horizontal-scroll-container">
        {children}
      </div>
    </>
  );
}
