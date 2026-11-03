import { useEffect, useState } from 'react';
import { getActiveSectionFromScroll, getScrollContainer } from '../lib/navigation';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const container = getScrollContainer();
    if (!container) return;

    const handleScroll = () => {
      setActiveSection(getActiveSectionFromScroll(container));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const isDarkSection = activeSection === 1 || activeSection === 3;

  return { activeSection, isDarkSection };
}
