import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

export type PageWrapperProps = {
  children: ReactNode;
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          y: "100vh",
          scale: 0.95,
          rotateX: 15,
          opacity: 0,
          filter: "blur(20px) brightness(0.8)",
          transformOrigin: "center bottom",
        }}
        animate={{
          y: 0,
          scale: 1,
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px) brightness(1)",
          transformOrigin: "center center",
        }}
        exit={{
          y: "-100vh",
          scale: 1.05,
          rotateX: -15,
          opacity: 0.8,
          filter: "blur(15px) brightness(1.2)",
          transformOrigin: "center top",
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.6,
          velocity: 0,
        }}
        className="relative w-full bg-background text-foreground scroll-smooth noise antialiased"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
