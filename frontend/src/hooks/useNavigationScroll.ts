import { useState, useEffect } from 'react';

interface PortfolioNavigationState {
  isVisible: boolean;
  isInWhiteSection: boolean;
}

const LIGHT_THEMED_SECTIONS = ['about', 'technical-skills', 'blog', 'contact'];

export function usePortfolioNavigation(): PortfolioNavigationState {
  const [isVisible, setIsVisible] = useState(true);
  const [isInWhiteSection, setIsInWhiteSection] = useState(false);

  useEffect(() => {
    const sectionElements = LIGHT_THEMED_SECTIONS
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const isLightSection = LIGHT_THEMED_SECTIONS.includes(entry.target.id);
            setIsInWhiteSection(isLightSection);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    );

    sectionElements.forEach(section => sectionObserver.observe(section));

    let previousScrollPosition = window.scrollY;

    const handleScrollEvent = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition < 100 || currentScrollPosition < previousScrollPosition) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      previousScrollPosition = currentScrollPosition;
    };

    window.addEventListener('scroll', handleScrollEvent, { passive: true });

    return () => {
      sectionElements.forEach(section => sectionObserver.unobserve(section));
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  return {
    isVisible,
    isInWhiteSection
  };
}
