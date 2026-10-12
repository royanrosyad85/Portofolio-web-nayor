import { useCallback } from 'react';
import { useLenis } from 'lenis/react';

/** Decelerating curve: moves immediately on click (feels responsive), settles softly. */
export const SCROLL_EASE = (t: number) => 1 - (1 - t) ** 4;

/**
 * Duration grows with distance but sub-linearly, so a one-section hop takes
 * ~0.5s and a full-page jump caps under a second instead of feeling sluggish.
 */
export const getScrollDuration = (distance: number) => Math.min(0.95, 0.42 + Math.sqrt(Math.abs(distance)) / 220);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Smoothly scrolls to an element or y-offset; jumps instantly under reduced motion. */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (target: HTMLElement | number) => {
      const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY;
      const immediate = prefersReducedMotion();

      if (lenis) {
        lenis.scrollTo(target, {
          immediate,
          duration: getScrollDuration(top - window.scrollY),
          easing: SCROLL_EASE,
        });
        return;
      }

      window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
    },
    [lenis],
  );
}
