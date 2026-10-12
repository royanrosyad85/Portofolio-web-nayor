import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view.
 *
 * A section becomes active once its top edge passes a probe line 40% down the
 * viewport. Measuring positions on scroll (rAF-throttled) works for sections of
 * any height — the previous ratio-threshold observer never fired for sections
 * taller than its detection band, which left the indicator stuck.
 *
 * `sectionIds` must be listed in document order.
 */
export function useActiveSection<T extends string>(sectionIds: readonly T[], defaultId: T): T {
  const [activeSection, setActiveSection] = useState<T>(defaultId);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const probe = window.innerHeight * 0.4;
      let current: T = defaultId;

      for (const id of sectionIds) {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top <= probe) {
          current = id;
        }
      }

      // The last section may be too short to reach the probe; treat the page end as "arrived".
      const scrolledToEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (scrolledToEnd && sectionIds.length) {
        current = sectionIds[sectionIds.length - 1];
      }

      setActiveSection((previous) => (previous === current ? previous : current));
    };

    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [sectionIds, defaultId]);

  return activeSection;
}
