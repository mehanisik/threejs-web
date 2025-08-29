import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

interface SpringTransitionProps {
  children: ReactNode;
  isActive: boolean;
  delay?: number;
}

const SpringTransition = ({
  children,
  isActive,
  delay = 0,
}: SpringTransitionProps) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key="page-content"
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -50,
            scale: 0.95,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.8,
            delay: delay,
          }}
          className="w-full h-full bg-background"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringTransition;
