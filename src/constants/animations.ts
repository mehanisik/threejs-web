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
