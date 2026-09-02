import { ReactLenis } from 'lenis/react';
import type { PropsWithChildren } from 'react';

export function SmoothScroll({ children }: PropsWithChildren) {
  return <ReactLenis root options={{ duration: 0.45, easing: (t) => 1 - (1 - t) ** 3 }}>{children}</ReactLenis>;
}
