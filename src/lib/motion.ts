import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion language for the site.
 *
 * Personality: Premium / Corporate — confident, smooth, zero bounce.
 * One signature easing curve drives ~80% of animations so motion feels cohesive.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Standard scroll-reveal: rise + fade with the signature easing. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

/** Lighter variant for items inside a staggered group. */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

/** Subtle scale + fade for cards and media. */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

/** Parent that cascades its children. Keep total budget under ~500ms. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

/** Default viewport config for whileInView — reveal once, slightly before fully in view. */
export const viewportOnce = { once: true, amount: 0.2 } as const;

/** Spring used for tactile press / hover feedback (no bounce). */
export const pressSpring: Transition = { type: 'spring', stiffness: 320, damping: 30, mass: 0.6 };
