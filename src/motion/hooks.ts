import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PRESETS, STAGGER_PRESETS } from "./presets";

export function useInViewAnimation(threshold = 0.1, triggerOnce = true) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return { ref, controls, inView };
}

export function useStaggerAnimation(_items: unknown[], staggerDelay = 0.1) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return { containerVariants, itemVariants };
}

export function useScrollAnimation(threshold = 0.5) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return { ref, controls, inView };
}

export function useHoverAnimation(hoverVariants?: Record<string, unknown>) {
  const controls = useAnimation();

  const defaultVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const variants = hoverVariants || defaultVariants;

  return { controls, variants };
}

export function usePageTransition(preset: keyof typeof PRESETS = "fadeIn") {
  const variants = PRESETS[preset];

  return { variants };
}

export function useModalAnimation() {
  const variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  return { variants };
}

export function useDrawerAnimation(direction: "left" | "right" = "left") {
  const variants = {
    hidden: { x: direction === "left" ? "-100%" : "100%" },
    visible: { x: 0 },
    exit: { x: direction === "left" ? "-100%" : "100%" },
  };

  return { variants };
}

export function useListItemAnimation(staggerDelay = 0.1) {
  const containerVariants = { ...STAGGER_PRESETS.container };
  const itemVariants = STAGGER_PRESETS.item;

  // Override stagger delay if custom value provided
  if (staggerDelay !== 0.1) {
    containerVariants.visible = {
      ...containerVariants.visible,
      transition: {
        ...containerVariants.visible.transition,
        staggerChildren: staggerDelay as 0.1,
        delayChildren: staggerDelay as 0.1,
      },
    };
  }

  return { containerVariants, itemVariants };
}

export function useCustomAnimation() {
  return useAnimation();
}

export function useAnimationSequence(sequence: string[]) {
  const controls = useAnimation();

  const playSequence = async () => {
    for (const state of sequence) {
      await controls.start(state);
    }
  };

  return { controls, playSequence };
}
