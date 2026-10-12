import { ReactLenis } from 'lenis/react';
import type { PropsWithChildren } from 'react';
import { SCROLL_EASE } from '@/hooks/use-scroll-to';

/**
 * Wheel, trackpad and touch scrolling stay native: the browser scrolls on the
 * compositor thread with the OS's own momentum, so input never waits on JS.
 * Lenis only drives programmatic scrolls (dock, in-page anchors), and any
 * wheel/touch input interrupts those mid-flight.
 */
export function SmoothScroll({ children }: PropsWithChildren) {
  return (
    <ReactLenis root options={{ smoothWheel: false, syncTouch: false, duration: 0.6, easing: SCROLL_EASE }}>
      {children}
    </ReactLenis>
  );
}
