import { MOTION_CONFIG } from "./config";

export const PRESETS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: MOTION_CONFIG.default,
  },

  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    transition: MOTION_CONFIG.default,
  },

  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
    transition: MOTION_CONFIG.default,
  },

  fadeInLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
    transition: MOTION_CONFIG.default,
  },

  fadeInRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
    transition: MOTION_CONFIG.default,
  },

  scaleIn: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    transition: MOTION_CONFIG.default,
  },

  scaleInBounce: {
    hidden: { scale: 0.3, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    transition: MOTION_CONFIG.bounce,
  },

  slideInUp: {
    hidden: { y: "100%" },
    visible: { y: 0 },
    transition: MOTION_CONFIG.default,
  },

  slideInDown: {
    hidden: { y: "-100%" },
    visible: { y: 0 },
    transition: MOTION_CONFIG.default,
  },

  slideInLeft: {
    hidden: { x: "100%" },
    visible: { x: 0 },
    transition: MOTION_CONFIG.default,
  },

  slideInRight: {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    transition: MOTION_CONFIG.default,
  },

  rotateIn: {
    hidden: { rotate: -180, opacity: 0 },
    visible: { rotate: 0, opacity: 1 },
    transition: MOTION_CONFIG.default,
  },

  flipIn: {
    hidden: { rotateY: -90, opacity: 0 },
    visible: { rotateY: 0, opacity: 1 },
    transition: MOTION_CONFIG.default,
  },

  elasticIn: {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
} as const;

export const STAGGER_PRESETS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...MOTION_CONFIG.stagger,
        when: "beforeChildren",
      },
    },
  },

  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },

  containerSlow: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        when: "beforeChildren",
      },
    },
  },

  containerFast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05,
        when: "beforeChildren",
      },
    },
  },
} as const;

export const HOVER_PRESETS = {
  lift: {
    initial: { y: 0 },
    hover: { y: -5 },
    transition: MOTION_CONFIG.fast,
  },

  scale: {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    transition: MOTION_CONFIG.fast,
  },

  glow: {
    initial: { boxShadow: "0 0 0 rgba(0, 0, 0, 0)" },
    hover: { boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" },
    transition: MOTION_CONFIG.fast,
  },

  bounce: {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    transition: MOTION_CONFIG.bounce,
  },

  rotate: {
    initial: { rotate: 0 },
    hover: { rotate: 5 },
    transition: MOTION_CONFIG.fast,
  },
} as const;

export const PAGE_PRESETS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: MOTION_CONFIG.default,
  },

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: MOTION_CONFIG.default,
  },

  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: MOTION_CONFIG.default,
  },

  modal: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
    transition: MOTION_CONFIG.default,
  },

  drawerLeft: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
    transition: MOTION_CONFIG.default,
  },

  drawerRight: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    transition: MOTION_CONFIG.default,
  },
} as const;

export type Presets = typeof PRESETS;
export type StaggerPresets = typeof STAGGER_PRESETS;
export type HoverPresets = typeof HOVER_PRESETS;
export type PagePresets = typeof PAGE_PRESETS;
