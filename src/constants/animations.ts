import { useInView } from "framer-motion";
import { useRef } from "react";

export const useScrollReveal = () => {
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { amount: 0.3, once: true });

  return { inViewRef, isInView };
};

export const scrollRevealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const scaleRevealVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export const slideRevealVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export const scaleXRevealVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
};

export const rotateRevealVariants = {
  hidden: { opacity: 0, rotate: -45 },
  visible: { opacity: 1, rotate: 0 },
};

export const commonTransition = {
  duration: 0.7,
  ease: "easeOut" as const,
};

export const delayedTransition = (delay = 0.2) => ({
  duration: 0.7,
  delay,
  ease: "easeOut" as const,
});

export const text = {
  initial: {
    opacity: 1,
  },
  enter: {
    opacity: 0,
    top: -100,
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: { top: "47.5%" }
  },
  exit: {
    opacity: 1,
    top: "40%",
    transition: { duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] }
  }
};

export const curve = (initialPath: string, targetPath: string) => {
  return {
    initial: {
      d: initialPath
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
    }
  };
};

export const translate = {
  initial: {
    top: "-300px"
  },
  enter: {
    top: "-100vh",
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: {
      top: "100vh"
    }
  },
  exit: {
    top: "-300px",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
  }
};

export const anim = (variants: any) => {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit"
  };
};
