import type { Transition } from "motion/react";

export const MOTION_CONFIG = {
  default: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  },

  fast: {
    duration: 0.15,
    ease: [0.4, 0, 0.2, 1],
  },

  slow: {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1],
  },

  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  },

  bounce: {
    type: "spring",
    stiffness: 400,
    damping: 10,
  },

  stagger: {
    staggerChildren: 0.1,
    delayChildren: 0.1,
  },
} as const;

export const TRANSITIONS = {
  fade: {
    in: { opacity: 1 },
    out: { opacity: 0 },
    transition: MOTION_CONFIG.default,
  },

  slide: {
    left: {
      in: { x: 0 },
      out: { x: -100 },
      transition: MOTION_CONFIG.default,
    },
    right: {
      in: { x: 0 },
      out: { x: 100 },
      transition: MOTION_CONFIG.default,
    },
    up: {
      in: { y: 0 },
      out: { y: 100 },
      transition: MOTION_CONFIG.default,
    },
    down: {
      in: { y: 0 },
      out: { y: -100 },
      transition: MOTION_CONFIG.default,
    },
  },

  scale: {
    in: { scale: 1 },
    out: { scale: 0.95 },
    transition: MOTION_CONFIG.default,
  },

  rotate: {
    in: { rotate: 0 },
    out: { rotate: 180 },
    transition: MOTION_CONFIG.default,
  },
} as const;

export const VARIANTS = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },

  slideUp: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },

  slideDown: {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },

  slideLeft: {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },

  slideRight: {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },

  scale: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },

  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...MOTION_CONFIG.stagger,
        when: "beforeChildren",
      },
    },
  },

  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },

  hover: {
    scale: 1.05,
    transition: MOTION_CONFIG.fast,
  },

  tap: {
    scale: 0.95,
    transition: MOTION_CONFIG.fast,
  },
} as const;

export const PAGE_TRANSITIONS = {
  page: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: MOTION_CONFIG.default,
  },

  modal: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: MOTION_CONFIG.default,
  },

  drawer: {
    left: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
      transition: MOTION_CONFIG.default,
    },
    right: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
      transition: MOTION_CONFIG.default,
    },
  },
} as const;

export function createTransition(
  baseTransition: Transition,
  overrides?: Partial<Transition>,
) {
  return { ...baseTransition, ...overrides };
}

export function createStagger(
  staggerDelay = 0.1,
  baseTransition = MOTION_CONFIG.default,
) {
  return {
    ...baseTransition,
    staggerChildren: staggerDelay,
    delayChildren: staggerDelay,
  };
}

export function createSpring(stiffness = 300, damping = 30, mass = 1) {
  return {
    type: "spring",
    stiffness,
    damping,
    mass,
  };
}

export type MotionConfig = typeof MOTION_CONFIG;
export type Transitions = typeof TRANSITIONS;
export type AnimationVariants = typeof VARIANTS;
export type PageTransitions = typeof PAGE_TRANSITIONS;

export type {
  Transition as FramerTransition,
  Variants as FramerVariants,
} from "motion/react";
