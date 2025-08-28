import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

export type PageWrapperProps = {
  children: ReactNode;
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="relative w-full bg-background text-foreground scroll-smooth noise antialiased"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
