import { useState, useEffect, useRef } from 'react';

export const useTimelineCardTracking = <T extends HTMLElement>(totalCards: number) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const cardRefs = useRef<(T | null)[]>([]);

  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cardIndex = cardRefs.current.findIndex(
              ref => ref === entry.target
            );

            if (cardIndex !== -1) {
              setActiveCardIndex(cardIndex);
            }
          }
        }
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    );

    cardRefs.current.forEach(cardRef => {
      if (cardRef) {
        cardObserver.observe(cardRef);
      }
    });

    return () => {
      cardRefs.current.forEach(cardRef => {
        if (cardRef) {
          cardObserver.unobserve(cardRef);
        }
      });
    };
  }, []);

  return {
    activeCardIndex,
    cardRefs
  };
};
