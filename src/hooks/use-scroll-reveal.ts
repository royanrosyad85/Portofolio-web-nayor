import { useEffect, type CSSProperties } from 'react';

const PENDING = '[data-reveal]:not([data-revealed])';

/**
 * One shared IntersectionObserver for every `[data-reveal]` element on any page.
 *
 * Motion is CSS-only (opacity + transform, compositor-friendly) and runs once per
 * element. Nothing is hidden unless `html.reveal-ready` was set at boot, which is
 * skipped for reduced motion — so content is never stuck invisible.
 * A MutationObserver picks up elements added later (route changes, "Load more").
 */
export function useScrollReveal() {
  useEffect(() => {
    if (!document.documentElement.classList.contains('reveal-ready')) {
      return;
    }

    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.setAttribute('data-revealed', '');
            intersection.unobserve(element);
          } else if (entry.boundingClientRect.bottom <= 0) {
            // Already scrolled past (e.g. deep-linked to #contact): show without animating.
            element.setAttribute('data-reveal-instant', '');
            element.setAttribute('data-revealed', '');
            intersection.unobserve(element);
          }
        }
      },
      // Trigger as soon as the element clears the bottom ~6% of the viewport.
      { rootMargin: '0px 0px -6% 0px', threshold: 0 },
    );

    const observeWithin = (node: Element | Document) => {
      if (node instanceof Element && node.matches(PENDING)) {
        intersection.observe(node);
      }
      node.querySelectorAll(PENDING).forEach((element) => intersection.observe(element));
    };

    observeWithin(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            observeWithin(node);
          }
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersection.disconnect();
      mutations.disconnect();
    };
  }, []);
}

/** Inline style helper for staggering siblings, e.g. cards in the same grid row. */
export const revealDelay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;
